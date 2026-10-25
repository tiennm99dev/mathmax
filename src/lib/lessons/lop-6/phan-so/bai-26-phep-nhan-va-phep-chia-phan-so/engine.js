/**
 * Models for multiplying and dividing positive fractions. Multiplication is
 * the area model: a/b of the width times c/d of the height covers a·c of
 * the b·d cells of the unit square. Division measures a/b with copies of
 * c/d laid end to end; the number of copies (whole and part) is the quotient.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';

/**
 * Product a/b · c/d, before and after reducing.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 */
export function product(a, b, c, d) {
  const raw = fraction(a * c, b * d);
  return { raw, simple: simplify(raw) };
}

/**
 * Quotient a/b : c/d = a/b · d/c, before and after reducing. c must not be 0.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 */
export function quotient(a, b, c, d) {
  if (c === 0) throw new Error('cannot divide by 0');
  const raw = fraction(a * d, b * c);
  return { raw, simple: simplify(raw) };
}

/**
 * Copies of c/d laid from 0 to cover a/b: each tile runs from `from` to
 * `to` (as numbers) and `part` is how much of a whole tile is inside a/b
 * (1 for full tiles, a fraction for the last one).
 * @param {number} a @param {number} b @param {number} c @param {number} d
 * @returns {Array<{ from: number, to: number, part: number }>}
 */
export function tiles(a, b, c, d) {
  const total = a / b;
  const size = c / d;
  // Count in exact integers: a/b holds (a·d)/(b·c) tiles.
  const num = a * d;
  const den = b * c;
  const whole = Math.floor(num / den);
  const out = [];
  for (let k = 0; k < whole; k++) out.push({ from: k * size, to: (k + 1) * size, part: 1 });
  const rest = num - whole * den;
  if (rest > 0) out.push({ from: whole * size, to: total, part: rest / den });
  return out;
}
