/**
 * The calendar challenge: find the weekday of a birthday on the calendar
 * sheets, and calendar missions (the weekday of a date, the first or last
 * given weekday of a month, the date some days later). Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { SHORT_DAYS, WEEKDAYS } from '#lib/core/kid/time.js';
import { daysIn, nthWeekday, weekdayOf } from '../_shared/time.js';

/**
 * A mission: tap a weekday (`weekday`) or a date on the sheet (`date`).
 * @typedef {object} Mission
 * @property {'weekday' | 'date'} kind
 * @property {number} month
 * @property {string} prompt
 * @property {number} answer weekday (0 = thứ Hai) or date
 * @property {string} why the reason, shown once the mission is solved
 */

/**
 * Checks the weekday the child names for a date.
 * @param {number} month
 * @param {number} date
 * @param {number} guess 0 = thứ Hai
 * @returns {{ ok: boolean, text: string }}
 */
export function checkWeekday(month, date, guess) {
  const w = weekdayOf(month, date);
  if (guess === w) {
    return {
      ok: true,
      text: `Đúng rồi! Ngày ${date} tháng ${month} nằm ở cột ${SHORT_DAYS[w]}, là ${WEEKDAYS[w]}.`,
    };
  }
  return {
    ok: false,
    text: `Chưa đúng. Em tìm ngày ${date} trên tờ lịch tháng ${month}, rồi nhìn lên chữ ở đầu cột.`,
  };
}

const NAMES = ['Nam', 'Mai', 'Việt', 'Rô-bốt'];
const ORDINAL = { 1: 'đầu tiên', [-1]: 'cuối cùng' };

/**
 * A new calendar mission.
 * @param {() => number} rand
 * @returns {Mission}
 */
export function makeMission(rand) {
  const month = int(rand, 1, 12);
  const kind = pick(rand, ['birthday', 'nth', 'later']);
  if (kind === 'birthday') {
    const date = int(rand, 1, daysIn(month));
    const w = weekdayOf(month, date);
    return {
      kind: 'weekday',
      month,
      prompt: `Sinh nhật ${pick(rand, NAMES)} là ngày ${date} tháng ${month}. Ngày đó là thứ mấy?`,
      answer: w,
      why: `Ngày ${date} nằm ở cột ${SHORT_DAYS[w]}, nên là ${WEEKDAYS[w]}.`,
    };
  }
  if (kind === 'nth') {
    const weekday = pick(rand, [4, 5, 6]);
    const n = /** @type {1 | -1} */ (pick(rand, [1, -1]));
    const date = nthWeekday(month, weekday, n);
    return {
      kind: 'date',
      month,
      prompt: `Lớp em đi dã ngoại vào ${WEEKDAYS[weekday]} ${ORDINAL[n]} của tháng ${month}. Đó là ngày nào? Em chạm vào ngày đó.`,
      answer: date,
      why: `Các ngày ${WEEKDAYS[weekday]} nằm ở cột ${SHORT_DAYS[weekday]}. Ngày ${ORDINAL[n]} ở cột đó là ngày ${date}.`,
    };
  }
  const start = int(rand, 1, daysIn(month) - 7);
  const k = pick(rand, [2, 3, 5, 7]);
  const date = start + k;
  return {
    kind: 'date',
    month,
    prompt: `Hôm nay là ngày ${start} tháng ${month}. ${k} ngày nữa là sinh nhật bố. Sinh nhật bố là ngày nào? Em chạm vào ngày đó.`,
    answer: date,
    why: `${start} + ${k} = ${date}. Sinh nhật bố là ngày ${date} tháng ${month}, ${WEEKDAYS[weekdayOf(month, date)]}.`,
  };
}

/**
 * Checks an answer to a mission.
 * @param {Mission} mission
 * @param {number} given a weekday or a date, as the mission asks
 * @returns {{ ok: boolean, text: string }}
 */
export function checkMission(mission, given) {
  if (given === mission.answer) return { ok: true, text: `Đúng rồi! ${mission.why}` };
  if (mission.kind === 'weekday') {
    return {
      ok: false,
      text: `Chưa đúng, không phải ${WEEKDAYS[given]}. Em tìm ngày đó rồi nhìn lên chữ ở đầu cột.`,
    };
  }
  return {
    ok: false,
    text: `Ngày ${given} là ${WEEKDAYS[weekdayOf(mission.month, given)]}, chưa đúng. Em đọc lại đề và thử lại.`,
  };
}
