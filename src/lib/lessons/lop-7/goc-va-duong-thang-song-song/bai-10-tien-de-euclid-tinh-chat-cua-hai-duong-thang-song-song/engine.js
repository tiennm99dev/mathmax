/**
 * Logic of the two explorers of Euclid's axiom: lines through a point M
 * above the horizontal line a (only the one at 0° misses a), and a
 * transversal turning across two parallel lines.
 */

import { intersect, norm } from '#lib/core/visuals/angle-math.js';
import { PAIRS, angleAt } from '../_shared/transversal.js';

/** How far the line through M can tilt either way, in degrees. */
export const TILT = 80;

/**
 * Where the line through `m` with direction `phi` meets the horizontal line
 * y = `lineY`, and how far that point is from the foot H of the
 * perpendicular from `m`.
 * @param {{ x: number, y: number }} m @param {number} lineY @param {number} phi
 * @returns {{ parallel: true } | { parallel: false, N: { x: number, y: number }, dist: number }}
 */
export function meetLine(m, lineY, phi) {
  const N = intersect(m, phi, { x: 0, y: lineY }, 0);
  if (!N) return { parallel: true };
  return { parallel: false, N, dist: Math.abs(N.x - m.x) };
}

/**
 * Adds a tried tilt to the record, once.
 * @param {number[]} tried @param {number} phi
 */
export function record(tried, phi) {
  return tried.includes(phi) ? tried : [...tried, phi].sort((p, q) => p - q);
}

/**
 * Upward direction of the transversal for a pointer in direction `dir`
 * seen from A, whole degrees from `lo` to `hi`.
 * @param {number} dir @param {number} lo @param {number} hi
 */
export function transversalDir(dir, lo, hi) {
  let d = norm(dir);
  if (d > 180) d -= 180;
  return Math.max(lo, Math.min(hi, Math.round(d)));
}

/**
 * A pair of angles a transversal with upward direction `gamma` makes with
 * two parallel lines, and how they relate: equal for corresponding and
 * alternate interior angles, summing to 180° for co-interior ones.
 * @param {number} gamma
 * @param {'dong-vi' | 'so-le-trong' | 'trong-cung-phia'} kind
 * @param {number} index
 */
export function parallelPair(gamma, kind, index) {
  const [i, j] = PAIRS[kind][index];
  const atA = angleAt(i, 0, gamma);
  const atB = angleAt(j, 0, gamma);
  return { i, j, atA, atB, sum: atA + atB };
}
