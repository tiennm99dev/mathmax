/**
 * Multiplying a two-digit number by a one-digit number, split into tens and
 * ones as on the area model and written in columns the book's way ("3 nhân 6
 * bằng 18, viết 8 nhớ 1"). Results stay within 99. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** @typedef {{ a: number, b: number }} Task */
/** @typedef {'plain' | 'carry'} TaskKind */
/** @typedef {'ones' | 'tens'} Place */

/** @param {number} a */
export const tensOf = (a) => Math.floor(a / 10);
/** @param {number} a */
export const onesOf = (a) => a % 10;

/**
 * The carry out of the ones column.
 * @param {Task} task
 */
export const carryOf = ({ a, b }) => Math.floor((b * onesOf(a)) / 10);

/**
 * The digit written in a column.
 * @param {Task} task
 * @param {Place} place
 */
export function digitOf(task, place) {
  const { a, b } = task;
  return place === 'ones' ? (b * onesOf(a)) % 10 : b * tensOf(a) + carryOf(task);
}

/**
 * What the child says for a column.
 * @param {Task} task
 * @param {Place} place
 */
export function sayColumn(task, place) {
  const { a, b } = task;
  const carry = carryOf(task);
  const digit = digitOf(task, place);
  if (place === 'ones') {
    const said = `${b} nhân ${onesOf(a)} bằng ${b * onesOf(a)}, viết ${digit}`;
    return carry > 0 ? `${said}, nhớ ${carry}` : said;
  }
  const said = `${b} nhân ${tensOf(a)} bằng ${b * tensOf(a)}`;
  return carry > 0
    ? `${said}, thêm ${carry} bằng ${digit}, viết ${digit}`
    : `${said}, viết ${digit}`;
}

/**
 * The question for a column.
 * @param {Task} task
 * @param {Place} place
 */
export function askColumn(task, place) {
  const { a, b } = task;
  const carry = carryOf(task);
  if (place === 'ones') return `Hàng đơn vị: ${b} nhân ${onesOf(a)}. Em viết chữ số nào?`;
  return carry > 0
    ? `Hàng chục: ${b} nhân ${tensOf(a)}, rồi thêm ${carry} đã nhớ. Em viết chữ số nào?`
    : `Hàng chục: ${b} nhân ${tensOf(a)}. Em viết chữ số nào?`;
}

/**
 * What a wrong digit gets: a nudge on the first try, the whole working after.
 * @param {Task} task
 * @param {Place} place
 * @param {number} digit
 * @param {number} tries wrong tries on this column, this one included
 */
export function wrongMessage(task, place, digit, tries) {
  const { a, b } = task;
  if (tries >= 2) return `Em xem nhé: ${sayColumn(task, place)}.`;
  const carry = carryOf(task);
  if (place === 'tens') {
    if (carry > 0 && digit === b * tensOf(a)) return `Em quên thêm ${carry} đã nhớ rồi.`;
    return `Chưa đúng. Em đếm các ô màu xanh theo chục: ${b} hàng, mỗi hàng ${tensOf(a)} chục.`;
  }
  if (carry > 0 && digit === carry) {
    return `Số ${carry} là số chục, em nhớ sang hàng chục. Hàng đơn vị viết chữ số khác.`;
  }
  return `Chưa đúng. Em đếm các ô màu cam: ${b} hàng, mỗi hàng ${onesOf(a)} ô.`;
}

/**
 * The two parts of the area model, once worked out.
 * @param {Task} task
 */
export function partLines({ a, b }) {
  const tens = tensOf(a) * 10;
  const ones = onesOf(a);
  return {
    ones: `${ones} × ${b} = ${ones * b}`,
    tens: `${tens} × ${b} = ${tens * b}`,
    sum: `${tens * b} + ${ones * b} = ${a * b}`,
  };
}

/**
 * The area model laid out in a box `width` wide: one cell per unit, no taller
 * than `maxHeight`.
 * @param {Task} task
 * @param {number} width
 * @param {number} maxHeight
 */
export function areaLayout({ a, b }, width, maxHeight) {
  const cell = Math.min(width / a, maxHeight / b);
  return { cell, tensWidth: tensOf(a) * 10 * cell, onesWidth: onesOf(a) * cell, height: b * cell };
}

/** @type {Record<TaskKind, Task>} */
const FIRST = { plain: { a: 12, b: 3 }, carry: { a: 26, b: 3 } };

/**
 * The first task of a kind, from the book.
 * @param {TaskKind} kind
 * @returns {Task}
 */
export const firstTask = (kind) => FIRST[kind];

/**
 * A new task of a kind, with ones to split off and a result within 99.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, kind, not) {
  for (;;) {
    const task = { a: int(rand, 11, 49), b: int(rand, 2, 9) };
    const fits = task.a * task.b <= 99 && onesOf(task.a) > 0;
    const right = kind === 'carry' ? carryOf(task) > 0 : carryOf(task) === 0;
    const same = not && not.a === task.a && not.b === task.b;
    if (fits && right && !same) return task;
  }
}
