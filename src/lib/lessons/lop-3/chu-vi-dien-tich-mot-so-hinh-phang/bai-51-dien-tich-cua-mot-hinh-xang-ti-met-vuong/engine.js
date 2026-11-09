/**
 * Tiling a shape with 1 cm² squares, for "Diện tích của một hình.
 * Xăng-ti-mét vuông": the child lays a square on every place of the shape;
 * once the shape is covered, the number of squares is its area in cm². Shapes
 * tiled earlier are kept, so two shapes of the same area but another form can
 * be compared. Pure and DOM-free.
 */
import { cellCount } from '../_shared/figures.js';

/**
 * The shapes to tile, as rows of text (`X` a place of the shape). Two of them
 * have the same area with another form, as in the book.
 * @type {ReadonlyArray<{ name: string, rows: string[] }>}
 */
export const SHAPES = [
  { name: 'Hình A', rows: ['XX..', 'XX..', 'XXXX'] },
  { name: 'Hình B', rows: ['XXXX', 'XXXX'] },
  { name: 'Hình C', rows: ['.X.', 'XXX', '.X.'] },
  { name: 'Hình D', rows: ['X...', 'XX..', 'XXX.'] },
  { name: 'Hình E', rows: ['XXX', 'X.X', 'XXX'] },
];

/**
 * Key of a place of the grid.
 * @param {number} row
 * @param {number} col
 */
export const placeKey = (row, col) => `${row}-${col}`;

/**
 * Whether a place belongs to the shape.
 * @param {readonly string[]} rows
 * @param {number} row
 * @param {number} col
 */
export function inShape(rows, row, col) {
  return rows[row]?.[col] === 'X';
}

/**
 * The live line while the child tiles.
 * @param {number} total squares the shape needs
 * @param {number} placed squares laid so far
 */
export function tileText(total, placed) {
  if (placed === 0) return 'Em chạm vào từng ô của hình để đặt một ô vuông 1 cm².';
  if (placed < total) return `Em đã đặt ${placed} ô vuông 1 cm². Hình chưa được lát kín.`;
  return `Hình được lát kín bằng ${total} ô vuông 1 cm². Diện tích hình là ${total} cm².`;
}

/**
 * What the shapes tiled so far show: a bigger area, or the same area with
 * another form.
 * @param {ReadonlyArray<{ name: string, area: number }>} results
 * @returns {string | null}
 */
export function compareText(results) {
  if (results.length < 2) return null;
  const last = results[results.length - 1];
  const same = results.slice(0, -1).find((r) => r.area === last.area);
  if (same) {
    return `${same.name} và ${last.name} khác hình dạng nhưng cùng gồm ${last.area} ô vuông 1 cm²: diện tích bằng nhau.`;
  }
  const prev = results[results.length - 2];
  const bigger = last.area > prev.area ? last : prev;
  const smaller = bigger === last ? prev : last;
  return `${bigger.name} (${bigger.area} cm²) có diện tích lớn hơn ${smaller.name} (${smaller.area} cm²).`;
}

/**
 * The area of a shape.
 * @param {number} index
 */
export const areaOf = (index) => cellCount(SHAPES[index].rows);
