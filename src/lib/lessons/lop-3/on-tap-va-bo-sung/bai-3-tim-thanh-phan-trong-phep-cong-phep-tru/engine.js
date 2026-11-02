/**
 * Finding the missing number of an addition or a subtraction on a pan balance:
 * the whole sits on one pan and the two parts on the other. In an addition the
 * whole is the sum; in a subtraction it is the minuend, since the subtrahend and
 * the difference add up to it. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** @typedef {'so-hang' | 'so-bi-tru' | 'so-tru'} TaskKind */

/**
 * @typedef {{
 *   kind: TaskKind;
 *   left: string;
 *   right: string;
 *   result: string;
 *   answer: number;
 *   sentence: string;
 *   caption: string;
 *   pans: { left: Array<number | null>, right: Array<number | null> };
 * }} Task
 */

/** What each kind of task finds, with the book's rule. */
export const KINDS = /** @type {const} */ ({
  'so-hang': {
    label: 'Tìm số hạng',
    rule: 'Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia.',
  },
  'so-bi-tru': { label: 'Tìm số bị trừ', rule: 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.' },
  'so-tru': { label: 'Tìm số trừ', rule: 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.' },
});

/**
 * ? + known = sum.
 * @param {number} known
 * @param {number} sum
 * @returns {Task}
 */
export function addendTask(known, sum) {
  const answer = sum - known;
  return {
    kind: 'so-hang',
    left: '?',
    right: String(known),
    result: String(sum),
    answer,
    sentence: `? + ${known} = ${sum}`,
    caption: 'Đĩa trái là tổng. Đĩa phải là hai số hạng.',
    pans: { left: [sum], right: [null, known] },
  };
}

/**
 * ? − subtrahend = difference.
 * @param {number} subtrahend
 * @param {number} difference
 * @returns {Task}
 */
export function minuendTask(subtrahend, difference) {
  const answer = subtrahend + difference;
  return {
    kind: 'so-bi-tru',
    left: '?',
    right: String(subtrahend),
    result: String(difference),
    answer,
    sentence: `? − ${subtrahend} = ${difference}`,
    caption: 'Đĩa trái là số bị trừ. Đĩa phải là số trừ và hiệu.',
    pans: { left: [null], right: [subtrahend, difference] },
  };
}

/**
 * minuend − ? = difference.
 * @param {number} minuend
 * @param {number} difference
 * @returns {Task}
 */
export function subtrahendTask(minuend, difference) {
  const answer = minuend - difference;
  return {
    kind: 'so-tru',
    left: String(minuend),
    right: '?',
    result: String(difference),
    answer,
    sentence: `${minuend} − ? = ${difference}`,
    caption: 'Đĩa trái là số bị trừ. Đĩa phải là số trừ và hiệu.',
    pans: { left: [minuend], right: [null, difference] },
  };
}

/**
 * The calculation that finds the answer: "35 − 20 = 15".
 * @param {Task} task
 */
export function workingText(task) {
  const { kind, right, left, result, answer } = task;
  if (kind === 'so-hang') return `${result} − ${right} = ${answer}`;
  if (kind === 'so-bi-tru') return `${result} + ${right} = ${answer}`;
  return `${left} − ${result} = ${answer}`;
}

/**
 * The equation filled in with a value for the "?".
 * @param {Task} task
 * @param {number} value
 */
export function filledSentence(task, value) {
  return task.sentence.replace('?', String(value));
}

/**
 * Where the guess stands: 'low' while the "?" is too small, 'high' when it is
 * too big, 'right' on the answer.
 * @param {Task} task
 * @param {number} guess
 * @returns {'low' | 'high' | 'right'}
 */
export function judge(task, guess) {
  if (guess === task.answer) return 'right';
  return guess < task.answer ? 'low' : 'high';
}

/**
 * The live sentence under the balance.
 * @param {Task} task
 * @param {number} guess
 */
export function balanceMessage(task, guess) {
  const state = judge(task, guess);
  if (state === 'right') {
    return `Cân thăng bằng! ${filledSentence(task, guess)}. Em tính: ${workingText(task)}. ${KINDS[task.kind].rule}`;
  }
  const hasMissingOnLeft = task.pans.left.includes(null);
  const lower = hasMissingOnLeft === (state === 'low') ? 'phải' : 'trái';
  return `Đĩa bên ${lower} thấp hơn. Số ${guess} còn ${state === 'low' ? 'bé' : 'lớn'} quá.`;
}

/**
 * A new task of a kind, with the sizes of the book's calculations.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @returns {Task}
 */
export function makeTask(rand, kind) {
  const x = int(rand, 11, 60);
  const y = int(rand, 11, 60);
  if (kind === 'so-hang') return addendTask(x, x + y);
  if (kind === 'so-bi-tru') return minuendTask(x, y);
  return subtrahendTask(x + y, y);
}

/**
 * The first task of a kind, from the book.
 * @param {TaskKind} kind
 * @returns {Task}
 */
export function firstTask(kind) {
  if (kind === 'so-hang') return addendTask(20, 35);
  if (kind === 'so-bi-tru') return minuendTask(14, 25);
  return subtrahendTask(34, 12);
}
