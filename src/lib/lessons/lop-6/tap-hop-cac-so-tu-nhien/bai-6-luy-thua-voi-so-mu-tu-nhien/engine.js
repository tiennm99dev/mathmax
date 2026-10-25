/**
 * Powers with natural exponents: aⁿ is the product of n factors equal to a,
 * with a¹ = a and, for a ≠ 0, a⁰ = 1. The widget's "multiplying machine"
 * multiplies a pile of blocks by a again and again, and the product and
 * quotient models show why aᵐ · aⁿ = aᵐ⁺ⁿ and aᵐ : aⁿ = aᵐ⁻ⁿ.
 */

import { fmt, powText } from '#lib/core/number-format.js';

/**
 * @param {number} n
 * @param {string} name
 */
function natural(n, name) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`${name} phải là số tự nhiên`);
}

/**
 * aⁿ for natural a and n (0⁰ is left undefined, as in the book).
 * @param {number} a
 * @param {number} n
 */
export function power(a, n) {
  natural(a, 'Cơ số');
  natural(n, 'Số mũ');
  if (a === 0 && n === 0) throw new RangeError('0⁰ không được định nghĩa');
  return a ** n;
}

/**
 * The product written out: (2, 4) → '2 · 2 · 2 · 2'; (2, 1) → '2';
 * (2, 0) → '1'.
 * @param {number} a
 * @param {number} n
 */
export function expansion(a, n) {
  natural(n, 'Số mũ');
  return n === 0 ? '1' : Array(n).fill(fmt(a)).join(' · ');
}

/**
 * One line of the machine: 2⁴ = 2 · 2 · 2 · 2 = 16.
 * @param {number} a
 * @param {number} n
 */
export function powerLine(a, n) {
  const value = fmt(power(a, n));
  if (n === 0) return `${powText(a, 0)} = 1 (quy ước)`;
  if (n === 1) return `${powText(a, 1)} = ${value}`;
  return `${powText(a, n)} = ${expansion(a, n)} = ${value}`;
}

/**
 * Which copy each block belongs to when aⁿ blocks are seen as a copies of
 * the previous pile aⁿ⁻¹: block i lies in copy ⌊i / aⁿ⁻¹⌋.
 * @param {number} a
 * @param {number} n
 * @returns {number[]}
 */
export function blockCopies(a, n) {
  const total = power(a, n);
  if (n === 0) return [0];
  const size = power(a, n - 1);
  return Array.from({ length: total }, (_, i) => Math.floor(i / size));
}

/**
 * aᵐ · aⁿ as a row of factors: m from the first power, n from the second.
 * @param {number} a
 * @param {number} m
 * @param {number} n
 */
export function productModel(a, m, n) {
  const exponent = m + n;
  return {
    factors: [...Array(m).fill('m'), ...Array(n).fill('n')],
    exponent,
    left: power(a, m),
    right: power(a, n),
    value: power(a, exponent),
    equation: `${powText(a, m)} · ${powText(a, n)} = ${powText(a, exponent)}`,
    check: `${fmt(power(a, m))} · ${fmt(power(a, n))} = ${fmt(power(a, exponent))}`,
  };
}

/**
 * aᵐ : aⁿ (a ≠ 0, m ≥ n): of the m factors, n are cancelled by the divisor.
 * @param {number} a
 * @param {number} m
 * @param {number} n
 */
export function quotientModel(a, m, n) {
  if (a === 0) throw new RangeError('Cơ số phải khác 0');
  if (n > m) throw new RangeError('Số mũ của số chia không được lớn hơn số mũ của số bị chia');
  const exponent = m - n;
  return {
    factors: Array.from({ length: m }, (_, i) => (i < n ? 'cancelled' : 'kept')),
    exponent,
    value: power(a, exponent),
    equation: `${powText(a, m)} : ${powText(a, n)} = ${powText(a, exponent)}`,
    check: `${fmt(power(a, m))} : ${fmt(power(a, n))} = ${fmt(power(a, exponent))}`,
  };
}

/**
 * Is n a perfect square (số chính phương), the square of a natural number?
 * @param {number} n
 */
export function isSquare(n) {
  natural(n, 'Số');
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}
