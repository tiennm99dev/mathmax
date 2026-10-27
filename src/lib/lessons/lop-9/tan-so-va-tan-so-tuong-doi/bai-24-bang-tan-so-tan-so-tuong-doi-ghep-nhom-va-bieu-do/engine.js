/**
 * Logic of the grouping widget: raw heights are grouped into equal classes
 * [a; a + w) for a chosen width w, giving the grouped frequency table, the
 * relative frequencies and the class midpoints (giá trị đại diện).
 */

import { formatNumber } from '#lib/core/number-format.js';

/** Heights (cm) of 40 students, sorted, all in [150; 180). */
export const HEIGHTS = [
  150, 152, 153, 155, 156, 157, 158, 158, 159, 160, 160, 161, 161, 162, 162, 163, 163, 164, 164,
  165, 165, 165, 166, 166, 167, 167, 168, 168, 169, 170, 170, 171, 172, 173, 174, 175, 176, 177,
  178, 179,
];

/** Where the first class starts and where the last one ends. */
export const START = 150;
export const END = 180;

/** Class widths that split [START; END) into whole classes. */
export const WIDTHS = [2, 3, 5, 6, 10, 15];

/** @typedef {{ lo: number, hi: number, m: number, f: number, mid: number }} GroupRow */

/**
 * The index of the class [start + i·w; start + (i + 1)·w) holding v.
 * @param {number} v
 * @param {number} start
 * @param {number} width
 */
export function groupIndex(v, start, width) {
  return Math.floor((v - start) / width);
}

/**
 * The grouped frequency table of the values: one row per class, with its
 * frequency m, relative frequency f (percent) and midpoint.
 * @param {readonly number[]} values
 * @param {number} start
 * @param {number} end
 * @param {number} width
 * @returns {GroupRow[]}
 */
export function groupRows(values, start, end, width) {
  const k = Math.ceil((end - start) / width);
  const counts = Array.from({ length: k }, () => 0);
  for (const v of values) {
    const i = groupIndex(v, start, width);
    if (i >= 0 && i < k) counts[i] += 1;
  }
  return counts.map((m, i) => {
    const lo = start + i * width;
    return { lo, hi: lo + width, m, f: (m / values.length) * 100, mid: lo + width / 2 };
  });
}

/**
 * A class written the book's way, '[165; 170)'.
 * @param {{ lo: number, hi: number }} row
 */
export function classText(row) {
  return `[${row.lo}; ${row.hi})`;
}

/**
 * A percentage to one decimal place, '≈' when rounded: '25', '7,5', '≈ 2,6'.
 * @param {number} v
 */
export function percentText(v) {
  const r = Math.round(v * 10) / 10;
  return `${Math.abs(v - r) < 1e-9 ? '' : '≈ '}${formatNumber(r, 1)}`;
}

/**
 * What the chosen width does to the picture, in one or two sentences.
 * @param {readonly GroupRow[]} rows
 * @param {number} width
 */
export function widthNote(rows, width) {
  const top = Math.max(...rows.map((r) => r.m));
  const best = rows.filter((r) => r.m === top).map(classText);
  const where =
    best.length === 1
      ? `Nhóm ${best[0]} có tần số lớn nhất (${top}).`
      : `Các nhóm ${best.join(', ')} cùng có tần số lớn nhất (${top}).`;
  const head = `Độ dài nhóm ${width} cm: ${rows.length} nhóm. ${where}`;
  if (rows.length > 10) {
    return `${head} Nhóm quá hẹp nên nhiều nhóm có tần số nhỏ, biểu đồ lởm chởm, khó thấy xu hướng chung.`;
  }
  if (rows.length <= 3) {
    return `${head} Nhóm quá rộng nên biểu đồ chỉ còn vài cột, mất nhiều chi tiết về cách dữ liệu phân bố.`;
  }
  return `${head} Số nhóm vừa phải: biểu đồ cho thấy rõ dữ liệu tập trung ở giữa và thưa dần về hai phía.`;
}

/**
 * '= 25' or '\approx 33{,}3' in TeX: a value to one decimal place, with the
 * sign that says whether it was rounded.
 * @param {number} v
 */
export function equalsTex(v) {
  const r = Math.round(v * 10) / 10;
  const sign = Math.abs(v - r) < 1e-9 ? '=' : '\\approx';
  return `${sign} ${formatNumber(r, 1).replace(',', '{,}')}`;
}

/**
 * The working for one class: which data it holds, its frequency, relative
 * frequency and midpoint.
 * @param {GroupRow} row
 * @param {number} n sample size
 */
export function groupDetail(row, n) {
  const mid = formatNumber(row.mid).replace(',', '{,}');
  return `Nhóm ${classText(row)} gồm các chiều cao $x$ với $${row.lo} \\le x < ${row.hi}$: tần số $m = ${row.m}$; tần số tương đối $f = \\dfrac{${row.m}}{${n}} \\cdot 100\\% ${equalsTex(row.f)}\\%$; giá trị đại diện $\\dfrac{${row.lo} + ${row.hi}}{2} = ${mid}$.`;
}
