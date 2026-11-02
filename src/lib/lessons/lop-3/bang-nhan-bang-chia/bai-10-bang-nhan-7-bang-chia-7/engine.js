/**
 * The table of 7 on a calendar: a week is 7 days, so counting by weeks lands on
 * the table's products in the Sunday column, and ringing whole weeks out of a
 * number of days is the division table. Pure and DOM-free.
 */
import { divLine, mulLine, repeatedSum } from '../_shared/times.js';
import { buildTableRound, tableKindLabels } from '../_shared/table-round.js';

/** The table of this lesson. */
export const BASE = 7;

/** The most weeks the calendar holds, the last row of the table. */
export const MAX_WEEKS = 10;

/** The heads of the calendar's columns. */
export const WEEK_DAYS = /** @type {const} */ (['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']);

/**
 * The calendar's day numbers, week by week: week 2 holds 8, 9, ... 14. Each
 * week's last day is the product of that row of the table.
 * @param {number} weeks
 */
export function calendarRows(weeks) {
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: BASE }, (_, d) => w * BASE + d + 1),
  );
}

/**
 * What the calendar says with `weeks` weeks.
 * @param {number} weeks 1-10
 */
export function mulMessage(weeks) {
  const sum = weeks > 1 ? `${repeatedSum(BASE, weeks)} = ${BASE * weeks}. ` : '';
  if (weeks === MAX_WEEKS) {
    return `Đủ 10 tuần! ${sum}Đọc cột Chủ nhật: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.`;
  }
  return `${weeks} tuần có ${BASE * weeks} ngày. ${sum}${mulLine(BASE, weeks)}.`;
}

/**
 * What the calendar says after ringing `ringed` weeks out of row `n` of the
 * division table.
 * @param {number} n
 * @param {number} ringed
 */
export function divMessage(n, ringed) {
  const total = BASE * n;
  if (ringed === 0) return `Có ${total} ngày. ${total} ngày là mấy tuần?`;
  if (ringed >= n) {
    return `Hết ngày rồi! ${total} ngày là ${n} tuần. Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}.`;
  }
  return `Đã khoanh ${ringed} tuần, còn ${total - BASE * ringed} ngày.`;
}

/** @type {readonly import('../_shared/table-round.js').Story[]} */
const STORIES = [
  (n) => ({
    prompt: `Một tuần có 7 ngày. ${n} tuần có bao nhiêu ngày?`,
    unit: 'ngày',
    divide: false,
  }),
  (n) => ({
    prompt: `Mỗi đội kéo co có 7 bạn. ${n} đội có bao nhiêu bạn?`,
    unit: 'bạn',
    divide: false,
  }),
  (n) => ({
    prompt: `Xếp đều ${BASE * n} cái cốc vào 7 hộp. Mỗi hộp có mấy cái cốc?`,
    unit: 'cái cốc',
    divide: true,
  }),
  (n) => ({
    prompt: `Một tuần có 7 ngày. ${BASE * n} ngày là mấy tuần?`,
    unit: 'tuần',
    divide: true,
  }),
];

const ASK = {
  label: 'Đọc lịch',
  prompt: 'Mỗi hàng của tờ lịch là 1 tuần. Tờ lịch có tất cả bao nhiêu ngày?',
  hint: 'Em đếm số tuần, rồi đếm thêm 7 theo từng tuần.',
  solution: (/** @type {number} */ n) => `${n} tuần, mỗi tuần 7 ngày: ${mulLine(BASE, n)}.`,
};

/** What each part of the round practises. */
export const KIND_LABELS = tableKindLabels(BASE, ASK.label);

/**
 * A round of eight questions, each on a different row of the table.
 * @param {number} seed
 */
export const buildRound = (seed) => buildTableRound(seed, BASE, STORIES, ASK);
