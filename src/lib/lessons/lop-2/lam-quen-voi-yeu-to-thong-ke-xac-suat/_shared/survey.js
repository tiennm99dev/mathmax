/**
 * Counting by category for the statistics lessons of grade 2: tally bundles,
 * and which categories have the most and the fewest.
 */

/**
 * What one picture of a picture chart shows.
 * @typedef {{ picture: import('#lib/core/kid/pictures/index.js').PictureName }
 *   | { color: string }
 *   | { emoji: string }} ChartSymbol
 */

/**
 * The tally bundles of `n`: full bundles of five, then what is left.
 * @param {number} n
 * @returns {number[]}
 */
export function tallyBundles(n) {
  const full = Math.floor(n / 5);
  const rest = n % 5;
  return [...Array.from({ length: full }, () => 5), ...(rest > 0 ? [rest] : [])];
}

/**
 * How a tally of `n` is read: '1 bó 5 vạch và 2 vạch'.
 * @param {number} n
 */
export function tallyWords(n) {
  const full = Math.floor(n / 5);
  const rest = n % 5;
  if (full === 0) return `${rest} vạch`;
  return `${full} bó 5 vạch${rest > 0 ? ` và ${rest} vạch` : ''}`;
}

/**
 * The labels of the categories with the most and with the fewest.
 * @param {ReadonlyArray<{ label: string, count: number }>} rows
 */
export function extremes(rows) {
  const counts = rows.map((r) => r.count);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  return {
    max,
    min,
    most: rows.filter((r) => r.count === max).map((r) => r.label),
    least: rows.filter((r) => r.count === min).map((r) => r.label),
  };
}
