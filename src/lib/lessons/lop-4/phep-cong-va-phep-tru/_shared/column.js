/**
 * Column addition and subtraction of numbers with many digits ("đặt tính rồi
 * tính"), worked one column at a time from the ones and said the book's way:
 * "9 cộng 8 bằng 17, viết 7, nhớ 1" and "3 không trừ được 9, lấy 13 trừ 9
 * bằng 4, viết 4, nhớ 1". Each step also tells the widget what to draw: the
 * carried 1 over the next column, or the 10 borrowed into this one and the 1
 * added to the next digit of the number below. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'+' | '−'} Op */

/**
 * One column of the calculation, from the ones (`col` 0).
 * - `top`, `bottom`: the digits set in that column (`bottom` is null where
 *   the second number has no digit);
 * - `extra`: what comes in from the column before (the carried or
 *   borrowed 1, else 0);
 * - `out`: what goes on to the next column (1 when this column carries or
 *   borrows);
 * - `digit`: the digit written under the line; `say`: the sentence.
 * @typedef {{
 *   col: number,
 *   top: number,
 *   bottom: number | null,
 *   extra: number,
 *   out: number,
 *   digit: number,
 *   say: string,
 * }} Step
 */

/** Place names from the ones, up to hundred millions. */
export const PLACE_NAMES = /** @type {const} */ ([
  'đơn vị',
  'chục',
  'trăm',
  'nghìn',
  'chục nghìn',
  'trăm nghìn',
  'triệu',
  'chục triệu',
  'trăm triệu',
]);

/**
 * Digits of a natural number, ones first.
 * @param {number} n
 */
export const onesFirst = (n) => String(n).split('').reverse().map(Number);

/**
 * The number set on top and the one set below: the first number on top,
 * unless the second has more digits.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 * @returns {[number, number]}
 */
export function rowsOf(op, a, b) {
  return op === '+' && String(b).length > String(a).length ? [b, a] : [a, b];
}

/**
 * The columns of `a + b`, ones first; the longer number goes on top.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function addSteps(a, b) {
  const [p, q] = rowsOf('+', a, b);
  const x = onesFirst(p);
  const y = onesFirst(q);
  let carry = 0;
  return x.map((top, col) => {
    const bottom = y[col] ?? null;
    const plain = top + (bottom ?? 0);
    const extra = carry;
    const total = plain + extra;
    const last = col === x.length - 1;
    const digit = last ? total : total % 10;
    carry = last ? 0 : Math.floor(total / 10);
    const start = bottom === null ? `${top}` : `${top} cộng ${bottom} bằng ${plain}`;
    const added =
      extra > 0
        ? bottom === null
          ? ` thêm ${extra} bằng ${total}`
          : `, thêm ${extra} bằng ${total}`
        : '';
    const head = bottom === null && extra === 0 ? `Hạ ${top}` : `${start}${added}`;
    const write = bottom === null && extra === 0 ? '' : `, viết ${digit}`;
    const kept = carry > 0 ? `, nhớ ${carry}` : '';
    return { col, top, bottom, extra, out: carry, digit, say: `${head}${write}${kept}` };
  });
}

/**
 * The columns of `a − b` (`a` ≥ `b`), ones first.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function subSteps(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  let borrow = 0;
  return x.map((top, col) => {
    const bottom = y[col] ?? null;
    const extra = borrow;
    const take = (bottom ?? 0) + extra;
    if (bottom === null && extra === 0) {
      borrow = 0;
      return { col, top, bottom, extra, out: 0, digit: top, say: `Hạ ${top}` };
    }
    const pre = extra > 0 && bottom !== null ? `${bottom} thêm 1 bằng ${take}; ` : '';
    if (top >= take) {
      borrow = 0;
      const digit = top - take;
      return {
        col,
        top,
        bottom,
        extra,
        out: 0,
        digit,
        say: `${pre}${top} trừ ${take} bằng ${digit}, viết ${digit}`,
      };
    }
    borrow = 1;
    const digit = top + 10 - take;
    return {
      col,
      top,
      bottom,
      extra,
      out: 1,
      digit,
      say: `${pre}${top} không trừ được ${take}, lấy ${top + 10} trừ ${take} bằng ${digit}, viết ${digit}, nhớ 1`,
    };
  });
}

/**
 * The steps of a calculation in the order they are written.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export const stepsOf = (op, a, b) => (op === '+' ? addSteps(a, b) : subSteps(a, b));

/**
 * The result of a calculation.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export const resultOf = (op, a, b) => (op === '+' ? a + b : a - b);

/**
 * The finished sentence: "367 859 + 541 728 = 909 587".
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export const equation = (op, a, b) => `${fmt(a)} ${op} ${fmt(b)} = ${fmt(resultOf(op, a, b))}`;

/**
 * How many columns of a calculation carry (addition) or borrow
 * (subtraction).
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export const carries = (op, a, b) => stepsOf(op, a, b).filter((s) => s.out > 0).length;

/**
 * The slip of a child who forgets every carried or borrowed 1: each column
 * worked on its own and its last digit written.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export function forgotCarry(op, a, b) {
  const [top, bottom] = rowsOf(op, a, b);
  const x = onesFirst(top);
  const y = onesFirst(bottom);
  const digits = x.map((p, i) => {
    const q = y[i] ?? 0;
    return op === '+' ? (p + q) % 10 : (p - q + 10) % 10;
  });
  return Number(digits.reverse().join(''));
}

/**
 * What the child is asked for next.
 * @param {Step} step
 */
export const askFor = (step) => `Em viết chữ số hàng ${PLACE_NAMES[step.col]} của kết quả.`;

/**
 * A nudge after a wrong digit; the second slip shows the whole step.
 * @param {Op} op
 * @param {Step} step
 * @param {number} tries wrong tries so far on this step (1 or more)
 */
export function nudge(op, step, tries) {
  if (tries >= 2) return `Em làm thế này nhé: ${step.say}.`;
  if (op === '+') {
    return step.extra > 0
      ? 'Chưa đúng. Em cộng hai chữ số cùng hàng, rồi thêm 1 đã nhớ.'
      : 'Chưa đúng. Em cộng hai chữ số cùng hàng. Được 10 trở lên thì viết chữ số hàng đơn vị, nhớ 1.';
  }
  if (step.extra > 0) return 'Chưa đúng. Em thêm 1 đã nhớ vào chữ số ở dưới, rồi mới trừ.';
  return 'Chưa đúng. Nếu chữ số ở trên bé hơn chữ số ở dưới, em lấy thêm 10 rồi trừ, nhớ 1.';
}
