/**
 * The chapter's small units: writing a measure the book's way, where the marks
 * of each measuring tool sit, and what a screen reader hears from a tool. A
 * label lets the child work out the reading from the marks; the reading itself
 * is named only once the question has ended (`settled`). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** @param {number} n */
export const mmText = (n) => `${fmt(n)} mm`;
/** @param {number} n */
export const gramText = (n) => `${fmt(n)} g`;
/** @param {number} n */
export const mlText = (n) => `${fmt(n)} ml`;
/** @param {number} n */
export const degText = (n) => `${n} °C`;

/** The zoomed ruler runs from 0 to this many centimetres. */
export const RULER_CM = 3;
/** The dial scale and the measuring cylinder end at these marks. */
export const DIAL_MAX = 1000;
export const CYLINDER_MAX = 1000;
/** The thermometer's scale, in degrees. */
export const COLD_END = 0;
export const HOT_END = 50;

/**
 * Number options in increasing order, the right one among distinct slips.
 * @param {(n: number) => string} format
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function sortedOptions(format, right, slips) {
  const wrong = [...new Set(slips)].filter((v) => v !== right && v >= 0).slice(0, 3);
  const values = [right, ...wrong].sort((a, b) => a - b);
  return { options: values.map(format), answer: values.indexOf(right) };
}

/**
 * The needle's angle on the dial, in degrees clockwise from straight up: 0 g
 * sits low on the left and 1 000 g low on the right.
 * @param {number} g
 */
export function dialAngle(g) {
  return -150 + (300 * g) / DIAL_MAX;
}

/**
 * The point `radius` from the dial's centre at the mark for `g` grams.
 * @param {number} g
 * @param {number} radius
 * @param {{ x: number, y: number }} center
 */
export function dialPoint(g, radius, center) {
  const a = (dialAngle(g) * Math.PI) / 180;
  return { x: center.x + radius * Math.sin(a), y: center.y - radius * Math.cos(a) };
}

/**
 * What a screen reader hears from the ruler's coloured strip.
 * @param {number} n millimetres
 * @param {boolean} [settled]
 */
export function rulerLabel(n, settled = false) {
  if (n === 0)
    return 'Thước phóng to, giữa hai vạch số có 10 khoảng nhỏ. Băng màu chưa dài chút nào.';
  const cm = Math.floor(n / 10);
  const rest = n % 10;
  const where =
    cm === 0
      ? `đi từ vạch 0 qua ${rest} vạch nhỏ`
      : `đi từ vạch 0 đến vạch số ${cm}${rest > 0 ? ` rồi thêm ${rest} vạch nhỏ` : ''}`;
  return `Thước phóng to, giữa hai vạch số có 10 khoảng nhỏ. Băng màu ${where}.${
    settled ? ` Băng dài ${mmText(n)}.` : ''
  }`;
}

/**
 * What a screen reader hears from the dial scale.
 * @param {number} g
 * @param {boolean} [settled]
 */
export function dialLabel(g, settled = false) {
  const whole = Math.floor(g / 100) * 100;
  const where =
    g % 100 === 0
      ? `Kim chỉ đúng vạch có số ${fmt(whole)}`
      : `Kim chỉ vạch nhỏ ngay sau vạch có số ${fmt(whole)}, mỗi vạch nhỏ thêm 50 g`;
  return `Cân đồng hồ. ${where}.${settled ? ` Cân chỉ ${gramText(g)}.` : ''}`;
}

/**
 * What a screen reader hears from the measuring cylinder.
 * @param {number} n millilitres
 * @param {boolean} [settled]
 */
export function cylinderLabel(n, settled = false) {
  const whole = Math.floor(n / 100) * 100;
  const where =
    n === 0
      ? 'Ống chưa có nước'
      : n % 100 === 0
        ? `Mặt nước ở đúng vạch có số ${fmt(whole)}`
        : `Mặt nước ở vạch nhỏ ngay trên vạch có số ${fmt(whole)}, mỗi vạch nhỏ thêm 50 ml`;
  return `Ống đong. ${where}.${settled && n > 0 ? ` Trong ống có ${mlText(n)}.` : ''}`;
}

/**
 * What a screen reader hears from the thermometer.
 * @param {number} t degrees
 * @param {boolean} [settled]
 */
export function thermometerLabel(t, settled = false) {
  const tens = Math.floor(t / 10) * 10;
  const rest = t - tens;
  const where =
    rest === 0 ? `ở đúng vạch có số ${tens}` : `cao hơn vạch có số ${tens} là ${rest} vạch`;
  return `Nhiệt kế, mỗi vạch nhỏ là 1 độ. Đỉnh cột đỏ ${where}.${
    settled ? ` Nhiệt kế chỉ ${t} độ C.` : ''
  }`;
}
