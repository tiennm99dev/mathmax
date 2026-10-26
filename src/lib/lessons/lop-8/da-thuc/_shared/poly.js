/**
 * Monomials and polynomials in several variables, as the grade 8 book
 * "Đa thức" uses them. A monomial is `{ coef, vars }` where `vars` maps a
 * variable name to a positive exponent (`{ coef: -3, vars: { x: 2, y: 1 } }`
 * is −3x²y). A polynomial is a list of monomials in written order; it is
 * collected (thu gọn) when no two of its terms are alike and none is zero.
 * Coefficients are integers here; the lessons keep fractional coefficients in
 * their static content.
 */

import { MINUS, fmt, sup } from '#lib/core/number-format.js';

/** @typedef {{ coef: number, vars: Record<string, number> }} Mono */

/**
 * A monomial with zero exponents dropped and variables in alphabetical order.
 * @param {number} coef
 * @param {Record<string, number>} [vars]
 * @returns {Mono}
 */
export function mono(coef, vars = {}) {
  /** @type {Record<string, number>} */
  const out = {};
  for (const name of Object.keys(vars).sort()) if (vars[name] > 0) out[name] = vars[name];
  return { coef: coef === 0 ? 0 : coef, vars: out };
}

/**
 * The variable part as a key: 'x2y1' for x²y, '' for a constant. Two
 * monomials with non-zero coefficients are alike (đồng dạng) exactly when
 * their keys are equal.
 * @param {Mono} m
 */
export function varKey(m) {
  return Object.keys(m.vars)
    .sort()
    .map((name) => `${name}${m.vars[name]}`)
    .join('');
}

/**
 * Whether two monomials are alike: non-zero coefficients, same variable part.
 * @param {Mono} a
 * @param {Mono} b
 */
export function alike(a, b) {
  return a.coef !== 0 && b.coef !== 0 && varKey(a) === varKey(b);
}

/**
 * The degree of a monomial: the sum of its exponents; null for the zero
 * monomial, which has no degree.
 * @param {Mono} m
 * @returns {number | null}
 */
export function monoDegree(m) {
  if (m.coef === 0) return null;
  return Object.values(m.vars).reduce((s, e) => s + e, 0);
}

/**
 * The product of two monomials: coefficients multiplied, exponents of each
 * variable added.
 * @param {Mono} a
 * @param {Mono} b
 * @returns {Mono}
 */
export function mulMono(a, b) {
  /** @type {Record<string, number>} */
  const vars = { ...a.vars };
  for (const [name, e] of Object.entries(b.vars)) vars[name] = (vars[name] ?? 0) + e;
  return mono(a.coef * b.coef, vars);
}

/**
 * Collects like terms: adds the coefficients of alike monomials, keeps the
 * order in which each variable part first appears, and drops zero terms.
 * @param {Mono[]} terms
 * @returns {Mono[]}
 */
export function collect(terms) {
  /** @type {Map<string, Mono>} */
  const byKey = new Map();
  for (const t of terms) {
    const key = varKey(t);
    const seen = byKey.get(key);
    byKey.set(key, seen ? mono(seen.coef + t.coef, seen.vars) : mono(t.coef, t.vars));
  }
  return [...byKey.values()].filter((t) => t.coef !== 0);
}

/**
 * Whether a polynomial is already collected.
 * @param {Mono[]} terms
 */
export function isCollected(terms) {
  const keys = terms.map(varKey);
  return terms.every((t) => t.coef !== 0) && new Set(keys).size === keys.length;
}

/**
 * The degree of a polynomial: the highest degree among the terms of its
 * collected form; null for the zero polynomial.
 * @param {Mono[]} terms
 * @returns {number | null}
 */
export function polyDegree(terms) {
  const c = collect(terms);
  if (c.length === 0) return null;
  return Math.max(...c.map((t) => /** @type {number} */ (monoDegree(t))));
}

/**
 * The opposite polynomial (every sign changed).
 * @param {Mono[]} terms
 * @returns {Mono[]}
 */
export function neg(terms) {
  return terms.map((t) => mono(-t.coef, t.vars));
}

/**
 * Every product of a term of `a` with a term of `b`, row by row (the terms of
 * `a` outside), before collecting.
 * @param {Mono[]} a
 * @param {Mono[]} b
 * @returns {Mono[]}
 */
export function products(a, b) {
  return a.flatMap((s) => b.map((t) => mulMono(s, t)));
}

/**
 * The collected product of two polynomials.
 * @param {Mono[]} a
 * @param {Mono[]} b
 */
export function mulPoly(a, b) {
  return collect(products(a, b));
}

/**
 * The value of a monomial for the given values of its variables.
 * @param {Mono} m
 * @param {Record<string, number>} values
 */
export function evalMono(m, values) {
  let v = m.coef;
  for (const [name, e] of Object.entries(m.vars)) v *= values[name] ** e;
  return v === 0 ? 0 : v;
}

/**
 * The value of a polynomial for the given values of its variables.
 * @param {Mono[]} terms
 * @param {Record<string, number>} values
 */
export function evalPoly(terms, values) {
  const v = terms.reduce((s, t) => s + evalMono(t, values), 0);
  return v === 0 ? 0 : v;
}

/**
 * The variable part as plain text: 'x²y', '' for a constant.
 * @param {Mono} m
 */
export function varText(m) {
  return Object.keys(m.vars)
    .sort()
    .map((name) => (m.vars[name] === 1 ? name : `${name}${sup(m.vars[name])}`))
    .join('');
}

/**
 * A monomial as plain text with the book's minus sign: '−3x²y', 'xy', '−y',
 * '7'. A coefficient of 1 or −1 is not written in front of variables.
 * @param {Mono} m
 */
export function monoText(m) {
  const v = varText(m);
  const sign = m.coef < 0 ? MINUS : '';
  const abs = Math.abs(m.coef);
  if (!v) return `${sign}${fmt(abs)}`;
  if (m.coef === 0) return '0';
  return `${sign}${abs === 1 ? '' : fmt(abs)}${v}`;
}

/**
 * A monomial as an operand: in brackets when negative, '(−2xy)'.
 * @param {Mono} m
 */
export function monoOperand(m) {
  return m.coef < 0 ? `(${monoText(m)})` : monoText(m);
}

/**
 * A polynomial as plain text: '3x²y − xy + 5'; '0' when it has no terms.
 * @param {Mono[]} terms
 */
export function polyText(terms) {
  if (terms.length === 0) return '0';
  return terms
    .map((t, i) => {
      if (i === 0) return monoText(t);
      const body = monoText(mono(Math.abs(t.coef), t.vars));
      return t.coef < 0 ? ` ${MINUS} ${body}` : ` + ${body}`;
    })
    .join('');
}

/**
 * A monomial as TeX: '-3x^{2}y'.
 * @param {Mono} m
 */
export function monoTex(m) {
  const v = Object.keys(m.vars)
    .sort()
    .map((name) => (m.vars[name] === 1 ? name : `${name}^{${m.vars[name]}}`))
    .join('');
  const sign = m.coef < 0 ? '-' : '';
  const abs = Math.abs(m.coef);
  if (!v) return `${sign}${abs}`;
  if (m.coef === 0) return '0';
  return `${sign}${abs === 1 ? '' : abs}${v}`;
}

/**
 * A polynomial as TeX: '3x^{2}y - xy + 5'; '0' when it has no terms.
 * @param {Mono[]} terms
 */
export function polyTex(terms) {
  if (terms.length === 0) return '0';
  return terms
    .map((t, i) => {
      if (i === 0) return monoTex(t);
      const body = monoTex(mono(Math.abs(t.coef), t.vars));
      return t.coef < 0 ? ` - ${body}` : ` + ${body}`;
    })
    .join('');
}

/**
 * Reads a polynomial written in the plain form the lessons use for presets:
 * '3x^2y - xy + 5', 'x^2 - 2xy'. Terms are separated by + or −; a term is an
 * optional integer then variables with optional ^exponents. Throws on
 * anything else, since presets are authored, not typed by learners.
 * @param {string} src
 * @returns {Mono[]}
 */
export function parsePoly(src) {
  const s = src.replace(/\s/g, '').replace(/−/g, '-');
  const terms = s.match(/[+-]?[^+-]+/g) ?? [];
  return terms.map((raw) => {
    const m = /^([+-]?)(\d*)((?:[a-z](?:\^\d+)?)*)$/.exec(raw);
    if (!m) throw new Error(`Không đọc được hạng tử "${raw}"`);
    const [, sign, digits, letters] = m;
    if (!digits && !letters) throw new Error(`Hạng tử rỗng trong "${src}"`);
    const abs = digits ? Number(digits) : 1;
    /** @type {Record<string, number>} */
    const vars = {};
    for (const [, name, e] of letters.matchAll(/([a-z])(?:\^(\d+))?/g)) {
      vars[name] = (vars[name] ?? 0) + (e ? Number(e) : 1);
    }
    return mono(sign === '-' ? -abs : abs, vars);
  });
}
