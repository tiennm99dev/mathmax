/**
 * Logic of the month calendar of "Ngày - tháng": what a tapped date says and
 * the questions answered by reading a sheet. Pure and DOM-free.
 */
import { WEEKDAYS, daysIn, upperFirst, weekdayOf } from '../_shared/time.js';

/**
 * The sentence for a date on the sheet.
 * @param {number} month
 * @param {number} date
 */
export function dateSentence(month, date) {
  return `Ngày ${date} tháng ${month} là ${WEEKDAYS[weekdayOf(month, date)]}.`;
}

/**
 * The first and last days of a month, read off its sheet.
 * @param {number} month
 */
export function monthSentence(month) {
  const last = daysIn(month);
  return `Tháng ${month} có ${last} ngày: ngày 1 là ${WEEKDAYS[weekdayOf(month, 1)]}, ngày ${last} là ${WEEKDAYS[weekdayOf(month, last)]}.`;
}

/**
 * A question on one sheet: `tap` asks for a date on the sheet, `pick` for one
 * of `options` under it.
 * @typedef {object} Mission
 * @property {number} month
 * @property {string} prompt
 * @property {'tap' | 'pick'} way
 * @property {number} answer the date to tap, or the index of the right option
 * @property {string[]} [options]
 * @property {number[]} [hidden] dates left blank on the sheet
 * @property {string} hint
 * @property {string} why
 */

/** @type {readonly Mission[]} */
export const MISSIONS = [
  {
    month: 5,
    prompt: 'Ngày 19 tháng 5 là thứ mấy?',
    way: 'pick',
    options: [...WEEKDAYS].map(upperFirst),
    answer: 3,
    hint: 'Tìm số 19, rồi nhìn thẳng lên đầu cột.',
    why: 'Số 19 ở cột T5. Ngày 19 tháng 5 là thứ Năm.',
  },
  {
    month: 3,
    prompt: 'Thứ Hai đầu tiên của tháng 3 là ngày nào? Chạm vào ngày đó.',
    way: 'tap',
    answer: 7,
    hint: 'Nhìn cột T2, tìm số đầu tiên từ trên xuống.',
    why: 'Số đầu tiên ở cột T2 là 7. Thứ Hai đầu tiên là ngày 7 tháng 3.',
  },
  {
    month: 4,
    prompt: 'Thứ Bảy tuần này là ngày 16 tháng 4. Chạm vào thứ Bảy tuần sau.',
    way: 'tap',
    answer: 23,
    hint: 'Tuần sau cùng cột, ngay dưới số 16.',
    why: 'Ngay dưới số 16 là số 23, vì 16 + 7 = 23.',
  },
  {
    month: 2,
    prompt: 'Tờ lịch tháng 2 này có bao nhiêu ngày?',
    way: 'pick',
    options: ['28 ngày', '29 ngày', '30 ngày', '31 ngày'],
    answer: 0,
    hint: 'Số cuối cùng trên tờ lịch là số mấy?',
    why: 'Số cuối cùng là 28. Tờ lịch tháng 2 này có 28 ngày.',
  },
  {
    month: 6,
    prompt: 'Ô có dấu hỏi trên tờ lịch là ngày mấy?',
    way: 'pick',
    hidden: [15],
    options: ['14', '15', '16', '22'],
    answer: 1,
    hint: 'Đếm tiếp từ số đứng ngay trước ô đó.',
    why: 'Trước ô đó là 14, sau ô đó là 16. Ô đó là ngày 15.',
  },
  {
    month: 11,
    prompt: 'Ngày Nhà giáo Việt Nam 20 tháng 11 là thứ mấy?',
    way: 'pick',
    options: [...WEEKDAYS].map(upperFirst),
    answer: 6,
    hint: 'Tìm số 20, rồi nhìn thẳng lên đầu cột.',
    why: 'Số 20 ở cột CN. Ngày 20 tháng 11 là Chủ nhật.',
  },
  {
    month: 9,
    prompt: 'Thứ Sáu tuần này là ngày 16 tháng 9. Chạm vào thứ Sáu tuần trước.',
    way: 'tap',
    answer: 9,
    hint: 'Tuần trước cùng cột, ngay trên số 16.',
    why: 'Ngay trên số 16 là số 9, vì 16 − 7 = 9.',
  },
  {
    month: 12,
    prompt: 'Chủ nhật cuối cùng của tháng 12 là ngày nào? Chạm vào ngày đó.',
    way: 'tap',
    answer: 25,
    hint: 'Nhìn cột CN, tìm số cuối cùng từ trên xuống.',
    why: 'Số cuối cùng ở cột CN là 25. Chủ nhật cuối cùng là ngày 25 tháng 12.',
  },
];

/**
 * Feedback for one answer to a mission.
 * @param {Mission} mission
 * @param {number} given the date tapped or the option chosen
 * @returns {{ ok: boolean, text: string }}
 */
export function checkMission(mission, given) {
  if (given === mission.answer) return { ok: true, text: `Đúng rồi! ${mission.why}` };
  return { ok: false, text: `Chưa đúng. ${mission.hint}` };
}
