/**
 * Tables of values for y = kx + b, used to contrast a directly proportional
 * pair (b = 0, every ratio y/x equals k) with one that grows with x but is
 * not proportional (b ≠ 0, the ratios change). Plain numbers; the widget
 * rounds what it shows.
 */

/**
 * @typedef {{ x: number, y: number, ratio: number | null }} Row
 */

/**
 * One row per x: y = kx + b and the ratio y/x (null when x is 0).
 * @param {number} k
 * @param {number} b
 * @param {number[]} xs
 * @returns {Row[]}
 */
export function tableFor(k, b, xs) {
  return xs.map((x) => {
    const y = k * x + b;
    return { x, y, ratio: x === 0 ? null : y / x };
  });
}

/**
 * Whether every defined ratio y/x is the same non-zero number: the test for
 * y tỉ lệ thuận với x.
 * @param {Row[]} rows
 */
export function isProportional(rows) {
  const ratios = rows.flatMap((r) => (r.ratio === null ? [] : [r.ratio]));
  if (ratios.length === 0 || ratios[0] === 0) return false;
  return ratios.every((q) => Math.abs(q - ratios[0]) < 1e-9);
}
