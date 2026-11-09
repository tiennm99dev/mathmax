/**
 * The rolling ball of "Làm tròn số đến hàng chục, hàng trăm": a number sits
 * as a ball on a hill between the two round marks around it, the top of the
 * hill at the halfway mark. The ball rolls down to the nearer mark; from the
 * very top it rolls to the larger one, as the book's rule says (5 rounds
 * up). The child guesses the mark before the ball rolls. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { roundTo, roundWhy } from '../_shared/numbers-to-10000.js';

/** @typedef {10 | 100} Unit */

/** The numbers to round, per unit, in order; none is already round. */
export const NUMBERS = /** @type {const} */ ({
  10: [43, 2826, 3064, 1255, 5247, 798, 9995, 2823],
  100: [3256, 3524, 3064, 5247, 850, 1449, 9950, 4718],
});

/** Smallest and largest number the steppers reach. */
export const LOW = 1;
export const HIGH = 9999;

/**
 * The two round marks around `n` and the halfway point. A round number sits
 * on its lower mark.
 * @param {number} n
 * @param {Unit} unit
 */
export function marksAround(n, unit) {
  const lo = Math.floor(n / unit) * unit;
  return { lo, hi: lo + unit, mid: lo + unit / 2 };
}

/**
 * Where the ball is along its hill, from 0 at the lower mark to 1 at the
 * upper one.
 * @param {number} n
 * @param {Unit} unit
 */
export function along(n, unit) {
  return (n - marksAround(n, unit).lo) / unit;
}

/**
 * Height of the hill at `t` (0 to 1): 0 at both marks, 1 at the top.
 * @param {number} t
 */
export function hillHeight(t) {
  return 1 - Math.abs(2 * t - 1);
}

/**
 * The verdict on the mark the child guessed for `n`.
 * @param {number} n
 * @param {Unit} unit
 * @param {number} guess
 * @returns {{ ok: boolean, text: string }}
 */
export function guessVerdict(n, unit, guess) {
  const why = roundWhy(n, unit);
  if (guess === roundTo(n, unit)) return { ok: true, text: `Đúng rồi! ${why}` };
  return { ok: false, text: `Viên bi không lăn về ${fmt(guess)}. ${why}` };
}

/**
 * What the ball looks like now, for the live region.
 * @param {number} n
 * @param {Unit} unit
 */
export function ballText(n, unit) {
  const { lo, hi, mid } = marksAround(n, unit);
  if (n === lo) return `Viên bi ${fmt(n)} đang nằm ngay trên mốc ${fmt(lo)}.`;
  if (n === mid) return `Viên bi ${fmt(n)} ở đúng đỉnh dốc, giữa ${fmt(lo)} và ${fmt(hi)}.`;
  const side = n < mid ? `gần ${fmt(lo)} hơn` : `gần ${fmt(hi)} hơn`;
  return `Viên bi ${fmt(n)} nằm giữa ${fmt(lo)} và ${fmt(hi)}, ${side}.`;
}
