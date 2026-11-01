/**
 * Addition and subtraction across ten within 20, the way the book teaches
 * them: to add, split the second number so the first one makes 10 (9 + 5:
 * 5 = 1 + 4, 9 + 1 = 10, 10 + 4 = 14); to subtract, split the number taken
 * away so the first part brings the total down to 10 (12 − 3: 3 = 2 + 1,
 * 12 − 2 = 10, 10 − 1 = 9). Also the book's addition table across ten.
 * Pure and DOM-free.
 */
import { MINUS } from '#lib/core/number-format.js';

/** An addition fact `a + b`. @typedef {{ a: number, b: number }} Fact */

/**
 * Whether `a + b` is an addition across ten of the chapter: two one-digit
 * numbers whose sum is more than 10.
 * @param {number} a
 * @param {number} b
 */
export function crossesTen(a, b) {
  return a >= 1 && a <= 9 && b >= 1 && b <= 9 && a + b > 10;
}

/**
 * Whether `c − b` is a subtraction across ten of the chapter: from a number
 * between 11 and 18, take away a one-digit number and land below 10.
 * @param {number} c
 * @param {number} b
 */
export function crossesTenDown(c, b) {
  return c >= 11 && c <= 18 && b >= 1 && b <= 9 && c - b < 10;
}

/**
 * The book's addition table across ten ("Bảng cộng (qua 10)"), by columns:
 * 9 + 2 to 9 + 9, then 8 + 3 to 8 + 9, down to 2 + 9. 36 facts.
 * @type {readonly Fact[]}
 */
export const ADD_TABLE = Object.freeze(
  [9, 8, 7, 6, 5, 4, 3, 2].flatMap((a) =>
    Array.from({ length: a - 1 }, (_, i) => ({ a, b: 11 - a + i })),
  ),
);

/**
 * The facts of the table that start with `a` (one column of the table).
 * @param {number} a
 * @returns {Fact[]}
 */
export function column(a) {
  return ADD_TABLE.filter((f) => f.a === a);
}

/**
 * How `a + b` makes ten: `fill` is what `a` needs to reach 10, `rest` what
 * is left of `b`.
 * @param {number} a
 * @param {number} b
 */
export function makeTen(a, b) {
  const fill = 10 - a;
  return { fill, rest: b - fill };
}

/**
 * The book's three steps for `a + b` across ten.
 * @param {number} a
 * @param {number} b
 * @returns {string[]}
 */
export function makeTenSteps(a, b) {
  const { fill, rest } = makeTen(a, b);
  return [`Tách ${b} = ${fill} + ${rest}.`, `${a} + ${fill} = 10.`, `10 + ${rest} = ${a + b}.`];
}

/**
 * How `c − b` passes ten: `first` takes `c` down to 10, `rest` is what is
 * still to take away from 10.
 * @param {number} c
 * @param {number} b
 */
export function downToTen(c, b) {
  const first = c - 10;
  return { first, rest: b - first };
}

/**
 * The book's three steps for `c − b` across ten.
 * @param {number} c
 * @param {number} b
 * @returns {string[]}
 */
export function downToTenSteps(c, b) {
  const { first, rest } = downToTen(c, b);
  return [
    `Tách ${b} = ${first} + ${rest}.`,
    `${c} ${MINUS} ${first} = 10.`,
    `10 ${MINUS} ${rest} = ${c - b}.`,
  ];
}

/**
 * The subtraction facts across ten: 11 − 2 to 11 − 9, 12 − 3 to 12 − 9, up
 * to 18 − 9. 36 facts, `{ c, b }` for `c − b`.
 * @type {ReadonlyArray<{ c: number, b: number }>}
 */
export const SUB_FACTS = Object.freeze(
  [11, 12, 13, 14, 15, 16, 17, 18].flatMap((c) =>
    Array.from({ length: 19 - c }, (_, i) => ({ c, b: c - 9 + i })),
  ),
);
