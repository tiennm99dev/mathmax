/**
 * The ant of "Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình
 * vuông": an ant crawls round a shape one side at a time and the lengths it
 * covers add up to the perimeter. For a rectangle and a square the widget
 * also shows the book's quick rule, (length + width) × 2 and side × 4.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import {
  QUADS,
  TRIANGLES,
  perimeter,
  rectCorners,
  rectPerimeterLine,
  sidesOf,
  squarePerimeterLine,
  sumLine,
} from '../_shared/figures.js';

/** @typedef {'tam-giac' | 'tu-giac' | 'chu-nhat' | 'vuong'} ShapeKind */
/** @typedef {{ x: number, y: number }} Point */

export { QUADS, TRIANGLES };

/** The unit every side of the widget is measured in. */
export const UNIT = 'cm';

/** What each shape is called, with its corner letters. */
export const SHAPES = /** @type {const} */ ({
  'tam-giac': { name: 'hình tam giác', letters: ['A', 'B', 'C'] },
  'tu-giac': { name: 'hình tứ giác', letters: ['M', 'N', 'P', 'Q'] },
  'chu-nhat': { name: 'hình chữ nhật', letters: ['A', 'B', 'C', 'D'] },
  vuong: { name: 'hình vuông', letters: ['A', 'B', 'C', 'D'] },
});

/** Lengths the rectangle and square steppers reach, in cm. */
export const MIN_SIDE = 1;
export const MAX_SIDE = 9;

/**
 * The corners of the shape on screen.
 * @param {ShapeKind} kind
 * @param {{ preset: number, length: number, width: number, side: number }} state
 * @returns {Point[]}
 */
export function cornersOf(kind, { preset, length, width, side }) {
  if (kind === 'tam-giac') return TRIANGLES[preset % TRIANGLES.length];
  if (kind === 'tu-giac') return QUADS[preset % QUADS.length];
  if (kind === 'chu-nhat') return rectCorners(length, width);
  return rectCorners(side, side);
}

/**
 * Whole side lengths of a polygon whose sides are whole.
 * @param {readonly Point[]} pts
 */
export function wholeSides(pts) {
  return sidesOf(pts).map((s) => Math.round(s));
}

/**
 * The name of side i, such as "AB".
 * @param {readonly string[]} letters
 * @param {number} i
 */
export function sideName(letters, i) {
  return `${letters[i]}${letters[(i + 1) % letters.length]}`;
}

/**
 * Where the ant is: `walked` whole sides done and `t` (0 to 1) of the next.
 * @param {readonly Point[]} pts
 * @param {number} walked
 * @param {number} t
 * @returns {Point}
 */
export function antAt(pts, walked, t) {
  const n = pts.length;
  if (walked >= n) return pts[0];
  const p = pts[walked];
  const q = pts[(walked + 1) % n];
  return { x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t };
}

/**
 * What the ant has done so far, for the live line.
 * @param {ShapeKind} kind
 * @param {readonly number[]} sides
 * @param {number} walked
 */
export function walkText(kind, sides, walked) {
  const { name, letters } = SHAPES[kind];
  const figure = `${name} ${letters.join('')}`;
  if (walked <= 0) {
    return `Kiến đứng ở đỉnh ${letters[0]}. Em bấm "Bò tiếp" để kiến bò cạnh ${sideName(letters, 0)}.`;
  }
  if (walked >= sides.length) {
    return `Kiến bò hết một vòng: ${sumLine(sides, UNIT)}. Chu vi ${figure} là ${fmt(perimeter(sides))} ${UNIT}.`;
  }
  const done = sides.slice(0, walked);
  const sum = walked === 1 ? `${fmt(done[0])} ${UNIT}` : `${sumLine(done, UNIT)}`;
  return `Kiến đã bò ${walked} cạnh: ${sum}. Còn ${sides.length - walked} cạnh nữa.`;
}

/**
 * The quick rule for a rectangle or a square, once the ant is round.
 * @param {ShapeKind} kind
 * @param {{ length: number, width: number, side: number }} size
 * @returns {string | null}
 */
export function shortcutText(kind, { length, width, side }) {
  if (kind === 'chu-nhat') {
    return `Cách nhanh: chiều dài cộng chiều rộng rồi nhân với 2: ${rectPerimeterLine(length, width, UNIT)}.`;
  }
  if (kind === 'vuong') {
    return `Cách nhanh: độ dài một cạnh nhân với 4: ${squarePerimeterLine(side, UNIT)}.`;
  }
  return null;
}

/**
 * A new width that keeps the rectangle longer than it is wide.
 * @param {number} length
 * @param {number} width
 */
export function fitWidth(length, width) {
  return Math.max(MIN_SIDE, Math.min(width, length - 1));
}
