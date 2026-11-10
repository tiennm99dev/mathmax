/**
 * Numbers to 100 000 the way the year-end review of grade 3 uses them:
 * reading aloud, the sum of places, rounding to thousands and ten
 * thousands, and Roman numerals to XX. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { DIGIT_WORDS, readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';

/**
 * How the book reads a number from 0 to 100 000: 9 084 is "chín nghìn không
 * trăm tám mươi tư", 61 409 is "sáu mươi mốt nghìn bốn trăm linh chín",
 * 92 007 is "chín mươi hai nghìn không trăm linh bảy".
 * @param {number} n
 * @returns {string}
 */
export function readTo100000(n) {
  if (!Number.isInteger(n) || n < 0 || n > 100000) return fmt(n);
  if (n === 100000) return 'một trăm nghìn';
  if (n < 1000) return readTo1000(n);
  const head = `${readNumber(Math.floor(n / 1000))} nghìn`;
  const rest = n % 1000;
  if (rest === 0) return head;
  if (rest >= 100) return `${head} ${readTo1000(rest)}`;
  if (rest >= 10) return `${head} không trăm ${readNumber(rest)}`;
  return `${head} không trăm linh ${DIGIT_WORDS[rest]}`;
}

/**
 * The places of a number that are not zero, largest first: 46 109 gives
 * [40000, 6000, 100, 9].
 * @param {number} n
 * @returns {number[]}
 */
export function sumParts(n) {
  return [10000, 1000, 100, 10, 1]
    .map((place) => Math.floor((n % (place * 10)) / place) * place)
    .filter((v) => v > 0);
}

/**
 * "8 327 = 8 000 + 300 + 20 + 7".
 * @param {number} n
 */
export function sumText(n) {
  return `${fmt(n)} = ${sumParts(n).map(fmt).join(' + ')}`;
}

/** @typedef {1000 | 10000} RoundUnit */

/**
 * A number rounded to thousands or ten thousands: a deciding digit below 5
 * rounds down, 5 to 9 rounds up.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundTo(n, unit) {
  const low = Math.floor(n / unit) * unit;
  return n - low >= unit / 2 ? low + unit : low;
}

/**
 * Why `n` rounds the way it does.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundWhy(n, unit) {
  const look = unit === 1000 ? 'hàng trăm' : 'hàng nghìn';
  const target = unit === 1000 ? 'hàng nghìn' : 'hàng chục nghìn';
  const digit = Math.floor(n / (unit / 10)) % 10;
  const way = digit < 5 ? `${digit} < 5 nên làm tròn xuống` : `${digit} ≥ 5 nên làm tròn lên`;
  return `Chữ số ${look} của ${fmt(n)} là ${digit}, ${way}. Làm tròn ${fmt(n)} đến ${target} được ${fmt(roundTo(n, unit))}.`;
}

/**
 * A number from 1 to 20 in Roman numerals, with I, V and X as grade 3 learns
 * them: 4 is IV, 9 is IX, 14 is XIV, 19 is XIX.
 * @param {number} n
 */
export function roman(n) {
  const tens = 'X'.repeat(Math.floor(n / 10));
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][n % 10];
  return tens + ones;
}

/** The places from ten thousands down, for comparing. */
const PLACE_NAMES = ['chục nghìn', 'nghìn', 'trăm', 'chục', 'đơn vị'];

/**
 * Why `a ? b` holds, the book's way: the number with fewer digits is smaller;
 * with as many digits, compare place by place from the left.
 * @param {number} a
 * @param {number} b
 */
export function compareWhy(a, b) {
  const sign = a > b ? '>' : a < b ? '<' : '=';
  const result = `Vậy ${fmt(a)} ${sign} ${fmt(b)}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
  const sa = String(a);
  const sb = String(b);
  if (sa.length !== sb.length) {
    const [few, many] = sa.length < sb.length ? [a, b] : [b, a];
    return `${fmt(few)} có ${DIGIT_WORDS[String(few).length]} chữ số, ${fmt(many)} có ${DIGIT_WORDS[String(many).length]} chữ số. Số có ít chữ số hơn thì bé hơn. ${result}`;
  }
  const i = [...sa].findIndex((d, k) => d !== sb[k]);
  const place = PLACE_NAMES[5 - sa.length + i];
  const p = Number(sa[i]);
  const q = Number(sb[i]);
  const lead = i === 0 ? '' : 'Các hàng bên trái giống nhau. ';
  return `${lead}Ở hàng ${place}: ${p} ${p > q ? 'lớn hơn' : 'bé hơn'} ${q}. ${result}`;
}
