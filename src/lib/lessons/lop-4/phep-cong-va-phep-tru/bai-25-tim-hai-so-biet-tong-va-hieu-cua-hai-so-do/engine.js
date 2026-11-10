/**
 * Two numbers from their sum and difference, on the book's line diagram:
 * the bigger number is the smaller one plus the difference, so taking the
 * difference away leaves two equal parts. Số bé = (Tổng − Hiệu) : 2 and
 * Số lớn = (Tổng + Hiệu) : 2. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * The problems: a sum and a difference of the same parity, so both numbers
 * are whole.
 */
export const PROBLEMS = /** @type {const} */ ([
  { sum: 70, diff: 10 },
  { sum: 50, diff: 14 },
  { sum: 90, diff: 24 },
  { sum: 36, diff: 6 },
  { sum: 100, diff: 30 },
]);

/**
 * The two numbers.
 * @param {number} sum
 * @param {number} diff
 */
export function solve(sum, diff) {
  const small = (sum - diff) / 2;
  return { small, big: small + diff };
}

/**
 * The working, both ways.
 * @param {number} sum
 * @param {number} diff
 */
export function working(sum, diff) {
  const { small, big } = solve(sum, diff);
  return [
    `Hai lần số bé: ${fmt(sum)} − ${fmt(diff)} = ${fmt(sum - diff)}.`,
    `Số bé: ${fmt(sum - diff)} : 2 = ${fmt(small)}.`,
    `Số lớn: ${fmt(small)} + ${fmt(diff)} = ${fmt(big)}.`,
  ];
}

/**
 * The live feedback for a chosen smaller number.
 * @param {number} sum
 * @param {number} diff
 * @param {number} small what the child has set
 */
export function feedback(sum, diff, small) {
  const got = small + small + diff;
  if (got < sum) {
    return {
      tone: 'info',
      text: `Hai số cộng lại được ${fmt(got)}, còn thiếu ${fmt(sum - got)} so với tổng ${fmt(sum)}.`,
    };
  }
  if (got > sum) {
    return {
      tone: 'warn',
      text: `Hai số cộng lại được ${fmt(got)}, nhiều hơn tổng ${fmt(sum)} là ${fmt(got - sum)}.`,
    };
  }
  return {
    tone: 'ok',
    text: `Đúng rồi! Số bé là ${fmt(small)}, số lớn là ${fmt(small + diff)}. ${fmt(small)} + ${fmt(small + diff)} = ${fmt(sum)}.`,
  };
}
