/**
 * Writing and reading integers the way the grade 6 book prints them: a true
 * minus sign (−5), negative numbers in brackets inside an operation
 * ((−5) + 3), and learner input that may use either minus sign.
 */

import { fmt } from '#lib/core/number-format.js';

/** The minus sign the book prints (U+2212), never a hyphen. */
export const MINUS = '−';

/**
 * An integer as plain text: −1 234, 0, 56.
 * @param {number} n
 */
export function intText(n) {
  return n < 0 ? `${MINUS}${fmt(-n)}` : fmt(n);
}

/**
 * An integer as an operand: negatives go in brackets, (−5).
 * @param {number} n
 */
export function operand(n) {
  return n < 0 ? `(${intText(n)})` : intText(n);
}

/**
 * Reads an integer typed by a learner: '-5', '−5', '+5', '5', '- 12',
 * '1 024' or '−1.024'. Returns null for anything else.
 * @param {string} text
 * @returns {number | null}
 */
export function readInteger(text) {
  const s = text.trim().replace(/[−–—]/g, '-').replace(/\s/g, '');
  const m = /^([+-]?)(\d{1,3}(?:\.\d{3})+|\d+)$/.exec(s);
  if (!m) return null;
  const n = Number(m[2].replace(/\./g, ''));
  return m[1] === '-' ? (n === 0 ? 0 : -n) : n;
}

/**
 * Whether an integer is positive, negative or zero, in words.
 * @param {number} n
 */
export function kindOf(n) {
  if (n > 0) return 'số nguyên dương';
  if (n < 0) return 'số nguyên âm';
  return 'số 0 (không dương, không âm)';
}
