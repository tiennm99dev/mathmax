/**
 * Logic of the perpendicular-bisector board. Lengths are in grid units: the
 * segment AB runs from A(−3; 0) to B(3; 0), so its perpendicular bisector d
 * is the line x = 0 and its midpoint O is the origin. A point M is dragged
 * either freely on a half-unit grid or along d; on d it also snaps to the
 * apex of the equilateral triangle on AB, which no grid point reaches.
 * Equalities are decided from exact squared distances, never from rounded
 * readings, so the board never calls two unequal lengths equal.
 */

import { angles } from '../_shared/triangle-math.js';

/** @typedef {{ x: number, y: number }} Pt */

export const A = { x: -3, y: 0 };
export const B = { x: 3, y: 0 };
export const AB = 6;
export const STEP = 0.5;
/** Height of the equilateral triangle on AB: 3√3. */
export const APEX = 3 * Math.sqrt(3);
export const BOX = { minX: -6, maxX: 6, minY: -2.5, maxY: 6 };
const EPS = 1e-9;

/** @param {number} v @param {number} lo @param {number} hi */
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
/** @param {number} v */
const toGrid = (v) => Math.round(v / STEP) * STEP;

/**
 * Where M lands for a raw position in grid units.
 * @param {Pt} raw
 * @param {'tren-d' | 'tu-do'} mode on d only, or anywhere on the grid
 * @returns {Pt}
 */
export function placeM(raw, mode) {
  const y = clamp(toGrid(raw.y), BOX.minY, BOX.maxY);
  if (mode === 'tu-do') return { x: clamp(toGrid(raw.x), BOX.minX, BOX.maxX), y };
  // On d, the equilateral apex replaces the grid point nearest to it.
  const near = Math.abs(raw.y - APEX) < STEP / 2 || Math.abs(y - APEX) < STEP / 2;
  return { x: 0, y: near ? APEX : y };
}

/** @param {Pt} p @param {Pt} q */
const sq = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2;

/**
 * Everything the board reads off M and the segment AB.
 * @param {Pt} m
 */
export function readings(m) {
  const ma2 = sq(m, A);
  const mb2 = sq(m, B);
  const onD = Math.abs(m.x) < EPS;
  const triangle = Math.abs(m.y) > EPS;
  const equalMAMB = Math.abs(ma2 - mb2) < EPS;
  /** Which vertex triangle MAB is isosceles at, if any. */
  const ab2 = AB * AB;
  const equilateral = triangle && equalMAMB && Math.abs(ma2 - ab2) < EPS;
  /** @type {('M' | 'A' | 'B')[]} */
  const apexes = [];
  if (triangle) {
    if (equalMAMB) apexes.push('M');
    if (Math.abs(ma2 - ab2) < EPS) apexes.push('A');
    if (Math.abs(mb2 - ab2) < EPS) apexes.push('B');
  }
  const [atM, atA, atB] = triangle ? angles(m, A, B) : [0, 0, 0];
  return {
    MA: Math.sqrt(ma2),
    MB: Math.sqrt(mb2),
    onD,
    equalMAMB,
    triangle,
    equilateral,
    apexes,
    atM,
    atA,
    atB,
  };
}
