/**
 * The symmetric divisor grid: the integers 1 to n sit in one row and their
 * opposites −1 to −n right below, so that d and −d share a column. In
 * divisor mode the learner looks for the divisors of a chosen integer a; in
 * multiple mode, for the multiples of b between −30 and 30. Every tap is
 * explained with the equality a = b · q that makes it a divisor or multiple.
 */

import { intText, operand } from '#lib/core/number-format.js';

/** @typedef {'uoc' | 'boi'} Mode */

/** Numbers whose divisors the grid can show. */
export const DIVISOR_CHOICES = [12, -18, 20, -24, 36, -15, 13, -1];

/** Numbers whose multiples the grid can show. */
export const MULTIPLE_CHOICES = [3, -4, 5, -6, 7, -10];

/** In multiple mode the grid runs from −MULTIPLE_LIMIT to MULTIPLE_LIMIT. */
export const MULTIPLE_LIMIT = 30;

/**
 * Whether d divides a, for integers with d ≠ 0.
 * @param {number} a
 * @param {number} d
 */
const divides = (d, a) => d !== 0 && Math.abs(a) % Math.abs(d) === 0;

/**
 * How far the grid reaches on each side of 0.
 * @param {Mode} mode
 * @param {number} value a in divisor mode, b in multiple mode
 */
export function reach(mode, value) {
  return mode === 'uoc' ? Math.abs(value) : MULTIPLE_LIMIT;
}

/**
 * Whether the integer d is what the learner is looking for.
 * @param {Mode} mode
 * @param {number} value
 * @param {number} d
 */
export function isTarget(mode, value, d) {
  return mode === 'uoc' ? divides(d, value) : divides(value, d);
}

/**
 * Every target on the grid, in increasing order.
 * @param {Mode} mode
 * @param {number} value
 */
export function targets(mode, value) {
  const n = reach(mode, value);
  const out = [];
  for (let d = -n; d <= n; d++) if (isTarget(mode, value, d)) out.push(d);
  return out;
}

/**
 * The positive divisors of a non-zero integer.
 * @param {number} a
 */
export function positiveDivisors(a) {
  const n = Math.abs(a);
  const out = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d);
  return out;
}

/**
 * Why a tapped integer is, or is not, a divisor or multiple.
 * @param {Mode} mode
 * @param {number} value
 * @param {number} d
 */
export function explain(mode, value, d) {
  if (mode === 'uoc') {
    const a = value;
    if (d === 0) return '0 không là ước của bất kì số nguyên nào: không có phép chia cho 0.';
    if (divides(d, a)) {
      const q = a / d;
      return `${intText(a)} = ${operand(d)} · ${operand(q)}, nên ${intText(a)} : ${operand(d)} = ${intText(q)}. Vậy ${intText(d)} là một ước của ${intText(a)}.`;
    }
    return `${Math.abs(a)} không chia hết cho ${Math.abs(d)}, nên ${intText(a)} không chia hết cho ${operand(d)}: ${intText(d)} không là ước của ${intText(a)}.`;
  }
  const b = value;
  if (d === 0)
    return `0 = ${operand(b)} · 0, nên 0 là bội của ${intText(b)} (0 là bội của mọi số nguyên khác 0).`;
  if (divides(b, d)) {
    const k = d / b;
    return `${intText(d)} = ${operand(b)} · ${operand(k)}, nên ${intText(d)} là một bội của ${intText(b)}.`;
  }
  return `${Math.abs(d)} không chia hết cho ${Math.abs(b)}, nên ${intText(d)} không là bội của ${intText(b)}.`;
}

/**
 * The finished set written the book's way: Ư(−12) = {−12; −6; …; 12} or
 * the multiples of b on the grid.
 * @param {Mode} mode
 * @param {number} value
 */
export function setText(mode, value) {
  const list = targets(mode, value).map(intText).join('; ');
  return mode === 'uoc'
    ? `Ư(${intText(value)}) = {${list}}`
    : `Các bội của ${intText(value)} từ −${MULTIPLE_LIMIT} đến ${MULTIPLE_LIMIT}: ${list}`;
}

/**
 * Adds the opposite of every integer found so far: if d is a divisor of a
 * (a multiple of b), so is −d.
 * @param {Iterable<number>} found
 */
export function withOpposites(found) {
  const out = new Set(found);
  for (const d of found) out.add(-d);
  return out;
}

/**
 * Progress in words.
 * @param {Mode} mode
 * @param {number} value
 * @param {Set<number>} found
 */
export function progress(mode, value, found) {
  const all = targets(mode, value);
  const got = all.filter((d) => found.has(d)).length;
  const what = mode === 'uoc' ? `ước của ${intText(value)}` : `bội của ${intText(value)} trên lưới`;
  if (got === all.length) return `Hoàn thành! ${setText(mode, value)}.`;
  return `Em đã tìm được ${got} trên ${all.length} ${what}.`;
}
