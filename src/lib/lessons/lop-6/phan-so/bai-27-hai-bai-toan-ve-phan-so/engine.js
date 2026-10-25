/**
 * The two fraction problems on one segment diagram. The whole is cut into
 * n equal parts of value k each, and m of those parts are marked:
 *
 * - "part": the whole a = n · k is known; m/n of a is a · m/n = m · k.
 * - "whole": the marked part b = m · k is known; the number whose m/n is b
 *   is b : m/n = n · k.
 *
 * Choosing the value of one part keeps every number on the diagram a
 * natural number, so the learner sees the same picture solved both ways.
 */

import { fmt } from '#lib/core/number-format.js';

/** @typedef {'part' | 'whole'} Mode */

/**
 * m/n of a, that is a · m/n.
 * @param {number} a @param {number} m @param {number} n
 */
export function partOf(a, m, n) {
  if (n === 0) throw new Error('n must not be 0');
  return (a * m) / n;
}

/**
 * The number whose m/n equals b, that is b : m/n = b · n/m.
 * @param {number} b @param {number} m @param {number} n
 */
export function wholeFrom(b, m, n) {
  if (m === 0 || n === 0) throw new Error('m and n must not be 0');
  return (b * n) / m;
}

/**
 * The diagram and its worked solution for one setting.
 * @param {Mode} mode
 * @param {number} m marked parts, 1 to n
 * @param {number} n parts of the whole, at least 1
 * @param {number} k value of one part, at least 1
 */
export function solve(mode, m, n, k) {
  const whole = n * k;
  const part = m * k;
  const frac = `${m}/${n}`;
  if (mode === 'part') {
    return {
      known: whole,
      unknown: part,
      question: `Tìm ${frac} của ${fmt(whole)}.`,
      steps: [
        `Chia ${fmt(whole)} thành ${n} phần bằng nhau, mỗi phần là ${fmt(whole)} : ${n} = ${fmt(k)}.`,
        `${m} phần như thế là ${fmt(k)} · ${m} = ${fmt(part)}.`,
        `Gộp lại: ${fmt(whole)} · ${frac} = ${fmt(part)}.`,
      ],
    };
  }
  return {
    known: part,
    unknown: whole,
    question: `Tìm một số, biết ${frac} của nó bằng ${fmt(part)}.`,
    steps: [
      `${m} phần bằng nhau ứng với ${fmt(part)}, nên mỗi phần là ${fmt(part)} : ${m} = ${fmt(k)}.`,
      `Cả số cần tìm gồm ${n} phần: ${fmt(k)} · ${n} = ${fmt(whole)}.`,
      `Gộp lại: ${fmt(part)} : ${frac} = ${fmt(part)} · ${m === 1 ? n : `${n}/${m}`} = ${fmt(whole)}.`,
    ],
  };
}

/**
 * The marked count after a drag to `x` (0 to 1 along the whole bar),
 * snapped to the nearest part boundary and kept from 1 to n.
 * @param {number} x @param {number} n
 */
export function snapParts(x, n) {
  return Math.min(n, Math.max(1, Math.round(x * n)));
}
