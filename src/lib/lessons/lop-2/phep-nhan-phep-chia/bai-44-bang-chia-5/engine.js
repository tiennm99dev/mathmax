/** The grid of five columns that reads the table of division by 5, and its quiz round. */
import { buildDivisionRound, divLine } from '../_shared/divide.js';

export const BASE = 5;

/** @type {readonly import('../_shared/divide.js').Story[]} */
const STORIES = [
  (n) => ({ prompt: `Có ${BASE * n} bông hoa cúc, mỗi bó 5 bông. Có mấy bó hoa?`, unit: 'bó' }),
  (n) => ({
    prompt: `Nam có ${BASE * n} hình tròn. Mỗi đèn ông sao cần 5 hình. Nam làm được mấy đèn?`,
    unit: 'đèn',
  }),
  (n) => ({ prompt: `${BASE * n} bạn chia đều thành 5 nhóm. Mỗi nhóm có mấy bạn?`, unit: 'bạn' }),
];

/** @param {number} seed */
export const round = (seed) => buildDivisionRound(BASE, STORIES, seed);

/** The rows of the grid, from 1 to 10. */
export const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

/**
 * What the widget says when `rows` rows are chosen.
 * @param {number} rows 0-10
 */
export function gridMessage(rows) {
  if (rows === 0) return 'Em chạm vào một hàng để chọn tổng số bông hoa.';
  const total = BASE * rows;
  return `${total} bông hoa xếp thành các hàng, mỗi hàng 5 bông: được ${rows} hàng. ${divLine(total, BASE)}, vì ${BASE} × ${rows} = ${total}.`;
}
