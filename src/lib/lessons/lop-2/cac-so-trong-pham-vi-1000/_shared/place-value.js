/**
 * Numbers to 1000 as grade 2 meets them: how a number is read aloud, its
 * hundreds, tens and ones, its sum of places and how two numbers compare. Pure
 * and DOM-free.
 */
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';

/** @typedef {'don-vi' | 'chuc' | 'tram' | 'nghin'} BlockKind */

/** @typedef {'hundreds' | 'tens' | 'ones'} PlaceKey */

/**
 * The three places of a number from the left, with the block that stands for
 * each one.
 * @type {ReadonlyArray<{ key: PlaceKey, title: string, unit: string, block: BlockKind, blockName: string, value: number }>}
 */
export const PLACES = [
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

/**
 * How the book reads a number from 0 to 1000: 243 is "hai trăm bốn mươi ba",
 * 205 is "hai trăm linh năm", 310 is "ba trăm mười", 1000 is "một nghìn".
 * Any other value is written in digits.
 * @param {number} n
 * @returns {string}
 */
export function readTo1000(n) {
  if (!Number.isInteger(n) || n < 0 || n > 1000) return String(n);
  if (n === 1000) return 'một nghìn';
  if (n < 100) return readNumber(n);
  const rest = n % 100;
  const head = `${DIGIT_WORDS[Math.floor(n / 100)]} trăm`;
  if (rest === 0) return head;
  if (rest < 10) return `${head} linh ${DIGIT_WORDS[rest]}`;
  return `${head} ${readNumber(rest)}`;
}

/**
 * Hundreds, tens and ones of a number; 1000 has 10 hundreds.
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
 * "2 trăm, 0 chục, 5 đơn vị".
 * @param {number} n
 */
export function placesText(n) {
  const { hundreds, tens, ones } = placesOf(n);
  return `${hundreds} trăm, ${tens} chục, ${ones} đơn vị`;
}

/**
 * Why `a ? b` holds, the book's way: the hundreds first, and only when they
 * are equal the tens, then the ones.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareWhy(a, b) {
  const x = placesOf(a);
  const y = placesOf(b);
  const result = `Vậy ${a} ${compareSign(a, b)} ${b}.`;
  if (a === b) return `Hai số giống nhau ở mọi hàng. ${result}`;
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
