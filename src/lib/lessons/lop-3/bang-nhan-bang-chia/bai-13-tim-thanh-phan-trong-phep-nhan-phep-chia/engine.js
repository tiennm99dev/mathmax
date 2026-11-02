/**
 * The mystery box: a multiplication or division with a number hidden in a box.
 * Every task reads as rows of dots against a target number of dots, so a guess
 * shows how many dots are missing or too many and the box opens on the right
 * number. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';

/** @typedef {'thua-so' | 'so-bi-chia' | 'so-chia'} TaskKind */

/**
 * A task. `before`, `op`, `after` and `result` write the sentence, with null at
 * the box. `perRow` is the dots of a row and `target` the dots needed.
 * @typedef {{
 *   kind: TaskKind;
 *   before: number | null;
 *   op: '×' | ':';
 *   after: number | null;
 *   result: number;
 *   answer: number;
 *   perRow: number;
 *   target: number;
 *   maxGuess: number;
 * }} Task
 */

/** What each kind of task finds, with the book's rule. */
export const KINDS = /** @type {const} */ ({
  'thua-so': {
    label: 'Tìm thừa số',
    rule: 'Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.',
  },
  'so-bi-chia': {
    label: 'Tìm số bị chia',
    rule: 'Muốn tìm số bị chia, ta lấy thương nhân với số chia.',
  },
  'so-chia': {
    label: 'Tìm số chia',
    rule: 'Muốn tìm số chia, ta lấy số bị chia chia cho thương.',
  },
});

/** The largest number of rows a guess may draw for a factor or a divisor. */
const MAX_ROWS = 12;

/**
 * ? × known = product, or known × ? = product with `first` false.
 * @param {number} known
 * @param {number} product
 * @param {boolean} [first]
 * @returns {Task}
 */
export function factorTask(known, product, first = true) {
  return {
    kind: 'thua-so',
    before: first ? null : known,
    op: '×',
    after: first ? known : null,
    result: product,
    answer: product / known,
    perRow: known,
    target: product,
    maxGuess: MAX_ROWS,
  };
}

/**
 * ? : divisor = quotient.
 * @param {number} divisor
 * @param {number} quotient
 * @returns {Task}
 */
export function dividendTask(divisor, quotient) {
  return {
    kind: 'so-bi-chia',
    before: null,
    op: ':',
    after: divisor,
    result: quotient,
    answer: divisor * quotient,
    perRow: quotient,
    target: divisor * quotient,
    maxGuess: 100,
  };
}

/**
 * dividend : ? = quotient.
 * @param {number} dividend
 * @param {number} quotient
 * @returns {Task}
 */
export function divisorTask(dividend, quotient) {
  return {
    kind: 'so-chia',
    before: dividend,
    op: ':',
    after: null,
    result: quotient,
    answer: dividend / quotient,
    perRow: quotient,
    target: dividend,
    maxGuess: MAX_ROWS,
  };
}

/**
 * The sentence, with `box` in place of the hidden number.
 * @param {Task} task
 * @param {string | number} [box]
 */
export function sentence(task, box = '?') {
  return `${task.before ?? box} ${task.op} ${task.after ?? box} = ${task.result}`;
}

/**
 * The dots a guess draws.
 * @param {Task} task
 * @param {number} guess
 */
export function dotsOf(task, guess) {
  return task.kind === 'so-bi-chia' ? guess : guess * task.perRow;
}

/**
 * The dots in rows: `in` a dot of the target that the guess reached, `empty` one
 * it has not, `extra` one beyond the target.
 * @param {Task} task
 * @param {number} guess
 * @returns {Array<Array<'in' | 'empty' | 'extra'>>}
 */
export function dotRows(task, guess) {
  const dots = dotsOf(task, guess);
  const total = Math.max(dots, task.target);
  /** @type {Array<Array<'in' | 'empty' | 'extra'>>} */
  const rows = [];
  for (let i = 0; i < total; i++) {
    if (i % task.perRow === 0) rows.push([]);
    const state = i >= task.target ? 'extra' : i < dots ? 'in' : 'empty';
    rows[rows.length - 1].push(state);
  }
  return rows;
}

/**
 * Where the guess stands.
 * @param {Task} task
 * @param {number} guess
 * @returns {'low' | 'high' | 'right'}
 */
export function judge(task, guess) {
  if (guess === task.answer) return 'right';
  return guess < task.answer ? 'low' : 'high';
}

/**
 * The calculation that finds the hidden number: "28 : 4 = 7".
 * @param {Task} task
 */
export function workingText(task) {
  if (task.kind === 'thua-so') {
    const known = task.before ?? task.after;
    return `${task.result} : ${known} = ${task.answer}`;
  }
  if (task.kind === 'so-bi-chia') return `${task.result} × ${task.after} = ${task.answer}`;
  return `${task.before} : ${task.result} = ${task.answer}`;
}

/**
 * The live sentence under the dots.
 * @param {Task} task
 * @param {number} guess
 */
export function boxMessage(task, guess) {
  const state = judge(task, guess);
  if (state === 'right') {
    return `Hộp mở rồi! ${sentence(task, guess)}. Em tính: ${workingText(task)}. ${KINDS[task.kind].rule}`;
  }
  const gap = Math.abs(dotsOf(task, guess) - task.target);
  return state === 'low'
    ? `Số ${guess} còn bé quá: thiếu ${gap} chấm.`
    : `Số ${guess} lớn quá: thừa ${gap} chấm.`;
}

/** What the dots stand for, for each kind of task. */
export const CAPTIONS = /** @type {const} */ ({
  'thua-so': 'Số trong hộp là số hàng. Em cần đủ các chấm của tích.',
  'so-bi-chia': 'Số trong hộp là số chấm. Mỗi hàng là một phần, em cần đủ tất cả các hàng.',
  'so-chia': 'Số trong hộp là số hàng. Em cần đủ các chấm của số bị chia.',
});

/**
 * A new task of a kind from the tables up to 9, different from `not`.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, kind, not) {
  for (;;) {
    const a = int(rand, 2, 9);
    const b = int(rand, 2, 9);
    let task;
    if (kind === 'thua-so') task = factorTask(a, a * b, pick(rand, [true, false]));
    else if (kind === 'so-bi-chia') task = dividendTask(a, b);
    else task = divisorTask(a * b, b);
    if (!not || sentence(task) !== sentence(not)) return task;
  }
}

/**
 * The first task of a kind, from the book.
 * @param {TaskKind} kind
 * @returns {Task}
 */
export function firstTask(kind) {
  if (kind === 'thua-so') return factorTask(4, 28);
  if (kind === 'so-bi-chia') return dividendTask(3, 5);
  return divisorTask(15, 5);
}
