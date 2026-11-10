/**
 * The four operations within 100 000 set out in columns and worked one step
 * at a time, said the book's way ("7 cộng 5 bằng 12, viết 2, nhớ 1"; "4
 * không trừ được 7, lấy 14 trừ 7 bằng 7, viết 7, nhớ 1"; "25 chia 4 được 6,
 * viết 6; 6 nhân 4 bằng 24; 25 trừ 24 bằng 1"). Addition, subtraction and
 * multiplication write the result from the ones; division writes the
 * quotient from the left. Every step writes one digit. Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'+' | '−' | '×' | ':'} Op */

/**
 * One step of a column calculation: the digit it writes, where (`col`
 * counts from the right of the result for +, −, × and is the round number
 * for :) and the sentence that says it.
 * @typedef {{ digit: number, col: number, say: string }} Step
 */

/** The four operations, with their names. */
export const OPS = /** @type {const} */ ([
  { value: '+', label: 'Cộng', word: 'cộng' },
  { value: '−', label: 'Trừ', word: 'trừ' },
  { value: '×', label: 'Nhân', word: 'nhân' },
  { value: ':', label: 'Chia', word: 'chia' },
]);

/**
 * The calculations of each operation, in the order they are offered. Each
 * one writes a single digit per step and no zero in front of its result.
 * @type {Record<Op, ReadonlyArray<{ a: number, b: number }>>}
 */
export const TASKS = {
  '+': [
    { a: 45637, b: 28485 },
    { a: 23415, b: 51362 },
    { a: 6718, b: 2451 },
  ],
  '−': [
    { a: 85362, b: 47281 },
    { a: 60524, b: 25318 },
    { a: 9245, b: 3678 },
  ],
  '×': [
    { a: 12345, b: 4 },
    { a: 21306, b: 3 },
    { a: 18207, b: 5 },
  ],
  ':': [
    { a: 9648, b: 3 },
    { a: 25632, b: 4 },
    { a: 47819, b: 6 },
  ],
};

/** The place names from the ones. */
export const PLACE_NAMES = /** @type {const} */ (['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn']);

/**
 * Digits of a natural number, ones first.
 * @param {number} n
 */
const onesFirst = (n) => String(n).split('').reverse().map(Number);

/**
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
function addSteps(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  let carry = 0;
  return x.map((p, col) => {
    const q = y[col] ?? 0;
    const plain = p + q;
    const total = plain + carry;
    const digit = total % 10;
    const added = carry > 0 ? `, thêm ${carry} bằng ${total}` : '';
    carry = Math.floor(total / 10);
    const kept = carry > 0 ? `, nhớ ${carry}` : '';
    return { digit, col, say: `${p} cộng ${q} bằng ${plain}${added}, viết ${digit}${kept}` };
  });
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
function subSteps(a, b) {
  const x = onesFirst(a);
  const y = onesFirst(b);
  let borrow = 0;
  return x.map((p, col) => {
    const q = y[col] ?? 0;
    const take = q + borrow;
    const pre = borrow > 0 ? `${q} thêm 1 bằng ${take}; ` : '';
    if (p >= take) {
      borrow = 0;
      return {
        digit: p - take,
        col,
        say: `${pre}${p} trừ ${take} bằng ${p - take}, viết ${p - take}`,
      };
    }
    borrow = 1;
    const digit = p + 10 - take;
    return {
      digit,
      col,
      say: `${pre}${p} không trừ được ${take}, lấy ${p + 10} trừ ${take} bằng ${digit}, viết ${digit}, nhớ 1`,
    };
  });
}

/**
 * @param {number} a
 * @param {number} b a digit
 * @returns {Step[]}
 */
function mulSteps(a, b) {
  let carry = 0;
  return onesFirst(a).map((p, col) => {
    const product = b * p;
    const total = product + carry;
    const digit = total % 10;
    const added = carry > 0 ? `, thêm ${carry} bằng ${total}` : '';
    carry = Math.floor(total / 10);
    const kept = carry > 0 ? `, nhớ ${carry}` : '';
    return { digit, col, say: `${b} nhân ${p} bằng ${product}${added}, viết ${digit}${kept}` };
  });
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
function divSteps(a, b) {
  const digits = String(a);
  return numberDivide(a, b).rounds.map(({ digit, partial, product, rest, end }, col) => {
    const down = col > 0 ? `Hạ ${digits[end]}, được ${partial}. ` : '';
    return {
      digit,
      col,
      say: `${down}${partial} chia ${b} được ${digit}, viết ${digit}; ${digit} nhân ${b} bằng ${product}; ${partial} trừ ${product} bằng ${rest}`,
    };
  });
}

/**
 * The steps of a calculation in the order they are written.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function stepsOf(op, a, b) {
  if (op === '+') return addSteps(a, b);
  if (op === '−') return subSteps(a, b);
  if (op === '×') return mulSteps(a, b);
  return divSteps(a, b);
}

/**
 * The result of a calculation: the quotient for a division.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export function resultOf(op, a, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  return Math.floor(a / b);
}

/**
 * The finished sentence: "47 819 : 6 = 7 969 (dư 5)".
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export function equation(op, a, b) {
  const rest = op === ':' ? a % b : 0;
  return `${fmt(a)} ${op} ${fmt(b)} = ${fmt(resultOf(op, a, b))}${rest > 0 ? ` (dư ${rest})` : ''}`;
}

/**
 * What the child is asked for next.
 * @param {Op} op
 * @param {Step} step
 */
export function askFor(op, step) {
  if (op === ':') return `Em tìm chữ số thứ ${step.col + 1} của thương.`;
  return `Em viết chữ số hàng ${PLACE_NAMES[step.col]} của kết quả.`;
}

/**
 * A nudge after a wrong digit; the second slip shows the whole step.
 * @param {Op} op
 * @param {Step} step
 * @param {number} tries wrong tries so far on this step (1 or more)
 */
export function nudge(op, step, tries) {
  if (tries >= 2) return `Em làm thế này nhé: ${step.say}.`;
  if (op === '+')
    return 'Chưa đúng. Em cộng hai chữ số cùng hàng, nhớ cộng thêm số nhớ ở hàng trước.';
  if (op === '−')
    return 'Chưa đúng. Nếu chữ số trên bé hơn chữ số dưới, em mượn 1 chục rồi nhớ 1 sang hàng sau.';
  if (op === '×') return 'Chưa đúng. Em nhân rồi cộng thêm số nhớ ở hàng trước.';
  return 'Chưa đúng. Em xem số bị chia lần này chứa mấy lần số chia.';
}

/**
 * One line of a division sheet: a cell per digit of the dividend, and
 * whether a line is ruled under it.
 * @typedef {{ cells: string[], line: boolean }} SheetRow
 */

/**
 * The left side of a division as the book prints it after `done` rounds:
 * the dividend, then for each round the product with a line under it and
 * what is left with the next digit brought down.
 * @param {number} n
 * @param {number} d
 * @param {number} done
 * @returns {SheetRow[]}
 */
export function sheetRows(n, d, done) {
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
  for (const { product, rest, end } of numberDivide(n, d).rounds.slice(0, done)) {
    rows.push({ cells: put(blank(), product, end), line: true });
    const left = put(blank(), rest, end);
    if (end + 1 < digits.length) left[end + 1] = digits[end + 1];
    rows.push({ cells: left, line: false });
  }
  return rows;
}
