/**
 * The circles of a triangle, for the widgets of this chapter: the
 * circumscribed circle (centre where the perpendicular bisectors meet) and
 * the inscribed circle (centre where the angle bisectors meet). Points are
 * plain `{ x, y }` in any unit.
 */

import { cross, dist, foot } from '#lib/geom-engine/plane.js';

/** @typedef {{ x: number, y: number }} Pt */
/** @typedef {{ center: Pt, radius: number }} Round */

/**
 * The circle through A, B and C, or null when the three are (nearly) on one
 * line.
 * @param {Pt} A @param {Pt} B @param {Pt} C
 * @returns {Round | null}
 */
export function circumcircle(A, B, C) {
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const scale = Math.max(dist(A, B), dist(B, C), dist(C, A)) ** 2;
  if (scale === 0 || Math.abs(d) < 1e-9 * scale) return null;
  const a2 = A.x ** 2 + A.y ** 2;
  const b2 = B.x ** 2 + B.y ** 2;
  const c2 = C.x ** 2 + C.y ** 2;
  const center = {
    x: (a2 * (B.y - C.y) + b2 * (C.y - A.y) + c2 * (A.y - B.y)) / d,
    y: (a2 * (C.x - B.x) + b2 * (A.x - C.x) + c2 * (B.x - A.x)) / d,
  };
  return { center, radius: dist(center, A) };
}

/**
 * The circle tangent to the three sides of triangle ABC, or null when the
 * triangle is flat. Its centre is the weighted mean of the vertices, each
 * weighted by the length of the opposite side.
 * @param {Pt} A @param {Pt} B @param {Pt} C
 * @returns {Round | null}
 */
export function incircle(A, B, C) {
  const a = dist(B, C);
  const b = dist(C, A);
  const c = dist(A, B);
  const p = a + b + c;
  const area = Math.abs(cross(A, B, C)) / 2;
  if (p === 0 || area < 1e-9 * p * p) return null;
  const center = {
    x: (a * A.x + b * B.x + c * C.x) / p,
    y: (a * A.y + b * B.y + c * C.y) / p,
  };
  return { center, radius: (2 * area) / p };
}

/**
 * Where the incircle touches the sides BC, CA and AB.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} I the incentre
 * @returns {[Pt, Pt, Pt]}
 */
export function touchPoints(A, B, C, I) {
  return [foot(I, B, C), foot(I, C, A), foot(I, A, B)];
}
