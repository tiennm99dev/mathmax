/**
 * Addition and subtraction set out in columns, the way the grade 2 book reads
 * them, for numbers with one, two or three digits and at most one carry:
 *
 * - 427 + 246: "7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng
 *   7, viết 7. 4 cộng 2 bằng 6, viết 6."
 * - 880 − 54: "0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1. 5 thêm
 *   1 bằng 6, 8 trừ 6 bằng 2, viết 2. Hạ 8, viết 8."
 *
 * Pure and DOM-free.
 */
import { equationText, resultOf } from '#lib/core/kid/column.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */

/** The value of each place from right to left. */
const VALUES = /** @type {const} */ ([1, 10, 100]);

/**
 * The digit of `n` at a place value, or null when `n` is too short.
 * @param {number} n
 * @param {number} value
 */
function digitAt(n, value) {
  if (value > 1 && n < value) return null;
  return Math.floor(n / value) % 10;
}

/**
 * @param {number} digit
 * @param {boolean} carryOut
 */
const writing = (digit, carryOut) => `, viết ${digit}${carryOut ? ', nhớ 1' : ''}.`;

/**
 * One column of an addition.
 * @param {number | null} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @returns {{ text: string, carryOut: boolean }}
 */
function addColumn(top, bottom, carryIn) {
  const [x, y] = top === null ? [bottom ?? 0, null] : [top, bottom];
  const sum = x + (y ?? 0) + (carryIn ? 1 : 0);
  const carryOut = sum >= 10;
  const digit = sum % 10;
  if (y === null && !carryIn) return { text: `Hạ ${x}, viết ${x}.`, carryOut };
  if (y === null) return { text: `${x} thêm 1 bằng ${sum}${writing(digit, carryOut)}`, carryOut };
  if (carryIn) {
    return {
      text: `${x} cộng ${y} bằng ${x + y}, thêm 1 bằng ${sum}${writing(digit, carryOut)}`,
      carryOut,
    };
  }
  return { text: `${x} cộng ${y} bằng ${sum}${writing(digit, carryOut)}`, carryOut };
}

/**
 * One column of a subtraction. `leading` says a zero here would be the first
 * digit of the result, so it is not written.
 * @param {number} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @param {boolean} leading
 * @returns {{ text: string, carryOut: boolean }}
 */
function subColumn(top, bottom, carryIn, leading) {
  const need = (bottom ?? 0) + (carryIn ? 1 : 0);
  const carryOut = top < need;
  const digit = top + (carryOut ? 10 : 0) - need;
  const added = carryIn && bottom !== null ? `${bottom} thêm 1 bằng ${need}, ` : '';
  if (bottom === null && !carryIn) return { text: `Hạ ${top}, viết ${top}.`, carryOut };
  if (carryOut) {
    return {
      text: `${added}${top} không trừ được ${need}, lấy ${10 + top} trừ ${need} bằng ${digit}${writing(digit, true)}`,
      carryOut,
    };
  }
  const end = leading && digit === 0 ? '.' : `, viết ${digit}.`;
  return { text: `${added}${top} trừ ${need} bằng ${digit}${end}`, carryOut };
}

/**
 * The columns of a calculation, ones first, up to the longer number.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {Array<{ value: number, text: string, carryOut: boolean }>}
 */
function columnSteps(a, b, op) {
  const r = resultOf(a, b, op);
  /** @type {Array<{ value: number, text: string, carryOut: boolean }>} */
  const steps = [];
  let carryIn = false;
  for (const value of VALUES) {
    const top = digitAt(a, value);
    const bottom = digitAt(b, value);
    if (top === null && bottom === null) break;
    /** @type {{ text: string, carryOut: boolean }} */
    const step =
      op === '+'
        ? addColumn(top, bottom, carryIn)
        : subColumn(top ?? 0, bottom, carryIn, r < value);
    steps.push({ value, ...step });
    carryIn = step.carryOut;
  }
  return steps;
}

/**
 * The whole column reading, then the equation.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function columnWords(a, b, op) {
  const parts = columnSteps(a, b, op).map((s) => s.text);
  return `${parts.join(' ')} Vậy ${equationText(a, b, op)}.`;
}

/**
 * How many columns carry 1 to the next one.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function carryCount(a, b, op) {
  return columnSteps(a, b, op).filter((s) => s.carryOut).length;
}

/**
 * The result a child gets by forgetting the carried 1, or null when nothing
 * is carried.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {number | null}
 */
export function forgotCarry(a, b, op) {
  const step = columnSteps(a, b, op).find((s) => s.carryOut);
  if (!step) return null;
  const moved = step.value * 10;
  return op === '+' ? resultOf(a, b, op) - moved : resultOf(a, b, op) + moved;
}
