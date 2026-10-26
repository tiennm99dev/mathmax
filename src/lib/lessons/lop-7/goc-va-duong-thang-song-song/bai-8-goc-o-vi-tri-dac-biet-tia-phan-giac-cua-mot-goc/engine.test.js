import { describe, it, expect } from 'vitest';
import { MAX, MIN, fourAngles, lineDirection, rayInside, split } from './engine.js';

describe('two crossing lines', () => {
  it('gives equal vertical angles and supplementary adjacent ones', () => {
    for (let theta = MIN; theta <= MAX; theta++) {
      const a = fourAngles(theta);
      expect(a.xOy).toBe(a.x2Oy2);
      expect(a.yOx2).toBe(a.y2Ox);
      expect(a.xOy + a.yOx2).toBe(180);
      expect(a.xOy + a.yOx2 + a.x2Oy2 + a.y2Ox).toBe(360);
    }
  });

  it('folds a pointer below the line onto the other end and clamps it', () => {
    expect(lineDirection(60)).toBe(60);
    expect(lineDirection(240)).toBe(60);
    expect(lineDirection(2)).toBe(MIN);
    expect(lineDirection(179)).toBe(MAX);
    expect(lineDirection(359.6)).toBe(MAX);
  });

  it('keeps Ot inside xOy and finds the bisector', () => {
    expect(rayInside(30.3, 80)).toBe(30.5);
    expect(rayInside(120, 80)).toBe(79.5);
    expect(rayInside(300, 80)).toBe(0.5);
    expect(split(40, 80)).toEqual({ xOt: 40, tOy: 40, isBisector: true });
    expect(split(32.5, 65).isBisector).toBe(true);
    expect(split(30, 65).isBisector).toBe(false);
  });
});
