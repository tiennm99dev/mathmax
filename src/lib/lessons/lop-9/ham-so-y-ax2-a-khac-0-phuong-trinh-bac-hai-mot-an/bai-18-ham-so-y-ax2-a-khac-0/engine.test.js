import { describe, it, expect } from 'vitest';
import {
  CHALLENGES,
  coefficientThrough,
  passesThrough,
  shapeSentence,
  symmetrySentence,
  valueAt,
  widthSentence,
} from './engine.js';

describe('parabola y = ax²', () => {
  it('evaluates without noise', () => {
    expect(valueAt(0.25, -2)).toBe(1);
    expect(valueAt(-1.5, 3)).toBe(-13.5);
  });

  it('names the side of the axis from the sign of a', () => {
    expect(shapeSentence(2).text).toContain('phía trên');
    expect(shapeSentence(2).text).toContain('thấp nhất');
    expect(shapeSentence(-0.5).text).toContain('phía dưới');
    expect(shapeSentence(-0.5).text).toContain('cao nhất');
    expect(shapeSentence(0).tone).toBe('warn');
  });

  it('compares the opening with y = ±x²', () => {
    expect(widthSentence(3)).toContain('hẹp');
    expect(widthSentence(-0.25)).toContain('rộng');
    expect(widthSentence(-0.25)).toContain('y = −x²');
    expect(widthSentence(1)).toContain('trùng');
  });

  it('mirrors a point across Oy', () => {
    expect(symmetrySentence(2, 1.5)).toContain('M(1,5; 4,5) và M′(−1,5; 4,5)');
    expect(symmetrySentence(2, 0)).toContain('đỉnh O');
  });

  it('every challenge is reachable by one slider step', () => {
    for (const p of CHALLENGES) {
      const a = coefficientThrough(p);
      expect(a).not.toBe(0);
      expect(Math.abs(a)).toBeLessThanOrEqual(3);
      expect(Number.isInteger(a * 4)).toBe(true);
      expect(passesThrough(a, p)).toBe(true);
      expect(passesThrough(a + 0.25, p)).toBe(false);
    }
  });
});
