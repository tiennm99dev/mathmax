import { describe, expect, it } from 'vitest';
import {
  KNOWN_BOX,
  answerCard,
  backwardsMessage,
  boxCounts,
  buildMessage,
  cardMessage,
  cardOptions,
  cardPrompt,
  newDeck,
  nextCard,
} from './engine.js';

/**
 * Plays a deck, answering wrong whenever `wrong(n, turn)` says so.
 * @param {import('./engine.js').Deck} start
 * @param {(n: number, turn: number) => boolean} wrong
 */
function play(start, wrong) {
  let deck = start;
  /** @type {number[]} */
  const asked = [];
  for (let card = nextCard(deck); card && asked.length < 200; card = nextCard(deck)) {
    asked.push(card.n);
    deck = answerCard(deck, card.n, !wrong(card.n, deck.turn));
  }
  return { deck, asked };
}

describe('building the table of 8', () => {
  it('says what the octopuses show, forwards and backwards', () => {
    expect(buildMessage(1)).toBe('1 con bạch tuộc có 8 cái vòi. 8 × 1 = 8.');
    expect(buildMessage(2)).toBe('2 con bạch tuộc có 16 cái vòi. 8 + 8 = 16. 8 × 2 = 16.');
    expect(buildMessage(10)).toContain('72, 80');
    expect(backwardsMessage(2)).toBe('Có 16 cái vòi, mỗi con 8 vòi thì có 2 con. 16 : 8 = 2.');
  });
});

describe('the memory cards', () => {
  it('asks every row of the table twice when nothing is missed', () => {
    const { deck, asked } = play(newDeck('nhan', 1), () => false);
    expect(asked).toHaveLength(20);
    expect([...new Set(asked)].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(boxCounts(deck)).toEqual({ fresh: 0, learning: 0, known: 10 });
  });

  it('brings a missed card back soon, ahead of the new ones', () => {
    let deck = newDeck('nhan', 1);
    const first = nextCard(deck)?.n ?? 0;
    deck = answerCard(deck, first, false);
    const second = nextCard(deck)?.n ?? 0;
    expect(second).not.toBe(first);
    deck = answerCard(deck, second, true);
    const third = nextCard(deck)?.n ?? 0;
    expect(third).not.toBe(first);
    deck = answerCard(deck, third, true);
    expect(nextCard(deck)?.n).toBe(first);
  });

  it('holds a right card back longer than a missed one', () => {
    let deck = newDeck('chia', 2);
    const first = nextCard(deck)?.n ?? 0;
    deck = answerCard(deck, first, true);
    const gaps = [];
    for (let i = 0; i < 8; i++) {
      const card = nextCard(deck);
      if (!card) break;
      if (card.n === first) {
        gaps.push(i);
        break;
      }
      deck = answerCard(deck, card.n, true);
    }
    expect(gaps[0]).toBeGreaterThanOrEqual(4);
  });

  it('sends a missed card back to the new box', () => {
    let deck = newDeck('nhan', 3);
    const n = nextCard(deck)?.n ?? 0;
    deck = answerCard(deck, n, true);
    expect(boxCounts(deck).learning).toBe(1);
    deck = answerCard(deck, n, false);
    expect(boxCounts(deck)).toEqual({ fresh: 10, learning: 0, known: 0 });
  });

  it('keeps asking a card that stays missed, and still finishes', () => {
    const { deck, asked } = play(newDeck('nhan', 4), (n, turn) => n === 7 && turn < 30);
    expect(boxCounts(deck).known).toBe(10);
    expect(asked.filter((n) => n === 7).length).toBeGreaterThan(5);
    expect(asked.length).toBeLessThan(200);
  });

  it('writes each card with its right answer among distinct options', () => {
    const bad = [];
    for (let n = 1; n <= 10; n++) {
      const mul = cardOptions('nhan', n);
      if (mul.options[mul.answer] !== String(8 * n)) bad.push(['nhan', n]);
      const div = cardOptions('chia', n);
      if (div.options[div.answer] !== String(n)) bad.push(['chia', n]);
      for (const { options } of [mul, div]) {
        if (new Set(options).size !== options.length || options.length < 3) bad.push([n, options]);
      }
    }
    expect(bad).toEqual([]);
    expect(cardPrompt('nhan', 7)).toBe('8 × 7 = ?');
    expect(cardPrompt('chia', 7)).toBe('56 : 8 = ?');
  });

  it('says what an answer does to its card', () => {
    expect(cardMessage('nhan', 7, true, 1)).toBe(
      'Đúng rồi! 8 × 7 = 56. Thẻ này sẽ quay lại sau ít lượt nữa.',
    );
    expect(cardMessage('nhan', 7, true, KNOWN_BOX)).toBe(
      'Đúng rồi! 8 × 7 = 56. Em đã thuộc thẻ này.',
    );
    expect(cardMessage('chia', 7, false, 0)).toBe(
      'Chưa đúng. Vì 8 × 7 = 56 nên 56 : 8 = 7. Thẻ này sẽ sớm quay lại để em nhớ.',
    );
  });
});
