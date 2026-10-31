/**
 * Logic of the two practice widgets: a child's daily schedule whose times
 * are set on a clock, and a tear-off calendar for one month that is flipped
 * page by page. Pure and DOM-free.
 */
import {
  MONTH_DAYS,
  WEEKDAYS,
  dialHour,
  hourOfDay,
  isWholeHour,
  mod,
  weekdayOf,
} from '../_shared/time.js';

/**
 * Whether the clock set to `minutes` shows the hour of `routine`.
 * @param {number} minutes
 * @param {import('../_shared/time.js').Routine} routine
 * @returns {{ ok: boolean, text: string }}
 */
export function checkRoutine(minutes, routine) {
  const want = dialHour(routine.hour * 60);
  const when = hourOfDay(routine.hour);
  if (!isWholeHour(minutes)) {
    return { ok: false, text: 'Kim dài phải chỉ số 12 thì mới là giờ đúng.' };
  }
  const shown = dialHour(minutes);
  if (shown === want) {
    return { ok: true, text: `Đúng rồi! ${routine.label} lúc ${when}.` };
  }
  return {
    ok: false,
    text: `Đồng hồ đang chỉ ${shown} giờ. ${routine.label} lúc ${when}: kim ngắn chỉ số ${want}.`,
  };
}

/** The month on the calendar and its length. */
export const MONTH = 5;
export const MONTH_LENGTH = MONTH_DAYS[MONTH - 1];
/** The weekday of the 1st of the month: thứ Sáu. */
export const FIRST_DAY = 4;

/**
 * The weekday of `date` in this month.
 * @param {number} date
 */
export function weekdayOn(date) {
  return weekdayOf(date, FIRST_DAY);
}

/**
 * What the child reads off the page of `date`, and what the next page will
 * say; the last page turns over to the next month.
 * @param {number} date
 */
export function sheetSentences(date) {
  const day = weekdayOn(date);
  const next = weekdayOf(date + 1, FIRST_DAY);
  const after =
    date < MONTH_LENGTH ? `ngày ${date + 1} tháng ${MONTH}` : `ngày 1 tháng ${MONTH + 1}`;
  return [
    `Tờ lịch ghi: ${WEEKDAYS[day]}, ngày ${date} tháng ${MONTH}.`,
    `Tờ sau là ${WEEKDAYS[next]}, ${after}.`,
  ];
}

/** Dates to look for, in turn, each on a different weekday. */
export const MISSIONS = /** @type {const} */ ([10, 19, 6, 23, 15, 28]);

/**
 * The date to look for in mission `k`.
 * @param {number} k
 */
export function missionOf(k) {
  return MISSIONS[mod(k, MISSIONS.length)];
}

/**
 * Feedback once the child has found the page of `goal` and picked a weekday.
 * @param {number} goal
 * @param {number} picked
 */
export function missionFeedback(goal, picked) {
  const right = weekdayOn(goal);
  if (picked === right) {
    return `Đúng rồi! Ngày ${goal} tháng ${MONTH} là ${WEEKDAYS[right]}.`;
  }
  return 'Chưa đúng. Em đọc dòng chữ dưới số ngày trên tờ lịch nhé.';
}
