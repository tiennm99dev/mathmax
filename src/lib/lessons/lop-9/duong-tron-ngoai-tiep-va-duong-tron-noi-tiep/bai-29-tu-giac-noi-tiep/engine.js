/**
 * What the quadrilateral widget says about ABCD: its four angles, the sums of
 * opposite angles, whether it is convex, and how D sits against the circle
 * through A, B and C. ABCD is cyclic exactly when D lies on that circle,
 * which for a convex ABCD is the same as ∠A + ∠C = ∠B + ∠D = 180°.
 */

import { dist, isConvex, quadAngles } from '#lib/geom-engine/plane.js';
import { circumcircle } from '../_shared/centers.js';

/** @typedef {{ x: number, y: number }} Pt */

/** How far, in degrees, a sum of opposite angles may be from 180° to count as 180°. */
export const SUM_TOLERANCE = 0.5;

/**
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 */
export function analyseQuad(A, B, C, D) {
  const pts = [A, B, C, D];
  const [a, b, c, d] = quadAngles(pts);
  const convex = isConvex(pts);
  const circle = circumcircle(A, B, C);
  /** Signed distance of D from the circle (ABC): negative inside, positive outside. */
  const offset = circle ? dist(D, circle.center) - circle.radius : Infinity;
  const sumAC = a + c;
  const sumBD = b + d;
  const cyclic = convex && circle !== null && Math.abs(sumAC - 180) <= SUM_TOLERANCE;
  return { angles: { A: a, B: b, C: c, D: d }, sumAC, sumBD, convex, circle, offset, cyclic };
}

/**
 * D moved straight to the circle through A, B, C (along the line from the
 * centre), or null when there is no such circle or the moved quadrilateral
 * is not convex.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 * @returns {Pt | null}
 */
export function snapToCircle(A, B, C, D) {
  const circle = circumcircle(A, B, C);
  if (!circle) return null;
  const { center, radius } = circle;
  const d = dist(D, center);
  if (d === 0) return null;
  const P = {
    x: center.x + ((D.x - center.x) / d) * radius,
    y: center.y + ((D.y - center.y) / d) * radius,
  };
  return isConvex([A, B, C, P]) ? P : null;
}
