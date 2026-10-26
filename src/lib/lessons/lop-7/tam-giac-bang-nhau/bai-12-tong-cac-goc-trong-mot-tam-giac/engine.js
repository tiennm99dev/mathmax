/**
 * Logic of the angle-sum board: vertices snap to a 10-unit grid, so a right
 * angle can be made exactly and any angle that is not right is at least a
 * degree away from 90°, which keeps the whole-degree readings honest.
 */

import { angles, kindOf, roundTo180 } from '../_shared/triangle-math.js';

/** @typedef {import('../_shared/triangle-math.js').Pt} Pt */

export const GRID = 10;
/** The area the triangle lives in, leaving room below for the straight angle. */
export const BOX = { minX: 30, maxX: 370, minY: 30, maxY: 190 };
/** Smallest angle the board allows, so the triangle never flattens. */
export const MIN_ANGLE = 8;

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
  const [A, B, C] = roundTo180(exact);
  return { A, B, C, exterior: 180 - C, kind: kindOf([A, B, C]) };
}
