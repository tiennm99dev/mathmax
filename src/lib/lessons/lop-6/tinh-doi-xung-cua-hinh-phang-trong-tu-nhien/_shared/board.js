/**
 * The square board both symmetry widgets draw on: shape units (y up) mapped
 * to SVG units (y down), with the origin in the middle and handles snapped to
 * half units.
 */

import { clamp } from '#lib/core/visuals/svg-math.js';

export const SIZE = 360;
export const UNIT = 40;
const MID = SIZE / 2;

/** @param {{ x: number, y: number }} p */
export const toScreen = (p) => ({ x: MID + p.x * UNIT, y: MID - p.y * UNIT });

/**
 * A screen point back in shape units, snapped to the nearest half unit and
 * kept within `limit` units of the origin.
 * @param {{ x: number, y: number }} s @param {number} limit
 */
export function toSnappedUnits(s, limit) {
  const x = clamp(Math.round(((s.x - MID) / UNIT) * 2) / 2, -limit, limit);
  const y = clamp(Math.round(((MID - s.y) / UNIT) * 2) / 2, -limit, limit);
  return { x, y };
}

/** SVG `points` text of a polygon given in shape units. @param {Array<{ x: number, y: number }>} P */
export const svgPoints = (P) =>
  P.map((p) => {
    const s = toScreen(p);
    return `${Math.round(s.x * 100) / 100},${Math.round(s.y * 100) / 100}`;
  }).join(' ');
