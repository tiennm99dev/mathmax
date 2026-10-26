/**
 * Collecting a polynomial by hand: the learner picks terms and merges them;
 * a merge is allowed only when every picked term is alike, and a sum of zero
 * removes the term. When no two terms are alike the polynomial is collected
 * and its degree is the highest degree among its terms.
 */

import { alike, mono, monoDegree, monoText, parsePoly, polyText } from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Mono} Mono */
/** @typedef {{ id: string, m: Mono }} Term */

/** The polynomials of the widget, as written before collecting. */
export const PRESETS = [
  { name: 'M', src: 'x^2y + 3xy - 3x^2y - 3 + 2xy + 4' },
  { name: 'N', src: 'x^4y - 2xy^2 + 3 - x^4y + xy^2 + 7x^2' },
  { name: 'P', src: '5x^2y^3 - 2xy + x^3 - 4x^2y^3 + 3xy - x^3 + y^2' },
];

/**
 * The terms of a preset with stable ids t0, t1, ….
 * @param {string} src
 * @returns {Term[]}
 */
export function termsOf(src) {
  return parsePoly(src).map((m, i) => ({ id: `t${i}`, m }));
}

/**
 * A term as it appears inside the polynomial: the first one bare, the others
 * with their sign in front ('+ 3xy', '− 3x²y').
 * @param {Mono} m
 * @param {boolean} first
 */
export function signedText(m, first) {
  if (first) return monoText(m);
  return `${m.coef < 0 ? '−' : '+'} ${monoText(mono(Math.abs(m.coef), m.vars))}`;
}

/**
 * Merges the picked terms. The sum takes the place of the first picked term;
 * a sum of zero drops it.
 * @param {Term[]} terms
 * @param {string[]} ids
 * @returns {{ ok: boolean, terms: Term[], message: string }}
 */
export function mergeTerms(terms, ids) {
  const picked = terms.filter((t) => ids.includes(t.id));
  if (picked.length < 2) {
    return { ok: false, terms, message: 'Hãy chọn ít nhất hai hạng tử đồng dạng để gộp.' };
  }
  const odd = picked.find((t) => !alike(t.m, picked[0].m));
  if (odd) {
    return {
      ok: false,
      terms,
      message: `Không gộp được: ${monoText(picked[0].m)} và ${monoText(odd.m)} không đồng dạng (phần biến khác nhau).`,
    };
  }
  const coef = picked.reduce((s, t) => s + t.m.coef, 0);
  const sum = mono(coef, picked[0].m.vars);
  const line = `${polyText(picked.map((t) => t.m))} = ${monoText(sum)}`;
  const out = [];
  for (const t of terms) {
    if (t.id === picked[0].id) {
      if (coef !== 0) out.push({ id: t.id, m: sum });
    } else if (!ids.includes(t.id)) out.push(t);
  }
  return {
    ok: true,
    terms: out,
    message: coef === 0 ? `${line}: các hạng tử này triệt tiêu nhau.` : `Gộp: ${line}.`,
  };
}

/**
 * The degree of every term of a collected polynomial and the highest one.
 * @param {Term[]} terms
 * @returns {{ degrees: Array<number | null>, max: number | null }}
 */
export function degrees(terms) {
  const degrees = terms.map((t) => monoDegree(t.m));
  const nums = /** @type {number[]} */ (degrees.filter((d) => d !== null));
  return { degrees, max: nums.length ? Math.max(...nums) : null };
}
