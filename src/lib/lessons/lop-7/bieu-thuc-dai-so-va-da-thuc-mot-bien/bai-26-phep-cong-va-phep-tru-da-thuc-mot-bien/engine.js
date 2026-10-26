/**
 * Adding and subtracting two polynomials column by column: each column holds
 * the terms of one degree, highest first, and its result is the sum (or
 * difference) of the two coefficients.
 */

import { collect, termTex } from '../_shared/poly.js';

/**
 * Pairs of polynomials, each written in the (unsorted) order of the problem.
 * @type {Array<{ id: string, label: string, p: Array<{ c: number, e: number }>, q: Array<{ c: number, e: number }> }>}
 */
export const PAIRS = [
  {
    id: 'mot',
    label: 'Cặp 1',
    p: [
      { c: 5, e: 1 },
      { c: -1, e: 0 },
      { c: 2, e: 3 },
      { c: -3, e: 2 },
    ],
    q: [
      { c: 1, e: 2 },
      { c: 4, e: 0 },
      { c: -2, e: 3 },
    ],
  },
  {
    id: 'hai',
    label: 'Cặp 2',
    p: [
      { c: 1, e: 4 },
      { c: 3, e: 2 },
      { c: -2, e: 1 },
      { c: 1, e: 0 },
    ],
    q: [
      { c: 2, e: 1 },
      { c: -2, e: 3 },
      { c: -4, e: 0 },
      { c: 1, e: 2 },
    ],
  },
  {
    id: 'ba',
    label: 'Cặp 3',
    p: [
      { c: 2, e: 1 },
      { c: 0.5, e: 2 },
      { c: -3, e: 0 },
    ],
    q: [
      { c: -1, e: 1 },
      { c: 1.5, e: 2 },
    ],
  },
];

/** @typedef {{ e: number, a: number, b: number, r: number }} Column */

/**
 * One column per degree from the highest down to 0. `a`, `b` are the
 * coefficients of P and Q (0 when missing), `r` the result.
 * @param {Array<{ c: number, e: number }>} pTerms
 * @param {Array<{ c: number, e: number }>} qTerms
 * @param {'+' | '-'} op
 * @returns {Column[]}
 */
export function columns(pTerms, qTerms, op) {
  const p = collect(pTerms);
  const q = collect(qTerms);
  const top = Math.max(p.length, q.length) - 1;
  /** @type {Column[]} */
  const out = [];
  for (let e = top; e >= 0; e--) {
    const a = p[e] ?? 0;
    const b = q[e] ?? 0;
    const r = Math.round((op === '+' ? a + b : a - b) * 1e9) / 1e9;
    out.push({ e, a, b, r });
  }
  return out;
}

/**
 * A coefficient times xᵉ as TeX, bracketed when negative; '0' when missing.
 * @param {number} c
 * @param {number} e
 */
function bracketTerm(c, e) {
  if (c === 0) return '0';
  const t = termTex({ c, e });
  return c < 0 ? `(${t})` : t;
}

/**
 * The working of one column as TeX: (−3x²) + x² = −2x².
 * @param {Column} col
 * @param {'+' | '-'} op
 */
export function columnTex({ e, a, b, r }, op) {
  return `${bracketTerm(a, e)} ${op} ${bracketTerm(b, e)} = ${r === 0 ? '0' : termTex({ c: r, e })}`;
}
