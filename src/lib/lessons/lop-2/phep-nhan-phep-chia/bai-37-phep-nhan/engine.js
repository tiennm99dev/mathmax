/**
 * Plates of equal groups: when every plate holds the same number, the repeated
 * addition can be written as a multiplication. Plates that differ cannot.
 */
import { mulLine } from '../_shared/times.js';

export const MIN_PLATES = 1;
export const MAX_PLATES = 5;
export const MAX_ON_PLATE = 5;

/** What each round asks the child to lay out. */
export const TASKS = /** @type {const} */ ([
  { each: 2, plates: 3, picture: 'orange' },
  { each: 5, plates: 2, picture: 'strawberry' },
  { each: 3, plates: 4, picture: 'apple' },
  { each: 4, plates: 3, picture: 'banana' },
  { each: 2, plates: 5, picture: 'orange' },
  { each: 5, plates: 3, picture: 'apple' },
]);

/**
 * Reads the plates.
 * @param {readonly number[]} plates how many things each plate holds
 */
export function readPlates(plates) {
  const total = plates.reduce((sum, n) => sum + n, 0);
  const equal = plates.every((n) => n === plates[0]);
  const hasEmpty = plates.some((n) => n === 0);
  const canMultiply = equal && !hasEmpty;
  const sum = plates.length > 1 ? `${plates.join(' + ')} = ${total}` : String(total);
  return {
    total,
    hasEmpty,
    canMultiply,
    sum,
    product: canMultiply ? mulLine(plates[0], plates.length) : null,
  };
}

/**
 * The feedback line for the plates against the round's task.
 * @param {readonly number[]} plates
 * @param {{ each: number, plates: number }} task
 * @param {string} noun what is on the plates, "quả cam"
 */
export function plateMessage(plates, task, noun) {
  const read = readPlates(plates);
  if (read.hasEmpty) return `Còn đĩa trống. Em đặt ${noun} vào đĩa nhé.`;
  if (!read.canMultiply) {
    return 'Các đĩa chưa bằng nhau nên chưa viết được phép nhân. Em thêm hoặc bớt cho bằng nhau nhé.';
  }
  const taken = `${plates[0]} được lấy ${plates.length} lần`;
  if (plates[0] === task.each && plates.length === task.plates) {
    return `Đúng rồi! ${taken}, ta có ${read.product}.`;
  }
  return `Các đĩa đã bằng nhau: ${taken}, ta có ${read.product}. Em xếp lại cho đúng đề bài nhé.`;
}
