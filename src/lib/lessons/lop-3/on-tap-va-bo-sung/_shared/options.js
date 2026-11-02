/**
 * Number options for the review questions of this chapter, up to 1000. Pure
 * and DOM-free.
 */
import { shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/**
 * Up to four number options in increasing order, written the book's way (1 000): the right one and the slips
 * a child makes (the given ones first, then one, ten or a hundred off), from
 * `lo` to `hi`.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} [slips]
 * @param {number} [hi]
 * @param {number} [lo]
 * @returns {{ options: string[], answer: number }}
 */
export function nearOptions(rand, right, slips = [], hi = 1000, lo = 0) {
  const ok = (/** @type {number} */ v) => v !== right && v >= lo && v <= hi;
  const first = [...new Set(slips.filter(ok))];
  const steps = [1, -1, 10, -10, 2, ...(right >= 100 ? [100, -100] : [])];
  const rest = shuffle(
    rand,
    steps.map((d) => right + d).filter((v) => ok(v) && !first.includes(v)),
  );
  const values = [right, ...[...first, ...rest].slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}

/**
 * Number options written with a unit: "13 bạn".
 * @param {() => number} rand
 * @param {number} right
 * @param {string} unit
 * @param {number[]} [slips]
 * @param {number} [hi]
 * @param {number} [lo]
 */
export function unitOptions(rand, right, unit, slips = [], hi = 1000, lo = 0) {
  const { options, answer } = nearOptions(rand, right, slips, hi, lo);
  return { options: options.map((o) => `${o} ${unit}`), answer };
}
