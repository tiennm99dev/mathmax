/**
 * Pure logic for the line-chart widget: reads the trend of a series over
 * time (rising, falling, unchanged between consecutive moments), its highest
 * and lowest points and its largest rise and fall, in Vietnamese.
 */

import { fmt } from '#lib/core/number-format.js';

/** Years on the time axis. */
export const YEARS = ['2019', '2020', '2021', '2022', '2023', '2024'];

/** Trees planted by the school's environment club each year. */
export const START = [120, 150, 140, 180, 210, 200];

/**
 * The change between each pair of consecutive moments.
 * @param {readonly number[]} values
 * @returns {number[]}
 */
export function changes(values) {
  return values.slice(1).map((v, i) => v - values[i]);
}

/**
 * Overall trend: 'tang' when every step rises, 'giam' when every step falls,
 * 'khong-doi' when nothing changes, else 'xen-ke'.
 * @param {readonly number[]} values
 * @returns {'tang' | 'giam' | 'khong-doi' | 'xen-ke'}
 */
export function trend(values) {
  const d = changes(values);
  if (d.every((x) => x > 0)) return 'tang';
  if (d.every((x) => x < 0)) return 'giam';
  if (d.every((x) => x === 0)) return 'khong-doi';
  return 'xen-ke';
}

/**
 * Labels of every moment where the series takes the value `target`.
 * @param {readonly string[]} labels @param {readonly number[]} values @param {number} target
 */
function where(labels, values, target) {
  return labels.filter((_, i) => values[i] === target).join(', ');
}

/**
 * Sentences describing the series, for the live feedback.
 * @param {readonly string[]} labels
 * @param {readonly number[]} values
 * @param {string} unit e.g. 'cây'
 * @returns {string[]}
 */
export function describe(labels, values, unit) {
  const d = changes(values);
  const t = trend(values);
  const overall = {
    tang: `Số liệu tăng liên tục từ ${labels[0]} đến ${labels.at(-1)}.`,
    giam: `Số liệu giảm liên tục từ ${labels[0]} đến ${labels.at(-1)}.`,
    'khong-doi': 'Số liệu không thay đổi: biểu đồ là một đường nằm ngang.',
    'xen-ke': 'Số liệu có lúc tăng, có lúc giảm.',
  }[t];
  const hi = Math.max(...values);
  const lo = Math.min(...values);
  const out = [
    overall,
    `Cao nhất: ${fmt(hi)} ${unit} (${where(labels, values, hi)}). Thấp nhất: ${fmt(lo)} ${unit} (${where(labels, values, lo)}).`,
  ];
  const up = Math.max(...d);
  const down = Math.min(...d);
  if (up > 0) {
    const i = d.indexOf(up);
    out.push(`Tăng mạnh nhất: từ ${labels[i]} đến ${labels[i + 1]}, tăng ${fmt(up)} ${unit}.`);
  }
  if (down < 0) {
    const i = d.indexOf(down);
    out.push(`Giảm mạnh nhất: từ ${labels[i]} đến ${labels[i + 1]}, giảm ${fmt(-down)} ${unit}.`);
  }
  return out;
}

/**
 * @typedef {object} Goal
 * @property {string} id
 * @property {string} label
 * @property {string} text the task
 * @property {(values: readonly number[]) => boolean} met
 */

/** @type {Goal[]} */
export const GOALS = [
  {
    id: 'tang',
    label: 'Tăng liên tục',
    text: 'Kéo các điểm sao cho số cây tăng liên tục qua các năm.',
    met: (v) => trend(v) === 'tang',
  },
  {
    id: 'giam',
    label: 'Giảm liên tục',
    text: 'Kéo các điểm sao cho số cây giảm liên tục qua các năm.',
    met: (v) => trend(v) === 'giam',
  },
  {
    id: 'dinh',
    label: 'Cao nhất năm 2021',
    text: 'Kéo các điểm sao cho số cây tăng đến năm 2021 rồi giảm dần, năm 2021 cao nhất.',
    met: (v) => {
      const d = changes(v);
      return d.slice(0, 2).every((x) => x > 0) && d.slice(2).every((x) => x < 0);
    },
  },
];
