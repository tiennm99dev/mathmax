/**
 * Addition and subtraction set out in columns, the way the book reads them,
 * for numbers up to three digits and results below 1 000:
 *
 * - 146 + 29: "6 cộng 9 bằng 15, viết 5, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7,
 *   viết 7. Hạ 1, viết 1."
 * - 394 − 158: "4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1. 5 thêm
 *   1 bằng 6, 9 trừ 6 bằng 3, viết 3. 3 trừ 1 bằng 2, viết 2."
 *
 * Pure and DOM-free.
 */
import { equationText, resultOf } from '#lib/core/kid/column.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */

/** The value of each place from right to left. */
export const VALUES = /** @type {const} */ ([1, 10, 100]);

/** The name of each place from right to left. */
export const PLACE_NAMES = /** @type {const} */ (['đơn vị', 'chục', 'trăm']);

/**
 * One column of a calculation, ones first. `blank` says its digit would be a
 * leading zero of the result, so nothing is written there.
 * @typedef {{
 *   index: number;
 *   digit: number;
 *   carryIn: boolean;
 *   carryOut: boolean;
 *   blank: boolean;
 *   text: string;
 *   ask: string;
 *   hint: string;
 * }} ColumnStep
 */

/**
 * The digit of `n` at a place value, or null when `n` is too short.
 * @param {number} n
 * @param {number} value
 */
export function digitOf(n, value) {
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
 * @param {number} index
 * @param {number | null} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @returns {ColumnStep}
 */
function addStep(index, top, bottom, carryIn) {
  const row = `Hàng ${PLACE_NAMES[index]}`;
  const base = { index, carryIn, blank: false };
  if (top === null && bottom === null) {
    return {
      ...base,
      digit: 1,
      carryOut: false,
      text: 'Không còn chữ số nào, viết 1 đã nhớ.',
      ask: `${row}: không còn chữ số nào, chỉ còn số đã nhớ. Em viết chữ số nào?`,
      hint: 'Em viết số đã nhớ.',
    };
  }
  const [x, y] = top === null ? [/** @type {number} */ (bottom), null] : [top, bottom];
  const sum = x + (y ?? 0) + (carryIn ? 1 : 0);
  const digit = sum % 10;
  const carryOut = sum >= 10;
  const end = writing(digit, carryOut);
  if (y === null && !carryIn) {
    return {
      ...base,
      digit,
      carryOut,
      text: `Hạ ${x}, viết ${x}.`,
      ask: `${row}: chỉ có một chữ số. Em hạ chữ số nào xuống?`,
      hint: `Em nhìn cột ${PLACE_NAMES[index]}, chỉ có một chữ số ở đó.`,
    };
  }
  const tail = 'Nếu được số có hai chữ số, em viết chữ số đơn vị của nó và nhớ 1.';
  if (y === null) {
    return {
      ...base,
      digit,
      carryOut,
      text: `${x} thêm 1 bằng ${sum}${end}`,
      ask: `${row}: có ${x}, thêm 1 đã nhớ. Em viết chữ số nào?`,
      hint: `Em tính ${x} thêm 1. ${tail}`,
    };
  }
  if (carryIn) {
    return {
      ...base,
      digit,
      carryOut,
      text: `${x} cộng ${y} bằng ${x + y}, thêm 1 bằng ${sum}${end}`,
      ask: `${row}: ${x} + ${y}, thêm 1 đã nhớ. Em viết chữ số nào?`,
      hint: `Em tính ${x} + ${y} rồi thêm 1. ${tail}`,
    };
  }
  return {
    ...base,
    digit,
    carryOut,
    text: `${x} cộng ${y} bằng ${sum}${end}`,
    ask: `${row}: ${x} + ${y}. Em viết chữ số nào?`,
    hint: `Em tính ${x} + ${y}. ${tail}`,
  };
}

/**
 * One column of a subtraction. `leading` says a zero here would be the first
 * digit of the result.
 * @param {number} index
 * @param {number} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @param {boolean} leading
 * @returns {ColumnStep}
 */
function subStep(index, top, bottom, carryIn, leading) {
  const row = `Hàng ${PLACE_NAMES[index]}`;
  const need = (bottom ?? 0) + (carryIn ? 1 : 0);
  const carryOut = top < need;
  const digit = top + (carryOut ? 10 : 0) - need;
  const blank = leading && digit === 0 && !carryOut;
  const base = { index, digit, carryIn, carryOut, blank };
  if (bottom === null && !carryIn) {
    return {
      ...base,
      text: `Hạ ${top}, viết ${top}.`,
      ask: `${row}: chỉ có một chữ số. Em hạ chữ số nào xuống?`,
      hint: `Em nhìn cột ${PLACE_NAMES[index]}, chỉ có một chữ số ở đó.`,
    };
  }
  const added = carryIn && bottom !== null ? `${bottom} thêm 1 bằng ${need}, ` : '';
  const given = carryIn && bottom !== null ? `${bottom} thêm 1 đã nhớ là ${need}. ` : '';
  if (carryOut) {
    return {
      ...base,
      text: `${added}${top} không trừ được ${need}, lấy ${10 + top} trừ ${need} bằng ${digit}${writing(digit, true)}`,
      ask: `${row}: ${given}${top} không trừ được ${need}. Em lấy ${10 + top} trừ ${need}. Em viết chữ số nào?`,
      hint: `Em tính ${10 + top} − ${need}, rồi nhớ 1 sang hàng bên trái.`,
    };
  }
  return {
    ...base,
    text: `${added}${top} trừ ${need} bằng ${digit}${blank ? ', không cần viết.' : writing(digit, false)}`,
    ask: `${row}: ${given}${top} − ${need}. Em viết chữ số nào?`,
    hint: `Em tính ${top} − ${need}.`,
  };
}

/**
 * The columns of a calculation, ones first. An addition that carries out of
 * its last column ends with a column holding only the carried 1.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {ColumnStep[]}
 */
export function columnSteps(a, b, op) {
  const r = resultOf(a, b, op);
  /** @type {ColumnStep[]} */
  const steps = [];
  let carryIn = false;
  for (const [index, value] of VALUES.entries()) {
    const top = digitOf(a, value);
    const bottom = digitOf(b, value);
    if (top === null && bottom === null && !carryIn) break;
    /** @type {ColumnStep} */
    const step =
      op === '+'
        ? addStep(index, top, bottom, carryIn)
        : subStep(index, top ?? 0, bottom, carryIn, r < value);
    steps.push(step);
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
  const moved = VALUES[step.index] * 10;
  return op === '+' ? resultOf(a, b, op) - moved : resultOf(a, b, op) + moved;
}
