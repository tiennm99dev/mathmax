/**
 * Question generators for the chapter "Căn bậc hai và căn bậc ba", for the
 * drill board of the practice and review lessons. Answers are integers,
 * decimals or fractions, so the board reads them with `readNumber` and
 * writes them with `numberText` from `#lib/core/decimal.js`. Every decimal
 * answer is built as an integer over a power of ten, so it is the very same
 * double that `readNumber` gives for its digits. Prompts and steps are plain
 * text with the book's minus sign and decimal comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { MINUS, fmt, intText } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * The decimal n / 10^places, as an exact-as-typed double.
 * @param {number} n
 * @param {number} places
 */
export function dec(n, places) {
  return n / 10 ** places;
}

/**
 * A number as the book writes it in plain text: '0,49', '−3', '2/3'.
 * @param {number} value
 */
const t = (value) => numberText(value);

/**
 * `ax + b` as plain text, with the book's minus sign: (3, −12) → '3x − 12',
 * (−2, 5) → '−2x + 5'.
 * @param {number} a non-zero
 * @param {number} b
 */
export function linText(a, b) {
  const lead = a === 1 ? 'x' : a === -1 ? `${MINUS}x` : `${intText(a)}x`;
  if (b === 0) return lead;
  return `${lead} ${b < 0 ? MINUS : '+'} ${fmt(Math.abs(b))}`;
}

/** @type {Skill} */
export const canBacHai = {
  id: 'can-bac-hai',
  label: 'Bài 7. Căn bậc hai và căn thức bậc hai',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      // √ of a short decimal square, such as √0,49 = 0,7 or √1,44 = 1,2.
      const k = int(rand, 2, 19);
      if (k % 10 === 0) return canBacHai.make(rand);
      const root = dec(k, 1);
      const square = dec(k * k, 2);
      return {
        prompt: `Tính √${t(square)}.`,
        answer: root,
        steps: [
          `Tìm số không âm có bình phương bằng ${t(square)}.`,
          `${t(root)}² = ${t(square)} và ${t(root)} > 0, nên √${t(square)} = ${t(root)}.`,
        ],
        hints: [`${k}² = ${fmt(k * k)}.`],
      };
    }
    if (variant === 1) {
      // √(A²) = |A| with A negative.
      const k = int(rand, 2, 15);
      return {
        prompt: `Tính √((${MINUS}${k})²).`,
        answer: k,
        steps: [
          `Áp dụng √(A²) = |A|: √((${MINUS}${k})²) = |${MINUS}${k}|.`,
          `|${MINUS}${k}| = ${k}.`,
        ],
        hints: ['Dùng hằng đẳng thức √(A²) = |A|.', 'Căn bậc hai số học không bao giờ âm.'],
      };
    }
    if (variant === 2) {
      // Smallest integer x for which √(ax + b) is defined, a > 0.
      const a = int(rand, 2, 5);
      const b = int(rand, -20, 20);
      if (b === 0) return canBacHai.make(rand);
      const x = Math.ceil(-b / a);
      const g = gcd(Math.abs(b), a);
      const bound = a / g === 1 ? intText(-b / a) : `${intText(-b / g)}/${a / g}`;
      return {
        prompt: `Tìm số nguyên x nhỏ nhất để √(${linText(a, b)}) xác định.`,
        answer: x,
        steps: [
          `√(${linText(a, b)}) xác định khi ${linText(a, b)} ≥ 0.`,
          `${a}x ≥ ${intText(-b)}, nên x ≥ ${bound}.`,
          `Số nguyên nhỏ nhất thoả mãn là ${intText(x)}.`,
        ],
        hints: ['√A xác định khi A ≥ 0.', `Giải bất phương trình ${linText(a, b)} ≥ 0.`],
      };
    }
    // √(x² − 2rx + r²) = |x − r| at a given x.
    const r = int(rand, 1, 6) * pick(rand, [1, -1]);
    let x0 = int(rand, -8, 8);
    if (x0 === r) x0 += 3;
    const mid = -2 * r;
    const expr = `x² ${mid < 0 ? MINUS : '+'} ${Math.abs(mid)}x + ${r * r}`;
    const factor = r > 0 ? `x ${MINUS} ${r}` : `x + ${-r}`;
    const value = Math.abs(x0 - r);
    return {
      prompt: `Tính giá trị của √(${expr}) tại x = ${intText(x0)}.`,
      answer: value,
      steps: [
        `${expr} = (${factor})², nên √(${expr}) = |${factor}|.`,
        `Tại x = ${intText(x0)}: |${intText(x0)} ${r > 0 ? MINUS : '+'} ${Math.abs(r)}| = |${intText(x0 - r)}| = ${value}.`,
      ],
      hints: [
        'Biểu thức dưới dấu căn là một bình phương.',
        `Viết nó thành (${factor})² rồi dùng √(A²) = |A|.`,
      ],
    };
  },
};

/** Square-free factors that keep √(s·u²) out of the perfect squares. */
const FREE = [2, 3, 5, 6, 7, 10];

/** @type {Skill} */
export const canCuaTich = {
  id: 'can-cua-tich',
  label: 'Bài 8. Căn của một tích',
  make(rand) {
    if (rand() < 0.5) {
      // Khai căn một tích: √(p²·q²) = p·q.
      const p = int(rand, 2, 12);
      const q = int(rand, 2, 15);
      return {
        prompt: `Tính √(${fmt(p * p)} · ${fmt(q * q)}).`,
        answer: p * q,
        steps: [
          `√(${fmt(p * p)} · ${fmt(q * q)}) = √${fmt(p * p)} · √${fmt(q * q)}.`,
          `= ${p} · ${q} = ${fmt(p * q)}.`,
        ],
        hints: ['Khai căn từng thừa số rồi nhân các kết quả.'],
      };
    }
    // Nhân các căn: √(s·u²) · √(s·v²) = √(s²u²v²) = s·u·v.
    const s = pick(rand, FREE);
    const u = int(rand, 1, 4);
    let v = int(rand, 1, 5);
    if (u === v) v += 1;
    const a = s * u * u;
    const b = s * v * v;
    return {
      prompt: `Tính √${fmt(a)} · √${fmt(b)}.`,
      answer: s * u * v,
      steps: [
        `Nhân các số dưới dấu căn: √${fmt(a)} · √${fmt(b)} = √(${fmt(a)} · ${fmt(b)}) = √${fmt(a * b)}.`,
        `${fmt(a * b)} = ${s * u * v}², nên kết quả là ${fmt(s * u * v)}.`,
      ],
      hints: [
        'Từng căn không khai được, nhưng tích của chúng thì được.',
        `Nhân ${fmt(a)} · ${fmt(b)} rồi khai căn.`,
      ],
    };
  },
};

/**
 * Greatest common divisor of two natural numbers.
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function gcd(x, y) {
  return y === 0 ? x : gcd(y, x % y);
}

/** @type {Skill} */
export const canCuaThuong = {
  id: 'can-cua-thuong',
  label: 'Bài 8. Căn của một thương',
  make(rand) {
    if (rand() < 0.5) {
      // Khai căn một thương: √(p²/q²) = p/q, in lowest terms.
      for (;;) {
        const p = int(rand, 1, 12);
        const q = int(rand, 2, 15);
        if (gcd(p, q) !== 1) continue;
        return {
          prompt: `Tính √(${fmt(p * p)}/${fmt(q * q)}). Nhập kết quả dưới dạng phân số.`,
          answer: p / q,
          steps: [
            `√(${fmt(p * p)}/${fmt(q * q)}) = √${fmt(p * p)} / √${fmt(q * q)}.`,
            `= ${p}/${q}.`,
          ],
          hints: ['Căn của một thương bằng thương các căn.'],
        };
      }
    }
    // Chia hai căn: √(s·u²·k²) / √(s·u²) = k.
    const s = pick(rand, FREE);
    const u = int(rand, 1, 3);
    const k = int(rand, 2, 9);
    const b = s * u * u;
    const a = b * k * k;
    if (a > 999) return canCuaThuong.make(rand);
    return {
      prompt: `Tính √${fmt(a)} / √${fmt(b)}.`,
      answer: k,
      steps: [`√${fmt(a)} / √${fmt(b)} = √(${fmt(a)}/${fmt(b)}) = √${k * k}.`, `√${k * k} = ${k}.`],
      hints: ['Gộp thành căn của một thương.', `Chia ${fmt(a)} cho ${fmt(b)} trước.`],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 7 and Bài 8. */
export const SKILLS_TRANG_52 = [canBacHai, canCuaTich, canCuaThuong];
