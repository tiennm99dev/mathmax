/**
 * Pure logic for the sorting game of the lesson "Dấu hiệu chia hết": which
 * numbers fall, which baskets (2, 3, 5, 9) each one belongs in, and how a
 * learner's choice is judged with a reason taken from the digits.
 */

import { int, pick } from '../_shared/drill.js';
import { TESTED, digitTestReason, passesDigitTest } from '../_shared/divisibility.js';

/** @typedef {2 | 3 | 5 | 9} Basket */

/** Numbers in one round of the game. */
export const ROUND = 10;

/**
 * A number from 10 to 9 999 for the game. Half the time it is built to be a
 * multiple of 3, 5, 9, 10 or 45 so every basket gets real traffic.
 * @param {() => number} rand
 */
export function nextNumber(rand) {
  const digits = int(rand, 2, 4);
  const lo = 10 ** (digits - 1);
  const hi = 10 ** digits - 1;
  if (rand() < 0.5) return int(rand, lo, hi);
  const d = pick(rand, [3, 5, 9, 10, 45, 18]);
  return d * int(rand, Math.ceil(lo / d), Math.floor(hi / d));
}

/**
 * The baskets n belongs in.
 * @param {number} n
 * @returns {Basket[]}
 */
export function basketsOf(n) {
  return TESTED.filter((d) => passesDigitTest(n, d));
}

/**
 * Judges the baskets a learner picked for n: right when the picked set is
 * exactly the set of divisors among 2, 3, 5, 9. Each basket comes with the
 * digit-test reason, flagged when the learner got that basket wrong.
 * @param {number} n
 * @param {Iterable<Basket>} picked
 */
export function judge(n, picked) {
  const chosen = new Set(picked);
  const lines = TESTED.map((d) => {
    const belongs = passesDigitTest(n, d);
    return { basket: d, belongs, ok: belongs === chosen.has(d), reason: digitTestReason(n, d) };
  });
  return { correct: lines.every((l) => l.ok), lines };
}
