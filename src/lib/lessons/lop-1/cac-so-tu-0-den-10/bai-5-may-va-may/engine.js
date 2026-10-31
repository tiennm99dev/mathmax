/**
 * Splitting a number into two parts and joining two parts back ("mấy và
 * mấy"): pure and DOM-free. Both parts hold at least one bead, so a total n
 * has n − 1 ways, counting 2 và 3 and 3 và 2 as two ways as the book does.
 */

/** Smallest and largest total the widget offers. */
export const MIN_TOTAL = 2;
export const MAX_TOTAL = 10;

/**
 * Every split of n into a left part and a right part, both at least 1.
 * @param {number} n
 * @returns {Array<[number, number]>}
 */
export function splits(n) {
  return Array.from({ length: Math.max(0, n - 1) }, (_, i) => [i + 1, n - i - 1]);
}

/**
 * The split sentence, such as "5 gồm 2 và 3".
 * @param {number} n
 * @param {number} left
 */
export function splitText(n, left) {
  return `${n} gồm ${left} và ${n - left}`;
}

/**
 * The join sentence, such as "2 và 3 gộp lại được 5".
 * @param {number} n
 * @param {number} left
 */
export function joinText(n, left) {
  return `${left} và ${n - left} gộp lại được ${n}`;
}

/**
 * Keeps the left part within 1..n − 1.
 * @param {number} n
 * @param {number} left
 */
export function clampLeft(n, left) {
  return Math.max(1, Math.min(n - 1, left));
}

/**
 * The set of found left parts after showing one more split.
 * @param {readonly number[]} found sorted left parts already seen
 * @param {number} left
 * @returns {number[]}
 */
export function remember(found, left) {
  return found.includes(left) ? [...found] : [...found, left].sort((x, y) => x - y);
}

/**
 * Progress line: how many of the n − 1 splits the child has seen.
 * @param {number} n
 * @param {number} seen
 */
export function progressText(n, seen) {
  const all = n - 1;
  return seen >= all
    ? `Em đã tìm đủ ${all} cách tách số ${n}!`
    : `Em đã tìm được ${seen} trong ${all} cách tách số ${n}. Kéo thanh trượt để tìm tiếp.`;
}
