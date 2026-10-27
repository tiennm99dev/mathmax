/**
 * @template {string | number} T
 * @typedef {{ value: T, count: number, relative: number }} FrequencyRow
 */

/**
 * @typedef {Readonly<{ start: number, end: number, sweep: number }>} Slice
 * Angles in degrees, clockwise from 12 o'clock.
 */

/**
 * Count how often each value occurs. Numbers are listed in ascending order,
 * any other values in order of first appearance. `relative` is count / n.
 * @template {string | number} T
 * @param {readonly T[]} values
 * @returns {FrequencyRow<T>[]}
 */
export function frequencyTable(values) {
  /** @type {Map<T, number>} */
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const rows = [...counts].map(([value, count]) => ({
    value,
    count,
    relative: count / values.length,
  }));
  if (values.every((v) => typeof v === 'number')) {
    rows.sort((a, b) => Number(a.value) - Number(b.value));
  }
  return rows;
}

/**
 * Percentages of a total, rounded to `decimals` places so that they still add
 * up to exactly 100 (largest remainder method). An all-zero input gives zeros.
 * @param {readonly number[]} counts non-negative
 * @param {number} [decimals]
 * @returns {number[]}
 */
export function percentages(counts, decimals = 0) {
  const total = counts.reduce((s, c) => s + c, 0);
  if (total === 0) return counts.map(() => 0);
  const unit = 10 ** decimals;
  const exact = counts.map((c) => (c / total) * 100 * unit);
  const floors = exact.map(Math.floor);
  let left = 100 * unit - floors.reduce((s, f) => s + f, 0);
  const order = exact
    .map((e, i) => ({ i, rest: e - floors[i] }))
    .sort((a, b) => b.rest - a.rest || a.i - b.i);
  for (const { i } of order) {
    if (left <= 0) break;
    floors[i] += 1;
    left -= 1;
  }
  return floors.map((f) => f / unit);
}

/**
 * Pie slices for a list of non-negative values. Slices are laid out
 * clockwise from 12 o'clock; a zero value gets an empty slice.
 * @param {readonly number[]} values
 * @returns {Slice[]}
 */
export function pieSlices(values) {
  const total = values.reduce((s, v) => s + v, 0);
  let start = 0;
  return values.map((v) => {
    const sweep = total === 0 ? 0 : (v / total) * 360;
    const slice = { start, end: start + sweep, sweep };
    start += sweep;
    return slice;
  });
}

/**
 * The icons of one row of a picture chart (biểu đồ tranh): whole icons and
 * the fraction of one more icon, to two decimal places.
 * @param {number} value
 * @param {number} icon how much one icon stands for
 * @returns {{ whole: number, part: number }}
 */
export function iconRow(value, icon) {
  const whole = Math.floor(value / icon);
  const part = Math.round(((value - whole * icon) / icon) * 100) / 100;
  return { whole, part };
}
