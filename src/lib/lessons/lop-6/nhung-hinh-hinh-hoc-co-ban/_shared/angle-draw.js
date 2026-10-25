/**
 * SVG paths for drawing an angle: the shaded inside region and the small arc
 * at the vertex. Both follow the smaller turn between the two sides, which is
 * the angle the lessons mean.
 */

import { along, norm } from './angle.js';

/** @typedef {import('./angle.js').Pt} Pt */

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
