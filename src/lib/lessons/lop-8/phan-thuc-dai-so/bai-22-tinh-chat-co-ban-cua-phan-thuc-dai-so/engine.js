/**
 * The fractions of the "Bài 22" widget: each is given expanded, as the book
 * prints it, and as factor cards after factorisation, with numbers split
 * into primes so that equal primes cancel. The tests strike common
 * factors with `cancelAll` to confirm each reduced form.
 */

import { X, lin, num } from '../_shared/factors.js';

/** @typedef {import('../_shared/factors.js').Factor} Factor */

/**
 * @typedef {object} Preset
 * @property {Factor[]} top
 * @property {Factor[]} bottom
 * @property {string} why what the learner should notice
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    top: [num(2), num(3), X, X],
    bottom: [num(2), num(2), num(2), X, X, X],
    why: '6x² = 2·3·x·x và 8x³ = 2·2·2·x·x·x có nhân tử chung 2x².',
  },
  {
    top: [lin(-2), lin(2)],
    bottom: [X, lin(2)],
    why: 'x² − 4 = (x − 2)(x + 2) và x² + 2x = x(x + 2) có nhân tử chung x + 2.',
  },
  {
    top: [num(3), lin(-2)],
    bottom: [lin(-2), lin(-2)],
    why: '3x − 6 = 3(x − 2) và x² − 4x + 4 = (x − 2)² có nhân tử chung x − 2.',
  },
  {
    top: [lin(-1), lin(1)],
    bottom: [X, lin(-1), lin(1)],
    why: 'Khi mọi nhân tử của tử đều bị gạch, tử còn lại là 1.',
  },
  {
    top: [num(2), lin(2)],
    bottom: [lin(2), lin(3)],
    why: 'x² + 5x + 6 = (x + 2)(x + 3) có nhân tử chung x + 2 với 2x + 4 = 2(x + 2).',
  },
  {
    top: [lin(2)],
    bottom: [lin(4)],
    why: 'x là một hạng tử chứ không phải nhân tử của x + 2, nên không được gạch.',
  },
];
