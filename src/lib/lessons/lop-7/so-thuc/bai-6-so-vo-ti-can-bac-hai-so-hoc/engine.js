/**
 * Logic of the "square of area S" widget: the learner traps the side √S
 * between two decimals, one more digit at a time, by squaring candidates.
 * All arithmetic is on integers scaled by powers of ten, so 1,414² is
 * exactly 1,999396.
 */

import { scaledText, sqrtFloor } from '../_shared/decimal.js';

/** Smallest and largest area offered. */
export const MIN_AREA = 1;
export const MAX_AREA = 60;

/** How many digits after the comma the learner may trap. */
export const MAX_LEVEL = 3;

/**
 * The digit to find at `level` (0: the whole part), and the bracket built so
 * far, as integers scaled by 10^level: floor(√S·10^level) and that plus 1.
 * @param {number} area
 * @param {number} level
 */
export function bracketAt(area, level) {
  const lo = sqrtFloor(area, level);
  return { lo, hi: lo + 1, digit: level === 0 ? lo : lo % 10 };
}

/**
 * @typedef {object} Attempt
 * @property {number} digit the digit tried
 * @property {string} candidate the candidate as text: '1,4'
 * @property {string} square its exact square as text: '1,96'
 * @property {'big' | 'small' | 'right'} status 'big' when the square is
 *   greater than S, 'small' when the next candidate's square is still at
 *   most S, 'right' when S lies between the two squares
 * @property {boolean} exact the square equals S
 */

/**
 * Tries the digit k after the digits already found.
 * @param {number} area
 * @param {number} level
 * @param {number} k digit 0-9 (the whole part when level is 0)
 * @returns {Attempt}
 */
export function tryDigit(area, level, k) {
  const prev = level === 0 ? 0 : sqrtFloor(area, level - 1);
  const c = prev * 10 + k;
  const target = area * 10 ** (2 * level);
  const sq = c * c;
  /** @type {Attempt['status']} */
  let status = 'right';
  if (sq > target) status = 'big';
  else if ((c + 1) * (c + 1) <= target) status = 'small';
  return {
    digit: k,
    candidate: scaledText(c, level),
    square: scaledText(sq, 2 * level),
    status,
    exact: sq === target,
  };
}

/**
 * The bracket lo < √S < hi as text, with the squares that prove it:
 * { lo: '1,41', hi: '1,42', loSquare: '1,9881', hiSquare: '2,0164' }.
 * @param {number} area
 * @param {number} level
 */
export function bracketText(area, level) {
  const { lo, hi } = bracketAt(area, level);
  return {
    lo: scaledText(lo, level),
    hi: scaledText(hi, level),
    loSquare: scaledText(lo * lo, 2 * level),
    hiSquare: scaledText(hi * hi, 2 * level),
    loValue: lo / 10 ** level,
    hiValue: hi / 10 ** level,
  };
}
