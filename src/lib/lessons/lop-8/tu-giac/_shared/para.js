/**
 * A parallelogram ABCD built from three whole-number settings, for the
 * rectangle, rhombus and square widgets: AB = a and AD = b in printed length
 * units, and the angle Â = deg in whole degrees. AB lies along the board's
 * x axis, so the shape is a rectangle exactly when deg is 90 and a rhombus
 * exactly when a equals b. Keeping the settings whole means a special shape
 * is reached exactly, and a shape that is not special never prints the same
 * measures as one that is (the tests check this over every setting).
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ a: number, b: number, deg: number }} Para
 * @typedef {{ aMin: number, aMax: number, bMin: number, bMax: number, degMin: number, degMax: number }} ParaRange
 */

import { UNIT } from './quad.js';

/** The settings the chapter's widgets allow. @type {ParaRange} */
export const RANGE = { aMin: 3, aMax: 10, bMin: 3, bMax: 8, degMin: 55, degMax: 125 };

const RAD = Math.PI / 180;

/** @param {number} v @param {number} lo @param {number} hi */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * The four vertices, with A at `A` and B to its right.
 * @param {Pt} A
 * @param {Para} p
 */
export function paraPoints(A, { a, b, deg }) {
  const B = { x: A.x + a * UNIT, y: A.y };
  const D = { x: A.x + b * UNIT * Math.cos(deg * RAD), y: A.y - b * UNIT * Math.sin(deg * RAD) };
  return { A, B, C: { x: B.x + D.x - A.x, y: B.y + D.y - A.y }, D };
}

/**
 * Lengths of the diagonals in units: AC² = a² + b² + 2ab·cos Â and
 * BD² = a² + b² − 2ab·cos Â. A rectangle gets two identical numbers.
 * @param {Para} p
 */
export function diagonals({ a, b, deg }) {
  if (deg === 90) {
    const d = Math.sqrt(a * a + b * b);
    return { ac: d, bd: d };
  }
  const c = Math.cos(deg * RAD);
  return {
    ac: Math.sqrt(a * a + b * b + 2 * a * b * c),
    bd: Math.sqrt(a * a + b * b - 2 * a * b * c),
  };
}

/**
 * The acute (or right) angle between the diagonals, in degrees. The dot
 * product of the vectors AC and BD is b² − a², so the diagonals are
 * perpendicular exactly when a = b.
 * @param {Para} p
 */
export function diagonalAngle(p) {
  if (p.a === p.b) return 90;
  const { ac, bd } = diagonals(p);
  const c = Math.min(1, Math.abs(p.b * p.b - p.a * p.a) / (ac * bd));
  return Math.acos(c) / RAD;
}

/**
 * The two parts the diagonal AC cuts Â into: ∠CAB (next to AB) and ∠CAD.
 * They are equal exactly when a = b.
 * @param {Para} p
 */
export function splitAtA({ a, b, deg }) {
  if (a === b) return { cab: deg / 2, cad: deg / 2 };
  const cab = Math.atan2(b * Math.sin(deg * RAD), a + b * Math.cos(deg * RAD)) / RAD;
  return { cab, cad: deg - cab };
}

/**
 * Which special parallelogram the settings give.
 * @param {Para} p
 */
export function kindOf({ a, b, deg }) {
  const rect = deg === 90;
  const rhombus = a === b;
  return { rect, rhombus, square: rect && rhombus };
}

/**
 * The side AB for a pointer at `p`: whole units along the x axis from A.
 * @param {Pt} A @param {Pt} p @param {ParaRange} [range]
 */
export function sideFromPointer(A, p, range = RANGE) {
  return clamp(Math.round((p.x - A.x) / UNIT), range.aMin, range.aMax);
}

/**
 * AD and Â for a pointer at `p`: whole units and whole degrees around A. An
 * angle within `snap` degrees of 90° becomes 90°, so a finger can reach the
 * right angle; the arrow keys step one degree and need no snapping.
 * @param {Pt} A @param {Pt} p @param {number} [snap] @param {ParaRange} [range]
 */
export function polarFromPointer(A, p, snap = 3, range = RANGE) {
  const raw = Math.atan2(A.y - p.y, p.x - A.x) / RAD;
  // A pointer below the line AB counts as the nearer end of the range.
  const turned = raw < -90 ? 180 : raw < 0 ? 0 : raw;
  let deg = clamp(Math.round(turned), range.degMin, range.degMax);
  if (Math.abs(turned - 90) <= snap) deg = 90;
  const b = clamp(Math.round(Math.hypot(p.x - A.x, p.y - A.y) / UNIT), range.bMin, range.bMax);
  return { b, deg };
}

/**
 * One arrow-key step on a setting, kept within its range.
 * @param {number} value @param {number} step @param {number} lo @param {number} hi
 */
export function stepWithin(value, step, lo, hi) {
  return clamp(value + step, lo, hi);
}
