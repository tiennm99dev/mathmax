/**
 * Vietnamese number writing for widgets, visuals and live readouts. The
 * decimal mark is always a comma (52,9, never 52.9). Written by hand rather
 * than with Intl so the output never depends on the ICU data a runtime ships.
 *
 * - `formatNumber`: '.' groups thousands, trailing decimal zeros dropped
 *   (12345.5 → '12.345,5').
 * - `formatFixed`: a fixed number of decimals, zeros kept (5 → '5,0').
 * - `texNumber`: a formatted number made safe for TeX (`3{,}5`), so KaTeX does
 *   not put a space after the decimal comma.
 * - `fmt`, `sup`, `powText`, `readNatural`: natural numbers the way the lower
 *   secondary books print them, grouped by a narrow space (2 345), with
 *   superscript exponents (2⁵).
 */

const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/** Narrow no-break space used between groups of three digits by `fmt`. */
export const GROUP = '\u202f';

/**
 * @param {number} value
 * @param {number} decimals
 * @param {boolean} keepZeros
 */
function write(value, decimals, keepZeros) {
  const fixed = Math.abs(value).toFixed(decimals);
  const [int, frac = ''] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const digits = keepZeros ? frac : frac.replace(/0+$/, '');
  const sign = value < 0 && Number(fixed) !== 0 ? '−' : '';
  return digits ? `${sign}${grouped},${digits}` : `${sign}${grouped}`;
}

/**
 * A number with '.' grouping thousands and ',' as the decimal mark, rounded to
 * at most `maxDecimals` places: 12345.5 → '12.345,5', -0.25 → '−0,25'.
 * @param {number} value
 * @param {number} [maxDecimals]
 */
export function formatNumber(value, maxDecimals = 6) {
  return write(value, maxDecimals, false);
}

/**
 * Like `formatNumber` with exactly `decimals` places, the Vietnamese
 * `toFixed`: (52.94, 1) → '52,9', (5, 1) → '5,0'.
 * @param {number} value
 * @param {number} decimals
 */
export function formatFixed(value, decimals) {
  return write(value, decimals, true);
}

/**
 * A formatted number for TeX source: '3,5' → '3{,}5'. KaTeX spaces a bare
 * comma as punctuation, which reads as a list rather than a decimal.
 * @param {string} text
 */
export function texNumber(text) {
  return text.replace(/,/g, '{,}');
}

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
