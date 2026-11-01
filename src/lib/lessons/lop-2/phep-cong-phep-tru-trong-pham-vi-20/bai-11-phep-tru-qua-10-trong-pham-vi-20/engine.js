/**
 * "Phép trừ (qua 10) trong phạm vi 20" on two ten-frames: `c` dots, a full
 * first frame and `c − 10` dots in the second. Crossing out `b` dots one by
 * one, the second frame first, passes the 10 mark: 12 − 3 crosses out 2 to
 * reach 10, then 1 more (3 = 2 + 1, 12 − 2 = 10, 10 − 1 = 9). Pure and
 * DOM-free.
 */
import { pick } from '#lib/core/drill.js';
import { numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { SUB_FACTS, downToTen, downToTenSteps } from '../_shared/facts.js';

/** @typedef {'empty' | 'red' | 'blue' | 'gone'} Cell */

/**
 * The two frames with the crossed-out dots.
 * @param {number} c
 * @param {readonly number[]} goneFirst crossed cells of the first frame
 * @param {readonly number[]} goneSecond crossed cells of the second frame
 * @returns {{ first: Cell[], second: Cell[] }}
 */
export function frames(c, goneFirst, goneSecond) {
  const first = Array.from(
    { length: 10 },
    (_, i) => /** @type {Cell} */ (goneFirst.includes(i) ? 'gone' : 'red'),
  );
  const second = Array.from(
    { length: 10 },
    (_, i) =>
      /** @type {Cell} */ (i >= c - 10 ? 'empty' : goneSecond.includes(i) ? 'gone' : 'blue'),
  );
  return { first, second };
}

/**
 * Whether a dot may be crossed out now: never more than `b` dots, and the
 * full frame only once the second frame is empty.
 * @param {{ c: number, b: number, goneFirst: readonly number[], goneSecond: readonly number[] }} state
 * @param {'first' | 'second'} frame
 * @param {number} i
 */
export function canCross({ c, b, goneFirst, goneSecond }, frame, i) {
  if (goneFirst.length + goneSecond.length >= b) return false;
  if (frame === 'second') return i < c - 10 && !goneSecond.includes(i);
  return goneSecond.length === c - 10 && !goneFirst.includes(i);
}

/**
 * What the frames say after `taken` dots were crossed out.
 * @param {number} c
 * @param {number} b
 * @param {number} taken
 */
export function frameMessage(c, b, taken) {
  const { first, rest } = downToTen(c, b);
  if (taken === 0) {
    return `Có ${c} chấm. Em cần bớt ${b} chấm. Em gạch các chấm ở khung thứ hai trước nhé.`;
  }
  if (taken < first)
    return `Đã bớt ${taken} chấm, còn ${c - taken} chấm. Gạch tiếp ở khung thứ hai.`;
  if (taken === first && taken < b) {
    return `Đã bớt ${first} chấm, còn 10 chấm. Cần bớt thêm ${rest} chấm nữa ở khung thứ nhất.`;
  }
  if (taken < b) return `Còn ${c - taken} chấm. Cần bớt thêm ${b - taken} chấm nữa.`;
  return `Đã bớt đủ ${b} chấm: ${b} = ${first} + ${rest}. Đếm số chấm còn lại nhé.`;
}

/**
 * The full reason once the difference is found.
 * @param {number} c
 * @param {number} b
 */
export function explain(c, b) {
  return `${downToTenSteps(c, b).join(' ')} Vậy ${c} ${MINUS} ${b} = ${c - b}.`;
}

/**
 * A new subtraction across ten, different from the last one.
 * @param {() => number} rand
 * @param {{ c: number, b: number }} [previous]
 */
export function newPair(rand, previous) {
  for (let i = 0; i < 20; i++) {
    const f = pick(rand, SUB_FACTS);
    if (!previous || f.c !== previous.c || f.b !== previous.b) return { c: f.c, b: f.b };
  }
  return { c: 12, b: 3 };
}

/**
 * Answer options for the difference, near it and within 1 to 10.
 * @param {() => number} rand
 * @param {number} c
 * @param {number} b
 */
export function differenceOptions(rand, c, b) {
  return numberOptions(rand, c - b, 1, 10);
}
