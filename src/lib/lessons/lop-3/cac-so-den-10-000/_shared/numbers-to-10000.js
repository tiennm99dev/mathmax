/**
 * Numbers to 10 000 as grade 3 meets them: the four places (nghìn, trăm,
 * chục, đơn vị), how a number is read aloud the book's way, its sum of
 * places, how two numbers compare, rounding to tens and hundreds, and the
 * Roman numerals I to XX. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';

/** @typedef {'thousands' | 'hundreds' | 'tens' | 'ones'} Place4 */
/** @typedef {Record<Place4, number>} Digits */

/**
 * The four places of a number from the left, with the block that stands for
 * each one.
 * @type {ReadonlyArray<{ key: Place4, title: string, unit: string, block: import('#lib/core/kid/place-value.js').BlockKind, blockName: string, value: number }>}
 */
export const PLACES4 = [
  {
    key: 'thousands',
    title: 'Nghìn',
    unit: 'nghìn',
    block: 'nghin',
    blockName: 'khối nghìn',
    value: 1000,
  },
  {
    key: 'hundreds',
    title: 'Trăm',
    unit: 'trăm',
    block: 'tram',
    blockName: 'tấm trăm',
    value: 100,
  },
  { key: 'tens', title: 'Chục', unit: 'chục', block: 'chuc', blockName: 'thanh chục', value: 10 },
  {
    key: 'ones',
    title: 'Đơn vị',
    unit: 'đơn vị',
    block: 'don-vi',
    blockName: 'khối đơn vị',
    value: 1,
  },
];

/** The largest number of the chapter. */
export const TOP = 10000;

/**
 * How the book reads a number from 0 to 10 000: 3067 is "ba nghìn không
 * trăm sáu mươi bảy", 4007 is "bốn nghìn không trăm linh bảy", 6302 is "sáu
 * nghìn ba trăm linh hai", 10 000 is "mười nghìn". Any other value is
 * written in digits.
 * @param {number} n
 * @returns {string}
 */
export function readTo10000(n) {
  if (!Number.isInteger(n) || n < 0 || n > TOP) return String(n);
  if (n === TOP) return 'mười nghìn';
  if (n < 1000) return readTo1000(n);
  const head = `${DIGIT_WORDS[Math.floor(n / 1000)]} nghìn`;
  const rest = n % 1000;
  if (rest === 0) return head;
  if (rest >= 100) return `${head} ${readTo1000(rest)}`;
  if (rest >= 10) return `${head} không trăm ${readNumber(rest)}`;
  return `${head} không trăm linh ${DIGIT_WORDS[rest]}`;
}

/**
 * A reading with its first letter in upper case, to start a sentence.
 * @param {number} n
 */
export function capitalReading10000(n) {
  const text = readTo10000(n);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Thousands, hundreds, tens and ones of a number; 10 000 has 10 thousands.
 * @param {number} n
 * @returns {Digits}
 */
export function digitsOf(n) {
  return {
    thousands: Math.floor(n / 1000),
    hundreds: Math.floor((n % 1000) / 100),
    tens: Math.floor((n % 100) / 10),
    ones: n % 10,
  };
}

/**
 * The value of some thousands, hundreds, tens and ones.
 * @param {Digits} d
 */
export function valueOfDigits(d) {
  return d.thousands * 1000 + d.hundreds * 100 + d.tens * 10 + d.ones;
}

/**
 * "3 nghìn, 0 trăm, 6 chục, 7 đơn vị".
 * @param {number} n
 */
export function placesText4(n) {
  const d = digitsOf(n);
  return PLACES4.map((p) => `${d[p.key]} ${p.unit}`).join(', ');
}

/**
 * The places of a number that are not zero: 5701 gives [5000, 700, 1].
 * @param {number} n
 * @returns {number[]}
 */
export function sumParts4(n) {
  const d = digitsOf(n);
  return PLACES4.map((p) => d[p.key] * p.value).filter((v) => v > 0);
}

/**
 * A number written as the sum of its places, the book's way:
 * "3 892 = 3 000 + 800 + 90 + 2". A number with one part stays as it is.
 * @param {number} n
 */
export function sumText4(n) {
  const parts = sumParts4(n);
  return parts.length > 1 ? `${fmt(n)} = ${parts.map(fmt).join(' + ')}` : fmt(n);
}

/** Number of digits of a natural number. @param {number} n */
export const digitCount = (n) => String(n).length;

/**
 * The first place from the left where two numbers of four digits differ, or
 * null when they are equal or do not both have four digits.
 * @param {number} a
 * @param {number} b
 * @returns {Place4 | null}
 */
export function decidingPlace4(a, b) {
  if (digitCount(a) !== 4 || digitCount(b) !== 4) return null;
  const x = digitsOf(a);
  const y = digitsOf(b);
  return PLACES4.find((p) => x[p.key] !== y[p.key])?.key ?? null;
}

/**
 * Why `a ? b` holds, the book's way: the number with fewer digits is smaller;
 * with as many digits, compare place by place from the left.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareWhy4(a, b) {
  const result = `Vậy ${fmt(a)} ${compareSign(a, b)} ${fmt(b)}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
  const ca = digitCount(a);
  const cb = digitCount(b);
  if (ca !== cb) {
    const [long, short] = ca > cb ? [a, b] : [b, a];
    return `${fmt(long)} có ${DIGIT_WORDS[digitCount(long)]} chữ số, ${fmt(short)} có ${DIGIT_WORDS[digitCount(short)]} chữ số. Số nào có ít chữ số hơn thì bé hơn. ${result}`;
  }
  const places = PLACES4.slice(4 - ca);
  const x = digitsOf(a);
  const y = digitsOf(b);
  const i = places.findIndex((p) => x[p.key] !== y[p.key]);
  const place = places[i];
  const p = x[place.key];
  const q = y[place.key];
  const same = places
    .slice(0, i)
    .map((earlier) => `hàng ${earlier.unit}`)
    .join(', ');
  const lead = i === 0 ? '' : `${same.charAt(0).toUpperCase()}${same.slice(1)} giống nhau. `;
  return `${lead}Ở hàng ${place.unit}: ${p} ${SIGN_WORDS[compareSign(p, q)]} ${q}. ${result}`;
}

/**
 * A number rounded to tens (`unit` 10) or hundreds (`unit` 100), the book's
 * way: a digit below 5 rounds down, 5 to 9 rounds up.
 * @param {number} n
 * @param {10 | 100} unit
 */
export function roundTo(n, unit) {
  const low = Math.floor(n / unit) * unit;
  return n - low >= unit / 2 ? low + unit : low;
}

/**
 * The digit that decides a rounding: the ones digit for tens, the tens digit
 * for hundreds.
 * @param {number} n
 * @param {10 | 100} unit
 */
export function roundingDigit(n, unit) {
  return Math.floor(n / (unit / 10)) % 10;
}

/**
 * Why `n` rounds the way it does, the book's sentence.
 * @param {number} n
 * @param {10 | 100} unit
 */
export function roundWhy(n, unit) {
  const digit = roundingDigit(n, unit);
  const placeName = unit === 10 ? 'đơn vị' : 'chục';
  const target = unit === 10 ? 'hàng chục' : 'hàng trăm';
  const r = roundTo(n, unit);
  const way =
    digit < 5 ? `${digit} < 5 nên làm tròn xuống` : `${digit} không bé hơn 5 nên làm tròn lên`;
  if (r === n) return `${fmt(n)} đã tròn ${unit === 10 ? 'chục' : 'trăm'}, giữ nguyên ${fmt(n)}.`;
  return `Chữ số hàng ${placeName} của ${fmt(n)} là ${digit}, ${way}. Làm tròn ${fmt(n)} đến ${target} được ${fmt(r)}.`;
}

/** The three Roman numerals of grade 3 with their values. */
export const ROMAN_DIGITS = /** @type {const} */ ([
  { letter: 'I', value: 1 },
  { letter: 'V', value: 5 },
  { letter: 'X', value: 10 },
]);

/**
 * A number from 1 to 39 in Roman numerals: 4 is IV, 9 is IX, 14 is XIV.
 * @param {number} n
 * @returns {string}
 */
export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 39) return '';
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  return 'X'.repeat(Math.floor(n / 10)) + ones[n % 10];
}

/**
 * The value of a Roman numeral made of I, V and X, or null when it is not
 * written the right way (IIII, VV, IIV, VX).
 * @param {string} text
 * @returns {number | null}
 */
export function fromRoman(text) {
  if (!/^[IVX]+$/.test(text)) return null;
  for (let n = 1; n <= 39; n++) if (toRoman(n) === text) return n;
  return null;
}

/**
 * The value a row of Roman letters would add up to by the book's rule (a
 * smaller letter before a bigger one is taken away), even when it is not
 * written the right way; 0 for an empty row.
 * @param {string} text
 */
export function romanSum(text) {
  /** @type {number[]} */
  const values = [...text].map((c) => ROMAN_DIGITS.find((d) => d.letter === c)?.value ?? 0);
  return values.reduce((sum, v, i) => (v < (values[i + 1] ?? 0) ? sum - v : sum + v), 0);
}

/** Matchsticks a Roman letter takes: I is one, V and X are two. @param {string} text */
export function sticksOf(text) {
  return [...text].reduce((n, c) => n + (c === 'I' ? 1 : 2), 0);
}
