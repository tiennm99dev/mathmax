/**
 * Shared facts for the grade 1 chapter "Thời gian. Giờ và lịch": the seven
 * days of the week in the order the book counts them (thứ Hai first, Chủ
 * nhật last), whole hours on a 12-hour dial, a month sheet of a wall
 * calendar, and a child's day used by the schedule widget and the practice
 * round. Pure and DOM-free.
 */
import { formatTime, toMinutes } from '#lib/units-engine/clock.js';

/** The days of one week, as written inside a sentence. */
export const WEEKDAYS = /** @type {const} */ ([
  'thứ Hai',
  'thứ Ba',
  'thứ Tư',
  'thứ Năm',
  'thứ Sáu',
  'thứ Bảy',
  'Chủ nhật',
]);

/** Short forms printed on calendars. */
export const SHORT_DAYS = /** @type {const} */ (['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']);

/**
 * Remainder that is never negative.
 * @param {number} n
 * @param {number} m
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * The day `k` days after `day` (0 = thứ Hai); a negative `k` goes back.
 * @param {number} day
 * @param {number} [k]
 */
export function dayAfter(day, k = 1) {
  return mod(day + k, 7);
}

/**
 * A day name for the start of a sentence: 'Thứ Hai', 'Chủ nhật'.
 * @param {number} day
 */
export function dayTitle(day) {
  const name = WEEKDAYS[mod(day, 7)];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * The number the hour hand points at, 1 to 12, for a time in minutes since
 * 0:00 (the hand points exactly at it on a whole hour).
 * @param {number} minutes
 */
export function dialHour(minutes) {
  return Math.floor(mod(minutes, 720) / 60) || 12;
}

/**
 * True when the minute hand points at 12.
 * @param {number} minutes
 */
export function isWholeHour(minutes) {
  return mod(minutes, 60) === 0;
}

/**
 * Three different hours to pick from for a clock at `hour` (1 to 12): the
 * right one, the next hour (a miscount) and 12 (reading the minute hand),
 * or 6 when the answer is 12 itself. Sorted, so the right one moves around.
 * @param {number} hour
 */
export function hourOptions(hour) {
  const next = (hour % 12) + 1;
  const swap = hour === 12 ? 6 : next === 12 ? 6 : 12;
  return [hour, next, swap].sort((a, b) => a - b);
}

/** Days in each month of a year that is not a leap year. */
export const MONTH_DAYS = /** @type {const} */ ([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

/**
 * The weekday of `date` in a month whose first day is `firstDay`.
 * @param {number} date 1 to 31
 * @param {number} firstDay 0 = thứ Hai
 */
export function weekdayOf(date, firstDay) {
  return mod(firstDay + date - 1, 7);
}

/**
 * @typedef {{ id: string, label: string, hour: number, icon: string }} Routine
 */

/**
 * One school day of a first-grader. `hour` is on a 24-hour day and every
 * time is a whole hour, so each one can be set on a clock.
 * @type {readonly Routine[]}
 */
export const ROUTINES = [
  { id: 'wake', label: 'Thức dậy', hour: 6, icon: '🌅' },
  { id: 'school', label: 'Vào lớp học', hour: 7, icon: '🏫' },
  { id: 'lunch', label: 'Ăn trưa', hour: 11, icon: '🍚' },
  { id: 'home', label: 'Đi học về', hour: 17, icon: '🎒' },
  { id: 'dinner', label: 'Ăn tối', hour: 19, icon: '🍲' },
  { id: 'sleep', label: 'Đi ngủ', hour: 21, icon: '🛏️' },
];

/**
 * The time of a routine as a child says it: '5 giờ chiều', '9 giờ tối'.
 * @param {number} hour 0 to 23
 */
export function hourOfDay(hour) {
  return formatTime(toMinutes(hour, 0), { twelveHour: true });
}
