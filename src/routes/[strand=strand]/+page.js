import { error } from '@sveltejs/kit';
import { strands } from '#lib/curriculum/index.js';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return strands().map((s) => ({ strand: s.slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const strand = strands().find((s) => s.slug === params.strand);
  if (!strand) error(404, 'Unknown strand');
  return { strand };
}
