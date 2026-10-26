/**
 * Model of the midline widget: triangle ABC with whole-number grid vertices
 * (one cell is 1 cm), M, N, P the midpoints of AB, AC, BC, and one chosen
 * midline with the side it is parallel to. Every midline joins the
 * midpoints of the two sides from a shared vertex V, toward X and Y; it is
 * parallel to XY and half as long, and the corresponding angles at the
 * midpoint on VX and at X are equal.
 *
 * @typedef {import('../_shared/tri.js').Pt} Pt
 * @typedef {{ A: Pt, B: Pt, C: Pt }} Tri
 * @typedef {'MN' | 'NP' | 'MP'} LineId
 */

import { angleAt, cross, dist, isParallel, midpoint } from '../_shared/tri.js';

export const COLS = 12;
export const ROWS = 8;

/**
 * Shared vertex V and the other two vertices X, Y for each midline, with
 * the names of its ends (on VX, then on VY) and of the parallel side.
 * @type {Record<LineId, { v: 'A' | 'B' | 'C', x: 'A' | 'B' | 'C', y: 'A' | 'B' | 'C', p: string, q: string, side: string }>}
 */
export const LINES = {
  MN: { v: 'A', x: 'B', y: 'C', p: 'M', q: 'N', side: 'BC' },
  NP: { v: 'C', x: 'A', y: 'B', p: 'N', q: 'P', side: 'AB' },
  MP: { v: 'B', x: 'A', y: 'C', p: 'M', q: 'P', side: 'AC' },
};

/** @param {Pt} p */
export const snapCell = (p) => ({
  x: Math.max(0, Math.min(COLS, Math.round(p.x))),
  y: Math.max(0, Math.min(ROWS, Math.round(p.y))),
});

/**
 * Whether moving one vertex to `next` keeps a real triangle with the others.
 * @param {Pt} next @param {Pt} other1 @param {Pt} other2
 */
export const keepsTriangle = (next, other1, other2) => cross(next, other1, other2) !== 0;

/** The three midpoints. @param {Tri} t */
export const midpoints = (t) => ({
  M: midpoint(t.A, t.B),
  N: midpoint(t.A, t.C),
  P: midpoint(t.B, t.C),
});

/**
 * The chosen midline: its ends, the side it is parallel to, their lengths
 * and the pair of corresponding angles (at the end on VX, and at X).
 * @param {Tri} t
 * @param {LineId} id
 */
export function midline(t, id) {
  const cfg = LINES[id];
  const V = t[cfg.v];
  const X = t[cfg.x];
  const Y = t[cfg.y];
  const p = midpoint(V, X);
  const q = midpoint(V, Y);
  return {
    p,
    q,
    X,
    Y,
    V,
    length: dist(p, q),
    side: dist(X, Y),
    parallel: isParallel(p, q, X, Y),
    /** The angle at the midline's end on VX, between V and the other end. */
    angleMid: angleAt(p, V, q),
    /** The angle at X between V and Y, corresponding to `angleMid`. */
    angleSide: angleAt(X, V, Y),
  };
}
