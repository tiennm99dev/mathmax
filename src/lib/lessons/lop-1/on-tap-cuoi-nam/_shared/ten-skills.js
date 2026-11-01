/**
 * Year-end review questions on the numbers and calculations within 10:
 * counting, comparing with >, < and =, the largest and smallest number,
 * splitting a number into two parts, adding, subtracting, the missing
 * number, the calculation a picture shows and short word problems.
 * Calculations are printed the book's way, with the minus sign "−". Pure
 * and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { pictureGroups, pictures } from '#lib/core/kid/pictures/index.js';
import { SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';
import { mixOptions, numberOptions, signOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<import('./visual.js').Visual>} KidSkill */

/** Pictures that are counted in the questions. */
export const COUNTABLE = /** @type {const} */ ([
  ...pictureGroups.fruit,
  ...pictureGroups.animals,
  ...pictureGroups.things,
]);

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
export const countSkill = {
  id: 'dem',
  label: 'Đếm số lượng',
  make(rand) {
    const picture = pick(rand, COUNTABLE);
    const noun = pictures[picture];
    const n = int(rand, 1, 10);
    return {
      prompt: `Có mấy ${noun}?`,
      visual: { type: 'groups', groups: [{ picture, n }] },
      ...numberOptions(rand, n, 1, 10),
      hint: `Em chỉ tay vào từng ${noun} và đếm: một, hai, ba, ...`,
      solution: `Em đếm từ một đến ${readNumber(n)}. Có ${n} ${noun}.`,
    };
  },
};

/** @type {KidSkill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh hai số',
  make(rand) {
    const a = int(rand, 0, 10);
    const b = rand() < 0.25 ? a : int(rand, 0, 10);
    const sign = compareSign(a, b);
    return {
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      ...signOptions(sign),
      hint:
        a === b
          ? 'Hai số này có giống nhau không?'
          : 'Khi đếm từ 0, số nào đếm sau thì số đó lớn hơn.',
      solution: `${a} ${SIGN_WORDS[sign]} ${b}, nên ${a} ${sign} ${b}.`,
    };
  },
};

/** @type {KidSkill} */
export const extremeSkill = {
  id: 'lon-be',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const values = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
    const sorted = [...values].sort((x, y) => x - y);
    const biggest = rand() < 0.5;
    const right = biggest ? sorted[3] : sorted[0];
    return {
      prompt: `Trong các số dưới đây, số nào ${biggest ? 'lớn nhất' : 'bé nhất'}?`,
      options: values.map(String),
      answer: values.indexOf(right),
      hint: biggest
        ? 'Em đếm từ 0 trở đi. Số nào được đếm sau cùng thì lớn nhất.'
        : 'Em đếm từ 0 trở đi. Số nào được đếm trước tiên thì bé nhất.',
      solution: `Xếp từ bé đến lớn: ${sorted.join(', ')}. Số ${biggest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
    };
  },
};

/** @type {KidSkill} */
export const splitSkill = {
  id: 'may-va-may',
  label: 'Mấy và mấy',
  make(rand) {
    const n = int(rand, 2, 10);
    const a = int(rand, 1, n - 1);
    const b = n - a;
    return {
      prompt: `${n} gồm ${a} và mấy?`,
      ...numberOptions(rand, b, 0, n),
      hint: `Em nghĩ: ${a} cộng mấy thì bằng ${n}?`,
      solution: `${plus(a, b, n)}. Vậy ${n} gồm ${a} và ${b}.`,
    };
  },
};

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
    let hint = `Em nghĩ: ${b} cộng mấy thì bằng ${n}?`;
    let solution = `${plus(b, r, n)}, nên ${minus(n, b, r)}.`;
    if (b === 0) {
      hint = 'Bớt đi 0 nghĩa là không bớt gì cả.';
      solution = `${minus(n, b, r)}. Một số trừ đi 0 thì bằng chính số đó.`;
    } else if (r === 0) {
      hint = `Có ${n}, em bớt đi hết cả ${n}. Còn lại bao nhiêu?`;
      solution = `${minus(n, b, r)}. Một số trừ đi chính nó thì bằng 0.`;
    }
    return { prompt: `${minus(n, b)} = ?`, ...numberOptions(rand, r), hint, solution };
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
        hint: `${a} cộng mấy thì bằng ${c}? Em đếm tiếp từ ${a}, đến ${c} thì dừng lại.`,
        solution: `${plus(a, b, c)}. Số cần điền là ${b}.`,
      };
    }
    return {
      prompt: `Chọn số thay cho dấu hỏi: ${c} ${MINUS} ? = ${a}`,
      ...numberOptions(rand, b),
      hint: `${c} bớt đi mấy thì còn ${a}? Em đếm lùi từ ${c}, đến ${a} thì dừng lại.`,
      solution: `${minus(c, b, a)}. Số cần điền là ${b}.`,
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

/** The parts of the review of numbers and calculations within 10, in the book's order. */
export const TEN_SKILLS = [
  countSkill,
  compareSkill,
  extremeSkill,
  splitSkill,
  addSkill,
  subtractSkill,
  missingSkill,
  pictureSkill,
  storySkill,
];
