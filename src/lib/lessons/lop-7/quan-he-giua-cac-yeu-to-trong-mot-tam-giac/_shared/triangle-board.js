/**
 * Pure helpers for the triangle boards of the chapter "Quan hệ giữa các yếu
 * tố trong một tam giác". Points are in grid units with y pointing up; a
 * board turns them into SVG points with `toSvg` and back with `fromSvg`.
 * Vertices snap to a half-unit grid, so squared lengths are exact binary
 * fractions and equal sides are decided exactly, never from rounded
 * readings.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ A: Pt, B: Pt, C: Pt }} Tri
 * @typedef {'A' | 'B' | 'C'} Vertex
 */

export const STEP = 0.5;
const EPS = 1e-9;
/** Smallest twice-area a dragged triangle may have, so it never goes flat. */
export const MIN_CROSS = 1;

/** @param {number} v @param {number} lo @param {number} hi */
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
/** @param {number} v */
export const toGrid = (v) => Math.round(v / STEP) * STEP;

/** @param {Pt} p @param {Pt} q */
export const sq = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
/** @param {Pt} p @param {Pt} q */
export const dist = (p, q) => Math.sqrt(sq(p, q));
/** @param {Pt} p @param {Pt} q */
export const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

/**
 * Twice the signed area of ABC; zero when the points are collinear.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/**
 * Measure of the angle PQR (vertex Q) in degrees, from 0 to 180.
 * @param {Pt} p @param {Pt} q @param {Pt} r
 */
export function angleAt(p, q, r) {
  const u = { x: p.x - q.x, y: p.y - q.y };
  const v = { x: r.x - q.x, y: r.y - q.y };
  const c = (u.x * v.x + u.y * v.y) / Math.sqrt((u.x ** 2 + u.y ** 2) * (v.x ** 2 + v.y ** 2));
  return (Math.acos(clamp(c, -1, 1)) * 180) / Math.PI;
}

/**
 * Foot of the perpendicular from `p` to the line through `a` and `b`.
 * @param {Pt} p @param {Pt} a @param {Pt} b
 */
export function foot(p, a, b) {
  const d = { x: b.x - a.x, y: b.y - a.y };
  const t = ((p.x - a.x) * d.x + (p.y - a.y) * d.y) / (d.x ** 2 + d.y ** 2);
  return { x: a.x + t * d.x, y: a.y + t * d.y };
}

/**
 * Moves a vertex to the grid point nearest `raw` inside `box`, unless that
 * would make the triangle (almost) flat; then the vertex stays where it was.
 * @param {Tri} tri current triangle
 * @param {Vertex} v the vertex being dragged
 * @param {Pt} raw wanted position, grid units
 * @param {{ minX: number, maxX: number, minY: number, maxY: number }} box
 * @returns {Pt}
 */
export function placeVertex(tri, v, raw, box) {
  const p = {
    x: clamp(toGrid(raw.x), box.minX, box.maxX),
    y: clamp(toGrid(raw.y), box.minY, box.maxY),
  };
  const next = { ...tri, [v]: p };
  return Math.abs(cross(next.A, next.B, next.C)) >= MIN_CROSS ? p : tri[v];
}

/** The side opposite each vertex. */
export const OPPOSITE = /** @type {const} */ ({ A: 'BC', B: 'CA', C: 'AB' });

/**
 * Sides and angles of triangle ABC. `sq` holds exact squared lengths of the
 * side opposite each vertex; `angle` the angle at each vertex.
 * @param {Tri} t
 */
export function measureTri(t) {
  const sqs = { A: sq(t.B, t.C), B: sq(t.C, t.A), C: sq(t.A, t.B) };
  return {
    sq: sqs,
    side: { A: Math.sqrt(sqs.A), B: Math.sqrt(sqs.B), C: Math.sqrt(sqs.C) },
    angle: { A: angleAt(t.B, t.A, t.C), B: angleAt(t.A, t.B, t.C), C: angleAt(t.A, t.C, t.B) },
  };
}

/**
 * Whether two squared lengths are equal (exact on the half-unit grid).
 * @param {number} p @param {number} q
 */
export const same = (p, q) => Math.abs(p - q) < EPS;

/**
 * Converters between grid units (y up) and SVG units.
 * @param {number} unit SVG units per grid unit
 * @param {number} ox SVG x of the origin
 * @param {number} oy SVG y of the origin
 */
export function frame(unit, ox, oy) {
  return {
    /** @param {Pt} p */
    toSvg: (p) => ({ x: ox + p.x * unit, y: oy - p.y * unit }),
    /** @param {Pt} p */
    fromSvg: (p) => ({ x: (p.x - ox) / unit, y: (oy - p.y) / unit }),
  };
}

/**
 * Where a vertex label sits outside the triangle: pushed away from the
 * centroid. Works in any coordinates.
 * @param {Pt} v @param {Tri} t @param {number} gap
 */
export function labelSpot(v, t, gap) {
  const g = { x: (t.A.x + t.B.x + t.C.x) / 3, y: (t.A.y + t.B.y + t.C.y) / 3 };
  const d = dist(v, g) || 1;
  return { x: v.x + ((v.x - g.x) / d) * gap, y: v.y + ((v.y - g.y) / d) * gap };
}
