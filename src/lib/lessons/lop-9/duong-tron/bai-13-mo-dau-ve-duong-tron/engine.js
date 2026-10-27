/**
 * Position of a point against a circle (O; R) and the symmetric images of a
 * point, for the widget of this lesson. Lengths are whole tenths of a
 * centimetre, so OM = R is an exact comparison. Pure logic, no DOM.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** @typedef {'trong' | 'tren' | 'ngoai'} Position */

/**
 * Where M lies: inside (OM < R), on (OM = R) or outside (OM > R) the circle.
 * @param {number} om OM in tenths of a cm
 * @param {number} r R in tenths of a cm
 * @returns {Position}
 */
export function position(om, r) {
  if (om < r) return 'trong';
  if (om > r) return 'ngoai';
  return 'tren';
}

/** How the book says each position, with the matching comparison sign. */
export const WORDS = /** @type {const} */ ({
  trong: { sign: '<', text: 'nằm bên trong đường tròn' },
  tren: { sign: '=', text: 'nằm trên đường tròn' },
  ngoai: { sign: '>', text: 'nằm bên ngoài đường tròn' },
});

/** A length in tenths of a cm as text: 32 → '3,2 cm'. */
export const cm = (/** @type {number} */ t) => `${formatNumber(t / 10, 1)} cm`;

/**
 * Direction of the image of a point in direction `deg` under the symmetry
 * through the centre O: the opposite direction, same distance.
 * @param {number} deg
 */
export function throughCentre(deg) {
  return (((deg + 180) % 360) + 360) % 360;
}

/**
 * Direction of the image of a point in direction `deg` under the reflection
 * in the line through O with direction `axis`: same distance from O.
 * @param {number} deg
 * @param {number} axis
 */
export function inAxis(deg, axis) {
  return (((2 * axis - deg) % 360) + 360) % 360;
}

/**
 * The live sentence under the drawing.
 * @param {number} om tenths
 * @param {number} r tenths
 * @param {'none' | 'centre' | 'axis'} mode
 */
export function sentence(om, r, mode) {
  const pos = position(om, r);
  const w = WORDS[pos];
  const main = `OM = ${cm(om)} ${w.sign} R = ${cm(r)}: điểm M ${w.text} (O; ${cm(r)}).`;
  if (mode === 'none') return main;
  const image = mode === 'centre' ? 'M′ đối xứng với M qua tâm O' : 'M′ đối xứng với M qua trục d';
  const why = mode === 'centre' ? 'O là trung điểm của MM′' : 'd là đường trung trực của MM′';
  return `${main} ${image} (${why}), nên OM′ = OM = ${cm(om)}: M′ cũng ${w.text}.`;
}
