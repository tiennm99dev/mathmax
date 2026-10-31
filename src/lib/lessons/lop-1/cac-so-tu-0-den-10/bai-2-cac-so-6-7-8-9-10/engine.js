/**
 * Ten-frame logic for the numbers 6 to 10: pure and DOM-free. The frame is
 * ten cells; a tap fills or empties one cell, and the number shown is how many
 * cells hold a dot.
 */
import { wordOf } from '../_shared/number-words.js';

/** Cells in a ten-frame. */
export const CELLS = 10;

/** Numbers this lesson teaches; "Tạo số" rounds pick from them. */
export const NEW_NUMBERS = [6, 7, 8, 9, 10];

/** An empty frame. */
export function emptyFrame() {
  return Array.from({ length: CELLS }, () => false);
}

/**
 * The frame after a tap on one cell: an empty cell gets a dot, a full one
 * loses it.
 * @param {readonly boolean[]} frame
 * @param {number} cell
 * @returns {boolean[]}
 */
export function toggleCell(frame, cell) {
  return frame.map((full, i) => (i === cell ? !full : full));
}

/**
 * How many dots the frame holds.
 * @param {readonly boolean[]} frame
 */
export function countDots(frame) {
  return frame.filter(Boolean).length;
}

/**
 * Feedback for free play: the number and how it is read.
 * @param {number} count
 */
export function freeMessage(count) {
  if (count === 0) return 'Khung chưa có chấm nào: số 0. Em chạm vào ô để thêm chấm.';
  if (count === CELLS)
    return 'Đủ cả 10 ô: số 10, đọc là "mười". Số 10 viết bằng hai chữ số 1 và 0.';
  return `Có ${count} chấm: số ${count}, đọc là "${wordOf(count)}". Thêm 1 chấm nữa là ${count + 1}.`;
}

/**
 * Feedback for a "Tạo số" round: how far the frame is from the target.
 * @param {number} count
 * @param {number} target
 */
export function targetMessage(count, target) {
  if (count === target)
    return `Đúng rồi! Khung có ${target} chấm, số ${target} đọc là "${wordOf(target)}".`;
  const diff = Math.abs(target - count);
  return count < target
    ? `Khung có ${count} chấm. Em thêm ${diff} chấm nữa nhé.`
    : `Khung có ${count} chấm. Em bớt ${diff} chấm nhé.`;
}
