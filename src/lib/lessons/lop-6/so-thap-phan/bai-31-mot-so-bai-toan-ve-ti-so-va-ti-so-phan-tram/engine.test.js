import { describe, it, expect } from 'vitest';
import {
  DEPOSITS,
  GOODS,
  pctText,
  percentOf,
  range,
  ratioPercent,
  snapPercent,
  solve,
  wholeFromPercent,
} from './engine.js';

describe('percentages', () => {
  it('finds a percentage of a number and back', () => {
    expect(percentOf(1000000, 60)).toBe(60000);
    expect(percentOf(40, 50)).toBe(2);
    expect(wholeFromPercent(2, 50)).toBe(40);
    expect(() => wholeFromPercent(5, 0)).toThrow();
  });

  it('writes a ratio as a percentage', () => {
    expect(ratioPercent(3, 4)).toBe(75);
    expect(ratioPercent(1, 3)).toBe(33.33);
    expect(pctText(65)).toBe('6,5%');
  });
});

describe('solve', () => {
  it('prices a sale', () => {
    const s = solve('sale', 460000, 250);
    expect(s.answer).toBe(345000);
    expect(s.marked).toBe(115000);
    expect(s.steps.at(-1)).toContain('75%');
  });

  it('finds the interest of a deposit', () => {
    const s = solve('interest', 10000000, 65);
    expect(s.answer).toBe(650000);
    expect(s.question).toContain('6,5%');
  });

  it('finds the original price from the sale price', () => {
    const s = solve('original', 800000, 150);
    expect(s.question).toContain('680 000 đồng');
    expect(s.answer).toBe(800000);
  });

  it('keeps every amount a whole number of đồng across the ranges', () => {
    for (const mode of /** @type {const} */ (['sale', 'original', 'interest'])) {
      const { min, max, step } = range(mode);
      const bases = mode === 'interest' ? DEPOSITS : GOODS.map((g) => g.price);
      for (const b of bases)
        for (let p = min; p <= max; p += step) {
          const s = solve(mode, b, p);
          expect(Number.isInteger(s.answer)).toBe(true);
          expect(Number.isInteger(s.marked)).toBe(true);
          if (mode === 'original') expect(wholeFromPercent(b - s.marked, 1000 - p)).toBe(b);
        }
    }
  });

  it('snaps the handle to the step', () => {
    expect(snapPercent('sale', 233)).toBe(250);
    expect(snapPercent('sale', 990)).toBe(900);
    expect(snapPercent('interest', 63)).toBe(65);
    expect(snapPercent('interest', 0)).toBe(5);
  });
});
