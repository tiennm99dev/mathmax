import { describe, it, expect } from 'vitest';
import { equivalents, relate, simplest } from './engine.js';

describe('relate', () => {
  it('recognises expanding by k', () => {
    expect(relate(2, 3, 8, 12)).toMatchObject({ equal: true, how: 'expand', k: 4, ad: 24, bc: 24 });
  });

  it('recognises reducing by k', () => {
    expect(relate(6, 8, 3, 4)).toMatchObject({ equal: true, how: 'reduce', k: 2 });
  });

  it('finds equal fractions that are not multiples of each other', () => {
    expect(relate(4, 6, 6, 9)).toMatchObject({ equal: true, how: 'both' });
  });

  it('orders unequal fractions by the cross products', () => {
    expect(relate(1, 2, 3, 4)).toMatchObject({ equal: false, how: 'none', order: 1 });
    expect(relate(3, 4, 1, 2)).toMatchObject({ equal: false, order: -1 });
    expect(relate(1, 2, 1, 2)).toMatchObject({ equal: true, how: 'same', order: 0 });
  });

  it('handles negative numerators', () => {
    expect(relate(-3, 4, -6, 8)).toMatchObject({ equal: true, how: 'expand', k: 2 });
    expect(relate(-3, 4, 3, 4).equal).toBe(false);
  });
});

describe('equivalents and simplest', () => {
  it('lists fractions equal to 6/8 up to denominator 16', () => {
    expect(equivalents(6, 8, 16)).toEqual([
      { n: 3, d: 4 },
      { n: 6, d: 8 },
      { n: 9, d: 12 },
      { n: 12, d: 16 },
    ]);
  });

  it('reduces by the gcd', () => {
    expect(simplest(18, 24)).toEqual({ n: 3, d: 4, g: 6 });
    expect(simplest(-10, 15)).toEqual({ n: -2, d: 3, g: 5 });
    expect(simplest(0, 5)).toEqual({ n: 0, d: 1, g: 5 });
  });
});
