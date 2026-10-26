/**
 * Pure helpers for the quadrilateral widgets of the chapter "Tứ giác": angles
 * at a vertex, convexity, the diagonal point, and rounding measures so the
 * numbers a widget prints add up the way the theorems say they must
 * (four angles to 360°, a triangle to 180°). Points are SVG points; nothing
 * here depends on the y direction.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/** SVG units per length unit printed by the widgets. */
export const UNIT = 20;

/**
 * Distance between two points.
 * @param {Pt} p @param {Pt} q
 */
export function dist(p, q) {
  return Math.hypot(q.x - p.x, q.y - p.y);
}

/**
 * Measure in degrees (0 to 180) of the angle with vertex `o` and sides
 * through `p` and `q`.
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
 * Cross product of (b − a) and (c − a): its sign says on which side of the
 * line ab the point c lies, zero when the three are collinear.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
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
 * The first side, by index i for side pts[i]pts[i+1], whose line leaves the
 * other two vertices on opposite sides of it (or on it), or -1 when there is
 * none. The quadrilateral is convex exactly when this is -1: then the two
 * vertices off every side lie on one side of the line through it.
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
 * Whether the quadrilateral is convex, with every vertex clearly off the lines
 * through the sides it does not belong to.
 * @param {Pt[]} pts
 * @param {number} [eps]
 */
export function isConvex(pts, eps = 1) {
  return splittingSide(pts, eps) === -1;
}

/**
 * Whole numbers as close as possible to `values` that add up to `total`
 * (largest remainder). Values that tie keep their order.
 * @param {number[]} values
 * @param {number} total
 */
export function roundToTotal(values, total) {
  const floors = values.map(Math.floor);
  let left = total - floors.reduce((s, v) => s + v, 0);
  const order = values
    .map((v, i) => ({ i, r: v - Math.floor(v) }))
    .sort((p, q) => q.r - p.r || p.i - q.i);
  const out = [...floors];
  for (let k = 0; left > 0 && k < order.length; k++, left--) out[order[k].i] += 1;
  return out;
}

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
 * Where the lines AC and BD meet, or null when they are parallel.
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
 * A length in printed units, rounded to one decimal place. The tiny nudge
 * makes two equal lengths computed along different routes round alike.
 * @param {number} px length in SVG units
 */
export function units(px) {
  return Math.round((px / UNIT) * 10 + 1e-6) / 10;
}

/**
 * The SVG `points` attribute for a polygon.
 * @param {Pt[]} pts
 */
export function pointsAttr(pts) {
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}
