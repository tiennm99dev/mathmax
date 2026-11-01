/** The quiz round of the table of 5. */
import { buildRound } from '../_shared/times.js';

export const BASE = 5;

/** @type {readonly import('../_shared/times.js').Story[]} */
const STORIES = [
  (n) => ({ prompt: `Mỗi bàn tay có 5 ngón. ${n} bàn tay có mấy ngón?`, unit: 'ngón' }),
  (n) => ({ prompt: `Mỗi hộp có 5 cái bút. ${n} hộp có mấy cái bút?`, unit: 'cái bút' }),
  (n) => ({ prompt: `Mỗi ngôi sao có 5 cánh. ${n} ngôi sao có mấy cánh?`, unit: 'cánh' }),
];

/** @param {number} seed */
export const round = (seed) => buildRound(BASE, STORIES, seed);
