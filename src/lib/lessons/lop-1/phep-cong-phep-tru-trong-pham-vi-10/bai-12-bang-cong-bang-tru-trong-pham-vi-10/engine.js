/**
 * The addition and subtraction tables within 10 as grids. In the addition
 * table, row a and column b meet at a + b (only while a + b ≤ 10); in the
 * subtraction table, row c and column b meet at c − b (only while b < c, so
 * every result is at least 1, as in the book's table). Each cell knows the
 * facts tied to it, which shows how addition and subtraction undo each other.
 * Pure and DOM-free.
 */
import { TOP, addText, relatedSubtractions, subText } from '../_shared/arith.js';

/** @typedef {'cong' | 'tru'} Mode */

/** Column numbers of both tables: the second number of each fact. */
export const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Row numbers: the first number of each fact.
 * @param {Mode} mode
 */
export function rowsOf(mode) {
  return mode === 'cong' ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
}

/**
 * Whether row r and column c meet at a cell of the table.
 * @param {Mode} mode
 * @param {number} r
 * @param {number} c
 */
export function hasCell(mode, r, c) {
  if (!rowsOf(mode).includes(r) || !COLS.includes(c)) return false;
  return mode === 'cong' ? r + c <= TOP : c < r;
}

/**
 * The result in the cell.
 * @param {Mode} mode
 * @param {number} r
 * @param {number} c
 */
export function cellValue(mode, r, c) {
  return mode === 'cong' ? r + c : r - c;
}

/**
 * The fact the cell stands for, such as "3 + 2 = 5" or "5 − 2 = 3".
 * @param {Mode} mode
 * @param {number} r
 * @param {number} c
 */
export function cellFact(mode, r, c) {
  return mode === 'cong' ? addText(r, c) : subText(r, c);
}

/**
 * The facts tied to a cell: for an addition, its swap and the two
 * subtractions that undo it; for a subtraction, the addition that checks it.
 * @param {Mode} mode
 * @param {number} r
 * @param {number} c
 */
export function relatedText(mode, r, c) {
  if (mode === 'cong') {
    const swap = r === c ? '' : `${addText(c, r)}. `;
    return `${swap}Từ ${addText(r, c)} ta có ${relatedSubtractions(r, c).join(' và ')}.`;
  }
  const d = r - c;
  return `Thử lại bằng phép cộng: ${addText(d, c)}. Ta cũng có ${subText(r, d)}.`;
}

/**
 * Every cell of a table, row by row.
 * @param {Mode} mode
 * @returns {Array<[number, number]>}
 */
export function cellsOf(mode) {
  /** @type {Array<[number, number]>} */
  const all = [];
  for (const r of rowsOf(mode)) for (const c of COLS) if (hasCell(mode, r, c)) all.push([r, c]);
  return all;
}

/**
 * Cells whose result equals `target`.
 * @param {Mode} mode
 * @param {number} target
 */
export function cellsWith(mode, target) {
  return cellsOf(mode).filter(([r, c]) => cellValue(mode, r, c) === target);
}

/** Results the "tô sáng" buttons offer. */
export function targetsOf(/** @type {Mode} */ mode) {
  return mode === 'cong' ? [2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

/**
 * The cell an arrow key leads to from (r, c); the same cell at an edge.
 * Moving up or down lands on the nearest cell of that row.
 * @param {Mode} mode
 * @param {number} r
 * @param {number} c
 * @param {string} key
 * @returns {[number, number]}
 */
export function moveCell(mode, r, c, key) {
  if (key === 'ArrowRight') return hasCell(mode, r, c + 1) ? [r, c + 1] : [r, c];
  if (key === 'ArrowLeft') return hasCell(mode, r, c - 1) ? [r, c - 1] : [r, c];
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const nr = r + (key === 'ArrowUp' ? -1 : 1);
    const row = COLS.filter((col) => hasCell(mode, nr, col));
    if (row.length === 0) return [r, c];
    const nc = row.reduce((best, col) => (Math.abs(col - c) < Math.abs(best - c) ? col : best));
    return [nr, nc];
  }
  return [r, c];
}

/**
 * The line read after a target is chosen: how many cells hold that result.
 * @param {Mode} mode
 * @param {number} target
 */
export function targetText(mode, target) {
  const facts = cellsWith(mode, target).map(([r, c]) => cellFact(mode, r, c));
  return `Có ${facts.length} ô bằng ${target}: ${facts.join('; ')}.`;
}
