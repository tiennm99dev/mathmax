/**
 * Logic of the discriminant widget: the equation ax² + bx + c = 0 read off
 * the parabola y = ax² + bx + c, its discriminant Δ worked out the book's
 * way, the roots by the quadratic formula, and the coefficient challenges.
 */

import { numText, rootValue } from '#lib/core/algebra-text.js';
import { texNumber } from '#lib/core/number-format.js';
import { numTex } from '#lib/algebra-engine/polynomial.js';
import { clean, discriminant, quadTex, solveQuadratic, texOperand } from '../_shared/quadratic.js';

/**
 * @typedef {{
 *   kind: 'not-quadratic' | 'two' | 'double' | 'none',
 *   delta: number,
 *   roots: number[],
 * }} Analysis
 */

/**
 * Classifies ax² + bx + c = 0 by its discriminant.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {Analysis}
 */
export function analyse(a, b, c) {
  if (a === 0) return { kind: 'not-quadratic', delta: NaN, roots: [] };
  const { delta, count, roots } = solveQuadratic(a, b, c);
  return { kind: count === 2 ? 'two' : count === 1 ? 'double' : 'none', delta, roots };
}

/**
 * The equation as TeX: '2x^{2} - 5x + 3 = 0'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function equationTex(a, b, c) {
  return `${quadTex(a, b, c)} = 0`;
}

/**
 * Δ = b² − 4ac with the coefficients put in, as TeX.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function deltaTex(a, b, c) {
  const d = discriminant(a, b, c);
  return `\\Delta = b^2 - 4ac = ${texOperand(b)}^2 - 4 \\cdot ${texOperand(a)} \\cdot ${texOperand(c)} = ${numTex(d)}`;
}

/**
 * A computed root for TeX: '= 1{,}5' when exact, '\approx 0{,}618' otherwise.
 * @param {number} v
 */
function valueTex(v) {
  const r = rootValue(v);
  const text = texNumber(r.text).replace('−', '-');
  return r.exact ? `= ${text}` : `\\approx ${text}`;
}

/**
 * The lines of TeX that finish the solution after Δ.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {string[]}
 */
export function solutionTex(a, b, c) {
  const { kind, delta, roots } = analyse(a, b, c);
  if (kind === 'not-quadratic' || kind === 'none') return [];
  const minusB = numTex(clean(-b));
  const twoA = numTex(clean(2 * a));
  if (kind === 'double') {
    return [`x_1 = x_2 = -\\dfrac{b}{2a} = \\dfrac{${minusB}}{${twoA}} ${valueTex(roots[0])}`];
  }
  const sq = `\\sqrt{${numTex(delta)}}`;
  // x₁ takes +√Δ, x₂ takes −√Δ, as in the book.
  const plus = clean((-b + Math.sqrt(delta)) / (2 * a));
  const minus = clean((-b - Math.sqrt(delta)) / (2 * a));
  return [
    `x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a} = \\dfrac{${minusB} + ${sq}}{${twoA}} ${valueTex(plus)}`,
    `x_2 = \\dfrac{-b - \\sqrt{\\Delta}}{2a} = \\dfrac{${minusB} - ${sq}}{${twoA}} ${valueTex(minus)}`,
  ];
}

/**
 * The sentence the widget announces.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(a, b, c) {
  const { kind, delta, roots } = analyse(a, b, c);
  if (kind === 'not-quadratic') {
    return {
      tone: 'warn',
      text: 'a = 0: phương trình không còn là phương trình bậc hai (nó thành bx + c = 0). Hãy chọn a ≠ 0.',
    };
  }
  const d = numText(delta);
  if (kind === 'none') {
    return {
      tone: 'info',
      text: `Δ = ${d} < 0: phương trình vô nghiệm. Parabol không cắt trục hoành.`,
    };
  }
  if (kind === 'double') {
    return {
      tone: 'ok',
      text: `Δ = 0: phương trình có nghiệm kép x₁ = x₂ = ${rootValue(roots[0]).text}. Parabol tiếp xúc với trục hoành tại đúng một điểm.`,
    };
  }
  return {
    tone: 'ok',
    text: `Δ = ${d} > 0: phương trình có hai nghiệm phân biệt. Parabol cắt trục hoành tại hai điểm có hoành độ ${roots
      .map((r) => {
        const v = rootValue(r);
        return `${v.exact ? '' : '≈ '}${v.text}`;
      })
      .join(' và ')}.`,
  };
}

/** Targets for the coefficient sliders. */
export const CHALLENGES = [
  {
    text: 'Chọn các hệ số để phương trình có nghiệm kép.',
    /** @type {(a: number, b: number, c: number) => boolean} */
    test: (a, b, c) => analyse(a, b, c).kind === 'double',
  },
  {
    text: 'Chọn các hệ số để phương trình vô nghiệm.',
    /** @type {(a: number, b: number, c: number) => boolean} */
    test: (a, b, c) => analyse(a, b, c).kind === 'none',
  },
  {
    text: 'Chọn a và c trái dấu (ac < 0), rồi đổi b tùy ý: phương trình có bao nhiêu nghiệm?',
    /** @type {(a: number, b: number, c: number) => boolean} */
    test: (a, b, c) => a * c < 0,
  },
  {
    text: 'Chọn các hệ số để phương trình có hai nghiệm phân biệt đều dương.',
    /** @type {(a: number, b: number, c: number) => boolean} */
    test: (a, b, c) => {
      const r = analyse(a, b, c);
      return r.kind === 'two' && r.roots.every((x) => x > 0);
    },
  },
];
