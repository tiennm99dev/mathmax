/**
 * Multiplying a three-digit number by a digit, column by column from the ones,
 * with the carries shown. Each column also answers on a block model: as many
 * rows as the multiplier, each row one copy of the number. Pure and DOM-free.
 */
import { PLACES, drawProduct, mulColumns } from '../_shared/columns.js';

/** @typedef {{ a: number, b: number }} Task */
/** @typedef {import('../_shared/columns.js').MulKind} TaskKind */

/** The name of each column of the answer, ones first. */
const COLUMN_NAMES = [...PLACES].reverse();

/**
 * The question for a column.
 * @param {Task} task
 * @param {number} column 0 for the ones, 1 for the tens, 2 for the hundreds
 */
export function askColumn({ a, b }, column) {
  const { value, carryIn } = mulColumns(a, b)[column];
  const name = `Hàng ${COLUMN_NAMES[column]}: ${b} nhân ${value}`;
  return carryIn > 0
    ? `${name}, rồi thêm ${carryIn} đã nhớ. Em viết chữ số nào?`
    : `${name}. Em viết chữ số nào?`;
}

/**
 * What a wrong digit gets: a nudge on the first try, the working after.
 * @param {Task} task
 * @param {number} column
 * @param {number} digit
 * @param {number} tries wrong tries on this column, this one included
 */
export function wrongMessage({ a, b }, column, digit, tries) {
  const { value, product, carryIn, carryOut, say } = mulColumns(a, b)[column];
  if (tries >= 2) return `Em xem nhé: ${say}.`;
  if (carryIn > 0 && digit === product % 10) return `Em quên thêm ${carryIn} đã nhớ rồi.`;
  if (carryOut > 0 && digit === carryOut) {
    return `Số ${carryOut} là số em nhớ sang hàng bên trái. Ở hàng này em viết chữ số khác.`;
  }
  return `Chưa đúng. Em tính lại ${b} nhân ${value}.`;
}

/**
 * What the finished multiplication says.
 * @param {Task} task
 */
export const doneMessage = ({ a, b }) => `${a} × ${b} = ${a * b}.`;

/**
 * What each finished column adds, as a calculation, ones first.
 * @param {Task} task
 */
export function partLines({ a, b }) {
  return mulColumns(a, b).map(({ value }, i) => {
    const part = value * 10 ** i;
    return `${part} × ${b} = ${part * b}`;
  });
}

/**
 * The closing sum of the parts.
 * @param {Task} task
 */
export function sumLine({ a, b }) {
  const parts = mulColumns(a, b).map(({ value }, i) => value * 10 ** i * b);
  return `${[...parts].reverse().join(' + ')} = ${a * b}`;
}

/**
 * The blocks of one row of the model: hundreds, tens and ones.
 * @param {Task} task
 */
export function rowBlocks({ a }) {
  return { hundreds: Math.floor(a / 100), tens: Math.floor(a / 10) % 10, ones: a % 10 };
}

/** @type {Record<TaskKind, Task>} */
const FIRST = { plain: { a: 213, b: 3 }, one: { a: 127, b: 3 }, two: { a: 164, b: 3 } };

/**
 * The first task of a kind.
 * @param {TaskKind} kind
 * @returns {Task}
 */
export const firstTask = (kind) => FIRST[kind];

/**
 * Another task of a kind.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @param {Task} [not]
 * @returns {Task}
 */
export const makeTask = (rand, kind, not) => drawProduct(rand, kind, not);
