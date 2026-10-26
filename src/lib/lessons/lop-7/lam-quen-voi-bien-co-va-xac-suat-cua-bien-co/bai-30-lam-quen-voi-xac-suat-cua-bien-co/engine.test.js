import { describe, it, expect } from 'vitest';
import {
  EVENTS,
  countRatio,
  favourable,
  fracTex,
  hits,
  trueProbability,
  weights,
} from './engine.js';

/** @param {string} id */
const test = (id) => {
  const e = EVENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e.test;
};

describe('equal cells', () => {
  it('finds the cells of an event', () => {
    expect(favourable(6, test('chan'))).toEqual([2, 4, 6]);
    expect(favourable(10, test('nguyen-to'))).toEqual([2, 3, 5, 7]);
    expect(favourable(8, test('chia-het-3'))).toEqual([3, 6]);
  });

  it('gives k/n in lowest terms', () => {
    expect(countRatio(6, test('chan'))).toEqual({ n: 1, d: 2 });
    expect(countRatio(10, test('nguyen-to'))).toEqual({ n: 2, d: 5 });
    expect(countRatio(8, test('chia-het-3'))).toEqual({ n: 1, d: 4 });
    expect(countRatio(5, test('o-1'))).toEqual({ n: 1, d: 5 });
  });

  it('gives 1 for the certain event and 0 for the impossible one', () => {
    for (let n = 2; n <= 12; n++) {
      expect(countRatio(n, test('nho-hon-13'))).toEqual({ n: 1, d: 1 });
      expect(countRatio(n, test('lon-hon-12'))).toEqual({ n: 0, d: 1 });
    }
  });

  it('agrees with the share of the wheel', () => {
    for (let n = 2; n <= 12; n++)
      for (const e of EVENTS)
        expect(trueProbability(n, 'deu', e.test)).toEqual(countRatio(n, e.test));
  });
});

describe('one oversized cell', () => {
  it('makes cell 1 fill half the wheel', () => {
    expect(weights(5, 'lech')).toEqual([4, 1, 1, 1, 1]);
    expect(trueProbability(5, 'lech', test('o-1'))).toEqual({ n: 1, d: 2 });
  });

  it('breaks counting cells', () => {
    // 6 cells, cell 1 weighs 5: odd cells 1, 3, 5 cover 5 + 1 + 1 = 7 of 10.
    expect(countRatio(6, test('le'))).toEqual({ n: 1, d: 2 });
    expect(trueProbability(6, 'lech', test('le'))).toEqual({ n: 7, d: 10 });
  });
});

describe('spins', () => {
  it('counts the spins in which the event happened', () => {
    expect(hits([3, 1, 4, 1, 5, 9], test('chan'))).toBe(11);
  });

  it('writes fractions as TeX', () => {
    expect(fracTex({ n: 2, d: 5 })).toBe('\\frac{2}{5}');
    expect(fracTex({ n: 1, d: 1 })).toBe('1');
  });
});
