/**
 * Pairing logic for comparing two groups: each object of the top group is
 * joined to one object of the bottom group. When no more pairs can be made,
 * the group with objects left over has more. Pure and DOM-free.
 */

/** Most objects in one group, so a row fits on a 390 px screen. */
export const MAX_GROUP = 7;

/** @typedef {[top: number, bottom: number]} Pair */
/** @typedef {'top' | 'bottom'} Row */

/**
 * Joins top object `top` to bottom object `bottom`, unless either is already
 * joined; returns the same list when the pair is not allowed.
 * @param {readonly Pair[]} pairs
 * @param {number} top
 * @param {number} bottom
 * @returns {Pair[]}
 */
export function addPair(pairs, top, bottom) {
  if (pairs.some(([t, b]) => t === top || b === bottom)) return [...pairs];
  return [...pairs, [top, bottom]];
}

/**
 * Whether an object of one row is already joined.
 * @param {readonly Pair[]} pairs
 * @param {Row} row
 * @param {number} index
 */
export function isPaired(pairs, row, index) {
  return pairs.some((p) => p[row === 'top' ? 0 : 1] === index);
}

/**
 * How the top group compares with the bottom group.
 * @param {number} top
 * @param {number} bottom
 * @returns {'more' | 'less' | 'equal'}
 */
export function compareGroups(top, bottom) {
  if (top === bottom) return 'equal';
  return top > bottom ? 'more' : 'less';
}

/**
 * Whether every possible pair has been made.
 * @param {readonly Pair[]} pairs
 * @param {number} top
 * @param {number} bottom
 */
export function allPaired(pairs, top, bottom) {
  return pairs.length >= Math.min(top, bottom);
}

/**
 * The sentence that ends a round, once every possible pair is made.
 * @param {number} top
 * @param {number} bottom
 * @param {string} topNoun such as "con mèo"
 * @param {string} bottomNoun such as "con cá"
 */
export function resultMessage(top, bottom, topNoun, bottomNoun) {
  const state = compareGroups(top, bottom);
  if (state === 'equal') {
    return `Không còn thừa. Số ${topNoun} bằng số ${bottomNoun}.`;
  }
  const extra = Math.abs(top - bottom);
  return state === 'more'
    ? `Còn thừa ${extra} ${topNoun}. Số ${topNoun} nhiều hơn số ${bottomNoun}. Số ${bottomNoun} ít hơn số ${topNoun}.`
    : `Còn thừa ${extra} ${bottomNoun}. Số ${bottomNoun} nhiều hơn số ${topNoun}. Số ${topNoun} ít hơn số ${bottomNoun}.`;
}

/**
 * Feedback while the child is still joining pairs.
 * @param {number} made
 * @param {number} top
 * @param {number} bottom
 * @param {string} topNoun
 * @param {string} bottomNoun
 */
export function progressMessage(made, top, bottom, topNoun, bottomNoun) {
  if (made >= Math.min(top, bottom)) {
    return resultMessage(top, bottom, topNoun, bottomNoun);
  }
  return made === 0
    ? `Chạm một ${topNoun}, rồi chạm một ${bottomNoun} để nối chúng thành một cặp.`
    : `Đã nối ${made} cặp. Em nối tiếp nhé.`;
}

/**
 * Two group sizes for a new round, 1 to MAX_GROUP each; about one round in
 * four has equal groups so "bằng nhau" comes up often.
 * @param {() => number} [random]
 * @returns {[number, number]}
 */
export function newGroups(random = Math.random) {
  const top = 2 + Math.floor(random() * (MAX_GROUP - 1));
  if (random() < 0.25) return [top, top];
  let bottom = 1 + Math.floor(random() * (MAX_GROUP - 1));
  if (bottom >= top) bottom += 1;
  return [top, bottom];
}
