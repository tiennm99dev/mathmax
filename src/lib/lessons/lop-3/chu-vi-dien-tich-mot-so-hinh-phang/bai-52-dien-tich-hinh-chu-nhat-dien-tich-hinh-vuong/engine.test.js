import { describe, expect, it } from 'vitest';
import {
  MAX_COLS,
  MAX_ROWS,
  TARGETS,
  areaText,
  dimsOf,
  shapeKey,
  targetVerdict,
  waysFor,
} from './engine.js';

describe('the rectangle on the grid', () => {
  it('calls the longer side the length', () => {
    expect(dimsOf(3, 5)).toEqual({ length: 5, width: 3 });
    expect(shapeKey(2, 6)).toBe(shapeKey(6, 2));
  });

  it('works out the area the book way', () => {
    expect(areaText(4, 3)).toContain('4 × 3 = 12 (cm²)');
    expect(areaText(3, 3)).toBe('Hình vuông cạnh 3 cm. Diện tích: 3 × 3 = 9 (cm²).');
  });
});

describe('the challenge', () => {
  it('lists every rectangle of the area that fits the grid', () => {
    expect(waysFor(12)).toEqual([
      { length: 6, width: 2 },
      { length: 4, width: 3 },
    ]);
    expect(waysFor(9)).toEqual([
      { length: 9, width: 1 },
      { length: 3, width: 3 },
    ]);
  });

  it('asks only areas with at least two ways, each really of that area', () => {
    const bad = [];
    for (const t of TARGETS) {
      const ways = waysFor(t);
      if (ways.length < 2) bad.push(t);
      for (const w of ways) {
        if (w.length * w.width !== t) bad.push([t, w]);
        if (w.width > MAX_ROWS || w.width > MAX_COLS) bad.push([t, w]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('judges the rectangle against the target', () => {
    expect(targetVerdict(4, 3, 12).ok).toBe(true);
    expect(targetVerdict(2, 3, 12).text).toContain('Cần thêm');
    expect(targetVerdict(5, 3, 12).text).toContain('Thừa');
  });
});
