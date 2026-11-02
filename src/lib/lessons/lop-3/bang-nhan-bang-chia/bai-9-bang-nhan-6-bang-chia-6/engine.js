/**
 * The table of 6 on a grid of six dots to a row. Adding rows builds the
 * multiplication table, and the same grid read backwards gives the division:
 * the dots split into rows of six, as many rows as were added. Pure and DOM-free.
 */
import { divLine, mulLine, repeatedSum } from '../_shared/times.js';
import { buildTableRound, tableKindLabels } from '../_shared/table-round.js';

/** The table of this lesson. */
export const BASE = 6;

/** The most rows the grid holds, the last row of the table. */
export const MAX_ROWS = 10;

/**
 * What the grid says with `rows` rows of six.
 * @param {number} rows 1-10
 */
export function mulMessage(rows) {
  const sum = rows > 1 ? `${repeatedSum(BASE, rows)} = ${BASE * rows}. ` : '';
  if (rows === MAX_ROWS) {
    return `Đủ 10 hàng! ${sum}Đếm thêm 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.`;
  }
  return `${rows} hàng, mỗi hàng 6 chấm. ${sum}${mulLine(BASE, rows)}.`;
}

/**
 * The same grid read backwards.
 * @param {number} rows
 */
export function backwardsMessage(rows) {
  return `Đọc ngược lại: ${BASE * rows} chấm, mỗi hàng 6 chấm, được ${rows} hàng. ${divLine(BASE, rows)}.`;
}

/**
 * What the grid says after ringing `ringed` rows of six out of row `n` of the
 * division table.
 * @param {number} n
 * @param {number} ringed
 */
export function divMessage(n, ringed) {
  const total = BASE * n;
  if (ringed === 0) return `Có ${total} chấm. Khoanh được mấy hàng, mỗi hàng 6 chấm?`;
  if (ringed >= n) {
    return `Hết chấm rồi! Khoanh được ${n} hàng. Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`;
  }
  return `Đã khoanh ${ringed} hàng, còn ${total - BASE * ringed} chấm.`;
}

/** @type {readonly import('../_shared/table-round.js').Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Mỗi con bọ rùa có 6 chấm. ${n} con bọ rùa có bao nhiêu chấm?`,
    unit: 'chấm',
    divide: false,
  }),
  (n) => ({
    prompt: `Mỗi hộp có 6 chiếc bút chì màu. ${n} hộp có bao nhiêu chiếc bút?`,
    unit: 'chiếc bút',
    divide: false,
  }),
  (n) => ({
    prompt: `Xếp đều ${BASE * n} quả trứng vào 6 khay. Mỗi khay có mấy quả trứng?`,
    unit: 'quả trứng',
    divide: true,
  }),
  (n) => ({
    prompt: `Có ${BASE * n} bạn, chia thành các nhóm, mỗi nhóm 6 bạn. Chia được mấy nhóm?`,
    unit: 'nhóm',
    divide: true,
  }),
];

const ASK = {
  label: 'Đọc lưới chấm',
  prompt: 'Mỗi hàng có 6 chấm. Hình có tất cả bao nhiêu chấm?',
  hint: 'Em đếm số hàng, rồi đếm thêm 6 theo từng hàng.',
  solution: (/** @type {number} */ n) => `${n} hàng, mỗi hàng 6 chấm: ${mulLine(BASE, n)}.`,
};

/** What each part of the round practises. */
export const KIND_LABELS = tableKindLabels(BASE, ASK.label);

/**
 * A round of eight questions, each on a different row of the table.
 * @param {number} seed
 */
export const buildRound = (seed) => buildTableRound(seed, BASE, STORIES, ASK);
