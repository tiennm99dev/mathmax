/**
 * "Bảng cộng (qua 10)" as timed flash cards: a deck of ten facts from the
 * table (all of it, or some of its columns), each card answered by a tap
 * and flipped to show the sum and how it makes ten. The round ends with the
 * score, the time and the facts to learn again. Decks are built from a
 * seed, so the first deck is the same on the server and in the browser.
 * Pure and DOM-free.
 */
import { rng, shuffle } from '#lib/core/drill.js';
import { numberOptions } from '#lib/core/kid/quiz.js';
import { ADD_TABLE, makeTenSteps } from '../_shared/facts.js';

/** Parts of the table a deck can come from, by first number. */
export const GROUPS = /** @type {const} */ ([
  { value: 'tat-ca', label: 'Cả bảng', starts: [9, 8, 7, 6, 5, 4, 3, 2] },
  { value: '9-8', label: '9 cộng, 8 cộng', starts: [9, 8] },
  { value: '7-6', label: '7 cộng, 6 cộng', starts: [7, 6] },
  { value: '5-2', label: '5, 4, 3, 2 cộng', starts: [5, 4, 3, 2] },
]);

/** @typedef {(typeof GROUPS)[number]['value']} Group */

/** Cards in a deck. */
export const DECK_SIZE = 10;

/**
 * One card: the addition `a + b` and the sum options.
 * @typedef {{ a: number, b: number, options: string[], answer: number }} Card
 */

/**
 * A deck of cards from a part of the table, in a mixed order.
 * @param {Group} group
 * @param {number} seed
 * @returns {Card[]}
 */
export function buildDeck(group, seed) {
  const rand = rng(seed);
  const starts = /** @type {readonly number[]} */ (
    (GROUPS.find((g) => g.value === group) ?? GROUPS[0]).starts
  );
  const facts = shuffle(
    rand,
    ADD_TABLE.filter((f) => starts.includes(f.a)),
  ).slice(0, DECK_SIZE);
  return facts.map(({ a, b }) => ({ a, b, ...numberOptions(rand, a + b, 11, 18) }));
}

/**
 * Why a card's sum is right: make ten with the larger number first, so
 * 5 + 8 is worked as 8 + 5.
 * @param {{ a: number, b: number }} card
 */
export function cardReason({ a, b }) {
  if (a >= b) return makeTenSteps(a, b).join(' ');
  return `Đổi chỗ: ${a} + ${b} = ${b} + ${a}. ${makeTenSteps(b, a).join(' ')}`;
}

/**
 * A time in seconds as a child hears it: "45 giây", "1 phút 5 giây".
 * @param {number} seconds
 */
export function timeText(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  if (m === 0) return `${s} giây`;
  return s % 60 === 0 ? `${m} phút` : `${m} phút ${s % 60} giây`;
}

/**
 * The end of a round: how many cards were right, and the facts missed.
 * @param {readonly Card[]} deck
 * @param {ReadonlyArray<boolean | null | undefined>} marks
 */
export function roundResult(deck, marks) {
  const right = marks.filter((m) => m === true).length;
  const missed = deck
    .filter((_, i) => marks[i] === false)
    .map((c) => `${c.a} + ${c.b} = ${c.a + c.b}`);
  let verdict;
  if (right === deck.length) verdict = 'Tuyệt vời! Em nhớ hết các phép cộng của bộ thẻ này.';
  else if (right >= deck.length - 3)
    verdict = 'Giỏi lắm! Em đọc lại các phép cộng dưới đây cho nhớ nhé.';
  else verdict = 'Em ôn lại các phép cộng dưới đây rồi chơi lại nhé.';
  return { right, total: deck.length, missed, verdict };
}
