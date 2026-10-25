/**
 * Exact decimal helpers for the chapter "Số thập phân". A decimal is carried
 * as an integer `n` scaled by 10^k (so −1,25 with k = 3 is −1250), which keeps
 * every sum, product and rounding free of floating-point drift. Text follows
 * the book: decimal comma, digits of the integer part grouped by threes with
 * a narrow space (1 234,5), and a real minus sign (−0,7).
 */

import { parseNumber } from '#lib/core/answer-check.js';
import { GROUP } from '#lib/core/number-format.js';

/**
 * The decimal n · 10^(−k) as text. Trailing zeros of the decimal part are
 * dropped unless `keep` is set, which writes exactly k decimals (24,0).
 * @param {number} n integer
 * @param {number} k number of decimals carried, 0 or more
 * @param {boolean} [keep]
 */
export function decStr(n, k, keep = false) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0) {
    throw new Error('decStr needs an integer and a whole number of decimals');
  }
  const digits = String(Math.abs(n)).padStart(k + 1, '0');
  const int = digits.slice(0, digits.length - k).replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
  let frac = digits.slice(digits.length - k);
  if (!keep) frac = frac.replace(/0+$/, '');
  const sign = n < 0 ? '−' : '';
  return frac ? `${sign}${int},${frac}` : `${sign}${int}`;
}

/**
 * The number value of n · 10^(−k), equal to what a learner's typed text
 * parses to (the division by a power of ten is correctly rounded, exactly
 * like reading the decimal string).
 * @param {number} n @param {number} k
 */
export function decValue(n, k) {
  return n / 10 ** k;
}

/**
 * Text for a number value with at most 6 decimals, written the book's way.
 * @param {number} v
 */
export function valueText(v) {
  return decStr(Math.round(v * 1e6), 6);
}

/**
 * Reads a decimal typed by a learner: '3,5', '3.5', '−0,25', '1 234,5'.
 * Returns null for anything that is not a plain number.
 * @param {string} text
 * @returns {number | null}
 */
export function readDecimal(text) {
  const parsed = parseNumber(text);
  return parsed && parsed.unit === '' ? parsed.value : null;
}

/**
 * Number of decimals actually needed to write n · 10^(−k).
 * @param {number} n @param {number} k
 */
export function decimalsOf(n, k) {
  let d = k;
  let m = Math.abs(n);
  while (d > 0 && m % 10 === 0) {
    m /= 10;
    d--;
  }
  return d;
}

/**
 * The decimal fraction of n · 10^(−k) with the smallest power of ten as its
 * denominator: (−1250, 3) gives { num: −125, den: 100 }.
 * @param {number} n @param {number} k
 */
export function decimalFraction(n, k) {
  const d = decimalsOf(n, k);
  return { num: n / 10 ** (k - d), den: 10 ** d };
}
