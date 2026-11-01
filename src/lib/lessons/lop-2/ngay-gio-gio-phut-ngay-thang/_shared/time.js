/**
 * Shared facts for the chapter on days, hours and months: the parts of a day
 * as the book names them, the two ways of saying a time ("13 giờ" and "1 giờ
 * chiều"), where the hands of a clock point, and the wall calendar sheets of
 * one common year. Times are minutes since 0:00, as in
 * `#lib/units-engine/clock.js`. Pure and DOM-free.
 */
import { fromMinutes } from '#lib/units-engine/clock.js';

/** The days of one week as written inside a sentence, thứ Hai first. */
export const WEEKDAYS = /** @type {const} */ ([
  'thứ Hai',
  'thứ Ba',
  'thứ Tư',
  'thứ Năm',
  'thứ Sáu',
  'thứ Bảy',
  'Chủ nhật',
]);

/** Short names at the head of a calendar sheet. */
export const SHORT_DAYS = /** @type {const} */ (['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']);

/**
 * The parts of a day, each with its hours counted from 1 to 24.
 * @type {ReadonlyArray<{ id: string, label: string, word: string, hours: number[] }>}
 */
export const DAY_PARTS = [
  { id: 'sang', label: 'Sáng', word: 'sáng', hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 'trua', label: 'Trưa', word: 'trưa', hours: [11, 12] },
  { id: 'chieu', label: 'Chiều', word: 'chiều', hours: [13, 14, 15, 16, 17, 18] },
  { id: 'toi', label: 'Tối', word: 'tối', hours: [19, 20, 21] },
  { id: 'dem', label: 'Đêm', word: 'đêm', hours: [22, 23, 24] },
];

/**
 * Remainder that is never negative.
 * @param {number} n
 * @param {number} m
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * The part of the day a time falls in. 18 giờ is the last hour of the
 * afternoon, so a time just after it belongs to the evening.
 * @param {number} total minutes since 0:00
 * @returns {string} 'sáng', 'trưa', 'chiều', 'tối' or 'đêm'
 */
export function partOf(total) {
  const { hours, minutes } = fromMinutes(total);
  if (hours === 18 && minutes > 0) return 'tối';
  const part = DAY_PARTS.find((p) => p.hours.includes(hours || 24));
  return part ? part.word : 'đêm';
}

/**
 * The number an hour has on the dial, 1 to 12.
 * @param {number} hour 0 to 24
 */
export function dialNumber(hour) {
  return hour % 12 || 12;
}

/**
 * A count of hours and minutes as a child says it.
 * @param {number} hour
 * @param {number} minutes
 */
function hourMinute(hour, minutes) {
  return minutes === 0 ? `${hour} giờ` : `${hour} giờ ${minutes} phút`;
}

/**
 * A time counted through the whole day: '15 giờ 30 phút'. Midnight is the end
 * of the day, '24 giờ'.
 * @param {number} total minutes since 0:00
 */
export function dayClockText(total) {
  const { hours, minutes } = fromMinutes(total);
  if (hours === 0 && minutes === 0) return '24 giờ';
  return hourMinute(hours, minutes);
}

/**
 * The time read off the dial, without the part of the day: '3 giờ 30 phút'.
 * @param {number} total minutes since 0:00
 */
export function dialText(total) {
  const { hours, minutes } = fromMinutes(total);
  return hourMinute(dialNumber(hours), minutes);
}

/**
 * A time with its part of the day: '3 giờ 30 phút chiều', '12 giờ đêm'.
 * @param {number} total minutes since 0:00
 */
export function partText(total) {
  return `${dialText(total)} ${partOf(total)}`;
}

/**
 * Every way the lesson names a time, in the order a child would read them:
 * the count through the day when it differs from the dial, then the dial with
 * its part of the day, then "rưỡi" or "kém" when the minute hand allows it.
 * @param {number} total minutes since 0:00
 * @returns {string[]}
 */
export function namesOf(total) {
  const { hours, minutes } = fromMinutes(total);
  const part = partOf(total);
  const names = hours >= 13 || total % 1440 === 0 ? [dayClockText(total)] : [];
  names.push(partText(total));
  if (minutes === 30) names.push(`${dialNumber(hours)} giờ rưỡi ${part}`);
  if (minutes === 45) names.push(`${dialNumber(hours + 1)} giờ kém 15 phút ${part}`);
  return names;
}

/**
 * Where the two hands of a clock point: what a child reads off the dial and
 * what a screen reader says for the picture, so it never gives the time away.
 * @param {number} total minutes since 0:00
 */
export function handsText(total) {
  const { hours, minutes } = fromMinutes(total);
  const dial = dialNumber(hours);
  const hourHand =
    minutes === 0
      ? `kim ngắn chỉ số ${dial}`
      : `kim ngắn ở giữa số ${dial} và số ${dialNumber(hours + 1)}`;
  return `${hourHand}, kim dài chỉ số ${minutes / 5 || 12}`;
}

/**
 * Whether two times look the same on a 12-hour dial.
 * @param {number} a
 * @param {number} b
 */
export function sameOnDial(a, b) {
  return mod(a, 720) === mod(b, 720);
}

/** Days of each month of a common year. */
export const MONTH_DAYS = /** @type {const} */ ([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

/** Weekday of the 1st of each month on these sheets (0 = thứ Hai). */
const FIRST_DAYS = /** @type {const} */ ([5, 1, 1, 4, 6, 2, 4, 0, 3, 5, 1, 3]);

/**
 * How many days a month has on these sheets.
 * @param {number} month 1 to 12
 */
export function daysIn(month) {
  return MONTH_DAYS[month - 1];
}

/**
 * The weekday of a date (0 = thứ Hai).
 * @param {number} month 1 to 12
 * @param {number} date
 */
export function weekdayOf(month, date) {
  return mod(FIRST_DAYS[month - 1] + date - 1, 7);
}

/**
 * The weeks of a month for a calendar sheet, thứ Hai first; `null` fills the
 * cells outside the month.
 * @param {number} month 1 to 12
 * @returns {Array<Array<number | null>>}
 */
export function monthRows(month) {
  const cells = /** @type {Array<number | null>} */ (
    Array.from({ length: FIRST_DAYS[month - 1] }, () => null)
  );
  for (let d = 1; d <= daysIn(month); d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
}

/**
 * First letter in upper case, for a weekday that starts a sentence.
 * @param {string} text
 */
export function upperFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
