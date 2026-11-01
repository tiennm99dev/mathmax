/**
 * The frog on the number ray of "Tia số. Số liền trước, số liền sau": the
 * frog stands on a number from 0 to 100, one hop back lands on the number
 * just before it, one hop forward on the number just after it. A window of
 * five numbers of the ray is shown and follows the frog. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** Smallest and largest number the frog may stand on. */
export const LO = 0;
export const HI = 100;
/** How many numbers of the ray are shown at once. */
export const SPAN = 5;

/**
 * Keeps a whole number within the ray.
 * @param {number} n
 */
export function clampRay(n) {
  return Math.max(LO, Math.min(HI, Math.round(n)));
}

/**
 * The first number of the shown window after the frog moves to `pos`: the
 * window stays put while the frog keeps a shown number on each side, and
 * slides just enough otherwise.
 * @param {number} start first shown number before the move
 * @param {number} pos
 */
export function slideWindow(start, pos) {
  let s = start;
  if (pos < s + 1) s = pos - 1;
  if (pos > s + SPAN - 2) s = pos - SPAN + 2;
  return Math.max(LO, Math.min(HI - SPAN + 1, s));
}

/**
 * The numbers shown from `start`.
 * @param {number} start
 */
export function shown(start) {
  return Array.from({ length: SPAN }, (_, i) => start + i);
}

/**
 * The number just before `n` (null for 0, which has none on the ray) and
 * the number just after it.
 * @param {number} n
 * @returns {{ before: number | null, after: number }}
 */
export function neighbours(n) {
  return { before: n > LO ? n - 1 : null, after: n + 1 };
}

/**
 * The four questions of the game, all answered by one hop from `n`:
 * - `sau`: hop to the number just after `n`;
 * - `truoc`: hop to the number just before `n`;
 * - `la-sau-cua`: `n` is just after which number? (hop back);
 * - `la-truoc-cua`: `n` is just before which number? (hop forward).
 * @typedef {'sau' | 'truoc' | 'la-sau-cua' | 'la-truoc-cua'} TaskKind
 * @typedef {{ kind: TaskKind, n: number }} Task
 */

/** @type {TaskKind[]} */
export const TASK_KINDS = ['sau', 'truoc', 'la-sau-cua', 'la-truoc-cua'];

/**
 * The number the frog must reach.
 * @param {Task} t
 */
export function targetOf(t) {
  return t.kind === 'sau' || t.kind === 'la-truoc-cua' ? t.n + 1 : t.n - 1;
}

/**
 * What the game asks.
 * @param {Task} t
 */
export function taskText(t) {
  switch (t.kind) {
    case 'sau':
      return `Ếch nhảy đến số liền sau của ${t.n}.`;
    case 'truoc':
      return `Ếch nhảy đến số liền trước của ${t.n}.`;
    case 'la-sau-cua':
      return `${t.n} là số liền sau của số nào? Ếch nhảy đến số đó.`;
    default:
      return `${t.n} là số liền trước của số nào? Ếch nhảy đến số đó.`;
  }
}

/**
 * A new task, different from `previous`; the frog starts on `n`.
 * @param {() => number} rand
 * @param {Task | null} [previous]
 * @returns {Task}
 */
export function makeTask(rand, previous = null) {
  for (let i = 0; i < 20; i++) {
    const t = { kind: TASK_KINDS[int(rand, 0, 3)], n: int(rand, 1, 99) };
    if (!previous || t.kind !== previous.kind || t.n !== previous.n) return t;
  }
  return { kind: 'sau', n: previous && previous.n < 99 ? previous.n + 1 : 1 };
}

/**
 * How the frog's position answers the task: `ask` while it has not moved,
 * `right` on the target, `wrong` elsewhere, with a sentence to show.
 * @param {Task} t
 * @param {number} pos
 * @returns {{ state: 'ask' | 'right' | 'wrong', text: string }}
 */
export function judge(t, pos) {
  const target = targetOf(t);
  if (pos === t.n) return { state: 'ask', text: `${taskText(t)} Ếch đang ở số ${t.n}.` };
  if (pos === target) {
    const fact =
      target > t.n
        ? `Số liền sau của ${t.n} là ${target}. ${t.n} + 1 = ${target}.`
        : `Số liền trước của ${t.n} là ${target}. ${t.n} − 1 = ${target}.`;
    return { state: 'right', text: `Đúng rồi! ${fact}` };
  }
  const forward = target > t.n;
  if (forward !== pos > t.n) {
    return {
      state: 'wrong',
      text: forward
        ? 'Chưa đúng. Số cần tìm lớn hơn, nó đứng ngay bên phải. Em nhảy tiến nhé.'
        : 'Chưa đúng. Số cần tìm bé hơn, nó đứng ngay bên trái. Em nhảy lùi nhé.',
    };
  }
  return {
    state: 'wrong',
    text: `Chưa đúng. Ếch đi xa quá rồi: số cần tìm chỉ cách ${t.n} một bước.`,
  };
}
