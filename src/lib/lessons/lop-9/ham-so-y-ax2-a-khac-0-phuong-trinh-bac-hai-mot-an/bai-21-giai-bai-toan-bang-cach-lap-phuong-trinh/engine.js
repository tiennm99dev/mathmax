/**
 * Logic of the word-problem widget: two problems (a garden's area and a
 * car's journey) whose unknown the learner drags on a diagram, the quadratic
 * equation each one leads to, and its two roots, one kept and one rejected
 * by the condition on the unknown.
 */

import { numText } from '#lib/core/algebra-text.js';
import { clean, solveQuadratic } from '../_shared/quadratic.js';

/**
 * @typedef {{ value: number, keep: boolean, reason: string }} Root
 * @typedef {{
 *   id: 'vuon' | 'xe',
 *   label: string,
 *   statement: string,
 *   unknown: string,
 *   min: number,
 *   max: number,
 *   step: number,
 *   coef: [number, number, number],
 *   setup: string[],
 * }} Problem
 */

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    id: 'vuon',
    label: 'Mảnh vườn',
    statement:
      'Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng $4$ m và diện tích bằng $96$ m². Tính chiều rộng của mảnh vườn.',
    unknown: 'Gọi chiều rộng là $x$ (m), điều kiện $x > 0$; chiều dài là $x + 4$ (m).',
    min: 1,
    max: 14,
    step: 0.5,
    coef: [1, 4, -96],
    setup: [
      'x(x + 4) = 96',
      'x^2 + 4x - 96 = 0',
      "\\Delta' = 2^2 - 1 \\cdot (-96) = 100",
      'x_1 = -2 + 10 = 8, \\quad x_2 = -2 - 10 = -12',
    ],
  },
  {
    id: 'xe',
    label: 'Ô tô',
    statement:
      'Quãng đường $AB$ dài $120$ km. Một ô tô đi từ $A$ đến $B$; nếu vận tốc tăng thêm $10$ km/h thì ô tô đến $B$ sớm hơn dự định $1$ giờ. Tính vận tốc dự định của ô tô.',
    unknown:
      'Gọi vận tốc dự định là $x$ (km/h), điều kiện $x > 0$. Thời gian dự định $\\dfrac{120}{x}$ giờ, thời gian khi tăng tốc $\\dfrac{120}{x + 10}$ giờ.',
    min: 10,
    max: 60,
    step: 5,
    coef: [1, 10, -1200],
    setup: [
      '\\dfrac{120}{x} - \\dfrac{120}{x + 10} = 1',
      '120(x + 10) - 120x = x(x + 10)',
      'x^2 + 10x - 1200 = 0',
      "\\Delta' = 5^2 - 1 \\cdot (-1200) = 1225, \\quad \\sqrt{\\Delta'} = 35",
      'x_1 = -5 + 35 = 30, \\quad x_2 = -5 - 35 = -40',
    ],
  },
];

/**
 * The roots of the problem's equation, larger first, each with whether the
 * condition x > 0 keeps it.
 * @param {Problem} problem
 * @returns {Root[]}
 */
export function rootsOf(problem) {
  const [a, b, c] = problem.coef;
  return solveQuadratic(a, b, c).roots.map((value) => ({
    value,
    keep: value > 0,
    reason:
      value > 0
        ? `x = ${numText(value)} thoả mãn điều kiện x > 0: nhận.`
        : `x = ${numText(value)} không thoả mãn điều kiện x > 0: loại.`,
  }));
}

/**
 * The answer of the problem: its one kept root.
 * @param {Problem} problem
 */
export function answerOf(problem) {
  const kept = rootsOf(problem).filter((r) => r.keep);
  if (kept.length !== 1) throw new Error(`${problem.id} must keep exactly one root`);
  return kept[0].value;
}

/**
 * What the diagram shows for the dragged value x, and whether x fits.
 * @param {Problem} problem
 * @param {number} x
 * @returns {{ ok: boolean, text: string, quantities: number[] }}
 */
export function measure(problem, x) {
  if (problem.id === 'vuon') {
    const area = clean(x * (x + 4));
    const ok = area === 96;
    const cmp = ok
      ? ', đúng diện tích đề bài!'
      : area < 96
        ? ', nhỏ hơn 96 m²: cần tăng chiều rộng.'
        : ', lớn hơn 96 m²: cần giảm chiều rộng.';
    return {
      ok,
      quantities: [x, clean(x + 4), area],
      text: `Chiều rộng ${numText(x)} m, chiều dài ${numText(x + 4)} m, diện tích ${numText(x)} · ${numText(x + 4)} = ${numText(area)} m²${cmp}`,
    };
  }
  const t1 = 120 / x;
  const t2 = 120 / (x + 10);
  const gap = clean(t1 - t2);
  const ok = gap === 1;
  /** @param {number} v */
  const about = (v) => (Number.isInteger(clean(v * 100)) ? '' : 'khoảng ');
  return {
    ok,
    quantities: [t1, t2, gap],
    text: `Dự định: ${about(t1)}${numText(t1)} giờ; tăng tốc lên ${numText(x + 10)} km/h: ${about(t2)}${numText(t2)} giờ. Sớm hơn ${about(gap)}${numText(gap)} giờ${ok ? ', đúng như đề bài!' : gap > 1 ? ' (nhiều hơn 1 giờ).' : ' (chưa đủ 1 giờ).'}`,
  };
}
