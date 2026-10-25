#!/usr/bin/env node
/**
 * Counts curriculum lessons that have no `content.vi.js` yet (stubs), per grade
 * and chapter. Subject-agnostic: it reads whatever `lop-N.json` files the site has.
 *
 *   npm run stubs                         every grade, with a line per chapter
 *   npm run stubs -- lop-6                one grade
 *   npm run stubs -- lop-6/<chuong-slug>  one chapter, listing its stub lessons
 *   npm run stubs -- --strict             exit 1 while any stub remains in scope
 *
 * The last line is always `<n> stub(s) of <m> lesson(s) in <scope>`, so a batch
 * check can read the count. An unknown scope exits 2.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const CURRICULUM_DIR = 'src/lib/curriculum';
const LESSONS_DIR = 'src/lib/lessons';

/**
 * @typedef {{ slug: string, title: string, kind: string }} LessonMeta
 * @typedef {{ slug: string, label: string, title: string, lessons: LessonMeta[] }} ChapterMeta
 * @typedef {{ grade: number, chapters: ChapterMeta[] }} GradeMeta
 */

/**
 * The site's grades in ascending order.
 * @param {string} root repo root
 * @returns {GradeMeta[]}
 */
function loadCurriculum(root) {
  const dir = path.join(root, CURRICULUM_DIR);
  return readdirSync(dir)
    .filter((f) => /^lop-\d+\.json$/.test(f))
    .map((f) => /** @type {GradeMeta} */ (JSON.parse(readFileSync(path.join(dir, f), 'utf8'))))
    .sort((a, b) => a.grade - b.grade);
}

/**
 * @param {string} root
 * @param {string} gradeSlug
 * @param {string} chapterSlug
 * @param {string} lessonSlug
 */
function isLive(root, gradeSlug, chapterSlug, lessonSlug) {
  return existsSync(
    path.join(root, LESSONS_DIR, gradeSlug, chapterSlug, lessonSlug, 'content.vi.js'),
  );
}

/**
 * @typedef {object} ChapterReport
 * @property {string} slug
 * @property {string} title
 * @property {number} total
 * @property {LessonMeta[]} stubs
 */

/**
 * @typedef {object} GradeReport
 * @property {string} slug
 * @property {number} total
 * @property {number} stubs
 * @property {ChapterReport[]} chapters
 */

/**
 * Builds the report for a scope: '' (everything), 'lop-N' or 'lop-N/<chapter>'.
 * Returns null when the scope names no grade or chapter of the curriculum.
 * @param {string} root
 * @param {GradeMeta[]} curriculum
 * @param {string} scope
 * @returns {GradeReport[] | null}
 */
function stubReport(root, curriculum, scope) {
  const [gradePart, chapterPart, ...rest] = scope.split('/').filter(Boolean);
  if (rest.length > 0) return null;
  const grades = gradePart ? curriculum.filter((g) => `lop-${g.grade}` === gradePart) : curriculum;
  if (grades.length === 0) return null;

  const reports = grades.map((g) => {
    const slug = `lop-${g.grade}`;
    const chapters = g.chapters
      .filter((c) => !chapterPart || c.slug === chapterPart)
      .map((c) => ({
        slug: c.slug,
        title: `${c.label}. ${c.title}`,
        total: c.lessons.length,
        stubs: c.lessons.filter((l) => !isLive(root, slug, c.slug, l.slug)),
      }));
    return {
      slug,
      total: chapters.reduce((n, c) => n + c.total, 0),
      stubs: chapters.reduce((n, c) => n + c.stubs.length, 0),
      chapters,
    };
  });
  if (chapterPart && reports[0].chapters.length === 0) return null;
  return reports;
}

/** @param {number} n @param {string} word */
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { strict: { type: 'boolean', default: false } },
  });
  if (positionals.length > 1) {
    console.error('usage: npm run stubs -- [lop-N[/<chapter-slug>]] [--strict]');
    process.exit(2);
  }
  const scope = (positionals[0] ?? '').replace(/^\/+|\/+$/g, '');
  const root = process.cwd();
  const report = stubReport(root, loadCurriculum(root), scope);
  if (!report) {
    console.error(`No grade or chapter "${scope}" in ${CURRICULUM_DIR}.`);
    process.exit(2);
  }

  const chapterScope = scope.includes('/');
  for (const g of report) {
    if (!chapterScope)
      console.log(`${g.slug}  ${g.total - g.stubs}/${g.total} live, ${g.stubs} stubs`);
    for (const c of g.chapters) {
      const line = `${g.slug}/${c.slug}  ${c.total - c.stubs.length}/${c.total} live`;
      console.log(chapterScope ? line : `  ${line}`);
      if (chapterScope) for (const l of c.stubs) console.log(`  stub  ${l.slug} (${l.kind})`);
    }
  }
  const stubs = report.reduce((n, g) => n + g.stubs, 0);
  const total = report.reduce((n, g) => n + g.total, 0);
  console.log(`${plural(stubs, 'stub')} of ${plural(total, 'lesson')} in ${scope || 'all grades'}`);
  if (values.strict && stubs > 0) process.exit(1);
}

main();
