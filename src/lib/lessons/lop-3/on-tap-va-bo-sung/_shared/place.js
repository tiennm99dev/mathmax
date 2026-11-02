/**
 * Numbers to 1 000 as this chapter reviews them: how a number is read aloud,
 * its places, its sum of places and how two numbers compare. Pure and DOM-free.
 */
import { DIGIT_WORDS, SIGN_WORDS, compareSign, readNumber } from '#lib/core/kid/numbers.js';

/** @typedef {'hundreds' | 'tens' | 'ones'} PlaceKey */

/**
 * The three places of a number from the left.
 * @type {ReadonlyArray<{ key: PlaceKey, title: string, unit: string, blockName: string, value: number }>}
 */
export const PLACES = [
  { key: 'hundreds', title: 'Trăm', unit: 'trăm', blockName: 'tấm trăm', value: 100 },
  { key: 'tens', title: 'Chục', unit: 'chục', blockName: 'thanh chục', value: 10 },
  { key: 'ones', title: 'Đơn vị', unit: 'đơn vị', blockName: 'khối đơn vị', value: 1 },
];

/**
 * How the book reads a number from 0 to 1 000: 243 is "hai trăm bốn mươi ba",
 * 205 is "hai trăm linh năm", 310 is "ba trăm mười", 1 000 is "một nghìn".
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
 * Hundreds, tens and ones of a number below 1 000.
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
 * The value of some hundreds, tens and ones.
 * @param {{ hundreds: number, tens: number, ones: number }} counts
 */
export function valueOf({ hundreds, tens, ones }) {
  return hundreds * 100 + tens * 10 + ones;
}

/**
 * The hundreds, tens and ones of a number that are not zero: 307 gives
 * [300, 7].
 * @param {number} n
 * @returns {number[]}
 */
export function sumParts(n) {
  const { hundreds, tens, ones } = placesOf(n);
  return [hundreds * 100, tens * 10, ones].filter((part) => part > 0);
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
 * Why `a ? b` holds, the book's way: a number with more digits is larger,
 * otherwise the hundreds first, and only when they are equal the tens, then
 * the ones.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function compareWhy(a, b) {
  const result = `Vậy ${a} ${compareSign(a, b)} ${b}.`;
  const key = decidingPlace(a, b);
  if (key === null) return `Hai số giống nhau ở mọi hàng. ${result}`;
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
