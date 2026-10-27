/**
 * Plane geometry on plain `{ x, y }` points for drawing widgets: lengths,
 * angles, collinearity and parallel tests, a triangle from its sides, feet
 * of perpendiculars and bisectors, polygon area and convexity, and where to
 * put a vertex name. Nothing here depends on the y direction, so SVG points
 * (y down) and grid points (y up) both work. Angles are in degrees.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/**
 * Distance between two points.
 * @param {Pt} p @param {Pt} q
 */
export function dist(p, q) {
  return Math.hypot(q.x - p.x, q.y - p.y);
}

/**
 * The point of segment PQ at fraction t from P.
 * @param {Pt} P @param {Pt} Q @param {number} t
 * @returns {Pt}
 */
export const lerp = (P, Q, t) => ({ x: P.x + (Q.x - P.x) * t, y: P.y + (Q.y - P.y) * t });

/**
 * Midpoint of PQ.
 * @param {Pt} P @param {Pt} Q
 * @returns {Pt}
 */
export const midpoint = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });

/**
 * Measure in degrees (0 to 180) of the angle with vertex `o` and sides
 * through `p` and `q`; 0 when a side has no length.
 * @param {Pt} o @param {Pt} p @param {Pt} q
 */
export function angleAt(o, p, q) {
  const ux = p.x - o.x;
  const uy = p.y - o.y;
  const vx = q.x - o.x;
  const vy = q.y - o.y;
  const n = Math.hypot(ux, uy) * Math.hypot(vx, vy);
  if (n === 0) return 0;
  const c = Math.max(-1, Math.min(1, (ux * vx + uy * vy) / n));
  return (Math.acos(c) * 180) / Math.PI;
}

/**
 * Cross product of (b − a) and (c − a), twice the signed area of abc: its
 * sign says on which side of line ab the point c lies, and it is zero
 * exactly when the three are collinear (exact for whole-number coordinates).
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

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
 * Foot of the perpendicular from `p` to the line through `a` and `b`.
 * @param {Pt} p @param {Pt} a @param {Pt} b
 * @returns {Pt}
 */
export function foot(p, a, b) {
  const d = { x: b.x - a.x, y: b.y - a.y };
  const t = ((p.x - a.x) * d.x + (p.y - a.y) * d.y) / (d.x ** 2 + d.y ** 2);
  return { x: a.x + t * d.x, y: a.y + t * d.y };
}

/**
 * Where the lines AC and BD meet (the diagonals of quadrilateral ABCD), or
 * null when they are parallel.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 * @returns {Pt | null}
 */
export function diagonalPoint(A, B, C, D) {
  const ux = C.x - A.x;
  const uy = C.y - A.y;
  const vx = D.x - B.x;
  const vy = D.y - B.y;
  const den = ux * vy - uy * vx;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((B.x - A.x) * vy - (B.y - A.y) * vx) / den;
  return { x: A.x + t * ux, y: A.y + t * uy };
}

/**
 * Triangle ABC with the given side lengths: B at the origin, C on the
 * positive x axis and A on the negative-y side (above BC in SVG). Null when
 * the sides break the triangle inequality.
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

/**
 * Area of a polygon by the shoelace formula.
 * @param {Pt[]} pts
 */
export function polygonArea(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}

/**
 * The four angles of the quadrilateral pts[0]pts[1]pts[2]pts[3], each between
 * its two sides (so at most 180°).
 * @param {Pt[]} pts
 */
export function quadAngles(pts) {
  return pts.map((p, i) => angleAt(p, pts[(i + 3) % 4], pts[(i + 1) % 4]));
}

/**
 * The first side of a quadrilateral, by index i for side pts[i]pts[i+1],
 * whose line leaves the other two vertices on opposite sides of it (or on
 * it), or -1 when there is none. The quadrilateral is convex exactly when
 * this is -1.
 * @param {Pt[]} pts
 * @param {number} [eps] how far from a line, in cross-product units, a vertex
 *   must be to count as off it
 */
export function splittingSide(pts, eps = 1) {
  for (let i = 0; i < 4; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % 4];
    const s1 = cross(a, b, pts[(i + 2) % 4]);
    const s2 = cross(a, b, pts[(i + 3) % 4]);
    if (Math.abs(s1) < eps || Math.abs(s2) < eps || s1 > 0 !== s2 > 0) return i;
  }
  return -1;
}

/**
 * Whether the quadrilateral is convex, with every vertex clearly (at least
 * `eps` in cross-product units) off the lines through the sides it does not
 * belong to.
 * @param {Pt[]} pts
 * @param {number} [eps]
 */
export function isConvex(pts, eps = 1) {
  return splittingSide(pts, eps) === -1;
}
