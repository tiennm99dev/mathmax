/**
 * Numbers to 100 as a grade 1 child meets them: how a two-digit number is
 * read aloud, its tens and ones, and how two such numbers compare. Pure and
 * DOM-free.
 */

/** Largest number of the chapter. */
export const TOP = 100;

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
 * "hai mươi mốt", 24 is "hai mươi tư", 100 is "một trăm".
 * @param {number} n
 * @returns {string}
 */
export function readNumber(n) {
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
