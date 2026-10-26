import { describe, it, expect } from 'vitest';
import { CASES, compare, legs, measures } from './engine.js';

describe('right triangle builder', () => {
  it('gives the reference triangle of every case a right angle and valid data', () => {
    for (const c of CASES) {
      const l = legs(c.id, ...c.given);
      expect(l, c.id).not.toBeNull();
      const m = measures(/** @type {{ e: number, f: number }} */ (l));
      expect(m.E + m.F).toBeCloseTo(90);
      expect(m.hyp).toBeGreaterThan(Math.max(m.leg1, m.leg2));
      for (const [i, r] of c.range.entries()) {
        const v = c.given[i];
        expect(v >= r.min && v <= r.max).toBe(true);
        expect(Math.abs(((v - r.min) / r.step) % 1)).toBeLessThan(1e-9);
      }
    }
  });

  it('builds the triangle each case describes', () => {
    expect(measures({ e: 3, f: 4 }).hyp).toBeCloseTo(5);
    const a = measures(/** @type {{ e: number, f: number }} */ (legs('ch-gn', 6, 50)));
    expect(a.hyp).toBeCloseTo(6);
    expect(a.E).toBeCloseTo(50);
    const b = measures(/** @type {{ e: number, f: number }} */ (legs('cgv-gn', 4, 35)));
    expect(b.leg1).toBeCloseTo(4);
    expect(b.E).toBeCloseTo(35);
    const c = measures(/** @type {{ e: number, f: number }} */ (legs('ch-cgv', 6.5, 2.5)));
    expect(c.leg2).toBeCloseTo(6);
    expect(legs('ch-cgv', 3, 3)).toBeNull();
  });

  it('reports congruence only when both data match', () => {
    const info = CASES[2];
    expect(compare(info, 6, 50).congruent).toBe(true);
    expect(compare(info, 6, 49)).toEqual({ ok: [true, false], congruent: false });
  });
});
