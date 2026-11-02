/**
 * Logic of the week planner of "Thực hành và trải nghiệm xem đồng hồ, xem
 * lịch": each activity is put on its date on the calendar and at its time on
 * the clock. Pure and DOM-free.
 */
import { toMinutes } from '#lib/units-engine/clock.js';
import { WEEKDAYS, handsText, namesOf, sameOnDial, weekdayOf } from '#lib/core/kid/time.js';

/** The calendar sheet of the planner and the week being planned. */
export const PLAN_MONTH = 5;
export const WEEK = /** @type {const} */ ([16, 17, 18, 19, 20, 21, 22]);

/**
 * @typedef {object} Activity
 * @property {string} id
 * @property {string} label
 * @property {string} icon
 * @property {string} when how the plan says it
 * @property {number} date on the sheet of `PLAN_MONTH`
 * @property {number} minutes since 0:00
 */

/** One week of a second-grader. @type {readonly Activity[]} */
export const ACTIVITIES = [
  {
    id: 'read',
    label: 'Đọc truyện',
    icon: '📖',
    when: 'hôm nay, thứ Hai, lúc 20 giờ 30 phút',
    date: 16,
    minutes: toMinutes(20, 30),
  },
  {
    id: 'swim',
    label: 'Học bơi',
    icon: '🏊',
    when: 'thứ Ba, lúc 4 giờ 30 phút chiều',
    date: 17,
    minutes: toMinutes(16, 30),
  },
  {
    id: 'birthday',
    label: 'Mừng sinh nhật Bác Hồ',
    icon: '🌺',
    when: 'ngày 19 tháng 5, lúc 8 giờ 15 phút sáng',
    date: 19,
    minutes: toMinutes(8, 15),
  },
  {
    id: 'football',
    label: 'Đá bóng',
    icon: '⚽',
    when: 'thứ Sáu, lúc 17 giờ',
    date: 20,
    minutes: toMinutes(17, 0),
  },
  {
    id: 'library',
    label: 'Đến thư viện',
    icon: '📚',
    when: 'ngày 21 tháng 5, lúc 9 giờ rưỡi sáng',
    date: 21,
    minutes: toMinutes(9, 30),
  },
  {
    id: 'grandma',
    label: 'Thăm ông bà',
    icon: '👵',
    when: 'Chủ nhật, lúc 15 giờ 15 phút',
    date: 22,
    minutes: toMinutes(15, 15),
  },
];

/**
 * The date and the time as they go on the finished plan.
 * @param {Activity} activity
 */
export function planLine(activity) {
  const day = WEEKDAYS[weekdayOf(PLAN_MONTH, activity.date)];
  return `${day}, ngày ${activity.date} tháng ${PLAN_MONTH}, ${namesOf(activity.minutes)[0]}`;
}

/**
 * Whether the child has put `activity` on the right date and time; a dial
 * shows morning and afternoon alike, so only the hands count.
 * @param {Activity} activity
 * @param {number | null} date the date tapped on the calendar
 * @param {number} minutes the time on the clock
 * @returns {{ ok: boolean, text: string }}
 */
export function checkPlacement(activity, date, minutes) {
  if (date === null) return { ok: false, text: 'Em chạm vào ngày trên tờ lịch trước nhé.' };
  if (date !== activity.date) {
    const want = WEEKDAYS[weekdayOf(PLAN_MONTH, activity.date)];
    return { ok: false, text: `Chưa đúng ngày. ${activity.label} vào ${want} của tuần này.` };
  }
  if (!sameOnDial(minutes, activity.minutes)) {
    return {
      ok: false,
      text: `Đúng ngày rồi. Đồng hồ phải có ${handsText(activity.minutes)}.`,
    };
  }
  return { ok: true, text: `Đúng rồi! ${activity.label}: ${planLine(activity)}.` };
}

/**
 * The placed activities in the order they happen.
 * @param {readonly string[]} placed ids
 * @returns {Activity[]}
 */
export function planOf(placed) {
  return ACTIVITIES.filter((a) => placed.includes(a.id)).sort(
    (a, b) => a.date - b.date || a.minutes - b.minutes,
  );
}
