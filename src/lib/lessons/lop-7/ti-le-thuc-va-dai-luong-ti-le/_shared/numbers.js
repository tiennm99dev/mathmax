/**
 * Reading and writing the numbers of the chapter "Tỉ lệ thức và đại lượng tỉ
 * lệ": exact rational values typed as an integer, a decimal with a comma or a
 * fraction a/b. Integers use `intText`, `operand` and `readInteger` from
 * `#lib/core/number-format.js`.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { MINUS, formatNumber, intText } from '#lib/core/number-format.js';

/**
 * Reads an exact rational typed by a learner: an integer ('−4'), a decimal
 * with a comma or a point ('2,5', '0.75') or a fraction ('3/4', '−5/6').
 * Returns null for anything else, including a zero denominator.
 * @param {string} text
 * @returns {import('#lib/fraction-engine/fraction.js').Fraction | null}
 */
export function readValue(text) {
  const s = text.trim().replace(/\s/g, '').replace(/[−–]/g, '-');
  let m = /^([+-]?)(\d{1,9})\/(\d{1,9})$/.exec(s);
  if (m) {
    const q = Number(m[3]);
    if (q === 0) return null;
    const p = Number(m[2]);
    return simplify(fraction(m[1] === '-' ? -p : p, q));
  }
  m = /^([+-]?)(\d{1,9})(?:[.,](\d{1,6}))?$/.exec(s);
  if (!m) return null;
  const frac = m[3] ?? '';
  const d = 10 ** frac.length;
  const n = Number(m[2]) * d + Number(frac || '0');
  return simplify(fraction(m[1] === '-' ? -n : n, d));
}

/**
 * Whether a lowest-terms denominator gives a finite decimal (only the prime
 * factors 2 and 5).
 * @param {number} d
 */
function finiteDecimal(d) {
  let q = d;
  while (q % 2 === 0) q /= 2;
  while (q % 5 === 0) q /= 5;
  return q === 1;
}

/**
 * A rational value as plain text: an integer, a finite decimal with a comma,
 * or a fraction a/b when its decimal would repeat. Uses the book's minus.
 * @param {import('#lib/fraction-engine/fraction.js').Fraction} f
 */
export function valueText(f) {
  const s = simplify(f);
  if (s.d === 1) return intText(s.n);
  if (finiteDecimal(s.d)) return formatNumber(s.n / s.d, 6);
  return `${s.n < 0 ? MINUS : ''}${Math.abs(s.n)}/${s.d}`;
}

/**
 * The same value as TeX: '3', '-2{,}5' or '\frac{5}{6}'.
 * @param {import('#lib/fraction-engine/fraction.js').Fraction} f
 */
export function valueTex(f) {
  const s = simplify(f);
  if (s.d === 1) return String(s.n);
  if (finiteDecimal(s.d)) {
    return formatNumber(s.n / s.d, 6)
      .replace(MINUS, '-')
      .replace(/,/g, '{,}');
  }
  return `${s.n < 0 ? '-' : ''}\\frac{${Math.abs(s.n)}}{${s.d}}`;
}
