/**
 * Per-viewer practice progress. The "đã làm" tick is a convenience only, so
 * every storage access is wrapped: private windows, blocked site data or a
 * missing `localStorage` simply mean nothing is remembered. Also the
 * deterministic starting layouts of order and match exercises.
 */

import { rng, shuffle } from './drill.js';

const PREFIX = 'practice:';

/** @typedef {Pick<Storage, 'getItem' | 'setItem'>} SimpleStorage */

/** @returns {SimpleStorage | null} */
function defaultStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

/**
 * Indices of the exercises solved on this page, ignoring anything stored that
 * no longer fits the exercise list.
 * @param {string} key Page-unique key, such as the resolved lesson path.
 * @param {number} count Number of exercises on the page.
 * @param {SimpleStorage | null} [storage]
 * @returns {number[]}
 */
export function loadSolved(key, count, storage = defaultStorage()) {
  try {
    const raw = storage?.getItem(PREFIX + key);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter((i) => Number.isInteger(i) && i >= 0 && i < count);
    return [...new Set(valid)].sort((a, b) => a - b);
  } catch {
    return [];
  }
}

/**
 * @param {string} key
 * @param {number[]} solved
 * @param {SimpleStorage | null} [storage]
 * @returns {boolean} Whether the write went through.
 */
export function saveSolved(key, solved, storage = defaultStorage()) {
  try {
    if (!storage) return false;
    storage.setItem(PREFIX + key, JSON.stringify(solved));
    return true;
  } catch {
    return false;
  }
}

/**
 * Starting arrangement for an order exercise: the authored item order, or its
 * reverse when the authored order is already the answer. Deterministic, so the
 * prerendered HTML and the hydrated page agree.
 * @param {number[]} answer
 * @returns {number[]}
 */
export function scrambledOrder(answer) {
  const identity = answer.map((_, i) => i);
  const solved = identity.every((v, i) => v === answer[i]);
  return solved ? identity.reverse() : identity;
}

/**
 * A stable 32-bit id for an exercise, hashed (FNV-1a) from its prompt and
 * items, so the same exercise gets the same id on the server, in the browser
 * and on every visit.
 * @param {import('./content-schema.js').Exercise} exercise
 * @returns {number}
 */
export function exerciseSeed(exercise) {
  const parts = [exercise.type, exercise.prompt];
  if (exercise.type === 'match') parts.push(...exercise.left, ...exercise.right);
  let h = 0x811c9dc5;
  for (const ch of parts.join('\u0000')) {
    h ^= /** @type {number} */ (ch.codePointAt(0));
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Display order of a match exercise's right column: `order[row]` is the
 * right index shown on that row. Shuffled with a seed from the exercise, so
 * the prerendered HTML and the hydrated page agree and authors can list the
 * right items in any order (pairs keep their authored indices). A shuffle
 * that puts a left item level with its partner is drawn again, so the answer
 * never reads straight across.
 * @param {import('./content-schema.js').MatchExercise} exercise
 * @returns {number[]}
 */
export function matchOrder(exercise) {
  const rand = rng(exerciseSeed(exercise));
  const ids = exercise.right.map((_, i) => i);
  const partner = new Map(exercise.pairs.map(([l, r]) => [l, r]));
  const straight = (/** @type {number[]} */ order) =>
    order.some((r, row) => partner.get(row) === r);
  let order = shuffle(rand, ids);
  for (let tries = 0; straight(order) && tries < 50; tries++) order = shuffle(rand, ids);
  return order;
}
