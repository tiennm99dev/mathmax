/**
 * The six-column place-value table of six-digit numbers: trăm nghìn, chục
 * nghìn, nghìn, trăm, chục, đơn vị. The child hears a number read aloud and
 * puts a digit card into every column; the table then writes, reads and
 * splits the number. A counter adds 100 000 at a time up to 1 000 000.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { PLACE_NAMES, placeTitle, readBig, sumText } from '../_shared/big-numbers.js';

/** One digit per column, or null while the column is empty. @typedef {(number | null)[]} Slots */

/** The column titles from the left. */
export const COLUMNS = [5, 4, 3, 2, 1, 0].map(placeTitle);

/** The empty table. */
export const EMPTY = /** @type {Slots} */ ([null, null, null, null, null, null]);

/** The numbers the child is asked to build, in order. */
export const CHALLENGES = /** @type {const} */ ([
  432516, 411100, 106100, 882936, 100001, 750000, 300754, 165500,
]);

/**
 * Puts a digit card into a column; a card already there is replaced.
 * @param {Slots} slots
 * @param {number} column 0 (trăm nghìn) to 5 (đơn vị)
 * @param {number} digit
 * @returns {Slots}
 */
export function place(slots, column, digit) {
  if (column < 0 || column > 5 || !Number.isInteger(digit) || digit < 0 || digit > 9) return slots;
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
 * The six-digit number the table holds, or null while a column is empty or
 * the first column holds 0.
 * @param {Slots} slots
 */
export function numberOf(slots) {
  if (slots.some((d) => d === null) || slots[0] === 0) return null;
  return slots.reduce((n, d) => /** @type {number} */ (n) * 10 + (d ?? 0), 0);
}

/**
 * The digits of a six-digit number, from the left.
 * @param {number} n
 */
export const columnsOf = (n) => [5, 4, 3, 2, 1, 0].map((e) => Math.floor(n / 10 ** e) % 10);

/**
 * How the table reads now.
 * @param {Slots} slots
 */
export function reading(slots) {
  const empty = slots.filter((d) => d === null).length;
  if (empty === 6) return 'Bảng chưa có thẻ nào.';
  if (empty > 0) return `Còn ${empty} cột chưa có thẻ.`;
  const n = numberOf(slots);
  if (n === null) return 'Số có sáu chữ số thì chữ số hàng trăm nghìn phải khác 0.';
  return `${fmt(n)} đọc là: ${readBig(n)}.`;
}

/**
 * The sum of places of the number in the full table, or '' while it is not
 * a six-digit number.
 * @param {Slots} slots
 */
export function sumLine(slots) {
  const n = numberOf(slots);
  return n === null ? '' : sumText(n);
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
    return { tone: 'ok', text: `Đúng rồi! Số ${readBig(target)} viết là ${fmt(target)}.` };
  }
  if (slots.every((d) => d === null)) {
    return { tone: 'info', text: 'Em chạm một thẻ chữ số rồi chạm một cột.' };
  }
  const off = slots.findIndex((d, i) => d !== null && d !== want[i]);
  if (off >= 0) {
    return {
      tone: 'info',
      text: `Thẻ ở cột ${PLACE_NAMES[5 - off]} chưa đúng. Em nghe lại tên số nhé.`,
    };
  }
  return { tone: 'info', text: 'Các thẻ đã đặt đều đúng. Em đặt tiếp vào cột còn trống.' };
}

/**
 * The counter of hundred thousands: after `k` taps (1 to 10) it shows
 * k × 100 000, and the tenth tap makes one million.
 * @param {number} k
 * @returns {{ value: number, text: string }}
 */
export function hundredThousands(k) {
  const value = k * 100000;
  if (k === 10) {
    return { value, text: `10 trăm nghìn là 1 triệu. Viết là ${fmt(value)}, đọc là: một triệu.` };
  }
  return { value, text: `${k} trăm nghìn. Viết là ${fmt(value)}, đọc là: ${readBig(value)}.` };
}
