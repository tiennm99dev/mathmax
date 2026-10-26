import { describe, expect, it } from 'vitest';
import { PRESETS, crossAt, substitute, zeros } from './engine.js';
import { expand } from '../_shared/factors.js';

describe('fractions of the widget', () => {
  it('find the values where the denominator is 0', () => {
    expect(PRESETS.map((p) => zeros(p.bottom))).toEqual([[2], [1.5], [-2, 2], [-1, 0], []]);
    // The widget starts at x = 1, which must leave every challenge unsolved.
    for (const p of PRESETS) expect(zeros(p.bottom)).not.toContain(1);
  });

  it('print the denominators the book way when expanded', () => {
    expect(expand(PRESETS[2].bottom)).toEqual([-4, 0, 1]);
    expect(expand(PRESETS[3].bottom)).toEqual([0, 1, 1]);
  });

  it('report no value where the denominator is 0', () => {
    expect(substitute(PRESETS[0].top, PRESETS[0].bottom, 2).value).toBeNull();
    expect(substitute(PRESETS[0].top, PRESETS[0].bottom, 4)).toEqual({
      top: 5,
      bottom: 2,
      value: 2.5,
    });
    expect(substitute(PRESETS[1].top, PRESETS[1].bottom, 1.5).value).toBeNull();
  });

  it('give equal cross products for equal fractions at every x', () => {
    for (let a = -5; a <= 5; a += 0.5) {
      const c = crossAt(PRESETS[3], a);
      expect(c?.ad).toBeCloseTo(c?.bc ?? NaN, 9);
    }
    expect(crossAt(PRESETS[0], 1)).toBeNull();
  });

  it('keep the partner of x² − 1 over x² + x defined at x = −1', () => {
    const p = PRESETS[3];
    expect(substitute(p.top, p.bottom, -1).value).toBeNull();
    const partner = p.partner ?? { top: [], bottom: [] };
    expect(substitute(partner.top, partner.bottom, -1).value).toBe(2);
  });
});
