/**
 * The card ordering game of "So sánh các số trong phạm vi 100 000": number
 * cards lie mixed on the table, and the child takes them one at a time into
 * a row, from the smallest to the largest or the other way round. Each card
 * taken is checked against the cards still on the table. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { compareWhy5 } from '../_shared/numbers-to-100000.js';

/** @typedef {'up' | 'down'} Direction */
/** @typedef {{ numbers: readonly number[], direction: Direction }} CardSet */

/** The sets of cards, in order; every set has distinct numbers. */
export const SETS = /** @type {ReadonlyArray<CardSet>} */ ([
  { numbers: [76200, 76199, 67200, 76020], direction: 'up' },
  { numbers: [58000, 85000, 50800, 80500], direction: 'down' },
  { numbers: [99999, 100000, 9999, 90999], direction: 'up' },
  { numbers: [42315, 42351, 43215, 41532], direction: 'down' },
  { numbers: [30507, 30075, 35007, 30750], direction: 'up' },
]);

/** @param {Direction} direction */
export const directionText = (direction) =>
  direction === 'up' ? 'từ bé đến lớn' : 'từ lớn đến bé';

/** @param {Direction} direction */
const extremeWord = (direction) => (direction === 'up' ? 'bé nhất' : 'lớn nhất');

/**
 * The cards still on the table.
 * @param {readonly number[]} numbers
 * @param {readonly number[]} row the cards already in the row
 */
export function left(numbers, row) {
  return numbers.filter((n) => !row.includes(n));
}

/**
 * The card that must come next in the row.
 * @param {readonly number[]} numbers
 * @param {readonly number[]} row
 * @param {Direction} direction
 */
export function nextCard(numbers, row, direction) {
  const rest = left(numbers, row);
  if (rest.length === 0) return null;
  return direction === 'up' ? Math.min(...rest) : Math.max(...rest);
}

/**
 * The verdict on a card the child took. A wrong card is not given away:
 * the child hears only that a smaller (or larger) card is still there.
 * @param {readonly number[]} numbers
 * @param {readonly number[]} row
 * @param {Direction} direction
 * @param {number} card
 * @returns {{ ok: boolean, row: number[], text: string }}
 */
export function take(numbers, row, direction, card) {
  const want = nextCard(numbers, row, direction);
  const word = extremeWord(direction);
  if (card === want) {
    const next = [...row, card];
    if (next.length === numbers.length) {
      const sign = direction === 'up' ? ' < ' : ' > ';
      return { ok: true, row: next, text: `Xong rồi! ${next.map(fmt).join(sign)}.` };
    }
    const among = row.length === 0 ? '' : ' trong các thẻ còn lại';
    return { ok: true, row: next, text: `Đúng rồi! ${fmt(card)} là số ${word}${among}.` };
  }
  const other = direction === 'up' ? 'bé hơn' : 'lớn hơn';
  return {
    ok: false,
    row: [...row],
    text: `Chưa đúng: trên bàn còn thẻ ${other} ${fmt(card)}. Em đếm chữ số, rồi so sánh từ hàng chục nghìn.`,
  };
}

/**
 * Why two cards next to each other in the finished row stand in that order,
 * one sentence per pair.
 * @param {readonly number[]} row
 */
export function rowReasons(row) {
  return row.slice(1).map((n, i) => compareWhy5(row[i], n));
}
