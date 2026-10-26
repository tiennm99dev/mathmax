/**
 * Logic of the "place a rational number on the number line" widget: the
 * targets, which division of the unit segment can show them, and reading
 * the marker as a fraction k/n.
 */

import { compare, fraction, simplify } from '#lib/fraction-engine/index.js';
import { MINUS } from '../_shared/rational.js';

/** @typedef {import('../_shared/rational.js').Written} Written */

/** How many equal parts the unit segment may be split into. */
export const PARTS = [2, 3, 4, 5, 6, 8, 10];

/** Ends of the whole number line. */
export const MIN = -3;
export const MAX = 3;

/** @type {Written[]} */
export const TARGETS = [
  { f: fraction(-5, 4), form: 'frac' },
  { f: fraction(2, 3), form: 'frac' },
  { f: fraction(-6, 10), form: 'dec' },
  { f: fraction(5, 4), form: 'dec' },
  { f: fraction(-7, 3), form: 'frac' },
  { f: fraction(5, 6), form: 'frac' },
  { f: fraction(-3, 2), form: 'dec' },
  { f: fraction(3, 10), form: 'dec' },
  { f: fraction(-3, 8), form: 'frac' },
  { f: fraction(4, 6), form: 'frac' },
];

/**
 * The lowest-terms denominator: the unit segment must be split into a
 * multiple of this many parts for a tick to land on the number.
 * @param {Written} w
 */
export function partsNeeded(w) {
  return simplify(w.f).d;
}

/**
 * The marker position as the fraction k/n it sits on (not reduced).
 * @param {number} v marker value, snapped to a tick
 * @param {number} n parts per unit segment
 */
export function markerFraction(v, n) {
  return fraction(Math.round(v * n), n);
}

/**
 * True when the marker sits exactly on the target number.
 * @param {Written} w
 * @param {number} v
 * @param {number} n
 */
export function isOn(w, v, n) {
  return compare(markerFraction(v, n), w.f) === 0;
}

/**
 * A tick or marker as text: integers as they are, other ticks as k/n.
 * @param {number} v
 * @param {number} n
 */
export function tickLabel(v, n) {
  const k = Math.round(v * n);
  const sign = k < 0 ? MINUS : '';
  if (k % n === 0) return `${sign}${Math.abs(k / n)}`;
  return `${sign}${Math.abs(k)}/${n}`;
}

/**
 * The left end of the unit segment shown when zoomed in around `v`, kept
 * inside the whole line.
 * @param {number} v
 */
export function zoomStart(v) {
  return Math.max(MIN, Math.min(MAX - 1, Math.floor(v + 1e-9)));
}

/**
 * Written numbers from least to greatest.
 * @param {Written[]} list
 */
export function ascending(list) {
  return [...list].sort((a, b) => compare(a.f, b.f));
}
