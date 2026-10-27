/**
 * The sample space of rolling two dice, as a 6 × 6 grid of outcomes (i, j),
 * the events the widget asks about, and the check of the cells a learner
 * marked as favourable. A cell key is 'i-j'.
 */

import { lowestTerms } from '#lib/core/fractions.js';
import { isPrime } from '#lib/numtheory-engine/index.js';

export const FACES = [1, 2, 3, 4, 5, 6];

/** Every outcome (i, j) in row order. */
export const CELLS = FACES.flatMap((i) => FACES.map((j) => ({ i, j, key: `${i}-${j}` })));

/**
 * @typedef {object} DiceEvent
 * @property {string} id
 * @property {string} text the event as said in the book, without quotes
 * @property {(i: number, j: number) => boolean} test
 */

/** @type {DiceEvent[]} */
export const EVENTS = [
  { id: 'tong-7', text: 'Tổng số chấm bằng 7', test: (i, j) => i + j === 7 },
  { id: 'bang-nhau', text: 'Hai con xúc xắc có số chấm bằng nhau', test: (i, j) => i === j },
  { id: 'tong-10', text: 'Tổng số chấm không nhỏ hơn 10', test: (i, j) => i + j >= 10 },
  {
    id: 'co-6',
    text: 'Có ít nhất một con xúc xắc ra mặt 6 chấm',
    test: (i, j) => i === 6 || j === 6,
  },
  { id: 'hieu-2', text: 'Hai số chấm hơn kém nhau 2', test: (i, j) => Math.abs(i - j) === 2 },
  { id: 'tich-chan', text: 'Tích hai số chấm là số chẵn', test: (i, j) => (i * j) % 2 === 0 },
  { id: 'tong-nt', text: 'Tổng số chấm là số nguyên tố', test: (i, j) => isPrime(i + j) },
  {
    id: 'xanh-lon-hon',
    text: 'Số chấm của con thứ nhất lớn hơn số chấm của con thứ hai',
    test: (i, j) => i > j,
  },
];

/**
 * Keys of the outcomes favourable to an event.
 * @param {DiceEvent} event
 */
export const favourable = (event) => CELLS.filter((c) => event.test(c.i, c.j)).map((c) => c.key);

/**
 * Compares the marked cells with the favourable outcomes.
 * @param {ReadonlySet<string>} marked
 * @param {DiceEvent} event
 * @returns {{ missing: string[], extra: string[], right: boolean }}
 */
export function check(marked, event) {
  const fav = favourable(event);
  const missing = fav.filter((k) => !marked.has(k));
  const extra = [...marked].filter((k) => !fav.includes(k));
  return { missing, extra, right: missing.length === 0 && extra.length === 0 };
}

/**
 * P(E) = k/36 and its lowest terms.
 * @param {number} k number of favourable outcomes
 * @param {number} [n] number of outcomes
 * @returns {{ k: number, n: number, p: number, q: number }}
 */
export function probability(k, n = CELLS.length) {
  const [p, q] = k === 0 ? [0, 1] : lowestTerms(k, n);
  return { k, n, p, q };
}

/**
 * TeX for P(E) = k/n = p/q, leaving out a repeated lowest-terms step.
 * @param {number} k
 * @param {number} [n]
 */
export function probabilityTex(k, n = CELLS.length) {
  const { p, q } = probability(k, n);
  const first = `P(E) = \\dfrac{${k}}{${n}}`;
  if (k === 0) return `${first} = 0`;
  if (p === k) return first;
  return `${first} = ${q === 1 ? p : `\\dfrac{${p}}{${q}}`}`;
}

/**
 * What a cell shows: the pair, the sum or the product of the two faces.
 * @param {'cap' | 'tong' | 'tich'} mode
 * @param {number} i
 * @param {number} j
 */
export const cellText = (mode, i, j) =>
  mode === 'tong' ? String(i + j) : mode === 'tich' ? String(i * j) : `(${i}, ${j})`;
