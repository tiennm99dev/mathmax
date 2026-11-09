/**
 * Numbers to 1 000 as grades 2 and 3 meet them: how a number is read aloud,
 * its hundreds, tens and ones with the blocks that stand for them, its sum of
 * places and how two numbers compare. Pure and DOM-free.
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
 * The value of some hundreds, tens and ones.
 * @param {{ hundreds: number, tens: number, ones: number }} counts
 */
export function valueOf({ hundreds, tens, ones }) {
  return hundreds * 100 + tens * 10 + ones;
}

/**
 * A number as the book writes it in hundreds, tens and ones: "307 = 300 + 7".
 * A number with one part only stays as it is: "300".
 * @param {number} n
 */
export function sumText(n) {
  const parts = sumParts(n);
  return parts.length > 1 ? `${n} = ${parts.join(' + ')}` : String(n);
}

/**
 * The first place from the left where two numbers differ, or null when they
 * are equal.
 * @param {number} a
 * @param {number} b
 * @returns {PlaceKey | null}
 */
export function decidingPlace(a, b) {
  const x = placesOf(a);
  const y = placesOf(b);
  return PLACES.find((p) => x[p.key] !== y[p.key])?.key ?? null;
}

/**
 * Why `a ? b` holds, the book's way: the hundreds first, and only when they
 * are equal the tens, then the ones. With `byDigits`, a three-digit number
 * against a two-digit one is settled by the count of digits first, as the
 * year-end review of grade 2 explains it.
 * @param {number} a
 * @param {number} b
 * @param {{ byDigits?: boolean }} [options]
 * @returns {string}
 */
export function compareWhy(a, b, { byDigits = false } = {}) {
  const result = `Vậy ${a} ${compareSign(a, b)} ${b}.`;
  const key = decidingPlace(a, b);
  if (key === null) return `Hai số giống nhau ở mọi hàng. ${result}`;
  if (byDigits && a < 100 !== b < 100) {
    const [long, short] = a > b ? [a, b] : [b, a];
    return `${long} có ba chữ số, ${short} có hai chữ số. ${result}`;
  }
  const i = PLACES.findIndex((p) => p.key === key);
  const place = PLACES[i];
  const p = placesOf(a)[key];
  const q = placesOf(b)[key];
  const same = PLACES.slice(0, i)
    .map((earlier) => earlier.unit)
    .join(', ');
  const lead = i === 0 ? '' : `Hàng ${same} bằng nhau. `;
  return `${lead}${p} ${place.unit} ${SIGN_WORDS[compareSign(p, q)]} ${q} ${place.unit}. ${result}`;
}
