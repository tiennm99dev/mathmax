/**
 * Logic of the Viète widget: two roots chosen on the x-axis build the
 * equation a(x − x₁)(x − x₂) = 0, whose coefficients satisfy
 * x₁ + x₂ = −b/a and x₁x₂ = c/a; plus the quick-root tests a + b + c = 0
 * and a − b + c = 0, and the challenges.
 */

import { numText } from '#lib/core/algebra-text.js';
import { numTex } from '#lib/algebra-engine/polynomial.js';
import { clean, quadTex, texOperand } from '../_shared/quadratic.js';

/**
 * Coefficients of a(x − x₁)(x − x₂) = ax² + bx + c.
 * @param {number} a
 * @param {number} x1
 * @param {number} x2
 */
export function coefficients(a, x1, x2) {
  return { a, b: clean(-a * (x1 + x2)), c: clean(a * x1 * x2) };
}

/**
 * The equation with its roots, as TeX.
 * @param {number} a
 * @param {number} x1
 * @param {number} x2
 */
export function equationTex(a, x1, x2) {
  const { b, c } = coefficients(a, x1, x2);
  return `${quadTex(a, b, c)} = 0`;
}

/**
 * Sum and product read two ways, as TeX lines: x₁ + x₂, −b/a, x₁x₂, c/a.
 * @param {number} a
 * @param {number} x1
 * @param {number} x2
 */
export function vieteTex(a, x1, x2) {
  const { b, c } = coefficients(a, x1, x2);
  const s = clean(x1 + x2);
  const p = clean(x1 * x2);
  return [
    `x_1 + x_2 = ${numTex(x1)} + ${texOperand(x2)} = ${numTex(s)}`,
    `-\\dfrac{b}{a} = -\\dfrac{${numTex(b)}}{${numTex(a)}} = ${numTex(s)}`,
    `x_1 x_2 = ${numTex(x1)} \\cdot ${texOperand(x2)} = ${numTex(p)}`,
    `\\dfrac{c}{a} = \\dfrac{${numTex(c)}}{${numTex(a)}} = ${numTex(p)}`,
  ];
}

/**
 * The quick-root note when a + b + c = 0 or a − b + c = 0, else ''.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function quickRootNote(a, b, c) {
  const notes = [];
  if (clean(a + b + c) === 0) {
    notes.push(
      `a + b + c = ${numText(a)} + (${numText(b)}) + (${numText(c)}) = 0, nên x₁ = 1 và x₂ = c/a = ${numText(clean(c / a))}.`,
    );
  }
  if (clean(a - b + c) === 0) {
    notes.push(
      `a − b + c = ${numText(a)} − (${numText(b)}) + (${numText(c)}) = 0, nên x₁ = −1 và x₂ = −c/a = ${numText(clean(-c / a))}.`,
    );
  }
  return notes.join(' ');
}

/** Targets for the two draggable roots. */
export const CHALLENGES = [
  {
    text: 'Tìm hai số có tổng bằng 3 và tích bằng −4.',
    /** @type {(x1: number, x2: number) => boolean} */
    test: (x1, x2) => clean(x1 + x2) === 3 && clean(x1 * x2) === -4,
    done: 'Hai số 4 và −1 là hai nghiệm của x² − 3x − 4 = 0.',
  },
  {
    text: 'Đặt một nghiệm sao cho a + b + c = 0.',
    /** @type {(x1: number, x2: number) => boolean} */
    test: (x1, x2) => x1 === 1 || x2 === 1,
    done: 'a + b + c chính là giá trị của ax² + bx + c tại x = 1, nên a + b + c = 0 đúng khi 1 là một nghiệm.',
  },
  {
    text: 'Tạo phương trình có hai nghiệm trái dấu.',
    /** @type {(x1: number, x2: number) => boolean} */
    test: (x1, x2) => x1 * x2 < 0,
    done: 'Tích hai nghiệm c/a âm, tức a và c trái dấu.',
  },
  {
    text: 'Tạo phương trình có nghiệm kép với tổng hai nghiệm bằng 4.',
    /** @type {(x1: number, x2: number) => boolean} */
    test: (x1, x2) => x1 === 2 && x2 === 2,
    done: 'Nghiệm kép x₁ = x₂ = 2: tổng 4, tích 4, ứng với S² − 4P = 0.',
  },
];
