import { add, dot, len, normalize, scale, sub, vec } from './vec.js';

/**
 * @typedef {import('./vec.js').Vec2} Vec2
 * @typedef {Readonly<{center: Vec2, radius: number}>} Circle
 */

/** @param {number} cx @param {number} cy @param {number} r @returns {Circle} */
export function circle(cx, cy, r) {
  return { center: vec(cx, cy), radius: r };
}

/** @param {Vec2} point @param {Circle} c @returns {Vec2} */
export function projectToCircle(point, c) {
  const dir = sub(point, c.center);
  const d = len(dir);
  if (d === 0) {
    // Point at center; pick +x direction by convention.
    return add(c.center, vec(c.radius, 0));
  }
  return add(c.center, scale(normalize(dir), c.radius));
}

/** @param {Circle} c @param {number} angleDeg @returns {Vec2} */
export function pointOnCircle(c, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return vec(c.center.x + c.radius * Math.cos(rad), c.center.y + c.radius * Math.sin(rad));
}

/**
 * Unsigned angle at `vertex` between rays to `a` and `b`, in degrees [0,180].
 * Returns 0 if vertex coincides with a or b.
 * @param {Vec2} a @param {Vec2} vertex @param {Vec2} b
 */
export function angleAtVertex(a, vertex, b) {
  const va = sub(a, vertex);
  const vb = sub(b, vertex);
  const lenA = len(va);
  const lenB = len(vb);
  if (lenA === 0 || lenB === 0) return 0;
  // Clamp guards float drift outside [-1, 1] which would NaN the acos.
  const cosTheta = Math.max(-1, Math.min(1, dot(va, vb) / (lenA * lenB)));
  return (Math.acos(cosTheta) * 180) / Math.PI;
}

/**
 * Angle of `p` as seen from the circle's center, in degrees [0, 360).
 * @param {Circle} c @param {Vec2} p @returns {number}
 */
export function angleOnCircle(c, p) {
  const deg = (Math.atan2(p.y - c.center.y, p.x - c.center.x) * 180) / Math.PI;
  return ((deg % 360) + 360) % 360;
}

/**
 * Measure in degrees of the arc AB that does **not** contain M — the arc an
 * inscribed angle at M subtends. Ranges over (0, 360): it exceeds 180° when M
 * sits on the minor arc, which is exactly the case where the inscribed angle
 * is not half of the unsigned central angle ∠AOB.
 *
 * All three points are assumed to lie on `c`.
 *
 * @param {Circle} c @param {Vec2} a @param {Vec2} b @param {Vec2} m
 * @returns {number}
 */
export function subtendedArc(c, a, b, m) {
  const norm = (/** @type {number} */ d) => ((d % 360) + 360) % 360;
  const angA = angleOnCircle(c, a);
  const sweepToB = norm(angleOnCircle(c, b) - angA);
  const sweepToM = norm(angleOnCircle(c, m) - angA);
  // M inside the A→B sweep means the subtended arc is the complementary one.
  return sweepToM > 0 && sweepToM < sweepToB ? 360 - sweepToB : sweepToB;
}
