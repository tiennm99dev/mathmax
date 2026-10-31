/**
 * What the triangle widget says about a triangle ABC: its angles, whether it
 * is acute, right or obtuse (which decides where the circumcentre lies),
 * whether it is (nearly) equilateral, and its two circles.
 */

import { angleAt, dist } from '#lib/geom-engine/plane.js';
import { circumcircle, incircle } from '#lib/geom-engine/centers.js';

/** @typedef {{ x: number, y: number }} Pt */

/** How far, in degrees, the largest angle may be from 90° to count as right. */
export const RIGHT_TOLERANCE = 1;

/** How far, as a share of the longest side, the sides may differ to count as equal. */
export const EQUAL_TOLERANCE = 0.02;

/**
 * @param {Pt} A @param {Pt} B @param {Pt} C
 */
export function analyse(A, B, C) {
  const angles = { A: angleAt(A, B, C), B: angleAt(B, C, A), C: angleAt(C, A, B) };
  const sides = { a: dist(B, C), b: dist(C, A), c: dist(A, B) };
  const outer = circumcircle(A, B, C);
  const inner = incircle(A, B, C);
  const largest = /** @type {'A' | 'B' | 'C'} */ (
    Object.entries(angles).reduce((m, e) => (e[1] > m[1] ? e : m))[0]
  );
  const max = angles[largest];
  /** @type {'vuong' | 'tu' | 'nhon'} */
  const kind = Math.abs(max - 90) <= RIGHT_TOLERANCE ? 'vuong' : max > 90 ? 'tu' : 'nhon';
  const longest = Math.max(sides.a, sides.b, sides.c);
  const shortest = Math.min(sides.a, sides.b, sides.c);
  const equilateral = longest > 0 && (longest - shortest) / longest <= EQUAL_TOLERANCE;
  return { angles, sides, outer, inner, largest, kind, equilateral };
}

/**
 * The vertex opposite each angle's side: the hypotenuse of a right angle at A
 * is BC, and so on.
 * @param {'A' | 'B' | 'C'} vertex
 * @returns {string}
 */
export function oppositeSide(vertex) {
  return { A: 'BC', B: 'CA', C: 'AB' }[vertex];
}

/**
 * The vertices of an equilateral triangle with centre `center` and
 * circumradius `R`, one vertex straight up.
 * @param {Pt} center @param {number} R
 * @returns {[Pt, Pt, Pt]}
 */
export function equilateral(center, R) {
  const at = (/** @type {number} */ deg) => ({
    x: center.x + R * Math.cos((deg * Math.PI) / 180),
    y: center.y + R * Math.sin((deg * Math.PI) / 180),
  });
  return [at(-90), at(150), at(30)];
}
