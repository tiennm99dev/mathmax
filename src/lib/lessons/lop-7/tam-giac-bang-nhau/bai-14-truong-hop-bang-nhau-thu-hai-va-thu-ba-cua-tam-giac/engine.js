/**
 * The triangle builder: from a chosen set of data (two sides and the
 * included angle, one side and its two adjacent angles, two sides and an
 * angle that is not between them, or three angles) it returns every
 * triangle that fits, with vertices in centimetres. Points use SVG
 * orientation (y grows downwards), the base BC or AB along the positive x
 * axis and the triangle above it.
 */

import { along, angles, dist, fromASA, ssaBases } from '../_shared/triangle-math.js';

/** @typedef {import('../_shared/triangle-math.js').Pt} Pt */
/** @typedef {'cgc' | 'gcg' | 'ccg' | 'ggg'} Mode */

/**
 * @typedef {object} Built
 * @property {Pt} A
 * @property {Pt} B
 * @property {Pt} C
 */

/**
 * @typedef {object} Data
 * @property {number} c side AB, cm
 * @property {number} b side AC, cm
 * @property {number} a side BC, cm
 * @property {number} A angle A, degrees
 * @property {number} B angle B, degrees
 * @property {number} C angle C, degrees
 */

/** Two base lengths used to show that three angles do not fix the size. */
export const GGG_BASES = [3, 5];

/**
 * @param {Mode} mode
 * @param {Data} d
 * @returns {Built[]}
 */
export function build(mode, d) {
  const o = { x: 0, y: 0 };
  if (mode === 'cgc') {
    return [{ A: o, B: along(o, d.c, 0), C: along(o, d.b, d.A) }];
  }
  if (mode === 'gcg') {
    const t = fromASA(d.B, d.a, d.C);
    if (!t) return [];
    return [{ B: o, C: along(o, d.a, 0), A: along(o, t.c, d.B) }];
  }
  if (mode === 'ccg') {
    const A = along(o, d.c, d.B);
    return ssaBases(d.B, d.c, d.b).map((x) => ({ B: o, A, C: { x, y: 0 } }));
  }
  if (d.A + d.B >= 180) return [];
  const C = 180 - d.A - d.B;
  return GGG_BASES.map((a) => {
    const t = /** @type {NonNullable<ReturnType<typeof fromASA>>} */ (fromASA(d.B, a, C));
    return { B: o, C: along(o, a, 0), A: along(o, t.c, d.B) };
  });
}

/**
 * Sides and angles of a built triangle.
 * @param {Built} t
 */
export function measures(t) {
  const [A, B, C] = angles(t.A, t.B, t.C);
  return { a: dist(t.B, t.C), b: dist(t.C, t.A), c: dist(t.A, t.B), A, B, C };
}

/**
 * Whether the data fix exactly one triangle, whatever the values: true for
 * c.g.c and g.c.g, false for the other two.
 * @param {Mode} mode
 */
export function isCase(mode) {
  return mode === 'cgc' || mode === 'gcg';
}
