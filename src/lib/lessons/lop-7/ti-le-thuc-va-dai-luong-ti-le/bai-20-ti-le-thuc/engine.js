/**
 * The four terms of a proportion a : b = c : d, worked exactly. With one term
 * missing it finds that term from the cross products (ad = bc); with all four
 * it checks the cross products and, when they agree, lists the four
 * proportions that the equality ad = bc gives.
 */

import { div, equals, mul } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** Term names in the order a, b, c, d of a : b = c : d. */
export const NAMES = /** @type {const} */ (['a', 'b', 'c', 'd']);

/**
 * How to find each missing term: the product of the other pair divided by
 * the known term of its own pair, so a = bc/d, b = ad/c, c = ad/b, d = bc/a.
 * @type {ReadonlyArray<{ divisor: number, product: [number, number] }>}
 */
const SOLVE = [
  { divisor: 3, product: [1, 2] },
  { divisor: 2, product: [0, 3] },
  { divisor: 1, product: [0, 3] },
  { divisor: 0, product: [1, 2] },
];

/**
 * @typedef {{ kind: 'need' }
 *   | { kind: 'zero' }
 *   | { kind: 'solve', index: number, value: Fraction, product: [number, number], divisor: number }
 *   | { kind: 'check', ad: Fraction, bc: Fraction, ok: boolean }} Analysis
 */

/**
 * What the four boxes say. `terms[i]` is null when box i is empty. Every
 * term of a proportion here is non-zero, as in the book's second property.
 * @param {Array<Fraction | null>} terms
 * @returns {Analysis}
 */
export function analyze(terms) {
  if (terms.some((t) => t !== null && t.n === 0)) return { kind: 'zero' };
  const empty = terms.flatMap((t, i) => (t === null ? [i] : []));
  if (empty.length === 0) {
    const [a, b, c, d] = /** @type {Fraction[]} */ (terms);
    const ad = mul(a, d);
    const bc = mul(b, c);
    return { kind: 'check', ad, bc, ok: equals(ad, bc) };
  }
  if (empty.length > 1) return { kind: 'need' };
  const index = empty[0];
  const { divisor, product } = SOLVE[index];
  const t = /** @type {Fraction[]} */ (terms);
  const value = div(mul(t[product[0]], t[product[1]]), t[divisor]);
  return { kind: 'solve', index, value, product, divisor };
}

/**
 * The four proportions given by ad = bc when no term is 0, as index
 * quadruples [p, q, r, s] meaning p/q = r/s: a/b = c/d, a/c = b/d,
 * d/b = c/a, d/c = b/a.
 */
export const FORMS = /** @type {const} */ ([
  [0, 1, 2, 3],
  [0, 2, 1, 3],
  [3, 1, 2, 0],
  [3, 2, 1, 0],
]);

/**
 * Whether index i is an outer term (ngoại tỉ: a or d).
 * @param {number} i
 */
export const isOuter = (i) => i === 0 || i === 3;
