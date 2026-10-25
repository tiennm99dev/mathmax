/**
 * Time on an analog clock, held as minutes since 0:00 (0 to 1439). Angles
 * are degrees clockwise from 12 o'clock, the SVG-friendly convention.
 */

export const MINUTES_PER_DAY = 24 * 60;

/** @param {number} total */
function wrapDay(total) {
  return ((Math.round(total) % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}

/**
 * @param {number} hours 0-23
 * @param {number} minutes 0-59
 */
export function toMinutes(hours, minutes) {
  return wrapDay(hours * 60 + minutes);
}

/**
 * @param {number} total minutes since 0:00
 * @returns {{ hours: number, minutes: number }}
 */
export function fromMinutes(total) {
  const t = wrapDay(total);
  return { hours: Math.floor(t / 60), minutes: t % 60 };
}

/**
 * Hand angles. The hour hand moves continuously, half a degree per minute.
 * @param {number} total minutes since 0:00
 * @returns {{ hour: number, minute: number }}
 */
export function handAngles(total) {
  const t = wrapDay(total);
  return { hour: ((t % 720) / 720) * 360, minute: (t % 60) * 6 };
}

/**
 * Set the minute hand to `angle`, snapped to `step` minutes, and move the
 * hour forward or back when the hand crosses 12, as a real clock does.
 * @param {number} total current minutes since 0:00
 * @param {number} angle degrees clockwise from 12
 * @param {number} [step] snap in minutes
 */
export function dragMinuteHand(total, angle, step = 1) {
  const t = wrapDay(total);
  let minute = Math.round((((angle % 360) + 360) % 360) / 6 / step) * step;
  if (minute >= 60) minute = 0;
  const current = t % 60;
  let hourStart = t - current;
  // A jump of more than half the dial means the hand went across 12.
  if (current - minute > 30) hourStart += 60;
  else if (minute - current > 30) hourStart -= 60;
  return wrapDay(hourStart + minute);
}

/**
 * Set the hour hand to `angle`, keeping the minutes and the half of the day
 * (morning or afternoon) of `total`.
 * @param {number} total current minutes since 0:00
 * @param {number} angle degrees clockwise from 12
 */
export function dragHourHand(total, angle) {
  const t = wrapDay(total);
  const hour12 = Math.round((((angle % 360) + 360) % 360) / 30) % 12;
  const afternoon = t >= 720 ? 12 : 0;
  return wrapDay((hour12 + afternoon) * 60 + (t % 60));
}

/**
 * Vietnamese reading such as '7 giờ 15 phút' or '7 giờ' on the hour.
 * `twelveHour` reads 19:15 as '7 giờ 15 phút' with 'tối' after it.
 * @param {number} total minutes since 0:00
 * @param {{ twelveHour?: boolean }} [opts]
 */
export function formatTime(total, opts = {}) {
  const { hours, minutes } = fromMinutes(total);
  const h = opts.twelveHour ? hours % 12 || 12 : hours;
  const text = minutes === 0 ? `${h} giờ` : `${h} giờ ${minutes} phút`;
  if (!opts.twelveHour) return text;
  const period = hours < 11 ? 'sáng' : hours < 13 ? 'trưa' : hours < 18 ? 'chiều' : 'tối';
  return `${text} ${period}`;
}

/**
 * Digital form such as '07:05'.
 * @param {number} total minutes since 0:00
 */
export function formatDigital(total) {
  const { hours, minutes } = fromMinutes(total);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
