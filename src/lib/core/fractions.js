/**
 * Writing and reading fractions the way the grade 6 book prints them: a true
 * minus sign on the numerator (−3/4), mixed numbers as "1 3/4", and learner
 * input that may be a fraction, an integer or a positive mixed number.
 *
 * The drill board compares numbers, so a fraction answer travels as its
 * value n/d. Equal fractions divide to the very same double (the quotient
 * of two integers is correctly rounded), so 4/6 and 2/3 compare equal.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { MINUS, fmt } from './number-format.js';

/**
 * A fraction as plain text: '3/4', '−3/4', '5' when the denominator is 1.
 * The sign goes on the numerator and the denominator is made positive.
 * @param {number} n
 * @param {number} d
 */
export function fracText(n, d) {
  const f = fraction(n, d);
  const sign = f.n < 0 ? MINUS : '';
  return f.d === 1 ? `${sign}${Math.abs(f.n)}` : `${sign}${Math.abs(f.n)}/${f.d}`;
}

/**
 * A fraction as an operand inside an operation: negatives in brackets.
 * @param {number} n
 * @param {number} d
 */
export function fracOperand(n, d) {
  const text = fracText(n, d);
  return text.startsWith(MINUS) ? `(${text})` : text;
}

/**
 * The simplest fraction equal to a value, searching denominators up to
 * `maxDen`; null when the value is not such a fraction.
 * @param {number} value
 * @param {number} [maxDen]
 * @returns {{ n: number, d: number } | null}
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
 * A fraction value as the simplest fraction text: 0.75 → '3/4'.
 * @param {number} value
 */
export function valueText(value) {
  const f = toFraction(value);
  return f ? fracText(f.n, f.d) : String(value);
}

/**
 * A positive fraction greater than 1 as a mixed number: 7/4 → '1 3/4'.
 * Whole numbers and proper fractions are written as they are.
 * @param {number} n
 * @param {number} d
 */
export function mixedText(n, d) {
  const f = simplify(fraction(n, d));
  if (f.n <= f.d || f.d === 1) return fracText(f.n, f.d);
  const whole = Math.floor(f.n / f.d);
  return `${whole} ${f.n - whole * f.d}/${f.d}`;
}

/**
 * Reads what a learner typed: '3/4', '-3/4', '−3/4', '3/-4', '5', '-5'
 * or a decimal with a comma '0,75'. A mixed number '1 3/4' is not read, so
 * a question that asks to turn a mixed number into a fraction cannot be
 * answered by copying it. Returns the value, or null when the text is not
 * a number or the denominator is 0.
 * @param {string} text
 * @returns {number | null}
 */
export function readFraction(text) {
  const s = text.trim().replace(/[−–—]/g, '-').replace(/\s+/g, ' ');
  const m = /^(-?)\s?(\d+)\s?\/\s?(-?)\s?(\d+)$/.exec(s);
  if (m) {
    const d = Number(m[4]);
    if (d === 0) return null;
    const negative = (m[1] === '-') !== (m[3] === '-');
    const n = Number(m[2]);
    return n === 0 ? 0 : (negative ? -n : n) / d;
  }
  const w = /^(-?)(\d+)(?:,(\d+))?$/.exec(s);
  if (w) {
    const digits = w[3] ?? '';
    const n = Number(w[2] + digits);
    const d = 10 ** digits.length;
    if (n === 0) return 0;
    return (w[1] === '-' ? -n : n) / d;
  }
  return null;
}

/**
 * TeX for a fraction: '\frac{3}{4}', '\frac{-3}{4}' (sign on the numerator,
 * as the book writes it), or an integer when the denominator is 1.
 * @param {number} n
 * @param {number} d
 */
export function texFrac(n, d) {
  const f = fraction(n, d);
  return f.d === 1 ? `${f.n}` : `\\frac{${f.n}}{${f.d}}`;
}

/**
 * TeX operand: a negative fraction or integer in brackets.
 * @param {number} n
 * @param {number} d
 */
export function texOperand(n, d) {
  const f = fraction(n, d);
  const t = texFrac(f.n, f.d);
  return f.n < 0 ? `\\left(${t}\\right)` : t;
}

/**
 * Reads a probability the learner typed: a fraction 'a/b', a whole number or
 * a decimal with a comma or point. Null when it cannot be read. Equal
 * fractions divide to the very same double, so 2/6 and 1/3 compare equal.
 * @param {string} text
 * @returns {number | null}
 */
export function readProbability(text) {
  const s = text.trim().replace(/\s+/g, '');
  let m = /^(\d+)\/(\d+)$/.exec(s);
  if (m) {
    const d = Number(m[2]);
    return d === 0 ? null : Number(m[1]) / d;
  }
  m = /^(\d+)(?:[.,](\d+))?$/.exec(s);
  if (m) return Number(m[2] === undefined ? m[1] : `${m[1]}.${m[2]}`);
  return null;
}

/**
 * The value of a probability as its simplest fraction text ('1/3', '0',
 * '1'), for the drill board's "the answer is" line.
 * @param {number} value
 */
export function probabilityText(value) {
  return toFraction(value) ? valueText(value) : String(value).replace('.', ',');
}

/**
 * How a drill board writes an answer that is either a count or a
 * probability: a whole number grouped the book's way (1 500), anything else
 * as a probability fraction (1/4).
 * @param {number} value
 */
export function countOrProbabilityText(value) {
  return Number.isInteger(value) ? fmt(value) : probabilityText(value);
}

/**
 * p/q in lowest terms as a pair of whole numbers: (4, 12) → [1, 3]. The sign
 * stays where it was written.
 * @param {number} p
 * @param {number} q
 * @returns {[number, number]}
 */
export function lowestTerms(p, q) {
  const g = gcd(p, q) || 1;
  return [p / g, q / g];
}

/**
 * A ratio k/n of natural numbers with its lowest terms when they differ:
 * '6/20 = 3/10', '6/6 = 1', '0/5 = 0', '3/7'.
 * @param {number} k
 * @param {number} n
 */
export function ratioText(k, n) {
  const [p, q] = lowestTerms(k, n);
  const simple = k === 0 ? '0' : q === 1 ? String(p) : `${p}/${q}`;
  return simple === `${k}/${n}` ? simple : `${k}/${n} = ${simple}`;
}

/**
 * TeX for the ratio p/q of two whole numbers followed by its lowest terms
 * when they differ: `\dfrac{8}{4} = 2`, `\dfrac{6}{4} = \dfrac{3}{2}`.
 * @param {number} p
 * @param {number} q
 */
export function ratioTex(p, q) {
  const [n, d] = lowestTerms(p, q);
  const reduced = d === 1 ? String(n) : `\\dfrac{${n}}{${d}}`;
  return n === p && d === q ? `\\dfrac{${p}}{${q}}` : `\\dfrac{${p}}{${q}} = ${reduced}`;
}
