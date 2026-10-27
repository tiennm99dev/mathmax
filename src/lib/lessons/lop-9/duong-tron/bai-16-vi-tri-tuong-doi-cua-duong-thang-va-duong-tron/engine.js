/**
 * A line and a circle, and the two tangents from an outside point, for the
 * widgets of this lesson. Lengths are whole tenths of a centimetre, so d = R
 * is an exact comparison. Pure logic, no DOM.
 */

import { formatFixed, formatNumber } from '#lib/core/number-format.js';

/** @typedef {'cat' | 'tiep-xuc' | 'khong'} Relation */

/**
 * How a line at distance `d` from the centre meets a circle of radius `r`.
 * @param {number} d tenths of a cm
 * @param {number} r tenths of a cm
 * @returns {Relation}
 */
export function relation(d, r) {
  if (d < r) return 'cat';
  if (d > r) return 'khong';
  return 'tiep-xuc';
}

/** Number of common points of each relation. */
export const COMMON = /** @type {const} */ ({ cat: 2, 'tiep-xuc': 1, khong: 0 });

/** A length in tenths of a cm as text: 21 → '2,1'. */
export const len = (/** @type {number} */ t) => formatNumber(t / 10, 1);

/**
 * Half the chord a line at distance d cuts from a circle of radius r (both in
 * cm): √(R² − d²), or 0 when the line does not cut the circle.
 * @param {number} d
 * @param {number} r
 */
export function halfChord(d, r) {
  return d < r ? Math.sqrt(r * r - d * d) : 0;
}

/**
 * The live sentence for a line at distance d (tenths) from the centre of a
 * circle of radius r (tenths).
 * @param {number} d
 * @param {number} r
 */
export function lineSentence(d, r) {
  const rel = relation(d, r);
  if (rel === 'cat') {
    const chord = 2 * halfChord(d / 10, r / 10);
    return `d = OH = ${len(d)} cm < R = ${len(r)} cm: đường thẳng a cắt đường tròn tại hai điểm A, B (a là cát tuyến). Dây AB = 2√(R² − d²) ≈ ${formatFixed(chord, 2)} cm.`;
  }
  if (rel === 'tiep-xuc') {
    return `d = OH = R = ${len(r)} cm: đường thẳng a tiếp xúc với đường tròn tại H. a là tiếp tuyến, H là tiếp điểm, và OH ⊥ a.`;
  }
  return `d = OH = ${len(d)} cm > R = ${len(r)} cm: đường thẳng a và đường tròn không giao nhau (không có điểm chung).`;
}

/**
 * The two tangents from a point M outside a circle: half the angle AOB, the
 * tangent length MA = MB, and the angles AMB and AOB.
 * @param {number} om OM in cm, > r
 * @param {number} r radius in cm
 */
export function tangents(om, r) {
  const half = (Math.acos(r / om) * 180) / Math.PI; // angle AOM = BOM
  return {
    half,
    length: Math.sqrt(om * om - r * r),
    amb: 180 - 2 * half,
    aob: 2 * half,
  };
}

/**
 * The tangent length as working: '√(5² − 3²) = 4' or '√(4,6² − 3²) ≈ 3,49'.
 * @param {number} om tenths
 * @param {number} r tenths
 */
export function tangentText(om, r) {
  const sq = om * om - r * r; // in hundredths of cm²
  const root = Math.round(Math.sqrt(sq));
  const value = root * root === sq ? `= ${len(root)}` : `≈ ${formatFixed(Math.sqrt(sq) / 10, 2)}`;
  return `√(${len(om)}² − ${len(r)}²) ${value}`;
}

/**
 * The live sentence for the tangents from M.
 * @param {number} om tenths
 * @param {number} r tenths
 */
export function tangentSentence(om, r) {
  const t = tangents(om / 10, r / 10);
  const deg = (/** @type {number} */ v) => `${formatNumber(Math.round(v * 10) / 10, 1)}°`;
  return (
    `MA = MB = ${tangentText(om, r)} cm. MO là tia phân giác của góc AMB (góc AMO = góc BMO ≈ ${deg(t.amb / 2)}), ` +
    `OM là tia phân giác của góc AOB. Góc AMB ≈ ${deg(t.amb)} và góc AOB ≈ ${deg(t.aob)}, tổng bằng 180°.`
  );
}
