import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  foldUpper,
  judgeReading,
  measureFrom,
  newMeasure,
  rayDirection,
  readDegrees,
} from './engine.js';

describe('virtual protractor', () => {
  it('turns a measure into a ray direction and back for either side', () => {
    for (const side of /** @type {const} */ (['phai', 'trai'])) {
      for (const m of [0, 35, 90, 140, 180]) {
        expect(measureFrom(rayDirection(m, side), side)).toBe(m);
      }
    }
    expect(rayDirection(30, 'trai')).toBe(150);
  });

  it('folds pointer directions onto the upper half', () => {
    expect(foldUpper(120)).toBe(120);
    expect(foldUpper(200)).toBe(180);
    expect(foldUpper(300)).toBe(0);
  });

  it('spots a reading taken on the wrong scale', () => {
    expect(judgeReading(60, 60).ok).toBe(true);
    expect(judgeReading(60, 120).text).toContain('nhầm thang');
    expect(judgeReading(60, 61).text).toContain('Gần đúng');
    expect(judgeReading(60, 10).ok).toBe(false);
    expect(judgeReading(60, null).ok).toBe(false);
  });

  it('reads typed degrees', () => {
    expect(readDegrees('45')).toBe(45);
    expect(readDegrees(' 120° ')).toBe(120);
    expect(readDegrees('90 độ')).toBe(90);
    expect(readDegrees('4,5')).toBe(null);
    expect(readDegrees('')).toBe(null);
  });

  it('draws new measures in range', () => {
    const r = rng(3);
    for (let k = 0; k < 400; k++) {
      const m = newMeasure(r, 60);
      expect(m).toBeGreaterThanOrEqual(5);
      expect(m).toBeLessThanOrEqual(175);
      expect(m).not.toBe(60);
    }
  });
});
