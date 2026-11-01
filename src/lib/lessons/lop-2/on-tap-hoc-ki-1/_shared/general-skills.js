/**
 * Review questions of the whole term that the other parts of this chapter do
 * not ask: a number on a number line, the weekday of a date, reading a clock
 * and the two names of an hour, plus word problems mixing numbers with kg and
 * l. Pure and DOM-free; each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { fromMinutes, toMinutes } from '#lib/units-engine/clock.js';
import { chainSkill, columnSkill, nearOptions, numberStory } from './arith-skills.js';
import { readScaleSkill, countLitresSkill, measureStory } from './measure-skills.js';
import { countShapesSkill, polylineSkill } from './shape-skills.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */

/** @type {ReviewSkill} */
export const numberLineSkill = {
  id: 'tia-so',
  label: 'Số trên tia số',
  make(rand) {
    const step = pick(rand, [1, 1, 10]);
    const count = 6;
    const place = int(rand, 2, count - 1);
    const min = step === 1 ? int(rand, 10, 90) : 10 * int(rand, 0, 4);
    const right = min + place * step;
    return {
      prompt: 'Số nào thay cho dấu hỏi trên tia số?',
      visual: { type: 'number-line', min, step, count, blank: place },
      ...(step === 1
        ? numberOptions(rand, right, 0, 100)
        : nearOptions(rand, right, [right - 10, right + 10, right + 1])),
      hint: `Hai vạch liền nhau hơn kém nhau ${step}. Em đếm tiếp từ vạch ngay trước dấu hỏi.`,
      solution: `Số ngay trước dấu hỏi là ${right - step}. ${right - step} + ${step} = ${right}.`,
    };
  },
};

/** The days of one week, thứ Hai first. */
export const WEEKDAYS = /** @type {const} */ ([
  'thứ Hai',
  'thứ Ba',
  'thứ Tư',
  'thứ Năm',
  'thứ Sáu',
  'thứ Bảy',
  'Chủ nhật',
]);

/** Months with at least 30 days, so a date up to 30 is always in the month. */
const LONG_MONTHS = /** @type {const} */ ([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

/** @param {string} text */
const upper = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/** @type {ReviewSkill} */
export const weekdaySkill = {
  id: 'thu-ngay',
  label: 'Thứ của một ngày',
  make(rand) {
    const month = pick(rand, LONG_MONTHS);
    const date = int(rand, 1, 24);
    const ahead = int(rand, 1, 6);
    const day = int(rand, 0, 6);
    const right = WEEKDAYS[(day + ahead) % 7];
    const steps = Array.from(
      { length: ahead + 1 },
      (_, i) => `ngày ${date + i} là ${WEEKDAYS[(day + i) % 7]}`,
    );
    return {
      prompt: `Ngày ${date} tháng ${month} là ${WEEKDAYS[day]}. Ngày ${date + ahead} tháng ${month} là thứ mấy?`,
      ...mixOptions(
        rand,
        upper(right),
        [1, 2, 6].map((d) => upper(WEEKDAYS[(day + ahead + d) % 7])),
      ),
      hint: 'Em đếm tiếp từng ngày, mỗi ngày là một thứ tiếp theo.',
      solution: `${upper(steps.join(', '))}.`,
    };
  },
};

/**
 * The time on the dial, without the part of the day: "3 giờ 30 phút".
 * @param {number} hour
 * @param {number} minute
 */
export function clockText(hour, minute) {
  return minute === 0 ? `${hour} giờ` : `${hour} giờ ${minute} phút`;
}

/**
 * The part of the day of an hour from 13 to 23, by the book's table.
 * @param {number} hour
 */
export function afternoonPart(hour) {
  if (hour <= 18) return 'chiều';
  return hour <= 21 ? 'tối' : 'đêm';
}

/**
 * Where the two hands of a clock point: what a screen reader says for the
 * picture, so it never gives the time away.
 * @param {number} total minutes since 0:00
 */
export function handsText(total) {
  const { hours, minutes } = fromMinutes(total);
  const dial = hours % 12 || 12;
  const next = (hours + 1) % 12 || 12;
  const hourHand =
    minutes === 0 ? `kim ngắn chỉ số ${dial}` : `kim ngắn ở giữa số ${dial} và số ${next}`;
  return `${hourHand}, kim dài chỉ số ${minutes / 5 || 12}`;
}

/** The minutes the book reads off a dial: long hand at 12, 3 or 6. */
const DIAL_MINUTES = /** @type {const} */ ([0, 15, 30]);

/** @type {ReviewSkill} */
export const clockSkill = {
  id: 'dong-ho',
  label: 'Xem đồng hồ, hai cách gọi giờ',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const hour = int(rand, 1, 12);
      const minute = pick(rand, DIAL_MINUTES);
      const other = pick(
        rand,
        DIAL_MINUTES.filter((m) => m !== minute),
      );
      return {
        prompt: 'Đồng hồ chỉ mấy giờ?',
        visual: { type: 'clock', minutes: toMinutes(hour, minute) },
        ...mixOptions(rand, clockText(hour, minute), [
          clockText(hour % 12 || 12, other),
          clockText((hour % 12) + 1, minute),
        ]),
        hint: 'Kim dài chỉ số 12 là đúng giờ, số 3 là 15 phút, số 6 là 30 phút. Kim ngắn cho biết số giờ.',
        solution: `Đồng hồ có ${handsText(toMinutes(hour, minute))}: ${clockText(hour, minute)}.`,
      };
    }
    if (variant === 1) {
      const dial = int(rand, 1, 6);
      const minute = pick(rand, DIAL_MINUTES);
      const hour = dial + 12;
      return {
        prompt: 'Buổi chiều, đồng hồ chỉ như hình. Lúc đó là mấy giờ?',
        visual: { type: 'clock', minutes: toMinutes(hour, minute) },
        ...mixOptions(rand, clockText(hour, minute), [
          clockText(dial, minute),
          clockText(hour + 1, minute),
          clockText(hour - 1, minute),
        ]),
        hint: 'Em đọc giờ trên đồng hồ, rồi cộng thêm 12 vào số giờ.',
        solution: `Đồng hồ chỉ ${clockText(dial, minute)} chiều. ${dial} + 12 = ${hour}, nên lúc đó là ${clockText(hour, minute)}.`,
      };
    }
    const hour = int(rand, 13, 23);
    const dial = hour - 12;
    const part = afternoonPart(hour);
    const wrongPart = pick(
      rand,
      ['sáng', 'chiều', 'tối', 'đêm'].filter((w) => w !== part),
    );
    return {
      prompt: `${hour} giờ còn gọi là mấy giờ?`,
      ...mixOptions(rand, `${dial} giờ ${part}`, [
        `${dial} giờ ${wrongPart}`,
        `${dial === 11 ? 9 : dial + 1} giờ ${part}`,
        `${dial === 1 ? 3 : dial - 1} giờ ${part}`,
      ]),
      hint: 'Em lấy số giờ trừ đi 12, rồi nghĩ xem đó là buổi nào.',
      solution: `${hour} − 12 = ${dial}. ${hour} giờ còn gọi là ${dial} giờ ${part}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const mixedStorySkill = {
  id: 'bai-toan-chung',
  label: 'Giải bài toán',
  make: (rand) => (rand() < 0.6 ? numberStory(rand) : measureStory(rand)),
};

/** The parts of the review of the whole term. */
export const GENERAL_SKILLS = [
  numberLineSkill,
  weekdaySkill,
  clockSkill,
  columnSkill,
  chainSkill,
  polylineSkill,
  countShapesSkill,
  readScaleSkill,
  countLitresSkill,
  mixedStorySkill,
];
