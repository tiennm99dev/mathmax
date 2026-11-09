/**
 * The number line of "Làm tròn số đến hàng nghìn, hàng chục nghìn": a piece
 * of the line between two round marks (two thousands, or two ten
 * thousands), with the halfway mark in between. The child drags a number
 * along it and sees which mark it rounds to: the nearer one, and the larger
 * one from the halfway mark on, as the book's rule says. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { TOP, roundTo } from '../_shared/numbers-to-100000.js';

/** @typedef {import('../_shared/numbers-to-100000.js').RoundUnit} RoundUnit */

/** The first number shown per unit, from the book. */
export const START = /** @type {const} */ ({ 1000: 65341, 10000: 82134 });

/** The book's numbers the child can jump to, per unit. */
export const BOOK_NUMBERS = /** @type {const} */ ({
  1000: [65341, 10501, 9805, 80304, 61500],
  10000: [82134, 55712, 46000, 54215, 78302],
});

/**
 * How finely the marker moves for a unit: tens on a line of one thousand,
 * hundreds on a line of ten thousand.
 * @param {RoundUnit} unit
 */
export const fineStep = (unit) => unit / 100;

/**
 * The piece of line that holds `n`: its round ends and its halfway mark. A
 * round number sits at the left end, except 100 000, which ends the line.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function windowFor(n, unit) {
  const lo = Math.min(Math.floor(n / unit) * unit, TOP - unit);
  return { lo, hi: lo + unit, mid: lo + unit / 2 };
}

/**
 * The left end of the piece of line next to the one starting at `lo`, kept
 * on the line from 0 to 100 000.
 * @param {number} lo
 * @param {RoundUnit} unit
 * @param {-1 | 1} way
 */
export function shiftWindow(lo, unit, way) {
  return Math.min(Math.max(lo + way * unit, 0), TOP - unit);
}

/**
 * Where the number is on its piece of line, for the live region.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function positionText(n, unit) {
  const { lo, hi, mid } = windowFor(n, unit);
  if (n === lo || n === hi) return `Số ${fmt(n)} nằm ngay trên mốc ${fmt(n)}.`;
  if (n === mid) return `Số ${fmt(n)} nằm đúng ở giữa ${fmt(lo)} và ${fmt(hi)}.`;
  const near = n < mid ? lo : hi;
  return `Số ${fmt(n)} nằm giữa ${fmt(lo)} và ${fmt(hi)}, gần ${fmt(near)} hơn.`;
}

/**
 * The arrow from the number to the mark it rounds to, or null when it is a
 * mark already.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundingHop(n, unit) {
  const to = roundTo(n, unit);
  return to === n ? null : { from: n, to, label: fmt(to) };
}
