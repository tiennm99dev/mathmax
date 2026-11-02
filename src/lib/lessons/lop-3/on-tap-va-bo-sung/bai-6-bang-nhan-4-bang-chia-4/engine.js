/**
 * The table of 4 on a grid of dots, four to a row: adding rows builds the
 * multiplication table with the running total at each row's end, and ringing
 * rows of four out of the dots counts how many fours make it, which is the
 * division table. Also the quiz round. Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import {
  divLine,
  mulLine,
  productOptions,
  quotientOptions,
  repeatedSum,
} from '../_shared/times.js';

/** The table of this lesson. */
export const BASE = 4;

/** The most rows the grid holds, the last row of the table. */
export const MAX_ROWS = 10;

/**
 * What the grid says with `rows` rows of four.
 * @param {number} rows 1-10
 */
export function mulMessage(rows) {
  const sum = rows > 1 ? `${repeatedSum(BASE, rows)} = ${BASE * rows}. ` : '';
  if (rows === MAX_ROWS) {
    return `Đủ 10 hàng! ${sum}${mulLine(BASE, rows)}. Đếm thêm 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.`;
  }
  return `${rows} hàng, mỗi hàng 4 chấm. ${sum}${mulLine(BASE, rows)}.`;
}

/**
 * What the grid says after ringing `ringed` rows of four out of row `n` of the
 * division table.
 * @param {number} n
 * @param {number} ringed
 */
export function divMessage(n, ringed) {
  const total = BASE * n;
  if (ringed === 0) return `Có ${total} chấm. Khoanh được mấy hàng, mỗi hàng 4 chấm?`;
  if (ringed >= n) {
    return `Hết chấm rồi! Khoanh được ${n} hàng. Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`;
  }
  return `Đã khoanh ${ringed} hàng, còn ${total - BASE * ringed} chấm.`;
}

/**
 * A word problem on row `n` of the table.
 * @typedef {(n: number) => { prompt: string, unit: string, divide: boolean }} Story
 */

/** @type {readonly Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Mỗi ô tô có 4 bánh xe. ${n} ô tô như vậy có bao nhiêu bánh xe?`,
    unit: 'bánh xe',
    divide: false,
  }),
  (n) => ({
    prompt: `Mỗi bàn có 4 bạn ngồi. ${n} bàn có bao nhiêu bạn?`,
    unit: 'bạn',
    divide: false,
  }),
  (n) => ({
    prompt: `Xếp đều ${BASE * n} chiếc bánh vào 4 hộp. Mỗi hộp có mấy chiếc bánh?`,
    unit: 'chiếc bánh',
    divide: true,
  }),
  (n) => ({
    prompt: `Có ${BASE * n} bánh xe, mỗi ô tô lắp 4 bánh. Lắp được mấy ô tô?`,
    unit: 'ô tô',
    divide: true,
  }),
];

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  mul: 'Bảng nhân 4',
  div: 'Bảng chia 4',
  skip: 'Đếm thêm 4',
  dots: 'Đọc lưới chấm',
  story: 'Bài toán',
});

/**
 * A round of eight questions, each on a different row of the table. `visual.n`
 * is the row to draw as a grid of dots: `open` shows it while the question is
 * being asked, otherwise it appears once the question ends.
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<{ n: number, open: boolean }>[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const rows = shuffle(rand, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const kinds = ['mul', 'div', 'dots', 'skip', 'story', 'mul', 'div', 'story'];
  return kinds.map((kind, i) => {
    const n = rows[i];
    const right = BASE * n;
    if (kind === 'mul') {
      return {
        kind,
        visual: { n, open: false },
        prompt: `4 × ${n} = ?`,
        ...productOptions(BASE, n),
        hint: `Em đếm thêm 4, đếm ${n} lần.`,
        solution: `${mulLine(BASE, n)}.`,
      };
    }
    if (kind === 'div') {
      return {
        kind,
        visual: { n, open: false },
        prompt: `${right} : 4 = ?`,
        ...quotientOptions(BASE, n),
        hint: `Em nghĩ: 4 nhân với mấy thì bằng ${right}?`,
        solution: `Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`,
      };
    }
    if (kind === 'dots') {
      return {
        kind,
        visual: { n, open: true },
        prompt: 'Mỗi hàng có 4 chấm. Hình có tất cả bao nhiêu chấm?',
        ...productOptions(BASE, n),
        hint: 'Em đếm số hàng, rồi đếm thêm 4 theo từng hàng.',
        solution: `${n} hàng, mỗi hàng 4 chấm: ${mulLine(BASE, n)}.`,
      };
    }
    if (kind === 'skip') {
      const shown = [right - 2 * BASE, right - BASE].filter((v) => v > 0);
      return {
        kind,
        visual: { n, open: false },
        prompt: `Đếm thêm 4: ${shown.join(', ')}, ... Số tiếp theo là số nào?`,
        ...productOptions(BASE, n),
        hint: 'Em lấy số cuối cùng cộng thêm 4.',
        solution: `${right - BASE} + 4 = ${right}.`,
      };
    }
    const story = pick(rand, STORIES)(n);
    return {
      kind,
      visual: { n, open: false },
      prompt: story.prompt,
      ...(story.divide ? quotientOptions(BASE, n) : productOptions(BASE, n)),
      hint: story.divide
        ? 'Chia đều, hay mỗi nhóm 4: em làm phép chia.'
        : `4 được lấy ${n} lần. Em viết phép nhân.`,
      solution: `${story.divide ? divLine(BASE, n) : mulLine(BASE, n)} (${story.unit}).`,
    };
  });
}
