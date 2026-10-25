import { describe, it, expect } from 'vitest';
import { partOf, snapParts, solve, wholeFrom } from './engine.js';

describe('partOf and wholeFrom', () => {
  it('finds a fraction of a number', () => {
    expect(partOf(60, 3, 5)).toBe(36);
    expect(partOf(45, 2, 3)).toBe(30);
  });

  it('finds a number from a fraction of it', () => {
    expect(wholeFrom(42, 2, 7)).toBe(147);
    expect(wholeFrom(27, 3, 4)).toBe(36);
  });

  it('are inverse problems', () => {
    for (let n = 1; n <= 10; n++)
      for (let m = 1; m <= n; m++)
        for (let k = 1; k <= 12; k++) expect(wholeFrom(partOf(n * k, m, n), m, n)).toBe(n * k);
  });

  it('refuses a zero denominator or a zero fraction for the inverse problem', () => {
    expect(() => partOf(5, 1, 0)).toThrow();
    expect(() => wholeFrom(5, 0, 3)).toThrow();
  });
});

describe('solve', () => {
  it('reads the same diagram both ways', () => {
    const forward = solve('part', 3, 5, 12);
    expect(forward).toMatchObject({ known: 60, unknown: 36, question: 'Tìm 3/5 của 60.' });
    const back = solve('whole', 3, 5, 12);
    expect(back).toMatchObject({
      known: 36,
      unknown: 60,
      question: 'Tìm một số, biết 3/5 của nó bằng 36.',
    });
  });

  it('ends each worked solution with the unknown', () => {
    for (const mode of /** @type {const} */ (['part', 'whole'])) {
      const s = solve(mode, 2, 7, 21);
      expect(s.steps.at(-1)?.endsWith(`= ${s.unknown}.`)).toBe(true);
      expect(s.steps.join(' ')).not.toMatch(/undefined|NaN/);
    }
  });
});

describe('snapParts', () => {
  it('snaps to the nearest boundary and keeps at least one part', () => {
    expect(snapParts(0, 5)).toBe(1);
    expect(snapParts(0.58, 5)).toBe(3);
    expect(snapParts(1.4, 5)).toBe(5);
  });
});
