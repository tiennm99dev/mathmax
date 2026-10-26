/**
 * The area model of a polynomial product: the terms of the first factor
 * label the rows, the terms of the second the columns, and each cell holds
 * the product of its row term and column term. Adding every cell, with like
 * cells collected, gives the product.
 */

import { mulMono, mulPoly, parsePoly, varKey } from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Mono} Mono */
/** @typedef {{ i: number, j: number, a: Mono, b: Mono, p: Mono }} Cell */

/** The products of the widget: a monomial times a polynomial, then binomials. */
export const PRODUCTS = [
  { a: '2x', b: '3x^2 - 5xy + 1' },
  { a: 'x + 2y', b: 'x - y' },
  { a: '2x - 3y', b: 'x + y + 4' },
  { a: 'x + y', b: 'x^2 - xy + y^2' },
];

/**
 * The factors of a preset.
 * @param {{ a: string, b: string }} item
 */
export function factors(item) {
  return { a: parsePoly(item.a), b: parsePoly(item.b) };
}

/**
 * Every cell of the table, row by row.
 * @param {Mono[]} a
 * @param {Mono[]} b
 * @returns {Cell[]}
 */
export function cells(a, b) {
  return a.flatMap((s, i) => b.map((t, j) => ({ i, j, a: s, b: t, p: mulMono(s, t) })));
}

/**
 * A colour group per variable part that occurs in more than one cell (like
 * products that will be added), numbered from 0 in order of appearance;
 * cells with a part of their own get -1.
 * @param {Cell[]} list
 * @returns {number[]}
 */
export function likeGroups(list) {
  /** @type {Map<string, number>} */
  const count = new Map();
  for (const c of list) count.set(varKey(c.p), (count.get(varKey(c.p)) ?? 0) + 1);
  /** @type {Map<string, number>} */
  const group = new Map();
  return list.map((c) => {
    const key = varKey(c.p);
    if ((count.get(key) ?? 0) < 2) return -1;
    if (!group.has(key)) group.set(key, group.size);
    return /** @type {number} */ (group.get(key));
  });
}

/**
 * The collected product of a preset.
 * @param {{ a: string, b: string }} item
 */
export function product(item) {
  const { a, b } = factors(item);
  return mulPoly(a, b);
}
