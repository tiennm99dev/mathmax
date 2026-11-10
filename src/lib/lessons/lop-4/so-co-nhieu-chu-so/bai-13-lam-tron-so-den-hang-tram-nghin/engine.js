/**
 * Rounding to hundred thousands on a number line between two marks
 * (mốc trăm nghìn). The child drags a number between the marks and sees it
 * go to the nearer mark, the halfway point going up; then answers rounds that
 * ask which mark a number rounds to. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { digitAt, roundTo, roundWhy } from '../_shared/big-numbers.js';

/** One hundred thousand: the gap between two marks. */
export const STEP = 100000;

/** The left marks of the stretches of line the child can pick. */
export const STRETCHES = /** @type {const} */ ([3200000, 2100000, 18400000, 1100000, 900000]);

/** Numbers of the book to round, in order. */
export const QUIZ = /** @type {const} */ ([
  3121023, 3272353, 3386097, 3254964, 1167900, 1916800, 3365200, 2125000, 18490000, 2890000,
]);

/**
 * The two marks around a number: the hundred thousands just below (or at)
 * it and the next one.
 * @param {number} n
 */
export function marksAround(n) {
  const low = Math.floor(n / STEP) * STEP;
  return { low, high: low + STEP };
}

/**
 * What the line says about a number: where it sits between the marks and
 * what it rounds to.
 * @param {number} n
 * @returns {{ target: number, text: string }}
 */
export function roundNote(n) {
  const target = roundTo(n, STEP);
  const { low, high } = marksAround(n);
  if (n === low) {
    return { target, text: `${fmt(n)} đã là số tròn trăm nghìn, làm tròn vẫn được ${fmt(n)}.` };
  }
  const where =
    n - low === STEP / 2
      ? `${fmt(n)} ở chính giữa ${fmt(low)} và ${fmt(high)}.`
      : `${fmt(n)} gần ${fmt(target)} hơn.`;
  return { target, text: `${where} ${roundWhy(n, STEP)}` };
}

/**
 * Checks the mark the child picked for a number of the quiz.
 * @param {number} n
 * @param {'low' | 'high'} pick
 * @returns {{ ok: boolean, text: string }}
 */
export function checkPick(n, pick) {
  const { low, high } = marksAround(n);
  const target = roundTo(n, STEP);
  const chosen = pick === 'low' ? low : high;
  if (chosen === target) return { ok: true, text: `Đúng rồi! ${roundWhy(n, STEP)}` };
  const d = digitAt(n, 4);
  return {
    ok: false,
    text: `Chưa đúng. Em nhìn chữ số hàng chục nghìn: đó là ${d}. Em so sánh ${d} với 5 nhé.`,
  };
}
