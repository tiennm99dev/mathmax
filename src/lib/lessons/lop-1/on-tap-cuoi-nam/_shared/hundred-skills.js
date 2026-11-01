/**
 * Year-end review questions on the numbers and calculations within 100:
 * reading a two-digit number, tens and ones (with counting sticks),
 * comparing, the largest and smallest number, counting rows by ones and by
 * tens, adding and subtracting whole tens, two-digit addition and
 * subtraction without carrying, and short word problems. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import {
  compareReason,
  compareSign,
  placeText,
  readNumber,
  tensOnes,
} from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { COUNTABLE, minus, plus } from './ten-skills.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<import('./visual.js').Visual>} KidSkill */

/**
 * Up to four number options for a two-digit answer, in increasing order:
 * the right one and the mistakes a child makes there (one off, ten off,
 * the digits swapped), all from `lo` to `hi`.
 * @param {() => number} rand
 * @param {number} right
 * @param {number} [lo]
 * @param {number} [hi]
 * @returns {{ options: string[], answer: number }}
 */
export function bigOptions(rand, right, lo = 0, hi = 99) {
  const near = [right - 1, right + 1, right - 10, right + 10];
  if (right >= 10 && right < 100) near.push((right % 10) * 10 + Math.floor(right / 10));
  const others = [...new Set(near)].filter((v) => v !== right && v >= lo && v <= hi);
  const values = [right, ...shuffle(rand, others).slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/** @type {KidSkill} */
export const readSkill = {
  id: 'doc-so-100',
  label: 'Đọc, viết số',
  make(rand) {
    const n = int(rand, 11, 99);
    const word = readNumber(n);
    const solution = `Số ${n} đọc là "${word}".`;
    if (rand() < 0.5) {
      const swapped = (n % 10) * 10 + Math.floor(n / 10);
      const near = n % 10 === 0 ? n + 1 : n - 1;
      const wrong = [swapped, near, n + 10, n - 10]
        .filter((v) => v !== n && v >= 1 && v <= 99)
        .map((v) => readNumber(v));
      return {
        prompt: `Số ${n} đọc là gì?`,
        ...mixOptions(rand, word, wrong.slice(0, 2)),
        hint: 'Em đọc chữ số hàng chục trước, rồi đọc chữ số hàng đơn vị.',
        solution,
      };
    }
    return {
      prompt: `Số nào đọc là "${word}"?`,
      ...bigOptions(rand, n, 1, 99),
      hint: 'Tiếng đầu cho em biết số chục, tiếng sau cho em biết số đơn vị.',
      solution,
    };
  },
};

/** @type {KidSkill} */
export const placeSkill = {
  id: 'chuc-don-vi',
  label: 'Chục và đơn vị',
  make(rand) {
    const tens = int(rand, 1, 9);
    const ones = int(rand, 1, 9);
    const n = 10 * tens + ones;
    if (rand() < 0.5) {
      return {
        prompt: 'Có tất cả bao nhiêu que tính?',
        visual: { type: 'sticks', tens, ones },
        ...bigOptions(rand, n, 10, 99),
        hint: 'Mỗi bó có 1 chục que tính. Em đếm số bó, rồi đếm số que rời.',
        solution: `Có ${tens} bó một chục và ${ones} que rời: ${placeText(tens, ones)}. Đó là số ${n}.`,
      };
    }
    const wrong = [
      ones === tens ? placeText(tens, 0) : placeText(ones, tens),
      tens < 9 ? placeText(tens + 1, ones) : placeText(tens - 1, ones),
    ];
    return {
      prompt: `Số ${n} gồm mấy chục và mấy đơn vị?`,
      ...mixOptions(rand, placeText(tens, ones), wrong),
      hint: 'Chữ số bên trái chỉ số chục, chữ số bên phải chỉ số đơn vị.',
      solution: `Số ${n} gồm ${placeText(tens, ones)}.`,
    };
  },
};

/** @type {KidSkill} */
export const compareSkill = {
  id: 'so-sanh-100',
  label: 'So sánh số có hai chữ số',
  make(rand) {
    const a = int(rand, 10, 99);
    const roll = rand();
    let b = int(rand, 10, 99);
    if (roll < 0.35) b = 10 * Math.floor(a / 10) + int(rand, 0, 9);
    else if (roll < 0.5) b = (a % 10) * 10 + Math.floor(a / 10);
    else if (roll < 0.6) b = a;
    if (b < 10) b = a;
    const sign = compareSign(a, b);
    return {
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      ...signOptions(sign),
      hint: 'Em so sánh hàng chục trước. Hàng chục bằng nhau thì so sánh hàng đơn vị.',
      solution: compareReason(a, b),
    };
  },
};

/** @type {KidSkill} */
export const extremeSkill = {
  id: 'lon-be-100',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const tens = int(rand, 1, 8);
    // Two of the four share their tens, so the ones digit matters too.
    const pool = new Set([10 * tens + int(rand, 0, 4), 10 * tens + int(rand, 5, 9)]);
    while (pool.size < 4) pool.add(int(rand, 10, 99));
    const values = shuffle(rand, [...pool]);
    const sorted = [...values].sort((x, y) => x - y);
    const biggest = rand() < 0.5;
    const right = biggest ? sorted[3] : sorted[0];
    return {
      prompt: `Trong các số dưới đây, số nào ${biggest ? 'lớn nhất' : 'bé nhất'}?`,
      options: values.map(String),
      answer: values.indexOf(right),
      hint: 'Em so sánh hàng chục trước. Hai số cùng số chục thì xem hàng đơn vị.',
      solution: `Xếp từ bé đến lớn: ${sorted.join(', ')}. Số ${biggest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
    };
  },
};

/** @type {KidSkill} */
export const rowSkill = {
  id: 'day-so-100',
  label: 'Điền số vào dãy',
  make(rand) {
    const byTens = rand() < 0.4;
    const step = byTens ? 10 : 1;
    const start = byTens ? 10 * int(rand, 1, 6) : int(rand, 11, 96);
    const row = [0, 1, 2, 3].map((i) => start + i * step);
    const gap = int(rand, 1, 3);
    const shown = row.map((v, i) => (i === gap ? '?' : String(v)));
    return {
      prompt: `Chọn số thay cho dấu hỏi: ${shown.join(', ')}`,
      ...bigOptions(rand, row[gap], 10, 99),
      hint: byTens
        ? 'Mỗi số hơn số đứng trước 1 chục. Em đếm thêm 1 chục.'
        : 'Các số xếp từ bé đến lớn. Em đếm thêm 1.',
      solution: `Dãy số đầy đủ: ${row.join(', ')}. Số cần điền là ${row[gap]}.`,
    };
  },
};

/** @type {KidSkill} */
export const tensSkill = {
  id: 'tron-chuc',
  label: 'Cộng, trừ số tròn chục',
  make(rand) {
    const x = int(rand, 1, 8);
    const y = int(rand, 1, 9 - x);
    if (rand() < 0.5) {
      return {
        prompt: `${plus(10 * x, 10 * y)} = ?`,
        ...bigOptions(rand, 10 * (x + y), 10, 99),
        hint: `${x} chục cộng ${y} chục bằng mấy chục?`,
        solution: `${x} chục + ${y} chục = ${x + y} chục. Vậy ${plus(10 * x, 10 * y, 10 * (x + y))}.`,
      };
    }
    const n = x + y;
    return {
      prompt: `${minus(10 * n, 10 * x)} = ?`,
      ...bigOptions(rand, 10 * y, 0, 99),
      hint: `${n} chục bớt đi ${x} chục thì còn mấy chục?`,
      solution: `${n} chục ${MINUS} ${x} chục = ${y} chục. Vậy ${minus(10 * n, 10 * x, 10 * y)}.`,
    };
  },
};

/**
 * A two-digit number and a one- or two-digit number whose sum has no carry
 * and stays below 100.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function noCarryAddends(rand) {
  const t1 = int(rand, 1, 8);
  const u1 = int(rand, 0, 8);
  const u2 = int(rand, 1, 9 - u1);
  const t2 = rand() < 0.4 ? 0 : int(rand, 1, 9 - t1);
  return [10 * t1 + u1, 10 * t2 + u2];
}

/**
 * A two-digit number and a smaller one- or two-digit number whose
 * difference needs no borrowing.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function noBorrowPair(rand) {
  const t1 = int(rand, 1, 9);
  const u1 = int(rand, 1, 9);
  const u2 = int(rand, 0, u1);
  const t2 = rand() < 0.4 || t1 === 1 ? 0 : int(rand, 1, t1 - 1);
  const b = 10 * t2 + u2;
  return [10 * t1 + u1, b === 0 ? 1 : b];
}

/**
 * The working of a no-carry addition or no-borrow subtraction, column by
 * column: ones first, then tens.
 * @param {number} a
 * @param {number} b
 * @param {'+' | '-'} op
 */
function columnWords(a, b, op) {
  const sign = op === '+' ? '+' : MINUS;
  const x = tensOnes(a);
  const y = tensOnes(b);
  const ones = op === '+' ? x.ones + y.ones : x.ones - y.ones;
  const tens = op === '+' ? x.tens + y.tens : x.tens - y.tens;
  const sentence = op === '+' ? plus(a, b, a + b) : minus(a, b, a - b);
  return `Hàng đơn vị: ${x.ones} ${sign} ${y.ones} = ${ones}. Hàng chục: ${x.tens} ${sign} ${y.tens} = ${tens}. Vậy ${sentence}.`;
}

/** @type {KidSkill} */
export const addSkill = {
  id: 'cong-100',
  label: 'Phép cộng không nhớ',
  make(rand) {
    const [a, b] = noCarryAddends(rand);
    return {
      prompt: `${plus(a, b)} = ?`,
      ...bigOptions(rand, a + b, 10, 99),
      hint: 'Em cộng đơn vị với đơn vị, rồi cộng chục với chục.',
      solution: columnWords(a, b, '+'),
    };
  },
};

/** @type {KidSkill} */
export const subtractSkill = {
  id: 'tru-100',
  label: 'Phép trừ không nhớ',
  make(rand) {
    const [a, b] = noBorrowPair(rand);
    return {
      prompt: `${minus(a, b)} = ?`,
      ...bigOptions(rand, a - b, 0, 99),
      hint: 'Em trừ đơn vị cho đơn vị, rồi trừ chục cho chục.',
      solution: columnWords(a, b, '-'),
    };
  },
};

/** @type {KidSkill} */
export const storySkill = {
  id: 'bai-toan-100',
  label: 'Bài toán',
  make(rand) {
    const noun = pictures[pick(rand, COUNTABLE)];
    if (rand() < 0.5) {
      const [a, b] = noCarryAddends(rand);
      return {
        prompt: `Có ${a} ${noun}. Thêm ${b} ${noun} nữa. Có tất cả bao nhiêu ${noun}?`,
        ...bigOptions(rand, a + b, 10, 99),
        hint: 'Thêm vào thì em làm phép cộng.',
        solution: `${plus(a, b, a + b)}. Có tất cả ${a + b} ${noun}.`,
      };
    }
    const [a, b] = noBorrowPair(rand);
    return {
      prompt: `Có ${a} ${noun}. Bớt đi ${b} ${noun}. Còn lại bao nhiêu ${noun}?`,
      ...bigOptions(rand, a - b, 0, 99),
      hint: 'Bớt đi thì em làm phép trừ.',
      solution: `${minus(a, b, a - b)}. Còn lại ${a - b} ${noun}.`,
    };
  },
};

/** The parts of the review of numbers and calculations within 100, in the book's order. */
export const HUNDRED_SKILLS = [
  readSkill,
  placeSkill,
  compareSkill,
  extremeSkill,
  rowSkill,
  tensSkill,
  addSkill,
  subtractSkill,
  storySkill,
];
