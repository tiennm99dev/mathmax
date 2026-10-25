/**
 * Place values in the decimal system and Roman numerals from 1 to 30, the
 * range the grade 6 textbook covers with the symbols I, V, X.
 */

/** Place names from the units up, three per class. */
export const PLACES = [
  'đơn vị',
  'chục',
  'trăm',
  'nghìn',
  'chục nghìn',
  'trăm nghìn',
  'triệu',
  'chục triệu',
  'trăm triệu',
];

/** Class names from the units class up. */
export const CLASSES = ['đơn vị', 'nghìn', 'triệu'];

export const MAX = 999_999_999;

/**
 * Digits of `n`, most significant first.
 * @param {number} n a natural number up to MAX
 */
export function digitsOf(n) {
  return String(Math.trunc(n)).split('').map(Number);
}

/**
 * Groups of three digits separated by spaces, as written in the textbook:
 * 15712314 becomes '15 712 314'.
 * @param {number} n
 */
export function groupDigits(n) {
  return String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Each digit with its place and the value it carries there, most significant
 * first. `power` is the exponent of 10 for that place.
 * @param {number} n
 */
export function placeValues(n) {
  const d = digitsOf(n);
  return d.map((digit, i) => {
    const power = d.length - 1 - i;
    return { digit, power, place: PLACES[power], value: digit * 10 ** power };
  });
}

/**
 * The decimal structure `4 × 1 000 + 8 × 100 + 5 × 10 + 1`, every digit
 * included so the place of each one stays visible.
 * @param {number} n
 */
export function expansion(n) {
  const parts = placeValues(n);
  if (parts.length === 1) return String(n);
  return parts
    .map(({ digit, power }) =>
      power === 0 ? String(digit) : `${digit} × ${groupDigits(10 ** power)}`,
    )
    .join(' + ');
}

/** Roman components and their values, largest first. */
const ROMAN = /** @type {const} */ ([
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
]);

/**
 * Components of the Roman numeral for `n` (1 to 30), e.g. 24 gives
 * ['X', 'X', 'IV'].
 * @param {number} n
 * @returns {string[]}
 */
export function romanParts(n) {
  if (!Number.isInteger(n) || n < 1 || n > 30) return [];
  /** @type {string[]} */
  const out = [];
  let rest = n;
  for (const [sym, val] of ROMAN) {
    while (rest >= val) {
      out.push(sym);
      rest -= val;
    }
  }
  return out;
}

/**
 * Value of one component.
 * @param {string} part
 */
export function romanValue(part) {
  return ROMAN.find(([s]) => s === part)?.[1] ?? 0;
}

/**
 * Roman numeral for 1 to 30, or '' outside that range.
 * @param {number} n
 */
export function toRoman(n) {
  return romanParts(n).join('');
}

/**
 * The number a Roman numeral stands for, when it is a correctly written
 * numeral from 1 to 30; null otherwise (IIII, VV, IXI, ...).
 * @param {string} text
 * @returns {number | null}
 */
export function fromRoman(text) {
  const s = text.trim().toUpperCase();
  for (let n = 1; n <= 30; n++) if (toRoman(n) === s) return n;
  return null;
}
