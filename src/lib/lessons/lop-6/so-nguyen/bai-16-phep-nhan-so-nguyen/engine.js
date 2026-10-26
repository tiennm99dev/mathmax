/**
 * The multiplication table extended to negative factors. It starts with the
 * products of natural numbers; each step opens one more column (a natural
 * number times a negative one, as a repeated sum) or one more row (a
 * negative first factor, found by continuing the pattern down a column:
 * each time a drops by 1, the product drops by b).
 */

import { intText, operand } from '#lib/core/number-format.js';

/** Factors run from −RANGE to RANGE. */
export const RANGE = 4;

/** Steps that open the whole table: RANGE columns, then RANGE rows. */
export const STEPS = 2 * RANGE;

/** Factors from RANGE down to −RANGE (rows) or −RANGE up to RANGE (columns). */
export const ROWS = Array.from({ length: 2 * RANGE + 1 }, (_, i) => RANGE - i);
export const COLS = Array.from({ length: 2 * RANGE + 1 }, (_, i) => i - RANGE);

/**
 * Whether the cell a · b is open after `step` steps.
 * @param {number} a row factor
 * @param {number} b column factor
 * @param {number} step 0 to STEPS
 */
export function isOpen(a, b, step) {
  if (a < 0) return -a <= step - RANGE;
  if (b < 0) return -b <= Math.min(step, RANGE);
  return true;
}

/**
 * What step `step` (1-based) opens, in words.
 * @param {number} step
 */
export function stepCaption(step) {
  if (step <= 0) return 'Bảng đang có các tích của hai số tự nhiên.';
  if (step <= RANGE) {
    const b = -step;
    return `Mở cột b = ${intText(b)}: nhân một số tự nhiên với ${operand(b)} là cộng ${operand(b)} nhiều lần, ví dụ 3 · ${operand(b)} = ${operand(b)} + ${operand(b)} + ${operand(b)} = ${intText(3 * b)}.`;
  }
  const a = -(step - RANGE);
  return `Mở hàng a = ${intText(a)}: theo mỗi cột, khi a giảm 1 thì tích giảm đi b. Ví dụ cột b = −2: tích tăng dần 2 đơn vị, nên ${operand(a)} · (−2) = ${intText(-2 * a)}.`;
}

/**
 * The sign rule for a · b.
 * @param {number} a
 * @param {number} b
 */
export function signRule(a, b) {
  if (a === 0 || b === 0) return 'Một thừa số bằng 0 thì tích bằng 0.';
  if (a > 0 && b > 0) return 'Hai số nguyên dương: nhân như hai số tự nhiên, tích dương.';
  if (a < 0 && b < 0) return 'Hai số nguyên âm (cùng dấu): nhân hai phần số tự nhiên, tích dương.';
  return 'Hai số khác dấu: nhân hai phần số tự nhiên rồi đặt dấu "−" trước kết quả, tích âm.';
}

/**
 * How the product a · b is found from what is already known.
 * @param {number} a
 * @param {number} b
 */
export function reason(a, b) {
  const p = a * b;
  const head = `${operand(a)} · ${operand(b)}`;
  if (a >= 0 && b >= 0) return `${head} = ${intText(p)} (tích hai số tự nhiên).`;
  if (a === 0) return `${head} = 0, vì 0 nhân với số nào cũng bằng 0.`;
  if (a > 0) {
    const sum = Array.from({ length: a }, () => operand(b)).join(' + ');
    return `${head} = ${sum} = ${intText(p)}.`;
  }
  const above = (a + 1) * b;
  return `Trong cột b = ${intText(b)}: ${operand(a + 1)} · ${operand(b)} = ${intText(above)}; a giảm 1 thì tích giảm đi ${operand(b)}, nên ${head} = ${intText(above)} − ${operand(b)} = ${intText(p)}.`;
}

/**
 * Tailwind classes for a cell by the sign of its product.
 * @param {number} p
 */
export function signClass(p) {
  if (p > 0) return 'bg-emerald-50 text-emerald-800';
  if (p < 0) return 'bg-rose-50 text-rose-800';
  return 'bg-slate-100 text-slate-700';
}
