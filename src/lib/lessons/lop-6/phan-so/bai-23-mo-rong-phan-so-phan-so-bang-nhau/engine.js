/**
 * Logic of the equal-fractions strips: whether c/d equals a/b, the cross
 * products a·d and b·c, and how one fraction turns into the other by the
 * basic property (multiply or divide numerator and denominator by k).
 */

import { gcd } from '#lib/numtheory-engine/index.js';

/**
 * @typedef {object} Relation
 * @property {boolean} equal a/b = c/d
 * @property {number} ad cross product a·d
 * @property {number} bc cross product b·c
 * @property {'same' | 'expand' | 'reduce' | 'both' | 'none'} how
 *   'expand': c/d is a/b with both parts times k; 'reduce': c/d is a/b with
 *   both parts divided by k; 'both': equal, but only through the simplest
 *   form; 'none': not equal
 * @property {number} k the factor for 'expand' or 'reduce', else 1
 * @property {-1 | 0 | 1} order sign of c/d − a/b (denominators positive)
 */

/**
 * @param {number} a @param {number} b first fraction, b > 0
 * @param {number} c @param {number} d second fraction, d > 0
 * @returns {Relation}
 */
export function relate(a, b, c, d) {
  const ad = a * d;
  const bc = b * c;
  const equal = ad === bc;
  const diff = bc - ad;
  /** @type {-1 | 0 | 1} */
  const order = diff < 0 ? -1 : diff > 0 ? 1 : 0;
  if (!equal) return { equal, ad, bc, how: 'none', k: 1, order };
  if (a === c && b === d) return { equal, ad, bc, how: 'same', k: 1, order };
  if (d % b === 0 && c === a * (d / b)) return { equal, ad, bc, how: 'expand', k: d / b, order };
  if (b % d === 0 && a === c * (b / d)) return { equal, ad, bc, how: 'reduce', k: b / d, order };
  return { equal, ad, bc, how: 'both', k: 1, order };
}

/**
 * Every fraction equal to a/b with a positive denominator up to maxDen,
 * smallest denominator first.
 * @param {number} a @param {number} b b > 0
 * @param {number} maxDen
 * @returns {Array<{ n: number, d: number }>}
 */
export function equivalents(a, b, maxDen) {
  const g = gcd(a, b) || 1;
  const n0 = a / g;
  const d0 = b / g;
  const out = [];
  for (let k = 1; d0 * k <= maxDen; k++) out.push({ n: n0 * k, d: d0 * k });
  return out;
}

/**
 * The simplest form of a/b (b > 0), with the gcd it divides by.
 * @param {number} a @param {number} b
 */
export function simplest(a, b) {
  const g = gcd(a, b) || 1;
  return { n: a / g, d: b / g, g };
}
