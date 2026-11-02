/**
 * The table of 9 and its pattern: going down the table the tens digit goes up
 * by one and the ones digit down by one, so the two digits always add up to 9.
 * Pure and DOM-free.
 */
import { pick, rng } from '#lib/core/drill.js';
import { divLine, mulLine } from '../_shared/times.js';
import { buildTableRound, tableKindLabels } from '../_shared/table-round.js';

/** The table of this lesson. */
export const BASE = 9;

/** The rows of the table. */
export const MAX_ROWS = 10;

/**
 * The digits of `9 × n`, with 0 tens for the first row.
 * @param {number} n 1-10
 */
export function digitsOf(n) {
  const product = BASE * n;
  return { tens: Math.floor(product / 10), ones: product % 10 };
}

/**
 * What a row of the digit table says.
 * @param {number} n 1-10
 */
export function patternMessage(n) {
  const { tens, ones } = digitsOf(n);
  const line = mulLine(BASE, n);
  const sum = `${tens} + ${ones} = ${tens + ones}`;
  if (n === 1) return `${line}. Em coi 9 là 0 chục và 9 đơn vị: ${sum}.`;
  const change = `So với dòng trên, chữ số hàng chục thêm 1, chữ số hàng đơn vị bớt 1.`;
  return `${line}. Hai chữ số: ${sum}. ${change}`;
}

/**
 * What the grid says after ringing `ringed` rows of nine out of row `n` of the
 * division table.
 * @param {number} n
 * @param {number} ringed
 */
export function divMessage(n, ringed) {
  const total = BASE * n;
  if (ringed === 0) return `Có ${total} chấm. Khoanh được mấy hàng, mỗi hàng 9 chấm?`;
  if (ringed >= n) {
    return `Hết chấm rồi! Khoanh được ${n} hàng. Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`;
  }
  return `Đã khoanh ${ringed} hàng, còn ${total - BASE * ringed} chấm.`;
}

/** @type {readonly import('../_shared/table-round.js').Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Mỗi đội múa rồng có 9 người. ${n} đội có bao nhiêu người?`,
    unit: 'người',
    divide: false,
  }),
  (n) => ({
    prompt: `Mỗi thuyền có 9 người. ${n} thuyền có bao nhiêu người?`,
    unit: 'người',
    divide: false,
  }),
  (n) => ({
    prompt: `Chia đều ${BASE * n} lít nước mắm vào 9 can. Mỗi can có mấy lít?`,
    unit: 'lít',
    divide: true,
  }),
  (n) => ({
    prompt: `Có ${BASE * n} quả cam, xếp vào các túi, mỗi túi 9 quả. Xếp được mấy túi?`,
    unit: 'túi',
    divide: true,
  }),
];

const ASK = {
  label: 'Đọc lưới chấm',
  prompt: 'Mỗi hàng có 9 chấm. Hình có tất cả bao nhiêu chấm?',
  hint: 'Em đếm số hàng, rồi đếm thêm 9 theo từng hàng.',
  solution: (/** @type {number} */ n) => `${n} hàng, mỗi hàng 9 chấm: ${mulLine(BASE, n)}.`,
};

/** What each part of the round practises. */
export const KIND_LABELS = {
  ...tableKindLabels(BASE, ASK.label),
  pattern: 'Quy luật bảng 9',
};

/**
 * Tell a result of the table from its neighbours by the sum of its digits. One
 * more, one less or ten more never gives a digit sum of 9 here.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<import('../_shared/table-round.js').RoundVisual>}
 */
function patternQuestion(rand) {
  const n = pick(rand, [2, 3, 4, 5, 6, 7, 8, 9]);
  const right = BASE * n;
  const values = [right, right - 1, right + 1, right + 10].sort((x, y) => x - y);
  const { tens, ones } = digitsOf(n);
  return {
    kind: 'pattern',
    visual: { n, open: false, quotient: false },
    prompt: 'Số nào có trong bảng nhân 9?',
    options: values.map(String),
    answer: values.indexOf(right),
    hint: 'Em cộng hai chữ số của mỗi số. Tổng phải bằng 9.',
    solution: `${tens} + ${ones} = 9 và ${mulLine(BASE, n)}.`,
  };
}

/**
 * A round of nine questions: eight on different rows of the table and one on
 * its pattern.
 * @param {number} seed
 */
export function buildRound(seed) {
  return [...buildTableRound(seed, BASE, STORIES, ASK), patternQuestion(rng(seed + 1000))];
}
