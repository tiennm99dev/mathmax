/**
 * Answer options of this chapter's review questions, written the book's way
 * (12 345; 783 (dư 4)). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * Four number options in increasing order: the right one, the slips that are
 * whole numbers from 0 to 100 000 and not the right value, then its
 * neighbours `step` apart, so a question always has four different choices.
 * @param {number} right
 * @param {number[]} slips
 * @param {{ step?: number, write?: (n: number) => string }} [how]
 * @returns {{ options: string[], answer: number }}
 */
export function valueOptions(right, slips, { step = 1, write = fmt } = {}) {
  const near = [
    right + step,
    right - step,
    right + 2 * step,
    right + 3 * step,
    right - 2 * step,
    right - 3 * step,
  ];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && v <= 100000 && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((a, b) => a - b);
  return { options: values.map(write), answer: values.indexOf(right) };
}

/**
 * A quotient and its remainder.
 * @param {number} q
 * @param {number} rest
 */
export const withRest = (q, rest) => (rest > 0 ? `${fmt(q)} (dư ${rest})` : fmt(q));

/**
 * A sum of money: "35 000 đồng".
 * @param {number} n
 */
export const dong = (n) => `${fmt(n)} đồng`;
