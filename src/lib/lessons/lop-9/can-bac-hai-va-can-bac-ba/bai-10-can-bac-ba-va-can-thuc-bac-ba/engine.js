/**
 * Logic of the cube widget: the cube root of any real a, read off where the
 * line y = a meets the curve y = x³ (always exactly once), and shown as the
 * edge of a cube of volume |a|.
 */

import { fmt, intText, operand } from '#lib/core/number-format.js';
import { rootValue } from '#lib/core/algebra-text.js';

/**
 * The cube root of a, exact for perfect cubes despite rounding in Math.cbrt.
 * @param {number} a
 */
export function cubeRoot(a) {
  const r = Math.cbrt(a);
  const n = Math.round(r);
  return n * n * n === a ? n : r;
}

/**
 * Whether a is the cube of an integer.
 * @param {number} a
 */
export function isPerfectCube(a) {
  return Number.isInteger(cubeRoot(a));
}

/**
 * ∛a as plain text, with brackets around a negative radicand: ∛(−27).
 * @param {number} a an integer
 */
export function cbrtText(a) {
  return a < 0 ? `∛(${intText(a)})` : `∛${fmt(a)}`;
}

/**
 * The sentence the widget announces for a.
 * @param {number} a an integer
 */
export function cubeSentence(a) {
  const r = cubeRoot(a);
  if (Number.isInteger(r)) {
    const head = `${cbrtText(a)} = ${intText(r)} vì ${operand(r)}³ = ${intText(a)}.`;
    if (a < 0) {
      return `${head} Không có khối lập phương nào có thể tích âm, nhưng số âm vẫn có đúng một căn bậc ba, và nó là số âm: ${cbrtText(a)} = −∛${fmt(-a)}.`;
    }
    if (a === 0) return `${head} Căn bậc ba của 0 là 0.`;
    return `${head} Khối lập phương thể tích ${fmt(a)} có cạnh ${r}.`;
  }
  const v = rootValue(r);
  const sign = a < 0 ? 'âm' : 'dương';
  return `${cbrtText(a)} ${v.sign} ${v.text}. Số ${intText(a)} không là lập phương của số nguyên nào, nhưng vẫn có đúng một căn bậc ba; nó là số ${sign}, cùng dấu với ${intText(a)}.`;
}

/**
 * The three visible faces of a cube with edge `s` drawn in oblique
 * projection, its front-bottom-left corner at (x, y) in SVG coordinates.
 * @param {number} x
 * @param {number} y
 * @param {number} s
 */
export function cubeFaces(x, y, s) {
  const dx = s * 0.5;
  const dy = -s * 0.35;
  /** @param {number[][]} pts */
  const poly = (pts) => pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  return {
    front: poly([
      [x, y],
      [x + s, y],
      [x + s, y - s],
      [x, y - s],
    ]),
    top: poly([
      [x, y - s],
      [x + s, y - s],
      [x + s + dx, y - s + dy],
      [x + dx, y - s + dy],
    ]),
    side: poly([
      [x + s, y],
      [x + s + dx, y + dy],
      [x + s + dx, y - s + dy],
      [x + s, y - s],
    ]),
  };
}
