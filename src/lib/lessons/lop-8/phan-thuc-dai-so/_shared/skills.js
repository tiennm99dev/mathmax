/**
 * Question generators for the chapter "Phân thức đại số", one skill per
 * lesson. Answers are integers or exact fractions, so the drill board reads
 * them with `readNumber` (an integer, p/q or a decimal comma) and writes them
 * with `numberText`. Prompts and steps are plain text with the book's minus
 * sign and superscript exponents; a fraction is written (numerator)/(denominator).
 */

import { int, pick } from '#lib/core/drill.js';
import { MINUS, intText, operand, sup } from '#lib/core/number-format.js';
import { numberText } from '#lib/core/decimal.js';
import { evaluate, polyText, termsOf } from '#lib/algebra-engine/polynomial.js';
import { lcm, polyRatioText } from './factors.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/**
 * A polynomial in brackets when it has more than one term: (x − 2), 6x².
 * @param {number[]} p
 */
const group = (p) => (termsOf(p).length > 1 ? `(${polyText(p)})` : polyText(p));

/**
 * A fraction of two polynomials as plain text: (x + 3)/(2x − 8).
 */
export const fracText = polyRatioText;

/**
 * P(t) written out with t in place of x, highest degree first:
 * ([−1, 3, 1], −2) gives '(−2)² + 3 · (−2) − 1'.
 * @param {number[]} p
 * @param {number} t
 */
export function substText(p, t) {
  const base = operand(t);
  return termsOf(p)
    .map(({ c, e }, i) => {
      const abs = Math.abs(c);
      const power = e === 0 ? '' : e === 1 ? base : `${base}${sup(e)}`;
      const body = e === 0 ? String(abs) : abs === 1 ? power : `${abs} · ${power}`;
      if (i === 0) return c < 0 ? `${MINUS}${body}` : body;
      return c < 0 ? ` ${MINUS} ${body}` : ` + ${body}`;
    })
    .join('');
}

/**
 * x + a as plain text: x − 2, x + 3.
 * @param {number} a
 */
const lin = (a) => polyText([a, 1]);

/** @type {Skill} */
export const phanThuc = {
  id: 'phan-thuc',
  label: 'Bài 21. Phân thức đại số',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const c = int(rand, 1, 3);
      const r = nonZero(rand, -6, 6);
      const top = [nonZero(rand, -9, 9), 1];
      const bottom = [-c * r, c];
      return {
        prompt: `Phân thức ${fracText(top, bottom)} không xác định tại x bằng bao nhiêu?`,
        answer: r,
        hints: ['Phân thức không xác định khi mẫu thức bằng 0.', `Giải ${polyText(bottom)} = 0.`],
        steps: [
          `Phân thức không xác định khi ${polyText(bottom)} = 0.`,
          c === 1
            ? `x = ${intText(r)}.`
            : `${c}x = ${intText(c * r)}, nên x = ${intText(c * r)} : ${c} = ${intText(r)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 9);
      const top = [nonZero(rand, -9, 9), 1];
      const bottom = [-k * k, 0, 1];
      return {
        prompt: `Phân thức ${fracText(top, bottom)} không xác định tại hai giá trị của x. Tìm giá trị dương trong hai giá trị đó.`,
        answer: k,
        hints: [
          'Phân thức không xác định khi mẫu thức bằng 0.',
          `Phân tích ${polyText(bottom)} thành nhân tử bằng hằng đẳng thức hiệu hai bình phương.`,
        ],
        steps: [
          `${polyText(bottom)} = (${lin(-k)})(${lin(k)}).`,
          `Mẫu bằng 0 khi x = ${k} hoặc x = ${intText(-k)}; giá trị dương là ${k}.`,
        ],
      };
    }
    if (v === 2) {
      const top = [int(rand, -5, 5), int(rand, -5, 5), 1];
      const d = nonZero(rand, -5, 5);
      const bottom = [d, 1];
      let t = int(rand, -4, 4);
      while (t + d === 0) t = int(rand, -4, 4);
      const tv = evaluate(top, t);
      const bv = evaluate(bottom, t);
      const value = tv / bv;
      return {
        prompt: `Tính giá trị của phân thức ${fracText(top, bottom)} tại x = ${intText(t)}. Viết kết quả là số nguyên hoặc phân số tối giản, ví dụ −7/3.`,
        answer: value,
        hints: [
          `Kiểm tra mẫu khác 0 tại x = ${intText(t)}, rồi tính riêng tử và mẫu.`,
          'Giá trị của phân thức bằng giá trị của tử chia cho giá trị của mẫu.',
        ],
        steps: [
          `Mẫu: ${substText(bottom, t)} = ${intText(bv)} ≠ 0, nên phân thức xác định.`,
          `Tử: ${substText(top, t)} = ${intText(tv)}.`,
          `Giá trị: ${intText(tv)} : ${operand(bv)} = ${numberText(value)}.`,
        ],
      };
    }
    const a = nonZero(rand, -5, 5);
    let b = int(rand, 1, 6);
    while (a === -b) b = int(rand, 1, 6);
    let t = int(rand, -3, 3);
    while (t === b) t = int(rand, -3, 3);
    const quotient = [a * b, a + b, 1];
    const value = (t + a) * (t + b);
    return {
      prompt: `Tìm đa thức A, biết ${fracText([a, 1], [-b, 1])} = A/${group([-b * b, 0, 1])}. Tính giá trị của A tại x = ${intText(t)}.`,
      answer: value,
      hints: [
        `Hai phân thức bằng nhau: A · (${lin(-b)}) = (${lin(a)})(x² ${MINUS} ${b * b}).`,
        `x² ${MINUS} ${b * b} = (${lin(-b)})(${lin(b)}).`,
      ],
      steps: [
        `A · (${lin(-b)}) = (${lin(a)})(x² ${MINUS} ${b * b}) = (${lin(a)})(${lin(-b)})(${lin(b)}).`,
        `Nên A = (${lin(a)})(${lin(b)}) = ${polyText(quotient)}.`,
        `Tại x = ${intText(t)}: A = (${intText(t)} + ${operand(a)})(${intText(t)} + ${b}) = ${intText(t + a)} · ${operand(t + b)} = ${intText(value)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tinhChat = {
  id: 'tinh-chat',
  label: 'Bài 22. Tính chất cơ bản của phân thức',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 1, 9);
      const s = pick(rand, [1, -1]);
      const t = pick(rand, [10, 20, 25, 50, 100]);
      const top = [-a * a, 0, 1];
      const bottom = [0, s * a, 1];
      // x² − a² = (x − a)(x + a) and x² ± ax = x(x ± a): the factor x ± a cancels.
      const left = -s * a;
      const value = (t + left) / t;
      return {
        prompt: `Rút gọn phân thức ${fracText(top, bottom)} rồi tính giá trị của nó tại x = ${t}. Viết kết quả dạng số thập phân.`,
        answer: value,
        hints: [
          'Phân tích tử và mẫu thành nhân tử để tìm nhân tử chung.',
          `${polyText(top)} = (${lin(-a)})(${lin(a)}); ${polyText(bottom)} = x(${lin(s * a)}).`,
        ],
        steps: [
          `${fracText(top, bottom)} = (${lin(-a)})(${lin(a)})/[x(${lin(s * a)})] = (${lin(left)})/x.`,
          `Tại x = ${t}: ${t + left}/${t} = ${numberText(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 2, 6);
      const a = nonZero(rand, -6, 6);
      const m = pick(rand, [-2, -1, 1, 2, 4, 5]);
      const t = a + m;
      const top = [-k * a, k];
      const bottom = [a * a, -2 * a, 1];
      const value = k / m;
      return {
        prompt: `Rút gọn phân thức ${fracText(top, bottom)} rồi tính giá trị của nó tại x = ${intText(t)}. Viết kết quả là số nguyên, phân số hoặc số thập phân.`,
        answer: value,
        hints: [
          'Phân tích tử và mẫu thành nhân tử để tìm nhân tử chung.',
          `Mẫu là bình phương của một hiệu: ${polyText(bottom)} = (${lin(-a)})².`,
        ],
        steps: [
          `${polyText(top)} = ${k}(${lin(-a)}); ${polyText(bottom)} = (${lin(-a)})².`,
          `Chia cả tử và mẫu cho ${lin(-a)}: phân thức bằng ${k}/(${lin(-a)}).`,
          `Tại x = ${intText(t)}: ${k}/${operand(m)} = ${numberText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const p = pick(rand, [2, 3, 4, 6, 8, 9, 10, 12, 15]);
      let q = pick(rand, [2, 3, 4, 6, 8, 9, 10, 12, 15]);
      while (q === p) q = pick(rand, [2, 3, 4, 6, 8, 9, 10, 12, 15]);
      const e1 = int(rand, 1, 3);
      const e2 = int(rand, 1, 3);
      const m = lcm(p, q);
      const n = Math.max(e1, e2);
      const power = (/** @type {number} */ e) => (e === 1 ? 'x' : `x${sup(e)}`);
      return {
        prompt: `Mẫu thức chung đơn giản nhất của hai phân thức 1/(${p}${power(e1)}) và 1/(${q}${power(e2)}) có dạng m·xⁿ. Tìm hệ số m.`,
        answer: m,
        hints: ['Phần hệ số của MTC là bội chung nhỏ nhất của các hệ số.', `Tìm BCNN(${p}, ${q}).`],
        steps: [
          `Hệ số: BCNN(${p}, ${q}) = ${m}. Phần biến: lũy thừa cao nhất của x là ${power(n)}.`,
          `MTC = ${m}${power(n)}, nên m = ${m}.`,
        ],
      };
    }
    const a = int(rand, 1, 9);
    const s = pick(rand, [1, -1]);
    // The first denominator is x − a (s = 1) or x + a (s = −1); its extra
    // factor is the other bracket of x² − a².
    const first = lin(-s * a);
    const extra = s * a;
    return {
      prompt: `Quy đồng mẫu thức hai phân thức 1/(${first}) và 1/(x² ${MINUS} ${a * a}) với mẫu thức chung (${lin(-a)})(${lin(a)}). Nhân tử phụ của mẫu ${first} có dạng x + m. Tìm m.`,
      answer: extra,
      hints: [
        'Nhân tử phụ bằng mẫu thức chung chia cho mẫu thức đó.',
        `Tính (${lin(-a)})(${lin(a)}) : (${first}).`,
      ],
      steps: [
        `(${lin(-a)})(${lin(a)}) : (${first}) = ${lin(extra)}.`,
        `Vậy nhân tử phụ là ${lin(extra)}${extra < 0 ? ` = x + ${operand(extra)}` : ''}, nên m = ${intText(extra)}.`,
      ],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 21 and Bài 22. */
export const SKILLS_TRANG_13 = [phanThuc, tinhChat];
