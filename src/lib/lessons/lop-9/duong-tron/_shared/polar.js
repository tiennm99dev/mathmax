/**
 * Polar positions around the centre O of a circle drawing, shared by the
 * widgets of this chapter. A position is a distance from O (in cm) and a
 * direction in whole degrees, counter-clockwise from the right, the way the
 * book measures angles; `U` is the number of SVG units per centimetre. SVG's
 * y axis points down, so a positive angle draws above O. Pure logic, no DOM.
 */

/**
 * The SVG point at `dist` cm from `o` in direction `deg`.
 * @param {{ x: number, y: number }} o
 * @param {number} u SVG units per cm
 * @param {number} dist
 * @param {number} deg
 */
export function toSvg(o, u, dist, deg) {
  const t = (deg * Math.PI) / 180;
  return { x: o.x + dist * u * Math.cos(t), y: o.y - dist * u * Math.sin(t) };
}

/**
 * Distance (cm) and direction (degrees in [0, 360)) of an SVG point from `o`.
 * @param {{ x: number, y: number }} o
 * @param {number} u
 * @param {{ x: number, y: number }} p
 */
export function fromSvg(o, u, p) {
  const dx = p.x - o.x;
  const dy = o.y - p.y;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { dist: Math.hypot(dx, dy) / u, deg: ((deg % 360) + 360) % 360 };
}

/**
 * A direction in whole degrees, in [0, 360).
 * @param {number} deg
 */
export function wrapDeg(deg) {
  return ((Math.round(deg) % 360) + 360) % 360;
}

/**
 * A distance in tenths of a centimetre, kept within [lo, hi] (in tenths), and
 * pulled onto `magnet` (in tenths) when it lies within 1.5 tenths of it, so a
 * finger can land a point exactly on the circle.
 * @param {number} dist cm
 * @param {number} lo
 * @param {number} hi
 * @param {number} [magnet]
 */
export function tenths(dist, lo, hi, magnet) {
  const raw = dist * 10;
  if (magnet !== undefined && Math.abs(raw - magnet) < 1.5) return magnet;
  return Math.max(lo, Math.min(hi, Math.round(raw)));
}
