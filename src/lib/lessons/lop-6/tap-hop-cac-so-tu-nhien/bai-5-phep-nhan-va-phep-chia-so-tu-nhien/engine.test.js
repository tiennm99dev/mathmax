import { describe, it, expect } from 'vitest';
import { divide, divisionEquation, divisionSentence, gridRows } from './engine.js';

describe('divide', () => {
  it('satisfies a = b · q + r with 0 ≤ r < b', () => {
    for (let a = 0; a <= 60; a++) {
      for (let b = 1; b <= 12; b++) {
        const { q, r } = divide(a, b);
        expect(b * q + r).toBe(a);
        expect(r).toBeGreaterThanOrEqual(0);
        expect(r).toBeLessThan(b);
      }
    }
  });

  it('rejects division by 0', () => {
    expect(() => divide(5, 0)).toThrow(RangeError);
  });
});

describe('equation and sentence', () => {
  it('omits a zero remainder', () => {
    expect(divisionEquation(20, 5)).toBe('20 = 5 · 4');
    expect(divisionEquation(23, 5)).toBe('23 = 5 · 4 + 3');
    expect(divisionEquation(3, 5)).toBe('3 = 5 · 0 + 3');
  });

  it('names exact division and division with remainder', () => {
    expect(divisionSentence(20, 5)).toContain('Phép chia hết: 20 : 5 = 4');
    expect(divisionSentence(23, 5)).toContain('số dư 3');
  });
});

describe('gridRows', () => {
  it('has q full rows of b cells and a last row of r cells', () => {
    const rows = gridRows(23, 5);
    expect(rows).toHaveLength(5);
    expect(
      rows.slice(0, 4).every((row) => row.length === 5 && row.every((c) => c === 'full')),
    ).toBe(true);
    expect(rows[4]).toEqual(['rest', 'rest', 'rest']);
  });

  it('has no rows for a = 0', () => {
    expect(gridRows(0, 4)).toEqual([]);
  });
});
