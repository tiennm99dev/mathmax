/**
 * Review questions on addition and subtraction within 10: adding,
 * subtracting, the missing number, comparing a result with a number, the
 * calculation a picture shows, short word problems and finding the
 * calculation with a given result. Calculations are printed the book's way,
 * with the minus sign "−". Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { MINUS } from '#lib/core/number-format.js';
import { COUNTABLE } from './number-skills.js';
import { SIGN_WORDS, mixOptions, numberOptions, signOf, signOptions } from './quiz.js';

/** @typedef {import('./quiz.js').KidSkill} KidSkill */

/**
 * "3 + 2" or, with `result`, "3 + 2 = 5".
 * @param {number} a
 * @param {number} b
 * @param {number} [result]
 */
export function plus(a, b, result) {
  return result === undefined ? `${a} + ${b}` : `${a} + ${b} = ${result}`;
}

/**
 * "5 − 2" or, with `result`, "5 − 2 = 3".
 * @param {number} a
 * @param {number} b
 * @param {number} [result]
 */
export function minus(a, b, result) {
  return result === undefined ? `${a} ${MINUS} ${b}` : `${a} ${MINUS} ${b} = ${result}`;
}

/**
 * Two parts a and b with a + b at most 10, each part at least `least`.
 * @param {() => number} rand
 * @param {number} [least]
 * @returns {[number, number]}
 */
function parts(rand, least = 1) {
  const c = int(rand, 2 * least, 10);
  const a = int(rand, least, c - least);
  return [a, c - a];
}

/** @type {KidSkill} */
export const addSkill = {
  id: 'cong',
  label: 'Phép cộng',
  make(rand) {
    const [a, b] = parts(rand, rand() < 0.15 ? 0 : 1);
    const hint =
      b === 0
        ? 'Một số cộng với 0 thì bằng chính số đó.'
        : a === 0
          ? '0 cộng với một số thì bằng chính số đó.'
          : `Có ${a}, em đếm thêm ${b} nữa.`;
    return {
      prompt: `${plus(a, b)} = ?`,
      ...numberOptions(rand, a + b),
      hint,
      solution: `${plus(a, b, a + b)}.`,
    };
  },
};

/** @type {KidSkill} */
export const subtractSkill = {
  id: 'tru',
  label: 'Phép trừ',
  make(rand) {
    const [b, r] = parts(rand, rand() < 0.15 ? 0 : 1);
    const n = b + r;
    if (b === 0 || r === 0) {
      return {
        prompt: `${minus(n, b)} = ?`,
        ...numberOptions(rand, r),
        hint:
          b === 0
            ? 'Bớt đi 0 nghĩa là không bớt gì cả.'
            : `Có ${n}, em bớt đi hết cả ${n}. Còn lại bao nhiêu?`,
        solution:
          b === 0
            ? `${minus(n, b, r)}. Một số trừ đi 0 thì bằng chính số đó.`
            : `${minus(n, b, r)}. Một số trừ đi chính nó thì bằng 0.`,
      };
    }
    return {
      prompt: `${minus(n, b)} = ?`,
      ...numberOptions(rand, r),
      hint: `Em nghĩ: ${b} cộng mấy thì bằng ${n}?`,
      solution: `${plus(b, r, n)}, nên ${minus(n, b, r)}.`,
    };
  },
};

/** @type {KidSkill} */
export const missingSkill = {
  id: 'so-thieu',
  label: 'Tìm số còn thiếu',
  make(rand) {
    const [a, b] = parts(rand);
    const c = a + b;
    if (rand() < 0.5) {
      return {
        prompt: `Chọn số thay cho dấu hỏi: ${a} + ? = ${c}`,
        ...numberOptions(rand, b),
        hint: `${a} cộng mấy thì bằng ${c}? Em đếm tiếp từ ${a}, vừa đếm vừa giơ ngón tay.`,
        solution: `${plus(a, b, c)}. Số cần điền là ${b}.`,
      };
    }
    return {
      prompt: `Chọn số thay cho dấu hỏi: ${c} ${MINUS} ? = ${a}`,
      ...numberOptions(rand, b),
      hint: `${c} bớt đi mấy thì còn ${a}? Em đếm lùi từ ${c}, vừa đếm vừa giơ ngón tay.`,
      solution: `${minus(c, b, a)}. Số cần điền là ${b}.`,
    };
  },
};

/** @type {KidSkill} */
export const compareResultSkill = {
  id: 'so-sanh-phep-tinh',
  label: 'So sánh phép tính với số',
  make(rand) {
    const [x, y] = parts(rand);
    const add = rand() < 0.5;
    const value = add ? x + y : x;
    const left = add ? plus(x, y) : minus(x + y, y);
    const other = rand() < 0.3 ? value : int(rand, Math.max(0, value - 2), Math.min(10, value + 2));
    const sign = signOf(value, other);
    return {
      prompt: `Chọn dấu đúng: ${left} ... ${other}`,
      ...signOptions(sign),
      hint: `Em tính ${left} trước, rồi so sánh kết quả với ${other}.`,
      solution: `${left} = ${value}. ${value} ${SIGN_WORDS[sign]} ${other}, nên ${left} ${sign} ${other}.`,
    };
  },
};

/** @type {KidSkill} */
export const pictureSkill = {
  id: 'nhin-hinh',
  label: 'Nhìn hình chọn phép tính',
  make(rand) {
    const picture = pick(rand, COUNTABLE);
    const noun = pictures[picture];
    if (rand() < 0.5) {
      const [a, b] = parts(rand);
      const c = a + b;
      return {
        prompt: 'Phép tính nào đúng với hình?',
        visual: {
          type: 'groups',
          groups: [
            { picture, n: a },
            { picture, n: b },
          ],
        },
        ...mixOptions(rand, plus(a, b, c), [plus(a, b, c === 10 ? 8 : c + 1), plus(a, b, c - 1)]),
        hint: 'Em đếm từng nhóm, rồi gộp hai nhóm lại.',
        solution: `Nhóm thứ nhất có ${a} ${noun}, nhóm thứ hai có ${b} ${noun}. Gộp lại: ${plus(a, b, c)}.`,
      };
    }
    const [gone, rest] = parts(rand);
    const total = gone + rest;
    return {
      prompt: 'Phép tính nào đúng với hình?',
      visual: { type: 'takeaway', picture, total, gone },
      ...mixOptions(rand, minus(total, gone, rest), [
        minus(total, gone, rest + 1),
        minus(total, gone, rest - 1),
      ]),
      hint: `Có tất cả mấy ${noun}? Mấy ${noun} bị gạch đi?`,
      solution: `Có ${total} ${noun}, gạch đi ${gone} ${noun}, còn lại ${rest} ${noun}: ${minus(total, gone, rest)}.`,
    };
  },
};

/** @type {KidSkill} */
export const storySkill = {
  id: 'bai-toan',
  label: 'Bài toán',
  make(rand) {
    const picture = pick(rand, COUNTABLE);
    const noun = pictures[picture];
    const [a, b] = parts(rand);
    if (rand() < 0.5) {
      return {
        prompt: `Có ${a} ${noun}. Thêm ${b} ${noun} nữa. Có tất cả mấy ${noun}?`,
        ...numberOptions(rand, a + b),
        hint: 'Thêm vào thì em làm phép cộng.',
        solution: `${plus(a, b, a + b)}. Có tất cả ${a + b} ${noun}.`,
      };
    }
    const n = a + b;
    return {
      prompt: `Có ${n} ${noun}. Bớt đi ${a} ${noun}. Còn lại mấy ${noun}?`,
      ...numberOptions(rand, b),
      hint: 'Bớt đi thì em làm phép trừ.',
      solution: `${minus(n, a, b)}. Còn lại ${b} ${noun}.`,
    };
  },
};

/**
 * A calculation within 10 whose result is `k`, as text.
 * @param {() => number} rand
 * @param {number} k
 */
function calcFor(rand, k) {
  if (rand() < 0.5) {
    const a = int(rand, 0, k);
    return plus(a, k - a);
  }
  const n = int(rand, k, 10);
  return minus(n, n - k);
}

/** @type {KidSkill} */
export const resultSkill = {
  id: 'ket-qua',
  label: 'Phép tính có kết quả cho trước',
  make(rand) {
    const k = int(rand, 1, 9);
    const right = calcFor(rand, k);
    const wrongResults = [k - 1, k + 1];
    const wrong = wrongResults.map((t) => calcFor(rand, t));
    const all = [
      [right, k],
      [wrong[0], wrongResults[0]],
      [wrong[1], wrongResults[1]],
    ];
    return {
      prompt: `Phép tính nào có kết quả bằng ${k}?`,
      ...mixOptions(rand, right, wrong),
      hint: `Em tính từng phép tính, rồi so kết quả với ${k}.`,
      solution: `${all.map(([text, v]) => `${text} = ${v}`).join('. ')}. Phép tính có kết quả bằng ${k} là ${right}.`,
    };
  },
};

/** The parts of the review on addition and subtraction. */
export const ARITH_SKILLS = [
  addSkill,
  subtractSkill,
  missingSkill,
  compareResultSkill,
  pictureSkill,
  storySkill,
  resultSkill,
];
