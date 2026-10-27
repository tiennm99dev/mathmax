/**
 * Logic of the perpendicular-and-oblique board. Lengths are in grid units.
 * The line d is the x-axis; the point A sits above it and H, the foot of the
 * perpendicular from A, is (A.x; 0). The point M slides along d on a
 * half-unit grid. Whether M is H is decided exactly from the grid, never
 * from rounded lengths.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

import { angleAt } from '#lib/geom-engine/plane.js';
import { clamp } from '#lib/core/visuals/svg-math.js';
import { toGrid } from '#lib/geom-engine/grid-triangle.js';

export const BOX = { minX: -6, maxX: 6, minY: 1, maxY: 6 };

/**
 * Where A lands for a raw position: on the half-unit grid, above d.
 * @param {Pt} raw
 * @returns {Pt}
 */
export function placeA(raw) {
  return {
    x: clamp(toGrid(raw.x), BOX.minX, BOX.maxX),
    y: clamp(toGrid(raw.y), BOX.minY, BOX.maxY),
  };
}

/**
 * Where M lands for a raw position: on d, on the half-unit grid.
 * @param {Pt} raw
 * @returns {Pt}
 */
export function placeM(raw) {
  return { x: clamp(toGrid(raw.x), BOX.minX, BOX.maxX), y: 0 };
}

/**
 * Length of AM when M is at abscissa `x` on d.
 * @param {Pt} a @param {number} x
 */
export const obliqueLength = (a, x) => Math.hypot(x - a.x, a.y);

/**
 * Everything the board reads off A and M.
 * @param {Pt} a
 * @param {Pt} m
 */
export function readings(a, m) {
  const h = { x: a.x, y: 0 };
  const atH = m.x === a.x;
  return {
    H: h,
    AH: a.y,
    AM: obliqueLength(a, m.x),
    HM: Math.abs(m.x - a.x),
    atH,
    /** Angle AMH of the right triangle AHM, at M; 90° when M is H. */
    atM: atH ? 90 : angleAt(m, a, h),
    /** Angle HAM, at A. */
    atA: atH ? 0 : angleAt(a, h, m),
  };
}
