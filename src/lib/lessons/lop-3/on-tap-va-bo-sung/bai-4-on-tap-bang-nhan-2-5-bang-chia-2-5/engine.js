/**
 * The dot grid of this review, which turns a multiplication into its two
 * divisions and back, and the review questions on the tables of 2 and 5. Pure
 * and DOM-free; each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import {
  divLine,
  mulLine,
  productOptions,
  quotientOptions,
  repeatedSum,
} from '../_shared/times.js';

/** @typedef {{ type: 'dots', base: number, rows: number }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

/** The two tables of this review. */
export const TABLES = /** @type {const} */ ([2, 5]);

/** The most rows the grid holds, the last row of a table. */
export const MAX_ROWS = 10;

/**
 * The cumulative dots at the end of each row: 5, 10, 15.
 * @param {number} base
 * @param {number} rows
 */
export function runningTotals(base, rows) {
  return Array.from({ length: rows }, (_, i) => base * (i + 1));
}

/**
 * What the grid says while building a multiplication.
 * @param {number} base
 * @param {number} rows
 */
export function mulMessage(base, rows) {
  const sum = rows > 1 ? `${repeatedSum(base, rows)} = ${base * rows}. ` : '';
  return `${rows} hàng, mỗi hàng ${base} chấm. ${sum}${mulLine(base, rows)}.`;
}

/**
 * What the grid says while grouping the dots of a division.
 * @param {number} base
 * @param {number} rows
 * @param {number} ringed rows ringed so far
 */
export function divMessage(base, rows, ringed) {
  const total = base * rows;
  if (ringed >= rows) {
    return `Có ${total} chấm, mỗi hàng ${base} chấm, được ${rows} hàng: ${divLine(base, rows)}. Có ${total} chấm chia đều ${rows} hàng, mỗi hàng ${base} chấm: ${total} : ${rows} = ${base}.`;
  }
  if (ringed === 0) return `Có ${total} chấm. Em khoanh từng hàng ${base} chấm.`;
  return `Đã khoanh ${ringed} hàng, còn ${total - ringed * base} chấm.`;
}

/**
 * The two divisions that come from a multiplication.
 * @param {number} base
 * @param {number} rows
 */
export function relatedDivisions(base, rows) {
  return [divLine(base, rows), `${base * rows} : ${rows} = ${base}`];
}

/** @type {ReviewSkill} */
const mulSkill = {
  id: 'bang-nhan',
  label: 'Bảng nhân 2 và 5',
  make(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 1, 10);
    return {
      prompt: `${base} × ${n} = ?`,
      ...productOptions(base, n),
      hint: `Em đọc lại bảng nhân ${base}, hoặc đếm thêm ${base} tất cả ${n} lần.`,
      solution: `${mulLine(base, n)}.`,
    };
  },
};

/** @type {ReviewSkill} */
const divSkill = {
  id: 'bang-chia',
  label: 'Bảng chia 2 và 5',
  make(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 1, 10);
    return {
      prompt: `${base * n} : ${base} = ?`,
      ...quotientOptions(base, n),
      hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${base * n}?`,
      solution: `Vì ${mulLine(base, n)} nên ${divLine(base, n)}.`,
    };
  },
};

/** @type {ReviewSkill} */
const relationSkill = {
  id: 'lien-he',
  label: 'Từ phép nhân ra phép chia',
  make(rand) {
    const base = pick(rand, TABLES);
    const other = pick(rand, [3, 4, 6, 7, 8, 9]);
    const total = base * other;
    const right = `${total} : ${base} = ${other}`;
    const wrong = [
      `${total} : ${other} = ${other}`,
      `${total} : ${base} = ${base}`,
      `${base} : ${total} = ${other}`,
      `${total} : ${base} = ${other + 1}`,
    ];
    return {
      prompt: `Biết ${mulLine(base, other)}. Phép chia nào đúng?`,
      ...mixOptions(rand, right, wrong),
      hint: 'Lấy tích chia cho một thừa số, được thừa số kia.',
      solution: `${mulLine(base, other)} nên ${total} : ${base} = ${other} và ${total} : ${other} = ${base}.`,
    };
  },
};

/** @type {ReviewSkill} */
const dotsSkill = {
  id: 'luoi-cham',
  label: 'Phép tính theo lưới chấm',
  make(rand) {
    const base = pick(rand, TABLES);
    const rows = int(rand, 2, 6);
    const total = base * rows;
    const visual = /** @type {Visual} */ ({ type: 'dots', base, rows });
    if (rand() < 0.5) {
      const right = mulLine(base, rows);
      return {
        prompt: 'Phép nhân nào đúng với hình vẽ?',
        visual,
        ...mixOptions(rand, right, [
          `${base} × ${rows + 1} = ${base * (rows + 1)}`,
          `${base + 1} × ${rows} = ${(base + 1) * rows}`,
          `${base} + ${rows} = ${base + rows}`,
        ]),
        hint: 'Mỗi hàng có mấy chấm? Có mấy hàng? Số chấm mỗi hàng viết trước.',
        solution: `${rows} hàng, mỗi hàng ${base} chấm: ${right}.`,
      };
    }
    return {
      prompt: `Hình có ${total} chấm, mỗi hàng ${base} chấm. Có mấy hàng?`,
      visual,
      ...quotientOptions(base, rows),
      hint: `Em tính ${total} : ${base}, hoặc đếm số hàng.`,
      solution: `${divLine(base, rows)}. Có ${rows} hàng.`,
    };
  },
};

/** @type {ReviewSkill} */
const skipSkill = {
  id: 'dem-them',
  label: 'Đếm thêm 2, thêm 5',
  make(rand) {
    const base = pick(rand, TABLES);
    const down = rand() < 0.4;
    const n = int(rand, 3, 8);
    const items = [n, n + 1, n + 2].map((k) => k * base);
    const list = (down ? [...items].reverse() : items).join(', ');
    const right = down ? (n - 1) * base : (n + 3) * base;
    const { options, answer } = productOptions(base, down ? n - 1 : n + 3);
    return {
      prompt: `Số tiếp theo trong dãy là số nào? ${list}, ...`,
      options,
      answer,
      hint: `Mỗi số ${down ? 'kém' : 'hơn'} số trước ${base} đơn vị.`,
      solution: `Dãy ${down ? 'đếm lùi' : 'đếm thêm'} ${base}, số tiếp theo là ${right}.`,
    };
  },
};

/**
 * A row of the tables of 2 and 5, written as a multiplication or a division,
 * with its value.
 * @param {() => number} rand
 * @returns {{ text: string, value: number }}
 */
function tableExpression(rand) {
  const base = pick(rand, TABLES);
  const n = int(rand, 2, 10);
  if (rand() < 0.5) return { text: `${base} × ${n}`, value: base * n };
  return { text: `${base * n} : ${base}`, value: n };
}

/** @type {ReviewSkill} */
const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh kết quả',
  make(rand) {
    const left = tableExpression(rand);
    const right = tableExpression(rand);
    const sign = compareSign(left.value, right.value);
    return {
      prompt: `Điền dấu: ${left.text} ? ${right.text}`,
      ...signOptions(sign),
      hint: 'Em tính kết quả của từng bên, rồi so sánh.',
      solution: `${left.text} = ${left.value}. ${right.text} = ${right.value}. Vậy ${left.text} ${sign} ${right.text}.`,
    };
  },
};

/**
 * A word problem. Each kind of story states its own calculation.
 * @typedef {(n: number) => { prompt: string, line: string, right: number, unit: string, options: { options: string[], answer: number } }} Story
 */

/** @type {readonly Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Mỗi lọ cắm 2 bông hoa. ${n} lọ có bao nhiêu bông hoa?`,
    line: mulLine(2, n),
    right: 2 * n,
    unit: 'bông hoa',
    options: productOptions(2, n),
  }),
  (n) => ({
    prompt: `Mỗi túi có 5 quả cam. ${n} túi có bao nhiêu quả cam?`,
    line: mulLine(5, n),
    right: 5 * n,
    unit: 'quả cam',
    options: productOptions(5, n),
  }),
  (n) => ({
    prompt: `Cắm ${5 * n} bông hoa vào các lọ, mỗi lọ 5 bông. Cắm được mấy lọ?`,
    line: divLine(5, n),
    right: n,
    unit: 'lọ',
    options: quotientOptions(5, n),
  }),
  (n) => ({
    prompt: `Chia đều ${2 * n} cái bánh cho 2 bạn. Mỗi bạn được mấy cái bánh?`,
    line: divLine(2, n),
    right: n,
    unit: 'cái bánh',
    options: quotientOptions(2, n),
  }),
];

/** @type {ReviewSkill} */
const storySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make(rand) {
    const n = int(rand, 2, 10);
    const { prompt, line, right, unit, options } = pick(rand, STORIES)(n);
    return {
      prompt,
      ...options,
      hint: 'Mỗi nhóm bằng nhau: lấy số mỗi nhóm nhân với số nhóm. Chia đều: em làm phép chia.',
      solution: `${line} (${unit}). Đáp số: ${right} ${unit}.`,
    };
  },
};

/** The parts of this review. */
export const SKILLS = [
  mulSkill,
  divSkill,
  relationSkill,
  dotsSkill,
  skipSkill,
  compareSkill,
  storySkill,
];
