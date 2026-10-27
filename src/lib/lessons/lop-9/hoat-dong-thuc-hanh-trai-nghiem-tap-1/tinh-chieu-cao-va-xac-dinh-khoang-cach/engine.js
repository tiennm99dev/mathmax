/**
 * Indirect measuring with a clinometer (giác kế) and the tangent of an acute
 * angle: heights from an angle of elevation, the distance to a point across a
 * river, and the height of an object whose foot cannot be reached. Lengths
 * are in metres, angles in degrees.
 */

const RAD = Math.PI / 180;

/** @param {number} deg */
export const tanDeg = (deg) => Math.tan(deg * RAD);

/**
 * Reading of the simple clinometer: a protractor whose straight edge lies
 * along the sighting straw, with a plumb line hanging from its centre. On the
 * scale counted from the eye end the plumb line shows 90° − α.
 * @param {number} elevation the angle of elevation α
 */
export const plumbReading = (elevation) => 90 - elevation;

/**
 * The angle of elevation from a plumb-line reading β on that scale.
 * @param {number} reading
 */
export const elevationFromReading = (reading) => 90 - reading;

/**
 * Height of an object: the clinometer of height `eye` stands `d` metres from
 * its foot and sights its top at elevation `alpha`, so H = eye + d · tan α.
 * @param {number} d
 * @param {number} alpha
 * @param {number} eye
 */
export function heightFrom(d, alpha, eye) {
  return eye + d * tanDeg(alpha);
}

/**
 * The true angle of elevation of a top `height` metres high seen from an eye
 * `eye` metres above the ground at horizontal distance `d`.
 * @param {number} height
 * @param {number} d
 * @param {number} eye
 */
export function elevationTo(height, d, eye) {
  return Math.atan((height - eye) / d) / RAD;
}

/**
 * Across a river: A on this bank, B on the far bank, AC ⟂ AB along the bank.
 * The angle ACB measured at C gives AB = AC · tan C.
 * @param {number} ac
 * @param {number} angleC
 */
export function distanceAcross(ac, angleC) {
  return ac * tanDeg(angleC);
}

/**
 * The angle ACB seen from C for a true width `ab` and a walked distance `ac`.
 * @param {number} ab
 * @param {number} ac
 */
export function angleAtC(ab, ac) {
  return Math.atan(ab / ac) / RAD;
}

/**
 * Two observation points on a line towards an object whose foot cannot be
 * reached: elevation `alpha` from the far point, `beta` from the point `d`
 * metres closer (beta > alpha). With x the distance from the near point to
 * the foot, x · tan β = (x + d) · tan α, so x = d · tan α / (tan β − tan α).
 * @param {number} d
 * @param {number} alpha
 * @param {number} beta
 * @param {number} eye height of the clinometer
 * @returns {{ near: number, height: number }}
 */
export function twoPoint(d, alpha, beta, eye) {
  const ta = tanDeg(alpha);
  const tb = tanDeg(beta);
  const near = (d * ta) / (tb - ta);
  return { near, height: eye + near * tb };
}

/**
 * Horizontal distance from the foot of a tower of height `h` to a boat seen
 * at an angle of depression `depression` from the top: d = h / tan(depression).
 * @param {number} h
 * @param {number} depression
 */
export function distanceFromDepression(h, depression) {
  return h / tanDeg(depression);
}

/**
 * Round to `places` decimals.
 * @param {number} v
 * @param {number} places
 */
export function roundTo(v, places) {
  const k = 10 ** places;
  return Math.round(v * k) / k;
}
