/**
 * Numbers to 100 000 as the grade 4 review meets them: the five places
 * (chục nghìn, nghìn, trăm, chục, đơn vị), the book's reading, the sum of
 * places and rounding to thousands and ten thousands. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { DIGIT_WORDS, readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';

/**
 * The five places of a number from the left.
 * @type {ReadonlyArray<{ title: string, unit: string, value: number }>}
 */
export const PLACES5 = [
  { title: 'Chục nghìn', unit: 'chục nghìn', value: 10000 },
  { title: 'Nghìn', unit: 'nghìn', value: 1000 },
  { title: 'Trăm', unit: 'trăm', value: 100 },
  { title: 'Chục', unit: 'chục', value: 10 },
  { title: 'Đơn vị', unit: 'đơn vị', value: 1 },
];

/** The largest number of the review. */
export const TOP = 100000;

/**
 * How the book reads a number from 0 to 100 000: 61 034 is "sáu mươi mốt
 * nghìn không trăm ba mươi tư", 20 809 is "hai mươi nghìn tám trăm linh
 * chín". Any other value is written in digits.
 * @param {number} n
 * @returns {string}
 */
export function readTo100000(n) {
  if (!Number.isInteger(n) || n < 0 || n > TOP) return String(n);
  if (n === TOP) return 'một trăm nghìn';
  if (n < 1000) return readTo1000(n);
  const head = `${readNumber(Math.floor(n / 1000))} nghìn`;
  const rest = n % 1000;
  if (rest === 0) return head;
  if (rest >= 100) return `${head} ${readTo1000(rest)}`;
  if (rest >= 10) return `${head} không trăm ${readNumber(rest)}`;
  return `${head} không trăm linh ${DIGIT_WORDS[rest]}`;
}

/**
 * The digits of a number below 100 000 in the five places, from the left.
 * @param {number} n
 * @returns {number[]}
 */
export const columnsOf = (n) => PLACES5.map((p) => Math.floor(n / p.value) % 10);

/**
 * A number written as the sum of its places, the book's way:
 * "33 471 = 30 000 + 3 000 + 400 + 70 + 1". A zero place is left out, and a
 * number with one part stays as it is.
 * @param {number} n
 */
export function sumText(n) {
  const parts = PLACES5.map((p) => (Math.floor(n / p.value) % 10) * p.value).filter((v) => v > 0);
  return parts.length > 1 ? `${fmt(n)} = ${parts.map(fmt).join(' + ')}` : fmt(n);
}

/** @typedef {1000 | 10000} RoundUnit */

/**
 * A number rounded to thousands (1000) or ten thousands (10000) the book's
 * way: a deciding digit below 5 rounds down, 5 to 9 rounds up.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundTo(n, unit) {
  const low = Math.floor(n / unit) * unit;
  return n - low >= unit / 2 ? low + unit : low;
}

/**
 * Why `n` rounds the way it does, in one sentence.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundWhy(n, unit) {
  const look = unit === 1000 ? 'hàng trăm' : 'hàng nghìn';
  const target = unit === 1000 ? 'hàng nghìn' : 'hàng chục nghìn';
  const digit = Math.floor(n / (unit / 10)) % 10;
  const way = digit < 5 ? `${digit} < 5 nên làm tròn xuống` : `${digit} ≥ 5 nên làm tròn lên`;
  return `Chữ số ${look} là ${digit}, ${way}: làm tròn đến ${target} được ${fmt(roundTo(n, unit))}.`;
}
