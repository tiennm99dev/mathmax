/**
 * The eight angles a transversal c makes with two lines a (upper, through A)
 * and b (lower, through B). At each vertex the four angles are numbered the
 * same way, so equal numbers sit in the same position:
 *
 * - 1: below the line, right of c
 * - 2: above the line, right of c
 * - 3: above the line, left of c
 * - 4: below the line, left of c
 *
 * A line is given by the direction `d` of its right-hand ray (between −90°
 * and 90°), the transversal by the direction `g` of its upward ray (between
 * 0° and 180°).
 */

import { measure, norm } from '#lib/core/visuals/angle-math.js';

/** @typedef {1 | 2 | 3 | 4} AngleNo */

/**
 * Directions of the two rays that bound angle `i` at a vertex.
 * @param {AngleNo} i @param {number} d @param {number} g
 * @returns {[number, number]}
 */
export function raysOf(i, d, g) {
  const right = norm(d);
  const left = norm(d + 180);
  const up = norm(g);
  const down = norm(g + 180);
  switch (i) {
    case 1:
      return [right, down];
    case 2:
      return [right, up];
    case 3:
      return [left, up];
    default:
      return [left, down];
  }
}

/**
 * Measure of angle `i` at a vertex.
 * @param {AngleNo} i @param {number} d @param {number} g
 */
export function angleAt(i, d, g) {
  const [p, q] = raysOf(i, d, g);
  return measure(p, q);
}

/** @type {AngleNo[]} */
export const NUMBERS = [1, 2, 3, 4];

/**
 * Named pairs (angle at A, angle at B).
 * @type {Record<'dong-vi' | 'so-le-trong' | 'trong-cung-phia', Array<[AngleNo, AngleNo]>>}
 */
export const PAIRS = {
  'dong-vi': [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
  ],
  'so-le-trong': [
    [1, 3],
    [4, 2],
  ],
  'trong-cung-phia': [
    [1, 2],
    [4, 3],
  ],
};

/** Vietnamese names of the pair kinds. */
export const PAIR_NAME = {
  'dong-vi': 'đồng vị',
  'so-le-trong': 'so le trong',
  'trong-cung-phia': 'trong cùng phía',
};

/**
 * Subscript digit for an angle number: 1 → '₁'.
 * @param {number} i
 */
export const sub = (i) => '₀₁₂₃₄₅₆₇₈₉'[i];

/**
 * Direction of a line (its right-hand ray, between −`limit` and `limit`
 * degrees) for a pointer seen from a point on the line in direction `dir`:
 * a pointer on the left grabs the other end of the line. Rounded to whole
 * degrees.
 * @param {number} dir @param {number} limit
 */
export function lineDir(dir, limit) {
  let d = norm(dir);
  if (d > 90 && d < 270) d -= 180;
  if (d >= 270) d -= 360;
  return Math.max(-limit, Math.min(limit, Math.round(d)));
}
