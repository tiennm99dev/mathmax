/**
 * Dividing a two-digit number by a one-digit number, starting from the tens:
 * each round asks for a quotient digit and what is left, while the base-ten
 * blocks are shared out the same way. The tens digit is never smaller than the
 * divisor, so the quotient has two digits. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { cells, divText } from '../_shared/division.js';

/** @typedef {{ n: number, d: number }} Task */
/** @typedef {'exact' | 'rest'} TaskKind */
/** @typedef {{ kind: 'digit' | 'rest', answer: number, partial: number, ask: string, say: string, product: number, digit: number }} Ask */

/**
 * The questions of a task in order: two for each digit of the dividend.
 * @param {Task} task
 * @returns {Ask[]}
 */
export function asksOf({ n, d }) {
  return numberDivide(n, d).rounds.flatMap(({ digit, partial, product, rest }) => {
    const times = `${digit} nhân ${d} bằng ${product}`;
    return [
      {
        kind: /** @type {const} */ ('digit'),
        answer: digit,
        partial,
        product,
        digit,
        ask: `${partial} chia ${d} được mấy?`,
        say: `${partial} chia ${d} được ${digit}, viết ${digit}.`,
      },
      {
        kind: /** @type {const} */ ('rest'),
        answer: rest,
        partial,
        product,
        digit,
        ask: `${times}. ${partial} trừ ${product} bằng mấy?`,
        say: `${times}; ${partial} trừ ${product} bằng ${rest}.`,
      },
    ];
  });
}

/**
 * The sentence for the next question, with the step just finished in front.
 * @param {Task} task
 * @param {number} stage questions answered so far
 */
export function stageMessage(task, stage) {
  const asks = asksOf(task);
  if (stage === 0) return `Em chia từ hàng chục. ${asks[0].ask}`;
  const last = asks[stage - 1];
  if (stage === asks.length)
    return `${last.say} Vậy ${divText(task.n, task.d)}. ${checkText(task)}`;
  const down = stage === 2 ? `Hạ ${task.n % 10}, được ${asks[2].partial}. ` : '';
  return `${last.say} ${down}${asks[stage].ask}`;
}

/**
 * Checking the result by multiplying back.
 * @param {Task} task
 */
export function checkText({ n, d }) {
  const q = Math.floor(n / d);
  const rest = n % d;
  return rest === 0
    ? `Thử lại: ${q} × ${d} = ${n}.`
    : `Thử lại: ${q} × ${d} = ${q * d}, ${q * d} + ${rest} = ${n}.`;
}

/**
 * What a wrong digit gets: a nudge on the first try, the working after.
 * @param {Task} task
 * @param {number} stage
 * @param {number} digit
 * @param {number} tries wrong tries on this question, this one included
 */
export function wrongMessage(task, stage, digit, tries) {
  const asked = asksOf(task)[stage];
  if (tries >= 2) return `Em xem nhé: ${asked.say}`;
  if (asked.kind === 'rest') return `Chưa đúng. Em trừ lại: ${asked.partial} − ${asked.product}.`;
  return digit * task.d > asked.partial
    ? `${digit} nhân ${task.d} bằng ${digit * task.d}, lớn hơn ${asked.partial}. Em thử số bé hơn.`
    : `${digit} nhân ${task.d} bằng ${digit * task.d}, vẫn chia được nữa. Em thử số lớn hơn.`;
}

/**
 * The lines of the sheet after `stage` answers.
 * @param {Task} task
 * @param {number} stage
 * @returns {import('../_shared/division.js').SheetRow[]}
 */
export function sheetRows({ n, d }, stage) {
  const [first, second] = numberDivide(n, d).rounds;
  /** @type {import('../_shared/division.js').SheetRow[]} */
  const rows = [{ ...cells(n), active: stage < 2 ? 't' : undefined }];
  if (stage >= 1) rows.push({ t: String(first.product), o: '', line: true });
  if (stage >= 2) {
    rows.push({ t: String(first.rest), o: String(n % 10), active: stage < 4 ? 'both' : undefined });
  }
  if (stage >= 3) rows.push({ ...cells(second.product), line: true });
  if (stage >= 4) rows.push(cells(second.rest));
  return rows;
}

/**
 * The quotient digits written after `stage` answers.
 * @param {Task} task
 * @param {number} stage
 */
export function quotientText({ n, d }, stage) {
  const [first, second] = numberDivide(n, d).rounds;
  if (stage < 1) return '';
  return stage < 3 ? String(first.digit) : `${first.digit}${second.digit}`;
}

/**
 * The blocks after `stage` answers: what is in the pile and in each group. Once
 * the tens are shared, those left over are broken into ones.
 * @param {Task} task
 * @param {number} stage
 */
export function blocksAt({ n, d }, stage) {
  const [first, second] = numberDivide(n, d).rounds;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const perTens = stage >= 1 ? first.digit : 0;
  const perOnes = stage >= 3 ? second.digit : 0;
  const broken = stage >= 2;
  return {
    perTens,
    perOnes,
    pileTens: broken ? 0 : tens - perTens * d,
    pileOnes: broken ? first.rest * 10 + ones - perOnes * d : ones,
  };
}

/** @type {Record<TaskKind, Task>} */
const FIRST = { exact: { n: 48, d: 2 }, rest: { n: 29, d: 2 } };

/**
 * The first task of a kind, from the book.
 * @param {TaskKind} kind
 */
export const firstTask = (kind) => FIRST[kind];

/**
 * A new task of a kind whose tens digit can be divided.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, d * 10, 99);
    const fits = kind === 'exact' ? n % d === 0 : n % d > 0;
    if (fits && (!not || not.n !== n || not.d !== d)) return { n, d };
  }
}
