/**
 * Solving `ax + b ⋄ 0` (⋄ one of <, >, ≤, ≥) step by step, for the number
 * line widget: move b to the right side, divide by a (reversing the sign
 * when a < 0), then shade the solution set and test any point against it.
 */

import { formatNumber, intText } from '#lib/core/number-format.js';
import { linTex, linText, signedFracTex, signedFracText } from '#lib/core/algebra-text.js';

/** @typedef {'lt' | 'gt' | 'le' | 'ge'} Sign */

/** @type {Record<Sign, { tex: string, text: string }>} */
export const SIGNS = {
  lt: { tex: '<', text: '<' },
  gt: { tex: '>', text: '>' },
  le: { tex: '\\le', text: '≤' },
  ge: { tex: '\\ge', text: '≥' },
};

/**
 * The reversed sign.
 * @param {Sign} s
 * @returns {Sign}
 */
export function reverse(s) {
  return /** @type {Record<Sign, Sign>} */ ({ lt: 'gt', gt: 'lt', le: 'ge', ge: 'le' })[s];
}

/**
 * Whether the endpoint belongs to the solution set.
 * @param {Sign} s
 */
export function closed(s) {
  return s === 'le' || s === 'ge';
}

/**
 * Whether the solution set points right (x > ... or x ≥ ...).
 * @param {Sign} s
 */
export function pointsRight(s) {
  return s === 'gt' || s === 'ge';
}

/**
 * Whether `value ⋄ 0` holds.
 * @param {number} value
 * @param {Sign} s
 */
export function holds(value, s) {
  if (s === 'lt') return value < 0;
  if (s === 'gt') return value > 0;
  if (s === 'le') return value <= 0;
  return value >= 0;
}

/**
 * The solution of `ax + b ⋄ 0` for a ≠ 0: x ⋄' −b/a.
 * @param {number} a non-zero
 * @param {number} b
 * @param {Sign} s
 */
export function solve(a, b, s) {
  return { sign: a > 0 ? s : reverse(s), p: -b, q: a, bound: -b / a };
}

/**
 * Whether x is a solution of `ax + b ⋄ 0`.
 * @param {number} a
 * @param {number} b
 * @param {Sign} s
 * @param {number} x
 */
export function isSolution(a, b, s, x) {
  return holds(a * x + b, s);
}

/**
 * The solving steps as TeX lines, with a flag on the step that divides by a
 * negative number.
 * @param {number} a non-zero
 * @param {number} b
 * @param {Sign} s
 * @returns {{ tex: string, note: string, flips: boolean }[]}
 */
export function steps(a, b, s) {
  const sol = solve(a, b, s);
  const out = [{ tex: inequalityTex(a, b, s), note: 'Bất phương trình', flips: false }];
  if (b !== 0) {
    out.push({
      tex: `${linTex(a, 0)} ${SIGNS[s].tex} ${-b}`,
      note: `Chuyển ${intText(b)} sang vế phải và đổi dấu`,
      flips: false,
    });
  }
  if (a !== 1) {
    out.push({
      tex: `x ${SIGNS[sol.sign].tex} ${signedFracTex(sol.p, sol.q)}`,
      note:
        a > 0
          ? `Chia hai vế cho ${intText(a)} > 0: giữ nguyên chiều`
          : `Chia hai vế cho ${intText(a)} < 0: đổi chiều`,
      flips: a < 0,
    });
  }
  return out;
}

/**
 * The solution as plain text: 'x < 3/7'.
 * @param {number} a non-zero
 * @param {number} b
 * @param {Sign} s
 */
export function solutionText(a, b, s) {
  const sol = solve(a, b, s);
  return `x ${SIGNS[sol.sign].text} ${signedFracText(sol.p, sol.q)}`;
}

/**
 * What substituting x gives, as plain text: 'Thay x = 2: −3 · 2 + 6 = 0 ≥ 0 đúng'.
 * @param {number} a
 * @param {number} b
 * @param {Sign} s
 * @param {number} x
 */
export function checkText(a, b, s, x) {
  const value = a * x + b;
  const xs = formatNumber(x, 2);
  const term = a === 1 ? '' : a === -1 ? '−' : `${intText(a)} · `;
  const xPart = x < 0 ? `(${xs})` : xs;
  const tail = b === 0 ? '' : ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}`;
  const ok = holds(value, s);
  return `Thay x = ${xs}: ${term}${xPart}${tail} = ${formatNumber(value, 2)}; ${formatNumber(value, 2)} ${SIGNS[s].text} 0 là khẳng định ${ok ? 'đúng' : 'sai'}, nên x = ${xs} ${ok ? 'là' : 'không là'} nghiệm.`;
}

/**
 * The inequality as plain text, for labels: '−3x + 6 ≥ 0'.
 * @param {number} a
 * @param {number} b
 * @param {Sign} s
 */
export function inequalityText(a, b, s) {
  const left = a === 0 ? `0x ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : linText(a, b);
  return `${left} ${SIGNS[s].text} 0`;
}

/**
 * The inequality as TeX; a = 0 is written out as 0x so the learner sees why
 * it is not first-degree.
 * @param {number} a
 * @param {number} b
 * @param {Sign} s
 */
export function inequalityTex(a, b, s) {
  const left = a === 0 ? `0x ${b < 0 ? '-' : '+'} ${Math.abs(b)}` : linTex(a, b);
  return `${left} ${SIGNS[s].tex} 0`;
}

/**
 * The endpoint −b/a as plain text: '3/7', '−2'.
 * @param {number} a non-zero
 * @param {number} b
 */
export function boundText(a, b) {
  return signedFracText(-b, a);
}
