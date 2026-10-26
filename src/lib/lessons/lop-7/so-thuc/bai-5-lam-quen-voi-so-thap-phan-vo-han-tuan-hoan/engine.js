/**
 * Logic of the long-division widget: the rows of the division p : q one
 * digit at a time, which remainders belong to the period, and the rounding
 * check of the second widget.
 */

import {
  PRECISIONS,
  decimalText,
  digitAt,
  expand,
  primeFactors,
  readNumber,
  roundFraction,
  scaledText,
  scaledValue,
} from '#lib/core/decimal.js';

/** Fractions offered by the division widget, as [p, q]. */
export const PRESETS = /** @type {Array<[number, number]>} */ ([
  [5, 11],
  [3, 20],
  [1, 3],
  [1, 6],
  [2, 7],
  [7, 12],
  [13, 8],
  [4, 9],
]);

/** Largest numerator and denominator the learner may type. */
export const MAX_TERM = 99;

/**
 * @typedef {object} Row
 * @property {number} dividend the remainder with a 0 brought down (10r)
 * @property {number} digit the digit of the quotient it gives
 * @property {number} before remainder before the step
 * @property {number} after remainder after the step
 * @property {boolean} inPeriod the digit belongs to the period
 * @property {boolean} repeats `after` equals an earlier remainder: the
 *   division would go round again from here
 */

/**
 * The rows of the division after the comma, one per digit.
 * @param {number} p
 * @param {number} q
 * @returns {Row[]}
 */
export function divisionRows(p, q) {
  const e = expand(p, q);
  return e.digits.map((digit, i) => {
    const before = e.remainders[i];
    const after = (before * 10) % q;
    const last = i === e.digits.length - 1;
    return {
      dividend: before * 10,
      digit,
      before,
      after,
      inPeriod: e.period > 0 && i >= e.start,
      repeats: last && e.period > 0,
    };
  });
}

/**
 * True when the lowest-terms denominator has only the prime factors 2 and 5,
 * with the reason in words.
 * @param {number} p
 * @param {number} q
 */
export function finiteReason(p, q) {
  let g = Math.abs(p);
  let d = q;
  while (d) [g, d] = [d, g % d];
  const den = q / (g || 1);
  const num = Math.abs(p) / (g || 1);
  const factors = den > 1 ? primeFactors(den) : [];
  const others = factors.filter((f) => f !== 2 && f !== 5);
  const lowest = `${p < 0 ? '−' : ''}${num}/${den}`;
  if (den === 1) return { finite: true, text: `${lowest} là một số nguyên.` };
  const list = factors.join(', ');
  return others.length === 0
    ? {
        finite: true,
        text: `Mẫu ${den} của phân số tối giản ${lowest} chỉ có ước nguyên tố ${list}, nên đó là số thập phân hữu hạn.`,
      }
    : {
        finite: false,
        text: `Mẫu ${den} của phân số tối giản ${lowest} có ước nguyên tố ${others.join(', ')} khác 2 và 5, nên đó là số thập phân vô hạn tuần hoàn.`,
      };
}

/** Numbers offered by the rounding widget, as [p, q]. */
export const ROUNDING_NUMBERS = /** @type {Array<[number, number]>} */ ([
  [2, 3],
  [5, 11],
  [1, 7],
  [-1, 6],
  [35, 9],
  [7, 12],
]);

/**
 * The rounding of p/q for a precision from PRECISIONS, worked step by step.
 * @param {number} p
 * @param {number} q
 * @param {number} precisionIndex index in PRECISIONS
 */
export function roundingCase(p, q, precisionIndex) {
  const pr = PRECISIONS[precisionIndex];
  const places = pr.places;
  const scaled = roundFraction(p, q, places);
  const kept = digitAt(p, q, places + 1);
  const shownDigits = places + 3;
  const e = expand(p, q);
  let written = '';
  for (let n = 1; n <= shownDigits; n++) written += digitAt(p, q, n);
  return {
    precision: pr.text,
    place: pr.place,
    places,
    short: decimalText(p, q),
    sign: e.negative ? '−' : '',
    whole: String(e.whole),
    /** digits after the comma up to the rounding place */
    head: written.slice(0, places),
    /** the digit right after the rounding place */
    next: String(kept),
    /** a few more digits, then … */
    tail: `${written.slice(places + 1)}…`,
    up: kept >= 5,
    answer: scaledValue(scaled, places),
    answerText: scaledText(scaled, places),
  };
}

/**
 * Checks a typed rounding against the right answer.
 * @param {string} typed
 * @param {number} answer
 * @returns {'invalid' | 'right' | 'wrong'}
 */
export function checkRounding(typed, answer) {
  const v = readNumber(typed);
  if (v === null) return 'invalid';
  return v === answer ? 'right' : 'wrong';
}
