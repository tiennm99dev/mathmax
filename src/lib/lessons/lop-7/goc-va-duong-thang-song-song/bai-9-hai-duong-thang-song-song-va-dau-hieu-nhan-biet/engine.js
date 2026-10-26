/**
 * Logic of the parallel-line tester: line a is fixed (direction 0°), line b
 * turns through B (direction `beta`), the transversal c has upward
 * direction `gamma`. A chosen pair of corresponding or alternate interior
 * angles is compared; the lines are parallel exactly when the pair is equal.
 */

import { PAIRS, angleAt } from '../_shared/transversal.js';

/** @typedef {'dong-vi' | 'so-le-trong'} PairKind */

/** Steepness of the transversal the learner can switch between. */
export const GAMMAS = [65, 115, 75, 120];

/** How far line b can turn either way. */
export const LIMIT = 30;

/**
 * @param {number} beta @param {number} gamma @param {PairKind} kind
 * @param {number} index which pair of that kind
 */
export function pairStatus(beta, gamma, kind, index) {
  const [i, j] = PAIRS[kind][index];
  const atA = angleAt(i, 0, gamma);
  const atB = angleAt(j, beta, gamma);
  return { i, j, atA, atB, equal: atA === atB };
}

/**
 * A new starting turn for line b that is not parallel to a.
 * @param {() => number} rand
 */
export function freshBeta(rand) {
  const m = 6 + Math.floor(rand() * 20);
  return rand() < 0.5 ? -m : m;
}
