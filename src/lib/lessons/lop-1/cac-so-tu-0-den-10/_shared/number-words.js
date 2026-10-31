/**
 * Vietnamese words for the numbers 0 to 10, the range of this chapter, as a
 * grade 1 child reads them aloud.
 */

/** Largest number of the chapter. */
export const TOP = 10;

/** Number words, indexed by value. */
export const NUMBER_WORDS = /** @type {const} */ ([
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
]);

/**
 * The word for a number from 0 to 10.
 * @param {number} n
 * @returns {string}
 */
export function wordOf(n) {
  return NUMBER_WORDS[n] ?? String(n);
}

/**
 * A word with its first letter in upper case, to start a sentence.
 * @param {number} n
 */
export function capitalWord(n) {
  const w = wordOf(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/**
 * Picks a whole number from lo to hi that differs from `previous`, so a
 * "Bài khác" button always changes the round.
 * @param {number} lo
 * @param {number} hi
 * @param {number | null} previous
 * @param {() => number} [random] Returns a number in [0, 1).
 */
export function freshInt(lo, hi, previous, random = Math.random) {
  const pool = [];
  for (let n = lo; n <= hi; n++) if (n !== previous) pool.push(n);
  if (pool.length === 0) return lo;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}
