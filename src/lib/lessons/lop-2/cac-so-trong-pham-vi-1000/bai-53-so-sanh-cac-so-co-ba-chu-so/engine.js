/**
 * The card game of "So sánh các số có ba chữ số": the child taps the cards from
 * the smallest to the largest, and each tap is explained by comparing two
 * numbers place by place from the hundreds. Pure and DOM-free.
 */
import { PLACES, compareWhy, placesOf } from '../_shared/place-value.js';

/** @typedef {import('../_shared/place-value.js').PlaceKey} PlaceKey */
/** @typedef {{ a: number, b: number }} Compared */
/**
 * @typedef {object} Tap
 * @property {number[]} placed cards in the row so far
 * @property {Compared | null} compared the two numbers to look at
 * @property {'ok' | 'warn'} tone
 * @property {string} text
 */

/**
 * The sets of cards in the order they are dealt, from sets the hundreds mostly
 * decide to sets where the tens and ones decide and zero digits come in.
 */
export const ROUNDS = /** @type {ReadonlyArray<readonly number[]>} */ ([
  [396, 213, 579, 274],
  [325, 253, 352, 235],
  [601, 790, 599, 789],
  [478, 417, 475, 471],
  [814, 184, 841, 148],
  [350, 503, 305, 530],
]);

/**
 * The cards from the smallest to the largest.
 * @param {readonly number[]} cards
 */
export const sorted = (cards) => [...cards].sort((x, y) => x - y);

/**
 * The first place, from the hundreds, where two numbers differ.
 * @param {number} a
 * @param {number} b
 * @returns {PlaceKey | null}
 */
export function decidingPlace(a, b) {
  const x = placesOf(a);
  const y = placesOf(b);
  return PLACES.find((p) => x[p.key] !== y[p.key])?.key ?? null;
}

/**
 * The chain of a sorted row: "235 < 253 < 325".
 * @param {readonly number[]} row
 */
export const chain = (row) => row.join(' < ');

/**
 * The closest card below `n` among those not placed yet: it proves `n` was
 * tapped too early without giving away the smallest card every time.
 * @param {readonly number[]} cards
 * @param {readonly number[]} placed
 * @param {number} n
 * @returns {number | undefined}
 */
function closestBelow(cards, placed, n) {
  return sorted(cards)
    .filter((c) => c < n && !placed.includes(c))
    .at(-1);
}

/**
 * What a tap on card `n` does. A card already placed changes nothing and
 * gives null.
 * @param {readonly number[]} cards
 * @param {readonly number[]} placed
 * @param {number} n
 * @returns {Tap | null}
 */
export function tapCard(cards, placed, n) {
  if (placed.includes(n)) return null;
  const below = closestBelow(cards, placed, n);
  if (below !== undefined) {
    return {
      placed: [...placed],
      compared: { a: n, b: below },
      tone: 'warn',
      text: `Chưa đúng. Còn thẻ bé hơn ${n}. ${compareWhy(n, below)}`,
    };
  }
  const row = [...placed, n];
  const previous = placed.at(-1);
  const compared = previous === undefined ? null : { a: previous, b: n };
  if (row.length === cards.length) {
    return { placed: row, compared, tone: 'ok', text: `Xếp xong rồi! ${chain(row)}.` };
  }
  return {
    placed: row,
    compared,
    tone: 'ok',
    text:
      previous === undefined
        ? `Đúng rồi! ${n} là số bé nhất.`
        : `Đúng rồi! ${compareWhy(previous, n)}`,
  };
}
