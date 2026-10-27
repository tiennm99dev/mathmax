/**
 * Quadratic helpers shared by the lessons of the chapter "Hàm số y = ax²
 * (a ≠ 0). Phương trình bậc hai một ẩn": the roots of ax² + bx + c = 0 by
 * the discriminant, the equation written the book's way, and the SVG path of
 * a curve clipped to a coordinate plane.
 */

import { numTex, polyTex, polyText } from '#lib/algebra-engine/polynomial.js';

/**
 * Rounds away floating-point noise so 0,1 + 0,2 compares equal to 0,3.
 * @param {number} v
 */
export function clean(v) {
  const r = Math.round(v * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
}

/**
 * The discriminant Δ = b² − 4ac.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function discriminant(a, b, c) {
  return clean(b * b - 4 * a * c);
}

/**
 * Solves ax² + bx + c = 0 with a ≠ 0 by the book's formula. Roots are
 * listed from larger to smaller; a double root is listed twice.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {{ delta: number, count: 0 | 1 | 2, roots: number[] }}
 */
export function solveQuadratic(a, b, c) {
  if (a === 0) throw new RangeError('a must not be 0');
  const delta = discriminant(a, b, c);
  if (delta < 0) return { delta, count: 0, roots: [] };
  if (delta === 0) {
    const x = clean(-b / (2 * a));
    return { delta, count: 1, roots: [x, x] };
  }
  const s = Math.sqrt(delta);
  const roots = [clean((-b + s) / (2 * a)), clean((-b - s) / (2 * a))].sort((p, q) => q - p);
  return { delta, count: 2, roots };
}

/**
 * Whether n is the square of a whole number.
 * @param {number} n
 */
export function isPerfectSquare(n) {
  if (n < 0 || !Number.isInteger(n)) return false;
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}

/**
 * The left side ax² + bx + c as TeX: '2x^{2} - 5x + 3'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function quadTex(a, b, c) {
  return polyTex([c, b, a]);
}

/**
 * The left side ax² + bx + c as plain text: '2x² − 5x + 3'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function quadText(a, b, c) {
  return polyText([c, b, a]);
}

/**
 * A number in TeX, wrapped in brackets when negative: (-3), 2{,}5.
 * @param {number} v
 */
export function texOperand(v) {
  return v < 0 ? `(${numTex(v)})` : numTex(v);
}

/**
 * Points of y = f(x) for x from lo to hi as an SVG path in the plane's
 * scale. Points far outside the plane's y range break the path, so a steep
 * branch leaves the picture instead of being drawn across it; draw it inside
 * a clip path for a clean edge.
 * @param {(x: number) => number} f
 * @param {{ mx: (x: number) => number, my: (y: number) => number, xMin: number, xMax: number, yMin: number, yMax: number }} plane
 * @param {number} [steps]
 */
export function curvePath(f, plane, steps = 160) {
  const margin = (plane.yMax - plane.yMin) * 0.5;
  const top = plane.yMax + margin;
  const bottom = plane.yMin - margin;
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = plane.xMin + ((plane.xMax - plane.xMin) * i) / steps;
    const y = f(x);
    if (!Number.isFinite(y) || y > top || y < bottom) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${plane.mx(x).toFixed(1)} ${plane.my(y).toFixed(1)} `;
    pen = true;
  }
  return d.trim();
}
