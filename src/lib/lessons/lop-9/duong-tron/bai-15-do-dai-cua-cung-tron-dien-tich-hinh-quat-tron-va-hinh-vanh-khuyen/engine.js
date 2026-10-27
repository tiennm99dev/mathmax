/**
 * Arc length, sector area and annulus area for the widget of this lesson.
 * Radii come in half centimetres (`r2` = 2R, a whole number) so every exact
 * coefficient of π is a quotient of integers. Pure logic, no DOM.
 */

import { numberText } from '#lib/core/decimal.js';
import { formatFixed, formatNumber } from '#lib/core/number-format.js';
import { piText } from '../_shared/pi-text.js';

/**
 * Length of an arc of n° on a circle of radius R: l = πRn/180.
 * @param {number} r
 * @param {number} n
 */
export function arcLength(r, n) {
  return (Math.PI * r * n) / 180;
}

/**
 * Area of a sector of n° of a disc of radius R: S = πR²n/360.
 * @param {number} r
 * @param {number} n
 */
export function sectorArea(r, n) {
  return (Math.PI * r * r * n) / 360;
}

/**
 * Area of the annulus between two concentric circles of radii R > r:
 * S = π(R² − r²).
 * @param {number} big
 * @param {number} small
 */
export function ringArea(big, small) {
  return Math.PI * (big * big - small * small);
}

/** A value rounded to hundredths, '6,28'. */
export const approx = (/** @type {number} */ v) => formatFixed(Math.round(v * 100) / 100, 2);

/** A radius in half centimetres as text: 5 → '2,5'. */
export const half = (/** @type {number} */ r2) => formatNumber(r2 / 2, 1);

/**
 * The lines of working for a sector of n° with radius r2/2.
 * @param {number} r2 twice the radius, a whole number
 * @param {number} n whole degrees, 1 to 360
 */
export function sectorLines(r2, n) {
  const r = half(r2);
  const lk = (r2 * n) / 360; // l = lk·π
  const sk = (r2 * r2 * n) / 1440; // S = sk·π
  return {
    part: numberText(n / 360),
    circumference: `C = 2πR = 2π·${r} = ${piText(r2)} ≈ ${approx(Math.PI * r2)} cm`,
    length: `l = πRn/180 = π·${r}·${n}/180 = ${piText(lk)} ≈ ${approx(arcLength(r2 / 2, n))} cm`,
    area: `S = πR²n/360 = π·${r}²·${n}/360 = ${piText(sk)} ≈ ${approx(sectorArea(r2 / 2, n))} cm²`,
  };
}

/**
 * The line of working for an annulus with radii big2/2 > small2/2.
 * @param {number} big2
 * @param {number} small2
 */
export function ringLine(big2, small2) {
  const k = (big2 * big2 - small2 * small2) / 4;
  return `S = π(R² − r²) = π(${half(big2)}² − ${half(small2)}²) = ${piText(k)} ≈ ${approx(ringArea(big2 / 2, small2 / 2))} cm²`;
}
