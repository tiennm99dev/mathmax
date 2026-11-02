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
});
