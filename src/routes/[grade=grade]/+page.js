import { error } from '@sveltejs/kit';
import { grade, gradeSlug, grades } from '#lib/curriculum/index.js';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return grades().map((g) => ({ grade: gradeSlug(g.grade) }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const g = grade(params.grade);
  if (!g) error(404, 'Unknown grade');
  return { grade: g };
}
