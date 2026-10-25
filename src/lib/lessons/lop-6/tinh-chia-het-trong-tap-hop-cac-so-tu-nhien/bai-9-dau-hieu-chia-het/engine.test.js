import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { basketsOf, judge, nextNumber } from './engine.js';

describe('nextNumber', () => {
  it('stays between 10 and 9 999 and fills every basket', () => {
    const r = rng(9);
    const hits = { 2: 0, 3: 0, 5: 0, 9: 0 };
    for (let i = 0; i < 1000; i++) {
      const n = nextNumber(r);
      expect(Number.isInteger(n) && n >= 10 && n <= 9999, String(n)).toBe(true);
      for (const d of basketsOf(n)) hits[d]++;
    }
    for (const count of Object.values(hits)) expect(count).toBeGreaterThan(100);
  });
});

describe('basketsOf', () => {
  it('lists the true divisors among 2, 3, 5, 9', () => {
    expect(basketsOf(90)).toEqual([2, 3, 5, 9]);
    expect(basketsOf(135)).toEqual([3, 5, 9]);
    expect(basketsOf(77)).toEqual([]);
    for (let n = 10; n < 2000; n++) {
      expect(basketsOf(n)).toEqual([2, 3, 5, 9].filter((d) => n % d === 0));
    }
  });
});

describe('judge', () => {
  it('needs exactly the right baskets', () => {
    expect(judge(135, [3, 5, 9]).correct).toBe(true);
    expect(judge(135, [3, 5]).correct).toBe(false);
    expect(judge(77, []).correct).toBe(true);
    const wrong = judge(246, [2, 9]);
    expect(wrong.correct).toBe(false);
    expect(wrong.lines.find((l) => l.basket === 9)).toMatchObject({ belongs: false, ok: false });
    expect(wrong.lines.find((l) => l.basket === 3)).toMatchObject({ belongs: true, ok: false });
  });
});
