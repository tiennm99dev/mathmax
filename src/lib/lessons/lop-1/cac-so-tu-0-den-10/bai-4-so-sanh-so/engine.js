/**
 * Comparing two numbers from 0 to 10 with the signs >, < and =: pure and
 * DOM-free. The crocodile picture opens its mouth towards the larger number,
 * so its jaws draw the sign.
 */
import { TOP, capitalWord, wordOf } from '../_shared/number-words.js';

/** @typedef {'>' | '<' | '='} Sign */

/** The three signs, in the order the buttons show them. */
export const SIGNS = /** @type {const} */ (['>', '<', '=']);

/** How each sign is read. */
export const SIGN_WORDS = /** @type {const} */ ({
  '>': 'lớn hơn',
  '<': 'bé hơn',
  '=': 'bằng',
});

/**
 * The sign that goes between a and b.
 * @param {number} a
 * @param {number} b
 * @returns {Sign}
 */
export function compare(a, b) {
  if (a === b) return '=';
  return a > b ? '>' : '<';
}

/**
 * The comparison read aloud, such as "7 > 4. Bảy lớn hơn bốn."
 * @param {number} a
 * @param {number} b
 */
export function sentence(a, b) {
  const s = compare(a, b);
  return `${a} ${s} ${b}. ${capitalWord(a)} ${SIGN_WORDS[s]} ${wordOf(b)}.`;
}

/**
 * Where the crocodile's mouth opens: to the left number, to the right one,
 * or closed when they are equal.
 * @param {number} a
 * @param {number} b
 * @returns {'left' | 'right' | 'closed'}
 */
export function mouthFacing(a, b) {
  const s = compare(a, b);
  if (s === '=') return 'closed';
  return s === '>' ? 'left' : 'right';
}

/**
 * Feedback after the child picks a sign in a quiz round.
 * @param {number} a
 * @param {number} b
 * @param {Sign} picked
 */
export function checkSign(a, b, picked) {
  const right = compare(a, b);
  if (picked === right) return { ok: true, text: `Đúng rồi! ${sentence(a, b)}` };
  if (right === '=') {
    return { ok: false, text: 'Chưa đúng. Hai số giống nhau thì dùng dấu nào?' };
  }
  const big = Math.max(a, b);
  return {
    ok: false,
    text: `Chưa đúng. Số ${big} lớn hơn. Miệng cá sấu luôn há về phía số lớn hơn.`,
  };
}

/**
 * A pair of numbers for a quiz round, from 0 to 10, different from the last
 * pair; about one round in five has equal numbers.
 * @param {[number, number] | null} previous
 * @param {() => number} [random]
 * @returns {[number, number]}
 */
export function newPair(previous, random = Math.random) {
  for (let tries = 0; tries < 20; tries++) {
    const a = Math.floor(random() * (TOP + 1));
    const b = random() < 0.2 ? a : Math.floor(random() * (TOP + 1));
    if (!previous || previous[0] !== a || previous[1] !== b) return [a, b];
  }
  return previous && previous[0] === 3 ? [5, 2] : [3, 7];
}
