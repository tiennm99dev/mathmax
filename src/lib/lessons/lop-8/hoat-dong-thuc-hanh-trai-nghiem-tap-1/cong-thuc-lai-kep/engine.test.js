import { describe, expect, it } from 'vitest';
import {
  choose,
  compoundAmount,
  expansion,
  expansionTex,
  niceTicks,
  periodRate,
  series,
  simpleAmount,
} from './engine.js';

describe('periodRate', () => {
  it('splits a yearly rate over twelve monthly periods', () => {
    expect(periodRate(6, 'nam')).toBeCloseTo(0.06, 12);
    expect(periodRate(6, 'thang')).toBeCloseTo(0.005, 12);
  });
});

describe('simple and compound amounts', () => {
  it('match the worked examples', () => {
    expect(simpleAmount(100, 0.06, 3)).toBeCloseTo(118, 9);
    expect(compoundAmount(100, 0.06, 2)).toBeCloseTo(112.36, 9);
    expect(compoundAmount(100, 0.06, 3)).toBeCloseTo(119.1016, 9);
    expect(compoundAmount(200, 0.005, 3)).toBeCloseTo(203.015025, 9);
    expect(compoundAmount(20, 0.1, 3)).toBeCloseTo(26.62, 9);
  });

  it('agree after one period and then compound pulls ahead', () => {
    const rows = series(50, 0.08, 4);
    expect(rows).toHaveLength(5);
    expect(rows[1].simple).toBeCloseTo(rows[1].compound, 12);
    for (const row of rows.slice(2)) expect(row.compound).toBeGreaterThan(row.simple);
  });

  it('differ by P r^2 after two periods', () => {
    expect(compoundAmount(200, 0.07, 2) - simpleAmount(200, 0.07, 2)).toBeCloseTo(0.98, 9);
  });
});

describe('expansion', () => {
  it('uses binomial coefficients', () => {
    expect(choose(4, 2)).toBe(6);
    expect(expansion(3).map((t) => t.c)).toEqual([1, 3, 3, 1]);
  });

  it('evaluates back to the compound amount', () => {
    const p = 50;
    const r = 0.08;
    const value = expansion(2).reduce((s, { k, c }) => s + c * p * r ** k, 0);
    expect(value).toBeCloseTo(compoundAmount(p, r, 2), 12);
  });

  it('writes TeX term by term', () => {
    expect(expansionTex(1)).toBe('P + Pr');
    expect(expansionTex(3)).toBe('P + 3Pr + 3Pr^{2} + Pr^{3}');
  });
});

describe('niceTicks', () => {
  it('covers the range with round steps', () => {
    const t = niceTicks(100, 180);
    expect(t[0]).toBeLessThanOrEqual(100);
    expect(t.at(-1)).toBeGreaterThanOrEqual(180);
    expect(t).toContain(120);
  });
});
