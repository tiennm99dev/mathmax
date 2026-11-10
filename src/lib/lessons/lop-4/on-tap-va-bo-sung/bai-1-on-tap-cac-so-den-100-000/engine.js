/**
 * The place-value table of the review of numbers to 100 000: five columns
 * (chục nghìn, nghìn, trăm, chục, đơn vị) that each take one digit card. The
 * child hears a number read aloud and puts the right digit into every
 * column; the table then writes the number, reads it, splits it into its
 * places and rounds it. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { columnsOf, readTo100000, roundWhy, sumText } from '../_shared/numbers.js';

/** One digit per column, or null while the column is empty. @typedef {(number | null)[]} Slots */

/** The empty table. */
export const EMPTY = /** @type {Slots} */ ([null, null, null, null, null]);

/** The digit cards of the tray. */
export const DIGITS = /** @type {const} */ ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** The numbers the child is asked to build, in order. */
export const CHALLENGES = /** @type {const} */ ([
  36515, 61034, 20809, 42530, 50714, 94005, 86209, 12967,
]);

/**
 * Puts a digit card into a column; a card already there is replaced.
 * @param {Slots} slots
 * @param {number} column 0 (chục nghìn) to 4 (đơn vị)
 * @param {number} digit
 * @returns {Slots}
 */
export function place(slots, column, digit) {
  if (column < 0 || column > 4 || !Number.isInteger(digit) || digit < 0 || digit > 9) return slots;
  return slots.map((d, i) => (i === column ? digit : d));
}

/**
 * Takes the card out of a column.
 * @param {Slots} slots
 * @param {number} column
 * @returns {Slots}
 */
export const clear = (slots, column) => slots.map((d, i) => (i === column ? null : d));

/**
 * The number of five digits the table holds, or null while a column is
 * empty or the first column holds 0.
 * @param {Slots} slots
 */
export function numberOf(slots) {
  if (slots.some((d) => d === null) || slots[0] === 0) return null;
  return slots.reduce((n, d) => /** @type {number} */ (n) * 10 + (d ?? 0), 0);
}

/**
 * How the table reads now.
 * @param {Slots} slots
 */
export function reading(slots) {
  const empty = slots.filter((d) => d === null).length;
  if (empty === 5) return 'Bảng chưa có thẻ nào.';
  if (empty > 0) return `Còn ${empty} cột chưa có thẻ.`;
  const n = numberOf(slots);
  if (n === null) return 'Số có năm chữ số thì chữ số hàng chục nghìn phải khác 0.';
  return `${fmt(n)} đọc là: ${readTo100000(n)}.`;
}

/**
 * What the table tells about its number once it is full: the sum of places
 * and the two roundings.
 * @param {Slots} slots
 * @returns {string[]}
 */
export function facts(slots) {
  const n = numberOf(slots);
  if (n === null) return [];
  return [sumText(n), roundWhy(n, 1000), roundWhy(n, 10000)];
}

/**
 * The live line about the number asked for. It names the first column that
 * is off without giving its digit.
 * @param {Slots} slots
 * @param {number} target
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function challengeNote(slots, target) {
  const want = columnsOf(target);
  if (slots.every((d, i) => d === want[i])) {
    return { tone: 'ok', text: `Đúng rồi! Số ${readTo100000(target)} viết là ${fmt(target)}.` };
  }
  if (slots.every((d) => d === null)) {
    return { tone: 'info', text: 'Em chọn một thẻ chữ số rồi đặt vào một cột.' };
  }
  const off = slots.findIndex((d, i) => d !== null && d !== want[i]);
  if (off >= 0) {
    const names = ['Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'];
    return { tone: 'info', text: `Thẻ ở cột ${names[off]} chưa đúng. Em nghe lại tên số nhé.` };
  }
  return { tone: 'info', text: 'Các thẻ đã đặt đều đúng. Em đặt tiếp vào cột còn trống.' };
}
