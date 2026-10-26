import { describe, it, expect } from 'vitest';
import { DECKS, boardStatus, degreeWords, groupInfo } from './engine.js';
import { monoText, varKey } from '../_shared/poly.js';

/** @param {number} d @param {string[]} ids */
const pick = (d, ids) =>
  ids.map((id) => DECKS[d].cards.find((c) => c.id === id) ?? DECKS[0].cards[0]);

describe('monomial decks', () => {
  it('print each card as the monomial it stands for', () => {
    for (const deck of DECKS) {
      for (const c of deck.cards) {
        // A reordered face has the same letters and digits as the reduced form.
        const norm = (/** @type {string} */ s) => [...s].sort().join('');
        expect(norm(c.label)).toBe(norm(monoText(c.m)));
      }
      const parts = new Set(deck.cards.map((c) => varKey(c.m)));
      expect(parts.size).toBeGreaterThanOrEqual(3);
      expect(parts.size).toBeLessThan(deck.cards.length);
    }
  });
});

describe('groupInfo', () => {
  it('adds the coefficients of alike monomials', () => {
    const g = groupInfo(pick(0, ['a', 'd', 'f']));
    expect(g.ok).toBe(true);
    expect(g.line).toBe('3x²y + (−5x²y) + 7x²y = 5x²y');
    expect(g.sum && degreeWords(g.sum)).toBe('bậc 3');
  });

  it('reports a sum of zero as having no degree', () => {
    const g = groupInfo(pick(1, ['d', 'h']));
    expect(g.line).toBe('5x²y² + (−5x²y²) = 0');
    expect(g.sum && degreeWords(g.sum)).toBe('tổng bằng 0, không có bậc');
  });

  it('adds numbers as alike monomials of degree 0', () => {
    const g = groupInfo(pick(1, ['b', 'f']));
    expect(g.line).toBe('−3 + 9 = 6');
    expect(g.sum && degreeWords(g.sum)).toBe('bậc 0');
  });

  it('names the clash in a mixed group', () => {
    const g = groupInfo(pick(2, ['a', 'b']));
    expect(g.ok).toBe(false);
    expect(g.clash?.map((c) => c.id)).toEqual(['a', 'b']);
  });
});

describe('boardStatus', () => {
  const cards = DECKS[0].cards;
  it('is done only when every like part sits in one pure group', () => {
    expect(
      boardStatus(cards, [
        ['a', 'd', 'f'],
        ['b', 'e'],
        ['c', 'g'],
      ]).done,
    ).toBe(true);
    const split = boardStatus(cards, [['a', 'd'], ['b', 'e'], ['c', 'g'], ['f']]);
    expect(split.done).toBe(false);
    expect(split.split).toEqual([0, 3]);
    const mixed = boardStatus(cards, [
      ['a', 'b'],
      ['d', 'e', 'f'],
      ['c', 'g'],
    ]);
    expect(mixed.mixed).toEqual([0, 1]);
    expect(boardStatus(cards, [['a']]).placed).toBe(1);
    expect(boardStatus(cards, []).parts).toBe(3);
  });
});
