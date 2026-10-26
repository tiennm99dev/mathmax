/**
 * Presets, stepping and narration for the long division of polynomials next
 * to the long division of two natural numbers with the same number of
 * rounds. The division itself lives in `#lib/algebra-engine/long-division.js`.
 */

import { polyText, termText } from '#lib/algebra-engine/polynomial.js';
import { lead } from '#lib/algebra-engine/long-division.js';

/** @typedef {typeof import('#lib/algebra-engine/long-division.js').longDivide} LongDivide */
/** @typedef {typeof import('#lib/algebra-engine/long-division.js').numberDivide} NumberDivide */

/**
 * Presets: a polynomial division and a number division with the same
 * number of rounds. Polynomials are coefficients by degree.
 * @type {Array<{ id: string, label: string, p: number[], q: number[], a: number, b: number }>}
 */
export const PRESETS = [
  {
    id: 'don-thuc',
    label: 'Chia cho đơn thức',
    p: [0, 0, 0, -2, 5, 0, -1],
    q: [0, 0, 0.5],
    a: 936,
    b: 3,
  },
  {
    id: 'chia-het',
    label: 'Chia hết',
    p: [-2, 6, -3, -3, 2],
    q: [-2, 0, 1],
    a: 3192,
    b: 12,
  },
  {
    id: 'khuyet',
    label: 'Thương khuyết bậc',
    p: [3, -9, -2, 6],
    q: [-1, 3],
    a: 864,
    b: 24,
  },
  {
    id: 'co-du',
    label: 'Chia có dư',
    p: [7, -1, -3, 5],
    q: [1, 0, 1],
    a: 467,
    b: 15,
  },
];

/** The three actions of a round, in order. */
export const ACTIONS = ['chia', 'nhân', 'trừ'];

/**
 * How far a stepped division has got: `step` counts actions done, three per
 * round. Returns, for round r, how many of its actions are visible (0 to 3).
 * @param {number} step
 * @param {number} r
 */
export function shownIn(step, r) {
  return Math.max(0, Math.min(3, step - 3 * r));
}

/**
 * Plain-text narration of the action just done in a polynomial division.
 * @param {ReturnType<LongDivide>} div
 * @param {number[]} q the divisor
 * @param {number} step 1 to 3 × rounds
 */
export function polyNarration(div, q, step) {
  const r = Math.floor((step - 1) / 3);
  const action = (step - 1) % 3;
  const round = div.rounds[r];
  const lq = termText(lead(q));
  if (action === 0) {
    const from =
      r === 0 ? 'hạng tử bậc cao nhất của đa thức bị chia' : 'hạng tử bậc cao nhất của dư vừa có';
    return `Chia: lấy ${from} chia cho ${lq}, được ${termText(round.term)}. Viết ${termText(round.term)} vào thương.`;
  }
  if (action === 1) {
    return `Nhân: ${termText(round.term)} nhân với đa thức chia, được ${polyText(round.product)}. Viết tích dưới đa thức đang chia, các hạng tử cùng bậc thẳng cột.`;
  }
  const last = r === div.rounds.length - 1;
  const restText = polyText(round.rest);
  if (!last)
    return `Trừ: được dư ${restText}. Dư này có bậc chưa nhỏ hơn bậc của đa thức chia nên chia tiếp.`;
  if (round.rest.length === 0)
    return `Trừ: được dư 0. Phép chia hết, thương là ${polyText(div.quotient)}.`;
  return `Trừ: được dư ${restText}, có bậc nhỏ hơn bậc của đa thức chia nên dừng. Thương ${polyText(div.quotient)}, dư ${restText}.`;
}

/**
 * Plain-text narration of the action just done in a number division.
 * @param {ReturnType<NumberDivide>} div
 * @param {number} b the divisor
 * @param {number} step 1 to 3 × rounds
 */
export function numberNarration(div, b, step) {
  const r = Math.floor((step - 1) / 3);
  const action = (step - 1) % 3;
  const round = div.rounds[r];
  if (action === 0)
    return `Chia: ${round.partial} chia ${b} được ${round.digit}, viết ${round.digit} vào thương.`;
  if (action === 1) return `Nhân: ${round.digit} nhân ${b} bằng ${round.product}.`;
  const last = r === div.rounds.length - 1;
  if (!last) {
    const next = div.rounds[r + 1].partial;
    return `Trừ: ${round.partial} trừ ${round.product} bằng ${round.rest}, hạ chữ số tiếp theo được ${next}.`;
  }
  return `Trừ: ${round.partial} trừ ${round.product} bằng ${round.rest}. Hết chữ số để hạ: thương ${div.quotient}, dư ${div.remainder}.`;
}
