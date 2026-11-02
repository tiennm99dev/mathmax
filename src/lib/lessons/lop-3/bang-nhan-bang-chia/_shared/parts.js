/**
 * "Một phần mấy": a shape cut into parts with one part coloured, how the book
 * writes and reads it, and the drawing of each part. Sizes are relative, so
 * equal numbers make equal parts. Pure and DOM-free.
 */
import { polar, sectorPath } from '#lib/core/visuals/svg-math.js';

/**
 * `shaded` is the index of the coloured part, or -1 when none is coloured.
 * @typedef {{ shape: 'circle' | 'bar' | 'grid', sizes: number[], shaded: number }} Figure
 */

/** The side of the square every figure is drawn in. */
export const BOX = 100;

/** How many parts a shape can be cut into. */
export const MIN_PARTS = 2;
export const MAX_PARTS = 9;

const WORDS = /** @type {const} */ ({
  2: 'hai',
  3: 'ba',
  4: 'tư',
  5: 'năm',
  6: 'sáu',
  7: 'bảy',
  8: 'tám',
  9: 'chín',
});

/** Columns and rows of the shapes the book cuts as a grid. */
const GRIDS = /** @type {Record<number, [number, number]>} */ ({
  4: [2, 2],
  6: [3, 2],
  8: [4, 2],
  9: [3, 3],
});

/**
 * "1/4"
 * @param {number} n
 */
export const partText = (n) => `1/${n}`;

/**
 * "một phần tư", the book's reading of 1/n.
 * @param {number} n 2-9
 */
export function partWords(n) {
  return `một phần ${WORDS[/** @type {keyof typeof WORDS} */ (n)]}`;
}

/**
 * The shapes that can be cut into `n` equal parts.
 * @param {number} n
 * @returns {Figure['shape'][]}
 */
export const shapesFor = (n) => (GRIDS[n] ? ['circle', 'bar', 'grid'] : ['circle', 'bar']);

/**
 * A shape cut into `n` equal parts.
 * @param {Figure['shape']} shape
 * @param {number} n
 * @param {number} [shaded]
 * @returns {Figure}
 */
export function equalFigure(shape, n, shaded = 0) {
  return { shape, sizes: Array.from({ length: n }, () => 1), shaded };
}

/**
 * Part sizes that are visibly not equal, in one of three patterns.
 * @param {number} n
 * @param {number} pattern 0-2
 */
export function unevenSizes(n, pattern) {
  return Array.from({ length: n }, (_, i) => {
    if (pattern === 0) return i === 0 ? 2 : 1;
    if (pattern === 1) return i === n - 1 ? 3 : 1;
    return i % 2 === 0 ? 1 : 2;
  });
}

/**
 * Whether every part of a figure has the same size.
 * @param {Figure} figure
 */
export const isEqual = (figure) => figure.sizes.every((s) => s === figure.sizes[0]);

/**
 * Whether the coloured part of a figure really is 1/n of it.
 * @param {Figure} figure
 * @param {number} n
 */
export function isOneOver(figure, n) {
  return isEqual(figure) && figure.sizes.length === n && figure.shaded >= 0;
}

/**
 * The start, end and middle angle of each slice of a circle.
 * @param {number[]} sizes
 */
export function sliceAngles(sizes) {
  const total = sizes.reduce((sum, s) => sum + s, 0);
  let at = 0;
  return sizes.map((s) => {
    const start = at;
    at += (s / total) * 360;
    return { start, end: at, mid: (start + at) / 2 };
  });
}

/**
 * The SVG path of a rectangle.
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
const rect = (x, y, w, h) => `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;

/**
 * The path of a slice of a circle filling the box.
 * @param {{ start: number, end: number }} slice
 * @param {number} [r]
 */
export const slicePath = (slice, r = BOX / 2 - 2) =>
  sectorPath(BOX / 2, BOX / 2, r, slice.start, slice.end);

/**
 * A point in the middle of a slice, for what is drawn on it.
 * @param {number} angle
 * @param {number} r
 */
export const slicePoint = (angle, r) => polar(BOX / 2, BOX / 2, r, angle);

/**
 * The SVG path of each part of a figure.
 * @param {Figure} figure
 * @returns {string[]}
 */
export function partPaths({ shape, sizes }) {
  if (shape === 'circle') return sliceAngles(sizes).map((slice) => slicePath(slice));
  if (shape === 'grid') {
    const [cols, rows] = GRIDS[sizes.length];
    const side = (BOX - 4) / cols;
    const top = (BOX - side * rows) / 2;
    return sizes.map((_, i) =>
      rect(2 + (i % cols) * side, top + Math.floor(i / cols) * side, side, side),
    );
  }
  const total = sizes.reduce((sum, s) => sum + s, 0);
  let x = 2;
  return sizes.map((s) => {
    const width = (s / total) * (BOX - 4);
    const path = rect(x, 25, width, 50);
    x += width;
    return path;
  });
}

/**
 * The name of a figure's shape; a grid with as many rows as columns is a square.
 * @param {Figure} figure
 */
function shapeName({ shape, sizes }) {
  if (shape === 'circle') return 'Hình tròn';
  if (shape === 'bar') return 'Hình chữ nhật';
  const [cols, rows] = GRIDS[sizes.length];
  return cols === rows ? 'Hình vuông' : 'Hình chữ nhật';
}

/**
 * What a screen reader hears for a figure. It names each part once, so the
 * child counts them as a sighted child does, and says which are bigger, which a
 * sighted child sees.
 * @param {Figure} figure
 */
export function figureLabel(figure) {
  const smallest = Math.min(...figure.sizes);
  const equal = isEqual(figure);
  const parts = figure.sizes.map((size, i) => {
    const coloured = i === figure.shaded;
    if (equal) return coloured ? 'phần tô màu' : 'phần trắng';
    return `phần ${size > smallest ? 'to' : 'nhỏ'}${coloured ? ' tô màu' : ''}`;
  });
  const kind = equal ? 'các phần bằng nhau' : 'các phần không bằng nhau';
  return `${shapeName(figure)}, ${kind}: ${parts.join(', ')}.`;
}
