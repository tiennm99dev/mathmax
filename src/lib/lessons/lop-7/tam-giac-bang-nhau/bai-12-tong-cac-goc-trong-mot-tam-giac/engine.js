/**
 * Logic of the angle-sum board: vertices snap to a 10-unit grid, so a right
 * angle can be made exactly. A grid angle that is not right can still lie
 * within half a degree of 90°, so the readings never round such an angle to
 * 90° and the kind of triangle comes from the exact angles.
 */

import { angles, roundTo180 } from '../_shared/triangle-math.js';

/** @typedef {import('../_shared/triangle-math.js').Pt} Pt */

export const GRID = 10;
/** The area the triangle lives in, leaving room below for the straight angle. */
export const BOX = { minX: 30, maxX: 370, minY: 30, maxY: 190 };
/** Smallest angle the board allows, so the triangle never flattens. */
export const MIN_ANGLE = 8;
/** How close to 90° an angle must be to count as right (floating-point noise only). */
const RIGHT_EPS = 1e-6;

/**
 * Where a dragged vertex lands: snapped to the grid and kept in the box; a
 * position that would make an angle smaller than MIN_ANGLE keeps the vertex
 * where it was.
 * @param {Pt} raw where the pointer is
 * @param {Pt} current where the vertex is now
 * @param {Pt} p @param {Pt} q the other two vertices
 * @returns {Pt}
 */
export function placeVertex(raw, current, p, q) {
  const x = Math.min(BOX.maxX, Math.max(BOX.minX, Math.round(raw.x / GRID) * GRID));
  const y = Math.min(BOX.maxY, Math.max(BOX.minY, Math.round(raw.y / GRID) * GRID));
  const next = { x, y };
  const all = angles(next, p, q);
  if (all.some((a) => !(a >= MIN_ANGLE))) return current;
  return next;
}

/**
 * Everything the board reads off triangle ABC: whole-degree angles that add
 * up to 180°, the exterior angle at C, and the kind of triangle.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function readings(a, b, c) {
  const exact = angles(a, b, c);
  const whole = roundTo180(exact);
  const near = whole.findIndex((w, i) => w === 90 && Math.abs(exact[i] - 90) > RIGHT_EPS);
  if (near >= 0) {
    // Show 89° or 91° instead, and give the degree back to the other angle
    // whose rounding it suits best, so the sum stays 180°.
    const d = exact[near] > 90 ? 1 : -1;
    whole[near] += d;
    const j = [0, 1, 2]
      .filter((i) => i !== near)
      .sort((i, k) => d * (exact[i] - whole[i]) - d * (exact[k] - whole[k]))[0];
    whole[j] -= d;
  }
  const [A, B, C] = whole;
  const max = Math.max(...exact);
  /** @type {'nhọn' | 'vuông' | 'tù'} */
  const kind = Math.abs(max - 90) <= RIGHT_EPS ? 'vuông' : max > 90 ? 'tù' : 'nhọn';
  return { A, B, C, exterior: 180 - C, kind };
}
