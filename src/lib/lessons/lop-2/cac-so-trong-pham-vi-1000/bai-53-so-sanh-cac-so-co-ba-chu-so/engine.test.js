import { describe, expect, it } from 'vitest';
import { ROUNDS, chain, decidingPlace, sorted, tapCard } from './engine.js';

describe('the card sets', () => {
  it('deals four different three-digit numbers, never already in order', () => {
    const bad = ROUNDS.filter(
      (cards) =>
        cards.length !== 4 ||
        new Set(cards).size !== 4 ||
        cards.some((c) => c < 100 || c > 999) ||
        cards.join() === sorted(cards).join(),
    );
    expect(bad).toEqual([]);
  });
});

describe('the deciding place', () => {
  it('starts from the hundreds', () => {
    expect(decidingPlace(847, 747)).toBe('hundreds');
    expect(decidingPlace(599, 601)).toBe('hundreds');
    expect(decidingPlace(352, 325)).toBe('tens');
    expect(decidingPlace(790, 789)).toBe('tens');
    expect(decidingPlace(478, 471)).toBe('ones');
    expect(decidingPlace(478, 478)).toBeNull();
  });
});

describe('tapping the cards', () => {
  const cards = [325, 253, 352, 235];

  it('places the smallest card first', () => {
    const tap = tapCard(cards, [], 235);
    expect(tap).toEqual({
      placed: [235],
      compared: null,
      tone: 'ok',
      text: 'Đúng rồi! 235 là số bé nhất.',
    });
  });

  it('explains a card tapped too early with the closest smaller card', () => {
    const tap = tapCard(cards, [], 352);
    expect(tap?.placed).toEqual([]);
    expect(tap?.tone).toBe('warn');
    expect(tap?.compared).toEqual({ a: 352, b: 325 });
    expect(tap?.text).toBe(
      'Chưa đúng. Còn thẻ bé hơn 352. Hàng trăm bằng nhau. 5 chục lớn hơn 2 chục. Vậy 352 > 325.',
    );
  });

  it('compares each new card with the one before it', () => {
    const tap = tapCard(cards, [235], 253);
    expect(tap?.compared).toEqual({ a: 235, b: 253 });
    expect(tap?.text).toContain('Vậy 235 < 253.');
  });

  it('ignores a card already placed', () => {
    expect(tapCard(cards, [235], 235)).toBeNull();
  });

  it('finishes every set in order and refuses every card out of order', () => {
    const bad = [];
    for (const set of ROUNDS) {
      /** @type {number[]} */
      let placed = [];
      const order = sorted(set);
      for (const [i, n] of order.entries()) {
        for (const later of order.slice(i + 1)) {
          const refused = tapCard(set, placed, later);
          if (refused?.tone !== 'warn' || refused.placed.length !== i) bad.push(later);
          if (refused?.compared && refused.compared.b >= later) bad.push(later);
        }
        placed = tapCard(set, placed, n)?.placed ?? [];
      }
      if (placed.join() !== order.join()) bad.push(set);
      const last = tapCard(set, order.slice(0, 3), order[3]);
      if (last?.text !== `Xếp xong rồi! ${chain(order)}.`) bad.push(last?.text);
    }
    expect(bad).toEqual([]);
  });
});
