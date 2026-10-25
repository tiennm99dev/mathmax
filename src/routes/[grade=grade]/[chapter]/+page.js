import { error } from '@sveltejs/kit';
import { chapter, grade, gradeSlug, grades } from '#lib/curriculum/index.js';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return grades().flatMap((g) =>
    g.chapters.map((c) => ({ grade: gradeSlug(g.grade), chapter: c.slug })),
  );
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const g = grade(params.grade);
  const c = chapter(params.grade, params.chapter);
  if (!g || !c) error(404, 'Unknown chapter');
  return { grade: g, chapter: c };
}
