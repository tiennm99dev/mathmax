/**
 * The chip model of integer addition and subtraction: a positive chip (+1)
 * and a negative chip (−1) cancel as a zero pair; subtracting b means adding
 * the opposite chips of b. Also the book's rule, in words, for a sum.
 */

import { intText, operand } from '../_shared/integers.js';

/**
 * The number actually added: b for 'a + b', its opposite for 'a − b'.
 * @param {number} b
 * @param {'+' | '-'} op
 */
export function addend(b, op) {
  return op === '+' ? b : -b;
}

/**
 * The chips on the board: the chips of a, the chips of the addend, and how
 * many zero pairs can cancel.
 * @param {number} a
 * @param {number} c the addend (b, or the opposite of b)
 */
export function chipBoard(a, c) {
  const pos = Math.max(a, 0) + Math.max(c, 0);
  const neg = Math.max(-a, 0) + Math.max(-c, 0);
  return { pos, neg, pairs: Math.min(pos, neg), result: a + c };
}

/**
 * The chip each slot shows: rows of a's chips then the addend's chips, each
 * chip with its sign and whether it has cancelled after `cancelled` pairs.
 * Pairs cancel in board order: the k-th positive chip with the k-th negative.
 * @param {number} a
 * @param {number} c
 * @param {number} cancelled
 */
export function chipRows(a, c, cancelled) {
  let posSeen = 0;
  let negSeen = 0;
  /** @param {number} n */
  const row = (n) =>
    Array.from({ length: Math.abs(n) }, () => {
      const positive = n > 0;
      const k = positive ? posSeen++ : negSeen++;
      return { positive, gone: k < cancelled };
    });
  return { first: row(a), second: row(c) };
}

/**
 * The book's rule for a + c, as worked steps.
 * @param {number} a
 * @param {number} c
 * @returns {string[]}
 */
export function sumSteps(a, c) {
  const head = `${operand(a)} + ${operand(c)}`;
  const s = a + c;
  if (a === 0 || c === 0) return [`Cộng với 0: ${head} = ${intText(s)}.`];
  if (a > 0 && c > 0)
    return [`Hai số nguyên dương: cộng như số tự nhiên, ${head} = ${intText(s)}.`];
  if (a < 0 && c < 0) {
    return [
      'Hai số nguyên âm: cộng hai phần số tự nhiên rồi đặt dấu "−" trước kết quả.',
      `${head} = −(${-a} + ${-c}) = ${intText(s)}.`,
    ];
  }
  if (s === 0) return [`Hai số đối nhau có tổng bằng 0: ${head} = 0.`];
  const [big, small] = Math.abs(a) > Math.abs(c) ? [a, c] : [c, a];
  return [
    `Hai số khác dấu: lấy phần số tự nhiên lớn trừ phần số tự nhiên nhỏ, ${Math.abs(big)} − ${Math.abs(small)} = ${Math.abs(s)}.`,
    `Đặt dấu của số có phần số tự nhiên lớn hơn (${intText(big)}): ${head} = ${intText(s)}.`,
  ];
}
