import { describe, it, expect } from 'vitest';
import { addend, chipBoard, chipRows, sumSteps } from './engine.js';

describe('addend', () => {
  it('turns subtraction into adding the opposite', () => {
    expect(addend(4, '+')).toBe(4);
    expect(addend(4, '-')).toBe(-4);
    expect(addend(-3, '-')).toBe(3);
  });
});

describe('chipBoard', () => {
  it('leaves exactly a + c chips after every zero pair cancels', () => {
    for (let a = -9; a <= 9; a++) {
      for (let c = -9; c <= 9; c++) {
        const { pos, neg, pairs, result } = chipBoard(a, c);
        expect(pos - neg).toBe(a + c);
        expect(result).toBe(a + c);
        expect(pairs).toBe(Math.min(pos, neg));
      }
    }
  });
});

describe('chipRows', () => {
  it('cancels one positive and one negative chip per pair', () => {
    const rows = chipRows(-3, 5, 2);
    expect(rows.first.map((c) => c.positive)).toEqual([false, false, false]);
    expect(rows.first.filter((c) => c.gone)).toHaveLength(2);
    expect(rows.second.filter((c) => c.gone)).toHaveLength(2);
    for (let a = -6; a <= 6; a++) {
      for (let c = -6; c <= 6; c++) {
        const { pairs } = chipBoard(a, c);
        const all = (() => {
          const r = chipRows(a, c, pairs);
          return [...r.first, ...r.second].filter((x) => !x.gone);
        })();
        expect(all.reduce((s, x) => s + (x.positive ? 1 : -1), 0)).toBe(a + c);
        expect(all.every((x) => x.positive === all[0].positive)).toBe(true);
      }
    }
  });
});

describe('sumSteps', () => {
  it('follows the rule for each case and ends with the sum', () => {
    expect(sumSteps(-7, -5).at(-1)).toMatch(/= −12\.$/);
    expect(sumSteps(-12, 5).at(-1)).toMatch(/\(−12\): \(−12\) \+ 5 = −7\.$/);
    expect(sumSteps(12, -5).at(-1)).toMatch(/= 7\.$/);
    expect(sumSteps(6, -6)[0]).toMatch(/số đối/);
    expect(sumSteps(0, -4)[0]).toMatch(/= −4\.$/);
    expect(sumSteps(3, 4)[0]).toMatch(/= 7\.$/);
  });
});
