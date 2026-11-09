/**
 * The place-value table of "Các số có năm chữ số. Số 100 000": five columns
 * (chục nghìn, nghìn, trăm, chục, đơn vị) that each take one digit card. The
 * child hears a number read aloud and puts the right digit into every
 * column; the table then writes and reads the number it holds. Pure and
 * DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { PLACES5, digitsOf5, readTo100000, sumText5 } from '../_shared/numbers-to-100000.js';

/** One digit per column, or null while the column is empty. @typedef {(number | null)[]} Slots */

/** The empty table. */
export const EMPTY = /** @type {Slots} */ ([null, null, null, null, null]);

/** The digit cards of the tray. */
export const DIGITS = /** @type {const} */ ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** The numbers the child is asked to build, in order. */
export const CHALLENGES = /** @type {const} */ ([
  42316, 24105, 70040, 31005, 15000, 89207, 60508, 99999,
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
export function clear(slots, column) {
  return slots.map((d, i) => (i === column ? null : d));
}

/** @param {Slots} slots */
export const isFull = (slots) => slots.every((d) => d !== null);

/**
 * The number the table holds, or null while a column is empty.
 * @param {Slots} slots
 */
export function numberOf(slots) {
  if (!isFull(slots)) return null;
  return slots.reduce((n, d) => n * 10 + (d ?? 0), 0);
}

/**
 * The digits of a number of five digits as table columns.
 * @param {number} n
 * @returns {number[]}
 */
export function columnsOf(n) {
  const d = digitsOf5(n);
  return PLACES5.map((p) => d[p.key]);
}

/**
 * How the table reads now.
 * @param {Slots} slots
 */
export function reading(slots) {
  const empty = slots.filter((d) => d === null).length;
  if (empty === 5) return 'Bảng chưa có thẻ nào.';
  if (empty > 0) return `Còn ${empty} cột chưa có thẻ.`;
  if (slots[0] === 0) return 'Số có năm chữ số thì chữ số hàng chục nghìn phải khác 0.';
  const n = /** @type {number} */ (numberOf(slots));
  return `${fmt(n)} đọc là: ${readTo100000(n)}.`;
}

/**
 * The sum of places of the number the table holds, or '' when it is not a
 * number of five digits yet.
 * @param {Slots} slots
 */
export function sumLine(slots) {
  const n = numberOf(slots);
  return n !== null && n >= 10000 ? sumText5(n) : '';
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
    return {
      tone: 'info',
      text: `Thẻ ở cột ${PLACES5[off].title} chưa đúng. Em nghe lại tên số nhé.`,
    };
  }
  return { tone: 'info', text: 'Các thẻ đã đặt đều đúng. Em đặt tiếp vào cột còn trống.' };
}
