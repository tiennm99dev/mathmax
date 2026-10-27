/**
 * Logic of the relative-frequency widget: frequencies m of a sample become
 * relative frequencies f = m/n (in percent) and pie-chart angles 360°·f, and
 * the widget tells when scaling every frequency left the relative ones alone.
 */

import { formatNumber, texNumber } from '#lib/core/number-format.js';

/** @typedef {{ label: string, values: string[], counts: number[], unit: string }} Dataset */

/** @type {Dataset[]} */
export const DATASETS = [
  {
    label: 'Số anh chị em ruột',
    values: ['0', '1', '2', '3'],
    counts: [8, 12, 6, 4],
    unit: 'học sinh',
  },
  {
    label: 'Phương tiện đến trường',
    values: ['Đi bộ', 'Xe đạp', 'Xe buýt', 'Bố mẹ đưa'],
    counts: [6, 14, 8, 12],
    unit: 'học sinh',
  },
];

/** Largest frequency a stepper allows. */
export const MAX_COUNT = 40;

/**
 * A percentage or angle to one decimal place, marked '≈' when rounded:
 * 40 gives '40', 26.666… gives '≈ 26,7'.
 * @param {number} v
 */
export function roundedText(v) {
  const r = Math.round(v * 10) / 10;
  const exact = Math.abs(v - r) < 1e-9;
  return `${exact ? '' : '≈ '}${formatNumber(r, 1)}`;
}

/**
 * Relative frequencies (percent) and pie angles (degrees) of the counts.
 * @param {readonly number[]} counts
 */
export function relativeRows(counts) {
  const n = counts.reduce((s, m) => s + m, 0);
  return counts.map((m) => {
    const f = n === 0 ? 0 : (m / n) * 100;
    return { m, f, angle: n === 0 ? 0 : (m / n) * 360 };
  });
}

/**
 * '= 40' or '\approx 26{,}7' in TeX: a value to one decimal place, with the
 * sign that says whether it was rounded.
 * @param {number} v
 */
export function equalsTex(v) {
  const r = Math.round(v * 10) / 10;
  const sign = Math.abs(v - r) < 1e-9 ? '=' : '\\approx';
  return `${sign} ${formatNumber(r, 1).replace(',', '{,}')}`;
}

/**
 * The working for one value: f = m/n · 100% and its pie angle.
 * @param {string} value
 * @param {number} m
 * @param {number} n
 */
export function detailText(value, m, n) {
  if (n === 0) return 'Cỡ mẫu bằng $0$: hãy tăng một tần số.';
  const frac = `\\dfrac{${m}}{${n}}`;
  const f = (m / n) * 100;
  const angle = (m / n) * 360;
  return `Giá trị "${value}": $f = ${frac} \\cdot 100\\% ${equalsTex(f)}\\%$; góc ở tâm của hình quạt: $360^\\circ \\cdot ${frac} ${equalsTex(angle)}^\\circ$.`;
}

/**
 * The factor k when every count is k times the original (k ≠ 1), else null.
 * @param {readonly number[]} counts
 * @param {readonly number[]} original
 */
export function scaleFactor(counts, original) {
  const k = counts[0] / original[0];
  if (!(k > 0) || k === 1) return null;
  return counts.every((m, i) => Math.abs(m - k * original[i]) < 1e-9) ? k : null;
}

/**
 * Why the relative frequencies did not move when every count was multiplied
 * by k: '... gấp 2 lần ...' or, for k = 0,5, '... nhân với 0,5 ...'.
 * @param {number} k
 * @param {number} n0 sample size before
 * @param {number} n sample size now
 */
export function scaleText(k, n0, n) {
  const how = Number.isInteger(k)
    ? `Mọi tần số đều gấp ${k} lần, cỡ mẫu cũng gấp ${k} lần ($${n0}$ thành $${n}$)`
    : `Mọi tần số đều được nhân với cùng số $${texNumber(formatNumber(k))}$, cỡ mẫu cũng vậy ($${n0}$ thành $${n}$)`;
  return `${how}, nên mọi tần số tương đối $\\dfrac{m}{n}$ giữ nguyên: biểu đồ tần số tương đối không đổi, chỉ biểu đồ tần số thay đổi.`;
}
