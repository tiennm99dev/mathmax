/**
 * Two stick columns side by side for "So sánh số có hai chữ số": each side
 * is a number from 10 to 99 built from tens and ones, and the comparison
 * looks at the tens first, then the ones. Pure and DOM-free.
 */
import { compareReason, compareSign } from '../_shared/numbers.js';

/** @typedef {{ tens: number, ones: number }} Side */

/** @param {Side} s */
export function valueOf(s) {
  return s.tens * 10 + s.ones;
}

/**
 * A side after changing its tens or ones by `delta`, kept to a two-digit
 * number: tens from 1 to 9, ones from 0 to 9.
 * @param {Side} s
 * @param {'tens' | 'ones'} place
 * @param {number} delta
 * @returns {Side}
 */
export function bump(s, place, delta) {
  const lo = place === 'tens' ? 1 : 0;
  const v = Math.min(9, Math.max(lo, s[place] + delta));
  return { ...s, [place]: v };
}

/**
 * The sign between two sides and the book's reason for it.
 * @param {Side} a
 * @param {Side} b
 */
export function compare(a, b) {
  const x = valueOf(a);
  const y = valueOf(b);
  return { sign: compareSign(x, y), reason: compareReason(x, y) };
}

/**
 * Which place decides the comparison: the tens when they differ, else the
 * ones, else neither (the numbers are equal). Drives the highlight.
 * @param {Side} a
 * @param {Side} b
 * @returns {'tens' | 'ones' | 'equal'}
 */
export function decidingPlace(a, b) {
  if (a.tens !== b.tens) return 'tens';
  if (a.ones !== b.ones) return 'ones';
  return 'equal';
}

/**
 * A new pair to compare: about half share their tens (so the ones decide),
 * a few are equal, the rest differ in the tens.
 * @param {() => number} [random] Returns a number in [0, 1).
 * @returns {[Side, Side]}
 */
export function randomPair(random = Math.random) {
  const digit = (/** @type {number} */ lo) => lo + Math.floor(random() * (10 - lo));
  const a = { tens: digit(1), ones: digit(0) };
  const r = random();
  if (r < 0.1) return [a, { ...a }];
  if (r < 0.55) {
    let ones = digit(0);
    if (ones === a.ones) ones = (ones + 3) % 10;
    return [a, { tens: a.tens, ones }];
  }
  let tens = digit(1);
  if (tens === a.tens) tens = (tens % 9) + 1;
  return [a, { tens, ones: digit(0) }];
}
