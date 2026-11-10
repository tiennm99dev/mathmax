/**
 * Reading a clock to the minute and the months of a year: the times the
 * child sets on the clock, what the live line says while the hands move,
 * and the practice round. Pure and DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import { dialNumber, sameOnDial } from '#lib/core/kid/time.js';
import { fromMinutes } from '#lib/units-engine/clock.js';
import { labelsOf, roundOf } from '../_shared/questions.js';
import { dialText, kemText, minuteHandWords } from '../_shared/time.js';

/** Times to set on the clock, minutes since 0:00, read on the dial. */
export const TARGETS = /** @type {const} */ ([
  8 * 60 + 32,
  5 * 60 + 45,
  8 * 60 + 20,
  11 * 60 + 35,
  4 * 60 + 55,
  6 * 60 + 27,
  9 * 60 + 41,
  10 * 60 + 8,
  7 * 60 + 53,
  3 * 60 + 15,
]);

/** Where the clock starts. */
export const START = 7 * 60;

/**
 * Where the hour hand should stand for a time.
 * @param {number} total
 */
function hourHandWords(total) {
  const { hours, minutes } = fromMinutes(total);
  const h = dialNumber(hours);
  return minutes === 0 ? `chỉ số ${h}` : `ở giữa số ${h} và số ${dialNumber(hours + 1)}`;
}

/**
 * The live line under the clock while the child sets `target`.
 * @param {number} target
 * @param {number} now what the clock shows
 * @returns {{ ok: boolean, text: string }}
 */
export function clockAdvice(target, now) {
  if (sameOnDial(target, now)) {
    const kem = kemText(target);
    return {
      ok: true,
      text: `Đúng rồi! Đồng hồ chỉ ${dialText(target)}${kem ? `, hay ${kem}` : ''}.`,
    };
  }
  const t = fromMinutes(target);
  const n = fromMinutes(now);
  const reading = `Đồng hồ đang chỉ ${dialText(now)}.`;
  if (t.minutes === n.minutes) {
    return {
      ok: false,
      text: `${reading} Kim dài đúng rồi. Em quay kim ngắn ${hourHandWords(target)}.`,
    };
  }
  if (dialNumber(t.hours) === dialNumber(n.hours)) {
    return {
      ok: false,
      text: `${reading} Giờ đúng rồi. Em quay kim dài: ${minuteHandWords(t.minutes)}.`,
    };
  }
  return {
    ok: false,
    text: `${reading} Em quay kim dài trước cho đúng phút, rồi quay kim ngắn cho đúng giờ.`,
  };
}

/** @type {import('../_shared/questions.js').Kind[]} */
const KINDS = ['read', 'read', 'kem', 'after', 'duration', 'month', 'weekday', 'days'];

/** What each part of the round practises. */
export const KIND_LABELS = labelsOf(KINDS);

/**
 * The practice round of the lesson.
 * @param {number} seed
 */
export function buildRound(seed) {
  return roundOf(KINDS, rng(seed));
}
