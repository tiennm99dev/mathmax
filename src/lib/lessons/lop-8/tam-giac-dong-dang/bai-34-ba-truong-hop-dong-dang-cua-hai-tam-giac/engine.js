/**
 * The three similarity cases of two triangles, checked on the data the
 * learner gives for △ABC and △A′B′C′ (A ↔ A′, B ↔ B′, C ↔ C′). Each check
 * builds both triangles from their data and says which part of the case
 * holds. Sides are whole numbers and angles whole degrees, so the tests of
 * equal ratios and equal angles are exact.
 */

import { fromASA, fromSAS, fromSSS, sameRatio, similarAnyOrder } from '../_shared/tri.js';

/**
 * @typedef {import('../_shared/tri.js').Tri} Tri
 * @typedef {'similar' | 'reordered' | 'invalid' | 'sides' | 'angle' | 'one' | 'none'} Status
 *   similar: the case holds; reordered: the case fails for A ↔ A′, B ↔ B′,
 *   C ↔ C′ but the triangles are similar under another pairing of vertices;
 *   invalid: a triangle cannot be built;
 *   sides: c.g.c sides proportional but included angles differ;
 *   angle: c.g.c included angles equal but sides not proportional;
 *   one: g.g only one pair of angles equal; none: nothing of the case holds
 *   (for c.c.c, the three ratios are not all equal)
 * @typedef {{ left: Tri | null, right: Tri | null, status: Status }} Check
 */

/**
 * Turns a failed case into 'reordered' when the two triangles are still
 * similar with their vertices paired another way.
 * @param {Tri} left @param {Tri} right @param {Status} status
 * @returns {Check}
 */
function settle(left, right, status) {
  if (status !== 'similar' && similarAnyOrder(left, right)) status = 'reordered';
  return { left, right, status };
}

/**
 * Cạnh – cạnh – cạnh: A′B′/AB = B′C′/BC = C′A′/CA.
 * @param {{ ab: number, bc: number, ca: number }} p data of △ABC
 * @param {{ ab: number, bc: number, ca: number }} q data of △A′B′C′
 * @returns {Check}
 */
export function checkSSS(p, q) {
  const left = fromSSS(p.ab, p.bc, p.ca);
  const right = fromSSS(q.ab, q.bc, q.ca);
  if (!left || !right) return { left, right, status: 'invalid' };
  const ok = sameRatio(q.ab, p.ab, q.bc, p.bc) && sameRatio(q.bc, p.bc, q.ca, p.ca);
  return settle(left, right, ok ? 'similar' : 'none');
}

/**
 * Cạnh – góc – cạnh: A′B′/AB = A′C′/AC and Â′ = Â.
 * @param {{ ab: number, ca: number, A: number }} p
 * @param {{ ab: number, ca: number, A: number }} q
 * @returns {Check}
 */
export function checkSAS(p, q) {
  const left = fromSAS(p.ab, p.ca, p.A);
  const right = fromSAS(q.ab, q.ca, q.A);
  if (!left || !right) return { left, right, status: 'invalid' };
  const sides = sameRatio(q.ab, p.ab, q.ca, p.ca);
  const angle = p.A === q.A;
  /** @type {Status} */
  const status = sides && angle ? 'similar' : sides ? 'sides' : angle ? 'angle' : 'none';
  return settle(left, right, status);
}

/**
 * Góc – góc: B̂′ = B̂ and Ĉ′ = Ĉ.
 * @param {{ bc: number, B: number, C: number }} p
 * @param {{ bc: number, B: number, C: number }} q
 * @returns {Check}
 */
export function checkAA(p, q) {
  const left = fromASA(p.bc, p.B, p.C);
  const right = fromASA(q.bc, q.B, q.C);
  if (!left || !right) return { left, right, status: 'invalid' };
  const equal = Number(p.B === q.B) + Number(p.C === q.C);
  return settle(left, right, equal === 2 ? 'similar' : equal === 1 ? 'one' : 'none');
}
