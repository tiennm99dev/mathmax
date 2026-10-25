/**
 * Divisibility helpers for the lessons of this chapter: divisors and
 * multiples of a natural number, the digit tests for 2, 3, 5 and 9, and
 * prime factorisations written the way the book writes them (2² · 3 · 7).
 */

import { sup } from './format.js';

/**
 * Every divisor of n in increasing order (Ư(n)); n must be at least 1.
 * @param {number} n
 * @returns {number[]}
 */
export function divisorsOf(n) {
  /** @type {number[]} */
  const small = [];
  /** @type {number[]} */
  const large = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d !== 0) continue;
    small.push(d);
    if (d * d !== n) large.unshift(n / d);
  }
  return [...small, ...large];
}

/**
 * The multiples of n from 0 up to and including max (part of B(n)).
 * @param {number} n at least 1
 * @param {number} max
 * @param {boolean} [withZero] include 0, as B(n) does; true by default
 * @returns {number[]}
 */
export function multiplesUpTo(n, max, withZero = true) {
  /** @type {number[]} */
  const out = [];
  for (let k = withZero ? 0 : n; k <= max; k += n) out.push(k);
  return out;
}

/**
 * The digits of a natural number, most significant first.
 * @param {number} n
 */
export function digitsOf(n) {
  return String(n).split('').map(Number);
}

/**
 * Sum of the decimal digits of n.
 * @param {number} n
 */
export function digitSum(n) {
  return digitsOf(n).reduce((s, d) => s + d, 0);
}

/** The divisors that have a digit test in this chapter. */
export const TESTED = /** @type {const} */ ([2, 3, 5, 9]);

/**
 * Whether n is divisible by d, decided from its digits only, the way the
 * book's tests do: the last digit for 2 and 5, the digit sum for 3 and 9.
 * @param {number} n
 * @param {2 | 3 | 5 | 9} d
 */
export function passesDigitTest(n, d) {
  const last = n % 10;
  if (d === 2) return last % 2 === 0;
  if (d === 5) return last === 0 || last === 5;
  return digitSum(n) % d === 0;
}

/**
 * Why n is or is not divisible by d, in one plain-text sentence.
 * @param {number} n
 * @param {2 | 3 | 5 | 9} d
 */
export function digitTestReason(n, d) {
  const yes = passesDigitTest(n, d);
  if (d === 2 || d === 5) {
    const last = n % 10;
    let what = '';
    if (d === 2) what = last % 2 === 0 ? ', là chữ số chẵn' : ', là chữ số lẻ';
    else if (!yes) what = ', khác 0 và 5';
    return `${n} có chữ số tận cùng là ${last}${what}, nên ${n} ${yes ? 'chia hết' : 'không chia hết'} cho ${d}.`;
  }
  const sum = digitSum(n);
  return `Tổng các chữ số ${digitsOf(n).join(' + ')} = ${sum} ${yes ? 'chia hết' : 'không chia hết'} cho ${d}, nên ${n} ${yes ? 'chia hết' : 'không chia hết'} cho ${d}.`;
}

/**
 * Prime factorisation of n ≥ 2 as [prime, exponent] pairs, primes increasing.
 * @param {number} n
 * @returns {Array<[number, number]>}
 */
export function factorize(n) {
  /** @type {Array<[number, number]>} */
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e > 0) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

/**
 * A factorisation in plain text: [[2, 2], [3, 1], [7, 1]] → '2² · 3 · 7'.
 * @param {Array<[number, number]>} factors
 */
export function factorText(factors) {
  return factors.map(([p, e]) => (e === 1 ? String(p) : `${p}${sup(e)}`)).join(' · ');
}

/**
 * The same factorisation as TeX source: '2^{2} \\cdot 3 \\cdot 7'.
 * @param {Array<[number, number]>} factors
 */
export function factorTex(factors) {
  return factors.map(([p, e]) => (e === 1 ? String(p) : `${p}^{${e}}`)).join(' \\cdot ');
}

/**
 * The factors that build BCNN(a, b): every prime of a or b, each with its
 * largest exponent. Both numbers must be at least 2.
 * @param {number} a
 * @param {number} b
 * @returns {Array<[number, number]>}
 */
export function lcmFactors(a, b) {
  /** @type {Map<number, number>} */
  const best = new Map();
  for (const [p, e] of [...factorize(a), ...factorize(b)]) {
    best.set(p, Math.max(best.get(p) ?? 0, e));
  }
  return [...best.entries()].sort((x, y) => x[0] - y[0]);
}

/**
 * The factors that build ƯCLN(a, b): the common primes, each with its
 * smallest exponent. Empty when a and b are coprime.
 * @param {number} a
 * @param {number} b
 * @returns {Array<[number, number]>}
 */
export function gcdFactors(a, b) {
  const fb = new Map(factorize(b));
  /** @type {Array<[number, number]>} */
  const out = [];
  for (const [p, e] of factorize(a)) {
    const eb = fb.get(p);
    if (eb !== undefined) out.push([p, Math.min(e, eb)]);
  }
  return out;
}

/**
 * Product of a factor list.
 * @param {Array<[number, number]>} factors
 */
export function productOf(factors) {
  return factors.reduce((acc, [p, e]) => acc * p ** e, 1);
}
