/**
 * The stretchy rectangle of "Diện tích hình chữ nhật, diện tích hình
 * vuông": the child drags the corner of a rectangle on a grid of 1 cm²
 * squares; the rows of squares show why the area is length × width, and a
 * square's is side × side. A challenge asks for every rectangle of a given
 * area that fits the grid. Pure and DOM-free.
 */
import { rectAreaLine, squareAreaLine } from '../_shared/figures.js';

/** Size of the grid, in squares. */
export const MAX_COLS = 9;
export const MAX_ROWS = 6;

/** The areas the challenge asks for, in cm². */
export const TARGETS = [12, 8, 18, 16, 24, 9];

/**
 * Length and width of a rectangle `cols` squares wide and `rows` high: the
 * length is the longer side.
 * @param {number} cols
 * @param {number} rows
 */
export function dimsOf(cols, rows) {
  return { length: Math.max(cols, rows), width: Math.min(cols, rows) };
}

/**
 * What the rectangle on the grid is, with its area worked out the book's way.
 * @param {number} cols
 * @param {number} rows
 */
export function areaText(cols, rows) {
  const { length, width } = dimsOf(cols, rows);
  if (length === width) {
    return `Hình vuông cạnh ${length} cm. Diện tích: ${squareAreaLine(length)}.`;
  }
  return `Hình chữ nhật dài ${length} cm, rộng ${width} cm. Có ${width} hàng, mỗi hàng ${length} ô vuông 1 cm². Diện tích: ${rectAreaLine(length, width)}.`;
}

/**
 * Every pair { length, width } with length × width = `area` whose rectangle
 * fits the grid one way or the other.
 * @param {number} area
 * @returns {Array<{ length: number, width: number }>}
 */
export function waysFor(area) {
  const out = [];
  for (let width = 1; width * width <= area; width++) {
    if (area % width !== 0) continue;
    const length = area / width;
    const fits =
      (length <= MAX_COLS && width <= MAX_ROWS) || (width <= MAX_COLS && length <= MAX_ROWS);
    if (fits) out.push({ length, width });
  }
  return out;
}

/**
 * Key of a rectangle whatever way round it lies.
 * @param {number} cols
 * @param {number} rows
 */
export function shapeKey(cols, rows) {
  const { length, width } = dimsOf(cols, rows);
  return `${length}×${width}`;
}

/**
 * The verdict on the rectangle on the grid against the target area.
 * @param {number} cols
 * @param {number} rows
 * @param {number} target
 * @returns {{ ok: boolean, text: string }}
 */
export function targetVerdict(cols, rows, target) {
  const area = cols * rows;
  const { length, width } = dimsOf(cols, rows);
  if (area === target) {
    return { ok: true, text: `Đúng rồi! ${length} × ${width} = ${area} (cm²).` };
  }
  const more = area < target ? 'Cần thêm ô vuông.' : 'Thừa ô vuông rồi.';
  return {
    ok: false,
    text: `${length} × ${width} = ${area} (cm²), chưa bằng ${target} cm². ${more}`,
  };
}
