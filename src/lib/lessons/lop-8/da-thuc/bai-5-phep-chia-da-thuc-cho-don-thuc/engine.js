/**
 * Dividing a monomial, then a polynomial, by a monomial, as the grade 8 book
 * does it. A monomial A is divisible by a monomial B (B ≠ 0) when every
 * variable of B is a variable of A with an exponent no larger than in A; the
 * coefficients are real numbers, so they need not divide each other. A
 * polynomial is divisible by B when each of its terms is.
 *
 * Quotients may have fractional coefficients (3x²y : 2xy = 3/2·x), so a
 * quotient term is `{ n, d, vars }` with n/d in lowest terms and d > 0.
 */

import { simplify, fraction } from '#lib/fraction-engine/index.js';
import { MINUS, fmt } from '#lib/core/number-format.js';
import { mono, parsePoly, varText } from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Mono} Mono */
/** @typedef {{ n: number, d: number, vars: Record<string, number> }} Quot */
/** @typedef {{ name: string, top: number, bottom: number, ok: boolean }} VarCheck */
/** @typedef {{ term: Mono, checks: VarCheck[], ok: boolean, quotient: Quot | null }} Row */

/** The dividends of the widget, each written as in the lesson. */
export const DIVIDENDS = [
  '6x^3y^2 - 9x^2y^3 + 12x^2y^2',
  '-6x^3y^2 + 4x^2y^3 + 2x^4y',
  '4x^4y - 8x^3y^2 + 2x^2y',
  '5x^3 - 10x^2y + 15xy^2',
];

/** The variables a divisor may use in the widget. */
export const VARS = ['x', 'y'];

/**
 * Divides monomial `a` by monomial `b` (b's coefficient non-zero). Each
 * variable of `b` is checked against its exponent in `a`; the quotient is
 * null when one check fails.
 * @param {Mono} a
 * @param {Mono} b
 * @returns {{ checks: VarCheck[], ok: boolean, quotient: Quot | null }}
 */
export function divideMono(a, b) {
  if (b.coef === 0) throw new Error('Không chia cho đơn thức 0');
  const checks = Object.keys(b.vars)
    .sort()
    .map((name) => {
      const top = a.vars[name] ?? 0;
      const bottom = b.vars[name];
      return { name, top, bottom, ok: bottom <= top };
    });
  const ok = a.coef !== 0 && checks.every((c) => c.ok);
  if (!ok) return { checks, ok, quotient: null };
  /** @type {Record<string, number>} */
  const vars = {};
  for (const [name, e] of Object.entries(a.vars)) {
    const left = e - (b.vars[name] ?? 0);
    if (left > 0) vars[name] = left;
  }
  const f = simplify(fraction(a.coef, b.coef));
  return { checks, ok, quotient: { n: f.n, d: f.d, vars: mono(1, vars).vars } };
}

/**
 * The division table of a polynomial by a monomial: one row per term.
 * @param {Mono[]} terms
 * @param {Mono} b
 * @returns {Row[]}
 */
export function divisionRows(terms, b) {
  return terms.map((term) => ({ term, ...divideMono(term, b) }));
}

/**
 * The quotient terms when every row divides, otherwise null.
 * @param {Row[]} rows
 * @returns {Quot[] | null}
 */
export function quotientOf(rows) {
  if (!rows.every((r) => r.ok)) return null;
  return rows.map((r) => /** @type {Quot} */ (r.quotient));
}

/**
 * The divisor of highest degree that still divides every term: the smallest
 * exponent of each variable over the terms.
 * @param {Mono[]} terms
 * @returns {Record<string, number>}
 */
export function largestVars(terms) {
  /** @type {Record<string, number>} */
  const out = {};
  for (const name of VARS) out[name] = Math.min(...terms.map((t) => t.vars[name] ?? 0));
  return out;
}

/**
 * The dividend of a preset.
 * @param {number} i
 */
export function dividend(i) {
  return parsePoly(DIVIDENDS[i]);
}

/**
 * A quotient term as TeX: '-\frac{3}{2}x^{2}y', '3xy', '-1', '\frac{1}{2}'.
 * @param {Quot} q
 */
export function quotTex(q) {
  const v = Object.keys(q.vars)
    .sort()
    .map((name) => (q.vars[name] === 1 ? name : `${name}^{${q.vars[name]}}`))
    .join('');
  const sign = q.n < 0 ? '-' : '';
  const abs = Math.abs(q.n);
  const coef = q.d === 1 ? (abs === 1 && v ? '' : `${abs}`) : `\\frac{${abs}}{${q.d}}`;
  return `${sign}${coef}${v}`;
}

/**
 * A quotient term as plain text for screen readers: '−3/2 x²y', '3xy'.
 * @param {Quot} q
 */
export function quotText(q) {
  const v = varText(mono(1, q.vars));
  const sign = q.n < 0 ? MINUS : '';
  const abs = Math.abs(q.n);
  if (q.d !== 1) return `${sign}${fmt(abs)}/${q.d}${v ? ` ${v}` : ''}`;
  return `${sign}${abs === 1 && v ? '' : fmt(abs)}${v}`;
}

/**
 * A sum of quotient terms as TeX: '2x - 3y + 4'.
 * @param {Quot[]} terms
 */
export function quotSumTex(terms) {
  return terms
    .map((q, i) => {
      if (i === 0) return quotTex(q);
      const body = quotTex({ ...q, n: Math.abs(q.n) });
      return q.n < 0 ? ` - ${body}` : ` + ${body}`;
    })
    .join('');
}

/**
 * The quotient multiplied back by the divisor, term by term, as exact
 * coefficients and variable parts; equals the dividend when the division is
 * right.
 * @param {Quot[]} q
 * @param {Mono} b
 * @returns {Mono[]}
 */
export function multiplyBack(q, b) {
  return q.map((t) => {
    const f = simplify(fraction(t.n * b.coef, t.d));
    if (f.d !== 1) throw new Error('Thương nhân lại không ra hệ số nguyên');
    /** @type {Record<string, number>} */
    const vars = { ...t.vars };
    for (const [name, e] of Object.entries(b.vars)) vars[name] = (vars[name] ?? 0) + e;
    return mono(f.n, vars);
  });
}
