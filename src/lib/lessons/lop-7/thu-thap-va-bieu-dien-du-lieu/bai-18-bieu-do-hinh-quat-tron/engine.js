/**
 * Pure logic for the pie-chart widget: 40 students of class 7A split by how
 * they get to school. Every student is 2,5% of the class and 9° of the
 * circle, so percentages and central angles stay exact while the learner
 * drags the slice boundaries.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** Students in the class. */
export const TOTAL = 40;

/** The categories, with the starting counts (they add up to `TOTAL`). */
export const START = [
  { label: 'Đi bộ', value: 10 },
  { label: 'Xe đạp', value: 14 },
  { label: 'Xe buýt', value: 6 },
  { label: 'Bố mẹ đưa đón', value: 10 },
];

/**
 * Percentage and central angle of each slice. Values are rounded to whole
 * students, since the chart may hand back values such as 9.999999999.
 * @param {ReadonlyArray<{ label: string, value: number }>} data
 * @returns {Array<{ label: string, count: number, percent: number, angle: number }>}
 */
export function rows(data) {
  const total = data.reduce((s, d) => s + Math.round(d.value), 0);
  return data.map((d) => {
    const count = Math.round(d.value);
    const percent = total === 0 ? 0 : (count * 100) / total;
    return { label: d.label, count, percent, angle: (percent * 360) / 100 };
  });
}

/**
 * @typedef {object} Challenge
 * @property {string} id
 * @property {string} text what to build, in plain text
 * @property {number[]} counts the counts that solve it, in `START` order
 * @property {'percent' | 'count' | 'angle'} unit the quantity the task is
 *   given in, so feedback talks in that quantity and leaves the conversion to
 *   the learner
 */

/** @type {Challenge[]} */
export const CHALLENGES = [
  {
    id: 'phan-tram',
    text: 'Kéo để biểu đồ thể hiện: Đi bộ 25%, Xe đạp 40%, Xe buýt 15%, Bố mẹ đưa đón 20%.',
    counts: [10, 16, 6, 8],
    unit: 'percent',
  },
  {
    id: 'so-ban',
    text: 'Lớp 7A có 40 bạn: 8 bạn đi bộ, 20 bạn đi xe đạp, 4 bạn đi xe buýt, còn lại bố mẹ đưa đón. Kéo cho đúng.',
    counts: [8, 20, 4, 8],
    unit: 'count',
  },
  {
    id: 'goc',
    text: 'Kéo sao cho góc ở tâm của các hình quạt là: Đi bộ 90°, Xe đạp 180°, Xe buýt 36°, Bố mẹ đưa đón 54°.',
    counts: [10, 20, 4, 6],
    unit: 'angle',
  },
];

/**
 * Whether the chart matches a challenge, and a short line about the first
 * slice that is off.
 * @param {ReadonlyArray<{ label: string, value: number }>} data
 * @param {Challenge} challenge
 * @returns {{ done: boolean, text: string }}
 */
export function check(data, challenge) {
  const r = rows(data);
  const i = r.findIndex((row, k) => row.count !== challenge.counts[k]);
  if (i === -1) return { done: true, text: 'Chính xác! Biểu đồ đã khớp với đề bài.' };
  const want = challenge.counts[i];
  const more = want > r[i].count;
  const show = {
    percent: (/** @type {number} */ n) => `${formatNumber((n * 100) / TOTAL, 1)}%`,
    count: (/** @type {number} */ n) => `${n} bạn`,
    angle: (/** @type {number} */ n) => `${formatNumber((n * 360) / TOTAL, 1)}°`,
  }[challenge.unit];
  return {
    done: false,
    text: `Hình quạt "${r[i].label}" cần ${more ? 'lớn hơn' : 'nhỏ hơn'}: hiện là ${show(r[i].count)}, cần ${show(want)}.`,
  };
}
