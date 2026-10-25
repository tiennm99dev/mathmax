/**
 * Per-viewer practice progress. The "đã làm" tick is a convenience only, so
 * every storage access is wrapped: private windows, blocked site data or a
 * missing `localStorage` simply mean nothing is remembered.
 */

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
