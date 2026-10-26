/**
 * Exact decimal work (grade 7 "Số thực" and later): the long division that
 * turns a fraction into a finite or repeating decimal (with its remainders, so a
 * widget can show where they repeat), rounding by the next digit, square
 * roots digit by digit, and reading and writing numbers with a decimal comma
 * and the book's minus sign.
 *
 * Everything is done on integers, never on floating-point digits, so a
 * digit far after the comma is still exact.
 */

import { MINUS } from './number-format.js';

/**
 * @typedef {object} Expansion
 * @property {boolean} negative
 * @property {number} whole integer part of |p/q|
 * @property {number[]} digits digits after the comma: the non-repeating part,
 *   then one period
 * @property {number[]} remainders remainder before each digit of `digits`
 *   (the long division brings down a 0 next to it)
 * @property {number} start index in `digits` where the period starts
 * @property {number} period length of the period, 0 for a finite decimal
 */

/**
 * Long division of p by q (q > 0). It stops when the remainder is 0 (a
 * finite decimal) or repeats one seen before (a repeating decimal): there
 * are fewer than q possible remainders, so it always stops.
 * @param {number} p integer
 * @param {number} q positive integer
 * @returns {Expansion}
 */
export function expand(p, q) {
  if (!Number.isInteger(p) || !Number.isInteger(q) || q <= 0) {
    throw new Error(`expand needs integers p and q > 0, got ${p}/${q}`);
  }
  const a = Math.abs(p);
  const whole = Math.floor(a / q);
  let r = a % q;
  /** @type {number[]} */
  const digits = [];
  /** @type {number[]} */
  const remainders = [];
  /** @type {Map<number, number>} */
  const seen = new Map();
  while (r !== 0 && !seen.has(r)) {
    seen.set(r, digits.length);
    remainders.push(r);
    digits.push(Math.floor((r * 10) / q));
    r = (r * 10) % q;
  }
  const repeating = r !== 0;
  return {
    negative: p < 0,
    whole,
    digits,
    remainders,
    start: repeating ? /** @type {number} */ (seen.get(r)) : digits.length,
    period: repeating ? digits.length - /** @type {number} */ (seen.get(r)) : 0,
  };
}

/**
 * True when p/q is a finite decimal: in lowest terms, its denominator has no
 * prime factor other than 2 and 5.
 * @param {number} p
 * @param {number} q
 */
export function isFiniteDecimal(p, q) {
  return expand(p, q).period === 0;
}

/**
 * The prime factors of n > 1, each once, in increasing order: 12 → [2, 3].
 * @param {number} n
 */
export function primeFactors(n) {
  /** @type {number[]} */
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      out.push(p);
      while (m % p === 0) m /= p;
    }
  }
  if (m > 1) out.push(m);
  return out;
}

/**
 * The n-th digit after the comma of |p/q| (n from 1), exact for any n.
 * @param {number} p
 * @param {number} q
 * @param {number} n
 */
export function digitAt(p, q, n) {
  const e = expand(p, q);
  if (n <= e.digits.length) return e.digits[n - 1];
  if (e.period === 0) return 0;
  return e.digits[e.start + ((n - 1 - e.start) % e.period)];
}

/**
 * Plain text of p/q as a decimal, the period in brackets: 5/11 → '0,(45)',
 * −1/6 → '−0,1(6)', 5/4 → '1,25', 6/3 → '2'.
 * @param {number} p
 * @param {number} q
 */
export function decimalText(p, q) {
  const e = expand(p, q);
  const sign = e.negative && (e.whole > 0 || e.digits.length > 0) ? MINUS : '';
  if (e.digits.length === 0) return `${sign}${e.whole}`;
  const head = e.digits.slice(0, e.start).join('');
  const cycle = e.digits.slice(e.start).join('');
  return `${sign}${e.whole},${head}${e.period ? `(${cycle})` : ''}`;
}

/**
 * TeX of p/q as a decimal: '0{,}(45)', with an ASCII minus for KaTeX.
 * @param {number} p
 * @param {number} q
 */
export function decimalTex(p, q) {
  return decimalText(p, q).replace(MINUS, '-').replace(',', '{,}');
}

/**
 * The first `count` digits after the comma, written out without brackets:
 * (5, 11, 6) → '0,454545'. Used to show '0,4545...' before the short form.
 * @param {number} p
 * @param {number} q
 * @param {number} count
 */
export function digitsText(p, q, count) {
  const e = expand(p, q);
  const sign = e.negative ? MINUS : '';
  let s = '';
  for (let n = 1; n <= count; n++) s += digitAt(p, q, n);
  return `${sign}${e.whole},${s}`;
}

/**
 * An integer scaled by 10^places written as a decimal with a comma, places
 * kept: (45, 2) → '0,45', (-3, 1) → '−0,3', (7, 0) → '7'.
 * @param {number} scaled
 * @param {number} places
 */
export function scaledText(scaled, places) {
  const sign = scaled < 0 ? MINUS : '';
  const digits = String(Math.abs(scaled)).padStart(places + 1, '0');
  if (places === 0) return `${sign}${digits}`;
  return `${sign}${digits.slice(0, -places)},${digits.slice(-places)}`;
}

/**
 * Rounds p/q to `places` digits after the comma by the book's rule: look at
 * the next digit; keep the last digit when it is below 5, add 1 when it is
 * 5 or more. Returns the rounded value as an integer scaled by 10^places.
 * @param {number} p
 * @param {number} q
 * @param {number} places 0 for the units digit
 */
export function roundFraction(p, q, places) {
  const e = expand(p, q);
  let scaled = e.whole;
  for (let n = 1; n <= places; n++) scaled = scaled * 10 + digitAt(p, q, n);
  if (digitAt(p, q, places + 1) >= 5) scaled += 1;
  return e.negative ? -scaled : scaled;
}

/**
 * floor(√n · 10^places) for a natural number n, exact (n · 10^(2·places)
 * must stay below 2^53).
 * @param {number} n
 * @param {number} places
 */
export function sqrtFloor(n, places) {
  const big = n * 10 ** (2 * places);
  let r = Math.floor(Math.sqrt(big));
  while (r * r > big) r--;
  while ((r + 1) * (r + 1) <= big) r++;
  return r;
}

/**
 * √n rounded to `places` digits after the comma by the next-digit rule, as
 * an integer scaled by 10^places.
 * @param {number} n
 * @param {number} places
 */
export function roundSqrt(n, places) {
  const t = sqrtFloor(n, places + 1);
  return Math.floor(t / 10) + (t % 10 >= 5 ? 1 : 0);
}

/**
 * The value of an integer scaled by 10^places, as the double a reader gets
 * from the same digits.
 * @param {number} scaled
 * @param {number} places
 */
export function scaledValue(scaled, places) {
  return scaled / 10 ** places;
}

/**
 * True when n is the square of a natural number.
 * @param {number} n
 */
export function isSquare(n) {
  return n >= 0 && sqrtFloor(n, 0) ** 2 === n;
}

/**
 * The rounding precisions of the book that end in 5, with the place each
 * one rounds to: precision 0,05 means rounding to tenths.
 */
export const PRECISIONS = [
  { text: '0,5', places: 0, place: 'hàng đơn vị' },
  { text: '0,05', places: 1, place: 'hàng phần mười' },
  { text: '0,005', places: 2, place: 'hàng phần trăm' },
  { text: '0,0005', places: 3, place: 'hàng phần nghìn' },
];

/**
 * Reads a number typed by a learner: an integer '−7', a fraction '−3/4' or
 * '3/-4', or a decimal '0,75' (a dot works too). Returns its value, or null
 * when the text is not a number or a denominator is 0. Equal numbers give
 * the very same double, since a quotient of integers is correctly rounded.
 * @param {string} text
 * @returns {number | null}
 */
export function readNumber(text) {
  const s = text.trim().replace(/[−–—]/g, '-').replace(/\s+/g, '');
  const f = /^([+-]?)(\d+)\/([+-]?)(\d+)$/.exec(s);
  if (f) {
    const d = Number(f[4]);
    if (d === 0) return null;
    const negative = (f[1] === '-') !== (f[3] === '-');
    return (negative ? -Number(f[2]) : Number(f[2])) / d;
  }
  const w = /^([+-]?)(\d+)(?:[,.](\d+))?$/.exec(s);
  if (!w) return null;
  const digits = w[3] ?? '';
  const n = Number(w[2] + digits);
  return (w[1] === '-' ? -n : n) / 10 ** digits.length;
}

/**
 * Greatest common divisor of two natural numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Answer text for a drill: a finite decimal with a comma ('−2,5', '0,45',
 * '7'), else the lowest-terms fraction ('2/3').
 * @param {number} value
 */
export function numberText(value) {
  for (let d = 1; d <= 10000; d++) {
    const n = Math.round(value * d);
    if (n / d !== value) continue;
    const g = gcd(Math.abs(n), d);
    const p = n / g;
    const q = d / g;
    return isFiniteDecimal(p, q) ? decimalText(p, q) : `${p < 0 ? MINUS : ''}${Math.abs(p)}/${q}`;
  }
  return String(value).replace('.', ',').replace('-', MINUS);
}
