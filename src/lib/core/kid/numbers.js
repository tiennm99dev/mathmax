/**
 * Numbers to 100 as a grade 1-2 child meets them: how a number is read aloud,
 * its tens and ones, counting sticks, how two numbers compare, and additions
 * and subtractions written and read the book's way ("3 + 2 = 5", read "ba
 * cộng hai bằng năm", with the book's minus sign "−"). Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { MINUS } from '#lib/core/number-format.js';

/** Words for the digits 0 to 9. */
export const DIGIT_WORDS = /** @type {const} */ ([
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
]);

/**
 * How the book reads a number from 0 to 100: 15 is "mười lăm", 21 is
 * "hai mươi mốt", 24 is "hai mươi tư", 100 is "một trăm". Any other value is
 * written in digits.
 * @param {number} n
 * @returns {string}
 */
export function readNumber(n) {
  if (!Number.isInteger(n) || n < 0 || n > 100) return String(n);
  if (n === 100) return 'một trăm';
  if (n < 10) return DIGIT_WORDS[n];
  const t = Math.floor(n / 10);
  const u = n % 10;
  const head = t === 1 ? 'mười' : `${DIGIT_WORDS[t]} mươi`;
  if (u === 0) return head;
  if (u === 5) return `${head} lăm`;
  if (u === 1 && t > 1) return `${head} mốt`;
  if (u === 4 && t > 1) return `${head} tư`;
  return `${head} ${DIGIT_WORDS[u]}`;
}

/**
 * Every reading a child may give: the book's, plus "bốn" for a final 4
 * after "mươi" ("hai mươi bốn"), which is also correct.
 * @param {number} n
 * @returns {string[]}
 */
export function readings(n) {
  const main = readNumber(n);
  if (n > 20 && n < 100 && n % 10 === 4) return [main, main.replace(/ tư$/, ' bốn')];
  return [main];
}

/**
 * A reading with its first letter in upper case, to start a sentence.
 * @param {number} n
 */
export function capitalReading(n) {
  const w = readNumber(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/**
 * Tens and ones of a number from 0 to 99.
 * @param {number} n
 * @returns {{ tens: number, ones: number }}
 */
export function tensOnes(n) {
  return { tens: Math.floor(n / 10), ones: n % 10 };
}

/**
 * "2 chục và 5 đơn vị", leaving out a zero part ("3 chục", "7 đơn vị").
 * @param {number} tens
 * @param {number} ones
 */
export function placeText(tens, ones) {
  if (tens === 0) return `${ones} đơn vị`;
  if (ones === 0) return `${tens} chục`;
  return `${tens} chục và ${ones} đơn vị`;
}

/**
 * "4 chục và 1 que rời", "4 chục" or "5 que rời": the counting sticks of a
 * number from 0 to 99.
 * @param {number} n
 */
export function sticksWords(n) {
  const { tens, ones } = tensOnes(n);
  if (tens === 0) return `${ones} que rời`;
  if (ones === 0) return `${tens} chục`;
  return `${tens} chục và ${ones} que rời`;
}

/** Comparison signs in the order the buttons show them. */
export const SIGNS = /** @type {const} */ (['>', '<', '=']);

/** @typedef {(typeof SIGNS)[number]} Sign */

/** Words for each sign, for sentences and screen readers. */
export const SIGN_WORDS = /** @type {const} */ ({ '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' });

/**
 * @param {number} a
 * @param {number} b
 * @returns {Sign}
 */
export function compareSign(a, b) {
  if (a === b) return '=';
  return a > b ? '>' : '<';
}

/**
 * Why `a ? b` holds, the book's way: compare the tens first, and only when
 * they are equal compare the ones. Works for numbers from 0 to 99.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareReason(a, b) {
  const x = tensOnes(a);
  const y = tensOnes(b);
  const sign = compareSign(a, b);
  const result = `${a} ${sign} ${b}`;
  if (x.tens !== y.tens) {
    const s = compareSign(x.tens, y.tens);
    return `Hàng chục: ${x.tens} chục ${SIGN_WORDS[s]} ${y.tens} chục. Vậy ${result}.`;
  }
  if (x.ones !== y.ones) {
    const s = compareSign(x.ones, y.ones);
    return `Hàng chục bằng nhau (${x.tens} chục). Hàng đơn vị: ${x.ones} ${SIGN_WORDS[s]} ${y.ones}. Vậy ${result}.`;
  }
  return `Hàng chục và hàng đơn vị đều bằng nhau. Vậy ${result}.`;
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
  return `${readNumber(a)} cộng ${readNumber(b)} bằng ${readNumber(a + b)}`;
}

/**
 * How a subtraction is read aloud: "năm trừ hai bằng ba".
 * @param {number} a
 * @param {number} b
 */
export function subWords(a, b) {
  return `${readNumber(a)} trừ ${readNumber(b)} bằng ${readNumber(a - b)}`;
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
 * Picks a whole number from lo to hi that differs from `previous`, so a
 * "Bài khác" button always changes the round.
 * @param {number} lo
 * @param {number} hi
 * @param {number | null} previous
 * @param {() => number} [random] Returns a number in [0, 1).
 */
export function freshInt(lo, hi, previous, random = Math.random) {
  const pool = [];
  for (let n = lo; n <= hi; n++) if (n !== previous) pool.push(n);
  if (pool.length === 0) return lo;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}

/**
 * "5 + 2" or, with `result`, "5 + 2 = 7".
 * @param {number} a
 * @param {number} b
 * @param {number} [result]
 */
export function plus(a, b, result) {
  return result === undefined ? `${a} + ${b}` : `${a} + ${b} = ${result}`;
}

/**
 * "5 − 2" or, with `result`, "5 − 2 = 3".
 * @param {number} a
 * @param {number} b
 * @param {number} [result]
 */
export function minus(a, b, result) {
  return result === undefined ? `${a} ${MINUS} ${b}` : `${a} ${MINUS} ${b} = ${result}`;
}

/**
 * Two parts a and b with a + b at most 10, each part at least `least`.
 * @param {() => number} rand
 * @param {number} [least]
 * @returns {[number, number]}
 */
export function partsWithin10(rand, least = 1) {
  const c = int(rand, 2 * least, 10);
  const a = int(rand, least, c - least);
  return [a, c - a];
}
