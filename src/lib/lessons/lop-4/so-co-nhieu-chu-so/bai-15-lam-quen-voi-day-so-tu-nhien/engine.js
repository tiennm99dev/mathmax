/**
 * The sequence of natural numbers 0, 1, 2, 3, ... on a ray that scrolls
 * without end: a window of five ticks around the chosen number, its number
 * just before (liền trước) and just after (liền sau), and the taps of a
 * find-the-neighbour challenge. 0 has no number before it; every number
 * has one after it. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { TOP, readBig } from '../_shared/big-numbers.js';

/** How many ticks the ray shows at once. */
export const SPAN = 5;

/** The largest number the ray scrolls to, far past anything the lesson asks. */
export const LIMIT = 999999999999;

/** The jumps the ray offers, to show the sequence goes on and on. */
export const JUMPS = /** @type {const} */ ([1000, 1000000, 1000000000]);

/**
 * A natural number kept on the ray: whole, from 0 to LIMIT.
 * @param {number} n
 */
export const onRay = (n) => Math.min(LIMIT, Math.max(0, Math.round(n)));

/**
 * The ticks the ray shows around `n`: `n` in the middle, or from 0 when `n`
 * is too near the start.
 * @param {number} n
 * @returns {number[]}
 */
export function windowAround(n) {
  const half = Math.floor(SPAN / 2);
  const first = Math.min(Math.max(0, n - half), LIMIT - SPAN + 1);
  return Array.from({ length: SPAN }, (_, i) => first + i);
}

/**
 * The numbers just before and just after `n`; 0 has none before it.
 * @param {number} n
 * @returns {{ before: number | null, after: number }}
 */
export const neighbours = (n) => ({ before: n > 0 ? n - 1 : null, after: n + 1 });

/**
 * A number in words when the chapter can read it, else in digits.
 * @param {number} n
 */
export const spoken = (n) => (n <= TOP ? readBig(n) : fmt(n));

/**
 * What the ray says about the chosen number.
 * @param {number} n
 */
export function describe(n) {
  const { before, after } = neighbours(n);
  if (before === null) {
    return `Số 0 đứng đầu dãy. Không có số tự nhiên nào liền trước số 0, nên 0 là số tự nhiên bé nhất. Số liền sau của 0 là 1.`;
  }
  return `Số liền trước của ${fmt(n)} là ${fmt(before)} (bớt 1). Số liền sau của ${fmt(n)} là ${fmt(after)} (thêm 1).`;
}

/**
 * One challenge: find the number just before or just after `given`.
 * @typedef {{ given: number, ask: 'truoc' | 'sau' }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { given: 19, ask: 'sau' },
  { given: 100, ask: 'truoc' },
  { given: 9999, ask: 'sau' },
  { given: 10000, ask: 'truoc' },
  { given: 0, ask: 'truoc' },
  { given: 99999, ask: 'sau' },
  { given: 1000000, ask: 'truoc' },
  { given: 999999999, ask: 'sau' },
];

/**
 * The question of a task.
 * @param {Task} task
 */
export const taskText = (task) =>
  `Em chạm vào số liền ${task.ask === 'sau' ? 'sau' : 'trước'} của ${fmt(task.given)}.`;

/**
 * The right answer of a task, or null when there is none (before 0).
 * @param {Task} task
 */
export function taskAnswer(task) {
  const { before, after } = neighbours(task.given);
  return task.ask === 'sau' ? after : before;
}

/**
 * Checks a tap on a tick, or on "Không có" when `n` is null.
 * @param {Task} task
 * @param {number | null} n
 * @returns {{ ok: boolean, text: string }}
 */
export function checkTask(task, n) {
  const right = taskAnswer(task);
  const g = fmt(task.given);
  if (right === null) {
    return n === null
      ? { ok: true, text: 'Đúng rồi! Không có số tự nhiên nào liền trước số 0.' }
      : {
          ok: false,
          text: 'Chưa đúng. Số 0 đứng đầu dãy số tự nhiên. Bên trái số 0 còn số nào không?',
        };
  }
  if (n === right) {
    const how = task.ask === 'sau' ? `${g} + 1 = ${fmt(right)}` : `${g} − 1 = ${fmt(right)}`;
    return {
      ok: true,
      text: `Đúng rồi! ${how}. Số liền ${task.ask === 'sau' ? 'sau' : 'trước'} của ${g} là ${fmt(right)}.`,
    };
  }
  if (n === null) {
    return { ok: false, text: `Chưa đúng. Chỉ số 0 mới không có số liền trước. ${g} có đấy!` };
  }
  if (n === task.given) {
    return { ok: false, text: `Đó chính là số ${g}. Em tìm số đứng ngay cạnh nó nhé.` };
  }
  const side = n > task.given ? 'bên phải' : 'bên trái';
  const want = task.ask === 'sau' ? 'thêm 1' : 'bớt 1';
  return {
    ok: false,
    text: `Chưa đúng. ${fmt(n)} nằm ${side} ${g}. Số liền ${task.ask === 'sau' ? 'sau' : 'trước'} là số ${want} vào ${g}.`,
  };
}
