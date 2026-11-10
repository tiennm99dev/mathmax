/**
 * Grade 3 time: reading a clock to the minute ("8 giờ 32 phút", "9 giờ kém
 * 5 phút"), what a child sees on the dial, minutes later and how long
 * something lasts, the days of each month, and looking things up on the
 * calendar sheets of `#lib/core/kid/month-sheet.svelte`. Times are minutes
 * since 0:00. Pure and DOM-free.
 */
import { fromMinutes } from '#lib/units-engine/clock.js';
import { daysIn, dialNumber, dialText, mod, weekdayOf } from '#lib/core/kid/time.js';

export { daysIn, dialText, weekdayOf };

/** The months with 30 days. */
export const THIRTY = /** @type {const} */ ([4, 6, 9, 11]);

/** The months with 31 days. */
export const THIRTY_ONE = /** @type {const} */ ([1, 3, 5, 7, 8, 10, 12]);

/**
 * The "kém" reading of a time from 35 minutes past the hour on:
 * 8 giờ 50 phút is '9 giờ kém 10 phút'. Null before that.
 * @param {number} total minutes since 0:00
 */
export function kemText(total) {
  const { hours, minutes } = fromMinutes(total);
  if (minutes < 35) return null;
  return `${dialNumber(hours + 1)} giờ kém ${60 - minutes} phút`;
}

/**
 * Where the long hand stands, said the way a child counts it: on a number,
 * or so many small marks after one.
 * @param {number} minutes 0 to 59
 */
export function minuteHandWords(minutes) {
  const big = Math.floor(minutes / 5) || 12;
  const rest = minutes % 5;
  if (rest === 0) return `kim dài chỉ số ${minutes === 0 ? 12 : big}`;
  return `kim dài chỉ vạch nhỏ thứ ${rest} sau số ${big}`;
}

/**
 * What a screen reader hears for a still clock: where both hands point, never
 * the time itself.
 * @param {number} total minutes since 0:00
 */
export function handsWords(total) {
  const { hours, minutes } = fromMinutes(total);
  const dial = dialNumber(hours);
  const hour =
    minutes === 0
      ? `kim ngắn chỉ số ${dial}`
      : `kim ngắn ở giữa số ${dial} và số ${dialNumber(hours + 1)}`;
  return `${hour}, ${minuteHandWords(minutes)}`;
}

/**
 * A time `delta` minutes later (earlier when negative), on the 24-hour day.
 * @param {number} total
 * @param {number} delta
 */
export function later(total, delta) {
  return mod(total + delta, 1440);
}

/**
 * A length of time: '40 phút', '1 giờ', '1 giờ 15 phút'.
 * @param {number} minutes
 */
export function durationText(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/**
 * How many days a month has, as the book says it: February has 28 or 29.
 * @param {number} month 1 to 12
 */
export function monthDaysText(month) {
  return month === 2 ? '28 hoặc 29 ngày' : `${daysIn(month)} ngày`;
}

/**
 * The days from one date to another, both counted, on the calendar sheets of
 * one year: 30 tháng 8 to 3 tháng 9 is 5 days.
 * @param {number} m1
 * @param {number} d1
 * @param {number} m2 not before m1
 * @param {number} d2
 */
export function daysBetween(m1, d1, m2, d2) {
  let days = 0;
  for (let m = m1; m < m2; m++) days += daysIn(m);
  return days + d2 - d1 + 1;
}

/**
 * The date of the `n`-th given weekday of a month (n = 1 the first; n = -1
 * the last), on the calendar sheets.
 * @param {number} month
 * @param {number} weekday 0 = thứ Hai
 * @param {number} n
 */
export function nthWeekday(month, weekday, n) {
  const dates = datesOn(month, weekday);
  return n > 0 ? dates[n - 1] : dates[dates.length + n];
}

/**
 * Every date of a month that falls on a weekday.
 * @param {number} month
 * @param {number} weekday 0 = thứ Hai
 */
export function datesOn(month, weekday) {
  const dates = [];
  for (let d = 1; d <= daysIn(month); d++) if (weekdayOf(month, d) === weekday) dates.push(d);
  return dates;
}
