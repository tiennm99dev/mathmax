import { describe, it, expect } from 'vitest';
import { BAR_DATA, LINE_DATA, axisFrom, heightShare, looksTimes, percentChange } from './engine.js';

describe('cut axis arithmetic', () => {
  it('keeps heights proportional when the axis starts at 0', () => {
    expect(heightShare(60, 0, 120)).toBe(0.5);
    expect(looksTimes(96, 108, 0)).toBeCloseTo(108 / 96, 12);
  });

  it('exaggerates the gap when the axis is cut', () => {
    expect(looksTimes(96, 108, 90)).toBe(3);
    expect(looksTimes(96, 108, 94)).toBe(7);
    expect(heightShare(80, 90, 120)).toBe(0);
  });

  it('measures the real change in percent', () => {
    expect(percentChange(1200, 1250)).toBeCloseTo(4.1667, 3);
    expect(percentChange(80, 100)).toBe(25);
  });

  it('every slider position keeps all values above the axis start', () => {
    for (const d of [BAR_DATA, LINE_DATA]) {
      expect(Math.min(...d.values)).toBeGreaterThan(d.maxBase);
      expect(d.maxBase % d.step).toBe(0);
    }
  });
});

describe('axisFrom', () => {
  it('starts at the axis start and rises in round steps past the largest value', () => {
    expect(axisFrom(0, 108)).toEqual({ top: 120, ticks: [0, 20, 40, 60, 80, 100, 120] });
    expect(axisFrom(90, 108)).toEqual({ top: 110, ticks: [90, 95, 100, 105, 110] });
    const t = axisFrom(1190, 1250);
    expect(t.ticks[0]).toBe(1190);
    expect(t.top).toBeGreaterThan(1250);
    for (const d of [BAR_DATA, LINE_DATA]) {
      for (let b = 0; b <= d.maxBase; b += d.step) {
        const a = axisFrom(b, Math.max(...d.values));
        expect(a.top).toBeGreaterThan(Math.max(...d.values));
        for (let k = 1; k < a.ticks.length; k++) expect(a.ticks[k]).toBeGreaterThan(a.ticks[k - 1]);
      }
    }
  });
});
