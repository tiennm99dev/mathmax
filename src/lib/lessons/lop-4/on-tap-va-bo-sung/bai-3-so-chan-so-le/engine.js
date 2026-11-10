/**
 * Even and odd by pairing: a number of things is lined up two by two; when
 * every thing has a partner the number is even (số chẵn), when one is left
 * alone it is odd (số lẻ). The last digit tells the same. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'chẵn' | 'lẻ'} Parity */

/**
 * The counts the child pairs up, each with the picture drawn.
 * @type {ReadonlyArray<{ count: number, picture: import('#lib/core/kid/pictures/index.js').PictureName, name: string }>}
 */
export const ROUNDS = [
  { count: 6, picture: 'apple', name: 'quả táo' },
  { count: 9, picture: 'fish', name: 'con cá' },
  { count: 12, picture: 'flower', name: 'bông hoa' },
  { count: 7, picture: 'chick', name: 'con gà con' },
  { count: 10, picture: 'balloon', name: 'quả bóng bay' },
  { count: 15, picture: 'star', name: 'ngôi sao' },
  { count: 16, picture: 'butterfly', name: 'con bướm' },
  { count: 13, picture: 'rabbit', name: 'con thỏ' },
];

/**
 * Even or odd.
 * @param {number} n a natural number
 * @returns {Parity}
 */
export const parityOf = (n) => (n % 2 === 0 ? 'chẵn' : 'lẻ');

/**
 * The last digit of a natural number.
 * @param {number} n
 */
export const lastDigit = (n) => n % 10;

/**
 * How `n` things line up in pairs.
 * @param {number} n
 * @returns {{ pairs: number, left: number }}
 */
export const pairsOf = (n) => ({ pairs: Math.floor(n / 2), left: n % 2 });

/**
 * What pairing `n` things shows, in one sentence.
 * @param {number} n
 * @param {string} name what the things are
 */
export function pairingText(n, name) {
  const { pairs, left } = pairsOf(n);
  return left === 0
    ? `${n} ${name} xếp được ${pairs} cặp, không còn thừa ${name} nào.`
    : `${n} ${name} xếp được ${pairs} cặp, còn thừa 1 ${name}.`;
}

/**
 * The reason a number is even or odd, from its last digit.
 * @param {number} n
 */
export function digitReason(n) {
  return `${fmt(n)} có chữ số tận cùng là ${lastDigit(n)}, nên ${fmt(n)} là số ${parityOf(n)}.`;
}

/**
 * The feedback for the child's answer.
 * @param {number} n
 * @param {Parity} said
 * @param {boolean} paired whether the things are lined up in pairs yet
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function verdict(n, said, paired) {
  if (said === parityOf(n)) {
    return { tone: 'ok', text: `Đúng rồi! ${n} là số ${said}. ${digitReason(n)}` };
  }
  return {
    tone: 'warn',
    text: paired
      ? 'Chưa đúng. Em xem còn thừa ra đồ vật nào không có cặp không?'
      : 'Chưa đúng. Em bấm "Xếp thành từng cặp" rồi xem có còn thừa đồ vật nào không.',
  };
}

/**
 * The even and the odd numbers from `from` to `to`.
 * @param {number} from
 * @param {number} to
 */
export function splitRange(from, to) {
  /** @type {number[]} */
  const even = [];
  /** @type {number[]} */
  const odd = [];
  for (let n = from; n <= to; n++) (n % 2 === 0 ? even : odd).push(n);
  return { even, odd };
}
