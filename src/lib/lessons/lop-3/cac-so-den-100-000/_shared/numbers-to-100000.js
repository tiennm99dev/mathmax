/**
 * Numbers to 100 000 as grade 3 meets them: the five places (chục nghìn,
 * nghìn, trăm, chục, đơn vị), how a number is read aloud the book's way, its
 * sum of places, how two numbers compare and rounding to thousands and ten
 * thousands. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';

/** @typedef {'tenThousands' | 'thousands' | 'hundreds' | 'tens' | 'ones'} Place5 */
/** @typedef {Record<Place5, number>} Digits5 */

/**
 * The five places of a number from the left.
 * @type {ReadonlyArray<{ key: Place5, title: string, unit: string, value: number }>}
 */
export const PLACES5 = [
  { key: 'tenThousands', title: 'Chục nghìn', unit: 'chục nghìn', value: 10000 },
  { key: 'thousands', title: 'Nghìn', unit: 'nghìn', value: 1000 },
  { key: 'hundreds', title: 'Trăm', unit: 'trăm', value: 100 },
  { key: 'tens', title: 'Chục', unit: 'chục', value: 10 },
  { key: 'ones', title: 'Đơn vị', unit: 'đơn vị', value: 1 },
];

/** The largest number of the chapter. */
export const TOP = 100000;

/**
 * How the book reads a number from 0 to 100 000: 42 316 is "bốn mươi hai
 * nghìn ba trăm mười sáu", 24 105 is "hai mươi tư nghìn một trăm linh năm",
 * 70 040 is "bảy mươi nghìn không trăm bốn mươi", 100 000 is "một trăm
 * nghìn". Any other value is written in digits.
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
 * Ten thousands, thousands, hundreds, tens and ones of a number; 100 000
 * has 10 ten thousands.
 * @param {number} n
 * @returns {Digits5}
 */
export function digitsOf5(n) {
  return {
    tenThousands: Math.floor(n / 10000),
    thousands: Math.floor((n % 10000) / 1000),
    hundreds: Math.floor((n % 1000) / 100),
    tens: Math.floor((n % 100) / 10),
    ones: n % 10,
  };
}

/**
 * "4 chục nghìn, 2 nghìn, 3 trăm, 1 chục, 6 đơn vị".
 * @param {number} n
 */
export function placesText5(n) {
  const d = digitsOf5(n);
  return PLACES5.map((p) => `${d[p.key]} ${p.unit}`).join(', ');
}

/**
 * The places of a number that are not zero: 50 701 gives [50000, 700, 1].
 * @param {number} n
 * @returns {number[]}
 */
export function sumParts5(n) {
  const d = digitsOf5(n);
  return PLACES5.map((p) => d[p.key] * p.value).filter((v) => v > 0);
}

/**
 * A number written as the sum of its places, the book's way:
 * "45 321 = 40 000 + 5 000 + 300 + 20 + 1". A number with one part stays
 * as it is.
 * @param {number} n
 */
export function sumText5(n) {
  const parts = sumParts5(n);
  return parts.length > 1 ? `${fmt(n)} = ${parts.map(fmt).join(' + ')}` : fmt(n);
}

/** Number of digits of a natural number. @param {number} n */
export const digitCount = (n) => String(n).length;

/**
 * Why `a ? b` holds, the book's way: the number with fewer digits is
 * smaller; with as many digits, compare place by place from the left.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareWhy5(a, b) {
  const result = `Vậy ${fmt(a)} ${compareSign(a, b)} ${fmt(b)}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
  const ca = digitCount(a);
  const cb = digitCount(b);
  if (ca !== cb) {
    const [long, short] = ca > cb ? [a, b] : [b, a];
    return `${fmt(long)} có ${DIGIT_WORDS[digitCount(long)]} chữ số, ${fmt(short)} có ${DIGIT_WORDS[digitCount(short)]} chữ số. Số nào có ít chữ số hơn thì bé hơn. ${result}`;
  }
  const places = PLACES5.slice(Math.max(0, 5 - ca));
  const x = digitsOf5(a);
  const y = digitsOf5(b);
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

/** @typedef {1000 | 10000} RoundUnit */

/**
 * A number rounded to thousands (`unit` 1000) or ten thousands (`unit`
 * 10000), the book's way: a deciding digit below 5 rounds down, 5 to 9
 * rounds up.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundTo(n, unit) {
  const low = Math.floor(n / unit) * unit;
  return n - low >= unit / 2 ? low + unit : low;
}

/**
 * The digit that decides a rounding: the hundreds digit for thousands, the
 * thousands digit for ten thousands.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundingDigit(n, unit) {
  return Math.floor(n / (unit / 10)) % 10;
}

/**
 * The place a rounding looks at and the place it rounds to.
 * @param {RoundUnit} unit
 */
export function roundingPlaces(unit) {
  return unit === 1000
    ? { look: 'hàng trăm', target: 'hàng nghìn', round: 'tròn nghìn' }
    : { look: 'hàng nghìn', target: 'hàng chục nghìn', round: 'tròn chục nghìn' };
}

/**
 * Why `n` rounds the way it does, the book's sentence.
 * @param {number} n
 * @param {RoundUnit} unit
 */
export function roundWhy(n, unit) {
  const { look, target, round } = roundingPlaces(unit);
  const digit = roundingDigit(n, unit);
  const r = roundTo(n, unit);
  if (n % unit === 0) return `${fmt(n)} là số ${round}, giữ nguyên ${fmt(n)}.`;
  const way =
    digit < 5 ? `${digit} < 5 nên làm tròn xuống` : `${digit} không bé hơn 5 nên làm tròn lên`;
  return `Chữ số ${look} của ${fmt(n)} là ${digit}, ${way}. Làm tròn ${fmt(n)} đến ${target} được ${fmt(r)}.`;
}
