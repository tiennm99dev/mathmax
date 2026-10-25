/**
 * The percentage shop: one bar stands for a whole amount (100%), and a
 * handle marks a percentage of it. Three everyday problems use the bar:
 *
 * - 'sale': a price is cut by p%; the new price is (100 − p)% of the old one.
 * - 'interest': money in a savings account earns r% a year; the interest
 *   is r% of the deposit.
 * - 'original': the sale price after a p% cut is known; the old price is the
 *   number whose (100 − p)% is the sale price.
 *
 * Percentages are carried in tenths (6,5% is 65) and money in đồng, so every
 * amount is an exact whole number of đồng.
 */

import { fmt } from '#lib/core/number-format.js';
import { decStr } from '../_shared/decimal.js';

/** @typedef {'sale' | 'interest' | 'original'} Mode */

/**
 * a% of b, with a in tenths of a percent: b · a / 1000.
 * @param {number} b @param {number} a10
 */
export function percentOf(b, a10) {
  return (b * a10) / 1000;
}

/**
 * The number whose a% is c, with a in tenths of a percent: c · 1000 / a.
 * @param {number} c @param {number} a10
 */
export function wholeFromPercent(c, a10) {
  if (a10 === 0) throw new Error('the percentage must not be 0');
  return (c * 1000) / a10;
}

/**
 * The ratio a : b as a percentage, rounded to `digits` decimals.
 * @param {number} a @param {number} b @param {number} [digits]
 */
export function ratioPercent(a, b, digits = 2) {
  if (b === 0) throw new Error('b must not be 0');
  const f = 10 ** digits;
  return Math.round(((a * 100) / b) * f) / f;
}

/** @param {number} p10 */
export const pctText = (p10) => `${decStr(p10, 1)}%`;

/** @param {number} n */
export const money = (n) => `${fmt(n)} đồng`;

/**
 * @typedef {object} Solved
 * @property {string} question
 * @property {number} answer
 * @property {string[]} steps
 * @property {number} whole the amount the bar stands for (100%)
 * @property {number} marked the amount at the handle
 * @property {string} markedLabel what the marked part is
 * @property {string} restLabel what the rest of the bar is
 */

/**
 * One problem worked out.
 * @param {Mode} mode
 * @param {number} base price (sale), deposit (interest) or old price (original)
 * @param {number} p10 the percentage at the handle, in tenths
 * @returns {Solved}
 */
export function solve(mode, base, p10) {
  const p = pctText(p10);
  if (mode === 'interest') {
    const interest = percentOf(base, p10);
    return {
      question: `Gửi tiết kiệm ${money(base)} với lãi suất ${p} một năm. Sau một năm, số tiền lãi là bao nhiêu đồng?`,
      answer: interest,
      steps: [
        `Tiền lãi một năm bằng ${p} của số tiền gửi.`,
        `${p} của ${fmt(base)} là ${fmt(base)} · ${decStr(p10, 1)}/100 = ${fmt(interest)} (đồng).`,
        `Sau một năm, cả gốc lẫn lãi là ${fmt(base)} + ${fmt(interest)} = ${fmt(base + interest)} (đồng).`,
      ],
      whole: base,
      marked: interest,
      markedLabel: 'tiền lãi',
      restLabel: 'tiền gửi',
    };
  }
  const cut = percentOf(base, p10);
  const rest = base - cut;
  const left = pctText(1000 - p10);
  if (mode === 'sale') {
    return {
      question: `Món hàng giá ${money(base)} được giảm giá ${p}. Giá mới là bao nhiêu đồng?`,
      answer: rest,
      steps: [
        `Số tiền được giảm là ${p} của ${fmt(base)}: ${fmt(base)} · ${decStr(p10, 1)}/100 = ${fmt(cut)} (đồng).`,
        `Giá mới là ${fmt(base)} − ${fmt(cut)} = ${fmt(rest)} (đồng).`,
        `Cách khác: giá mới bằng 100% − ${p} = ${left} giá cũ: ${fmt(base)} · ${decStr(1000 - p10, 1)}/100 = ${fmt(rest)}.`,
      ],
      whole: base,
      marked: cut,
      markedLabel: 'được giảm',
      restLabel: 'phải trả',
    };
  }
  return {
    question: `Sau khi giảm giá ${p}, một món hàng được bán với giá ${money(rest)}. Giá ban đầu là bao nhiêu đồng?`,
    answer: base,
    steps: [
      `Giá sau khi giảm bằng 100% − ${p} = ${left} giá ban đầu.`,
      `Giá ban đầu là số có ${left} bằng ${fmt(rest)}: ${fmt(rest)} : ${decStr(1000 - p10, 1)}/100 = ${fmt(rest)} · 100 : ${decStr(1000 - p10, 1)} = ${fmt(base)} (đồng).`,
    ],
    whole: base,
    marked: cut,
    markedLabel: 'được giảm',
    restLabel: 'giá đã bán',
  };
}

/** Goods in the shop. Prices are multiples of 20 000 đồng, so every 5% step is exact. */
export const GOODS = [
  { id: 'ao', name: 'Áo khoác', price: 460000 },
  { id: 'giay', name: 'Giày thể thao', price: 800000 },
  { id: 'balo', name: 'Ba lô', price: 320000 },
  { id: 'sach', name: 'Bộ sách', price: 140000 },
];

/** Deposits in millions of đồng; with rates in steps of 0,5% the interest is exact. */
export const DEPOSITS = [5000000, 10000000, 20000000, 50000000];

/**
 * The handle range and step for a mode, in tenths of a percent.
 * @param {Mode} mode
 */
export function range(mode) {
  return mode === 'interest' ? { min: 5, max: 200, step: 5 } : { min: 50, max: 900, step: 50 };
}

/**
 * Snap a percentage (in tenths) to the mode's step and range.
 * @param {Mode} mode @param {number} p10
 */
export function snapPercent(mode, p10) {
  const { min, max, step } = range(mode);
  return Math.min(max, Math.max(min, Math.round(p10 / step) * step));
}
