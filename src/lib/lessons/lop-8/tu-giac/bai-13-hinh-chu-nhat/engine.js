/**
 * The triangle of the "median to the hypotenuse" widget: B and C are fixed,
 * M is the midpoint of BC, and the apex A sits at distance MA from M in a
 * direction measured from MC. MA is kept in whole tenths of a unit, so
 * MA = BC : 2 holds exactly, and the angle at A is a right angle exactly
 * then (A lies on the circle with diameter BC).
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ tenths: number, dir: number }} Apex MA in tenths of a unit, direction in whole degrees
 */

import { UNIT, angleAt } from '../_shared/quad.js';

/** Half of BC, in units: BC = 10. */
export const HALF = 5;
export const M = { x: 200, y: 225 };
export const B = { x: M.x - HALF * UNIT, y: M.y };
export const C = { x: M.x + HALF * UNIT, y: M.y };
export const LIMITS = { tenthsMin: 20, tenthsMax: 80, dirMin: 25, dirMax: 155 };

const RAD = Math.PI / 180;

/** @param {number} v @param {number} lo @param {number} hi */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * Where A is drawn.
 * @param {Apex} apex
 * @returns {Pt}
 */
export function apexPoint({ tenths, dir }) {
  const r = (tenths / 10) * UNIT;
  return { x: M.x + r * Math.cos(dir * RAD), y: M.y - r * Math.sin(dir * RAD) };
}

/**
 * The angle BAC in degrees.
 * @param {Apex} apex
 */
export function angleA(apex) {
  if (apex.tenths === HALF * 10) return 90;
  return angleAt(apexPoint(apex), B, C);
}

/**
 * The apex for a pointer at `p`. Within `snap` units of the circle with
 * diameter BC, MA becomes exactly BC : 2.
 * @param {Pt} p
 * @param {number} [snap]
 * @returns {Apex}
 */
export function apexFromPointer(p, snap = 0.15) {
  const r = Math.hypot(p.x - M.x, p.y - M.y) / UNIT;
  const raw = Math.atan2(M.y - p.y, p.x - M.x) / RAD;
  const turned = raw < -90 ? 180 : raw < 0 ? 0 : raw;
  const dir = clamp(Math.round(turned), LIMITS.dirMin, LIMITS.dirMax);
  const tenths =
    Math.abs(r - HALF) <= snap
      ? HALF * 10
      : clamp(Math.round(r * 10), LIMITS.tenthsMin, LIMITS.tenthsMax);
  return { tenths, dir };
}

/**
 * One arrow-key step: left and right turn A around M by `turn` degrees, up
 * and down change MA by `grow` tenths.
 * @param {Apex} apex @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big
 * @returns {Apex}
 */
export function stepApex({ tenths, dir }, dx, dy, big) {
  return {
    tenths: clamp(tenths - dy * (big ? 5 : 1), LIMITS.tenthsMin, LIMITS.tenthsMax),
    dir: clamp(dir - dx * (big ? 5 : 1), LIMITS.dirMin, LIMITS.dirMax),
  };
}
