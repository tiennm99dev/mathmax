/**
 * Pure logic for the two blinking lights of the lesson "Bội chung. Bội chung
 * nhỏ nhất": light A flashes every a seconds, light B every b seconds, and
 * they flash together exactly at the common multiples of a and b.
 */

import { lcm } from '#lib/numtheory-engine/index.js';

/** Longest time line the widget draws, in seconds. */
export const HORIZON = 200;

/**
 * Which lights are on at second t (t ≥ 1).
 * @param {number} t
 * @param {number} a
 * @param {number} b
 */
export function lightsAt(t, a, b) {
  return { a: t % a === 0, b: t % b === 0 };
}

/**
 * The seconds from 1 to `until` at which both lights flash, found by
 * watching the lights rather than by a formula; the first one is BCNN(a, b).
 * @param {number} a
 * @param {number} b
 * @param {number} until
 */
export function togetherUpTo(a, b, until) {
  /** @type {number[]} */
  const out = [];
  for (let t = 1; t <= until; t++) {
    const on = lightsAt(t, a, b);
    if (on.a && on.b) out.push(t);
  }
  return out;
}

/**
 * How long the time line runs: two full cycles of BCNN(a, b), but at least
 * 24 seconds and at most HORIZON.
 * @param {number} a
 * @param {number} b
 */
export function timelineLength(a, b) {
  return Math.min(HORIZON, Math.max(24, 2 * lcm(a, b)));
}
