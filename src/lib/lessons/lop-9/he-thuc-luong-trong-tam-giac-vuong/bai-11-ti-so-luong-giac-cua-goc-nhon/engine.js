/**
 * Trigonometric ratios of an acute angle of a right triangle ABC (right
 * angle at A), for the widget of this lesson. Legs are AB (horizontal) and
 * AC (vertical); the chosen acute angle is B or C. Pure logic, no DOM.
 */

import { formatFixed, formatNumber } from '#lib/core/number-format.js';

/**
 * The four ratios of an acute angle from its opposite and adjacent legs.
 * @param {number} opp opposite leg, > 0
 * @param {number} adj adjacent leg, > 0
 */
export function ratios(opp, adj) {
  const hyp = Math.hypot(opp, adj);
  return {
    hyp,
    sin: opp / hyp,
    cos: adj / hyp,
    tan: opp / adj,
    cot: adj / opp,
    deg: (Math.atan2(opp, adj) * 180) / Math.PI,
  };
}

/** Exact ratios of the special angles, as the book's table writes them. */
export const SPECIAL = /** @type {const} */ ({
  30: { sin: '1/2', cos: '√3/2', tan: '√3/3', cot: '√3' },
  45: { sin: '√2/2', cos: '√2/2', tan: '1', cot: '1' },
  60: { sin: '√3/2', cos: '1/2', tan: '√3', cot: '√3/3' },
});

/**
 * The exact ratios when `deg` is (up to drawing noise) 30°, 45° or 60°.
 * @param {number} deg
 * @returns {{ sin: string, cos: string, tan: string, cot: string } | null}
 */
export function specialAt(deg) {
  for (const key of /** @type {const} */ ([30, 45, 60])) {
    if (Math.abs(deg - key) < 0.05) return SPECIAL[key];
  }
  return null;
}

/**
 * Which leg is opposite and which adjacent to the chosen angle.
 * @param {'B' | 'C'} vertex
 * @param {number} ab
 * @param {number} ac
 */
export function sidesOf(vertex, ab, ac) {
  return vertex === 'B'
    ? { opp: ac, adj: ab, oppName: 'AC', adjName: 'AB' }
    : { opp: ab, adj: ac, oppName: 'AB', adjName: 'AC' };
}

/**
 * Legs AB, AC of a triangle whose angle B is `deg`, with the longer leg
 * equal to `long`.
 * @param {number} deg acute
 * @param {number} long
 */
export function legsForAngleB(deg, long) {
  const t = Math.tan((deg * Math.PI) / 180);
  return t <= 1 ? { ab: long, ac: long * t } : { ab: long / t, ac: long };
}

/**
 * A ratio for display: exact text for a special angle, else '≈ 0,643'
 * (or '= 0,6' when three places show it exactly).
 * @param {number} value
 * @param {string | undefined} exact
 */
export function ratioText(value, exact) {
  if (exact) return `= ${exact}`;
  const scaled = value * 1000;
  if (Math.abs(scaled - Math.round(scaled)) < 1e-9) return `= ${formatNumber(value, 3)}`;
  return `≈ ${formatFixed(value, 3)}`;
}

/**
 * The live sentence under the drawing.
 * @param {'B' | 'C'} vertex
 * @param {number} ab
 * @param {number} ac
 */
export function sentence(vertex, ab, ac) {
  const other = vertex === 'B' ? 'C' : 'B';
  const s = sidesOf(vertex, ab, ac);
  const r = ratios(s.opp, s.adj);
  const exact = specialAt(r.deg);
  const deg = Math.round(r.deg * 10) / 10;
  const otherDeg = Math.round((90 - r.deg) * 10) / 10;
  const angle = `Góc ${vertex} ${exact ? '=' : '≈'} ${formatNumber(deg, 1)}°`;
  return (
    `${angle}: cạnh đối ${s.oppName}, cạnh kề ${s.adjName}, cạnh huyền BC. ` +
    `Góc ${other} ${exact ? '=' : '≈'} ${formatNumber(otherDeg, 1)}° là góc phụ với nó, ` +
    `nên sin ${other} = cos ${vertex} ${ratioText(r.cos, exact?.cos)}.`
  );
}
