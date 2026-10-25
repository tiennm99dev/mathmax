import { describe, it, expect } from 'vitest';
import {
  PLACE_SETS,
  ascending,
  compareSteps,
  isAt,
  mixedParts,
  mixedToFraction,
  pieFill,
  standing,
  tickOf,
} from './engine.js';

describe('number line placement', () => {
  it('puts every fraction of every set on a tick inside [−2, 2]', () => {
    for (const set of PLACE_SETS) {
      for (const [n, d] of set.items) {
        const t = tickOf(n, d, set.sub);
        expect(t, `${n}/${d}`).not.toBeNull();
        expect(Math.abs(/** @type {number} */ (t))).toBeLessThanOrEqual(2 * set.sub);
      }
    }
  });

  it('reads a negative denominator like a negative numerator', () => {
    expect(tickOf(1, -2, 4)).toBe(-2);
    expect(isAt(-0.5, 1, -2, 4)).toBe(true);
    expect(isAt(0.5, 1, -2, 4)).toBe(false);
    expect(isAt(-8 / 6, 4, -3, 6)).toBe(true);
  });

  it('sorts a set from smallest to largest', () => {
    expect(ascending(PLACE_SETS[0].items)).toEqual([
      [-7, 4],
      [1, -2],
      [3, 4],
      [5, 4],
    ]);
  });
});

describe('compareSteps', () => {
  it('brings 7/10 and 11/15 to the denominator 30', () => {
    expect(compareSteps(7, 10, 11, 15)).toMatchObject({ common: 30, xn: 21, yn: 22, sign: '<' });
  });

  it('makes the denominators positive first', () => {
    expect(compareSteps(3, -4, -5, 6)).toMatchObject({ common: 12, xn: -9, yn: -10, sign: '>' });
  });
});

describe('mixed numbers', () => {
  it('splits 17/5 into 3 and 2/5 and back', () => {
    expect(mixedParts(17, 5)).toEqual({ whole: 3, rest: 2 });
    expect(mixedToFraction(3, 2, 5)).toEqual({ n: 17, d: 5 });
    expect(mixedParts(24, 7)).toEqual({ whole: 3, rest: 3 });
  });

  it('fills pies in order', () => {
    expect(pieFill(7, 3, 3)).toEqual([3, 3, 1]);
    expect(pieFill(2, 4, 2)).toEqual([2, 0]);
  });

  it('places a fraction against 0 and 1', () => {
    expect(standing(-3, 4)).toMatch(/âm/);
    expect(standing(3, -4)).toMatch(/âm/);
    expect(standing(-3, -4)).toMatch(/nhỏ hơn 1/);
    expect(standing(5, 5)).toBe('bằng 1');
    expect(standing(7, 4)).toMatch(/lớn hơn 1/);
    expect(standing(0, 3)).toBe('bằng 0');
  });
});
