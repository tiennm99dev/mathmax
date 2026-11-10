/**
 * The mixed practice of the chapter "Phép cộng và phép trừ": column
 * addition and subtraction with carrying, mental sums of round numbers, the
 * commutative property, grouping terms into round sums, two numbers from
 * their sum and difference, and a real-life problem. One question of each
 * part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { carries, forgotCarry } from '../_shared/column.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Cộng có nhớ',
  tru: 'Trừ có nhớ',
  nham: 'Tính nhẩm',
  'giao-hoan': 'Tính chất giao hoán',
  'thuan-tien': 'Tính thuận tiện',
  'tong-hieu': 'Tổng và hiệu',
  'thuc-te': 'Bài toán thực tế',
});

/**
 * The right number among the slips a child makes, as options.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} slips
 */
function numberChoice(rand, right, slips) {
  const wrong = [...new Set(slips)].filter((v) => v !== right && v > 0).slice(0, 3);
  return mixOptions(rand, fmt(right), wrong.map(fmt));
}

/**
 * Two six-digit numbers whose sum or difference carries in two or more
 * columns and keeps six digits.
 * @param {() => number} rand
 * @param {'+' | '−'} op
 */
export function pairFor(rand, op) {
  for (;;) {
    const a = op === '+' ? int(rand, 100000, 499999) : int(rand, 500000, 999999);
    const b = op === '+' ? int(rand, 100000, 499999) : int(rand, 100000, a - 100000);
    if (carries(op, a, b) >= 2) return { a, b };
  }
}

/** Things counted in the real-life problems: the store, the unit, the word. */
const STORES = /** @type {const} */ ([
  { place: 'Một kho', thing: 'ki-lô-gam gạo', unit: 'kg' },
  { place: 'Một nhà máy', thing: 'chai nước', unit: 'chai' },
  { place: 'Một thư viện', thing: 'quyển sách', unit: 'quyển' },
]);

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  cong: (rand) => {
    const { a, b } = pairFor(rand, '+');
    const sum = a + b;
    return {
      prompt: `${fmt(a)} + ${fmt(b)} = ?`,
      ...numberChoice(rand, sum, [forgotCarry('+', a, b), sum + 10, sum - 1000, sum + 100]),
      hint: 'Em đặt tính, các chữ số cùng hàng thẳng cột. Cộng từ hàng đơn vị, nhớ 1 khi được 10 trở lên.',
      solution: `${fmt(a)} + ${fmt(b)} = ${fmt(sum)}.`,
    };
  },
  tru: (rand) => {
    const { a, b } = pairFor(rand, '−');
    const diff = a - b;
    return {
      prompt: `${fmt(a)} − ${fmt(b)} = ?`,
      ...numberChoice(rand, diff, [forgotCarry('−', a, b), diff + 10, diff + 1000, diff - 100]),
      hint: 'Em trừ từ hàng đơn vị. Chữ số trên bé hơn thì lấy thêm 10, rồi nhớ 1 cộng vào chữ số dưới ở hàng bên trái.',
      solution: `${fmt(a)} − ${fmt(b)} = ${fmt(diff)}. Thử lại: ${fmt(diff)} + ${fmt(b)} = ${fmt(a)}.`,
    };
  },
  nham: (rand) => {
    const x = int(rand, 2, 8);
    const y = int(rand, 1, 9 - x);
    const plus = rand() < 0.5;
    const a = (plus ? x : x + y) * 100000;
    const b = (plus ? y : x) * 100000;
    const right = plus ? a + b : a - b;
    const sign = plus ? '+' : '−';
    return {
      prompt: `Tính nhẩm: ${fmt(a)} ${sign} ${fmt(b)} = ?`,
      ...numberChoice(rand, right, [
        right / 10,
        right + 100000,
        right * 10,
        Math.abs(right - 100000),
      ]),
      hint: `Em nhẩm theo trăm nghìn: ${a / 100000} trăm nghìn ${sign} ${b / 100000} trăm nghìn.`,
      solution: `${a / 100000} trăm nghìn ${sign} ${b / 100000} trăm nghìn = ${right / 100000} trăm nghìn. Vậy ${fmt(a)} ${sign} ${fmt(b)} = ${fmt(right)}.`,
    };
  },
  'giao-hoan': (rand) => {
    const a = int(rand, 1000, 9999);
    const b = int(rand, 1000, 9999);
    const sum = a + b;
    return {
      prompt: `Biết ${fmt(a)} + ${fmt(b)} = ${fmt(sum)}. Vậy ${fmt(b)} + ${fmt(a)} = ?`,
      ...numberChoice(rand, sum, [sum + 10, sum - 10, b - a > 0 ? b - a : a - b]),
      hint: 'Khi đổi chỗ các số hạng trong một tổng thì tổng có thay đổi không?',
      solution: `Khi đổi chỗ các số hạng thì tổng không thay đổi: ${fmt(b)} + ${fmt(a)} = ${fmt(sum)}.`,
    };
  },
  'thuan-tien': (rand) => {
    const hundreds = pick(rand, [100, 200, 1000]);
    let a = int(rand, 11, hundreds - 11);
    if (a % 10 === 0) a += 3;
    const c = hundreds - a;
    let b = int(rand, 12, 98);
    while ((a + b) % 10 === 0 || (b + c) % 10 === 0) b += 1;
    const right = `(${fmt(a)} + ${fmt(c)}) + ${fmt(b)}`;
    return {
      prompt: `Cách nào tính ${fmt(a)} + ${fmt(b)} + ${fmt(c)} thuận tiện nhất?`,
      ...mixOptions(rand, right, [
        `(${fmt(a)} + ${fmt(b)}) + ${fmt(c)}`,
        `${fmt(a)} + (${fmt(b)} + ${fmt(c)})`,
      ]),
      hint: 'Em tìm hai số hạng có tổng tròn trăm hoặc tròn nghìn.',
      solution: `${fmt(a)} + ${fmt(c)} = ${fmt(hundreds)}, nên ${fmt(a)} + ${fmt(b)} + ${fmt(c)} = ${right} = ${fmt(hundreds)} + ${fmt(b)} = ${fmt(hundreds + b)}.`,
    };
  },
  'tong-hieu': (rand) => {
    const small = int(rand, 12, 60);
    const diff = int(rand, 4, 30);
    const big = small + diff;
    const sum = small + big;
    const askBig = rand() < 0.5;
    const right = askBig ? big : small;
    return {
      prompt: `Tổng của hai số là ${sum}, hiệu của hai số là ${diff}. Số ${askBig ? 'lớn' : 'bé'} là số nào?`,
      ...numberChoice(rand, right, [askBig ? small : big, sum - diff, sum + diff, right + 1]),
      hint: askBig ? 'Số lớn = (Tổng + Hiệu) : 2.' : 'Số bé = (Tổng − Hiệu) : 2.',
      solution: askBig
        ? `Số lớn là (${sum} + ${diff}) : 2 = ${big}. Số bé là ${big} − ${diff} = ${small}.`
        : `Số bé là (${sum} − ${diff}) : 2 = ${small}. Số lớn là ${small} + ${diff} = ${big}.`,
    };
  },
  'thuc-te': (rand) => {
    const { place, thing, unit } = pick(rand, STORES);
    const add = rand() < 0.5;
    const { a, b } = add ? pairFor(rand, '+') : pairFor(rand, '−');
    const right = add ? a + b : a - b;
    const story = add
      ? `${place} có ${fmt(a)} ${thing}, sau đó có thêm ${fmt(b)} ${thing}. Hỏi lúc đó có tất cả bao nhiêu ${thing}?`
      : `${place} có ${fmt(a)} ${thing}, đã chuyển đi ${fmt(b)} ${thing}. Hỏi còn lại bao nhiêu ${thing}?`;
    return {
      prompt: story,
      ...numberChoice(rand, right, [
        add ? a - b : a + b,
        forgotCarry(add ? '+' : '−', a, b),
        right + 1000,
      ]),
      hint: add
        ? 'Có thêm thì em làm phép cộng.'
        : 'Chuyển đi thì còn lại ít hơn: em làm phép trừ.',
      solution: `${fmt(a)} ${add ? '+' : '−'} ${fmt(b)} = ${fmt(right)} (${unit}).`,
    };
  },
};

/**
 * A round of the practice: one question of each part in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
