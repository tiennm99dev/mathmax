/**
 * Division with remainder a = b · q + r (0 ≤ r < b) shown as a grid: the a
 * squares are laid out in rows of b, so q is the number of full rows and r
 * the squares left in the last, unfinished row.
 */

/**
 * Quotient and remainder of a : b for natural a and b ≠ 0.
 * @param {number} a
 * @param {number} b
 */
export function divide(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b <= 0) {
    throw new RangeError('a phải là số tự nhiên và b là số tự nhiên khác 0');
  }
  return { q: Math.floor(a / b), r: a % b };
}

/**
 * `23 = 5 · 4 + 3`, or `20 = 5 · 4` when the division is exact.
 * @param {number} a
 * @param {number} b
 */
export function divisionEquation(a, b) {
  const { q, r } = divide(a, b);
  return r === 0 ? `${a} = ${b} · ${q}` : `${a} = ${b} · ${q} + ${r}`;
}

/**
 * A sentence naming the kind of division and its parts.
 * @param {number} a
 * @param {number} b
 */
export function divisionSentence(a, b) {
  const { q, r } = divide(a, b);
  if (r === 0) {
    return `Xếp ${a} ô thành các hàng ${b} ô được đúng ${q} hàng đầy, không thừa ô nào. Phép chia hết: ${a} : ${b} = ${q}.`;
  }
  return `Xếp ${a} ô thành các hàng ${b} ô được ${q} hàng đầy và thừa ${r} ô (${r} < ${b}). Phép chia có dư: thương ${q}, số dư ${r}.`;
}

/**
 * Rows of the grid, each a list of cell kinds: 'full' cells belong to a
 * complete group of b, 'rest' cells to the remainder.
 * @param {number} a
 * @param {number} b
 * @returns {Array<Array<'full' | 'rest'>>}
 */
export function gridRows(a, b) {
  const { q, r } = divide(a, b);
  /** @type {Array<Array<'full' | 'rest'>>} */
  const rows = Array.from({ length: q }, () => Array(b).fill('full'));
  if (r > 0) rows.push(Array(r).fill('rest'));
  return rows;
}
