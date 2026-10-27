import { describe, it, expect } from 'vitest';
import { legsForAngleB, ratioText, ratios, sentence, sidesOf, specialAt } from './engine.js';

describe('trigonometric ratios', () => {
  it('reads opposite over hypotenuse and the rest on a 3-4-5 triangle', () => {
    const r = ratios(3, 4);
    expect(r.hyp).toBe(5);
    expect(r.sin).toBeCloseTo(0.6, 12);
    expect(r.cos).toBeCloseTo(0.8, 12);
    expect(r.tan).toBeCloseTo(0.75, 12);
    expect(r.cot).toBeCloseTo(4 / 3, 12);
    expect(r.deg).toBeCloseTo(36.87, 2);
  });

  it('swaps opposite and adjacent legs between the two acute angles', () => {
    expect(sidesOf('B', 4, 3)).toMatchObject({ opp: 3, adj: 4, oppName: 'AC', adjName: 'AB' });
    expect(sidesOf('C', 4, 3)).toMatchObject({ opp: 4, adj: 3, oppName: 'AB', adjName: 'AC' });
    const b = ratios(3, 4);
    const c = ratios(4, 3);
    expect(b.sin).toBeCloseTo(c.cos, 12);
    expect(b.tan).toBeCloseTo(c.cot, 12);
  });

  it('finds the special angles and matches their table values', () => {
    for (const deg of [30, 45, 60]) {
      const { ab, ac } = legsForAngleB(deg, 6);
      expect(Math.max(ab, ac)).toBeCloseTo(6, 12);
      expect(ratios(ac, ab).deg).toBeCloseTo(deg, 9);
    }
    expect(specialAt(30)?.sin).toBe('1/2');
    expect(specialAt(60.01)?.tan).toBe('√3');
    expect(specialAt(45)?.cot).toBe('1');
    expect(specialAt(40)).toBeNull();
    expect(Math.sin(Math.PI / 3)).toBeCloseTo(Math.sqrt(3) / 2, 12);
    expect(Math.tan(Math.PI / 6)).toBeCloseTo(Math.sqrt(3) / 3, 12);
  });

  it('writes ratios with a decimal comma', () => {
    expect(ratioText(0.6, undefined)).toBe('= 0,6');
    expect(ratioText(4 / 3, undefined)).toBe('≈ 1,333');
    expect(ratioText(0.5, '1/2')).toBe('= 1/2');
    expect(sentence('B', 4, 3)).toContain('sin C = cos B = 0,8');
    expect(sentence('C', 4, 3)).toContain('cạnh đối AB');
  });
});
