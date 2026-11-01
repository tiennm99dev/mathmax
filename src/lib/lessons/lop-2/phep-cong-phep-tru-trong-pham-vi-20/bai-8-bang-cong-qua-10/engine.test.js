import { describe, expect, it } from 'vitest';
import { crossesTen } from '../_shared/facts.js';
import { DECK_SIZE, GROUPS, buildDeck, cardReason, roundResult, timeText } from './engine.js';

describe('flash cards of the addition table', () => {
  it('builds decks of distinct facts from the chosen columns', () => {
    const bad = [];
    for (const g of GROUPS) {
      for (let seed = 1; seed <= 15; seed++) {
        const deck = buildDeck(g.value, seed);
        if (deck.length !== DECK_SIZE) bad.push([g.value, 'size', deck.length]);
        const keys = new Set(deck.map((c) => `${c.a}+${c.b}`));
        if (keys.size !== deck.length) bad.push([g.value, 'repeat']);
        for (const c of deck) {
          if (!crossesTen(c.a, c.b)) bad.push([g.value, c]);
          const first = /** @type {readonly number[]} */ (g.starts);
          if (!first.includes(c.a)) bad.push([g.value, 'column', c]);
          if (c.options[c.answer] !== String(c.a + c.b)) bad.push([g.value, 'answer', c]);
          if (new Set(c.options).size !== c.options.length) bad.push([g.value, 'options', c]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same deck from the same seed', () => {
    expect(buildDeck('tat-ca', 1)).toEqual(buildDeck('tat-ca', 1));
  });

  it('explains a card by making ten', () => {
    expect(cardReason({ a: 8, b: 5 })).toBe('Tách 5 = 2 + 3. 8 + 2 = 10. 10 + 3 = 13.');
    expect(cardReason({ a: 5, b: 8 })).toBe(
      'Đổi chỗ: 5 + 8 = 8 + 5. Tách 5 = 2 + 3. 8 + 2 = 10. 10 + 3 = 13.',
    );
  });

  it('writes times and the end of a round', () => {
    expect(timeText(45)).toBe('45 giây');
    expect(timeText(65)).toBe('1 phút 5 giây');
    expect(timeText(120)).toBe('2 phút');
    const deck = buildDeck('9-8', 2);
    const marks = deck.map((_, i) => i !== 0);
    const r = roundResult(deck, marks);
    expect(r.right).toBe(DECK_SIZE - 1);
    expect(r.missed).toEqual([`${deck[0].a} + ${deck[0].b} = ${deck[0].a + deck[0].b}`]);
    expect(
      roundResult(
        deck,
        deck.map(() => true),
      ).verdict,
    ).toContain('Tuyệt vời');
  });
});
