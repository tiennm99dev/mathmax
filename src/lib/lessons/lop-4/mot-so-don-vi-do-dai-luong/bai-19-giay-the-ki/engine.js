/**
 * Seconds and centuries. A timeline of centuries around a chosen year, with
 * the years each one runs from and to, a quiz on the century of events from
 * Vietnamese history, and the readings of a stopwatch with a "stop at the
 * guessed second" game. Pure and DOM-free.
 */
import { clamp } from '#lib/core/visuals/svg-math.js';
import { centuryOf, centuryYears, durationText, roman } from '../_shared/measures.js';

/** The years the timeline reaches: centuries I to XXI. */
export const FIRST_YEAR = 1;
export const LAST_YEAR = 2100;

/** How many centuries the timeline shows at once. */
export const SPAN = 5;

/**
 * A year moved by `change`, kept on the timeline.
 * @param {number} year
 * @param {number} change
 */
export function moveYear(year, change) {
  return clamp(year + change, FIRST_YEAR, LAST_YEAR);
}

/**
 * The centuries shown around a year, its own near the middle.
 * @param {number} year
 * @returns {number[]}
 */
export function centuriesAround(year) {
  const last = centuryOf(LAST_YEAR);
  const start = clamp(centuryOf(year) - Math.floor(SPAN / 2), 1, last - SPAN + 1);
  return Array.from({ length: SPAN }, (_, i) => start + i);
}

/**
 * Where a year sits inside its century, from 0 (the first year) to 1 (the
 * last).
 * @param {number} year
 */
export function placeInCentury(year) {
  const [first] = centuryYears(centuryOf(year));
  return (year - first) / 99;
}

/**
 * An event of Vietnamese history and its year.
 * @typedef {{ year: number, text: string }} HistoryEvent
 */

/** @type {readonly HistoryEvent[]} */
export const EVENTS = [
  { year: 1010, text: 'vua Lý Thái Tổ dời đô ra Thăng Long' },
  { year: 938, text: 'Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng' },
  { year: 1945, text: 'Bác Hồ đọc bản Tuyên ngôn Độc lập' },
  { year: 1288, text: 'Trần Hưng Đạo đánh thắng quân Nguyên trên sông Bạch Đằng' },
  { year: 2000, text: 'mọi người đón năm cuối cùng của thế kỉ XX' },
  { year: 1789, text: 'vua Quang Trung đại phá quân Thanh' },
  { year: 1975, text: 'đất nước ta thống nhất' },
  { year: 2001, text: 'mọi người đón năm đầu tiên của thế kỉ XXI' },
];

/**
 * Three centuries to pick from, in order: the right one and its neighbours.
 * @param {number} year
 * @returns {{ options: number[], answer: number }}
 */
export function centuryChoices(year) {
  const c = centuryOf(year);
  const start = clamp(c - 1, 1, centuryOf(LAST_YEAR) - 2);
  const options = [start, start + 1, start + 2];
  return { options, answer: options.indexOf(c) };
}

/**
 * What the quiz says after a pick.
 * @param {number} year
 * @param {number} picked a century
 * @returns {{ ok: boolean, text: string }}
 */
export function checkCentury(year, picked) {
  const c = centuryOf(year);
  const [first, last] = centuryYears(c);
  if (picked === c) {
    return {
      ok: true,
      text: `Đúng rồi! Thế kỉ ${roman(c)} từ năm ${first} đến năm ${last}, nên năm ${year} thuộc thế kỉ ${roman(c)}.`,
    };
  }
  const [pf, pl] = centuryYears(picked);
  return {
    ok: false,
    text: `Chưa đúng. Thế kỉ ${roman(picked)} từ năm ${pf} đến năm ${pl}. Em tìm thế kỉ có năm ${year} nhé.`,
  };
}

/**
 * A stopwatch reading: whole seconds and the 'phút : giây' face.
 * @param {number} elapsed seconds, not whole
 * @returns {{ seconds: number, face: string, text: string }}
 */
export function stopwatchReading(elapsed) {
  const seconds = Math.floor(elapsed);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return { seconds, face: `${mm}:${ss}`, text: durationText(seconds) };
}

/**
 * What the guessing game says when the child stops the hidden stopwatch.
 * @param {number} target seconds the child tried to wait
 * @param {number} elapsed seconds that passed
 */
export function guessMessage(target, elapsed) {
  const seconds = Math.round(elapsed);
  const gap = Math.abs(seconds - target);
  const at = `Em dừng ở khoảng ${durationText(seconds)}.`;
  if (gap === 0) return `${at} Giỏi quá, đúng ${durationText(target)}!`;
  const side = seconds > target ? 'chậm' : 'sớm';
  const close = gap <= 2 ? ' Rất gần rồi!' : ' Em thử đếm nhẩm "một giây, hai giây..." nhé.';
  return `${at} Em dừng ${side} hơn ${gap} giây.${close}`;
}
