/**
 * Order of natural numbers on the number ray: compare two points, name the
 * predecessor and successor, and check small placement challenges.
 */

/**
 * '<', '=' or '>'.
 * @param {number} a
 * @param {number} b
 */
export function compare(a, b) {
  return a < b ? '<' : a > b ? '>' : '=';
}

/**
 * A sentence linking the order of a and b to their positions on the ray.
 * @param {number} a
 * @param {number} b
 */
export function relationSentence(a, b) {
  if (a < b) return `Điểm a nằm bên trái điểm b nên ${a} < ${b} (cũng viết ${b} > ${a}).`;
  if (a > b) return `Điểm a nằm bên phải điểm b nên ${a} > ${b} (cũng viết ${b} < ${a}).`;
  return `Hai điểm trùng nhau nên a = b = ${a}.`;
}

/**
 * The natural number just before n, or null for 0, which has none.
 * @param {number} n
 * @returns {number | null}
 */
export function predecessor(n) {
  return n > 0 ? n - 1 : null;
}

/**
 * The natural number just after n; every natural number has one.
 * @param {number} n
 */
export function successor(n) {
  return n + 1;
}

/**
 * Placement tasks on the ray from 0 to 20. `check` receives the two points.
 * @type {Array<{ text: string, check: (a: number, b: number) => boolean }>}
 */
export const CHALLENGES = [
  { text: 'Đặt hai điểm sao cho a > b.', check: (a, b) => a > b },
  { text: 'Đặt b là số liền sau của a.', check: (a, b) => b === a + 1 },
  { text: 'Đặt a là số liền trước của 10.', check: (a) => a === 9 },
  { text: 'Đặt a, b sao cho a ≤ b và b ≤ a.', check: (a, b) => a === b },
  { text: 'Đặt a là số tự nhiên nhỏ nhất.', check: (a) => a === 0 },
  { text: 'Đặt a, b sao cho 12 < a < b < 15.', check: (a, b) => a === 13 && b === 14 },
];
