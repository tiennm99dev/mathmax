/**
 * Perimeter and area of the plane shapes of grade 3 (triangle,
 * quadrilateral, rectangle, square), the sentences the book writes for them,
 * and the drawing helpers the chapter's widgets and quiz pictures share: a
 * polygon fitted into a board with a label beside each side, and a shape made
 * of unit squares. Pure and DOM-free.
 */
import { dist, midpoint } from '#lib/geom-engine/plane.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} Point */

/**
 * Triangles with whole sides, corners in units on screen (y grows down).
 * @type {ReadonlyArray<Point[]>}
 */
export const TRIANGLES = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 3 },
    { x: 4, y: 3 },
  ],
  [
    { x: 3, y: 0 },
    { x: 6, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 4, y: 0 },
    { x: 8, y: 3 },
    { x: 0, y: 3 },
  ],
];

/**
 * Quadrilaterals with whole sides.
 * @type {ReadonlyArray<Point[]>}
 */
export const QUADS = [
  [
    { x: 3, y: 0 },
    { x: 6, y: 0 },
    { x: 9, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 7, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 0, y: 0 },
    { x: 4, y: 3 },
    { x: 4, y: 7 },
    { x: 0, y: 4 },
  ],
];

/**
 * The perimeter: the sum of the sides.
 * @param {readonly number[]} sides
 */
export function perimeter(sides) {
  return sides.reduce((sum, s) => sum + s, 0);
}

/**
 * The perimeter of a rectangle: (length + width) × 2.
 * @param {number} length
 * @param {number} width
 */
export const rectPerimeter = (length, width) => (length + width) * 2;

/**
 * The perimeter of a square: side × 4.
 * @param {number} side
 */
export const squarePerimeter = (side) => side * 4;

/**
 * The area of a rectangle: length × width.
 * @param {number} length
 * @param {number} width
 */
export const rectArea = (length, width) => length * width;

/**
 * The area of a square: side × side.
 * @param {number} side
 */
export const squareArea = (side) => side * side;

/**
 * The book's line for adding the sides: "3 + 4 + 5 = 12 (cm)".
 * @param {readonly number[]} sides
 * @param {string} unit
 */
export function sumLine(sides, unit) {
  return `${sides.map(fmt).join(' + ')} = ${fmt(perimeter(sides))} (${unit})`;
}

/**
 * "(5 + 3) × 2 = 16 (cm)".
 * @param {number} length
 * @param {number} width
 * @param {string} unit
 */
export function rectPerimeterLine(length, width, unit) {
  return `(${fmt(length)} + ${fmt(width)}) × 2 = ${fmt(rectPerimeter(length, width))} (${unit})`;
}

/**
 * "4 × 4 = 16 (cm)".
 * @param {number} side
 * @param {string} unit
 */
export function squarePerimeterLine(side, unit) {
  return `${fmt(side)} × 4 = ${fmt(squarePerimeter(side))} (${unit})`;
}

/**
 * "5 × 3 = 15 (cm²)".
 * @param {number} length
 * @param {number} width
 */
export function rectAreaLine(length, width) {
  return `${fmt(length)} × ${fmt(width)} = ${fmt(rectArea(length, width))} (cm²)`;
}

/**
 * "3 × 3 = 9 (cm²)".
 * @param {number} side
 */
export function squareAreaLine(side) {
  return `${fmt(side)} × ${fmt(side)} = ${fmt(squareArea(side))} (cm²)`;
}

/**
 * The corners of a rectangle `length` wide and `width` high, from the top
 * left, clockwise on screen.
 * @param {number} length
 * @param {number} width
 * @returns {Point[]}
 */
export function rectCorners(length, width) {
  return [
    { x: 0, y: 0 },
    { x: length, y: 0 },
    { x: length, y: width },
    { x: 0, y: width },
  ];
}

/**
 * The side lengths of a polygon, side i from corner i to corner i + 1.
 * @param {readonly Point[]} pts
 */
export function sidesOf(pts) {
  return pts.map((p, i) => dist(p, pts[(i + 1) % pts.length]));
}

/**
 * Fits a polygon given in units into a board `w` × `h` with a margin,
 * at most `maxScale` pixels a unit, centred.
 * @param {readonly Point[]} pts
 * @param {number} w
 * @param {number} h
 * @param {number} margin
 * @param {number} [maxScale]
 * @returns {{ scale: number, toBoard: (p: Point) => Point }}
 */
export function fitBoard(pts, w, h, margin, maxScale = 40) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const spanX = Math.max(...xs) - minX || 1;
  const spanY = Math.max(...ys) - minY || 1;
  const scale = Math.min(maxScale, (w - 2 * margin) / spanX, (h - 2 * margin) / spanY);
  const offX = (w - spanX * scale) / 2;
  const offY = (h - spanY * scale) / 2;
  return {
    scale,
    toBoard: (p) => ({ x: offX + (p.x - minX) * scale, y: offY + (p.y - minY) * scale }),
  };
}

/**
 * Where the label of side i goes: off the middle of the side, `gap` away,
 * on the side away from the centre of the polygon.
 * @param {readonly Point[]} pts corners on the board
 * @param {number} i
 * @param {number} gap
 * @returns {Point}
 */
export function sideLabelSpot(pts, i, gap) {
  const p = pts[i];
  const q = pts[(i + 1) % pts.length];
  const m = midpoint(p, q);
  const len = dist(p, q) || 1;
  let nx = -(q.y - p.y) / len;
  let ny = (q.x - p.x) / len;
  const c = {
    x: pts.reduce((s, v) => s + v.x, 0) / pts.length,
    y: pts.reduce((s, v) => s + v.y, 0) / pts.length,
  };
  if (nx * (m.x - c.x) + ny * (m.y - c.y) < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: m.x + nx * gap, y: m.y + ny * gap };
}

/**
 * The squares of a shape drawn as rows of text, `X` for a square and `.`
 * for an empty place.
 * @param {readonly string[]} rows
 * @returns {Array<{ row: number, col: number }>}
 */
export function cellsOf(rows) {
  return rows.flatMap((line, row) =>
    [...line].flatMap((ch, col) => (ch === 'X' ? [{ row, col }] : [])),
  );
}

/**
 * How many squares a shape has.
 * @param {readonly string[]} rows
 */
export const cellCount = (rows) => cellsOf(rows).length;

/**
 * The shape read row by row for a screen reader, without the total, so the
 * child still counts: "Hàng 1: 2 ô. Hàng 2: 3 ô."
 * @param {readonly string[]} rows
 */
export function rowsText(rows) {
  return rows
    .map((line, i) => {
      const n = [...line].filter((ch) => ch === 'X').length;
      return `Hàng ${i + 1}: ${n} ô`;
    })
    .join('. ');
}
