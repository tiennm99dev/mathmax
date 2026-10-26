import { describe, it, expect } from 'vitest';
import { build, isCase, measures } from './engine.js';

/** @type {import('./engine.js').Data} */
const base = { a: 5, b: 4, c: 3, A: 90, B: 40, C: 60 };

describe('triangle builder', () => {
  it('builds one triangle from two sides and the included angle', () => {
    const ts = build('cgc', base);
    expect(ts).toHaveLength(1);
    const m = measures(ts[0]);
    expect(m.c).toBeCloseTo(3);
    expect(m.b).toBeCloseTo(4);
    expect(m.A).toBeCloseTo(90);
    expect(m.a).toBeCloseTo(5);
  });

  it('builds one triangle from a side and its two adjacent angles', () => {
    const ts = build('gcg', base);
    expect(ts).toHaveLength(1);
    const m = measures(ts[0]);
    expect(m.a).toBeCloseTo(5);
    expect(m.B).toBeCloseTo(40);
    expect(m.C).toBeCloseTo(60);
    expect(m.A).toBeCloseTo(80);
    expect(build('gcg', { ...base, B: 120, C: 60 })).toEqual([]);
  });

  it('finds two different triangles for two sides and a non-included angle', () => {
    const ts = build('ccg', { ...base, B: 30, c: 6, b: 4 });
    expect(ts).toHaveLength(2);
    const [m1, m2] = ts.map(measures);
    for (const m of [m1, m2]) {
      expect(m.c).toBeCloseTo(6);
      expect(m.b).toBeCloseTo(4);
      expect(m.B).toBeCloseTo(30);
    }
    expect(Math.abs(m1.a - m2.a)).toBeGreaterThan(1);
    expect(build('ccg', { ...base, B: 30, c: 6, b: 2 })).toEqual([]);
  });

  it('builds two triangles of different sizes with the same three angles', () => {
    const ts = build('ggg', { ...base, A: 70, B: 50 });
    expect(ts).toHaveLength(2);
    const [m1, m2] = ts.map(measures);
    expect(m1.A).toBeCloseTo(m2.A);
    expect(m1.C).toBeCloseTo(60);
    expect(m1.a).not.toBeCloseTo(m2.a);
  });

  it('names c.g.c and g.c.g as the cases that fix a triangle', () => {
    expect(isCase('cgc') && isCase('gcg')).toBe(true);
    expect(isCase('ccg') || isCase('ggg')).toBe(false);
  });
});
