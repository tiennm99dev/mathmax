import { describe, it, expect } from 'vitest';
import { cellAt, combine, resultCells, workLines } from './engine.js';

describe('cellAt', () => {
  it('counts down each column, then moves to the next rectangle', () => {
    expect(cellAt(0, 3, 2)).toEqual({ rect: 0, col: 0, row: 0 });
    expect(cellAt(4, 3, 2)).toEqual({ rect: 0, col: 1, row: 1 });
    expect(cellAt(6, 3, 2)).toEqual({ rect: 1, col: 0, row: 0 });
  });
});

describe('resultCells', () => {
  it('pools a·d and c·b cells for a sum', () => {
    // 1/2 + 1/3 on a 2 × 3 grid: 3 + 2 = 5 cells of 6
    const cells = resultCells(1, 2, 1, 3, '+');
    expect(cells.length).toBe(5);
    expect(cells.filter((c) => c.kind === 'a').length).toBe(3);
    expect(cells.filter((c) => c.kind === 'b').length).toBe(2);
  });

  it('spills into a second rectangle when the sum passes 1', () => {
    const cells = resultCells(3, 4, 2, 3, '+');
    expect(cells.length).toBe(9 + 8);
    expect(cells.some((c) => c.rect === 1)).toBe(true);
  });

  it('marks the taken-away cells for a difference', () => {
    const cells = resultCells(3, 4, 1, 3, '-');
    expect(cells.filter((c) => c.kind === 'a').length).toBe(9 - 4);
    expect(cells.filter((c) => c.kind === 'removed').length).toBe(4);
  });

  it('agrees with combine', () => {
    for (let b = 2; b <= 6; b++)
      for (let d = 2; d <= 6; d++)
        for (let a = 0; a <= b; a++)
          for (let c = 0; c <= d; c++) {
            const sum = resultCells(a, b, c, d, '+').length;
            const f = combine(a, b, c, d, '+');
            expect(sum * f.d).toBe(f.n * b * d);
          }
  });
});

describe('workLines', () => {
  it('uses the least common denominator and reduces', () => {
    expect(workLines(1, 6, 1, 3, '+')).toEqual([
      'Mẫu chung BCNN(6, 3) = 6; thừa số phụ 1 và 2.',
      '1/6 + 1/3 = 1/6 + 2/6 = 3/6.',
      'Rút gọn: 3/6 = 1/2.',
    ]);
    expect(workLines(3, 5, 1, 5, '-')).toEqual(['Cùng mẫu 5: 3/5 − 1/5 = (3 − 1)/5 = 2/5.']);
  });
});
