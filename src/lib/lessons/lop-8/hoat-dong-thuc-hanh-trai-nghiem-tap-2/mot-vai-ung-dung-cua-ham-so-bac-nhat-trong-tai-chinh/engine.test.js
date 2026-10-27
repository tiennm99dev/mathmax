import { describe, expect, it } from 'vitest';
import {
  breakEven,
  crossing,
  depreciation,
  niceCeil,
  profit,
  strips,
  ticksTo,
  valueAt,
} from './engine.js';

describe('cable television plans', () => {
  const a = { a: 110, b: 150 };
  const b = { a: 120, b: 0 };

  it('cost the stated amounts after 18 months and 3 years', () => {
    expect(valueAt(a, 18)).toBe(2130);
    expect(valueAt(b, 18)).toBe(2160);
    expect(valueAt(a, 36)).toBe(4110);
    expect(valueAt(b, 36)).toBe(4320);
  });

  it('cost the same after 15 months', () => {
    const c = crossing(a, b);
    expect(c?.x).toBeCloseTo(15, 12);
    expect(c?.y).toBeCloseTo(1800, 9);
  });

  it('has no crossing for parallel plans', () => {
    expect(crossing({ a: 100, b: 0 }, { a: 100, b: 50 })).toBeNull();
  });
});

describe('refrigerators', () => {
  it('cost the same after 36 months', () => {
    const c = crossing({ a: 60000, b: 5000000 }, { a: 75000, b: 4460000 });
    expect(c?.x).toBeCloseTo(36, 9);
  });
});

describe('break-even', () => {
  it('is F / (p − v)', () => {
    expect(breakEven(15000, 30, 80)).toBe(300);
    expect(profit(15000, 30, 80, 450)).toBe(7500);
    expect(profit(15000, 30, 80, 300)).toBe(0);
    expect(profit(15000, 30, 80, 200)).toBe(-5000);
  });

  it('never happens when a unit sells at cost or below', () => {
    expect(breakEven(1000, 50, 50)).toBeNull();
    expect(breakEven(1000, 60, 50)).toBeNull();
  });
});

describe('depreciation', () => {
  it('loses the same amount each year', () => {
    const car = depreciation(480, 8);
    expect(car.a).toBe(-60);
    expect(valueAt(car, 3)).toBe(300);
    expect(valueAt(car, 8)).toBe(0);
    expect(crossing(car, { a: 0, b: 150 })?.x).toBeCloseTo(5.5, 12);
  });
});

describe('strips', () => {
  it('splits at the crossing and signs each side', () => {
    const s = strips({ a: 110, b: 150 }, { a: 120, b: 0 }, 36);
    expect(s).toHaveLength(2);
    expect(s[0].sign).toBe(-1);
    expect(s[1].sign).toBe(1);
    expect(s[0].points[1].x).toBeCloseTo(15, 12);
  });

  it('keeps one strip when the lines do not cross inside', () => {
    expect(strips({ a: 1, b: 0 }, { a: 2, b: 5 }, 10)).toHaveLength(1);
  });
});

describe('axis helpers', () => {
  it('rounds up to friendly values', () => {
    expect(niceCeil(4320)).toBe(5000);
    expect(niceCeil(180)).toBe(200);
    expect(niceCeil(230)).toBe(250);
  });

  it('covers the range', () => {
    const t = ticksTo(4320);
    expect(t[0]).toBe(0);
    expect(t.at(-1)).toBeGreaterThanOrEqual(4320);
  });
});
