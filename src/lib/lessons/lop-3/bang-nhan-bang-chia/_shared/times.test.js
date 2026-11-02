import { describe, expect, it } from 'vitest';
import { divLine, mulLine, productOptions, quotientOptions, repeatedSum } from './times.js';

describe('table sentences', () => {
  it('writes the rows the way the book does', () => {
    expect(mulLine(3, 4)).toBe('3 × 4 = 12');
    expect(divLine(3, 4)).toBe('12 : 3 = 4');
    expect(repeatedSum(3, 4)).toBe('3 + 3 + 3 + 3');
  });

  it('always offers the right answer among distinct options', () => {
    const bad = [];
    for (const base of [6, 7, 8, 9]) {
      for (let n = 1; n <= 10; n++) {
        for (const [q, right] of /** @type {const} */ ([
          [productOptions(base, n), base * n],
          [quotientOptions(base, n), n],
        ])) {
          if (q.options[q.answer] !== String(right)) bad.push([base, n]);
          if (new Set(q.options).size !== q.options.length) bad.push([base, n]);
          if (q.options.length < 3) bad.push([base, n]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('moves the right answer around, so tapping one place does not pay', () => {
    for (const base of [6, 7, 8, 9]) {
      const rows = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      for (const make of [productOptions, quotientOptions]) {
        const places = rows.map((n) => make(base, n).answer);
        const most = Math.max(...places.map((p) => places.filter((q) => q === p).length));
        expect(new Set(places).size).toBeGreaterThanOrEqual(3);
        expect(most).toBeLessThanOrEqual(5);
      }
    }
  });

  it('always offers four options', () => {
    for (const base of [6, 7, 8, 9]) {
      for (let n = 1; n <= 10; n++) {
        expect(productOptions(base, n).options).toHaveLength(4);
        expect(quotientOptions(base, n).options).toHaveLength(4);
      }
    }
  });
});
