#!/usr/bin/env node
/**
 * Reports the gzip size of every lesson's client JS after `npm run build`, and
 * exits 1 when any lesson chunk is over the hard limit.
 *
 *   npm run size-report
 *
 * A lesson chunk is a client chunk that Vite built from a module under
 * `src/lib/lessons/` (in practice `widget.svelte` and `*.widget.svelte`, with the
 * lesson's own helpers folded in). Shared code they import, such as core visuals
 * or the lazy KaTeX chunk behind `tex.svelte`, is not counted against a lesson.
 *
 * Budgets: a lesson's chunks should total 30 KB gzip or less (a warning), and no
 * single lesson chunk may pass 60 KB gzip (a failure).
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const CLIENT_DIR = '.svelte-kit/output/client';
const MANIFEST = path.join(CLIENT_DIR, '.vite/manifest.json');
const LESSON_PREFIX = 'src/lib/lessons/';
const CHUNK_LIMIT = 60 * 1024;
const LESSON_BUDGET = 30 * 1024;

/** @param {number} bytes */
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

function main() {
  if (!existsSync(MANIFEST)) {
    console.error(`${MANIFEST} is missing; run npm run build first.`);
    process.exit(2);
  }
  /** @type {Record<string, { file: string, src?: string }>} */
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));

  /** @type {Map<string, Array<{ src: string, file: string, gzip: number }>>} */
  const byLesson = new Map();
  for (const entry of Object.values(manifest)) {
    if (!entry.src?.startsWith(LESSON_PREFIX) || !entry.file.endsWith('.js')) continue;
    // lop-N/<chapter>/<lesson>, or lop-N/<chapter>/_shared for chapter helpers.
    const dir = entry.src.slice(LESSON_PREFIX.length).split('/').slice(0, 3).join('/');
    const gzip = gzipSync(readFileSync(path.join(CLIENT_DIR, entry.file))).length;
    const chunks = byLesson.get(dir) ?? [];
    chunks.push({ src: entry.src, file: entry.file, gzip });
    byLesson.set(dir, chunks);
  }

  let failures = 0;
  let warnings = 0;
  const rows = [...byLesson.entries()]
    .map(([dir, chunks]) => ({ dir, chunks, total: chunks.reduce((n, c) => n + c.gzip, 0) }))
    .sort((a, b) => b.total - a.total);
  for (const { dir, chunks, total } of rows) {
    const over = chunks.filter((c) => c.gzip > CHUNK_LIMIT);
    const flag = over.length ? 'FAIL' : total > LESSON_BUDGET ? 'WARN' : 'ok  ';
    console.log(`${flag}  ${kb(total).padStart(9)}  ${dir}`);
    for (const c of over) {
      console.log(`        ${kb(c.gzip)} > ${kb(CHUNK_LIMIT)}: ${c.src} (${c.file})`);
    }
    if (over.length) failures += 1;
    else if (total > LESSON_BUDGET) warnings += 1;
  }

  console.log(
    `${rows.length} lesson(s) with client JS; ${warnings} over the ${kb(LESSON_BUDGET)} budget, ` +
      `${failures} with a chunk over ${kb(CHUNK_LIMIT)} gzip`,
  );
  if (failures > 0) process.exit(1);
}

main();
