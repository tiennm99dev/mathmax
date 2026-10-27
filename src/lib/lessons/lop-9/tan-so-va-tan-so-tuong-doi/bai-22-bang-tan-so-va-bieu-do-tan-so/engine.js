/**
 * Logic of the frequency-table widget: raw test scores become a frequency
 * table (bảng tần số) and a frequency chart, and a challenge asks for a data
 * sample whose table matches a given one.
 */

import { frequencyTable } from '#lib/stats-engine/frequency.js';

/** Scores the learner can add, as on a Vietnamese 10-point test. */
export const SCORES = [4, 5, 6, 7, 8, 9, 10];

/** Most values the sample may hold, so the chip list stays readable. */
export const MAX_VALUES = 40;

/** Maths test scores of 20 students, the sample the widget opens with. */
export const SAMPLE = [7, 8, 6, 9, 8, 7, 10, 8, 5, 7, 8, 9, 6, 8, 7, 9, 8, 10, 7, 8];

/** @typedef {{ value: number, count: number }} Row */

/**
 * The frequency table of a sample: each distinct value once, ascending, with
 * its frequency. Values that never occur are left out, as in the book.
 * @param {readonly number[]} values
 * @returns {Row[]}
 */
export function frequencyRows(values) {
  return frequencyTable(values).map((r) => ({ value: r.value, count: r.count }));
}

/**
 * The values with the greatest frequency, and that frequency.
 * @param {readonly Row[]} rows
 */
export function mostFrequent(rows) {
  const top = Math.max(0, ...rows.map((r) => r.count));
  return { count: top, values: rows.filter((r) => r.count === top).map((r) => r.value) };
}

/**
 * Values joined the Vietnamese way: '7', '7 và 8', '6, 7 và 8'.
 * @param {readonly number[]} list
 */
export function joinValues(list) {
  if (list.length <= 1) return list.map(String).join('');
  return `${list.slice(0, -1).join(', ')} và ${list[list.length - 1]}`;
}

/**
 * One sentence on the table: the sample size and the most frequent value.
 * @param {readonly number[]} values
 */
export function summaryText(values) {
  if (values.length === 0) return 'Chưa có dữ liệu. Bấm các nút điểm để thêm dữ liệu vào mẫu.';
  const rows = frequencyRows(values);
  const top = mostFrequent(rows);
  const sizes = rows.map((r) => r.count).join(' + ');
  const n = `Cỡ mẫu $n = ${sizes} = ${values.length}$.`;
  if (top.values.length === rows.length && rows.length > 1) {
    return `${n} Mọi giá trị đều có cùng tần số ${top.count}.`;
  }
  const many = top.values.length > 1;
  return `${n} Giá trị ${joinValues(top.values)} có tần số lớn nhất (${many ? 'cùng bằng ' : 'bằng '}${top.count}).`;
}

/** Target tables for the challenge: build a sample with exactly this table. */
export const TARGETS = /** @type {const} */ ([
  [
    { value: 6, count: 2 },
    { value: 7, count: 3 },
    { value: 9, count: 1 },
  ],
  [
    { value: 5, count: 1 },
    { value: 8, count: 4 },
    { value: 10, count: 2 },
  ],
  [
    { value: 4, count: 2 },
    { value: 6, count: 2 },
    { value: 7, count: 3 },
    { value: 9, count: 3 },
  ],
]);

/**
 * How far a sample is from a target table, value by value.
 * @param {readonly number[]} values
 * @param {readonly Row[]} target
 * @returns {{ done: boolean, text: string }}
 */
export function compareToTarget(values, target) {
  const have = new Map(frequencyRows(values).map((r) => [r.value, r.count]));
  const want = new Map(target.map((r) => [r.value, r.count]));
  /** @type {string[]} */
  const notes = [];
  for (const v of SCORES) {
    const h = have.get(v) ?? 0;
    const w = want.get(v) ?? 0;
    if (h < w) notes.push(`giá trị ${v} còn thiếu ${w - h}`);
    else if (h > w) notes.push(`giá trị ${v} thừa ${h - w}`);
  }
  if (notes.length === 0) {
    const n = target.reduce((s, r) => s + r.count, 0);
    return {
      done: true,
      text: `Đúng rồi! Mẫu có $n = ${n}$ dữ liệu và bảng tần số khớp với bảng đề cho. Thứ tự các dữ liệu trong mẫu không làm thay đổi bảng tần số.`,
    };
  }
  return { done: false, text: `Chưa khớp: ${notes.join('; ')}.` };
}
