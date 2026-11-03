/**
 * Multiplication and division set out in columns the book's way ("3 nhân 6
 * bằng 18, viết 8, nhớ 1"; "13 chia 4 được 3, viết 3"), in words and as the
 * rows of a sheet. Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { fmt } from '#lib/core/number-format.js';

/**
 * One column of `a × b`, from the ones up.
 * @typedef {object} MulColumn
 * @property {number} value the digit of `a` in this column
 * @property {number} product `b` times `value`
 * @property {number} digit what is written (all of it in the last column)
 * @property {number} carryOut what this column carries over
 * @property {string} say how the book says it
 */

/**
 * The columns of `a × b`, ones first.
 * @param {number} a
 * @param {number} b a digit
 * @returns {MulColumn[]}
 */
export function mulColumns(a, b) {
  const values = String(a).split('').reverse().map(Number);
  let carryIn = 0;
  return values.map((value, i) => {
    const product = b * value;
    const total = product + carryIn;
    const last = i === values.length - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
    const kept = carryOut > 0 ? `, nhớ ${carryOut}` : '';
    carryIn = carryOut;
    return {
      value,
      product,
      digit,
      carryOut,
      say: `${b} nhân ${value} bằng ${product}${added}, viết ${digit}${kept}`,
    };
  });
}

/**
 * The whole multiplication in words.
 * @param {number} a
 * @param {number} b
 */
export function mulWords(a, b) {
  const steps = mulColumns(a, b).map((c) => `${c.say}.`);
  return `${steps.join(' ')} Vậy ${a} × ${b} = ${fmt(a * b)}.`;
}

/**
 * The result of `a × b` with every carry forgotten, a slip children make.
 * @param {number} a
 * @param {number} b
 */
export function forgotCarry(a, b) {
  const columns = mulColumns(a, b);
  return columns.reduce(
    (sum, c, i) => sum + (i === columns.length - 1 ? c.product : c.product % 10) * 10 ** i,
    0,
  );
}

/**
 * The division sentence.
 * @param {number} n
 * @param {number} d
 */
export function divText(n, d) {
  const rest = n % d;
  return `${n} : ${d} = ${Math.floor(n / d)}${rest > 0 ? ` (dư ${rest})` : ''}`;
}

/**
 * The whole division in words, from the left.
 * @param {number} n
 * @param {number} d
 */
export function divWords(n, d) {
  const digits = String(n);
  const rounds = numberDivide(n, d).rounds.map(({ digit, partial, product, rest, end }, i) => {
    const down = i > 0 ? `Hạ ${digits[end]}, được ${partial}. ` : '';
    return `${down}${partial} chia ${d} được ${digit}, viết ${digit}; ${digit} nhân ${d} bằng ${product}; ${partial} trừ ${product} bằng ${rest}.`;
  });
  return `${rounds.join(' ')} Vậy ${divText(n, d)}.`;
}

/**
 * One line of a division sheet: a cell per digit of the dividend, and whether a
 * line is ruled under it.
 * @typedef {{ cells: string[], line: boolean }} SheetRow
 */

/**
 * The left side of a division as the book prints it: the dividend, then for
 * each round the product with a line under it and what is left with the next
 * digit brought down.
 * @param {number} n
 * @param {number} d
 * @returns {SheetRow[]}
 */
export function sheetRows(n, d) {
  const digits = String(n).split('');
  const blank = () => digits.map(() => '');
  /**
   * @param {string[]} cells
   * @param {number} value
   * @param {number} end the column of its last digit
   */
  const put = (cells, value, end) => {
    [...String(value)].reverse().forEach((digit, i) => {
      cells[end - i] = digit;
    });
    return cells;
  };
  /** @type {SheetRow[]} */
  const rows = [{ cells: digits, line: false }];
  for (const { product, rest, end } of numberDivide(n, d).rounds) {
    rows.push({ cells: put(blank(), product, end), line: true });
    const left = put(blank(), rest, end);
    if (end + 1 < digits.length) left[end + 1] = digits[end + 1];
    rows.push({ cells: left, line: false });
  }
  return rows;
}
