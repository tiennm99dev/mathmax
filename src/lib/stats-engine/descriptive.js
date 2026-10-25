/**
 * Descriptive statistics for a sample, with the conventions of the KNTT
 * books: variance divides by n, and quartiles are medians of the two halves
 * that leave out the median when n is odd.
 */

/** @param {readonly number[]} values */
function requireValues(values) {
  if (values.length === 0) throw new Error('statistics need at least one value');
}

/** @param {readonly number[]} values */
export function sum(values) {
  return values.reduce((s, v) => s + v, 0);
}

/** @param {readonly number[]} values */
export function mean(values) {
  requireValues(values);
  return sum(values) / values.length;
}

/** @param {readonly number[]} values */
export function median(values) {
  requireValues(values);
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Every value that occurs most often, in ascending order. A sample where all
 * values occur equally often still returns all of them.
 * @param {readonly number[]} values
 * @returns {number[]}
 */
export function modes(values) {
  requireValues(values);
  /** @type {Map<number, number>} */
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const top = Math.max(...counts.values());
  return [...counts]
    .filter(([, c]) => c === top)
    .map(([v]) => v)
    .sort((a, b) => a - b);
}

/** @param {readonly number[]} values */
export function range(values) {
  requireValues(values);
  return Math.max(...values) - Math.min(...values);
}

/**
 * Population variance: the mean squared distance from the mean.
 * @param {readonly number[]} values
 */
export function variance(values) {
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

/** @param {readonly number[]} values */
export function stdDev(values) {
  return Math.sqrt(variance(values));
}

/**
 * Q1, Q2 and Q3. Q2 is the median; Q1 and Q3 are the medians of the lower and
 * upper halves, which exclude the median itself when n is odd.
 * @param {readonly number[]} values
 * @returns {[number, number, number]}
 */
export function quartiles(values) {
  requireValues(values);
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 1) return [sorted[0], sorted[0], sorted[0]];
  const half = Math.floor(n / 2);
  const lower = sorted.slice(0, half);
  const upper = sorted.slice(n % 2 === 1 ? half + 1 : half);
  return [median(lower), median(sorted), median(upper)];
}

/** @param {readonly number[]} values */
export function interquartileRange(values) {
  const [q1, , q3] = quartiles(values);
  return q3 - q1;
}
