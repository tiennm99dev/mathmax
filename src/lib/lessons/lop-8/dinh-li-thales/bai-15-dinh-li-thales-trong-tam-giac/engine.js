/**
 * Model of the Thalès widget: triangle ABC with B' on AB and C' on AC, each
 * placed on one of STEPS equal steps of its side. AB' = i · AB / STEPS and
 * AC' = j · AC / STEPS, so AB'/AB = i/STEPS and AC'/AC = j/STEPS; the
 * ratios are equal, and B'C' ∥ BC, exactly when i = j. Working in whole
 * steps keeps every comparison exact.
 */

import { lowestTerms } from '#lib/core/fractions.js';

/** Equal steps on each of AB and AC. */
export const STEPS = 12;

/**
 * The triangles the widget offers, as side lengths in cm. AB is 12 cm so
 * each step on AB is 1 cm; a step on AC is AC/12 cm (1,25 cm, 0,75 cm, 1,5 cm).
 */
export const TRIANGLES = [
  { ab: 12, ac: 15, bc: 18 },
  { ab: 12, ac: 9, bc: 15 },
  { ab: 12, ac: 18, bc: 14 },
];

/** @param {number} n */
const clampStep = (n) => Math.max(1, Math.min(STEPS - 1, Math.round(n)));

/**
 * The step nearest to the projection of `raw` on segment PQ (P is step 0,
 * Q is step STEPS), kept strictly inside the segment.
 * @param {import('#lib/geom-engine/plane.js').Pt} P
 * @param {import('#lib/geom-engine/plane.js').Pt} Q
 * @param {import('#lib/geom-engine/plane.js').Pt} raw
 */
export function nearestStep(P, Q, raw) {
  const dx = Q.x - P.x;
  const dy = Q.y - P.y;
  const t = ((raw.x - P.x) * dx + (raw.y - P.y) * dy) / (dx * dx + dy * dy);
  return clampStep(t * STEPS);
}

/** @param {number} n */
export const stepOf = (n) => clampStep(n);

/**
 * Lengths and ratios for B' at step i on AB and C' at step j on AC.
 * @param {{ ab: number, ac: number }} tri
 * @param {number} i
 * @param {number} j
 */
export function measures(tri, i, j) {
  const abP = (i * tri.ab) / STEPS;
  const acP = (j * tri.ac) / STEPS;
  return {
    abP,
    bPb: tri.ab - abP,
    acP,
    cPc: tri.ac - acP,
    /** AB'/AB in lowest terms. */
    ratioB: lowestTerms(i, STEPS),
    /** AC'/AC in lowest terms. */
    ratioC: lowestTerms(j, STEPS),
    /** AB'/B'B in lowest terms. */
    ratioB2: lowestTerms(i, STEPS - i),
    /** AC'/C'C in lowest terms. */
    ratioC2: lowestTerms(j, STEPS - j),
    parallel: i === j,
  };
}
