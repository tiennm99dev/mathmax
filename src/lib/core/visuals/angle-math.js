/**
 * Pure angle helpers for geometry widgets: directions, measures and the SVG
 * paths that draw an angle (arc, sector, inside region, right-angle mark).
 * Directions are degrees measured the mathematical way: 0° points right and
 * angles grow counter-clockwise. Points are SVG points (y grows downwards);
 * the helpers flip y themselves.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

import { formatNumber } from '#lib/core/number-format.js';

/** @param {number} a */
export const norm = (a) => ((a % 360) + 360) % 360;

/**
 * Unit vector of a direction, in SVG coordinates.
 * @param {number} deg
 * @returns {Pt}
 */
export function dirOf(deg) {
  const t = (deg * Math.PI) / 180;
  return { x: Math.cos(t), y: -Math.sin(t) };
}

/**
 * The point at distance `r` from `o` in direction `deg`.
 * @param {Pt} o @param {number} r @param {number} deg
 * @returns {Pt}
 */
export function along(o, r, deg) {
  const u = dirOf(deg);
  return { x: o.x + r * u.x, y: o.y + r * u.y };
}

/**
 * Direction of `p` seen from `o`, in [0, 360), not rounded.
 * @param {Pt} o @param {Pt} p
 */
export function directionTo(o, p) {
  return norm((Math.atan2(o.y - p.y, p.x - o.x) * 180) / Math.PI);
}

/**
 * Measure of the angle formed by two rays with directions `a` and `b`: the
 * smaller of the two turns between them, from 0° to 180°.
 * @param {number} a @param {number} b
 */
export function measure(a, b) {
  const d = norm(b - a);
  return d <= 180 ? d : 360 - d;
}

/**
 * The two sides ordered so that turning counter-clockwise from `from` to `to`
 * sweeps the angle, and the size of that turn.
 * @param {number} a @param {number} b
 */
export function ccwSides(a, b) {
  const d = norm(b - a);
  return d <= 180 ? { from: a, to: b, sweep: d } : { from: b, to: a, sweep: 360 - d };
}

/**
 * Polygon that covers the inside of the angle out to `far` units, to be
 * clipped by the board. Empty for a straight or zero angle.
 * @param {Pt} o @param {number} a @param {number} b @param {number} [far]
 */
export function insidePath(o, a, b, far = 900) {
  const { from, to, sweep } = ccwSides(a, b);
  if (sweep === 0 || sweep === 180) return '';
  const p1 = along(o, far, from);
  const p2 = along(o, far * 1.5, from + sweep / 2);
  const p3 = along(o, far, to);
  return `M ${o.x} ${o.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
}

/**
 * The corner mark of a right angle with legs of length `s`.
 * @param {Pt} o @param {number} a @param {number} b @param {number} s
 */
export function rightMarkPath(o, a, b, s) {
  const { from, to } = ccwSides(a, b);
  const p = along(o, s, from);
  const q = along(o, s, to);
  const c = { x: p.x + q.x - o.x, y: p.y + q.y - o.y };
  return `M ${p.x} ${p.y} L ${c.x} ${c.y} L ${q.x} ${q.y}`;
}

/**
 * Direction of the bisector of the angle between rays `a` and `b`.
 * @param {number} a @param {number} b
 */
export function bisectorDir(a, b) {
  const { from, sweep } = ccwSides(a, b);
  return norm(from + sweep / 2);
}

/**
 * Arc of radius `r` around the vertex marking the angle.
 * @param {Pt} o @param {number} a @param {number} b @param {number} r
 */
export function arcPath(o, a, b, r) {
  const { from, to, sweep } = ccwSides(a, b);
  if (sweep === 0) return '';
  const s = along(o, r, from);
  const e = along(o, r, to);
  // In SVG coordinates a counter-clockwise turn is sweep-flag 0.
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 0 ${e.x} ${e.y}`;
}

/**
 * Filled sector of radius `r` for the angle between rays `a` and `b`.
 * @param {Pt} o @param {number} a @param {number} b @param {number} r
 */
export function sectorPath(o, a, b, r) {
  const arc = arcPath(o, a, b, r);
  return arc ? `M ${o.x} ${o.y} L ${arc.slice(2)} Z` : '';
}

/**
 * Where the line through `p` with direction `d` meets the line through `q`
 * with direction `e`; null when they are parallel.
 * @param {Pt} p @param {number} d @param {Pt} q @param {number} e
 * @returns {Pt | null}
 */
export function intersect(p, d, q, e) {
  const u = dirOf(d);
  const v = dirOf(e);
  const den = u.x * v.y - u.y * v.x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((q.x - p.x) * v.y - (q.y - p.y) * v.x) / den;
  return { x: p.x + t * u.x, y: p.y + t * u.y };
}

/**
 * Degree text the Vietnamese way: whole degrees as '47°', halves as '32,5°'.
 * @param {number} deg
 */
export function degText(deg) {
  return `${formatNumber(deg, 1)}°`;
}
