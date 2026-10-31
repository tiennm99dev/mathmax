/**
 * Birds on a branch for subtraction within 10: tapping a bird makes it fly
 * away (bớt đi) or hop down to the ground (tách ra), and the subtraction
 * n − k = r follows every tap, with the two cases the book points out,
 * n − 0 = n and n − n = 0. Pure and DOM-free.
 */
import { subText, subWords } from '../_shared/arith.js';

/** @typedef {'bot' | 'tach'} Mode */

/** Fewest and most birds on the branch. */
export const MIN_BIRDS = 1;
export const MAX_BIRDS = 10;

/**
 * A fresh branch: n birds, none gone.
 * @param {number} n
 * @returns {boolean[]}
 */
export function freshBranch(n) {
  return Array.from({ length: n }, () => false);
}

/**
 * The branch after tapping bird i: it leaves, or comes back if it had left.
 * @param {readonly boolean[]} gone
 * @param {number} i
 * @returns {boolean[]}
 */
export function toggleBird(gone, i) {
  return gone.map((g, j) => (j === i ? !g : g));
}

/**
 * How many birds have left.
 * @param {readonly boolean[]} gone
 */
export function countGone(gone) {
  return gone.filter(Boolean).length;
}

/**
 * The story of the picture with its subtraction.
 * @param {Mode} mode
 * @param {number} n birds at the start
 * @param {number} k birds that left
 */
export function story(mode, n, k) {
  const r = n - k;
  const left = r === 0 ? 'không còn con nào' : `còn lại ${r} con`;
  if (mode === 'bot') {
    const flew = k === 0 ? 'Chưa con nào bay đi' : `${k} con bay đi`;
    return `Trên cành có ${n} con chim. ${flew}. Trên cành ${left}. Ta viết ${subText(n, k)}.`;
  }
  const down = k === 0 ? 'Chưa tách con nào xuống đất' : `Tách ra ${k} con xuống đất`;
  return `Có ${n} con chim. ${down}. Trên cành ${left}. Ta viết ${subText(n, k)}.`;
}

/**
 * The extra note for the two zero cases, or an empty string.
 * @param {number} n
 * @param {number} k
 */
export function zeroNote(n, k) {
  if (k === 0) return `Một số trừ đi 0 thì bằng chính số đó: ${subText(n, 0)}.`;
  if (k === n) return `Một số trừ đi chính nó thì bằng 0: ${subText(n, n)}.`;
  return '';
}

/**
 * The whole feedback line read aloud after a tap.
 * @param {Mode} mode
 * @param {number} n
 * @param {number} k
 */
export function feedback(mode, n, k) {
  const note = zeroNote(n, k);
  return `${story(mode, n, k)} Đọc là: ${subWords(n, k)}.${note ? ` ${note}` : ''}`;
}
