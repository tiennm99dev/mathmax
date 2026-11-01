/**
 * "Hơn, kém nhau bao nhiêu": two rows of blocks side by side. Pairing the
 * blocks one to one leaves the extra blocks of the longer row; counting them
 * gives how much one number is more (hơn) than the other, which is the
 * larger number minus the smaller one. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** Fewest and most blocks in a row. */
export const MIN = 1;
export const MAX = 15;

/**
 * How the two rows compare.
 * @param {number} top
 * @param {number} bottom
 * @returns {{ diff: number, more: 'top' | 'bottom' | null }}
 */
export function compareRows(top, bottom) {
  if (top === bottom) return { diff: 0, more: null };
  return { diff: Math.abs(top - bottom), more: top > bottom ? 'top' : 'bottom' };
}

/**
 * Indices (0-based, from the left) of the extra blocks of a row: those
 * left without a partner in the other row.
 * @param {number} mine
 * @param {number} other
 * @returns {number[]}
 */
export function extraBlocks(mine, other) {
  return Array.from({ length: Math.max(0, mine - other) }, (_, i) => other + i);
}

/**
 * The question about the top row: "more by how many" when it is longer,
 * "fewer by how many" when shorter, "how many apart" when they are equal.
 * @param {number} top
 * @param {number} bottom
 */
export function question(top, bottom) {
  if (top > bottom) return 'Hàng trên nhiều hơn hàng dưới mấy khối?';
  if (top < bottom) return 'Hàng trên ít hơn hàng dưới mấy khối?';
  return 'Hai hàng hơn kém nhau mấy khối?';
}

/**
 * The full answer, the book's way: the subtraction, then "nhiều hơn" and
 * "ít hơn" both ways, and the numbers "hơn" and "kém".
 * @param {number} top
 * @param {number} bottom
 */
export function explain(top, bottom) {
  const { diff, more } = compareRows(top, bottom);
  if (more === null) {
    return `Hai hàng đều có ${top} khối. Hai hàng bằng nhau, không hàng nào nhiều hơn.`;
  }
  const big = Math.max(top, bottom);
  const small = Math.min(top, bottom);
  const [longer, shorter] =
    more === 'top' ? ['Hàng trên', 'hàng dưới'] : ['Hàng dưới', 'hàng trên'];
  const shorterCap = shorter.charAt(0).toUpperCase() + shorter.slice(1);
  return `${big} − ${small} = ${diff}. ${longer} nhiều hơn ${shorter} ${diff} khối. ${shorterCap} ít hơn ${longer.toLowerCase()} ${diff} khối. ${big} hơn ${small} là ${diff}, ${small} kém ${big} là ${diff}.`;
}

/**
 * Up to three answer options near the difference, in increasing order. They
 * include the mistake of answering with a row's own count when it fits.
 * @param {() => number} rand
 * @param {number} top
 * @param {number} bottom
 * @returns {{ options: number[], answer: number }}
 */
export function answerOptions(rand, top, bottom) {
  const { diff } = compareRows(top, bottom);
  const pool = [diff - 1, diff + 1, diff + 2, Math.max(top, bottom)].filter(
    (v) => v >= 0 && v !== diff,
  );
  const unique = [...new Set(pool)];
  const first = unique.splice(int(rand, 0, unique.length - 1), 1)[0];
  const second = unique[int(rand, 0, unique.length - 1)];
  const options = [diff, first, second].filter((v, i, all) => all.indexOf(v) === i);
  options.sort((x, y) => x - y);
  return { options, answer: options.indexOf(diff) };
}

/**
 * Two new row lengths, not both the same as before; equal rows are rare.
 * @param {() => number} rand
 * @param {{ top: number, bottom: number }} [previous]
 */
export function newRows(rand, previous) {
  for (let i = 0; i < 20; i++) {
    const top = int(rand, 3, 12);
    const bottom = rand() < 0.1 ? top : int(rand, 3, 12);
    if (!previous || top !== previous.top || bottom !== previous.bottom) return { top, bottom };
  }
  return { top: 9, bottom: 6 };
}
