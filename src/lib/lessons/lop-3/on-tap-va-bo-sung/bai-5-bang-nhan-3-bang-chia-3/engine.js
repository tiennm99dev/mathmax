/**
 * The table of 3 on the number line: forward hops of 3 build the multiplication
 * table, backward hops from a multiple of 3 back to 0 count how many threes
 * make it, which is the division table. Also the quiz round. Pure and DOM-free.
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
export const BASE = 3;

/**
 * The arcs of `step` hops of 3 from 0.
 * @param {number} step
 */
export function hopsUp(step) {
  return Array.from({ length: step }, (_, i) => ({
    from: BASE * i,
    to: BASE * (i + 1),
    label: `+${BASE}`,
  }));
}

/**
 * The arcs of `done` hops of 3 back from `start`.
 * @param {number} start
 * @param {number} done
 */
export function hopsDown(start, done) {
  return Array.from({ length: done }, (_, i) => ({
    from: start - BASE * i,
    to: start - BASE * (i + 1),
    label: `−${BASE}`,
  }));
}

/**
 * What the widget says after `step` hops forward.
 * @param {number} step 0-10
 */
export function upMessage(step) {
  if (step === 0) return 'Em đứng ở số 0. Em chạm "Nhảy thêm 3" để bắt đầu.';
  const list = hopsUp(step)
    .map((h) => h.to)
    .join(', ');
  if (step === 10) return `Xong bảng nhân 3! Đếm thêm 3: ${list}.`;
  const sum = step > 1 ? `${repeatedSum(BASE, step)} = ${BASE * step}. ` : '';
  return `${step} lần 3: ${sum}${mulLine(BASE, step)}.`;
}

/**
 * What the widget says after `done` hops back from row `n` of the division
 * table.
 * @param {number} n
 * @param {number} done
 */
export function downMessage(n, done) {
  const start = BASE * n;
  if (done === 0) return `Em đứng ở số ${start}. Lùi mấy bước 3 thì về số 0?`;
  if (done >= n) {
    return `Về số 0 rồi! Lùi ${n} bước 3. Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`;
  }
  return `Đã lùi ${done} bước, em đang ở số ${start - BASE * done}.`;
}

/**
 * A word problem on row `n` of the table.
 * @typedef {(n: number) => { prompt: string, unit: string, divide: boolean }} Story
 */

/** @type {readonly Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Mỗi xe xích lô có 3 bánh. ${n} xe xích lô có bao nhiêu bánh xe?`,
    unit: 'bánh xe',
    divide: false,
  }),
  (n) => ({
    prompt: `Mỗi nhóm có 3 bạn. ${n} nhóm có bao nhiêu bạn?`,
    unit: 'bạn',
    divide: false,
  }),
  (n) => ({
    prompt: `Chia đều ${BASE * n} que tính thành 3 bó. Mỗi bó có bao nhiêu que tính?`,
    unit: 'que tính',
    divide: true,
  }),
  (n) => ({
    prompt: `Có ${BASE * n} quả cam, xếp vào các đĩa, mỗi đĩa 3 quả. Xếp được mấy đĩa?`,
    unit: 'đĩa',
    divide: true,
  }),
];

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  mul: 'Bảng nhân 3',
  div: 'Bảng chia 3',
  skip: 'Đếm thêm 3',
  story: 'Bài toán',
});

/**
 * A round of eight questions, each on a different row of the table. `visual.n`
 * is the row a widget may draw on the number line once the question ends.
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<{ n: number }>[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const rows = shuffle(rand, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const kinds = ['mul', 'div', 'skip', 'story', 'mul', 'div', 'story', 'div'];
  return kinds.map((kind, i) => {
    const n = rows[i];
    const right = BASE * n;
    const visual = { n };
    if (kind === 'mul') {
      return {
        kind,
        visual,
        prompt: `3 × ${n} = ?`,
        ...productOptions(BASE, n),
        hint: `Em đếm thêm 3, đếm ${n} lần.`,
        solution: `${mulLine(BASE, n)}.`,
      };
    }
    if (kind === 'div') {
      return {
        kind,
        visual,
        prompt: `${right} : 3 = ?`,
        ...quotientOptions(BASE, n),
        hint: `Em nghĩ: 3 nhân với mấy thì bằng ${right}?`,
        solution: `Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`,
      };
    }
    if (kind === 'skip') {
      const shown = [right - 2 * BASE, right - BASE].filter((v) => v > 0);
      return {
        kind,
        visual,
        prompt: `Đếm thêm 3: ${shown.join(', ')}, ... Số tiếp theo là số nào?`,
        ...productOptions(BASE, n),
        hint: 'Em lấy số cuối cùng cộng thêm 3.',
        solution: `${right - BASE} + 3 = ${right}.`,
      };
    }
    const story = pick(rand, STORIES)(n);
    return {
      kind,
      visual,
      prompt: story.prompt,
      ...(story.divide ? quotientOptions(BASE, n) : productOptions(BASE, n)),
      hint: story.divide
        ? 'Chia đều: em làm phép chia.'
        : `3 được lấy ${n} lần. Em viết phép nhân.`,
      solution: `${story.divide ? divLine(BASE, n) : mulLine(BASE, n)} (${story.unit}).`,
    };
  });
}
