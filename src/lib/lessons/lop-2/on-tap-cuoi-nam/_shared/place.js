/**
 * Numbers to 1000 as the year-end review meets them: how a number is read
 * aloud, its places and how two numbers compare. Pure and DOM-free.
 */
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';

/** The places from the left, with the word for each. */
const PLACES = /** @type {const} */ ([
  { key: 'hundreds', unit: 'trăm' },
  { key: 'tens', unit: 'chục' },
  { key: 'ones', unit: 'đơn vị' },
]);

/**
 * How the book reads a number from 0 to 1000: 243 is "hai trăm bốn mươi ba",
 * 205 is "hai trăm linh năm", 310 is "ba trăm mười", 1000 is "một nghìn".
 * @param {number} n
 * @returns {string}
 */
export function readTo1000(n) {
  if (n === 1000) return 'một nghìn';
  if (n < 100) return readNumber(n);
  const rest = n % 100;
  const head = `${DIGIT_WORDS[Math.floor(n / 100)]} trăm`;
  if (rest === 0) return head;
  if (rest < 10) return `${head} linh ${DIGIT_WORDS[rest]}`;
  return `${head} ${readNumber(rest)}`;
}

/**
 * Hundreds, tens and ones of a number.
 * @param {number} n
 * @returns {{ hundreds: number, tens: number, ones: number }}
 */
export function placesOf(n) {
  return {
    hundreds: Math.floor(n / 100),
    tens: Math.floor((n % 100) / 10),
    ones: n % 10,
  };
}

/**
 * The hundreds, tens and ones of a number that are not zero: 408 gives
 * [400, 8].
 * @param {number} n
 * @returns {number[]}
 */
export function sumParts(n) {
  const { hundreds, tens, ones } = placesOf(n);
  return [hundreds * 100, tens * 10, ones].filter((part) => part > 0);
}

/**
 * Why `a ? b` holds, the book's way: a number with more digits is larger,
 * otherwise the hundreds first, and only when they are equal the tens, then
 * the ones.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareWhy(a, b) {
  const result = `Vậy ${a} ${compareSign(a, b)} ${b}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
  if (a < 100 !== b < 100) {
    const [long, short] = a > b ? [a, b] : [b, a];
    return `${long} có ba chữ số, ${short} có hai chữ số. ${result}`;
  }
  const x = placesOf(a);
  const y = placesOf(b);
  for (const [i, place] of PLACES.entries()) {
    const p = x[place.key];
    const q = y[place.key];
    if (p === q) continue;
    const same = PLACES.slice(0, i)
      .map((earlier) => earlier.unit)
      .join(', ');
    const lead = i === 0 ? '' : `Hàng ${same} bằng nhau. `;
    return `${lead}${p} ${place.unit} ${SIGN_WORDS[compareSign(p, q)]} ${q} ${place.unit}. ${result}`;
  }
  return result;
}
