/**
 * Answer options of this chapter's review questions, written the book's way
 * (1 000; 11 (dư 7)). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * Up to four number options in increasing order: the right one, the slips that
 * are whole numbers and not the right value, then its neighbours, so a question
 * always has four different choices.
 * @param {number} right
 * @param {number[]} slips
 * @param {(n: number) => string} [write]
 * @returns {{ options: string[], answer: number }}
 */
export function valueOptions(right, slips, write = fmt) {
  const near = [right + 1, right + 2, right + 3];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && Number.isInteger(v),
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
