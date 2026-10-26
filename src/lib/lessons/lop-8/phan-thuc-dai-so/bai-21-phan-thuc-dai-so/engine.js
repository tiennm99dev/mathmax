/**
 * The fractions of the "Bài 21" widget: each is a numerator and a
 * denominator in factored form, shown expanded as the book writes them. The
 * learner moves x and sees where the denominator is 0, so the fraction is not
 * defined (không xác định), and, for a fraction with a partner, that two equal
 * fractions satisfy A·D = B·C.
 */

import { evaluate } from '#lib/algebra-engine/polynomial.js';
import { X, expand, factor, lin, num, valueAt } from '../_shared/factors.js';

/** @typedef {import('../_shared/factors.js').Factor} Factor */

/**
 * @typedef {object} Preset
 * @property {Factor[]} top
 * @property {Factor[]} bottom
 * @property {{ top: Factor[], bottom: Factor[] }} [partner] an equal fraction
 */

/** @type {Preset[]} */
export const PRESETS = [
  { top: [lin(1)], bottom: [lin(-2)] },
  { top: [num(5)], bottom: [factor(-3, 2)] },
  { top: [lin(-1)], bottom: [lin(-2), lin(2)] },
  {
    top: [lin(-1), lin(1)],
    bottom: [X, lin(1)],
    partner: { top: [lin(-1)], bottom: [X] },
  },
  { top: [X], bottom: [factor(1, 0, 1)] },
];

/**
 * The values of x where a product of factors is 0, from its linear factors,
 * in increasing order without repeats.
 * @param {Factor[]} fs
 * @returns {number[]}
 */
export function zeros(fs) {
  const out = new Set();
  for (const f of fs) {
    if (f.poly.length === 2) out.add(-f.poly[0] / f.poly[1] + 0);
  }
  return [...out].sort((a, b) => a - b);
}

/**
 * Numerator, denominator and value of top/bottom at x = a; `value` is null
 * where the denominator is 0.
 * @param {Factor[]} top
 * @param {Factor[]} bottom
 * @param {number} a
 */
export function substitute(top, bottom, a) {
  const t = evaluate(expand(top), a);
  const b = evaluate(expand(bottom), a);
  return { top: t, bottom: b, value: b === 0 ? null : t / b };
}

/**
 * The cross products A·D and B·C of A/B and C/D at x = a.
 * @param {Preset} preset
 * @param {number} a
 */
export function crossAt(preset, a) {
  const p = preset.partner;
  if (!p) return null;
  return {
    ad: valueAt(preset.top, a) * valueAt(p.bottom, a),
    bc: valueAt(preset.bottom, a) * valueAt(p.top, a),
  };
}
