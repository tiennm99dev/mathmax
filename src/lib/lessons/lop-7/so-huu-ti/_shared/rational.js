/**
 * Writing and reading rational numbers the way the grade 7 book prints them:
 * fractions with the sign on the numerator (−3/4, \frac{-3}{4}), decimals
 * with a decimal comma (−0,75), and learner input in any of these forms.
 *
 * Exact values travel as fraction-engine fractions. The drill board compares
 * plain numbers, so its answers are the double n/d: two equal fractions
 * divide to the very same double (the quotient of two integers is correctly
 * rounded), so 0,75 typed as 75/100 equals the answer 3/4.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { formatNumber, texNumber } from '#lib/core/number-format.js';

/** The minus sign the book prints (U+2212), never a hyphen. */
export const MINUS = '−';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/**
 * A number written as it appears in a problem: as a fraction, a decimal or
 * an integer. The value is kept exact; `form` only says how to print it.
 * @typedef {{ f: Fraction, form: 'frac' | 'dec' | 'int' }} Written
 */

/**
 * True when the fraction equals a finite decimal: its lowest-terms
 * denominator has no prime factor other than 2 and 5.
 * @param {Fraction} f
 */
export function isFiniteDecimal(f) {
  let d = simplify(f).d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
}

/**
 * A fraction as plain text: '3/4', '−3/4', '5' when it is an integer.
 * Not reduced, so a step can show 6/8 before simplifying.
 * @param {Fraction} f
 */
export function fracText(f) {
  const g = fraction(f.n, f.d);
  const sign = g.n < 0 ? MINUS : '';
  return g.d === 1 ? `${sign}${Math.abs(g.n)}` : `${sign}${Math.abs(g.n)}/${g.d}`;
}

/**
 * A finite decimal as plain text with a decimal comma: 3/4 → '0,75'.
 * @param {Fraction} f
 */
export function decText(f) {
  return formatNumber(f.n / f.d, 8);
}

/**
 * TeX for a fraction, sign on the numerator: '\frac{-3}{4}', or '-3' when
 * the denominator is 1. Not reduced.
 * @param {Fraction} f
 */
export function texFrac(f) {
  const g = fraction(f.n, f.d);
  return g.d === 1 ? `${g.n}` : `\\frac{${g.n}}{${g.d}}`;
}

/**
 * TeX for a finite decimal: '-0{,}75'. KaTeX gets an ASCII minus.
 * @param {Fraction} f
 */
export function texDec(f) {
  return texNumber(decText(f)).replace(MINUS, '-');
}

/**
 * A written number as plain text, in the form it was given.
 * @param {Written} w
 */
export function writtenText(w) {
  return w.form === 'dec' ? decText(w.f) : fracText(w.f);
}

/**
 * A written number as TeX, in the form it was given.
 * @param {Written} w
 */
export function writtenTex(w) {
  return w.form === 'dec' ? texDec(w.f) : texFrac(w.f);
}

/**
 * Plain text of a value used as an operand: negatives in brackets.
 * @param {string} text
 */
export function bracket(text) {
  return text.startsWith(MINUS) ? `(${text})` : text;
}

/**
 * TeX of a value used as an operand: negatives in brackets.
 * @param {string} tex
 */
export function texBracket(tex) {
  return tex.startsWith('-') ? `\\left(${tex}\\right)` : tex;
}

/**
 * Reads what a learner typed: '3/4', '-3/4', '−3/4', '3/-4', '5', '-5',
 * or a decimal '0,75' (a dot is read as a decimal mark too). Returns the
 * exact number and the form it was written in, or null when the text is
 * not a number or a denominator is 0.
 * @param {string} text
 * @returns {Written | null}
 */
export function readWritten(text) {
  const s = text.trim().replace(/[−–—]/g, '-').replace(/\s+/g, '');
  const m = /^([+-]?)(\d+)\/([+-]?)(\d+)$/.exec(s);
  if (m) {
    const d = Number(m[4]);
    if (d === 0) return null;
    const negative = (m[1] === '-') !== (m[3] === '-');
    const n = Number(m[2]);
    return { f: fraction(negative ? -n : n, d), form: 'frac' };
  }
  const w = /^([+-]?)(\d+)(?:[,.](\d+))?$/.exec(s);
  if (w) {
    const digits = w[3] ?? '';
    const n = Number(w[2] + digits);
    const d = 10 ** digits.length;
    return { f: fraction(w[1] === '-' ? -n : n, d), form: digits ? 'dec' : 'int' };
  }
  return null;
}

/**
 * Drill-board reader: the value of what was typed, or null.
 * @param {string} text
 * @returns {number | null}
 */
export function readValue(text) {
  const w = readWritten(text);
  return w ? w.f.n / w.f.d : null;
}

/**
 * The simplest fraction equal to a double, searching denominators up to
 * `maxDen`; null when there is none.
 * @param {number} value
 * @param {number} [maxDen]
 * @returns {Fraction | null}
 */
export function toFraction(value, maxDen = 10000) {
  if (!Number.isFinite(value)) return null;
  for (let d = 1; d <= maxDen; d++) {
    const n = Math.round(value * d);
    if (n / d === value) return simplify(fraction(n, d));
  }
  return null;
}

/**
 * Drill-board answer text: the lowest-terms fraction, with its decimal
 * when it has a finite one: 0.75 → '3/4 = 0,75', −2 → '−2'.
 * @param {number} value
 */
export function valueText(value) {
  const f = toFraction(value);
  if (!f) return formatNumber(value);
  if (f.d === 1 || !isFiniteDecimal(f)) return fracText(f);
  return `${fracText(f)} = ${decText(f)}`;
}
