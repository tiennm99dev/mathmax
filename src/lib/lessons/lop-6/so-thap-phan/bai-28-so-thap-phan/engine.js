/**
 * A number line that zooms in by tens. Every value is an integer number of
 * thousandths, so the marker sits exactly on a tick at every level:
 *
 * - level 0: the whole line from −3 to 3, ticks every unit;
 * - level 1: one unit segment cut into tenths;
 * - level 2: one tenth cut into hundredths;
 * - level 3: one hundredth cut into thousandths.
 */

import { decStr, decimalFraction } from '../_shared/decimal.js';

export const MIN = -3000;
export const MAX = 3000;
export const LEVELS = 4;

/** Names of the place shown by the ticks at each level. */
export const PLACE = ['hàng đơn vị', 'hàng phần mười', 'hàng phần trăm', 'hàng phần nghìn'];

/**
 * Gap between two ticks at a level, in thousandths.
 * @param {number} level 0 to 3
 */
export function tick(level) {
  return 10 ** (3 - level);
}

/**
 * @typedef {{ level: number, start: number, end: number }} View
 */

/** The whole line. @returns {View} */
export function overview() {
  return { level: 0, start: MIN, end: MAX };
}

/**
 * Zoom into the tick segment that holds `v`; a marker on the right end of
 * the view zooms into the last segment. The deepest level stays as it is.
 * @param {View} view @param {number} v
 * @returns {View}
 */
export function zoomIn(view, v) {
  if (view.level >= LEVELS - 1) return view;
  const t = tick(view.level);
  let start = Math.floor(v / t) * t;
  if (start >= view.end) start = view.end - t;
  if (start < view.start) start = view.start;
  return { level: view.level + 1, start, end: start + t };
}

/**
 * Zoom back out by one level, to the segment ten times as long that holds
 * this one.
 * @param {View} view
 * @returns {View}
 */
export function zoomOut(view) {
  if (view.level <= 1) return overview();
  const t = tick(view.level - 2);
  const start = Math.floor(view.start / t) * t;
  return { level: view.level - 1, start, end: start + t };
}

/**
 * The tick values of a view, left to right.
 * @param {View} view
 */
export function ticks(view) {
  const t = tick(view.level);
  const out = [];
  for (let v = view.start; v <= view.end; v += t) out.push(v);
  return out;
}

/**
 * Snap a position to the nearest tick of the view, kept inside it.
 * @param {View} view @param {number} v
 */
export function snapTo(view, v) {
  const t = tick(view.level);
  const s = Math.round(v / t) * t;
  return Math.min(view.end, Math.max(view.start, s));
}

/**
 * Text of a value in thousandths: 1470 → '1,47'.
 * @param {number} v
 */
export const text = (v) => decStr(v, 3);

/**
 * The digits of |v| by place: integer part, tenths, hundredths, thousandths.
 * @param {number} v
 */
export function places(v) {
  const a = Math.abs(v);
  return {
    negative: v < 0,
    int: Math.floor(a / 1000),
    tenths: Math.floor(a / 100) % 10,
    hundredths: Math.floor(a / 10) % 10,
    thousandths: a % 10,
  };
}

/**
 * The decimal fraction that the value stands for, as plain text:
 * −1250 → '−125/100'; whole numbers give their integer.
 * @param {number} v
 */
export function fractionText(v) {
  const { num, den } = decimalFraction(v, 3);
  const sign = num < 0 ? '−' : '';
  if (den === 1) return `${sign}${Math.abs(num)}`;
  return `${sign}${Math.abs(num)}/${den}`;
}

/**
 * Compare two values the way the lesson does, as a sentence.
 * @param {number} a @param {number} b
 */
export function compareText(a, b) {
  if (a === b) return `${text(a)} = ${text(b)}`;
  return a < b ? `${text(a)} < ${text(b)}` : `${text(a)} > ${text(b)}`;
}

/**
 * Targets for the "place the point" challenge, in thousandths. They need
 * different zoom depths and include negative numbers.
 */
export const TARGETS = [1400, -600, 2350, -1470, 83, -2705, 1009, -40];

/**
 * Feedback for a placed marker against a target.
 * @param {number} v marker @param {number} target
 */
export function judge(v, target) {
  if (v === target) return { ok: true, text: `Đúng rồi! Điểm nằm tại ${text(target)}.` };
  const dir = v < target ? 'sang phải' : 'sang trái';
  const rel = v < target ? '<' : '>';
  return {
    ok: false,
    text: `Chưa đúng: ${text(v)} ${rel} ${text(target)}, hãy dịch điểm ${dir} (phóng to nếu cần).`,
  };
}
