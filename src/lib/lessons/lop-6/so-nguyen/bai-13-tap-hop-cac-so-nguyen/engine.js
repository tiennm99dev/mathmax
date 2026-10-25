/**
 * Integers on a thermometer and on a horizontal number line: read a
 * temperature, compare two points by their positions, and check small
 * placement challenges.
 */

import { intText } from '../_shared/integers.js';

/**
 * '<', '=' or '>'.
 * @param {number} a
 * @param {number} b
 */
export function compare(a, b) {
  return a < b ? '<' : a > b ? '>' : '=';
}

/**
 * A sentence linking the order of a and b to their positions on the line.
 * @param {number} a
 * @param {number} b
 */
export function relationSentence(a, b) {
  const [x, y] = [intText(a), intText(b)];
  if (a < b) return `Điểm a nằm bên trái điểm b nên ${x} < ${y} (cũng viết ${y} > ${x}).`;
  if (a > b) return `Điểm a nằm bên phải điểm b nên ${x} > ${y} (cũng viết ${y} < ${x}).`;
  return `Hai điểm trùng nhau nên a = b = ${x}.`;
}

/**
 * How a temperature reads, in words: −7 → 'âm 7 độ C, tức 7 độ dưới 0 °C'.
 * @param {number} t
 */
export function temperatureSentence(t) {
  if (t < 0) return `${intText(t)} °C, đọc là "âm ${-t} độ C": thấp hơn 0 °C là ${-t} độ.`;
  if (t > 0) return `${t} °C: cao hơn 0 °C là ${t} độ.`;
  return '0 °C: nhiệt độ nước đá đang tan.';
}

/** Where a and b start: no challenge is met yet, so each one needs a move. */
export const START = { a: 2, b: -4 };

/**
 * Placement tasks on the line from −10 to 10. `check` receives the two points.
 * @type {Array<{ text: string, check: (a: number, b: number) => boolean }>}
 */
export const CHALLENGES = [
  { text: 'Đặt a là số nguyên âm, b là số nguyên dương.', check: (a, b) => a < 0 && b > 0 },
  { text: 'Đặt a là số nguyên âm lớn nhất.', check: (a) => a === -1 },
  { text: 'Đặt a là số liền trước của −5.', check: (a) => a === -6 },
  { text: 'Đặt hai số nguyên âm sao cho a > b.', check: (a, b) => a < 0 && b < 0 && a > b },
  { text: 'Đặt a, b sao cho −3 < a < b < 0.', check: (a, b) => a === -2 && b === -1 },
  {
    text: 'Đặt a, b cách đều điểm 0 về hai phía, a ở bên trái.',
    check: (a, b) => a < 0 && a === -b,
  },
];
