/**
 * Two groups of balloons that join into one, and the addition that grows
 * token by token as they do: "3", "+", "2", "=", "5". Covers the two
 * meanings of addition in the book, gộp lại (two groups put together) and
 * thêm vào (more join a group), and the swap rule 3 + 2 = 2 + 3. Pure and
 * DOM-free.
 */
import { TOP, addText, clampInt } from '../_shared/arith.js';

/** @typedef {'gop' | 'them'} Mode */

/** Most balloons in one group. */
export const MAX_GROUP = 9;

/**
 * Keeps one group's size in 0..MAX_GROUP and the sum within 10, given the
 * other group's size.
 * @param {number} value
 * @param {number} other
 */
export function fitGroup(value, other) {
  return clampInt(value, 0, Math.min(MAX_GROUP, TOP - other));
}

/**
 * The addition as tokens in reading order.
 * @param {number} a
 * @param {number} b
 * @returns {string[]}
 */
export function tokens(a, b) {
  return [String(a), '+', String(b), '=', String(a + b)];
}

/**
 * What the child hears as each token appears.
 * @param {number} a
 * @param {number} b
 * @param {number} shown how many tokens are visible, 0 to 5
 */
export function partialText(a, b, shown) {
  const all = tokens(a, b);
  if (shown >= all.length) return addText(a, b);
  return all.slice(0, shown).join(' ');
}

/**
 * The story of the picture before the groups join.
 * @param {Mode} mode
 * @param {number} a
 * @param {number} b
 */
export function storyBefore(mode, a, b) {
  return mode === 'gop'
    ? `Bên trái có ${a} quả bóng. Bên phải có ${b} quả bóng.`
    : `Bạn nhỏ cầm ${a} quả bóng. Có ${b} quả bóng nữa đang bay đến.`;
}

/**
 * The story of the picture once the groups have joined.
 * @param {Mode} mode
 * @param {number} a
 * @param {number} b
 */
export function storyAfter(mode, a, b) {
  const c = a + b;
  return mode === 'gop'
    ? `Gộp lại có ${c} quả bóng. Ta viết ${addText(a, b)}.`
    : `Thêm ${b} quả bóng, bạn nhỏ có tất cả ${c} quả bóng. Ta viết ${addText(a, b)}.`;
}

/**
 * The note after swapping the two groups: the sum stays the same.
 * @param {number} a the group now on the left
 * @param {number} b the group now on the right
 */
export function swapNote(a, b) {
  if (a === b) return `Hai nhóm bằng nhau: ${addText(a, b)}. Đổi chỗ vẫn là phép tính đó.`;
  return `${addText(b, a)} và ${addText(a, b)}. Đổi chỗ hai số, kết quả vẫn là ${a + b}.`;
}
