/**
 * Chapter helpers for the quadrilateral widgets of "Tứ giác": the printed
 * length unit and splitting printed angles along a diagonal so they add up.
 * Angles, convexity and the diagonal point come from
 * `#lib/geom-engine/plane.js`, rounding to a total from
 * `#lib/core/number-format.js`. Points are SVG points.
 *
 * @typedef {import('#lib/geom-engine/plane.js').Pt} Pt
 */

import { angleAt } from '#lib/geom-engine/plane.js';

/** SVG units per length unit printed by the widgets. */
export const UNIT = 20;

/**
 * Splits two printed angles of a quadrilateral along the diagonal from
 * vertex `i` to vertex `i + 2`, so the printed parts add up: each triangle
 * makes 180° and the two parts at a vertex make the printed angle there.
 * `shown` are the four printed whole-degree angles (adding up to 360°).
 * Returns the parts at vertex i and at vertex i + 2, first in the triangle
 * through vertex i + 1, then in the one through vertex i + 3.
 * @param {Pt[]} pts
 * @param {number[]} shown
 * @param {0 | 1} i
 */
export function splitAlongDiagonal(pts, shown, i) {
  const P = pts[i];
  const Q = pts[i + 1];
  const R = pts[i + 2];
  const p1 = Math.max(1, Math.min(shown[i] - 1, Math.round(angleAt(P, Q, R))));
  const r1 = 180 - shown[i + 1] - p1;
  return { p: [p1, shown[i] - p1], r: [r1, shown[i + 2] - r1] };
}

/**
 * A length in printed units, rounded to one decimal place. The tiny nudge
 * makes two equal lengths computed along different routes round alike.
 * @param {number} px length in SVG units
 */
export function units(px) {
  return Math.round((px / UNIT) * 10 + 1e-6) / 10;
}
