/**
 * Regular polygons and the rotations that keep them: the vertices A1…An of a
 * regular n-gon inscribed in a circle, listed clockwise from the top, and
 * which rotation angles about the centre map the polygon onto itself.
 */

/** @typedef {{ x: number, y: number }} Pt */

/** Names the book gives regular polygons with few sides. */
const NAMES = /** @type {Record<number, string>} */ ({
  3: 'tam giác đều',
  4: 'hình vuông',
  5: 'ngũ giác đều',
  6: 'lục giác đều',
  8: 'bát giác đều',
});

/**
 * How the regular n-gon is called: 'lục giác đều', or 'đa giác đều 7 cạnh'.
 * @param {number} n
 */
export function polygonName(n) {
  return NAMES[n] ?? `đa giác đều ${n} cạnh`;
}

/** Central angle A1OA2 of a regular n-gon, in degrees. @param {number} n */
export const centralAngle = (n) => 360 / n;

/** Each interior angle of a regular n-gon, in degrees. @param {number} n */
export const interiorAngle = (n) => 180 - 360 / n;

/**
 * Vertices of the regular n-gon inscribed in the circle (center, R), A1 at
 * the top, the next ones clockwise on screen, after turning everything by
 * `turn` degrees clockwise (a negative `turn` turns counter-clockwise).
 * @param {number} n @param {Pt} center @param {number} R @param {number} [turn]
 * @returns {Pt[]}
 */
export function vertices(n, center, R, turn = 0) {
  return Array.from({ length: n }, (_, i) => {
    const deg = -90 + turn + (360 * i) / n;
    const rad = (deg * Math.PI) / 180;
    return { x: center.x + R * Math.cos(rad), y: center.y + R * Math.sin(rad) };
  });
}

/**
 * The rotation angle a learner set, pulled onto the nearest multiple of
 * 360°/n when it is within `within` degrees of it, so angles such as
 * 360°/7 can be reached with whole-degree steps.
 * @param {number} n @param {number} alpha @param {number} [within]
 */
export function magnet(n, alpha, within = 1) {
  const step = 360 / n;
  const k = Math.round(alpha / step);
  return Math.abs(alpha - k * step) <= within ? k * step : alpha;
}

/**
 * How many steps of 360°/n the angle makes, when it keeps the polygon (a
 * whole multiple of 360°/n), or null when it does not.
 * @param {number} n @param {number} alpha
 * @returns {number | null}
 */
export function keepingSteps(n, alpha) {
  const k = Math.round(alpha / (360 / n));
  return Math.abs(alpha - (k * 360) / n) < 1e-6 ? k : null;
}

/**
 * The angles α with 0° < α ≤ 360° whose rotation keeps the regular n-gon.
 * @param {number} n
 */
export function keepingAngles(n) {
  return Array.from({ length: n }, (_, i) => ((i + 1) * 360) / n);
}

/**
 * The vertex (1 to n) that A_i lands on after k steps of 360°/n clockwise
 * (or counter-clockwise when `clockwise` is false).
 * @param {number} n @param {number} i @param {number} k @param {boolean} clockwise
 */
export function imageOf(n, i, k, clockwise) {
  const shift = clockwise ? k : -k;
  return ((((i - 1 + shift) % n) + n) % n) + 1;
}
