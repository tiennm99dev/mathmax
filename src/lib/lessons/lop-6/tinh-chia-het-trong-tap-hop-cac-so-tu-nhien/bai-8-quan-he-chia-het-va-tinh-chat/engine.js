/**
 * Pure logic for the 1-100 grid of the lesson "Quan hệ chia hết": how a cell
 * relates to the chosen number, scoring a learner's guess of Ư(n), arrow-key
 * moves on the grid, and the sum rule checker of the second widget.
 */

import { divisorsOf } from '../_shared/divisibility.js';

/** Side of the square grid; the grid shows 1 to SIZE². */
export const SIZE = 10;

/**
 * How k and n relate: the division k = n · q + r, and whether k is a
 * multiple of n (r = 0) or a divisor of n (n = k · q').
 * @param {number} k cell value, at least 1
 * @param {number} n chosen number, at least 1
 */
export function relation(k, n) {
  const q = Math.floor(k / n);
  const r = k % n;
  return {
    q,
    r,
    isMultiple: r === 0,
    isDivisor: n % k === 0,
    cofactor: n % k === 0 ? n / k : null,
  };
}

/**
 * Scores a guessed set of divisors of n against Ư(n).
 * @param {Iterable<number>} guesses
 * @param {number} n
 */
export function scoreGuess(guesses, n) {
  const truth = new Set(divisorsOf(n));
  const picked = new Set(guesses);
  const right = [...picked].filter((k) => truth.has(k)).sort((a, b) => a - b);
  const wrong = [...picked].filter((k) => !truth.has(k)).sort((a, b) => a - b);
  const missed = [...truth].filter((k) => !picked.has(k));
  return { right, wrong, missed, done: wrong.length === 0 && missed.length === 0 };
}

/**
 * The cell index after an arrow, Home or End key on a SIZE × SIZE grid, or
 * null for any other key.
 * @param {number} idx 0-based index
 * @param {string} key
 * @returns {number | null}
 */
export function moveIndex(idx, key) {
  const row = Math.floor(idx / SIZE);
  const last = SIZE * SIZE - 1;
  switch (key) {
    case 'ArrowRight':
      return Math.min(idx + 1, last);
    case 'ArrowLeft':
      return Math.max(idx - 1, 0);
    case 'ArrowDown':
      return idx + SIZE <= last ? idx + SIZE : idx;
    case 'ArrowUp':
      return idx - SIZE >= 0 ? idx - SIZE : idx;
    case 'Home':
      return row * SIZE;
    case 'End':
      return row * SIZE + SIZE - 1;
    default:
      return null;
  }
}

/**
 * What the two sum rules say about (a + b) and m, and the true answer.
 * Rule 1: a ⋮ m and b ⋮ m give (a + b) ⋮ m. Rule 2: exactly one term not
 * divisible gives (a + b) not divisible. With both terms not divisible the
 * rules say nothing, and the sum may or may not be divisible.
 * @param {number} a
 * @param {number} b
 * @param {number} m at least 1
 * @returns {{ aDiv: boolean, bDiv: boolean, sumDiv: boolean, rule: 1 | 2 | null }}
 */
export function sumRule(a, b, m) {
  const aDiv = a % m === 0;
  const bDiv = b % m === 0;
  /** @type {1 | 2 | null} */
  let rule = null;
  if (aDiv && bDiv) rule = 1;
  else if (aDiv !== bDiv) rule = 2;
  return { aDiv, bDiv, sumDiv: (a + b) % m === 0, rule };
}
