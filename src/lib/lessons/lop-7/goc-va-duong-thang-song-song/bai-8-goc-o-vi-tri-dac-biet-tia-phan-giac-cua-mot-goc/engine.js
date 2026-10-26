/**
 * Logic of the "two crossing lines" explorer: line xx' stays horizontal,
 * line yy' turns about O, and the ray Oy points in direction `theta`
 * (whole degrees from MIN to MAX, above xx'). A ray Ot inside the angle xOy
 * is checked against the bisector.
 */

import { norm } from '#lib/core/visuals/angle-math.js';

export const MIN = 10;
export const MAX = 170;

/**
 * The four angles around O, in degrees.
 * @param {number} theta direction of Oy
 */
export function fourAngles(theta) {
  return { xOy: theta, yOx2: 180 - theta, x2Oy2: theta, y2Ox: 180 - theta };
}

/**
 * Direction of Oy for a pointer seen from O in direction `dir`: a pointer
 * below xx' grabs the other end of the line (Oy'), and the result is
 * rounded and kept between MIN and MAX.
 * @param {number} dir
 */
export function lineDirection(dir) {
  const up = norm(dir) > 180 ? norm(dir) - 180 : norm(dir);
  return Math.max(MIN, Math.min(MAX, Math.round(up)));
}

/**
 * Direction of the ray Ot for a pointer in direction `dir`, snapped to half
 * degrees and kept strictly inside the angle xOy.
 * @param {number} dir @param {number} theta
 */
export function rayInside(dir, theta) {
  const d = norm(dir) > 270 ? 0 : norm(dir);
  const snapped = Math.round(d * 2) / 2;
  return Math.max(0.5, Math.min(theta - 0.5, snapped));
}

/**
 * The two parts of xOy cut by Ot and whether Ot is its bisector.
 * @param {number} t direction of Ot @param {number} theta
 */
export function split(t, theta) {
  const xOt = t;
  const tOy = theta - t;
  return { xOt, tOy, isBisector: Math.abs(xOt - tOy) < 1e-9 };
}
