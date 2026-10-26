/**
 * The sums and differences of the "Bài 23" widget. Each term is a numerator
 * over a factorised denominator. The learner builds the common denominator
 * (mẫu thức chung) from the factors; once it is the simplest one, every
 * fraction is multiplied by its extra factor (nhân tử phụ), the numerators are
 * added or subtracted and the result is reduced.
 */

import { add, mul, polyTex } from '#lib/algebra-engine/polynomial.js';
import {
  X,
  commonDen,
  den,
  denPoly,
  denTex,
  extraFactor,
  lin,
  reduce,
} from '../_shared/factors.js';

/** @typedef {import('../_shared/factors.js').Den} Den */
/** @typedef {import('../_shared/factors.js').Factor} Factor */

/**
 * @typedef {object} Term
 * @property {1 | -1} sign
 * @property {number[]} top numerator, ascending coefficients
 * @property {Den} bottom
 */

/** @type {Term[][]} */
export const PRESETS = [
  [
    { sign: 1, top: [1, 2], bottom: den(1, [[lin(3), 1]]) },
    { sign: 1, top: [8, 1], bottom: den(1, [[lin(3), 1]]) },
  ],
  [
    { sign: 1, top: [3], bottom: den(2, [[X, 1]]) },
    { sign: 1, top: [5], bottom: den(4, [[X, 2]]) },
  ],
  [
    {
      sign: 1,
      top: [0, 1],
      bottom: den(1, [
        [lin(-2), 1],
        [lin(2), 1],
      ]),
    },
    { sign: -1, top: [1], bottom: den(1, [[lin(2), 1]]) },
  ],
  [
    {
      sign: 1,
      top: [1],
      bottom: den(1, [
        [X, 1],
        [lin(1), 1],
      ]),
    },
    { sign: 1, top: [1], bottom: den(1, [[lin(1), 1]]) },
  ],
  [
    { sign: 1, top: [2], bottom: den(1, [[lin(-1), 1]]) },
    {
      sign: -1,
      top: [3, 1],
      bottom: den(1, [
        [lin(-1), 1],
        [lin(1), 1],
      ]),
    },
  ],
  [
    { sign: 1, top: [1], bottom: den(1, [[lin(-1), 1]]) },
    { sign: 1, top: [1], bottom: den(1, [[lin(1), 1]]) },
    {
      sign: 1,
      top: [2],
      bottom: den(1, [
        [lin(-1), 1],
        [lin(1), 1],
      ]),
    },
  ],
];

/**
 * The distinct non-number factors of the denominators, in order of first
 * appearance.
 * @param {Term[]} terms
 * @returns {Factor[]}
 */
export function baseFactors(terms) {
  return commonDen(terms.map((t) => t.bottom)).parts.map((p) => p.f);
}

/**
 * A polynomial as TeX, bracketed when it has more than one term and is
 * multiplied.
 * @param {number[]} p
 */
const bracket = (p) => (p.filter((c) => c !== 0).length > 1 ? `(${polyTex(p)})` : polyTex(p));

/**
 * The expression as the book prints it, denominators expanded.
 * @param {Term[]} terms
 */
export function expressionTex(terms) {
  return terms
    .map((t, i) => {
      const frac = `\\dfrac{${polyTex(t.top)}}{${polyTex(denPoly(t.bottom))}}`;
      if (i === 0) return t.sign < 0 ? `-${frac}` : frac;
      return `${t.sign < 0 ? ' - ' : ' + '}${frac}`;
    })
    .join('');
}

/**
 * Each fraction brought to the common denominator, the numerator after
 * adding or subtracting, and the reduced result.
 * @param {Term[]} terms
 */
export function combine(terms) {
  const common = commonDen(terms.map((t) => t.bottom));
  const rows = terms.map((t) => {
    const extra = extraFactor(common, t.bottom);
    return { extra, top: mul(t.top, denPoly(extra)) };
  });
  const sum = rows.reduce(
    (acc, r, i) => add(acc, mul(r.top, [terms[i].sign])),
    /** @type {number[]} */ ([]),
  );
  const steps = rows
    .map((r, i) => {
      if (i === 0) return terms[i].sign < 0 ? `-${bracket(r.top)}` : polyTex(r.top);
      const body = bracket(r.top);
      return `${terms[i].sign < 0 ? ' - ' : ' + '}${body}`;
    })
    .join('');
  return { common, rows, sum, steps, result: reduce(sum, common) };
}

/**
 * A fraction with an expanded numerator over a factorised denominator, as
 * TeX; a denominator equal to 1 is left out.
 * @param {number[]} top
 * @param {Den} bottom
 */
export function fracTex(top, bottom) {
  const b = denTex(bottom);
  return b === '1' ? polyTex(top) : `\\dfrac{${polyTex(top)}}{${b}}`;
}
