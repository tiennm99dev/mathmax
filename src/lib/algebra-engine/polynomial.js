/**
 * Polynomials in one variable, as the grade 7 book introduces them in "Biểu
 * thức đại số và đa thức một biến". A collected polynomial is an array of
 * coefficients indexed by degree (`[1, -3, 2]` is 2x² − 3x + 1) with no
 * trailing zeros, so the zero polynomial is `[]`. An uncollected one, as a learner first meets it, is a
 * list of terms `{ c, e }` (coefficient and exponent) in written order.
 * Writers produce TeX (`polyTex`) or plain text with the book's minus sign
 * and superscript exponents (`polyText`); decimals use a comma.
 */

import { MINUS, formatNumber, numTex, sup } from '#lib/core/number-format.js';

/** @typedef {{ c: number, e: number }} Term */

/**
 * Rounds away floating-point noise (0.1 + 0.2) so equal values compare equal.
 * @param {number} v
 */
const clean = (v) => {
  const r = Math.round(v * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
};

/**
 * Drops trailing zero coefficients.
 * @param {number[]} p
 * @returns {number[]}
 */
export function trim(p) {
  const out = p.map(clean);
  while (out.length > 0 && out[out.length - 1] === 0) out.pop();
  return out;
}

/**
 * Collects like terms (thu gọn): adds the coefficients of terms of equal degree.
 * @param {Term[]} terms
 * @returns {number[]}
 */
export function collect(terms) {
  /** @type {number[]} */
  const p = [];
  for (const { c, e } of terms) {
    while (p.length <= e) p.push(0);
    p[e] += c;
  }
  return trim(p);
}

/**
 * Degree of a collected polynomial; null for the zero polynomial, which has
 * no degree.
 * @param {number[]} p
 * @returns {number | null}
 */
export function degree(p) {
  const q = trim(p);
  return q.length === 0 ? null : q.length - 1;
}

/**
 * Coefficient of xᵏ (0 when the term is missing).
 * @param {number[]} p
 * @param {number} k
 */
export function coef(p, k) {
  return clean(p[k] ?? 0);
}

/**
 * @param {number[]} p
 * @param {number[]} q
 * @returns {number[]}
 */
export function add(p, q) {
  const n = Math.max(p.length, q.length);
  return trim(Array.from({ length: n }, (_, i) => (p[i] ?? 0) + (q[i] ?? 0)));
}

/**
 * @param {number[]} p
 * @param {number[]} q
 * @returns {number[]}
 */
export function sub(p, q) {
  const n = Math.max(p.length, q.length);
  return trim(Array.from({ length: n }, (_, i) => (p[i] ?? 0) - (q[i] ?? 0)));
}

/**
 * Product: every term of p times every term of q, then like terms collected.
 * @param {number[]} p
 * @param {number[]} q
 * @returns {number[]}
 */
export function mul(p, q) {
  if (p.length === 0 || q.length === 0) return [];
  /** @type {number[]} */
  const out = Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (out[i + j] += a * b)));
  return trim(out);
}

/**
 * Value P(a) by substitution.
 * @param {number[]} p
 * @param {number} a
 */
export function evaluate(p, a) {
  return clean(p.reduce((sum, c, i) => sum + c * a ** i, 0));
}

/**
 * The non-zero terms of a collected polynomial, highest degree first, or
 * lowest first when `ascending`.
 * @param {number[]} p
 * @param {boolean} [ascending]
 * @returns {Term[]}
 */
export function termsOf(p, ascending = false) {
  /** @type {Term[]} */
  const out = [];
  trim(p).forEach((c, e) => {
    if (c !== 0) out.push({ c, e });
  });
  return ascending ? out : out.reverse();
}

/**
 * A number in TeX the book's way (`numTex` in `number-format.js`): 2.5 →
 * '2{,}5', 1296 → '1\,296'.
 */
export { numTex };

/**
 * One term as TeX. `first` leaves a positive sign off; otherwise the sign is
 * written as a binary + or −. A coefficient ±1 is not written before a power.
 * @param {Term} t
 * @param {boolean} [first]
 * @param {string} [x]
 */
export function termTex({ c, e }, first = true, x = 'x') {
  const abs = Math.abs(c);
  const power = e === 0 ? '' : e === 1 ? x : `${x}^{${e}}`;
  const body = e !== 0 && abs === 1 ? power : `${numTex(abs)}${power}`;
  if (first) return c < 0 ? `-${body}` : body;
  return c < 0 ? ` - ${body}` : ` + ${body}`;
}

/**
 * Terms as TeX in the given order; '0' for no terms.
 * @param {Term[]} terms
 * @param {string} [x]
 */
export function termsTex(terms, x = 'x') {
  if (terms.length === 0) return '0';
  return terms.map((t, i) => termTex(t, i === 0, x)).join('');
}

/**
 * A collected polynomial as TeX, highest degree first.
 * @param {number[]} p
 * @param {string} [x]
 */
export function polyTex(p, x = 'x') {
  return termsTex(termsOf(p), x);
}

/**
 * P(a) written out with a in place of x, highest degree first, as TeX:
 * ([−4, 0, 1], −2) → '(-2)^{2} - 4'; ([−3, 2], 1.5) → '2 \\cdot 1{,}5 - 3'.
 * @param {number[]} p
 * @param {number} a
 */
export function substituteTex(p, a) {
  const base = a < 0 ? `(${numTex(a)})` : numTex(a);
  const terms = termsOf(p);
  if (terms.length === 0) return '0';
  return terms
    .map(({ c, e }, i) => {
      const abs = Math.abs(c);
      const power = e === 0 ? '' : e === 1 ? base : `${base}^{${e}}`;
      const body = e === 0 ? numTex(abs) : abs === 1 ? power : `${numTex(abs)} \\cdot ${power}`;
      if (i === 0) return c < 0 ? `-${body}` : body;
      return c < 0 ? ` - ${body}` : ` + ${body}`;
    })
    .join('');
}

/**
 * A number as plain text with the book's minus: -2.5 → '−2,5'.
 * @param {number} v
 */
export const numText = (v) => formatNumber(v);

/**
 * One term as plain text: −3x², + x, − 5.
 * @param {Term} t
 * @param {boolean} [first]
 * @param {string} [x]
 */
export function termText({ c, e }, first = true, x = 'x') {
  const abs = Math.abs(c);
  const power = e === 0 ? '' : e === 1 ? x : `${x}${sup(e)}`;
  const body = e !== 0 && abs === 1 ? power : `${numText(abs)}${power}`;
  if (first) return c < 0 ? `${MINUS}${body}` : body;
  return c < 0 ? ` ${MINUS} ${body}` : ` + ${body}`;
}

/**
 * Terms as plain text in the given order; '0' for no terms.
 * @param {Term[]} terms
 * @param {string} [x]
 */
export function termsText(terms, x = 'x') {
  if (terms.length === 0) return '0';
  return terms.map((t, i) => termText(t, i === 0, x)).join('');
}

/**
 * A collected polynomial as plain text, highest degree first.
 * @param {number[]} p
 * @param {string} [x]
 */
export function polyText(p, x = 'x') {
  return termsText(termsOf(p), x);
}
