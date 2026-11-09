/**
 * The zooming number line of "So sánh các số trong phạm vi 10 000": two
 * numbers sit on a line from 0 to 10 000; zooming in shows the thousand,
 * then the hundred, then the ten that holds them both, until the two points
 * stand apart. The child then picks the sign. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
import { TOP, compareWhy4 } from '../_shared/numbers-to-10000.js';

/** The pairs to compare, in order. */
export const PAIRS = /** @type {const} */ ([
  [3456, 3465],
  [1000, 999],
  [7812, 7802],
  [5094, 5940],
  [9999, 10000],
  [6150, 6105],
  [2468, 2468],
  [4030, 4300],
]);

/** Window widths from the whole line down to one ten. */
export const SPANS = /** @type {const} */ ([10000, 1000, 100, 10]);

/**
 * The part of the line shown at a zoom level, around `a`: its ends and the
 * gap between ticks. The window never runs past 10 000.
 * @param {number} level 0 to 3
 * @param {number} a
 * @returns {{ lo: number, hi: number, step: number }}
 */
export function windowAt(level, a) {
  const span = SPANS[level];
  const lo = Math.min(Math.floor(a / span) * span, TOP - span);
  return { lo, hi: lo + span, step: span / 10 };
}

/**
 * The deepest zoom level whose window still holds both numbers.
 * @param {number} a
 * @param {number} b
 */
export function deepestLevel(a, b) {
  let level = 0;
  while (level + 1 < SPANS.length) {
    const w = windowAt(level + 1, Math.min(a, b));
    if (a < w.lo || a > w.hi || b < w.lo || b > w.hi) break;
    level += 1;
  }
  return level;
}

/**
 * What the line shows at a zoom level, as a sentence for the live region.
 * @param {number} level
 * @param {number} a
 * @param {number} b
 */
export function lineText(level, a, b) {
  const w = windowAt(level, Math.min(a, b));
  const range = `Tia số từ ${fmt(w.lo)} đến ${fmt(w.hi)}, mỗi vạch cách nhau ${fmt(w.step)}.`;
  if (a === b) return `${range} Hai số ở cùng một điểm.`;
  const [left, right] = a < b ? [a, b] : [b, a];
  if (right - left < w.step && level < deepestLevel(a, b)) {
    return `${range} Hai điểm còn sát nhau, em phóng to thêm nhé.`;
  }
  return `${range} ${fmt(left)} nằm bên trái ${fmt(right)}.`;
}

/**
 * The verdict on a sign the child picked for `a ? b`.
 * @param {number} a
 * @param {number} b
 * @param {'>' | '<' | '='} sign
 * @returns {{ ok: boolean, text: string }}
 */
export function signVerdict(a, b, sign) {
  const right = compareSign(a, b);
  if (sign === right) return { ok: true, text: `Đúng rồi! ${compareWhy4(a, b)}` };
  return {
    ok: false,
    text: `Chưa đúng: ${fmt(a)} không ${SIGN_WORDS[sign]} ${fmt(b)}. Em so sánh từ hàng nghìn, hoặc nhìn xem số nào nằm bên trái trên tia số.`,
  };
}
