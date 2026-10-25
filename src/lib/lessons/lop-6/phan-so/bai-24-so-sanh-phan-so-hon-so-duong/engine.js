/**
 * Logic for comparing fractions on a number line and for turning a positive
 * fraction into a mixed number with pies.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { lcm } from '#lib/numtheory-engine/index.js';

/**
 * @typedef {object} PlaceSet
 * @property {string} label
 * @property {number} sub ticks per unit; every fraction of the set lies on one
 * @property {Array<[number, number]>} items fractions [n, d] to place, as written
 */

/** @type {PlaceSet[]} */
export const PLACE_SETS = [
  {
    label: 'Phần tư',
    sub: 4,
    items: [
      [3, 4],
      [1, -2],
      [5, 4],
      [-7, 4],
    ],
  },
  {
    label: 'Phần sáu',
    sub: 6,
    items: [
      [2, 3],
      [-1, 6],
      [7, 6],
      [4, -3],
    ],
  },
  {
    label: 'Phần mười',
    sub: 10,
    items: [
      [2, 5],
      [-3, 10],
      [3, 2],
      [-6, 5],
    ],
  },
];

/**
 * Number of ticks of size 1/sub from 0 to n/d; null when n/d is not on a tick.
 * @param {number} n @param {number} d @param {number} sub
 */
export function tickOf(n, d, sub) {
  const f = fraction(n, d);
  const t = (f.n * sub) / f.d;
  return Number.isInteger(t) ? t + 0 : null;
}

/**
 * Whether a marker at `value` sits on n/d, on a line with `sub` ticks a unit.
 * @param {number} value @param {number} n @param {number} d @param {number} sub
 */
export function isAt(value, n, d, sub) {
  return Math.round(value * sub) === tickOf(n, d, sub);
}

/**
 * The fractions of a set from smallest to largest.
 * @param {Array<[number, number]>} items
 */
export function ascending(items) {
  return [...items].sort((p, q) => {
    const a = fraction(p[0], p[1]);
    const b = fraction(q[0], q[1]);
    return a.n * b.d - b.n * a.d;
  });
}

/**
 * The working for comparing a/b with c/d the book's way: write both with a
 * positive denominator, bring them to the least common denominator, then
 * compare the numerators.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 */
export function compareSteps(a, b, c, d) {
  const x = fraction(a, b);
  const y = fraction(c, d);
  const m = lcm(x.d, y.d);
  const xn = x.n * (m / x.d);
  const yn = y.n * (m / y.d);
  /** @type {'<' | '=' | '>'} */
  const sign = xn < yn ? '<' : xn > yn ? '>' : '=';
  return { x, y, common: m, xn, yn, sign };
}

/**
 * A positive fraction as whole part and remainder: 17/5 → { whole: 3, rest: 2 }.
 * @param {number} n positive numerator
 * @param {number} d positive denominator
 */
export function mixedParts(n, d) {
  const whole = Math.floor(n / d);
  return { whole, rest: n - whole * d };
}

/**
 * A positive mixed number back to a fraction: a b/c = (a·c + b)/c.
 * @param {number} whole @param {number} n @param {number} d
 */
export function mixedToFraction(whole, n, d) {
  return { n: whole * d + n, d };
}

/**
 * Where a fraction stands against 0 and 1, in words.
 * @param {number} n @param {number} d
 */
export function standing(n, d) {
  const f = simplify(fraction(n, d));
  if (f.n === 0) return 'bằng 0';
  if (f.n < 0) return 'là phân số âm, nhỏ hơn 0';
  if (f.n < f.d) return 'là phân số dương, nhỏ hơn 1';
  if (f.n === f.d) return 'bằng 1';
  return 'là phân số dương, lớn hơn 1';
}

/**
 * Pies for n/d: each pie has d sectors, the first n sectors overall shaded.
 * @param {number} n @param {number} d @param {number} pies
 * @returns {number[]} shaded sectors in each pie
 */
export function pieFill(n, d, pies) {
  return Array.from({ length: pies }, (_, p) => Math.max(0, Math.min(d, n - p * d)));
}
