/**
 * The multiplication grid for a product of two polynomials: one row per
 * term of the first factor, one column per term of the second, and each
 * cell the product of its row and column terms. Adding the cells of equal
 * degree gives the product.
 */

import { collect, polyTex, termTex, termsOf } from '#lib/algebra-engine/polynomial.js';

/** @typedef {import('#lib/algebra-engine/polynomial.js').Term} Term */

/**
 * Factors by degree (`[−2, 1]` is x − 2).
 * @type {Array<{ id: string, label: string, p: number[], q: number[] }>}
 */
export const PRODUCTS = [
  { id: 'don-thuc', label: '2x · (3x² − x + 5)', p: [0, 2], q: [5, -1, 3] },
  { id: 'hai-nhi-thuc', label: '(2x + 3)(x − 1)', p: [3, 2], q: [-1, 1] },
  { id: 'dien-tich', label: '(x + 3)(x + 2)', p: [3, 1], q: [2, 1] },
  { id: 'triet-tieu', label: '(x − 2)(x² + 2x + 4)', p: [-2, 1], q: [4, 2, 1] },
];

/**
 * Product of two terms: multiply the coefficients, add the exponents.
 * @param {Term} a
 * @param {Term} b
 * @returns {Term}
 */
export function timesTerm(a, b) {
  return { c: Math.round(a.c * b.c * 1e9) / 1e9, e: a.e + b.e };
}

/**
 * Row terms, column terms and the cell products, highest degree first.
 * @param {number[]} p
 * @param {number[]} q
 */
export function grid(p, q) {
  const rows = termsOf(p);
  const cols = termsOf(q);
  return { rows, cols, cells: rows.map((r) => cols.map((c) => timesTerm(r, c))) };
}

/**
 * The cells added up by degree: the product, collected.
 * @param {Term[][]} cells
 */
export function sumCells(cells) {
  return collect(cells.flat());
}

/**
 * A term in brackets for a product, unless it is a lone positive term.
 * @param {Term} t
 */
const factor = (t) => (t.c < 0 ? `(${termTex(t)})` : termTex(t));

/**
 * The working of one cell: (2x) · (−x) = −2x².
 * @param {Term} a
 * @param {Term} b
 */
export function cellTex(a, b) {
  return `${factor(a)} \\cdot ${factor(b)} = ${termTex(timesTerm(a, b))}`;
}

/**
 * The product written as TeX: 2x \\cdot (3x^{2} - x + 5) or (2x + 3)(x - 1).
 * @param {number[]} p
 * @param {number[]} q
 */
export function productTex(p, q) {
  const single = termsOf(p).length === 1;
  const right = `(${polyTex(q)})`;
  return single ? `${polyTex(p)} \\cdot ${right}` : `(${polyTex(p)})${right}`;
}
