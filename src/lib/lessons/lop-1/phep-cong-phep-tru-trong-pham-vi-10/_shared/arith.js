/**
 * Addition and subtraction within 10 written the way a grade 1 book prints
 * and reads them: "3 + 2 = 5", read "ba cộng hai bằng năm", with the book's
 * minus sign "−". Pure and DOM-free.
 */
import { MINUS } from '#lib/core/number-format.js';

/** Largest number of the chapter. */
export const TOP = 10;

/** Number words, indexed by value. */
export const NUMBER_WORDS = /** @type {const} */ ([
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
]);

/**
 * The word for a number from 0 to 10.
 * @param {number} n
 */
export function wordOf(n) {
  return NUMBER_WORDS[n] ?? String(n);
}

/**
 * An addition as printed: "3 + 2 = 5".
 * @param {number} a
 * @param {number} b
 */
export function addText(a, b) {
  return `${a} + ${b} = ${a + b}`;
}

/**
 * A subtraction as printed: "5 − 2 = 3".
 * @param {number} a
 * @param {number} b
 */
export function subText(a, b) {
  return `${a} ${MINUS} ${b} = ${a - b}`;
}

/**
 * How an addition is read aloud: "ba cộng hai bằng năm".
 * @param {number} a
 * @param {number} b
 */
export function addWords(a, b) {
  return `${wordOf(a)} cộng ${wordOf(b)} bằng ${wordOf(a + b)}`;
}

/**
 * How a subtraction is read aloud: "năm trừ hai bằng ba".
 * @param {number} a
 * @param {number} b
 */
export function subWords(a, b) {
  return `${wordOf(a)} trừ ${wordOf(b)} bằng ${wordOf(a - b)}`;
}

/**
 * Keeps a whole number within lo..hi.
 * @param {number} v
 * @param {number} lo
 * @param {number} hi
 */
export function clampInt(v, lo, hi) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

/**
 * The two subtractions that undo an addition a + b = c: c − b = a and
 * c − a = b (one only when a and b are equal).
 * @param {number} a
 * @param {number} b
 * @returns {string[]}
 */
export function relatedSubtractions(a, b) {
  const c = a + b;
  const facts = [subText(c, b)];
  if (a !== b) facts.push(subText(c, a));
  return facts;
}
