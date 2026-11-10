/**
 * The four operations within 100 000 set out in columns, said the book's way
 * ("7 cộng 5 bằng 12, viết 2, nhớ 1"; "4 không trừ được 7, lấy 14 trừ 7 bằng
 * 7, viết 7, nhớ 1"; "13 chia 4 được 3, viết 3"), the slips children make,
 * and the rows of a division sheet. Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { fmt } from '#lib/core/number-format.js';

/**
 * Digits of a natural number, ones first.
 * @param {number} n
 */
const onesFirst = (n) => String(n).split('').reverse().map(Number);

/**
 * The steps of `a + b` in columns, ones first.
 * @param {number} a
 * @param {number} b
 * @returns {string[]}
 */
export function addSteps(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  const size = Math.max(x.length, y.length);
  let carry = 0;
  /** @type {string[]} */
  const steps = [];
  for (let i = 0; i < size; i++) {
    const p = x[i];
    const q = y[i];
    const both = p !== undefined && q !== undefined;
    const one = p ?? q ?? 0;
    const plain = both ? p + q : one;
    const total = plain + carry;
    const last = i === size - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    const kept = carryOut > 0 ? `, nhớ ${carryOut}` : '';
    if (!both && carry === 0) {
      steps.push(`Hạ ${one}`);
    } else {
      const head = both ? `${p} cộng ${q} bằng ${plain}` : `${one}`;
      const added = carry > 0 ? `${both ? ',' : ''} thêm ${carry} bằng ${total}` : '';
      steps.push(`${head}${added}, viết ${digit}${kept}`);
    }
    carry = carryOut;
  }
  return steps;
}

/**
 * The steps of `a − b` in columns, ones first; `a` is at least `b`. A zero
 * left at the front of the difference is not written.
 * @param {number} a
 * @param {number} b
 * @returns {string[]}
 */
export function subSteps(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  const lead = String(a - b).length;
  let borrow = 0;
  /** @type {string[]} */
  const steps = [];
  x.forEach((p, i) => {
    const q = y[i];
    const written = i < lead;
    if (q === undefined && borrow === 0) {
      steps.push(`Hạ ${p}`);
      return;
    }
    const take = (q ?? 0) + borrow;
    const pre = q !== undefined && borrow > 0 ? `${q} thêm 1 bằng ${take}; ` : '';
    if (p >= take) {
      const digit = p - take;
      steps.push(`${pre}${p} trừ ${take} bằng ${digit}${written ? `, viết ${digit}` : ''}`);
      borrow = 0;
      return;
    }
    const digit = p + 10 - take;
    steps.push(
      `${pre}${p} không trừ được ${take}, lấy ${p + 10} trừ ${take} bằng ${digit}, viết ${digit}, nhớ 1`,
    );
    borrow = 1;
  });
  return steps;
}

/**
 * One column of `a × b`, ones first.
 * @param {number} a
 * @param {number} b a digit
 * @returns {string[]}
 */
export function mulSteps(a, b) {
  const values = onesFirst(a);
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
    return `${b} nhân ${value} bằng ${product}${added}, viết ${digit}${kept}`;
  });
}

/** @typedef {'+' | '−' | '×'} ColumnOp */

/**
 * The value of a column operation.
 * @param {ColumnOp} op
 * @param {number} a
 * @param {number} b
 */
export function columnValue(op, a, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  return a * b;
}

/**
 * A column operation worked out in words, ending with its sentence.
 * @param {ColumnOp} op
 * @param {number} a
 * @param {number} b
 */
export function columnWords(op, a, b) {
  const steps = op === '+' ? addSteps(a, b) : op === '−' ? subSteps(a, b) : mulSteps(a, b);
  return `${steps.join('. ')}. Vậy ${fmt(a)} ${op} ${fmt(b)} = ${fmt(columnValue(op, a, b))}.`;
}

/**
 * `a + b` with every carry forgotten.
 * @param {number} a
 * @param {number} b
 */
export function forgotAddCarry(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  const size = Math.max(x.length, y.length);
  let sum = 0;
  for (let i = 0; i < size; i++) {
    const total = (x[i] ?? 0) + (y[i] ?? 0);
    sum += (i === size - 1 ? total : total % 10) * 10 ** i;
  }
  return sum;
}

/**
 * `a − b` with every borrowed 1 never paid back to the next column.
 * @param {number} a
 * @param {number} b
 */
export function forgotBorrow(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  return x.reduce((sum, p, i) => {
    const q = y[i] ?? 0;
    return sum + (p >= q ? p - q : p + 10 - q) * 10 ** i;
  }, 0);
}

/**
 * `a × b` with every carry forgotten.
 * @param {number} a
 * @param {number} b
 */
export function forgotMulCarry(a, b) {
  const values = onesFirst(a);
  return values.reduce((sum, value, i) => {
    const product = b * value;
    return sum + (i === values.length - 1 ? product : product % 10) * 10 ** i;
  }, 0);
}

/**
 * The division sentence: "57 436 : 6 = 9 572 (dư 4)".
 * @param {number} n
 * @param {number} d
 */
export function divText(n, d) {
  const rest = n % d;
  return `${fmt(n)} : ${d} = ${fmt(Math.floor(n / d))}${rest > 0 ? ` (dư ${rest})` : ''}`;
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
 * One line of a division sheet: a cell per digit of the dividend, and whether
 * a line is ruled under it.
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
