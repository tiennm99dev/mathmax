#!/usr/bin/env node
/**
 * Turns curriculum manifests (subject → grades → chapters → lessons) into one
 * `lop-N.json` per grade plus `strands.json`, the ordered strand slugs that the
 * route param matcher reads without loading every grade.
 *
 * Subject-agnostic: every KNTT site runs it with its own manifests and grade range.
 *
 *   node scripts/import-curriculum.js --grades 1-12 a.json b.json c.json
 *   node scripts/import-curriculum.js --grades 6-12 --out src/lib/curriculum physics.json
 *
 * Options:
 *   --grades A-B       grades to write; each must appear in exactly one manifest
 *   --out DIR          output folder (default src/lib/curriculum)
 *   --label-prefix P   label for chapters that carry none: "P <no>" (default "Chủ đề")
 *   --force            overwrite existing lop-N.json; once imported they are hand-edited
 *
 * The output keeps only whitelisted fields, trims slugs longer than 80 characters
 * at a hyphen boundary, fills a missing chapter label and volume, and is formatted
 * with the repo's Prettier config so `format:check` passes untouched.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import * as prettier from 'prettier';

const MAX_SLUG_LENGTH = 80;
const KINDS = ['theory', 'practice', 'review', 'activity', 'chuyen-de'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Primary-school books mark the end of Tập 1 with the first-semester review chapter.
const FIRST_SEMESTER_END_RE = /học kì (?:1|I)\b/i;

/**
 * Trims a slug to at most `max` characters, cutting at the last hyphen that fits.
 * @param {string} slug
 * @param {number} [max]
 */
function trimSlug(slug, max = MAX_SLUG_LENGTH) {
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max + 1).lastIndexOf('-');
  return cut > 0 ? slug.slice(0, cut) : slug.slice(0, max);
}

/**
 * @param {boolean} ok
 * @param {string} message
 * @returns {asserts ok}
 */
function assert(ok, message) {
  if (!ok) throw new Error(message);
}

/**
 * @param {unknown} value
 * @param {string} where
 * @returns {string}
 */
function str(value, where) {
  assert(typeof value === 'string' && value.trim() !== '', `${where}: expected a non-empty string`);
  return value.trim();
}

/**
 * @param {unknown} value
 * @param {string} where
 * @returns {string}
 */
function slug(value, where) {
  const s = trimSlug(str(value, where));
  assert(SLUG_RE.test(s), `${where}: "${s}" is not a lowercase hyphenated slug`);
  return s;
}

/**
 * Picks the grade volume a chapter belongs to. An explicit volume that is a
 * prefix of a grade volume ("Sách giáo khoa" → "Sách giáo khoa (1 tập)") maps to it.
 * @param {string[]} volumes
 * @param {unknown} declared
 * @param {number} fallbackIndex
 * @param {string} where
 */
function resolveVolume(volumes, declared, fallbackIndex, where) {
  if (declared === undefined) {
    assert(fallbackIndex < volumes.length, `${where}: no volume left to assign`);
    return volumes[fallbackIndex];
  }
  const name = str(declared, `${where}.volume`);
  if (volumes.includes(name)) return name;
  const candidates = volumes.filter((v) => v.startsWith(name) || name.startsWith(v));
  assert(
    candidates.length === 1,
    `${where}: volume "${name}" is not one of ${JSON.stringify(volumes)}`,
  );
  return candidates[0];
}

/**
 * Normalises one manifest grade into the `lop-N.json` shape.
 * @param {any} raw
 * @param {string} labelPrefix
 */
function normaliseGrade(raw, labelPrefix) {
  const grade = raw.grade;
  assert(Number.isInteger(grade) && grade >= 1 && grade <= 12, `grade ${grade}: out of range`);
  const where = `lop-${grade}`;
  assert(Array.isArray(raw.volumes) && raw.volumes.length > 0, `${where}: volumes missing`);
  /** @type {string[]} */
  const volumes = raw.volumes.map((/** @type {unknown} */ v, /** @type {number} */ i) =>
    str(v, `${where}.volumes[${i}]`),
  );
  assert(Array.isArray(raw.chapters) && raw.chapters.length > 0, `${where}: chapters missing`);

  const inferVolumes = raw.chapters.some((/** @type {any} */ c) => c.volume === undefined);
  if (inferVolumes && volumes.length > 1) {
    assert(
      raw.chapters.some((/** @type {any} */ c) => FIRST_SEMESTER_END_RE.test(c.title ?? '')),
      `${where}: chapters lack a volume and no first-semester review chapter marks the split`,
    );
  }

  let volumeIndex = 0;
  const chapterSlugs = new Set();
  const lessonSlugs = new Set();
  const chapters = raw.chapters.map((/** @type {any} */ c, /** @type {number} */ ci) => {
    const at = `${where}.chapters[${ci}]`;
    assert(Number.isInteger(c.no), `${at}.no: expected an integer`);
    const chapterSlug = slug(c.slug, `${at}.slug`);
    assert(!chapterSlugs.has(chapterSlug), `${at}: duplicate chapter slug "${chapterSlug}"`);
    chapterSlugs.add(chapterSlug);

    const volume = resolveVolume(volumes, c.volume, volumeIndex, at);
    volumeIndex = volumes.indexOf(volume);
    if (c.volume === undefined && FIRST_SEMESTER_END_RE.test(c.title)) volumeIndex += 1;

    assert(Array.isArray(c.lessons) && c.lessons.length > 0, `${at}: lessons missing`);
    const lessons = c.lessons.map((/** @type {any} */ l, /** @type {number} */ li) => {
      const lat = `${at}.lessons[${li}]`;
      assert(Number.isInteger(l.no), `${lat}.no: expected an integer`);
      const lessonSlug = slug(l.slug, `${lat}.slug`);
      assert(!lessonSlugs.has(lessonSlug), `${lat}: duplicate lesson slug "${lessonSlug}"`);
      lessonSlugs.add(lessonSlug);
      assert(KINDS.includes(l.kind), `${lat}.kind: "${l.kind}" is not one of ${KINDS.join(', ')}`);
      assert(Array.isArray(l.keyIdeas), `${lat}.keyIdeas: expected an array`);
      return {
        no: l.no,
        title: str(l.title, `${lat}.title`),
        slug: lessonSlug,
        kind: l.kind,
        keyIdeas: l.keyIdeas.map((/** @type {unknown} */ k, /** @type {number} */ ki) =>
          str(k, `${lat}.keyIdeas[${ki}]`),
        ),
        interactiveIdea: str(l.interactiveIdea, `${lat}.interactiveIdea`),
      };
    });

    return {
      no: c.no,
      label: c.label === undefined ? `${labelPrefix} ${c.no}` : str(c.label, `${at}.label`),
      title: str(c.title, `${at}.title`),
      slug: chapterSlug,
      strand: slug(c.strand, `${at}.strand`),
      volume,
      lessons,
    };
  });

  return { grade, volumes, chapters };
}

/**
 * @param {string} range
 * @returns {number[]}
 */
function parseRange(range) {
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(range);
  assert(m !== null, `--grades: expected A-B, got "${range}"`);
  const [from, to] = [Number(m[1]), Number(m[2])];
  assert(from >= 1 && to <= 12 && from <= to, `--grades: ${range} is not within 1-12`);
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      grades: { type: 'string' },
      out: { type: 'string', default: 'src/lib/curriculum' },
      'label-prefix': { type: 'string', default: 'Chủ đề' },
      force: { type: 'boolean', default: false },
    },
  });
  assert(values.grades !== undefined, '--grades A-B is required');
  assert(positionals.length > 0, 'pass at least one manifest path');
  const wanted = parseRange(values.grades);

  /** @type {Map<number, {raw: any, file: string}>} */
  const found = new Map();
  for (const file of positionals) {
    const manifest = JSON.parse(await readFile(file, 'utf8'));
    assert(Array.isArray(manifest.grades), `${file}: no grades array`);
    for (const raw of manifest.grades) {
      const prior = found.get(raw.grade);
      assert(!prior, `grade ${raw.grade} appears in both ${prior?.file} and ${file}`);
      found.set(raw.grade, { raw, file });
    }
  }
  const missing = wanted.filter((g) => !found.has(g));
  assert(missing.length === 0, `no manifest covers grade ${missing.join(', ')}`);

  const grades = wanted.map((g) =>
    normaliseGrade(/** @type {{raw: any}} */ (found.get(g)).raw, values['label-prefix']),
  );

  const out = path.resolve(values.out);
  const targets = grades.map((g) => path.join(out, `lop-${g.grade}.json`));
  const existing = targets.filter((t) => existsSync(t));
  assert(
    values.force || existing.length === 0,
    `refusing to overwrite ${existing.map((t) => path.relative(process.cwd(), t)).join(', ')}; pass --force`,
  );

  /** @type {string[]} */
  const strands = [];
  for (const g of grades) {
    for (const c of g.chapters) if (!strands.includes(c.strand)) strands.push(c.strand);
  }

  await mkdir(out, { recursive: true });
  /** @param {string} file @param {unknown} data */
  const write = async (file, data) => {
    // The repo's config applies even when --out points outside the repo.
    const options =
      (await prettier.resolveConfig(file)) ??
      (await prettier.resolveConfig(path.join(process.cwd(), 'package.json'))) ??
      {};
    await writeFile(
      file,
      await prettier.format(JSON.stringify(data), { ...options, filepath: file }),
    );
  };
  for (const [i, g] of grades.entries()) await write(targets[i], g);
  await write(path.join(out, 'strands.json'), strands);

  const lessonCount = grades.reduce(
    (n, g) => n + g.chapters.reduce((m, c) => m + c.lessons.length, 0),
    0,
  );
  const chapterCount = grades.reduce((n, g) => n + g.chapters.length, 0);
  console.log(
    `Wrote ${grades.length} grades (${chapterCount} chapters, ${lessonCount} lessons) and ` +
      `${strands.length} strands from ${positionals.length} manifest(s) to ${path.relative(process.cwd(), out) || '.'}`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
