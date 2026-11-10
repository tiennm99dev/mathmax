/**
 * The class survey sheet: each answer adds one to its choice, or the child
 * types a count straight in, and the data table and the summary come from
 * the counts.
 */
import { extremes, totalOf } from '../_shared/data.js';

export const MAX_COUNT = 50;

/**
 * @typedef {object} SurveyChoice
 * @property {string} label
 * @property {import('../_shared/data.js').DataSymbol} symbol
 */

/**
 * @typedef {object} Survey
 * @property {string} id
 * @property {string} title the question asked
 * @property {string} tab short name
 * @property {string} head the header of the name row of the data table
 * @property {SurveyChoice[]} choices
 * @property {number[]} sample the counts of a sample class
 */

/** @type {readonly Survey[]} */
export const SURVEYS = [
  {
    id: 'place',
    title: 'Bạn muốn đi tham quan ở đâu?',
    tab: 'Nơi tham quan',
    head: 'Nơi tham quan',
    choices: [
      { label: 'Vườn thú', symbol: { emoji: '🦁' } },
      { label: 'Bảo tàng', symbol: { emoji: '🏛️' } },
      { label: 'Công viên nước', symbol: { emoji: '🌊' } },
    ],
    sample: [12, 7, 15],
  },
  {
    id: 'food',
    title: 'Bạn thích ăn sáng món gì nhất?',
    tab: 'Món ăn sáng',
    head: 'Món ăn',
    choices: [
      { label: 'Phở', symbol: { emoji: '🍜' } },
      { label: 'Bánh mì', symbol: { emoji: '🥖' } },
      { label: 'Xôi', symbol: { emoji: '🍙' } },
      { label: 'Cháo', symbol: { emoji: '🥣' } },
    ],
    sample: [11, 9, 8, 5],
  },
  {
    id: 'color',
    title: 'Bạn thích mặc áo màu gì nhất?',
    tab: 'Màu áo',
    head: 'Màu áo',
    choices: [
      { label: 'Đỏ', symbol: { color: '#dc2626' } },
      { label: 'Vàng', symbol: { color: '#facc15' } },
      { label: 'Xanh', symbol: { color: '#2563eb' } },
      { label: 'Trắng', symbol: { color: '#ffffff' } },
    ],
    sample: [9, 6, 10, 7],
  },
  {
    id: 'pet',
    title: 'Nhà bạn nuôi con vật nào?',
    tab: 'Vật nuôi',
    head: 'Vật nuôi',
    choices: [
      { label: 'Chó', symbol: { emoji: '🐶' } },
      { label: 'Mèo', symbol: { emoji: '🐱' } },
      { label: 'Gà', symbol: { emoji: '🐔' } },
      { label: 'Cá', symbol: { emoji: '🐟' } },
    ],
    sample: [13, 8, 6, 4],
  },
];

/**
 * A count the child typed, as a whole number from 0 to `MAX_COUNT`; anything
 * that is not a number counts as 0.
 * @param {number | string} value
 * @returns {number}
 */
export function cleanCount(value) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(MAX_COUNT, n));
}

/**
 * The counts with one choice changed.
 * @param {readonly number[]} counts
 * @param {number} i
 * @param {number | string} value
 * @returns {number[]}
 */
export function setCount(counts, i, value) {
  return counts.map((c, j) => (j === i ? cleanCount(value) : c));
}

/**
 * What the data table says so far.
 * @param {ReadonlyArray<{ label: string, count: number }>} rows
 */
export function surveySummary(rows) {
  const total = totalOf(rows);
  if (total === 0)
    return 'Chưa có câu trả lời nào. Mỗi bạn trả lời, em bấm + ở lựa chọn của bạn đó.';
  const { most, least, max, min } = extremes(rows);
  const head = `Đã ghi ${total} câu trả lời.`;
  if (max === min) return `${head} Các lựa chọn bằng nhau, mỗi lựa chọn ${max} bạn.`;
  const join = (/** @type {string[]} */ names) => names.join(' và ');
  const gap =
    most.length === 1 && least.length === 1
      ? ` Số bạn chọn ${most[0]} nhiều hơn số bạn chọn ${least[0]} là ${max - min} bạn.`
      : '';
  return `${head} Nhiều nhất: ${join(most)} (${max} bạn). Ít nhất: ${join(least)} (${min} bạn).${gap}`;
}
