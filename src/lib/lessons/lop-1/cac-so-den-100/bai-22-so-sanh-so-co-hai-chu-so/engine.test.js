import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { bump, compare, decidingPlace, randomPair, valueOf } from './engine.js';

describe('comparing two stick columns', () => {
  it('keeps each side a two-digit number', () => {
    expect(bump({ tens: 1, ones: 0 }, 'tens', -1)).toEqual({ tens: 1, ones: 0 });
    expect(bump({ tens: 1, ones: 0 }, 'ones', -1)).toEqual({ tens: 1, ones: 0 });
    expect(bump({ tens: 9, ones: 9 }, 'ones', 1)).toEqual({ tens: 9, ones: 9 });
    expect(bump({ tens: 3, ones: 4 }, 'tens', 1)).toEqual({ tens: 4, ones: 4 });
  });

  it('compares the tens first, then the ones', () => {
    expect(compare({ tens: 4, ones: 2 }, { tens: 2, ones: 9 }).sign).toBe('>');
    expect(compare({ tens: 3, ones: 6 }, { tens: 3, ones: 9 }).sign).toBe('<');
    expect(compare({ tens: 5, ones: 5 }, { tens: 5, ones: 5 }).sign).toBe('=');
    expect(decidingPlace({ tens: 4, ones: 2 }, { tens: 2, ones: 9 })).toBe('tens');
    expect(decidingPlace({ tens: 3, ones: 6 }, { tens: 3, ones: 9 })).toBe('ones');
    expect(decidingPlace({ tens: 5, ones: 5 }, { tens: 5, ones: 5 })).toBe('equal');
  });

  it('draws valid pairs of every kind', () => {
    const rand = rng(7);
    const kinds = new Set();
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const [a, b] = randomPair(rand);
      for (const s of [a, b]) {
        const v = valueOf(s);
        if (v < 10 || v > 99 || s.ones > 9) bad.push(s);
      }
      kinds.add(decidingPlace(a, b));
    }
    expect(bad).toEqual([]);
    expect([...kinds].sort()).toEqual(['equal', 'ones', 'tens']);
  });
});
