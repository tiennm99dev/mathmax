/**
 * The picture chart lesson: charts to build row by row and a round of
 * questions that read a finished chart.
 */
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { int, rng, shuffle } from '#lib/core/drill.js';
import { extremes } from '../_shared/survey.js';
import { THEMES } from '../_shared/themes.js';

export const MAX_PICTURES = 8;

/**
 * @typedef {object} ChartRow
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} label
 * @property {number} count
 * @property {{ picture: import('#lib/core/kid/pictures/index.js').PictureName }} symbol
 */

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<{ rows: ChartRow[] }>} ChartQuestion
 */

/**
 * Three rows with different counts from 2 to `MAX_PICTURES`.
 * @param {() => number} rand
 * @param {number} seed
 * @returns {ChartRow[]}
 */
function chartRows(rand, seed) {
  const theme = THEMES[seed % THEMES.length];
  const counts = shuffle(rand, [2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
  return theme.map((picture, i) => ({
    picture,
    label: capitalize(pictures[picture]),
    count: counts[i],
    symbol: { picture },
  }));
}

/**
 * The chart a child builds: a fixed first task so the prerendered page and the
 * browser agree, then seeded tasks.
 * @param {number} seed
 */
export function makeTask(seed) {
  return chartRows(rng(seed), seed);
}

/**
 * What the chart so far says about its rows.
 * @param {readonly ChartRow[]} rows
 * @param {readonly number[]} placed
 */
export function buildMessage(rows, placed) {
  const over = rows.findIndex((r, i) => placed[i] > r.count);
  if (over >= 0) return `Hàng ${rows[over].label.toLowerCase()} thừa hình rồi. Em bớt đi nhé.`;
  const short = rows.findIndex((r, i) => placed[i] < r.count);
  if (short >= 0) return `Hàng ${rows[short].label.toLowerCase()} còn thiếu hình. Em thêm vào nhé.`;
  return 'Biểu đồ tranh đã xong! Nhìn vào các hàng, em biết ngay loại nào nhiều, loại nào ít.';
}

/**
 * One round of questions; every question has its own chart.
 * @param {number} seed
 * @returns {ChartQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed + 500);
  const kinds = ['read', 'most', 'least', 'more', 'read', 'total'];
  return kinds.map((kind, i) => {
    const rows = chartRows(rand, seed + i);
    const visual = { rows };
    const names = rows.map((r) => r.label);
    const { most, least, max, min } = extremes(rows);
    if (kind === 'read') {
      const row = rows[int(rand, 0, 2)];
      return {
        kind,
        visual,
        prompt: `Hàng ${row.label.toLowerCase()} có mấy hình?`,
        ...numberOptions(rand, row.count, 1, 10),
        hint: 'Mỗi hình là một đồ vật. Em đếm từng hình trong hàng.',
        solution: `Có ${row.count} ${row.label.toLowerCase()}.`,
      };
    }
    if (kind === 'most') {
      return {
        kind,
        visual,
        prompt: 'Loại nào nhiều nhất?',
        ...mixOptions(
          rand,
          most[0],
          names.filter((n) => n !== most[0]),
        ),
        hint: 'Hàng nào có nhiều hình nhất?',
        solution: `${most[0]} nhiều nhất: ${max}.`,
      };
    }
    if (kind === 'least') {
      return {
        kind,
        visual,
        prompt: 'Loại nào ít nhất?',
        ...mixOptions(
          rand,
          least[0],
          names.filter((n) => n !== least[0]),
        ),
        hint: 'Hàng nào có ít hình nhất?',
        solution: `${least[0]} ít nhất: ${min}.`,
      };
    }
    if (kind === 'more') {
      const diff = max - min;
      return {
        kind,
        visual,
        prompt: `${most[0]} nhiều hơn ${least[0].toLowerCase()} mấy?`,
        ...numberOptions(rand, diff, 0, 10),
        hint: 'Em đếm số hình ở mỗi hàng, rồi lấy số lớn trừ số bé.',
        solution: `${max} − ${min} = ${diff}.`,
      };
    }
    const total = rows.reduce((sum, r) => sum + r.count, 0);
    return {
      kind,
      visual,
      prompt: 'Cả ba hàng có tất cả mấy hình?',
      ...numberOptions(rand, total, 1, 30),
      hint: 'Em đếm từng hàng, rồi cộng ba số lại.',
      solution: `${rows.map((r) => r.count).join(' + ')} = ${total}.`,
    };
  });
}

export const KIND_LABELS = {
  read: 'đọc số hình của một hàng',
  most: 'tìm loại nhiều nhất',
  least: 'tìm loại ít nhất',
  more: 'so sánh hai hàng',
  total: 'tính tổng số hình',
};
