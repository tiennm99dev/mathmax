/**
 * The fraction cards of the "Bài 24" widget. Two cards and an operation
 * give one fraction: for × the numerators and the denominators are joined,
 * for : the second card is first turned over (phân thức nghịch đảo). The
 * learner then strikes common factors across the whole product, and a value
 * of x checks that the result equals the original expression wherever that
 * is defined.
 */

import { X, lin, num, ratioAt, valueAt } from '../_shared/factors.js';

/** @typedef {import('../_shared/factors.js').Factor} Factor */
/** @typedef {{ top: Factor[], bottom: Factor[] }} Card */
/** @typedef {'mul' | 'div'} Op */

/** @type {Card[]} */
export const CARDS = [
  { top: [lin(-1), lin(1)], bottom: [num(2), X] },
  { top: [num(2), num(2), X], bottom: [lin(1)] },
  { top: [lin(-1)], bottom: [lin(3)] },
  { top: [num(3), lin(3)], bottom: [X, X] },
];

/**
 * The reciprocal of a card (its numerator and denominator swapped).
 * @param {Card} c
 * @returns {Card}
 */
export const flip = (c) => ({ top: c.bottom, bottom: c.top });

/**
 * The single fraction a · b or a : b before any factor is cancelled.
 * @param {Card} a
 * @param {Op} op
 * @param {Card} b
 * @returns {Card}
 */
export function combine(a, op, b) {
  const second = op === 'mul' ? b : flip(b);
  return { top: [...a.top, ...second.top], bottom: [...a.bottom, ...second.bottom] };
}

/**
 * The value of the original expression a · b or a : b at x = v, or null
 * where it is not defined: a denominator is 0, or, for a division, the
 * divisor is 0.
 * @param {Card} a
 * @param {Op} op
 * @param {Card} b
 * @param {number} v
 * @returns {number | null}
 */
export function originalAt(a, op, b, v) {
  const p = ratioAt(a.top, a.bottom, v);
  const q = ratioAt(b.top, b.bottom, v);
  if (p === null || q === null) return null;
  if (op === 'mul') return p * q;
  if (q === 0) return null;
  return p / q;
}

/**
 * Whether the card's value is 0 at x = v (its numerator is 0 there).
 * @param {Card} c
 * @param {number} v
 */
export const zeroAt = (c, v) => valueAt(c.top, v) === 0;
