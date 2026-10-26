import { describe, it, expect } from 'vitest';
import {
  BINS,
  CARDS,
  PLANS,
  SCHOOL,
  SCHOOL_PERCENT,
  SPORTS,
  compare,
  surveyed,
  tally,
} from './engine.js';

describe('data cards', () => {
  it('puts every card in a known bin, with unique ids, and uses every bin', () => {
    const bins = new Set(BINS.map((b) => b.id));
    for (const c of CARDS) expect(bins.has(c.bin), c.id).toBe(true);
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
    for (const b of BINS) expect(CARDS.filter((c) => c.bin === b.id).length).toBeGreaterThan(2);
  });
});

describe('school survey', () => {
  it('has 400 students in 16 classes of 25', () => {
    expect(SCHOOL).toHaveLength(400);
    const classes = new Map();
    for (const s of SCHOOL) classes.set(s.cls, (classes.get(s.cls) ?? 0) + 1);
    expect(classes.size).toBe(16);
    for (const n of classes.values()) expect(n).toBe(25);
  });

  it('gives whole-school percentages that add up to 100', () => {
    expect(tally(SCHOOL)).toEqual([104, 120, 100, 76]);
    expect(SCHOOL_PERCENT).toEqual([26, 30, 25, 19]);
    expect(SPORTS).toHaveLength(4);
  });

  it('surveys the right students for each plan', () => {
    expect(surveyed('clb', 1)).toHaveLength(32);
    expect(surveyed('lop', 1).every((s) => s.cls === '9A')).toBe(true);
    expect(surveyed('it-ban', 3)).toHaveLength(6);
    const strat = surveyed('moi-lop', 5);
    expect(strat).toHaveLength(64);
    expect(new Set(strat.map((s) => s.id)).size).toBe(64);
    for (const c of new Set(SCHOOL.map((s) => s.cls)))
      expect(strat.filter((s) => s.cls === c)).toHaveLength(4);
    expect(() => surveyed('nope', 1)).toThrow();
  });

  it('shows the biased plans far from the school and the class-by-class plan close', () => {
    expect(compare(surveyed('clb', 1)).gap).toBeGreaterThan(40);
    expect(compare(surveyed('lop', 1)).gap).toBeGreaterThan(10);
    const median = (/** @type {string} */ id) => {
      const gaps = [];
      for (let s = 1; s <= 101; s++) gaps.push(compare(surveyed(id, s)).gap);
      return gaps.sort((a, b) => a - b)[50];
    };
    expect(median('moi-lop')).toBeLessThan(median('it-ban'));
    expect(median('moi-lop')).toBeLessThanOrEqual(8);
  });

  it('marks only the class-by-class random plan as representative', () => {
    expect(PLANS.filter((p) => p.representative).map((p) => p.id)).toEqual(['moi-lop']);
  });
});
