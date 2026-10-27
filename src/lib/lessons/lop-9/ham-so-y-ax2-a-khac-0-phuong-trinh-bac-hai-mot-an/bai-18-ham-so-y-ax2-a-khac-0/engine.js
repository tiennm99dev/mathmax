/**
 * Logic of the parabola widget for y = ax²: what the sign and the size of a
 * do to the graph, the symmetry about Oy, and the "pass through a point"
 * challenges.
 */

import { numText } from '#lib/core/algebra-text.js';
import { clean } from '../_shared/quadratic.js';

/**
 * The value of y = ax² at x, free of rounding noise.
 * @param {number} a
 * @param {number} x
 */
export function valueAt(a, x) {
  return clean(a * x * x);
}

/**
 * What the sign of a says about the graph.
 * @param {number} a
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function shapeSentence(a) {
  const at = numText(a);
  if (a === 0) {
    return {
      tone: 'warn',
      text: 'a = 0: y = 0·x² = 0 với mọi x, đồ thị là trục hoành. Đây không phải hàm số y = ax² (a ≠ 0) nên không có parabol.',
    };
  }
  if (a > 0) {
    return {
      tone: 'ok',
      text: `a = ${at} > 0: parabol nằm phía trên trục hoành (bề lõm quay lên), O là điểm thấp nhất của đồ thị.`,
    };
  }
  return {
    tone: 'info',
    text: `a = ${at} < 0: parabol nằm phía dưới trục hoành (bề lõm quay xuống), O là điểm cao nhất của đồ thị.`,
  };
}

/**
 * How the size of a changes the opening, compared with y = x² or y = −x².
 * @param {number} a
 */
export function widthSentence(a) {
  if (a === 0) return '';
  const abs = Math.abs(a);
  const ref = a > 0 ? 'y = x²' : 'y = −x²';
  if (abs === 1) return `|a| = 1: parabol trùng với ${ref}.`;
  if (abs > 1)
    return `|a| = ${numText(abs)} > 1: parabol "hẹp" hơn ${ref}, càng gần trục Oy khi |a| càng lớn.`;
  return `|a| = ${numText(abs)} < 1: parabol "rộng" hơn ${ref}, càng gần trục Ox khi |a| càng nhỏ.`;
}

/**
 * The sentence about a point M(x; ax²) and its mirror image M′(−x; ax²).
 * @param {number} a
 * @param {number} x
 */
export function symmetrySentence(a, x) {
  const y = numText(valueAt(a, x));
  if (x === 0) return 'M trùng với đỉnh O(0; 0), điểm nằm trên trục đối xứng Oy.';
  return `M(${numText(x)}; ${y}) và M′(${numText(-x)}; ${y}) cùng nằm trên parabol: hai điểm đối xứng nhau qua trục Oy vì a·(${numText(-x)})² = a·${numText(x)}².`;
}

/**
 * Points the learner makes the parabola pass through, each reached by
 * exactly one a on the slider (steps of 0,25 from −3 to 3).
 */
export const CHALLENGES = [
  { x: 2, y: 2 },
  { x: -1, y: -3 },
  { x: 2, y: -1 },
  { x: -2, y: 5 },
  { x: 4, y: 4 },
];

/**
 * Whether the parabola y = ax² passes through the point.
 * @param {number} a
 * @param {{ x: number, y: number }} p
 */
export function passesThrough(a, p) {
  return a !== 0 && Math.abs(valueAt(a, p.x) - p.y) < 1e-9;
}

/**
 * The a that makes y = ax² pass through p (x ≠ 0): a = y / x².
 * @param {{ x: number, y: number }} p
 */
export function coefficientThrough(p) {
  return clean(p.y / (p.x * p.x));
}
