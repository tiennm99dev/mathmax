/**
 * Plain-text number writing for the widgets of this chapter, matching the
 * book: thousands grouped by a narrow space (2 345), multiplication written
 * as a raised dot and powers with superscript exponents (2⁵).
 */

const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/** Narrow no-break space used between groups of three digits. */
export const GROUP = ' ';

/**
 * A natural number with its digits grouped by threes: 1234567 → '1 234 567'.
 * Four-digit numbers are grouped too, as in the textbook (2 345).
 * @param {number} n
 */
export function fmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
}

/**
 * Superscript digits for an exponent: 12 → '¹²'.
 * @param {number} n
 */
export function sup(n) {
  return String(n)
    .split('')
    .map((d) => SUPERSCRIPT[Number(d)])
    .join('');
}

/**
 * A power written in plain text: (2, 5) → '2⁵'.
 * @param {number | string} base
 * @param {number} exponent
 */
export function powText(base, exponent) {
  return `${typeof base === 'number' ? fmt(base) : base}${sup(exponent)}`;
}

/**
 * Reads a natural number typed by a learner: '1024', '1 024' or '1.024'.
 * Returns null for anything else (decimals, signs, letters, empty input).
 * @param {string} text
 * @returns {number | null}
 */
export function readNatural(text) {
  const s = text.trim().replace(/\s/g, '');
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, ''));
  return /^\d+$/.test(s) ? Number(s) : null;
}
