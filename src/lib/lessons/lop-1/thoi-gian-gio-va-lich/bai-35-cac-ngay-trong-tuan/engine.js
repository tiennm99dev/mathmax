/**
 * Logic of the week wheel: the seven days sit on a wheel in order, the
 * wheel turns so that "hôm nay" is on top, and the days either side of it
 * are "hôm qua" and "ngày mai". Pure and DOM-free.
 */
import { WEEKDAYS, dayAfter, dayTitle, mod } from '../_shared/time.js';

/** Degrees between two neighbouring days on the wheel. */
export const STEP = 360 / 7;

/**
 * Turn the wheel the short way so `day` comes to the top. `turn` counts
 * steps without wrapping, so every day slides the same way when it turns.
 * @param {number} turn current turn, in days
 * @param {number} day 0 = thứ Hai
 */
export function turnTo(turn, day) {
  let delta = mod(day - turn, 7);
  if (delta > 3) delta -= 7;
  return turn + delta;
}

/**
 * Where day `i` sits on the wheel, in degrees clockwise from the top.
 * @param {number} i
 * @param {number} turn
 */
export function dayAngle(i, turn) {
  return (i - turn) * STEP;
}

/**
 * @typedef {'today' | 'yesterday' | 'tomorrow'} Role
 */

/**
 * @param {number} i a day
 * @param {number} today
 * @returns {Role | null}
 */
export function roleOf(i, today) {
  if (i === mod(today, 7)) return 'today';
  if (i === dayAfter(today, -1)) return 'yesterday';
  if (i === dayAfter(today, 1)) return 'tomorrow';
  return null;
}

/** The words for each role. */
export const ROLE_WORDS = /** @type {const} */ ({
  today: 'Hôm nay',
  yesterday: 'Hôm qua',
  tomorrow: 'Ngày mai',
});

/**
 * The three sentences shown under the wheel.
 * @param {number} today
 */
export function daySentences(today) {
  return [
    `Hôm qua là ${WEEKDAYS[dayAfter(today, -1)]}.`,
    `Hôm nay là ${WEEKDAYS[mod(today, 7)]}.`,
    `Ngày mai là ${WEEKDAYS[dayAfter(today, 1)]}.`,
  ];
}

/**
 * @typedef {{ today: number, ask: 'tomorrow' | 'yesterday', answer: number, prompt: string }} Question
 */

/**
 * The question of round `round`: the rounds walk through every day and
 * alternate between asking for tomorrow and for yesterday.
 * @param {number} round
 * @returns {Question}
 */
export function questionOf(round) {
  const today = mod(round * 3 + 1, 7);
  const ask = round % 2 === 0 ? 'tomorrow' : 'yesterday';
  const answer = dayAfter(today, ask === 'tomorrow' ? 1 : -1);
  const word = ask === 'tomorrow' ? 'Ngày mai' : 'Hôm qua';
  return {
    today,
    ask,
    answer,
    prompt: `Hôm nay là ${WEEKDAYS[today]}. ${word} là thứ mấy?`,
  };
}

/**
 * Feedback after the child taps `day` for question `q`.
 * @param {Question} q
 * @param {number} day
 */
export function answerFeedback(q, day) {
  const word = q.ask === 'tomorrow' ? 'Ngày mai' : 'Hôm qua';
  if (day === q.answer) return `Đúng rồi! ${word} là ${WEEKDAYS[q.answer]}.`;
  if (day === q.today) return `${dayTitle(day)} là hôm nay. Em tìm ngày ở bên cạnh.`;
  const side = q.ask === 'tomorrow' ? 'ngay sau' : 'ngay trước';
  return `Chưa đúng. ${word} là ngày đứng ${side} hôm nay.`;
}
