/**
 * Column arithmetic with decimals, the way it is written by hand: the two
 * numbers are lined up on the decimal comma, missing places count as 0, and
 * the result is found one column at a time from the right with carries.
 * Signs are handled first, as in the book: the column always works on the
 * positive numbers, and the sign of the result is decided by the rules for
 * adding, subtracting and multiplying signed numbers.
 *
 * A decimal is `{ n, k }`, the integer n scaled by 10^(−k).
 */

import { int, pick } from '#lib/core/drill.js';
import { decStr } from '../_shared/decimal.js';

/** @typedef {{ n: number, k: number }} Dec */
/** @typedef {'+' | '-' | '×'} Op */

const DEC_PLACES = [
  '',
  'phần mười',
  'phần trăm',
  'phần nghìn',
  'phần chục nghìn',
  'phần trăm nghìn',
];
const INT_PLACES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn'];

/**
 * Name of the place of column i (0 is the rightmost) when k decimals are carried.
 * @param {number} i @param {number} k
 */
export function placeName(i, k) {
  return i < k ? `hàng ${DEC_PLACES[k - i]}` : `hàng ${INT_PLACES[i - k]}`;
}

/** @param {Dec} d */
export const decText = (d) => decStr(d.n, d.k);

/**
 * The two numbers written with the same number of decimals.
 * @param {Dec} a @param {Dec} b
 */
export function align(a, b) {
  const k = Math.max(a.k, b.k);
  return { k, A: a.n * 10 ** (k - a.k), B: b.n * 10 ** (k - b.k) };
}

/**
 * @typedef {object} Column
 * @property {number} i column index from the right
 * @property {string} place e.g. 'hàng phần trăm'
 * @property {number} da digit of the first number (0 where it has none)
 * @property {number} db digit of the second number
 * @property {boolean} shownA whether the first number has a written digit here
 * @property {boolean} shownB
 * @property {number} carryIn 1 when the column on the right carried
 * @property {number} digit result digit
 * @property {number} carryOut
 * @property {boolean} required whether the result writes a digit here
 * @property {string} why the column worked out in words
 */

/**
 * The columns of a + b or a − b for positive decimals (a ≥ b to subtract).
 * @param {'add' | 'sub'} op @param {Dec} a @param {Dec} b
 */
export function columns(op, a, b) {
  if (a.n < 0 || b.n < 0) throw new Error('columns work on positive numbers');
  const { k, A, B } = align(a, b);
  if (op === 'sub' && A < B) throw new Error('subtract the smaller number');
  const R = op === 'add' ? A + B : A - B;
  const len = (/** @type {number} */ x) => String(x).length;
  // Written digits: a number shows its own decimals only, and a whole part of 0.
  const firstA = k - a.k;
  const firstB = k - b.k;
  const topA = Math.max(len(A), k + 1);
  const topB = Math.max(len(B), k + 1);
  const width = Math.max(topA, topB, len(R), k + 1);
  const resultWidth = Math.max(len(R), k + 1);
  /** @type {Column[]} */
  const cols = [];
  let carry = 0;
  for (let i = 0; i < width; i++) {
    const da = Math.floor(A / 10 ** i) % 10;
    const db = Math.floor(B / 10 ** i) % 10;
    let digit;
    let carryOut;
    let why;
    const place = placeName(i, k);
    if (op === 'add') {
      const s = da + db + carry;
      digit = s % 10;
      carryOut = s >= 10 ? 1 : 0;
      why = `${place}: ${da} + ${db}${carry ? ' + 1 (nhớ)' : ''} = ${s}, viết ${digit}${carryOut ? ', nhớ 1' : ''}.`;
    } else {
      const sub = db + carry;
      const take = carry ? `${db} thêm 1 (nhớ) là ${sub}; ` : '';
      if (da >= sub) {
        digit = da - sub;
        carryOut = 0;
        why = `${place}: ${take}${da} − ${sub} = ${digit}, viết ${digit}.`;
      } else {
        digit = da + 10 - sub;
        carryOut = 1;
        why = `${place}: ${take}${da} không trừ được ${sub}, lấy ${da + 10} − ${sub} = ${digit}, viết ${digit}, nhớ 1.`;
      }
    }
    cols.push({
      i,
      place,
      da,
      db,
      shownA: i >= firstA && i < topA,
      shownB: i >= firstB && i < topB,
      carryIn: carry,
      digit,
      carryOut,
      required: i < resultWidth,
      why,
    });
    carry = carryOut;
  }
  return { k, A, B, R, width, cols, result: { n: R, k } };
}

/**
 * Multiplying two positive decimals: multiply as natural numbers, then
 * count the decimals of both factors and put the comma that many digits
 * from the right, padding with zeros in front when the product is short.
 * @param {Dec} a @param {Dec} b
 */
export function multiply(a, b) {
  if (a.n < 0 || b.n < 0) throw new Error('multiply works on positive numbers');
  const P = a.n * b.n;
  const k = a.k + b.k;
  const digits = String(P).padStart(k + 1, '0');
  return { P, k, digits, commaAt: digits.length - k, result: { n: P, k } };
}

/**
 * @typedef {object} Plan
 * @property {Op} op
 * @property {Dec} x
 * @property {Dec} y
 * @property {boolean} signed whether a negative number takes part
 * @property {1 | -1} sign sign of the result
 * @property {'add' | 'sub' | 'mul'} work what the column computes
 * @property {Dec} p first number of the column (positive)
 * @property {Dec} q second number of the column (positive)
 * @property {string[]} reasons the sign rule in words
 * @property {Dec} answer
 */

/** @param {Dec} d @returns {Dec} */
const neg = (d) => ({ n: -d.n, k: d.k });
/** @param {Dec} d @returns {Dec} */
const pos = (d) => ({ n: Math.abs(d.n), k: d.k });

/**
 * How the book computes x op y: the sign rule, then the column work on
 * positive numbers.
 * @param {Op} op @param {Dec} x @param {Dec} y
 * @returns {Plan}
 */
export function plan(op, x, y) {
  const signed = x.n < 0 || y.n < 0;
  /** @type {string[]} */
  const reasons = [];
  if (op === '×') {
    const sign = x.n < 0 === y.n < 0 ? 1 : -1;
    if (signed) {
      reasons.push(
        sign === 1
          ? 'Hai thừa số cùng dấu nên tích là số dương.'
          : 'Hai thừa số khác dấu nên tích là số âm.',
      );
    }
    const m = multiply(pos(x), pos(y));
    return {
      op,
      x,
      y,
      signed,
      sign,
      work: 'mul',
      p: pos(x),
      q: pos(y),
      reasons,
      answer: { n: sign * m.result.n, k: m.result.k },
    };
  }
  let b = y;
  if (op === '-') {
    b = neg(y);
    if (signed)
      reasons.push(
        `Đổi phép trừ thành phép cộng với số đối: ${call(x, '-', y)} = ${call(x, '+', b)}.`,
      );
  }
  const { k, A, B } = align(x, b);
  const total = A + B;
  /** @type {1 | -1} */
  const sign = total < 0 ? -1 : 1;
  const sameSign = x.n >= 0 === b.n >= 0;
  /** @type {'add' | 'sub'} */
  let work;
  let p;
  let q;
  if (sameSign) {
    work = 'add';
    p = pos(x);
    q = pos(b);
    if (signed && x.n < 0) {
      reasons.push('Hai số cùng âm: cộng hai số đối của chúng rồi đặt dấu "−" trước kết quả.');
    }
  } else {
    work = 'sub';
    const [big, small] = Math.abs(A) >= Math.abs(B) ? [x, b] : [b, x];
    p = pos(big);
    q = pos(small);
    if (signed)
      reasons.push(
        big.n < 0
          ? `Hai số khác dấu, số đối của số âm lớn hơn số dương: lấy ${decText(p)} − ${decText(q)} rồi đặt dấu "−" trước kết quả.`
          : `Hai số khác dấu, số dương lớn hơn số đối của số âm: lấy ${decText(p)} − ${decText(q)}, kết quả là số dương.`,
      );
  }
  return { op, x, y, signed, sign, work, p, q, reasons, answer: { n: total, k } };
}

/**
 * A number as an operand, negative ones in brackets after the first place.
 * @param {Dec} d @param {boolean} first
 */
export function operand(d, first) {
  return d.n < 0 && !first ? `(${decText(d)})` : decText(d);
}

/**
 * The expression x op y as text.
 * @param {Dec} x @param {Op} op @param {Dec} y
 */
export function call(x, op, y) {
  const sym = op === '-' ? '−' : op;
  return `${operand(x, true)} ${sym} ${operand(y, false)}`;
}

/**
 * A positive decimal with k decimals and an integer part below `maxInt`;
 * its last decimal digit is not 0, so it is written with exactly k decimals.
 * @param {() => number} rand @param {number} k @param {number} maxInt
 * @returns {Dec}
 */
function randomDec(rand, k, maxInt) {
  const whole = int(rand, 0, maxInt);
  const frac = k === 0 ? 0 : int(rand, 0, 10 ** (k - 1) - 1) * 10 + int(rand, 1, 9);
  return { n: whole * 10 ** k + frac, k };
}

/**
 * A fresh exercise for the board.
 * @param {() => number} rand
 * @param {Op} op
 * @param {boolean} signed include negative numbers
 * @returns {{ x: Dec, y: Dec }}
 */
export function makeProblem(rand, op, signed) {
  for (;;) {
    let x;
    let y;
    if (op === '×') {
      x = randomDec(rand, pick(rand, [1, 2]), 12);
      y = randomDec(rand, pick(rand, [0, 1]), 9);
      if (y.n < 2 || x.n < 2) continue;
    } else {
      x = randomDec(rand, pick(rand, [1, 2, 3]), 60);
      y = randomDec(rand, pick(rand, [1, 2]), 40);
      if (op === '-' && !signed) {
        const { A, B } = align(x, y);
        if (A === B) continue;
        if (A < B) [x, y] = [y, x];
      }
    }
    if (signed) {
      const which = int(rand, 0, 2);
      if (which !== 1) x = neg(x);
      if (which !== 0) y = neg(y);
    }
    const p = plan(op, x, y);
    if (p.answer.n === 0) continue;
    return { x, y };
  }
}
