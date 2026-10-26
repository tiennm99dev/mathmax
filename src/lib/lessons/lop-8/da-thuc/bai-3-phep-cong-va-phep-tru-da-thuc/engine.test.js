import { describe, it, expect } from 'vitest';
import { PAIRS, columns, readCoef, result, rows } from './engine.js';
import { evalPoly, isCollected, monoText, polyText } from '../_shared/poly.js';

describe('pairs', () => {
  it('are written collected, so each row has one term per column', () => {
    for (const p of PAIRS) {
      const { a, b } = rows(p);
      expect(isCollected(a)).toBe(true);
      expect(isCollected(b)).toBe(true);
    }
  });

  it('give the results the lesson states', () => {
    expect(PAIRS.map((p) => polyText(result(p)))).toEqual([
      '2x²y + xy + 2y − 5',
      '2x² − 7xy + 2y²',
      '5xy + 3 + y',
      '3xy²',
    ]);
  });

  it('agree with A ± B evaluated at sample points', () => {
    for (const p of PAIRS) {
      const { a, b } = rows(p);
      for (const v of [
        { x: 2, y: -3 },
        { x: -1, y: 4 },
      ]) {
        const want =
          p.op === '+' ? evalPoly(a, v) + evalPoly(b, v) : evalPoly(a, v) - evalPoly(b, v);
        expect(evalPoly(result(p), v)).toBe(want);
      }
    }
  });
});

describe('columns', () => {
  it('lines up like terms and leaves gaps', () => {
    const { a, second } = rows(PAIRS[0]);
    const cols = columns(a, second);
    expect(cols.map((c) => c.key)).toEqual(['x2y1', 'x1y1', 'y1', '']);
    expect(cols.map((c) => monoText(c.sum))).toEqual(['2x²y', 'xy', '2y', '−5']);
    expect(cols[2].b).toBeNull();
    expect(cols[3].a).toBeNull();
  });

  it('changes the signs of B for a difference', () => {
    const { second } = rows(PAIRS[1]);
    expect(polyText(second)).toBe('−x² − 5xy + y²');
    const cols = columns(rows(PAIRS[3]).a, rows(PAIRS[3]).second);
    expect(cols.map((c) => c.sum.coef)).toEqual([3, 0, 0]);
  });
});

describe('readCoef', () => {
  it('reads signed integers only', () => {
    expect(readCoef('−7')).toBe(-7);
    expect(readCoef(' +3 ')).toBe(3);
    expect(readCoef('-0')).toBe(0);
    expect(readCoef('')).toBeNull();
    expect(readCoef('2x')).toBeNull();
  });
});
