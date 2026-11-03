/**
 * Dividing a three-digit number by a digit, from the left: each round asks for
 * a quotient digit and what is left, and the child brings the next digit down.
 * The sheet is built from the steps done so far, set out in columns as the book
 * prints it. Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { PLACES, checkText, divText, drawDivision } from '../_shared/columns.js';

/** @typedef {{ n: number, d: number }} Task */
/** @typedef {import('../_shared/columns.js').DivKind} TaskKind */

/**
 * One step of the division.
 * @typedef {object} Step
 * @property {'digit' | 'rest' | 'down'} kind
 * @property {number} round which round of the division it belongs to
 * @property {number} partial the number being divided in that round
 * @property {number} digit the quotient digit of that round
 * @property {number} product the digit times the divisor
 * @property {number} rest what is left after that round
 * @property {number} end the column of the dividend the round stops at
 * @property {number} answer the digit to pick; for `down`, the digit brought down
 */

/**
 * One line of the sheet. `cells` holds the hundreds, tens and ones columns,
 * `line` rules a line under it, `active` tints those columns and `fly` is the
 * column whose digit has just come down from the dividend.
 * @typedef {{ cells: string[], line?: boolean, active?: number[], fly?: number }} Row
 */

/**
 * The steps of a task, in order.
 * @param {Task} task
 * @returns {Step[]}
 */
export function stepsOf({ n, d }) {
  const digits = String(n).split('').map(Number);
  const { rounds } = numberDivide(n, d);
  return rounds.flatMap((r, round) => {
    const base = { round, ...r };
    /** @type {Step[]} */
    const steps = [
      { ...base, kind: 'digit', answer: r.digit },
      { ...base, kind: 'rest', answer: r.rest },
    ];
    if (round < rounds.length - 1) {
      steps.push({ ...base, kind: 'down', answer: digits[r.end + 1] });
    }
    return steps;
  });
}

/**
 * A number written so that its last digit sits in column `end`.
 * @param {number} value
 * @param {number} end
 */
function cellsEnding(value, end) {
  const cells = ['', '', ''];
  String(value)
    .split('')
    .reverse()
    .forEach((digit, i) => {
      cells[end - i] = digit;
    });
  return cells;
}

/**
 * The columns a number being divided takes up.
 * @param {number} partial
 * @param {number} end
 */
function columnsOf(partial, end) {
  return partial >= 10 ? [end - 1, end] : [end];
}

/**
 * The lines of the sheet after `stage` steps.
 * @param {Task} task
 * @param {number} stage
 * @returns {Row[]}
 */
export function sheetRows(task, stage) {
  const steps = stepsOf(task);
  /** @type {Row[]} */
  const rows = [{ cells: String(task.n).split('') }];
  /** Which line holds the number the current round divides. */
  let partialRow = 0;
  steps.slice(0, stage).forEach((step) => {
    if (step.kind === 'digit') {
      rows.push({ cells: cellsEnding(step.product, step.end), line: true });
    } else if (step.kind === 'rest') {
      rows.push({ cells: cellsEnding(step.rest, step.end) });
    } else {
      const last = rows[rows.length - 1];
      last.cells[step.end + 1] = String(step.answer);
      last.fly = step.end + 1;
      partialRow = rows.length - 1;
    }
  });
  const next = steps[stage];
  if (next?.kind === 'down') {
    rows[0] = { ...rows[0], active: [next.end + 1] };
  } else if (next) {
    const row = rows[partialRow];
    rows[partialRow] = { ...row, active: columnsOf(next.partial, next.end) };
  }
  return rows;
}

/**
 * The quotient digits written after `stage` steps.
 * @param {Task} task
 * @param {number} stage
 */
export function quotientText(task, stage) {
  return stepsOf(task)
    .slice(0, stage)
    .filter((s) => s.kind === 'digit')
    .map((s) => s.digit)
    .join('');
}

/**
 * What a finished step says.
 * @param {Step} step
 * @param {number} d
 */
function sayStep(step, d) {
  const { kind, partial, digit, product, rest, answer } = step;
  if (kind === 'digit') {
    const hold = digit === 0 ? ` Chữ số 0 giữ chỗ hàng ${PLACES[step.end]}.` : '';
    return `${partial} chia ${d} được ${digit}, viết ${digit}.${hold}`;
  }
  if (kind === 'rest') {
    return `${digit} nhân ${d} bằng ${product}; ${partial} trừ ${product} bằng ${rest}.`;
  }
  return `Hạ ${answer}, được ${rest * 10 + answer}.`;
}

/**
 * What a step asks for.
 * @param {Step} step
 * @param {number} d
 */
function askStep(step, d) {
  const { kind, partial, digit, product, answer } = step;
  if (kind === 'digit') return `${partial} chia ${d} được mấy?`;
  if (kind === 'rest')
    return `${digit} nhân ${d} bằng ${product}. ${partial} trừ ${product} bằng mấy?`;
  return `Em hạ ${answer} xuống.`;
}

/**
 * The sentence for a stage: the step just finished, then the next question.
 * @param {Task} task
 * @param {number} stage
 */
export function stageMessage(task, stage) {
  const steps = stepsOf(task);
  const { n, d } = task;
  if (stage >= steps.length) {
    return `${sayStep(steps[steps.length - 1], d)} Vậy ${divText(n, d)}. ${checkText(n, d)}`;
  }
  if (stage === 0) {
    const first = steps[0];
    const start =
      first.end === 0
        ? 'Em chia từ hàng trăm.'
        : `${String(n)[0]} bé hơn ${d}, nên em lấy ${first.partial} để chia.`;
    return `${start} ${askStep(first, d)}`;
  }
  return `${sayStep(steps[stage - 1], d)} ${askStep(steps[stage], d)}`;
}

/**
 * What a wrong digit gets: a nudge on the first try, the working after.
 * @param {Task} task
 * @param {number} stage
 * @param {number} digit
 * @param {number} tries wrong tries on this step, this one included
 */
export function wrongMessage(task, stage, digit, tries) {
  const step = stepsOf(task)[stage];
  const { d } = task;
  if (tries >= 2) return `Em xem nhé: ${sayStep(step, d)}`;
  if (step.kind === 'rest') return `Chưa đúng. Em trừ lại: ${step.partial} − ${step.product}.`;
  return digit * d > step.partial
    ? `${digit} nhân ${d} bằng ${digit * d}, lớn hơn ${step.partial}. Em thử số bé hơn.`
    : `${digit} nhân ${d} bằng ${digit * d}, vẫn chia được nữa. Em thử số lớn hơn.`;
}

/**
 * What each finished round means, hundreds, tens or ones at a time.
 * @param {Task} task
 * @param {number} stage
 * @returns {string[]}
 */
export function roundLines(task, stage) {
  return stepsOf(task)
    .slice(0, stage)
    .filter((s) => s.kind === 'rest')
    .map(({ partial, digit, rest, end }) => {
      const place = PLACES[end];
      const left = rest > 0 ? `, còn ${rest} ${place}` : '';
      return `${partial} ${place} : ${task.d} = ${digit} ${place}${left}`;
    });
}

/** @type {Record<TaskKind, Task>} */
const FIRST = {
  exact: { n: 396, d: 3 },
  rest: { n: 538, d: 4 },
  zero: { n: 518, d: 5 },
  two: { n: 354, d: 6 },
};

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
export const makeTask = (rand, kind, not) => drawDivision(rand, kind, not);
