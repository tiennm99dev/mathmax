/**
 * Central angle, arcs and chord of a circle for the widget of this lesson.
 * The chord's ends A and B sit on the circle at whole-degree directions
 * (counter-clockwise from the right). Pure logic, no DOM.
 */

import { formatFixed, formatNumber } from '#lib/core/number-format.js';

/**
 * The central angle AOB in degrees, from 0 to 180.
 * @param {number} a direction of A
 * @param {number} b direction of B
 */
export function centralAngle(a, b) {
  const d = (((b - a) % 360) + 360) % 360;
  return Math.min(d, 360 - d);
}

/**
 * The minor arc AB as a counter-clockwise turn: from direction `from`, through
 * `sweep` degrees (the central angle).
 * @param {number} a
 * @param {number} b
 */
export function minorArc(a, b) {
  const d = (((b - a) % 360) + 360) % 360;
  return d <= 180 ? { from: a, sweep: d } : { from: b, sweep: 360 - d };
}

/**
 * Length of the chord that subtends a central angle `deg` in a circle of
 * radius `r`: the base of the isosceles triangle OAB.
 * @param {number} r
 * @param {number} deg
 */
export function chord(r, deg) {
  return 2 * r * Math.sin((deg * Math.PI) / 360);
}

/**
 * The chord length as text: exact for the angles the book works with,
 * otherwise rounded to hundredths.
 * @param {number} r a whole number of cm
 * @param {number} deg
 */
export function chordText(r, deg) {
  const exact = { 60: `${r}`, 90: `${r}√2`, 120: `${r}√3`, 180: `${2 * r}` }[deg];
  const value = chord(r, deg);
  if (deg === 60 || deg === 180) return `AB = ${exact} cm`;
  if (exact) return `AB = ${exact} ≈ ${formatFixed(value, 2)} cm`;
  return `AB ≈ ${formatFixed(value, 2)} cm`;
}

/**
 * The live sentence under the drawing.
 * @param {number} r radius in cm
 * @param {number} deg central angle
 */
export function sentence(r, deg) {
  const n = formatNumber(deg, 0);
  if (deg === 180) {
    return `Góc AOB = 180°: AB đi qua tâm O, là một đường kính. Mỗi cung là nửa đường tròn, số đo 180°, và AB = 2R = ${2 * r} cm là dây dài nhất.`;
  }
  const extra =
    deg === 60
      ? ' Tam giác OAB đều nên dây AB bằng bán kính.'
      : deg === 90
        ? ' Tam giác OAB vuông cân tại O.'
        : '';
  return (
    `Góc ở tâm AOB = ${n}°, nên sđ cung nhỏ AB = ${n}° và sđ cung lớn AB = 360° − ${n}° = ${360 - deg}°. ` +
    `${chordText(r, deg)} < 2R = ${2 * r} cm.${extra}`
  );
}
