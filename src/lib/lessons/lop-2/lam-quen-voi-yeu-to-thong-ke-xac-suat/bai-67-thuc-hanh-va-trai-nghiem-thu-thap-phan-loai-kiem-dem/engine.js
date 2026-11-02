/**
 * The class survey board: each tap records one vote, and the tally, the
 * picture chart and the summary all come from the list of votes.
 */
import { extremes } from '../_shared/survey.js';

export const MAX_VOTES = 40;

/**
 * @typedef {object} SurveyChoice
 * @property {string} label
 * @property {import('../_shared/survey.js').ChartSymbol} symbol
 */

/**
 * @typedef {object} Survey
 * @property {string} id
 * @property {string} title what the survey asks
 * @property {string} tab short name
 * @property {SurveyChoice[]} choices
 * @property {number[]} sample votes per choice of a sample group
 */

/** @type {readonly Survey[]} */
export const SURVEYS = [
  {
    id: 'weather',
    title: 'Bạn thích thời tiết nào?',
    tab: 'Thời tiết',
    choices: [
      { label: 'Trời nắng', symbol: { emoji: '☀️' } },
      { label: 'Trời mưa', symbol: { emoji: '🌧️' } },
      { label: 'Trời nhiều mây', symbol: { emoji: '☁️' } },
    ],
    sample: [3, 2, 2],
  },
  {
    id: 'color',
    title: 'Bạn thích màu nào?',
    tab: 'Màu sắc',
    choices: [
      { label: 'Màu đỏ', symbol: { color: '#dc2626' } },
      { label: 'Màu vàng', symbol: { color: '#facc15' } },
      { label: 'Màu xanh', symbol: { color: '#2563eb' } },
    ],
    sample: [2, 4, 1],
  },
  {
    id: 'class',
    title: 'Bạn là bạn nam hay bạn nữ?',
    tab: 'Bạn nam, bạn nữ',
    choices: [
      { label: 'Bạn nam', symbol: { emoji: '👦' } },
      { label: 'Bạn nữ', symbol: { emoji: '👧' } },
    ],
    sample: [3, 4],
  },
];

/**
 * Votes per choice.
 * @param {readonly number[]} votes the choice index of each vote
 * @param {number} size how many choices
 * @returns {number[]}
 */
export function countVotes(votes, size) {
  const counts = Array.from({ length: size }, () => 0);
  for (const v of votes) counts[v] += 1;
  return counts;
}

/**
 * The votes of the sample group, in order.
 * @param {Survey} survey
 * @returns {number[]}
 */
export function sampleVotes(survey) {
  return survey.sample.flatMap((n, i) => Array.from({ length: n }, () => i));
}

/**
 * What the results say so far.
 * @param {ReadonlyArray<{ label: string, count: number }>} rows
 */
export function surveySummary(rows) {
  const total = rows.reduce((sum, r) => sum + r.count, 0);
  if (total === 0) return 'Chưa có phiếu nào. Em chạm vào một ô để ghi phiếu đầu tiên.';
  const { most, least, max, min } = extremes(rows);
  const head = `Đã ghi ${total} phiếu.`;
  if (max === min) return `${head} Các loại bằng nhau, mỗi loại ${max} phiếu.`;
  const join = (/** @type {string[]} */ names) => names.join(' và ');
  return `${head} Nhiều nhất: ${join(most)} (${max} phiếu). Ít nhất: ${join(least)} (${min} phiếu).`;
}
