import strandSlugs from '#lib/curriculum/strands.json' with { type: 'json' };

// The small generated slug list, not the curriculum accessors: matchers ship to
// every page, and the full curriculum would come with them. The import
// attribute lets Node load this file directly, outside Vite.
const known = new Set(strandSlugs);

/**
 * Matches a strand route segment (`so-hoc`, `dai-so`, ...) from the curriculum.
 * @param {string} param
 * @returns {string | undefined}
 */
export function strand(param) {
  return known.has(param) ? param : undefined;
}
