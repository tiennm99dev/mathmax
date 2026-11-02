/**
 * The two games of "Giới thiệu tiền Việt Nam": a shop where a child pays the
 * exact price with banknotes, and a counter that swaps one note for smaller
 * notes of the same value. Pure and DOM-free.
 */
import { fewestNotes, notesText, sumNotes } from '../_shared/money.js';

/** The most notes on the tray at once. */
export const MAX_TRAY = 10;

/**
 * A toy on the shop shelf, its price a whole number of hundreds up to 1000.
 * @typedef {{ picture: import('#lib/core/kid/pictures/index.js').PictureName, name: string, price: number }} Good
 */

/** @type {readonly Good[]} */
export const GOODS = [
  { picture: 'flower', name: 'bông hoa giấy', price: 500 },
  { picture: 'star', name: 'ngôi sao giấy', price: 300 },
  { picture: 'pencil', name: 'cái bút chì', price: 1000 },
  { picture: 'balloon', name: 'quả bóng bay', price: 700 },
  { picture: 'ball', name: 'quả bóng nhỏ', price: 900 },
  { picture: 'butterfly', name: 'con bướm giấy', price: 200 },
  { picture: 'fish', name: 'con cá đồ chơi', price: 800 },
  { picture: 'rabbit', name: 'con thỏ đồ chơi', price: 600 },
  { picture: 'cat', name: 'con mèo đồ chơi', price: 400 },
];

/**
 * One note to swap for notes of a smaller value.
 * @typedef {{ big: import('../_shared/money.js').Note, small: import('../_shared/money.js').Note }} Swap
 */

/** @type {readonly Swap[]} */
export const SWAPS = [
  { big: 200, small: 100 },
  { big: 500, small: 100 },
  { big: 1000, small: 500 },
  { big: 1000, small: 200 },
  { big: 1000, small: 100 },
];

/**
 * Feedback on the money on the tray; `done` when it is the exact price.
 * @param {Good} good
 * @param {readonly number[]} paid
 */
export function payFeedback(good, paid) {
  const sum = sumNotes(paid);
  if (paid.length === 0) return { done: false, text: `Em đặt tiền cho đủ ${good.price} đồng nhé.` };
  if (sum < good.price) {
    return {
      done: false,
      text: `Em đã đặt ${sum} đồng. Còn thiếu ${good.price - sum} đồng.`,
    };
  }
  if (sum > good.price) {
    return {
      done: false,
      text: `Em đã đặt ${sum} đồng, nhiều hơn giá ${sum - good.price} đồng. Chạm vào tờ tiền để bỏ bớt.`,
    };
  }
  const best = fewestNotes(good.price) ?? [];
  const tail =
    paid.length === best.length
      ? ' Em dùng ít tờ tiền nhất, giỏi quá!'
      : ` Trả ít tờ hơn thì dùng: ${notesText(best)}.`;
  return { done: true, text: `Đúng giá ${good.price} đồng!${tail}` };
}

/**
 * How many small notes make one big note.
 * @param {Swap} swap
 */
export function swapCount(swap) {
  return swap.big / swap.small;
}

/**
 * Feedback on the small notes counted so far; `done` when they make the big one.
 * @param {Swap} swap
 * @param {number} count
 */
export function swapFeedback(swap, count) {
  const sum = count * swap.small;
  if (sum === swap.big) {
    return {
      done: true,
      text: `Đúng rồi! ${count} tờ ${swap.small} đồng đổi được 1 tờ ${swap.big} đồng.`,
    };
  }
  if (count === 0) {
    return { done: false, text: `Chạm vào tờ ${swap.small} đồng để đếm cho đủ ${swap.big} đồng.` };
  }
  return { done: false, text: `Có ${count} tờ: ${sum} đồng. Cần đủ ${swap.big} đồng.` };
}
