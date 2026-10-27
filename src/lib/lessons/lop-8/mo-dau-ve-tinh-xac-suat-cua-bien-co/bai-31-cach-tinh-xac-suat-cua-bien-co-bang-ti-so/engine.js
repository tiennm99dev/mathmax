/**
 * The ball box of the ratio widget: how many balls of each colour, which
 * colours make the event happen, and the probability as the ratio of
 * favourable outcomes to possible outcomes (each ball is one outcome).
 */

import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {'do' | 'xanh' | 'vang'} Colour */

/** @type {ReadonlyArray<{ id: Colour, name: string, fill: string }>} */
export const COLOURS = [
  { id: 'do', name: 'đỏ', fill: '#dc2626' },
  { id: 'xanh', name: 'xanh', fill: '#2563eb' },
  { id: 'vang', name: 'vàng', fill: '#eab308' },
];

/** The most balls of one colour the widget allows. */
export const MAX_PER_COLOUR = 12;

/**
 * @typedef {object} BallEvent
 * @property {string} id
 * @property {string} text
 * @property {Colour[]} colours the colours that make it happen
 */

/** @type {BallEvent[]} */
export const EVENTS = [
  { id: 'do', text: 'Lấy được viên bi màu đỏ', colours: ['do'] },
  { id: 'xanh', text: 'Lấy được viên bi màu xanh', colours: ['xanh'] },
  { id: 'vang', text: 'Lấy được viên bi màu vàng', colours: ['vang'] },
  { id: 'khong-do', text: 'Lấy được viên bi không phải màu đỏ', colours: ['xanh', 'vang'] },
  { id: 'do-vang', text: 'Lấy được viên bi màu đỏ hoặc vàng', colours: ['do', 'vang'] },
];

/**
 * The balls in the box, colour by colour, in a fixed order.
 * @param {Record<Colour, number>} counts
 * @returns {Colour[]}
 */
export function balls(counts) {
  return COLOURS.flatMap((c) => Array.from({ length: counts[c.id] }, () => c.id));
}

/**
 * P(E) as a ratio: favourable outcomes k over possible outcomes n, and the
 * same ratio in lowest terms (p/q). With an empty box there is no ratio.
 * @param {Record<Colour, number>} counts
 * @param {readonly Colour[]} colours
 * @returns {{ k: number, n: number, p: number, q: number } | null}
 */
export function ratio(counts, colours) {
  const n = COLOURS.reduce((s, c) => s + counts[c.id], 0);
  if (n === 0) return null;
  const k = colours.reduce((s, c) => s + counts[c], 0);
  const g = gcd(k, n) || 1;
  return { k, n, p: k / g, q: n / g };
}

/**
 * TeX for P(E) = k/n, followed by the lowest terms when they differ, and by
 * 0 or 1 for the impossible and the certain event.
 * @param {{ k: number, n: number, p: number, q: number }} r
 */
export function ratioTex(r) {
  const first = `P(E) = \\dfrac{${r.k}}{${r.n}}`;
  if (r.k === 0) return `${first} = 0`;
  if (r.k === r.n) return `${first} = 1`;
  return r.p === r.k ? first : `${first} = \\dfrac{${r.p}}{${r.q}}`;
}
