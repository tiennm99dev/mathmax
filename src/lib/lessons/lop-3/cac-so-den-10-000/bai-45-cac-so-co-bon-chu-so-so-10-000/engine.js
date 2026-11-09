/**
 * The place-value table of "Các số có bốn chữ số. Số 10 000": blocks of
 * nghìn, trăm, chục and đơn vị make a number. A column may fill up to ten
 * blocks, and ten of them are put together into one block of the next place
 * (10 trăm = 1 nghìn), until 10 khối nghìn make 10 000. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { PLACES4, TOP, digitsOf, readTo10000 } from '../_shared/numbers-to-10000.js';

/** @typedef {import('../_shared/numbers-to-10000.js').Place4} Place4 */
/** @typedef {import('../_shared/numbers-to-10000.js').Digits} Table */

/** The empty table. */
export const EMPTY = /** @type {Table} */ ({ thousands: 0, hundreds: 0, tens: 0, ones: 0 });

/** Most blocks a column holds before they must be put together. */
export const COLUMN_MAX = 10;

/** The numbers the child is asked to build, in order. */
export const CHALLENGES = /** @type {const} */ ([2945, 5072, 6302, 8060, 3405, 4007, 10000]);

/** @param {Table} table */
export const numberOf = (table) =>
  table.thousands * 1000 + table.hundreds * 100 + table.tens * 10 + table.ones;

/** @param {Place4} key */
const placeOf = (key) => PLACES4.find((p) => p.key === key) ?? PLACES4[3];

/**
 * The place just above `key`, or null for thousands.
 * @param {Place4} key
 */
export function placeAbove(key) {
  const i = PLACES4.findIndex((p) => p.key === key);
  return i > 0 ? PLACES4[i - 1] : null;
}

/**
 * Tries to add one block to a column.
 * @param {Table} table
 * @param {Place4} key
 * @returns {{ table: Table, refused: string }}
 */
export function add(table, key) {
  const place = placeOf(key);
  if (numberOf(table) + place.value > TOP) {
    return { table, refused: `Bảng chỉ xếp đến số ${fmt(TOP)} thôi.` };
  }
  if (table[key] >= COLUMN_MAX) {
    return {
      table,
      refused: `Cột ${place.title} đã có ${COLUMN_MAX} ${place.blockName}. Em ghép chúng lại trước nhé.`,
    };
  }
  return { table: { ...table, [key]: table[key] + 1 }, refused: '' };
}

/**
 * Takes one block out of a column.
 * @param {Table} table
 * @param {Place4} key
 * @returns {Table}
 */
export function remove(table, key) {
  return { ...table, [key]: Math.max(0, table[key] - 1) };
}

/**
 * Whether the ten blocks of a column can be put together into one block of
 * the place above (not for thousands: there is no column above).
 * @param {Table} table
 * @param {Place4} key
 */
export function canMerge(table, key) {
  return table[key] === COLUMN_MAX && placeAbove(key) !== null;
}

/**
 * Puts the ten blocks of a column together into one block of the place
 * above. The number does not change.
 * @param {Table} table
 * @param {Place4} key
 * @returns {Table}
 */
export function merge(table, key) {
  const above = placeAbove(key);
  if (!canMerge(table, key) || !above) return table;
  return { ...table, [key]: 0, [above.key]: table[above.key] + 1 };
}

/**
 * The sentence for a merge button: "Ghép 10 tấm trăm thành 1 khối nghìn".
 * @param {Place4} key
 */
export function mergeText(key) {
  const above = placeAbove(key);
  return above ? `Ghép 10 ${placeOf(key).blockName} thành 1 ${above.blockName}` : '';
}

/**
 * The first column that still holds ten blocks to put together, if any.
 * @param {Table} table
 */
export function columnToMerge(table) {
  return PLACES4.find((p) => canMerge(table, p.key)) ?? null;
}

/**
 * How the table reads now. A column of ten blocks must be put together
 * first, since each place writes one digit only.
 * @param {Table} table
 */
export function reading(table) {
  const n = numberOf(table);
  if (n === 0) return 'Bảng chưa có khối nào.';
  const full = columnToMerge(table);
  if (full) {
    const above = placeAbove(full.key);
    return `10 ${full.unit} = 1 ${above?.unit}. Em ghép 10 ${full.blockName} lại thì mới viết được số.`;
  }
  if (n === TOP) return `10 nghìn là ${fmt(TOP)}, đọc là: mười nghìn.`;
  return `${fmt(n)} đọc là: ${readTo10000(n)}.`;
}

/**
 * The live line about the number asked for. It names the first column that
 * is off without giving its count.
 * @param {Table} table
 * @param {number} target
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function challengeNote(table, target) {
  const n = numberOf(table);
  const full = columnToMerge(table);
  if (n === target && !full) {
    return { tone: 'ok', text: `Đúng rồi! Số ${readTo10000(target)} viết là ${fmt(target)}.` };
  }
  if (n === 0) return { tone: 'info', text: 'Em bấm dấu + để thêm khối vào từng cột.' };
  if (full) return { tone: 'info', text: `Cột ${full.title} có 10 khối. Em ghép lại nhé.` };
  const want = digitsOf(target);
  const off = PLACES4.find((p) => table[p.key] !== want[p.key]);
  if (!off) return { tone: 'info', text: 'Em xem lại nhé.' };
  const more = table[off.key] < want[off.key];
  return {
    tone: 'info',
    text: `Cột ${off.title} ${more ? 'còn thiếu khối' : 'đang thừa khối'}. Em đọc lại tên số nhé.`,
  };
}
