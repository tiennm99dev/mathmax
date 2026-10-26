import { describe, it, expect } from 'vitest';
import { CARDS, SETS, chainText, judge, memberships } from './engine.js';

/** @param {string} id */
const card = (id) => {
  const c = CARDS.find((x) => x.id === id);
  if (!c) throw new Error(id);
  return c;
};

describe('cards', () => {
  it('have unique ids and values', () => {
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
    expect(new Set(CARDS.map((c) => c.value)).size).toBe(CARDS.length);
  });

  it('put every kind of number in the deck and fit the number line', () => {
    for (const s of SETS) expect(CARDS.some((c) => c.set === s.id)).toBe(true);
    for (const c of CARDS) expect(Math.abs(c.value)).toBeLessThanOrEqual(5);
  });

  it('classify integers by sign and others as non-integers', () => {
    for (const c of CARDS) {
      if (c.set === 'N') expect(Number.isInteger(c.value) && c.value >= 0).toBe(true);
      if (c.set === 'Z') expect(Number.isInteger(c.value) && c.value < 0).toBe(true);
      if (c.set === 'Q' || c.set === 'I') expect(Number.isInteger(c.value)).toBe(false);
    }
  });
});

describe('judge', () => {
  it('accepts only the smallest set', () => {
    expect(judge(card('sqrt9'), 'N').result).toBe('right');
    expect(judge(card('sqrt9'), 'Q').result).toBe('larger');
    expect(judge(card('minus5'), 'N').result).toBe('wrong');
    expect(judge(card('sqrt2'), 'Q').result).toBe('wrong');
    expect(judge(card('sqrt-quarter'), 'I').result).toBe('wrong');
    expect(judge(card('repeating'), 'Q').result).toBe('right');
  });
});

describe('order and membership', () => {
  it('lists numbers from smallest to largest', () => {
    expect(chainText([card('pi'), card('minus5'), card('sqrt2'), card('zero')])).toBe(
      '−5 < 0 < √2 < π',
    );
    expect(chainText([card('non-repeating'), card('minus1-25')])).toBe('−1,25 < −1,010010001…');
  });

  it('names every set a number belongs to', () => {
    expect(memberships(card('zero'))).toEqual(['ℕ', 'ℤ', 'ℚ', 'ℝ']);
    expect(memberships(card('minus5'))).toEqual(['ℤ', 'ℚ', 'ℝ']);
    expect(memberships(card('pi'))).toEqual(['I', 'ℝ']);
  });
});
