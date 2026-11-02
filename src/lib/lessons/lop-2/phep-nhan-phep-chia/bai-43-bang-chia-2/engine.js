/** The cards that turn the table of 2 into the table of division by 2, and its quiz round. */
import { buildDivisionRound, divLine } from '../_shared/divide.js';
import { mulLine } from '../_shared/times.js';

export const BASE = 2;

/** @type {readonly import('../_shared/divide.js').Story[]} */
const STORIES = [
  (n) => ({ prompt: `Đàn gà có ${BASE * n} cái chân. Đàn gà có mấy con?`, unit: 'con' }),
  (n) => ({ prompt: `Có ${BASE * n} chiếc đũa, xếp thành từng đôi. Có mấy đôi đũa?`, unit: 'đôi' }),
  (n) => ({
    prompt: `Bà có ${BASE * n} quả vải, chia đều cho 2 cháu. Mỗi cháu được mấy quả?`,
    unit: 'quả',
  }),
];

/** @param {number} seed */
export const round = (seed) => buildDivisionRound(BASE, STORIES, seed);

/** The rows of the table, from 1 to 10. */
export const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

/**
 * The two faces of the card of row `n`.
 * @param {number} n
 */
export const cardFaces = (n) => ({ front: mulLine(BASE, n), back: divLine(BASE * n, BASE) });

/**
 * What the widget says after a card turns.
 * @param {number | null} last the row just turned, or null
 * @param {number} turned how many cards show their division
 */
export function flipMessage(last, turned) {
  if (turned === 10) return 'Em đã lập xong bảng chia 2 từ bảng nhân 2!';
  if (last === null)
    return 'Em chạm vào một thẻ để lật. Mặt sau là phép chia đi cùng phép nhân đó.';
  const { front, back } = cardFaces(last);
  return `${front}, nên ${back}. Có ${BASE * last} quả táo, mỗi đĩa ${BASE} quả thì được ${last} đĩa.`;
}
