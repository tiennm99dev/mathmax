/**
 * Rational expressions in one variable x, kept as products of factors, the
 * way the chapter "Phân thức đại số" works with them: factorise the numerator
 * and the denominator, cancel a common factor (rút gọn), build the common
 * denominator from the factors of each denominator (quy đồng), multiply and
 * divide by joining factor lists.
 *
 * A factor is a polynomial in x as an ascending coefficient array (see
 * `#lib/algebra-engine/polynomial.js`): `[-2, 1]` is x − 2, `[0, 1]` is x and
 * `[3]` is the number 3. Two factors are the same when their arrays are.
 */

import { evaluate, mul, polyTex, polyText, termsOf, trim } from '#lib/algebra-engine/polynomial.js';
import { longDivide } from '#lib/algebra-engine/long-division.js';
import { MINUS, sup } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/**
 * @typedef {object} Factor
 * @property {string} key identity: equal keys are equal factors
 * @property {number[]} poly ascending coefficients
 */

/**
 * @typedef {object} Den a factorised denominator: a number times powers of
 *   polynomial factors
 * @property {number} coef positive whole number
 * @property {Array<{ f: Factor, exp: number }>} parts
 */

/**
 * A factor from its ascending coefficients: `factor(-2, 1)` is x − 2.
 * @param {...number} coeffs
 * @returns {Factor}
 */
export function factor(...coeffs) {
  const poly = trim(coeffs);
  return { key: poly.join(','), poly };
}

/** The factor x. */
export const X = factor(0, 1);

/**
 * x + a as a factor: `lin(-2)` is x − 2.
 * @param {number} a
 */
export const lin = (a) => factor(a, 1);

/**
 * A whole number as a factor.
 * @param {number} n
 */
export const num = (n) => factor(n);

/**
 * Whether a factor is a number.
 * @param {Factor} f
 */
export const isNumber = (f) => f.poly.length <= 1;

/**
 * The number a number factor stands for (1 for the empty product).
 * @param {Factor} f
 */
const numberOf = (f) => f.poly[0] ?? 0;

/**
 * Whether a factor needs brackets when it is multiplied: it has more than
 * one term.
 * @param {Factor} f
 */
const needsBrackets = (f) => termsOf(f.poly).length > 1;

/**
 * Groups a product: the numbers multiplied into one coefficient, the other
 * factors counted in order of first appearance.
 * @param {Factor[]} fs
 * @returns {{ coef: number, groups: Array<{ f: Factor, exp: number }> }}
 */
export function group(fs) {
  let coef = 1;
  /** @type {Array<{ f: Factor, exp: number }>} */
  const groups = [];
  for (const f of fs) {
    if (isNumber(f)) {
      coef *= numberOf(f);
      continue;
    }
    const g = groups.find((x) => x.f.key === f.key);
    if (g) g.exp++;
    else groups.push({ f, exp: 1 });
  }
  return { coef, groups };
}

/**
 * The factors still present, monomials such as x first and bracketed
 * factors after them, as the book writes 4x(x − 1).
 * @param {Array<{ f: Factor, exp: number }>} groups
 */
function ordered(groups) {
  const live = groups.filter((g) => g.exp > 0);
  return [...live.filter((g) => !needsBrackets(g.f)), ...live.filter((g) => needsBrackets(g.f))];
}

/**
 * One power of a factor as TeX: x^{2}, (x - 2)^{2}, (x + 1).
 * @param {Factor} f
 * @param {number} exp
 * @param {boolean} alone whether it is the whole product (no brackets needed)
 */
function powerTex(f, exp, alone) {
  const body = polyTex(f.poly);
  const wrapped = needsBrackets(f) && (!alone || exp > 1) ? `(${body})` : body;
  return exp === 1 ? wrapped : `${wrapped}^{${exp}}`;
}

/**
 * A grouped product as TeX: 3x(x - 2)^{2}; '1' for the empty product.
 * @param {number} coef
 * @param {Array<{ f: Factor, exp: number }>} groups
 */
export function groupedTex(coef, groups) {
  const live = ordered(groups);
  if (live.length === 0) return String(coef);
  const alone = live.length === 1 && coef === 1;
  const body = live.map((g) => powerTex(g.f, g.exp, alone)).join('');
  if (coef === 1) return body;
  if (coef === -1) return `-${body}`;
  return `${coef}${body}`;
}

/**
 * A product of factors as TeX.
 * @param {Factor[]} fs
 */
export function productTex(fs) {
  const { coef, groups } = group(fs);
  return groupedTex(coef, groups);
}

/**
 * One power of a factor as plain text: x², (x − 2)².
 * @param {Factor} f
 * @param {number} exp
 * @param {boolean} alone
 */
function powerText(f, exp, alone) {
  const body = polyText(f.poly);
  const wrapped = needsBrackets(f) && (!alone || exp > 1) ? `(${body})` : body;
  return exp === 1 ? wrapped : `${wrapped}${sup(exp)}`;
}

/**
 * A grouped product as plain text with the book's minus sign.
 * @param {number} coef
 * @param {Array<{ f: Factor, exp: number }>} groups
 */
export function groupedText(coef, groups) {
  const live = ordered(groups);
  if (live.length === 0) return String(coef).replace('-', MINUS);
  const alone = live.length === 1 && coef === 1;
  const body = live.map((g) => powerText(g.f, g.exp, alone)).join('');
  if (coef === 1) return body;
  if (coef === -1) return `${MINUS}${body}`;
  return `${String(coef).replace('-', MINUS)}${body}`;
}

/**
 * A product of factors as plain text.
 * @param {Factor[]} fs
 */
export function productText(fs) {
  const { coef, groups } = group(fs);
  return groupedText(coef, groups);
}

/**
 * A fraction of two products as TeX; a denominator equal to 1 is left out.
 * @param {Factor[]} top
 * @param {Factor[]} bottom
 */
export function ratioTex(top, bottom) {
  const b = productTex(bottom);
  if (b === '1') return productTex(top);
  return `\\dfrac{${productTex(top)}}{${b}}`;
}

/**
 * A fraction of two products as plain text: (x − 2)/x.
 * @param {Factor[]} top
 * @param {Factor[]} bottom
 */
export function ratioText(top, bottom) {
  const b = productText(bottom);
  const t = productText(top);
  if (b === '1') return t;
  const single = /^(\d+|x[²³⁴]?|\([^()]*\)[²³⁴]?)$/;
  const upper = hasTopLevelSign(t) ? `(${t})` : t;
  return `${upper}/${single.test(b) ? b : `(${b})`}`;
}

/**
 * Whether a plain-text expression has a + or − outside brackets, after its
 * first character (a leading minus is a sign, not an operation).
 * @param {string} s
 */
function hasTopLevelSign(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')') depth--;
    else if (i > 0 && depth === 0 && (s[i] === '+' || s[i] === MINUS)) return true;
  }
  return false;
}

/**
 * The expanded product of factors.
 * @param {Factor[]} fs
 * @returns {number[]}
 */
export function expand(fs) {
  return fs.reduce((p, f) => mul(p, f.poly), [1]);
}

/**
 * The value of a product of factors at x = a.
 * @param {Factor[]} fs
 * @param {number} a
 */
export function valueAt(fs, a) {
  return fs.reduce((v, f) => v * evaluate(f.poly, a), 1);
}

/**
 * The value of top/bottom at x = a, or null where the denominator is 0.
 * @param {Factor[]} top
 * @param {Factor[]} bottom
 * @param {number} a
 * @returns {number | null}
 */
export function ratioAt(top, bottom, a) {
  const d = valueAt(bottom, a);
  if (d === 0) return null;
  return valueAt(top, a) / d;
}

/**
 * The factors still standing after some were struck out.
 * @param {Factor[]} fs
 * @param {boolean[]} out struck flags, one per factor
 */
export function standing(fs, out) {
  return fs.filter((_, i) => !out[i]);
}

/**
 * Whether a standing factor of the numerator equals a standing factor of the
 * denominator, so the fraction can still be reduced. A number other than ±1
 * is listed as prime factors, so equal primes are what cancel.
 * @param {Factor[]} top
 * @param {boolean[]} topOut
 * @param {Factor[]} bottom
 * @param {boolean[]} bottomOut
 */
export function hasCommon(top, topOut, bottom, bottomOut) {
  return top.some(
    (f, i) =>
      !topOut[i] &&
      !(isNumber(f) && Math.abs(numberOf(f)) === 1) &&
      bottom.some((g, j) => !bottomOut[j] && g.key === f.key),
  );
}

/**
 * Least common multiple of two positive whole numbers.
 * @param {number} a
 * @param {number} b
 */
export const lcm = (a, b) => (a / gcd(a, b)) * b;

/**
 * A denominator from a coefficient and [factor, exponent] pairs.
 * @param {number} coef
 * @param {Array<[Factor, number]>} parts
 * @returns {Den}
 */
export function den(coef, parts) {
  return { coef, parts: parts.map(([f, exp]) => ({ f, exp })) };
}

/**
 * A denominator as TeX: 2x(x + 1)^{2}.
 * @param {Den} d
 */
export const denTex = (d) => groupedTex(d.coef, d.parts);

/**
 * A denominator as plain text.
 * @param {Den} d
 */
export const denText = (d) => groupedText(d.coef, d.parts);

/**
 * The expanded denominator.
 * @param {Den} d
 * @returns {number[]}
 */
export function denPoly(d) {
  let p = [d.coef];
  for (const { f, exp } of d.parts) for (let k = 0; k < exp; k++) p = mul(p, f.poly);
  return p;
}

/**
 * The simplest common denominator (mẫu thức chung): the least common
 * multiple of the coefficients times every factor to its highest power.
 * @param {Den[]} dens
 * @returns {Den}
 */
export function commonDen(dens) {
  let coef = 1;
  /** @type {Array<{ f: Factor, exp: number }>} */
  const parts = [];
  for (const d of dens) {
    coef = lcm(coef, d.coef);
    for (const { f, exp } of d.parts) {
      const p = parts.find((x) => x.f.key === f.key);
      if (!p) parts.push({ f, exp });
      else p.exp = Math.max(p.exp, exp);
    }
  }
  return { coef, parts };
}

/**
 * The exponent of a factor in a denominator (0 when it is missing).
 * @param {Den} d
 * @param {Factor} f
 */
const expOf = (d, f) => d.parts.find((p) => p.f.key === f.key)?.exp ?? 0;

/**
 * Checks a proposed common denominator against the denominators: 'low' when
 * some denominator does not divide it (`index` names the first such
 * fraction), 'high' when every one divides it but a smaller one exists,
 * 'ok' when it is the simplest common denominator.
 * @param {Den[]} dens
 * @param {Den} proposal
 * @returns {{ status: 'low', index: number } | { status: 'high' | 'ok' }}
 */
export function checkCommon(dens, proposal) {
  const index = dens.findIndex(
    (d) => proposal.coef % d.coef !== 0 || d.parts.some((p) => expOf(proposal, p.f) < p.exp),
  );
  if (index >= 0) return { status: 'low', index };
  const best = commonDen(dens);
  const same =
    proposal.coef === best.coef && best.parts.every((p) => expOf(proposal, p.f) === p.exp);
  const extra = proposal.parts.some((p) => p.exp > expOf(best, p.f));
  return { status: same && !extra ? 'ok' : 'high' };
}

/**
 * The extra factor (nhân tử phụ) of a denominator: common : d.
 * @param {Den} common
 * @param {Den} d
 * @returns {Den}
 */
export function extraFactor(common, d) {
  return {
    coef: common.coef / d.coef,
    parts: common.parts.map((p) => ({ f: p.f, exp: p.exp - expOf(d, p.f) })),
  };
}

/**
 * Reduces numerator/denominator by every factor of the denominator that
 * divides the numerator, and by the common divisor of the numbers.
 * @param {number[]} top expanded numerator
 * @param {Den} bottom
 * @returns {{ top: number[], bottom: Den }}
 */
export function reduce(top, bottom) {
  let t = trim(top);
  const parts = bottom.parts.map((p) => ({ ...p }));
  for (const p of parts) {
    while (p.exp > 0 && t.length > 0) {
      const { quotient, remainder } = longDivide(t, p.f.poly);
      if (remainder.length > 0 || quotient.some((c) => !Number.isInteger(c))) break;
      t = quotient;
      p.exp--;
    }
  }
  const g = t.length === 0 ? bottom.coef : t.reduce((a, c) => gcd(a, c), bottom.coef);
  return { top: t.map((c) => c / g), bottom: { coef: bottom.coef / g, parts } };
}

/**
 * Strikes common factors of a numerator and a denominator greedily until
 * none is left, giving the fully reduced fraction.
 * @param {Factor[]} top
 * @param {Factor[]} bottom
 * @returns {{ topOut: boolean[], bottomOut: boolean[] }}
 */
export function cancelAll(top, bottom) {
  const topOut = top.map(() => false);
  const bottomOut = bottom.map(() => false);
  top.forEach((f, i) => {
    const j = bottom.findIndex((g, k) => !bottomOut[k] && g.key === f.key);
    if (j >= 0) {
      topOut[i] = true;
      bottomOut[j] = true;
    }
  });
  return { topOut, bottomOut };
}

/**
 * A fraction of two expanded polynomials as plain text, bracketed so it reads
 * one way only: (x² − 4)/(x² + 2x), 6x²/(8x³), 5/(2x − 3), x/x².
 * @param {number[]} top
 * @param {number[]} bottom
 */
export function polyRatioText(top, bottom) {
  const t = polyText(top);
  const b = polyText(bottom);
  return `${t.includes(' ') ? `(${t})` : t}/${/^(\d+|x[²³⁴]?)$/.test(b) ? b : `(${b})`}`;
}
