/**
 * Natural numbers to 999 999 999 as grade 4 meets them: the nine places
 * (hàng đơn vị to hàng trăm triệu) grouped in three classes (lớp đơn vị,
 * lớp nghìn, lớp triệu), the book's reading class by class, the sum of
 * places, rounding and comparing. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';

/** The largest number of the chapter. */
export const TOP = 999999999;

/** Place names by power of ten: index 0 is hàng đơn vị, 8 is hàng trăm triệu. */
export const PLACE_NAMES = /** @type {const} */ ([
  'đơn vị',
  'chục',
  'trăm',
  'nghìn',
  'chục nghìn',
  'trăm nghìn',
  'triệu',
  'chục triệu',
  'trăm triệu',
]);

/** Class names by class index: 0 is lớp đơn vị, 1 lớp nghìn, 2 lớp triệu. */
export const CLASS_NAMES = /** @type {const} */ (['đơn vị', 'nghìn', 'triệu']);

/**
 * The column title of a place, with a capital: "Chục nghìn".
 * @param {number} exp power of ten, 0 to 8
 */
export const placeTitle = (exp) => PLACE_NAMES[exp][0].toUpperCase() + PLACE_NAMES[exp].slice(1);

/**
 * The class a place belongs to: 0, 1 or 2.
 * @param {number} exp
 */
export const classOf = (exp) => Math.floor(exp / 3);

/**
 * How many digits a natural number has; 0 has one.
 * @param {number} n
 */
export const digitCount = (n) => String(n).length;

/**
 * The digits of a number from the left, each with its power of ten.
 * @param {number} n
 * @returns {{ digit: number, exp: number }[]}
 */
export function digitsOf(n) {
  const text = String(n);
  return [...text].map((d, i) => ({ digit: Number(d), exp: text.length - 1 - i }));
}

/**
 * The digit of `n` at a place.
 * @param {number} n
 * @param {number} exp
 */
export const digitAt = (n, exp) => Math.floor(n / 10 ** exp) % 10;

/**
 * The value of the digit at a place: in 653 720 the 5 is worth 50 000.
 * @param {number} n
 * @param {number} exp
 */
export const valueAt = (n, exp) => digitAt(n, exp) * 10 ** exp;

/**
 * The classes of a number from the left: 304 028 102 gives the parts 304,
 * 028 and 102. `text` keeps the leading zeros of every class but the first,
 * as the number is written.
 * @param {number} n
 * @returns {{ cls: number, value: number, text: string }[]}
 */
export function classParts(n) {
  const count = Math.ceil(digitCount(n) / 3);
  const parts = [];
  for (let cls = count - 1; cls >= 0; cls--) {
    const value = Math.floor(n / 1000 ** cls) % 1000;
    const text = cls === count - 1 ? String(value) : String(value).padStart(3, '0');
    parts.push({ cls, value, text });
  }
  return parts;
}

/**
 * How the book reads one class of three digits. The first class is read as
 * it is ("ba trăm linh bốn"); a later one keeps its zero hundreds ("không
 * trăm hai mươi tám", "không trăm linh một"). A later class of 000 is not
 * read, so it gives ''.
 * @param {number} value 0 to 999
 * @param {boolean} leading whether it is the first class from the left
 */
export function readClass(value, leading) {
  if (leading || value >= 100) return readTo1000(value);
  if (value === 0) return '';
  if (value < 10) return `không trăm linh ${DIGIT_WORDS[value]}`;
  return `không trăm ${readNumber(value)}`;
}

/**
 * One class read with its name: "ba trăm linh bốn triệu", "không trăm hai
 * mươi tám nghìn", "một trăm linh hai". '' for a later class of 000.
 * @param {number} n
 * @param {number} cls
 */
export function readPart(n, cls) {
  const parts = classParts(n);
  const part = parts.find((p) => p.cls === cls);
  if (!part) return '';
  const words = readClass(part.value, part === parts[0]);
  if (words === '') return '';
  return cls === 0 ? words : `${words} ${CLASS_NAMES[cls]}`;
}

/**
 * How the book reads a number from 0 to 999 999 999, class by class from
 * the left: 109 140 903 is "một trăm linh chín triệu một trăm bốn mươi
 * nghìn chín trăm linh ba", 1 000 000 is "một triệu". Any other value is
 * written in digits.
 * @param {number} n
 * @returns {string}
 */
export function readBig(n) {
  if (!Number.isInteger(n) || n < 0 || n > TOP) return String(n);
  if (n === 0) return DIGIT_WORDS[0];
  return classParts(n)
    .map((p) => readPart(n, p.cls))
    .filter((w) => w !== '')
    .join(' ');
}

/**
 * A reading with a capital first letter, to start a sentence.
 * @param {number} n
 */
export function capitalBig(n) {
  const words = readBig(n);
  return words[0].toUpperCase() + words.slice(1);
}

/**
 * A number written as the sum of its places, the book's way:
 * "882 936 = 800 000 + 80 000 + 2 000 + 900 + 30 + 6". A zero place is left
 * out, and a number with one part stays as it is.
 * @param {number} n
 */
export function sumText(n) {
  const parts = digitsOf(n)
    .map(({ digit, exp }) => digit * 10 ** exp)
    .filter((v) => v > 0);
  return parts.length > 1 ? `${fmt(n)} = ${parts.map(fmt).join(' + ')}` : fmt(n);
}

/**
 * A number rounded to a place the book's way: the digit just to the right
 * decides, below 5 rounds down, 5 to 9 rounds up.
 * @param {number} n
 * @param {number} unit 10, 100, ... 100 000 000
 */
export function roundTo(n, unit) {
  const low = Math.floor(n / unit) * unit;
  return n - low >= unit / 2 ? low + unit : low;
}

/**
 * Why `n` rounds the way it does, in one sentence: "Chữ số hàng chục nghìn
 * là 7, 7 > 5 nên làm tròn lên: làm tròn đến hàng trăm nghìn được 3 300 000."
 * @param {number} n
 * @param {number} unit
 */
export function roundWhy(n, unit) {
  const exp = Math.round(Math.log10(unit));
  const digit = digitAt(n, exp - 1);
  const sign = digit < 5 ? '<' : digit === 5 ? '=' : '>';
  const way = digit < 5 ? 'làm tròn xuống' : 'làm tròn lên';
  return `Chữ số hàng ${PLACE_NAMES[exp - 1]} là ${digit}, ${digit} ${sign} 5 nên ${way}: làm tròn đến hàng ${PLACE_NAMES[exp]} được ${fmt(roundTo(n, unit))}.`;
}

/**
 * The first place from the left where two numbers with the same count of
 * digits differ, or null when they differ in length or are equal.
 * @param {number} a
 * @param {number} b
 * @returns {number | null} the power of ten of that place
 */
export function firstDiff(a, b) {
  if (digitCount(a) !== digitCount(b) || a === b) return null;
  for (let exp = digitCount(a) - 1; exp >= 0; exp--) {
    if (digitAt(a, exp) !== digitAt(b, exp)) return exp;
  }
  return null;
}

/**
 * Why `a ? b` holds, the book's way: more digits is greater; with as many
 * digits, the first place from the left that differs decides.
 * @param {number} a
 * @param {number} b
 */
export function compareWhy(a, b) {
  const sign = compareSign(a, b);
  const result = `Vậy ${fmt(a)} ${sign} ${fmt(b)}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
  const ca = digitCount(a);
  const cb = digitCount(b);
  if (ca !== cb) {
    return `${fmt(a)} có ${ca} chữ số, ${fmt(b)} có ${cb} chữ số. ${result}`;
  }
  const exp = /** @type {number} */ (firstDiff(a, b));
  const p = digitAt(a, exp);
  const q = digitAt(b, exp);
  const lead = exp === ca - 1 ? '' : 'Các hàng bên trái giống nhau. ';
  return `Hai số cùng có ${ca} chữ số. ${lead}Ở hàng ${PLACE_NAMES[exp]}: ${p} ${SIGN_WORDS[compareSign(p, q)]} ${q}. ${result}`;
}
