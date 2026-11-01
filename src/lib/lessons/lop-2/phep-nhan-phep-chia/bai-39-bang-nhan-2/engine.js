/** The quiz round of the table of 2 and the hops that build it on the number line. */
import { buildRound } from '../_shared/times.js';

export const BASE = 2;

/** @type {readonly import('../_shared/times.js').Story[]} */
const STORIES = [
  (n) => ({ prompt: `Mỗi con gà có 2 chân. ${n} con gà có mấy chân?`, unit: 'chân' }),
  (n) => ({ prompt: `Mỗi đôi đũa có 2 chiếc. ${n} đôi đũa có mấy chiếc?`, unit: 'chiếc' }),
  (n) => ({ prompt: `Mỗi xe đạp có 2 bánh. ${n} xe đạp có mấy bánh?`, unit: 'bánh' }),
];

/** @param {number} seed */
export const round = (seed) => buildRound(BASE, STORIES, seed);

/**
 * The arcs of `step` jumps of 2 from 0.
 * @param {number} step
 */
export function hopsFor(step) {
  return Array.from({ length: step }, (_, i) => ({
    from: BASE * i,
    to: BASE * (i + 1),
    label: `+${BASE}`,
  }));
}
