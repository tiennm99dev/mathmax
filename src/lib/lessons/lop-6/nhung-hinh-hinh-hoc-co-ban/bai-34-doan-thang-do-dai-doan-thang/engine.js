import { formatNumber } from '#lib/core/number-format.js';

/**
 * Measuring a segment AB on a ruler and a third point M. A and B lie on the
 * ruler's edge (the line AB) at whole millimetres; M is given by its reading
 * along the ruler and its height above the edge, also in millimetres. On the
 * line every length is a whole number of millimetres, so the test
 * AM + MB = AB is exact there.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{
 *   ab: number, am: number, mb: number, sum: number,
 *   onLine: boolean, between: boolean, atEnd: boolean
 * }} Measure
 */

/**
 * Lengths in millimetres and where M lies with respect to the segment AB.
 * @param {number} a reading of A on the ruler, mm
 * @param {number} b reading of B on the ruler, mm
 * @param {Pt} m reading of M (x) and its height above the line (y), mm
 * @returns {Measure}
 */
export function measure(a, b, m) {
  const ab = Math.abs(b - a);
  const am = Math.hypot(m.x - a, m.y);
  const mb = Math.hypot(b - m.x, m.y);
  const onLine = m.y === 0;
  const atEnd = onLine && (m.x === a || m.x === b);
  const between = onLine && m.x > Math.min(a, b) && m.x < Math.max(a, b);
  return { ab, am, mb, sum: am + mb, onLine, between, atEnd };
}

/**
 * Whether AM + MB = AB, the sign that M lies on the segment AB. Off the
 * segment the sum is always larger.
 * @param {Measure} r
 */
export function sumEqualsAB(r) {
  return Math.abs(r.sum - r.ab) < 1e-9;
}

/**
 * A length in millimetres written in centimetres with a decimal comma, to
 * one decimal place at most: 56 gives '5,6', 60 gives '6'.
 * @param {number} mm
 */
export function cmText(mm) {
  return formatNumber(Math.round(mm) / 10, 1);
}
