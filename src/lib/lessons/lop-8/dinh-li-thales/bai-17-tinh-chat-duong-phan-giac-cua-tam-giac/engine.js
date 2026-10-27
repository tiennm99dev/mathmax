/**
 * Model of the bisector widget: B and C fixed on the grid (one cell is
 * 1 cm), A on a whole-number grid point above BC, and D the foot of the
 * bisector of angle A on BC. The widget prints DB/DC and AB/AC to two
 * decimals and the two halves of angle A to one decimal; the tests check
 * that each printed pair agrees at every grid position.
 *
 * @typedef {import('#lib/geom-engine/plane.js').Pt} Pt
 */

import { angleAt, bisectorFoot, dist, midpoint } from '#lib/geom-engine/plane.js';

export const COLS = 12;
export const ROWS = 8;
export const B = { x: 1, y: 7 };
export const C = { x: 11, y: 7 };
/** Lowest row A may sit on, so that it stays above BC. */
export const A_MAX_Y = 6;

/** The grid point nearest to `p`, kept inside the board and above BC. @param {Pt} p */
export const snapA = (p) => ({
  x: Math.max(0, Math.min(COLS, Math.round(p.x))),
  y: Math.max(0, Math.min(A_MAX_Y, Math.round(p.y))),
});

/** @param {Pt} A */
export function bisector(A) {
  const D = bisectorFoot(A, B, C);
  const ab = dist(A, B);
  const ac = dist(A, C);
  const db = dist(D, B);
  const dc = dist(D, C);
  return {
    D,
    M: midpoint(B, C),
    ab,
    ac,
    db,
    dc,
    sideRatio: ab / ac,
    segRatio: db / dc,
    angleBAD: angleAt(A, B, D),
    angleDAC: angleAt(A, D, C),
  };
}
