/**
 * The similarity cases of two right triangles, △ABC and △A′B′C′, both right
 * at A. Each check builds both triangles from the learner's data and says
 * whether the case holds with A ↔ A′, B ↔ B′, C ↔ C′ ('similar'), holds only
 * with B and C swapped ('swapped'), the data make no right triangle
 * ('invalid'), or nothing holds ('none'). Sides are whole numbers and angles
 * whole degrees, so the ratio and angle tests are exact.
 */

import { fromASA, fromHypotenuseLeg, fromSAS, sameRatio } from '../_shared/tri.js';

/**
 * @typedef {import('../_shared/tri.js').Tri} Tri
 * @typedef {'similar' | 'swapped' | 'invalid' | 'none'} Status
 * @typedef {{ left: Tri | null, right: Tri | null, status: Status }} Check
 */

/**
 * One acute angle: B̂′ = B̂. The data are the hypotenuse BC and the angle B.
 * @param {{ bc: number, B: number }} p
 * @param {{ bc: number, B: number }} q
 * @returns {Check}
 */
export function checkAcute(p, q) {
  const left = fromASA(p.bc, p.B, 90 - p.B);
  const right = fromASA(q.bc, q.B, 90 - q.B);
  if (!left || !right) return { left, right, status: 'invalid' };
  /** @type {Status} */
  const status = p.B === q.B ? 'similar' : q.B === 90 - p.B ? 'swapped' : 'none';
  return { left, right, status };
}

/**
 * Two legs in proportion: A′B′/AB = A′C′/AC.
 * @param {{ ab: number, ca: number }} p
 * @param {{ ab: number, ca: number }} q
 * @returns {Check}
 */
export function checkLegs(p, q) {
  const left = fromSAS(p.ab, p.ca, 90);
  const right = fromSAS(q.ab, q.ca, 90);
  if (!left || !right) return { left, right, status: 'invalid' };
  /** @type {Status} */
  const status = sameRatio(q.ab, p.ab, q.ca, p.ca)
    ? 'similar'
    : sameRatio(q.ab, p.ca, q.ca, p.ab)
      ? 'swapped'
      : 'none';
  return { left, right, status };
}

/**
 * Hypotenuse and a leg in proportion: B′C′/BC = A′B′/AB.
 * @param {{ bc: number, ab: number }} p
 * @param {{ bc: number, ab: number }} q
 * @returns {Check}
 */
export function checkHypotenuseLeg(p, q) {
  const left = fromHypotenuseLeg(p.bc, p.ab);
  const right = fromHypotenuseLeg(q.bc, q.ab);
  if (!left || !right) return { left, right, status: 'invalid' };
  return { left, right, status: sameRatio(q.bc, p.bc, q.ab, p.ab) ? 'similar' : 'none' };
}
