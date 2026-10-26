import { describe, it, expect } from 'vitest';
import { EXPRESSIONS, isExact, put, startValues } from './engine.js';

/** @param {string} id */
const byId = (id) => {
  const e = EXPRESSIONS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

describe('expressions of the widget', () => {
  it('evaluates the book examples', () => {
    expect(byId('bac-hai').value({ x: 2 })).toBe(15);
    expect(byId('chu-vi').value({ a: 5, b: 3 })).toBe(16);
    expect(byId('gap-nhau').value({ x: 36, y: 44 })).toBe(1.5);
    expect(byId('hai-bien').value({ x: 3, y: -2 })).toBe(9 + 6 - 4 - 1);
  });

  it('writes substitutions with negatives in brackets', () => {
    expect(put(-1.5)).toBe('(-1{,}5)');
    expect(byId('bac-hai').steps({ x: -1.5 })).toEqual([
      '4 \\cdot (-1{,}5)^2 - 1',
      '4 \\cdot 2{,}25 - 1',
    ]);
    expect(byId('hai-bien').steps({ x: 3, y: -2 })[1]).toBe('9 + 6 - 4 - 1');
  });

  it('starts every slider inside its range', () => {
    for (const e of EXPRESSIONS) {
      const v = startValues(e);
      for (const d of e.vars) {
        expect(v[d.name]).toBeGreaterThanOrEqual(d.min);
        expect(v[d.name]).toBeLessThanOrEqual(d.max);
      }
      expect(e.value(v)).not.toBeNull();
    }
  });

  it('tells exact values from rounded ones', () => {
    expect(isExact(1.5)).toBe(true);
    expect(isExact(120 / 70)).toBe(false);
  });
});
