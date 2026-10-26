/**
 * A rectangle of fixed area S: its length x and width y are inversely
 * proportional (x · y = S). Lengths move in steps of 0,5, so every value is
 * kept as an exact fraction and the widget can say "gấp 3/2 lần".
 */

import { div, fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** Areas the learner can choose, in cm². */
export const AREAS = [12, 24, 36];

/** Longest side drawn, in cm; the width never exceeds it either. */
export const SIDE_MAX = 12;

/**
 * Lengths allowed for area S: from S / SIDE_MAX (so the width fits) to
 * SIDE_MAX, in steps of 0,5.
 * @param {number} area
 */
export function lengthRange(area) {
  return { min: Math.ceil((2 * area) / SIDE_MAX) / 2, max: SIDE_MAX };
}

/**
 * A length snapped to the 0,5 grid inside the range for `area`.
 * @param {number} area
 * @param {number} x
 */
export function snapLength(area, x) {
  const { min, max } = lengthRange(area);
  return Math.min(max, Math.max(min, Math.round(2 * x) / 2));
}

/**
 * Length x (a multiple of 0,5) as an exact fraction.
 * @param {number} x
 * @returns {Fraction}
 */
export const lengthFraction = (x) => simplify(fraction(Math.round(2 * x), 2));

/**
 * The width y = S / x, exactly.
 * @param {number} area
 * @param {number} x
 * @returns {Fraction}
 */
export const widthFor = (area, x) => div(fraction(area), lengthFraction(x));

/**
 * How the sides changed from one length to another: the length is
 * multiplied by `lengthFactor` and the width by `widthFactor`, its inverse.
 * @param {number} area
 * @param {number} x1
 * @param {number} x2
 */
export function change(area, x1, x2) {
  const lengthFactor = div(lengthFraction(x2), lengthFraction(x1));
  const widthFactor = div(widthFor(area, x2), widthFor(area, x1));
  return { lengthFactor, widthFactor };
}
