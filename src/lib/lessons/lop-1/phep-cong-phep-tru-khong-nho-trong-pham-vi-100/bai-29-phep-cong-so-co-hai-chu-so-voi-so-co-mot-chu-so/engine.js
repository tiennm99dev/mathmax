/**
 * The stick board of "Phép cộng số có hai chữ số với số có một chữ số": the
 * child puts the loose sticks of the one-digit number, one by one, beside
 * the loose sticks of the two-digit number; the bundles of ten stay as they
 * are. Pure and DOM-free.
 */
import { sticksWords } from '../_shared/sticks-text.js';

/** The first calculation, fixed so the prerendered page and the browser agree. */
export const FIRST = { a: 41, b: 5 };

/**
 * What the board says after `moved` of the `b` new sticks are in.
 * @param {number} a The two-digit number already on the board.
 * @param {number} b The one-digit number to add.
 * @param {number} moved
 * @returns {string}
 */
export function moveMessage(a, b, moved) {
  if (moved <= 0) {
    return `Có ${a} que tính: ${sticksWords(a)}. Em chạm từng que màu xanh để thêm ${b} que vào hàng đơn vị.`;
  }
  const ones = (a % 10) + moved;
  if (moved < b) return `Hàng đơn vị đã có ${ones} que rời. Còn ${b - moved} que nữa.`;
  return `Bó chục giữ nguyên, que rời là ${ones}. Có ${sticksWords(a + b)}: ${a + b} que tính. Bây giờ em đặt tính nhé.`;
}
