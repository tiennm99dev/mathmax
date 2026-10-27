/**
 * Multiples of π written the way the book writes them, for the arc and
 * sector lessons of this chapter and their drills.
 */

import { numberText } from '#lib/core/decimal.js';

/**
 * A multiple of π: 2 → '2π', 1 → 'π', 0,5 → '0,5π', 7/3 → '7π/3'.
 * @param {number} k a rational coefficient, built as a quotient of integers
 */
export function piText(k) {
  const t = numberText(k);
  const slash = t.indexOf('/');
  if (slash >= 0) {
    const p = t.slice(0, slash);
    return `${p === '1' ? '' : p}π/${t.slice(slash + 1)}`;
  }
  return t === '1' ? 'π' : `${t}π`;
}
