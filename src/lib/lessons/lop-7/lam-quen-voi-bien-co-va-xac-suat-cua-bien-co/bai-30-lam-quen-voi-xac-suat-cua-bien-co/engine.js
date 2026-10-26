/**
 * A lucky wheel cut into n numbered cells. With equal cells the n outcomes
 * are equally likely, so an event made of k cells has probability k/n; with
 * one oversized cell they are not, and counting cells gives the wrong value.
 */

import { fraction, simplify } from '#lib/fraction-engine/fraction.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */
/** @typedef {'deu' | 'lech'} WheelMode 'deu': equal cells; 'lech': cell 1 fills half the wheel */

export const MIN_CELLS = 2;
export const MAX_CELLS = 12;

/** @param {number} k */
const isPrime = (k) => {
  if (k < 2) return false;
  for (let d = 2; d * d <= k; d++) if (k % d === 0) return false;
  return true;
};

/**
 * Events on the number the arrow points to.
 * @type {ReadonlyArray<{ id: string, label: string, test: (k: number) => boolean }>}
 */
export const EVENTS = [
  { id: 'o-1', label: 'Mũi tên chỉ vào ô số 1', test: (k) => k === 1 },
  { id: 'chan', label: 'Mũi tên chỉ vào ô ghi số chẵn', test: (k) => k % 2 === 0 },
  { id: 'le', label: 'Mũi tên chỉ vào ô ghi số lẻ', test: (k) => k % 2 === 1 },
  { id: 'chia-het-3', label: 'Mũi tên chỉ vào ô ghi số chia hết cho 3', test: (k) => k % 3 === 0 },
  { id: 'nguyen-to', label: 'Mũi tên chỉ vào ô ghi số nguyên tố', test: isPrime },
  { id: 'nho-hon-13', label: 'Mũi tên chỉ vào ô ghi số nhỏ hơn 13', test: (k) => k < 13 },
  { id: 'lon-hon-12', label: 'Mũi tên chỉ vào ô ghi số lớn hơn 12', test: (k) => k > 12 },
];

/**
 * The numbers 1..n written on the cells.
 * @param {number} n
 */
export function cells(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

/**
 * The cells that make the event happen.
 * @param {number} n @param {(k: number) => boolean} test
 */
export function favourable(n, test) {
  return cells(n).filter(test);
}

/**
 * How much of the wheel each cell takes, as whole-number weights. With
 * 'lech', cell 1 weighs as much as all the others together, so it fills half
 * the wheel.
 * @param {number} n @param {WheelMode} mode
 */
export function weights(n, mode) {
  return cells(n).map((k) => (mode === 'lech' && k === 1 ? n - 1 : 1));
}

/**
 * Probability from counting cells, k/n, in lowest terms. Right only when the
 * cells are equal.
 * @param {number} n @param {(k: number) => boolean} test
 * @returns {Fraction}
 */
export function countRatio(n, test) {
  return simplify(fraction(favourable(n, test).length, n));
}

/**
 * The true probability: the share of the wheel the event's cells cover.
 * @param {number} n @param {WheelMode} mode @param {(k: number) => boolean} test
 * @returns {Fraction}
 */
export function trueProbability(n, mode, test) {
  const w = weights(n, mode);
  const total = w.reduce((s, x) => s + x, 0);
  const hit = w.reduce((s, x, i) => s + (test(i + 1) ? x : 0), 0);
  return simplify(fraction(hit, total));
}

/**
 * How many recorded spins made the event happen; `counts[i]` is how often
 * cell i + 1 came up.
 * @param {number[]} counts @param {(k: number) => boolean} test
 */
export function hits(counts, test) {
  return counts.reduce((s, c, i) => s + (test(i + 1) ? (c ?? 0) : 0), 0);
}

/**
 * A fraction as TeX: '\frac{1}{2}', or a whole number.
 * @param {Fraction} f
 */
export function fracTex(f) {
  return f.d === 1 ? String(f.n) : `\\frac{${f.n}}{${f.d}}`;
}
