/**
 * Adding and subtracting polynomials in columns: for A − B every term of B
 * changes sign first (A − B = A + (−B)); then like terms of the two rows line
 * up in one column, and each column adds its coefficients.
 */

import { collect, mono, neg, parsePoly, varKey } from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Mono} Mono */
/** @typedef {'+' | '-'} Op */

/**
 * @typedef {object} Column
 * @property {string} key the variable part shared by the column
 * @property {Mono | null} a the term of A in this column, if any
 * @property {Mono | null} b the term of the second row (B, or −B) in it, if any
 * @property {Mono} sum their sum, possibly with coefficient 0
 */

/** @type {Array<{ a: string, b: string, op: Op }>} */
export const PAIRS = [
  { a: 'x^2y - 3xy + 2y', b: '4xy + x^2y - 5', op: '+' },
  { a: '3x^2 - 2xy + y^2', b: 'x^2 + 5xy - y^2', op: '-' },
  { a: '2x^2y^2 - xy + 3', b: '-2x^2y^2 + 6xy + y', op: '+' },
  { a: '5xy^2 - x^3 + 4', b: '2xy^2 + 4 - x^3', op: '-' },
];

/**
 * The two rows to add: A, and B or −B.
 * @param {{ a: string, b: string, op: Op }} pair
 */
export function rows(pair) {
  const a = parsePoly(pair.a);
  const b = parsePoly(pair.b);
  return { a, b, second: pair.op === '-' ? neg(b) : b };
}

/**
 * Lines up two collected rows: one column per variable part, in the order the
 * parts first appear (A first, then what only B has).
 * @param {Mono[]} a
 * @param {Mono[]} b
 * @returns {Column[]}
 */
export function columns(a, b) {
  /** @type {string[]} */
  const keys = [];
  for (const t of [...a, ...b]) if (!keys.includes(varKey(t))) keys.push(varKey(t));
  return keys.map((key) => {
    const ta = a.find((t) => varKey(t) === key) ?? null;
    const tb = b.find((t) => varKey(t) === key) ?? null;
    const vars = /** @type {Mono} */ (ta ?? tb).vars;
    return { key, a: ta, b: tb, sum: mono((ta?.coef ?? 0) + (tb?.coef ?? 0), vars) };
  });
}

/**
 * The collected result of the pair.
 * @param {{ a: string, b: string, op: Op }} pair
 */
export function result(pair) {
  const { a, second } = rows(pair);
  return collect([...a, ...second]);
}

/**
 * Reads a coefficient typed into a column: an integer with an optional sign
 * (hyphen or the book's minus). Empty means 0 is not assumed: returns null.
 * @param {string} text
 * @returns {number | null}
 */
export function readCoef(text) {
  const s = text.trim().replace(/[−–]/g, '-').replace(/\s/g, '');
  if (!/^[+-]?\d+$/.test(s)) return null;
  const n = Number(s);
  return n === 0 ? 0 : n;
}
