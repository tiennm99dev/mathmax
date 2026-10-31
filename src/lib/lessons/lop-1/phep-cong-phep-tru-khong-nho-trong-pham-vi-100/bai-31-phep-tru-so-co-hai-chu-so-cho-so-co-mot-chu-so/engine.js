/**
 * The stick board of "Phép trừ số có hai chữ số cho số có một chữ số": the
 * child crosses out loose sticks of the two-digit number to take the
 * one-digit number away; the bundles of ten stay. Pure and DOM-free.
 */
import { sticksWords } from '../_shared/sticks-text.js';

/** The first calculation, fixed so the prerendered page and the browser agree. */
export const FIRST = { a: 76, b: 5 };

/**
 * A fresh row of loose sticks, none crossed out.
 * @param {number} a
 * @returns {boolean[]}
 */
export function freshRow(a) {
  return Array.from({ length: a % 10 }, () => false);
}

/**
 * The row with stick `i` crossed out or put back.
 * @param {readonly boolean[]} row
 * @param {number} i
 */
export function toggle(row, i) {
  return row.map((c, k) => (k === i ? !c : c));
}

/** @param {readonly boolean[]} row */
export function crossedCount(row) {
  return row.filter(Boolean).length;
}

/**
 * What the board says after `crossed` loose sticks of `a` are crossed out
 * when `b` must be taken away.
 * @param {number} a
 * @param {number} b
 * @param {number} crossed
 * @returns {{ done: boolean, text: string }}
 */
export function takeMessage(a, b, crossed) {
  if (crossed === 0) {
    return {
      done: false,
      text: `Có ${a} que tính: ${sticksWords(a)}. Em chạm vào que rời để bớt đi ${b} que.`,
    };
  }
  if (crossed < b) {
    return { done: false, text: `Em đã bớt ${crossed} que. Bớt thêm ${b - crossed} que nữa.` };
  }
  if (crossed > b) {
    return {
      done: false,
      text: `Em bớt nhiều quá! Chỉ bớt ${b} que thôi. Chạm vào que đã gạch để lấy lại.`,
    };
  }
  const r = a - b;
  return {
    done: true,
    text: `Bớt ${b} que rời, còn ${r % 10} que rời. Bó chục giữ nguyên. Còn lại ${sticksWords(r)}: ${r} que tính. Bây giờ em đặt tính nhé.`,
  };
}
