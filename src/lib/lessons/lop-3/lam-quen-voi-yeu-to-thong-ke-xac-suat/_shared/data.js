/**
 * Counting by category for the data lessons of grade 3: tally bundles, totals
 * and the categories with the most and the fewest.
 */

/**
 * What one column of a data table (bảng số liệu) or one survey choice shows
 * beside its name: a kid picture, a colour swatch or an emoji.
 * @typedef {{ picture: import('#lib/core/kid/pictures/index.js').PictureName }
 *   | { color: string }
 *   | { emoji: string }} DataSymbol
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
 * How many of each category, from the category index of each item.
 * @param {readonly number[]} items
 * @param {number} size how many categories
 * @returns {number[]}
 */
export function countBy(items, size) {
  const counts = Array.from({ length: size }, () => 0);
  for (const i of items) counts[i] += 1;
  return counts;
}

/**
 * @param {ReadonlyArray<{ count: number }>} rows
 */
export function totalOf(rows) {
  return rows.reduce((sum, r) => sum + r.count, 0);
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
