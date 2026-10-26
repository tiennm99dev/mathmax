import { describe, it, expect } from 'vitest';
import { classify, ends, inequalities, longest, thirdSideRange } from './engine.js';

describe('three sticks', () => {
  it('classifies by the longest side only', () => {
    expect(classify(5, 3, 4)).toBe('triangle');
    expect(classify(4, 1, 2)).toBe('short');
    expect(classify(5, 2, 3)).toBe('flat');
    expect(classify(2, 9, 3)).toBe('short');
    expect(classify(6, 6, 6)).toBe('triangle');
    expect(longest(2, 9, 3)).toBe('b');
  });

  it('agrees with checking all three inequalities', () => {
    for (let a = 0.5; a <= 12; a += 0.5)
      for (let b = 0.5; b <= 12; b += 0.5)
        for (let c = 0.5; c <= 12; c += 0.5) {
          const all = inequalities(a, b, c).every((q) => q.ok);
          expect(classify(a, b, c) === 'triangle').toBe(all);
          const { low, high } = thirdSideRange(b, c);
          expect(all).toBe(low < a && a < high);
        }
  });

  it('puts A at distance c from B and b from C', () => {
    const { p, gap } = ends(5, 3, 4);
    expect(gap).toBe(0);
    expect(Math.hypot(p.x, p.y)).toBeCloseTo(4, 12);
    expect(Math.hypot(p.x - 5, p.y)).toBeCloseTo(3, 12);
    expect(p.y).toBeCloseTo(2.4, 12);
  });

  it('leaves the right gap when the sticks are too short', () => {
    expect(ends(7, 2, 3).gap).toBe(2);
    expect(ends(5, 2, 3).gap).toBe(0);
    expect(ends(2, 3, 9).gap).toBe(4);
    expect(ends(2, 9, 3).gap).toBe(4);
  });
});
