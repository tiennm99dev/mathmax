import { describe, it, expect } from 'vitest';
import { formatNumber } from '#lib/core/number-format.js';
import { A_MAX_Y, B, C, COLS, bisector, snapA } from './engine.js';

/** Every grid position of A. */
function* positions() {
  for (let x = 0; x <= COLS; x++) for (let y = 0; y <= A_MAX_Y; y++) yield { x, y };
}

describe('the bisector model', () => {
  it('splits BC in the ratio of the adjacent sides', () => {
    for (const A of positions()) {
      const m = bisector(A);
      expect(m.segRatio).toBeCloseTo(m.sideRatio, 9);
      expect(m.db + m.dc).toBeCloseTo(10, 9);
      expect(m.angleBAD).toBeCloseTo(m.angleDAC, 9);
    }
  });

  it('prints matching ratios and angle halves at every grid position', () => {
    for (const A of positions()) {
      const m = bisector(A);
      expect(formatNumber(m.segRatio, 2), JSON.stringify(A)).toBe(formatNumber(m.sideRatio, 2));
      expect(formatNumber(m.angleBAD, 1), JSON.stringify(A)).toBe(formatNumber(m.angleDAC, 1));
    }
  });

  it('puts D at the midpoint exactly when AB = AC', () => {
    expect(bisector({ x: 6, y: 2 }).D).toEqual({ x: 6, y: 7 });
    const m = bisector({ x: 3, y: 3 });
    expect(m.D.x).toBeLessThan(m.M.x);
  });

  it('keeps A on the grid above BC', () => {
    expect(snapA({ x: 2.6, y: 9 })).toEqual({ x: 3, y: A_MAX_Y });
    expect(snapA({ x: -1, y: -1 })).toEqual({ x: 0, y: 0 });
    expect(B.y).toBe(C.y);
  });
});
