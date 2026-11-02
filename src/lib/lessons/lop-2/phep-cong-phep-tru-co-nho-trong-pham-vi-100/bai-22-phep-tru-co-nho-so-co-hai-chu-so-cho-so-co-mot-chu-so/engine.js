/**
 * "Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số" on counting
 * sticks: the first number lies as bundles of ten and loose sticks, and the
 * child takes away the sticks of the second number one at a time. There are
 * too few loose sticks, so one bundle has to be untied into ten loose sticks
 * (1 chục = 10 đơn vị) before the rest can go: 42 − 7 leaves 3 bundles and 5
 * loose sticks, 35. Pure and DOM-free.
 */
import { differenceOptions as carryDifferenceOptions } from '#lib/core/kid/carry.js';

/**
 * Sticks on the table: bundles, loose sticks (crossed-out ones included),
 * how many are crossed out and how many are still to take away.
 * @typedef {{ tens: number, ones: number, taken: number, left: number }} Table
 */

/**
 * The table of `a − b` after `taken` sticks went away, with one bundle
 * untied or not.
 * @param {number} a
 * @param {number} b
 * @param {boolean} untied
 * @param {number} taken
 * @returns {Table}
 */
export function table(a, b, untied, taken) {
  return {
    tens: Math.floor(a / 10) - (untied ? 1 : 0),
    ones: (a % 10) + (untied ? 10 : 0),
    taken,
    left: b - taken,
  };
}

/**
 * Whether one more loose stick can go: some are still to take away and an
 * uncrossed loose stick is there.
 * @param {Table} t
 */
export function canTake(t) {
  return t.left > 0 && t.taken < t.ones;
}

/**
 * What the table says now, read aloud.
 * @param {number} a
 * @param {number} b
 * @param {boolean} untied
 * @param {number} taken
 */
export function tableMessage(a, b, untied, taken) {
  const t = table(a, b, untied, taken);
  const ta = Math.floor(a / 10);
  const ua = a % 10;
  if (t.left === 0) {
    const rest = t.ones - t.taken;
    return `Xong! Còn ${t.tens} chục và ${rest} que rời, tức là ${t.tens * 10 + rest} que tính.`;
  }
  if (!untied) {
    if (taken === 0) {
      return `Có ${a} que tính: ${ta} bó chục và ${ua} que rời. Cần bớt ${b} que. ${ua} que rời không đủ để bớt ${b} que!`;
    }
    if (taken < ua) return `Đã bớt ${taken} que. Còn phải bớt ${t.left} que nữa.`;
    return `Hết que rời rồi! Còn phải bớt ${t.left} que. Em tháo 1 bó chục thành 10 que rời nhé.`;
  }
  return `Tháo 1 bó: 1 chục = 10 que rời. Có ${t.tens} chục và ${t.ones - t.taken} que rời. Còn phải bớt ${t.left} que.`;
}

/**
 * Answer options for the difference: two numbers near it and the slip of
 * subtracting the small ones digit from the large one without borrowing
 * (42 − 7 written 45), in increasing order.
 * @param {() => number} rand
 * @param {number} a
 * @param {number} b
 */
export function differenceOptions(rand, a, b) {
  return carryDifferenceOptions(rand, a - b, Math.floor(a / 10) * 10 + (b - (a % 10)));
}
