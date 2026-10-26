/**
 * Plane geometry for the triangle widgets of the chapter "Định lí Thalès":
 * points, lengths, angles, a triangle built from its three sides, the foot
 * of an angle bisector and exact ratios of whole numbers. Coordinates are
 * SVG-style (y grows downwards); lengths are in whatever unit the caller uses.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/** @param {Pt} P @param {Pt} Q */
export const dist = (P, Q) => Math.hypot(Q.x - P.x, Q.y - P.y);

/**
 * The point of segment PQ at fraction t from P.
 * @param {Pt} P @param {Pt} Q @param {number} t
 * @returns {Pt}
 */
export const lerp = (P, Q, t) => ({ x: P.x + (Q.x - P.x) * t, y: P.y + (Q.y - P.y) * t });

/** @param {Pt} P @param {Pt} Q */
export const midpoint = (P, Q) => lerp(P, Q, 0.5);

/**
 * The angle at V between rays VP and VQ, in degrees (0 to 180).
 * @param {Pt} V @param {Pt} P @param {Pt} Q
 */
export function angleAt(V, P, Q) {
  const a = Math.atan2(P.y - V.y, P.x - V.x);
  const b = Math.atan2(Q.y - V.y, Q.x - V.x);
  let d = Math.abs(a - b) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
}

/**
 * Twice the signed area of triangle PQR; zero exactly when the points are
 * collinear (exact for whole-number coordinates).
 * @param {Pt} P @param {Pt} Q @param {Pt} R
 */
export const cross = (P, Q, R) => (Q.x - P.x) * (R.y - P.y) - (Q.y - P.y) * (R.x - P.x);

/**
 * Whether segments PQ and RS point the same or opposite way (parallel or on
 * one line), up to rounding.
 * @param {Pt} P @param {Pt} Q @param {Pt} R @param {Pt} S
 */
export function isParallel(P, Q, R, S) {
  const c = (Q.x - P.x) * (S.y - R.y) - (Q.y - P.y) * (S.x - R.x);
  return Math.abs(c) <= 1e-9 * dist(P, Q) * dist(R, S);
}

/**
 * Triangle ABC with the given side lengths: B at the origin, C on the
 * positive x axis and A above BC (negative y). Null when the sides break
 * the triangle inequality.
 * @param {number} ab @param {number} ac @param {number} bc
 * @returns {{ A: Pt, B: Pt, C: Pt } | null}
 */
export function triangleFromSides(ab, ac, bc) {
  if (!(ab + ac > bc && ab + bc > ac && ac + bc > ab)) return null;
  const x = (ab * ab - ac * ac + bc * bc) / (2 * bc);
  const y = Math.sqrt(ab * ab - x * x);
  return { A: { x, y: -y }, B: { x: 0, y: 0 }, C: { x: bc, y: 0 } };
}

/**
 * Foot D of the bisector of angle A on side BC: DB / DC = AB / AC.
 * @param {Pt} A @param {Pt} B @param {Pt} C
 * @returns {Pt}
 */
export function bisectorFoot(A, B, C) {
  const ab = dist(A, B);
  const ac = dist(A, C);
  return lerp(B, C, ab / (ab + ac));
}

/** @param {number} a @param {number} b @returns {number} */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/**
 * p/q in lowest terms (q > 0, whole numbers).
 * @param {number} p @param {number} q
 * @returns {[number, number]}
 */
export function simplify(p, q) {
  const g = gcd(p, q) || 1;
  return [p / g, q / g];
}

/**
 * Where to centre a vertex's name: `gap` away from vertex P, on the side
 * facing away from G (usually the centroid), kept at least `margin` inside a
 * w × h board so a vertex dragged to an edge never pushes its name off it.
 * @param {Pt} P @param {Pt} G @param {number} gap
 * @param {number} w @param {number} h @param {number} [margin]
 * @returns {Pt}
 */
export function labelSpot(P, G, gap, w, h, margin = 12) {
  const d = dist(G, P) || 1;
  const x = P.x + ((P.x - G.x) / d) * gap;
  const y = P.y + ((P.y - G.y) / d) * gap;
  return {
    x: Math.max(margin, Math.min(w - margin, x)),
    y: Math.max(margin, Math.min(h - margin, y)),
  };
}
