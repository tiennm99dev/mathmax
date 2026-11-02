/**
 * A child's day for the grade 1 chapter "Thời gian. Giờ và lịch", used by the
 * schedule widget and the practice round. The days of the week and the dial
 * helpers are in `#lib/core/kid/time.js`. Pure and DOM-free.
 */
import { formatTime, toMinutes } from '#lib/units-engine/clock.js';

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
