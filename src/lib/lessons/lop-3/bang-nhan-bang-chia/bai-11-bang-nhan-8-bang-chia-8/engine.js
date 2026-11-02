/**
 * The table of 8: octopuses with 8 arms build it, then a deck of memory cards
 * drills it with spaced repetition. A card climbs from the new box to the
 * learning box and on to the known box as it is answered right; a right answer
 * sends it further away, a wrong one brings it back soon, so the cards a child
 * misses come round most often. Pure and DOM-free.
 */
import { shuffle, rng } from '#lib/core/drill.js';
import {
  divLine,
  mulLine,
  productOptions,
  quotientOptions,
  repeatedSum,
} from '../_shared/times.js';

/** The table of this lesson. */
export const BASE = 8;

/** The most octopuses on screen, the last row of the table. */
export const MAX_OCTOPUSES = 10;

/**
 * What the sea says with `count` octopuses.
 * @param {number} count 1-10
 */
export function buildMessage(count) {
  const sum = count > 1 ? `${repeatedSum(BASE, count)} = ${BASE * count}. ` : '';
  if (count === MAX_OCTOPUSES) {
    return `Đủ 10 con! ${sum}Đếm thêm 8: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.`;
  }
  return `${count} con bạch tuộc có ${BASE * count} cái vòi. ${sum}${mulLine(BASE, count)}.`;
}

/**
 * The same octopuses read backwards.
 * @param {number} count
 */
export function backwardsMessage(count) {
  return `Có ${BASE * count} cái vòi, mỗi con 8 vòi thì có ${count} con. ${divLine(BASE, count)}.`;
}

/** @typedef {'nhan' | 'chia'} Op */

/**
 * A memory card, one row of a table. `box` is how far it has climbed, `due` the
 * turn it comes back on, `seen` whether it has been asked yet.
 * @typedef {{ n: number, box: number, due: number, seen: boolean }} Card
 */

/** @typedef {{ op: Op, turn: number, cards: Card[] }} Deck */

/** The box of a card that is known and leaves the deck. */
export const KNOWN_BOX = 2;

/** How many turns later a card comes back after a wrong answer. */
export const WRONG_GAP = 2;

/** How many turns later a card comes back after its first right answer. */
export const RIGHT_GAP = 5;

/**
 * A new deck of the ten rows of a table.
 * @param {Op} op
 * @param {number} seed
 * @returns {Deck}
 */
export function newDeck(op, seed) {
  const rows = shuffle(rng(seed), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return { op, turn: 0, cards: rows.map((n) => ({ n, box: 0, due: 0, seen: false })) };
}

/**
 * The card to ask now: a seen card that has come due first, the longest waiting
 * of them, then a new one. When every card left is still waiting, the one
 * nearest its turn. Null when all are known.
 * @param {Deck} deck
 * @returns {Card | null}
 */
export function nextCard(deck) {
  const left = deck.cards.filter((c) => c.box < KNOWN_BOX);
  const review = left.filter((c) => c.seen && c.due <= deck.turn).sort((a, b) => a.due - b.due);
  return (
    review[0] ?? left.find((c) => !c.seen) ?? [...left].sort((a, b) => a.due - b.due)[0] ?? null
  );
}

/**
 * The deck after answering row `n`. A wrong answer sends the card back to the
 * new box.
 * @param {Deck} deck
 * @param {number} n
 * @param {boolean} right
 * @returns {Deck}
 */
export function answerCard(deck, n, right) {
  const turn = deck.turn + 1;
  return {
    ...deck,
    turn,
    cards: deck.cards.map((c) => {
      if (c.n !== n) return c;
      return right
        ? { ...c, seen: true, box: c.box + 1, due: turn + RIGHT_GAP }
        : { ...c, seen: true, box: 0, due: turn + WRONG_GAP };
    }),
  };
}

/**
 * How many cards sit in each box.
 * @param {Deck} deck
 */
export function boxCounts(deck) {
  const count = (/** @type {number} */ box) => deck.cards.filter((c) => c.box === box).length;
  return { fresh: count(0), learning: count(1), known: count(KNOWN_BOX) };
}

/**
 * The face of a card.
 * @param {Op} op
 * @param {number} n
 */
export const cardPrompt = (op, n) => (op === 'nhan' ? `8 × ${n} = ?` : `${BASE * n} : 8 = ?`);

/**
 * The options of a card.
 * @param {Op} op
 * @param {number} n
 */
export const cardOptions = (op, n) =>
  op === 'nhan' ? productOptions(BASE, n) : quotientOptions(BASE, n);

/**
 * What a card says once it is answered.
 * @param {Op} op
 * @param {number} n
 * @param {boolean} right
 * @param {number} box the box it has moved to
 */
export function cardMessage(op, n, right, box) {
  const line = op === 'nhan' ? mulLine(BASE, n) : `Vì ${mulLine(BASE, n)} nên ${divLine(BASE, n)}`;
  if (!right) return `Chưa đúng. ${line}. Thẻ này sẽ sớm quay lại để em nhớ.`;
  if (box >= KNOWN_BOX) return `Đúng rồi! ${line}. Em đã thuộc thẻ này.`;
  return `Đúng rồi! ${line}. Thẻ này sẽ quay lại sau ít lượt nữa.`;
}
