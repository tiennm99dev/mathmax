import { describe, expect, it } from 'vitest';
import {
  ADD_TABLE,
  SUB_FACTS,
  column,
  crossesTen,
  crossesTenDown,
  downToTen,
  downToTenSteps,
  makeTen,
  makeTenSteps,
} from './facts.js';

describe('addition across ten', () => {
  it('lists the 36 facts of the table, each across ten and once only', () => {
    expect(ADD_TABLE).toHaveLength(36);
    const keys = new Set(ADD_TABLE.map((f) => `${f.a}+${f.b}`));
    expect(keys.size).toBe(36);
    expect(ADD_TABLE.filter(({ a, b }) => !crossesTen(a, b))).toEqual([]);
    expect(column(9).map((f) => f.b)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(column(2)).toEqual([{ a: 2, b: 9 }]);
  });

  it('holds every addition across ten of two one-digit numbers', () => {
    const keys = new Set(ADD_TABLE.map((f) => `${f.a}+${f.b}`));
    const bad = [];
    for (let a = 1; a <= 9; a++) {
      for (let b = 1; b <= 9; b++) {
        if (crossesTen(a, b) && !keys.has(`${a}+${b}`)) bad.push([a, b]);
      }
    }
    expect(bad).toEqual([]);
    expect(crossesTen(5, 5)).toBe(false);
    expect(crossesTen(9, 9)).toBe(true);
  });

  it('makes ten the book way', () => {
    expect(makeTen(9, 5)).toEqual({ fill: 1, rest: 4 });
    expect(makeTenSteps(8, 5)).toEqual(['Tách 5 = 2 + 3.', '8 + 2 = 10.', '10 + 3 = 13.']);
    const bad = ADD_TABLE.filter(({ a, b }) => {
      const { fill, rest } = makeTen(a, b);
      return a + fill !== 10 || fill + rest !== b || 10 + rest !== a + b || rest < 1;
    });
    expect(bad).toEqual([]);
  });
});

describe('subtraction across ten', () => {
  it('lists the 36 facts, each across ten', () => {
    expect(SUB_FACTS).toHaveLength(36);
    expect(SUB_FACTS.filter(({ c, b }) => !crossesTenDown(c, b))).toEqual([]);
    expect(crossesTenDown(15, 3)).toBe(false);
    expect(crossesTenDown(11, 2)).toBe(true);
  });

  it('goes down to ten first', () => {
    expect(downToTen(12, 3)).toEqual({ first: 2, rest: 1 });
    expect(downToTenSteps(12, 3)).toEqual(['Tách 3 = 2 + 1.', '12 − 2 = 10.', '10 − 1 = 9.']);
    const bad = SUB_FACTS.filter(({ c, b }) => {
      const { first, rest } = downToTen(c, b);
      return c - first !== 10 || first + rest !== b || 10 - rest !== c - b || rest < 1;
    });
    expect(bad).toEqual([]);
  });
});
