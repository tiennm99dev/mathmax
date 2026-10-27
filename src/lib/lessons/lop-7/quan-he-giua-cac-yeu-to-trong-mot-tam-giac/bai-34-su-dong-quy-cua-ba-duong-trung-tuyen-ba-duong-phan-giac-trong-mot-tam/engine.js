/**
 * Logic of the concurrency board for medians and angle bisectors. Points
 * are in grid units (y up). The medians AM, BN, CP meet at the centroid G;
 * the bisectors AD, BE, CF meet at I, whose feet on BC, CA, AB are H, K, L.
 *
 * @typedef {import('#lib/geom-engine/grid-triangle.js').Pt} Pt
 * @typedef {import('#lib/geom-engine/grid-triangle.js').Tri} Tri
 */

import { dist, foot, midpoint } from '#lib/geom-engine/plane.js';

/**
 * Medians and centroid, with the ratios the lesson is about.
 * @param {Tri} t
 */
export function medians(t) {
  const M = midpoint(t.B, t.C);
  const N = midpoint(t.C, t.A);
  const P = midpoint(t.A, t.B);
  const G = { x: (t.A.x + t.B.x + t.C.x) / 3, y: (t.A.y + t.B.y + t.C.y) / 3 };
  const rows = [
    { from: 'A', to: 'M', vertex: t.A, end: M },
    { from: 'B', to: 'N', vertex: t.B, end: N },
    { from: 'C', to: 'P', vertex: t.C, end: P },
  ].map((r) => {
    const whole = dist(r.vertex, r.end);
    const toG = dist(r.vertex, G);
    return { ...r, whole, toG, rest: dist(G, r.end), ratio: toG / whole };
  });
  return { M, N, P, G, rows };
}

/**
 * Point dividing segment PQ so that its distances to P and Q are in the
 * ratio p : q.
 * @param {Pt} P @param {Pt} Q @param {number} p @param {number} q
 */
function divide(P, Q, p, q) {
  const k = p / (p + q);
  return { x: P.x + (Q.x - P.x) * k, y: P.y + (Q.y - P.y) * k };
}

/**
 * Angle bisectors and their common point I, with I's distances to the sides.
 * @param {Tri} t
 */
export function bisectors(t) {
  const a = dist(t.B, t.C);
  const b = dist(t.C, t.A);
  const c = dist(t.A, t.B);
  const s = a + b + c;
  const I = {
    x: (a * t.A.x + b * t.B.x + c * t.C.x) / s,
    y: (a * t.A.y + b * t.B.y + c * t.C.y) / s,
  };
  // The bisector from a vertex meets the opposite side where it is cut in
  // the ratio of the two adjacent sides.
  const D = divide(t.B, t.C, c, b);
  const E = divide(t.C, t.A, a, c);
  const F = divide(t.A, t.B, b, a);
  const H = foot(I, t.B, t.C);
  const K = foot(I, t.C, t.A);
  const L = foot(I, t.A, t.B);
  return { I, D, E, F, H, K, L, IH: dist(I, H), IK: dist(I, K), IL: dist(I, L) };
}
