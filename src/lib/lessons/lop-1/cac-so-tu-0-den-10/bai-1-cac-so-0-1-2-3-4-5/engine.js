/**
 * Counting logic for the 0-5 counting tray: pure and DOM-free, so the widget
 * stays a thin view over it.
 */

/** Largest number this lesson counts to. */
export const MAX_COUNT = 5;

/** Vietnamese number words, indexed by value. */
export const NUMBER_WORDS = /** @type {const} */ (['không', 'một', 'hai', 'ba', 'bốn', 'năm']);

/** Number cards a child picks from: 0 to MAX_COUNT. */
export const CARDS = Array.from({ length: MAX_COUNT + 1 }, (_, i) => i);

/**
 * Picks a new target from 0 to MAX_COUNT that differs from the previous one,
 * so pressing "Bài khác" always changes the round.
 * @param {number | null} previous
 * @param {() => number} [random] Returns a number in [0, 1).
 * @returns {number}
 */
export function nextTarget(previous, random = Math.random) {
  const pool = CARDS.filter((n) => n !== previous);
  const i = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  return pool[i];
}

/**
 * How the tray compares with the target count.
 * @param {number} inTray
 * @param {number} target
 * @returns {'match' | 'add' | 'remove'}
 */
export function compareTray(inTray, target) {
  if (inTray === target) return 'match';
  return inTray < target ? 'add' : 'remove';
}

/**
 * Moves one object into or out of the tray, keeping the count in 0..MAX_COUNT.
 * @param {number} inTray
 * @param {'in' | 'out'} direction
 * @returns {number}
 */
export function moveObject(inTray, direction) {
  const next = direction === 'in' ? inTray + 1 : inTray - 1;
  return Math.max(0, Math.min(MAX_COUNT, next));
}

/**
 * Feedback sentence for the tray, read on screen and announced.
 * @param {number} inTray
 * @param {number} target
 * @param {string} noun Picture noun, such as "quả táo".
 */
export function trayMessage(inTray, target, noun) {
  const state = compareTray(inTray, target);
  if (state === 'match') {
    return inTray === 0
      ? 'Đúng rồi! Khay trống, không có đồ vật nào: đó là số 0.'
      : `Đúng rồi! Trong khay có ${inTray} ${noun}.`;
  }
  const diff = Math.abs(target - inTray);
  return state === 'add'
    ? `Trong khay có ${inTray}. Em thêm ${diff} ${noun} nữa nhé.`
    : `Trong khay có ${inTray}. Em bớt ra ${diff} ${noun} nhé.`;
}
