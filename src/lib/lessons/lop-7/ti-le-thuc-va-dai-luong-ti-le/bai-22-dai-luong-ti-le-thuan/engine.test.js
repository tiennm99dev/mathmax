import { describe, it, expect } from 'vitest';
import { isProportional, tableFor } from './engine.js';

describe('tables of y = kx + b', () => {
  it('has the constant ratio k when b is 0', () => {
    const rows = tableFor(-1.5, 0, [1, 2, 3, 4]);
    expect(rows.map((r) => r.y)).toEqual([-1.5, -3, -4.5, -6]);
    expect(rows.every((r) => r.ratio === -1.5)).toBe(true);
    expect(isProportional(rows)).toBe(true);
  });

  it('is not proportional with a fixed extra part, even though y grows with x', () => {
    const rows = tableFor(2, 2, [1, 2, 3, 4]);
    expect(rows.map((r) => r.y)).toEqual([4, 6, 8, 10]);
    expect(rows.map((r) => r.ratio)).toEqual([4, 3, 8 / 3, 2.5]);
    expect(isProportional(rows)).toBe(false);
  });

  it('rejects k = 0 and skips x = 0', () => {
    expect(isProportional(tableFor(0, 0, [1, 2]))).toBe(false);
    const rows = tableFor(3, 0, [0, 1, 2]);
    expect(rows[0].ratio).toBeNull();
    expect(isProportional(rows)).toBe(true);
  });
});
