/**
 * Logic of the "set the clock" and "read the clock" games: which whole hour
 * to ask for next, and what to tell the child about the hands they set.
 * Pure and DOM-free.
 */
import { dialHour, isWholeHour, mod } from '../_shared/time.js';

/** The hours asked for, in turn, so each round differs from the last. */
export const TARGETS = /** @type {const} */ ([3, 9, 6, 12, 1, 8, 4, 11, 2, 7, 10, 5]);

/**
 * The hour asked for in round `round`.
 * @param {number} round
 */
export function targetHour(round) {
  return TARGETS[mod(round, TARGETS.length)];
}

/**
 * @typedef {{ state: 'right' | 'minute' | 'hour', text: string }} Judgement
 */

/**
 * What the clock set to `minutes` shows, against the hour asked for.
 * @param {number} minutes time on the clock, minutes since 0:00
 * @param {number} target 1 to 12
 * @returns {Judgement}
 */
export function judgeClock(minutes, target) {
  const h = dialHour(minutes);
  if (!isWholeHour(minutes)) {
    return {
      state: 'minute',
      text: 'Kim dài chưa chỉ số 12. Giờ đúng thì kim dài chỉ đúng số 12.',
    };
  }
  if (h === target) {
    return {
      state: 'right',
      text: `Đúng rồi! Kim ngắn chỉ số ${h}, kim dài chỉ số 12. Đồng hồ chỉ ${h} giờ.`,
    };
  }
  return {
    state: 'hour',
    text: `Đồng hồ đang chỉ ${h} giờ. Em kéo kim ngắn đến số ${target}.`,
  };
}

/**
 * Feedback after the child picks `picked` for a clock showing `hour`.
 * @param {number} picked
 * @param {number} hour
 */
export function readFeedback(picked, hour) {
  if (picked === hour) return `Đúng rồi! Kim ngắn chỉ số ${hour}: ${hour} giờ.`;
  if (picked === 12) return 'Số 12 là chỗ kim dài chỉ. Em nhìn kim ngắn nhé.';
  return 'Chưa đúng. Kim ngắn chỉ số nào? Em nhìn kĩ lại nhé.';
}
