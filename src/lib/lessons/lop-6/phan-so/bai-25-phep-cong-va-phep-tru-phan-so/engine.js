/**
 * Grid model for adding and subtracting fractions with rectangles: a/b is
 * shaded as a columns out of b, c/d as c rows out of d. Cutting both
 * rectangles into the same b × d grid brings the fractions to a common
 * denominator, so the shaded cells can be pooled (or taken away) and counted.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { lcm } from '#lib/numtheory-engine/index.js';
import { fracOperand, fracText } from '#lib/core/fractions.js';

/**
 * @typedef {object} Cell
 * @property {number} rect which result rectangle, 0 or 1
 * @property {number} col
 * @property {number} row
 * @property {'a' | 'b' | 'removed'} kind
 */

/**
 * Position of the i-th cell when cells are counted column by column.
 * @param {number} i @param {number} rows @param {number} cols
 */
export function cellAt(i, rows, cols) {
  const per = rows * cols;
  const rect = Math.floor(i / per);
  const k = i - rect * per;
  return { rect, col: Math.floor(k / rows), row: k % rows };
}

/**
 * Shaded cells of the result for a/b ± c/d on a b × d grid. For a sum, the
 * a·d cells of the first fraction come first, then the c·b cells of the
 * second; for a difference, the last c·b cells of the first fraction are
 * marked removed. Assumes 0 ≤ a ≤ b, 0 ≤ c ≤ d and, for '-', a/b ≥ c/d.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 * @param {'+' | '-'} op
 * @returns {Cell[]}
 */
export function resultCells(a, b, c, d, op) {
  const first = a * d;
  const second = c * b;
  /** @type {Cell[]} */
  const out = [];
  if (op === '+') {
    for (let i = 0; i < first + second; i++) {
      out.push({ ...cellAt(i, d, b), kind: i < first ? 'a' : 'b' });
    }
    return out;
  }
  for (let i = 0; i < first; i++) {
    out.push({ ...cellAt(i, d, b), kind: i >= first - second ? 'removed' : 'a' });
  }
  return out;
}

/**
 * The value of a/b ± c/d, reduced.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 * @param {'+' | '-'} op
 */
export function combine(a, b, c, d, op) {
  return simplify(fraction(op === '+' ? a * d + c * b : a * d - c * b, b * d));
}

/**
 * The book's working for a/b ± c/d with the least common denominator, as
 * plain-text lines.
 * @param {number} a @param {number} b @param {number} c @param {number} d
 * @param {'+' | '-'} op
 */
export function workLines(a, b, c, d, op) {
  const m = lcm(b, d);
  const x = a * (m / b);
  const y = c * (m / d);
  const sign = op === '+' ? '+' : '−';
  const top = op === '+' ? x + y : x - y;
  const res = simplify(fraction(top, m));
  const lines = [];
  if (b === d) {
    lines.push(
      `Cùng mẫu ${b}: ${fracText(a, b)} ${sign} ${fracOperand(c, d)} = (${a} ${sign} ${c})/${b} = ${fracText(top, m)}.`,
    );
  } else {
    lines.push(`Mẫu chung BCNN(${b}, ${d}) = ${m}; thừa số phụ ${m / b} và ${m / d}.`);
    lines.push(
      `${fracText(a, b)} ${sign} ${fracText(c, d)} = ${fracText(x, m)} ${sign} ${fracText(y, m)} = ${fracText(top, m)}.`,
    );
  }
  if (res.d !== m) lines.push(`Rút gọn: ${fracText(top, m)} = ${fracText(res.n, res.d)}.`);
  return lines;
}
