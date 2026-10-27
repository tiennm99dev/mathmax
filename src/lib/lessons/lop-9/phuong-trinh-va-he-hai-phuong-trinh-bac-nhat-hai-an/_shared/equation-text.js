/**
 * Writing linear equations `a·x + b·y = c` with integer coefficients the way
 * the book prints them: a coefficient of 1 is dropped, a zero term
 * disappears, and minus signs are the book's `−` in plain text.
 */

import { MINUS, intText } from '#lib/core/number-format.js';

/**
 * @param {number} coef
 * @param {string} name
 */
function term(coef, name) {
  const mag = Math.abs(coef);
  return `${mag === 1 ? '' : mag}${name}`;
}

/**
 * The left side `a·x + b·y` with signs joined: '2x − 3y', '−x + y', 'y'.
 * @param {number} a
 * @param {number} b
 * @param {string} minus the minus sign to print
 */
function lhs(a, b, minus) {
  let out = '';
  if (a !== 0) out = `${a < 0 ? minus : ''}${term(a, 'x')}`;
  if (b !== 0) {
    if (out === '') out = `${b < 0 ? minus : ''}${term(b, 'y')}`;
    else out += ` ${b < 0 ? minus : '+'} ${term(b, 'y')}`;
  }
  return out === '' ? '0' : out;
}

/**
 * Plain text for screen text and drill prompts: '2x − 3y = −5'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function eqText(a, b, c) {
  return `${lhs(a, b, MINUS)} = ${intText(c)}`;
}

/**
 * TeX source for live KaTeX: '2x - 3y = -5'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function eqTex(a, b, c) {
  return `${lhs(a, b, '-')} = ${c}`;
}

/**
 * A pair of numbers written the book's way: '(2; −1)'.
 * @param {number} x
 * @param {number} y
 */
export function pairText(x, y) {
  return `(${intText(x)}; ${intText(y)})`;
}

/**
 * How a pair is substituted, as plain text: '2 · 3 − 3 · (−1) = 9'.
 * Zero terms are left out, as in the equation itself.
 * @param {number} a
 * @param {number} b
 * @param {number} x
 * @param {number} y
 */
export function substituteText(a, b, x, y) {
  /** @param {number} coef @param {number} v */
  const part = (coef, v) => {
    const value = v < 0 ? `(${intText(v)})` : intText(v);
    const mag = Math.abs(coef);
    return mag === 1 ? value : `${mag} · ${value}`;
  };
  let out = '';
  if (a !== 0) out = `${a < 0 ? MINUS : ''}${part(a, x)}`;
  if (b !== 0) {
    if (out === '') out = `${b < 0 ? MINUS : ''}${part(b, y)}`;
    else out += ` ${b < 0 ? MINUS : '+'} ${part(b, y)}`;
  }
  return `${out === '' ? '0' : out} = ${intText(a * x + b * y)}`;
}
