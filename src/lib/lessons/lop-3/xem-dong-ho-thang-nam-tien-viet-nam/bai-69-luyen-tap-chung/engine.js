/**
 * The mixed practice of the chapter: reading a clock to the minute and in
 * "kém", minutes later and how long a job lasts, the days of a month, the
 * calendar, and Vietnamese money. One question of each part in a shuffled
 * order. Pure and DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import { labelsOf, roundOf } from '../_shared/questions.js';

/** @type {import('../_shared/questions.js').Kind[]} */
const KINDS = [
  'read',
  'kem',
  'after',
  'duration',
  'month',
  'weekday',
  'days',
  'sum',
  'change',
  'shop',
];

/** What each part of the round practises. */
export const KIND_LABELS = labelsOf(KINDS);

/**
 * The practice round of the lesson.
 * @param {number} seed
 */
export function buildRound(seed) {
  return roundOf(KINDS, rng(seed));
}
