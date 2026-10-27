/**
 * Writing roots the way the book does: an exact value when the root is a
 * short decimal (√6,25 = 2,5), else a value rounded to three places after
 * the comma with "≈" (√2 ≈ 1,414). Shared by the widgets of this chapter.
 */

import { formatFixed, formatNumber } from '#lib/core/number-format.js';

/**
 * Whether `value` is, up to rounding noise, a decimal with at most `places`
 * digits after the comma.
 * @param {number} value
 * @param {number} [places]
 */
export function isShortDecimal(value, places = 2) {
  const scaled = value * 10 ** places;
  return Math.abs(scaled - Math.round(scaled)) < 1e-7;
}

/**
 * A computed root as text: '= 2,5' when exact, '≈ 1,414' otherwise.
 * @param {number} value
 * @returns {{ exact: boolean, sign: '=' | '≈', text: string }}
 */
export function rootValue(value) {
  if (isShortDecimal(value)) {
    const clean = Math.round(value * 100) / 100;
    return { exact: true, sign: '=', text: formatNumber(clean, 2) };
  }
  return { exact: false, sign: '≈', text: formatFixed(value, 3) };
}

/**
 * A number for plain text with the comma as decimal mark and the book's
 * minus sign, at most two places: 6.25 → '6,25', −3 → '−3'.
 * @param {number} value
 */
export function numText(value) {
  return formatNumber(Math.round(value * 100) / 100, 2);
}
