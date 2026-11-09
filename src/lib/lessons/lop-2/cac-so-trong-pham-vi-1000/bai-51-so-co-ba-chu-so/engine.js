/**
 * The place-value table of "Số có ba chữ số": blocks dropped into the trăm,
 * chục and đơn vị columns make a number, which is written and read. Pure and
 * DOM-free.
 */
import { PLACES, placesOf, readTo1000 } from '#lib/core/kid/place-value.js';

/** @typedef {import('#lib/core/kid/place-value.js').PlaceKey} PlaceKey */
/** @typedef {Record<PlaceKey, number>} Table */

/** The empty table. */
export const EMPTY = /** @type {Table} */ ({ hundreds: 0, tens: 0, ones: 0 });

/** Most blocks a column holds: ten would be one block of the next place. */
export const COLUMN_MAX = 9;

/** The numbers the child is asked to build, in order. */
export const CHALLENGES = /** @type {const} */ ([243, 205, 310, 724, 107, 560, 411]);

/**
 * @param {Table} table
 */
export const numberOf = (table) => table.hundreds * 100 + table.tens * 10 + table.ones;

/**
 * Tries to put a block in a column.
 * @param {Table} table
 * @param {PlaceKey} block
 * @param {PlaceKey} column
 * @returns {{ table: Table, refused: string }}
 */
export function drop(table, block, column) {
  const place = PLACES.find((p) => p.key === block);
  const into = PLACES.find((p) => p.key === column);
  if (!place || !into) return { table, refused: '' };
  if (block !== column) {
    return {
      table,
      refused: `Một ${place.blockName} đặt vào cột ${place.title}, không đặt vào cột ${into.title}.`,
    };
  }
  if (table[column] >= COLUMN_MAX) {
    return {
      table,
      refused: `Cột ${into.title} đã có ${COLUMN_MAX} khối. Mỗi hàng chỉ viết được một chữ số, từ 0 đến 9.`,
    };
  }
  return { table: { ...table, [column]: table[column] + 1 }, refused: '' };
}

/**
 * Takes one block out of a column.
 * @param {Table} table
 * @param {PlaceKey} column
 * @returns {Table}
 */
export function takeOut(table, column) {
  return { ...table, [column]: Math.max(0, table[column] - 1) };
}

/**
 * How the table reads now: the book's way for a number of three digits.
 * @param {Table} table
 */
export function reading(table) {
  const n = numberOf(table);
  return n === 0 ? 'Bảng chưa có khối nào.' : `${n} đọc là: ${readTo1000(n)}.`;
}

/**
 * The live line about the number asked for, naming the first column that is
 * off without giving its count.
 * @param {Table} table
 * @param {number} target
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function challengeNote(table, target) {
  const n = numberOf(table);
  if (n === target) {
    return { tone: 'ok', text: `Đúng rồi! Số ${readTo1000(target)} viết là ${target}.` };
  }
  if (n === 0) return { tone: 'info', text: 'Em kéo hoặc chạm khối để đặt vào bảng.' };
  const want = placesOf(target);
  const off = PLACES.find((p) => table[p.key] !== want[p.key]);
  if (!off) return { tone: 'info', text: 'Em xem lại nhé.' };
  const more = table[off.key] < want[off.key];
  return {
    tone: 'info',
    text: `Cột ${off.title} ${more ? 'còn thiếu khối' : 'đang thừa khối'}. Em đọc lại tên số nhé.`,
  };
}
