import { describe, it, expect } from 'vitest';
import { moveIndex, relation, scoreGuess, sumRule } from './engine.js';

describe('relation', () => {
  it('writes k = n · q + r and spots multiples and divisors', () => {
    expect(relation(26, 6)).toEqual({
      q: 4,
      r: 2,
      isMultiple: false,
      isDivisor: false,
      cofactor: null,
    });
    expect(relation(24, 6)).toMatchObject({ q: 4, r: 0, isMultiple: true, isDivisor: false });
    expect(relation(3, 6)).toMatchObject({ isMultiple: false, isDivisor: true, cofactor: 2 });
    expect(relation(6, 6)).toMatchObject({ isMultiple: true, isDivisor: true, cofactor: 1 });
  });
});

describe('scoreGuess', () => {
  it('splits a guess into right, wrong and missed divisors', () => {
    expect(scoreGuess([1, 2, 5, 12], 12)).toEqual({
      right: [1, 2, 12],
      wrong: [5],
      missed: [3, 4, 6],
      done: false,
    });
    expect(scoreGuess([1, 7], 7).done).toBe(true);
  });
});

describe('moveIndex', () => {
  it('moves inside the 10 × 10 grid and stops at its edges', () => {
    expect(moveIndex(0, 'ArrowLeft')).toBe(0);
    expect(moveIndex(0, 'ArrowRight')).toBe(1);
    expect(moveIndex(5, 'ArrowUp')).toBe(5);
    expect(moveIndex(95, 'ArrowDown')).toBe(95);
    expect(moveIndex(45, 'ArrowDown')).toBe(55);
    expect(moveIndex(47, 'Home')).toBe(40);
    expect(moveIndex(47, 'End')).toBe(49);
    expect(moveIndex(47, 'a')).toBeNull();
  });
});

describe('sumRule', () => {
  it('names the rule that applies, and the rules never contradict the truth', () => {
    expect(sumRule(12, 18, 6)).toEqual({ aDiv: true, bDiv: true, sumDiv: true, rule: 1 });
    expect(sumRule(12, 19, 6)).toMatchObject({ sumDiv: false, rule: 2 });
    expect(sumRule(7, 5, 6)).toMatchObject({ sumDiv: true, rule: null });
    for (let a = 0; a <= 60; a++) {
      for (let b = 0; b <= 60; b++) {
        for (let m = 1; m <= 12; m++) {
          const s = sumRule(a, b, m);
          if (s.rule === 1) expect(s.sumDiv).toBe(true);
          if (s.rule === 2) expect(s.sumDiv).toBe(false);
        }
      }
    }
  });
});
