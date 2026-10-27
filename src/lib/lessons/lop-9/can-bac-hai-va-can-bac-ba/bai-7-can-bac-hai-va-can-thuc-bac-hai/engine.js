/**
 * Logic of the square-root graph widget: the square roots of a number a read
 * off where the line y = a meets the parabola y = x², and the identity
 * √(x²) = |x| read off the graph y = |x|.
 */

import { numText, rootValue } from '#lib/core/algebra-text.js';

/**
 * The square roots of a: none when a < 0, the single root 0 when a = 0, and
 * the two opposite roots √a, −√a when a > 0.
 * @param {number} a
 * @returns {{ count: 0 | 1 | 2, root: number }}
 */
export function squareRoots(a) {
  if (a < 0) return { count: 0, root: NaN };
  if (a === 0) return { count: 1, root: 0 };
  return { count: 2, root: Math.sqrt(a) };
}

/**
 * The sentence the widget announces for the line y = a.
 * @param {number} a
 */
export function rootsSentence(a) {
  const { count, root } = squareRoots(a);
  const at = numText(a);
  if (count === 0) {
    return `a = ${at} < 0: đường thẳng y = ${at} không cắt parabol y = x², vì không có số nào bình phương lên được số âm. Số âm không có căn bậc hai.`;
  }
  if (count === 1) {
    return 'a = 0: đường thẳng y = 0 chạm parabol tại đúng một điểm x = 0. Số 0 có đúng một căn bậc hai là 0.';
  }
  const v = rootValue(root);
  return `a = ${at} > 0: đường thẳng y = ${at} cắt parabol tại hai điểm. Hai căn bậc hai của ${at} là √${at} ${v.sign} ${v.text} và −√${at} ${v.sign} −${v.text}. Căn bậc hai số học là √${at}.`;
}

/**
 * Whether √a is written exactly (a short decimal) for the label on the plot.
 * @param {number} a
 */
export function rootLabel(a) {
  const { count, root } = squareRoots(a);
  if (count === 0) return '';
  const v = rootValue(root);
  return v.exact ? v.text : `√${numText(a)}`;
}

/**
 * The sentence for the identity √(x²) = |x| at x.
 * @param {number} x
 */
export function absSentence(x) {
  const sq = x * x;
  const xs = numText(x);
  const abs = numText(Math.abs(x));
  const base = `x = ${xs}: x² = ${numText(sq)}, √(x²) = √${numText(sq)} = ${abs} = |${xs}|.`;
  if (x < 0) return `${base} Ở đây √(x²) = −x, không phải x: căn bậc hai số học luôn không âm.`;
  return `${base} Với x ≥ 0 thì √(x²) = x.`;
}

/**
 * Points of y = f(x) for x from lo to hi as an SVG path, with the plot's
 * scale. Points above `yMax` end the path, so steep curves are clipped.
 * @param {(x: number) => number} f
 * @param {number} lo
 * @param {number} hi
 * @param {{ mx: (x: number) => number, my: (y: number) => number }} plane
 * @param {number} yMax
 * @param {number} [steps]
 */
export function curvePath(f, lo, hi, plane, yMax, steps = 120) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps;
    const y = f(x);
    if (!Number.isFinite(y) || y > yMax) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${plane.mx(x).toFixed(1)} ${plane.my(y).toFixed(1)} `;
    pen = true;
  }
  return d.trim();
}
