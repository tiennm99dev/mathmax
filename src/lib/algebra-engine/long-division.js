/**
 * Long division in the book's layout: polynomials in one variable, and the
 * natural-number long division that it mirrors. Each polynomial round has
 * three actions: divide the leading terms (chia), multiply the divisor by
 * that quotient term (nhân), subtract (trừ). For numbers the subtraction
 * also brings the next digit down (hạ).
 */

import { add, degree, mul, sub, trim } from './polynomial.js';

/** @typedef {import('./polynomial.js').Term} Term */

/**
 * @typedef {object} PolyRound
 * @property {Term} term the quotient term found by dividing leading terms
 * @property {number[]} product divisor times that term
 * @property {number[]} rest what is left after subtracting the product
 */

/**
 * Quotient of two terms, ax^m : bx^n = (a : b)x^(m − n); null when m < n or
 * b = 0, where the quotient is not a monomial.
 * @param {Term} a
 * @param {Term} b
 * @returns {Term | null}
 */
export function divideTerm(a, b) {
  if (b.c === 0 || a.e < b.e) return null;
  return { c: Math.round((a.c / b.c) * 1e9) / 1e9, e: a.e - b.e };
}

/**
 * The leading term of a non-zero collected polynomial.
 * @param {number[]} p
 * @returns {Term}
 */
export const lead = (p) => {
  const q = trim(p);
  return { c: q[q.length - 1], e: q.length - 1 };
};

/**
 * Long division of p by a non-zero q: rounds go on while the rest has a
 * degree at least that of q, so the remainder is 0 or of lower degree.
 * @param {number[]} p
 * @param {number[]} q
 * @returns {{ quotient: number[], remainder: number[], rounds: PolyRound[] }}
 */
export function longDivide(p, q) {
  const d = degree(q);
  if (d === null) throw new Error('division by the zero polynomial');
  /** @type {PolyRound[]} */
  const rounds = [];
  /** @type {number[]} */
  let quotient = [];
  let rest = trim(p);
  while (rest.length > 0 && rest.length - 1 >= d) {
    const term = /** @type {Term} */ (divideTerm(lead(rest), lead(q)));
    /** @type {number[]} */
    const single = Array(term.e + 1).fill(0);
    single[term.e] = term.c;
    const product = mul(q, single);
    // Subtracting must cancel the leading term exactly, even with decimals.
    const next = sub(rest, product).slice(0, rest.length - 1);
    rounds.push({ term, product, rest: trim(next) });
    quotient = add(quotient, single);
    rest = trim(next);
  }
  return { quotient, remainder: rest, rounds };
}

/**
 * @typedef {object} NumberRound
 * @property {number} digit the quotient digit
 * @property {number} partial the number divided in this round
 * @property {number} product digit times the divisor
 * @property {number} rest partial minus product
 * @property {number} end index of the last dividend digit used so far
 */

/**
 * Long division of natural numbers as taught in primary school: start with
 * the shortest leading part of a that is at least b, then bring down one
 * digit per round.
 * @param {number} a
 * @param {number} b
 * @returns {{ quotient: number, remainder: number, rounds: NumberRound[] }}
 */
export function numberDivide(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b <= 0) {
    throw new Error('natural numbers only, divisor positive');
  }
  const digits = String(a).split('').map(Number);
  /** @type {NumberRound[]} */
  const rounds = [];
  let end = 0;
  let partial = digits[0];
  while (partial < b && end < digits.length - 1) {
    end += 1;
    partial = partial * 10 + digits[end];
  }
  if (partial < b) return { quotient: 0, remainder: a, rounds };
  for (;;) {
    const digit = Math.floor(partial / b);
    const product = digit * b;
    const rest = partial - product;
    rounds.push({ digit, partial, product, rest, end });
    if (end === digits.length - 1) break;
    end += 1;
    partial = rest * 10 + digits[end];
  }
  return { quotient: Math.floor(a / b), remainder: a % b, rounds };
}
