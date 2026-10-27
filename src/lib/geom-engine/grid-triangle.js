/**
 * A draggable triangle on a half-unit grid: vertices snap to the grid, never
 * go flat, and side lengths are compared through exact squared lengths, so
 * equal sides are decided exactly, never from rounded readings. Points are in
 * grid units with y pointing up; `frame` converts them to SVG units and back.
 * General point geometry (`dist`, `angleAt`, `foot`, `midpoint`, `cross`)
 * lives in `plane.js`.
 *
 * @typedef {import('./plane.js').Pt} Pt
 * @typedef {{ A: Pt, B: Pt, C: Pt }} Tri
 * @typedef {'A' | 'B' | 'C'} Vertex
 */

import { clamp } from '#lib/core/visuals/svg-math.js';
import { angleAt, cross, dist } from './plane.js';

export const STEP = 0.5;
const EPS = 1e-9;
/** Smallest twice-area a dragged triangle may have, so it never goes flat. */
export const MIN_CROSS = 1;

/** The nearest grid value. @param {number} v */
export const toGrid = (v) => Math.round(v / STEP) * STEP;

/** Squared distance, exact on the half-unit grid. @param {Pt} p @param {Pt} q */
export const sq = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2;

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
    angle: { A: angleAt(t.A, t.B, t.C), B: angleAt(t.B, t.A, t.C), C: angleAt(t.C, t.A, t.B) },
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
 * Where a vertex label sits outside the triangle: `gap` away from the vertex,
 * pushed away from the centroid. Works in any coordinates.
 * @param {Pt} v @param {Tri} t @param {number} gap
 */
export function labelOutside(v, t, gap) {
  const g = { x: (t.A.x + t.B.x + t.C.x) / 3, y: (t.A.y + t.B.y + t.C.y) / 3 };
  const d = dist(v, g) || 1;
  return { x: v.x + ((v.x - g.x) / d) * gap, y: v.y + ((v.y - g.y) / d) * gap };
}
