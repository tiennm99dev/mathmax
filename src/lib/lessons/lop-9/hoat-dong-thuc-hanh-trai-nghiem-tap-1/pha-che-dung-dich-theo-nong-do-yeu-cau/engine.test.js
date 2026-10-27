import { describe, expect, it } from 'vitest';
import { mix, mixAmounts, percent, soluteToAdd, sugarWater, waterToAdd } from './engine.js';

describe('percentage concentration', () => {
  it('divides the solute by the whole solution', () => {
    expect(percent(25, 250)).toBeCloseTo(10, 12);
    expect(percent(15, 15 + 185)).toBeCloseTo(7.5, 12);
    expect(percent(0, 0)).toBe(0);
  });

  it('adds up the solute of two solutions', () => {
    const r = mix(400, 25, 600, 10);
    expect(r.mass).toBe(1000);
    expect(r.solute).toBeCloseTo(160, 12);
    expect(r.percent).toBeCloseTo(16, 12);
  });
});

describe('mixing system', () => {
  it('solves the worked examples', () => {
    const a = mixAmounts(20, 5, 10, 300);
    expect(a?.x).toBeCloseTo(100, 12);
    expect(a?.y).toBeCloseTo(200, 12);
    const b = mixAmounts(3, 15, 7, 600);
    expect(b?.x).toBeCloseTo(400, 12);
    expect(b?.y).toBeCloseTo(200, 12);
    const c = mixAmounts(20, 0, 12, 500);
    expect(c?.x).toBeCloseTo(300, 12);
    expect(c?.y).toBeCloseTo(200, 12);
  });

  it('gives back the target concentration', () => {
    const s = mixAmounts(35, 8, 17, 450);
    if (!s) throw new Error('expected a mixture');
    expect(mix(s.x, 35, s.y, 8).percent).toBeCloseTo(17, 10);
  });

  it('has no answer outside the two concentrations', () => {
    expect(mixAmounts(20, 5, 25, 300)).toBeNull();
    expect(mixAmounts(10, 10, 10, 300)).toBeNull();
  });
});

describe('sugar water from sugar and water', () => {
  it('satisfies both equations of the book system', () => {
    for (const a of [5, 10, 15, 20]) {
      const { sugar, water } = sugarWater(a);
      expect(sugar / 1.1 + water).toBeCloseTo(1000, 9);
      expect(percent(sugar, sugar + water)).toBeCloseTo(a, 9);
    }
  });

  it('matches the rounded table values', () => {
    const r = (/** @type {number} */ v) => Math.round(v * 10) / 10;
    expect(r(sugarWater(5).sugar)).toBe(50.2);
    expect(r(sugarWater(5).water)).toBe(954.3);
    expect(r(sugarWater(10).sugar)).toBe(100.9);
    expect(r(sugarWater(10).water)).toBe(908.3);
    expect(r(sugarWater(15).sugar)).toBe(152.1);
    expect(r(sugarWater(15).water)).toBe(861.8);
    expect(r(sugarWater(20).sugar)).toBe(203.7);
    expect(r(sugarWater(20).water)).toBe(814.8);
  });
});

describe('diluting and strengthening', () => {
  it('finds the water to add', () => {
    expect(waterToAdd(200, 15, 10)).toBeCloseTo(100, 12);
  });

  it('finds the solute to add', () => {
    expect(soluteToAdd(300, 10, 20)).toBeCloseTo(37.5, 12);
    expect(percent(30 + 37.5, 300 + 37.5)).toBeCloseTo(20, 12);
  });
});
