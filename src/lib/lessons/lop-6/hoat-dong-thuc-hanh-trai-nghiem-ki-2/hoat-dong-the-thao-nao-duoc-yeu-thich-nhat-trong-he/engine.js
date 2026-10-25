/**
 * Data handling for the summer-sports survey: answer sheets (phiếu hỏi)
 * become the three statistics tables of the book (whole school, boys and
 * girls, grades 6–7 and 8–9), and the tables tell which sport is liked most.
 */
import { pickWeighted } from '#lib/stats-engine/probability.js';

/** The sports on the survey sheet, in the order of the book's tables. */
export const SPORTS = [
  'Bóng đá',
  'Đá cầu',
  'Cầu lông',
  'Điền kinh',
  'Bóng rổ',
  'Bóng chuyền',
  'Thể dục nhịp điệu',
  'Môn khác',
];

/** @typedef {'nam' | 'nu'} Gender */
/** @typedef {'6-7' | '8-9'} Grades */
/** @typedef {{ gender: Gender, grades: Grades, sport: number }} Sheet */

/**
 * The survey of Trường THCS Nguyễn Du in the book: 1 200 of its 1 730
 * students answered. Counts per sport, in the order of `SPORTS`.
 */
export const BOOK = {
  boys: [580, 90, 48, 32, 45, 40, 0, 37],
  girls: [90, 60, 30, 23, 15, 50, 30, 30],
  lower: [280, 85, 28, 25, 22, 20, 17, 25],
  upper: [390, 65, 50, 30, 38, 70, 13, 42],
};

/**
 * Element-wise sum of two count lists.
 * @param {number[]} a
 * @param {number[]} b
 */
export function addCounts(a, b) {
  return a.map((x, i) => x + b[i]);
}

/** @param {number[]} counts */
export function total(counts) {
  return counts.reduce((s, x) => s + x, 0);
}

/**
 * The three tables of the book from a pile of answer sheets.
 * @param {Sheet[]} sheets
 * @param {number} [n] number of categories
 */
export function tally(sheets, n = SPORTS.length) {
  const zero = () => Array.from({ length: n }, () => 0);
  const t = { all: zero(), boys: zero(), girls: zero(), lower: zero(), upper: zero() };
  for (const s of sheets) {
    t.all[s.sport] += 1;
    (s.gender === 'nam' ? t.boys : t.girls)[s.sport] += 1;
    (s.grades === '6-7' ? t.lower : t.upper)[s.sport] += 1;
  }
  return t;
}

/** The book's survey as the same five count lists `tally` returns. */
export function bookTables() {
  return {
    all: addCounts(BOOK.boys, BOOK.girls),
    boys: [...BOOK.boys],
    girls: [...BOOK.girls],
    lower: [...BOOK.lower],
    upper: [...BOOK.upper],
  };
}

/**
 * Indices of the largest count (all of them on a tie); empty when every
 * count is 0.
 * @param {number[]} counts
 */
export function topIndices(counts) {
  const max = Math.max(0, ...counts);
  if (max === 0) return [];
  return counts.flatMap((c, i) => (c === max ? [i] : []));
}

/**
 * Indices sorted from the most chosen to the least, ties kept in table order.
 * @param {number[]} counts
 */
export function ranking(counts) {
  return counts
    .map((c, i) => ({ c, i }))
    .sort((p, q) => q.c - p.c || p.i - q.i)
    .map((x) => x.i);
}

/**
 * One sentence naming the favourite sport of a group.
 * @param {number[]} counts
 * @param {string} who e.g. 'cả trường', 'học sinh nam'
 * @param {(v: number) => string} pct formats a percentage
 */
export function favouriteText(counts, who, pct) {
  const top = topIndices(counts);
  if (top.length === 0) return `Chưa có phiếu nào của ${who}.`;
  const n = counts[top[0]];
  const share = pct((n / total(counts)) * 100);
  const names = top.map((i) => SPORTS[i]).join(', ');
  return top.length === 1
    ? `${who[0].toUpperCase()}${who.slice(1)}: ${names} được chọn nhiều nhất (${n} phiếu, ${share}%).`
    : `${who[0].toUpperCase()}${who.slice(1)}: ${names} cùng được chọn nhiều nhất (mỗi môn ${n} phiếu, ${share}%).`;
}

/**
 * A made-up answer sheet drawn with the book's proportions, so random
 * sheets look like a real school: gender first, then grade group, then the
 * sport from that gender's counts.
 * @param {() => number} rand uniform in [0, 1)
 * @returns {Sheet}
 */
export function randomSheet(rand) {
  const boys = total(BOOK.boys);
  const girls = total(BOOK.girls);
  const gender = pickWeighted([boys, girls], rand()) === 0 ? 'nam' : 'nu';
  const lower = total(BOOK.lower);
  const upper = total(BOOK.upper);
  const grades = pickWeighted([lower, upper], rand()) === 0 ? '6-7' : '8-9';
  const sport = pickWeighted(gender === 'nam' ? BOOK.boys : BOOK.girls, rand());
  return { gender, grades, sport };
}
