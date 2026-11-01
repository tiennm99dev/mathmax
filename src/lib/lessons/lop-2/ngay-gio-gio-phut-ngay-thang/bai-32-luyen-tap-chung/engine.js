/**
 * The mixed practice round of "Luyện tập chung" for the chapter on days, hours
 * and months: reading clocks, the two names of a time, hours and minutes, the
 * weekday of a date, last and next week on a sheet, the days of a month and
 * word problems. Questions are built from a seed, so the first round is the
 * same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { toMinutes } from '#lib/units-engine/clock.js';
import {
  MONTH_DAYS,
  WEEKDAYS,
  dayClockText,
  dialNumber,
  dialText,
  handsText,
  partText,
  upperFirst,
  weekdayOf,
} from '../_shared/time.js';

/** @typedef {{ clock?: number, month?: number, marks?: number[] }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/** @typedef {'doc-gio' | 'doi-gio' | 'gio-phut' | 'thu-ngay' | 'tuan' | 'so-ngay' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-gio': 'Xem đồng hồ',
  'doi-gio': 'Hai cách gọi giờ',
  'gio-phut': 'Ngày, giờ và phút',
  'thu-ngay': 'Tìm thứ trên tờ lịch',
  tuan: 'Tuần trước, tuần sau',
  'so-ngay': 'Số ngày trong tháng',
  'bai-toan': 'Giải bài toán',
});

/**
 * Reading a clock whose minute hand points at 12, 3 or 6.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function clockQuestion(rand) {
  const hour = int(rand, 1, 12);
  const minute = pick(rand, [0, 15, 30]);
  const time = toMinutes(hour, minute);
  const other = pick(
    rand,
    [0, 15, 30].filter((m) => m !== minute),
  );
  const next = dialNumber(hour + 1);
  return {
    prompt: 'Đồng hồ chỉ mấy giờ?',
    visual: { clock: time },
    ...mixOptions(rand, dialText(time), [
      dialText(toMinutes(next, minute)),
      dialText(toMinutes(hour, other)),
    ]),
    hint: 'Kim dài chỉ số 12 là đúng giờ, số 3 là 15 phút, số 6 là 30 phút.',
    solution: `Đồng hồ có ${handsText(time)}: ${dialText(time)}.`,
  };
}

/**
 * Turning a time counted through the day into its name with a part of the
 * day, or back.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function nameQuestion(rand) {
  const hour = int(rand, 13, 23);
  const time = toMinutes(hour, 0);
  const dial = dialNumber(hour);
  const day = dayClockText(time);
  const named = partText(time);
  const reverse = rand() < 0.5;
  if (reverse) {
    return {
      prompt: `${upperFirst(named)} còn gọi là mấy giờ?`,
      ...mixOptions(rand, day, [`${hour - 2} giờ`, `${hour + 1} giờ`, `${hour - 1} giờ`]),
      hint: 'Lấy số giờ cộng thêm 12.',
      solution: `${dial} + 12 = ${hour}. ${upperFirst(named)} còn gọi là ${day}.`,
    };
  }
  const part = named.split(' ').at(-1);
  const others = ['sáng', 'chiều', 'tối', 'đêm'].filter((w) => w !== part);
  return {
    prompt: `${day} còn gọi là mấy giờ?`,
    ...mixOptions(rand, named, [
      `${dial} giờ ${pick(rand, others)}`,
      `${dialNumber(dial + 1)} giờ ${part}`,
      `${dialNumber(dial + 2)} giờ ${part}`,
    ]),
    hint: 'Lấy số giờ trừ đi 12, rồi nghĩ xem đó là buổi nào.',
    solution: `${hour} − 12 = ${dial}. ${day} còn gọi là ${named}.`,
  };
}

/**
 * The lengths the lesson teaches: 24 hours a day, 60 minutes an hour, and the
 * minutes the long hand walks from 12 to 3 or 6.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function lengthQuestion(rand) {
  const hour = int(rand, 6, 10);
  const variant = int(rand, 0, 3);
  if (variant === 0) {
    return {
      prompt: 'Một ngày có bao nhiêu giờ?',
      options: ['12 giờ', '24 giờ', '60 giờ'],
      answer: 1,
      hint: 'Kim ngắn đi hai vòng mới hết một ngày.',
      solution: 'Một ngày có 24 giờ.',
    };
  }
  const minutes = [60, 15, 30][variant - 1];
  const end = variant === 1 ? `${hour + 1} giờ` : `${hour} giờ ${minutes} phút`;
  return {
    prompt: `Từ ${hour} giờ đến ${end} là bao nhiêu phút?`,
    options: ['15 phút', '30 phút', '60 phút'],
    answer: [15, 30, 60].indexOf(minutes),
    hint: 'Một giờ có 60 phút. Kim dài chỉ số 3 là 15 phút, số 6 là 30 phút.',
    solution:
      variant === 1
        ? 'Kim dài đi hết một vòng: 1 giờ = 60 phút.'
        : `Kim dài đi từ số 12 đến số ${minutes / 5}: ${minutes} phút.`,
  };
}

/**
 * Weekday options around the right day: its neighbours are the real mistakes.
 * @param {() => number} rand
 * @param {number} day
 */
function weekdayOptions(rand, day) {
  return mixOptions(
    rand,
    upperFirst(WEEKDAYS[day]),
    [(day + 1) % 7, (day + 6) % 7, (day + 3) % 7].map((d) => upperFirst(WEEKDAYS[d])),
  );
}

/**
 * The weekday of a date on a sheet.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function weekdayQuestion(rand) {
  const month = int(rand, 1, 12);
  const date = int(rand, 1, MONTH_DAYS[month - 1]);
  const day = weekdayOf(month, date);
  return {
    prompt: `Xem tờ lịch. Ngày ${date} tháng ${month} là thứ mấy?`,
    visual: { month, marks: [date] },
    ...weekdayOptions(rand, day),
    hint: 'Tìm ô màu vàng, rồi nhìn thẳng lên đầu cột.',
    solution: `Ngày ${date} tháng ${month} là ${WEEKDAYS[day]}.`,
  };
}

/**
 * The same weekday one week earlier or later.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function weekQuestion(rand) {
  const month = int(rand, 1, 12);
  const date = int(rand, 8, 21);
  const later = rand() < 0.5;
  const right = later ? date + 7 : date - 7;
  const name = WEEKDAYS[weekdayOf(month, date)];
  const { options, answer } = numberOptions(rand, right, 1, MONTH_DAYS[month - 1]);
  return {
    prompt: `${upperFirst(name)} tuần này là ngày ${date} tháng ${month}. ${upperFirst(name)} tuần ${later ? 'sau' : 'trước'} là ngày mấy?`,
    visual: { month, marks: [date] },
    options,
    answer,
    hint: later
      ? 'Tuần sau thêm 7 ngày, ngay dưới ô màu vàng.'
      : 'Tuần trước bớt 7 ngày, ngay trên ô màu vàng.',
    solution: later ? `${date} + 7 = ${right}.` : `${date} − 7 = ${right}.`,
  };
}

/**
 * How many days a month has, read off its sheet.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function monthQuestion(rand) {
  const month = int(rand, 1, 12);
  const days = MONTH_DAYS[month - 1];
  const values = [28, 30, 31];
  return {
    prompt: `Xem tờ lịch. Tháng ${month} này có bao nhiêu ngày?`,
    visual: { month },
    options: values.map((d) => `${d} ngày`),
    answer: values.indexOf(days),
    hint: 'Số cuối cùng trên tờ lịch là số mấy?',
    solution: `Số cuối cùng trên tờ lịch là ${days}. Tháng ${month} này có ${days} ngày.`,
  };
}

/** Names of the children in the word problems. */
const NAMES = /** @type {const} */ (['An', 'Bình', 'Mai']);

/**
 * Who comes too late for a place that opens from morning to afternoon.
 * @param {() => number} rand
 * @returns {Asked}
 */
function openingProblem(rand) {
  const closes = int(rand, 15, 17);
  const closeTime = toMinutes(closes, 30);
  const late = toMinutes(closes + 1, 30);
  const early = toMinutes(int(rand, 9, 11), 15);
  const mid = toMinutes(int(rand, 13, 14), 30);
  const lateName = pick(rand, NAMES);
  const [p, q] = NAMES.filter((n) => n !== lateName);
  return {
    prompt: `Bảo tàng mở cửa từ 8 giờ đến ${dayClockText(closeTime)}. Bạn nào đến khi bảo tàng đã đóng cửa?`,
    ...mixOptions(rand, `${lateName} đến lúc ${dayClockText(late)}`, [
      `${p} đến lúc ${dayClockText(early)}`,
      `${q} đến lúc ${dayClockText(mid)}`,
    ]),
    hint: 'Bạn đến sau giờ đóng cửa thì không vào được.',
    solution: `${dayClockText(late)} là sau ${dayClockText(closeTime)}. ${lateName} đến khi bảo tàng đã đóng cửa.`,
  };
}

/**
 * The classes before a given time.
 * @param {() => number} rand
 * @returns {Asked}
 */
function classProblem(rand) {
  const shift = int(rand, 0, 1);
  const hat = toMinutes(7 + shift, 15);
  const ve = toMinutes(8 + shift, 30);
  const vo = toMinutes(10 + shift, 30);
  const bong = toMinutes(9 + shift, 15);
  return {
    prompt: `Nam học Hát lúc ${dialText(hat)}, Vẽ lúc ${dialText(ve)}, Võ lúc ${dialText(vo)}. Trước ${dialText(bong)}, Nam đã học những môn nào?`,
    ...mixOptions(rand, 'Hát và Vẽ', ['Hát và Võ', 'Vẽ và Võ', 'Chỉ có Võ']),
    hint: 'So sánh giờ của từng môn với giờ được hỏi.',
    solution: `${dialText(hat)} và ${dialText(ve)} là trước ${dialText(bong)}. ${dialText(vo)} là sau. Nam đã học Hát và Vẽ.`,
  };
}

/**
 * Three trips on dates of one month: the first or the last.
 * @param {() => number} rand
 * @returns {Asked}
 */
function tripProblem(rand) {
  const places = shuffle(rand, ['Huế', 'Đà Nẵng', 'Hạ Long']);
  const dates = [int(rand, 3, 9), int(rand, 12, 18), int(rand, 21, 28)];
  const trips = shuffle(
    rand,
    places.map((place, i) => ({ place, date: dates[i] })),
  );
  const first = rand() < 0.5;
  const right = [...trips].sort((a, b) => (first ? a.date - b.date : b.date - a.date))[0];
  return {
    prompt: `Nhà Nam đi ${trips.map((t) => `${t.place} ngày ${t.date}`).join(', ')} tháng 8. Nam đến nơi nào ${first ? 'đầu tiên' : 'cuối cùng'}?`,
    ...mixOptions(
      rand,
      right.place,
      places.filter((x) => x !== right.place),
    ),
    hint: first ? 'Tìm ngày có số nhỏ nhất.' : 'Tìm ngày có số lớn nhất.',
    solution: `Ngày ${right.date} ${first ? 'sớm nhất' : 'muộn nhất'}, nên đó là ${right.place}.`,
  };
}

/**
 * A word problem of the book's three shapes.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function wordProblem(rand) {
  return pick(rand, [openingProblem, classProblem, tripProblem])(rand);
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  'doc-gio': clockQuestion,
  'doi-gio': nameQuestion,
  'gio-phut': lengthQuestion,
  'thu-ngay': weekdayQuestion,
  tuan: weekQuestion,
  'so-ngay': monthQuestion,
  'bai-toan': wordProblem,
};

/** Question kinds in the order of the lessons. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/**
 * A round in mixed order: two questions of each kind except the sheet reading
 * of a month's days, asked once.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = KINDS.flatMap((k) => (k === 'so-ngay' ? [k] : [k, k]));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
