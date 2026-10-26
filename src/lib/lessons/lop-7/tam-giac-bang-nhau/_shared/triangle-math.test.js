import { describe, it, expect } from 'vitest';
import { degText } from '#lib/core/visuals/angle-math.js';
import {
  angleAt,
  angles,
  arcPath,
  fitInto,
  fromASA,
  fromSAS,
  kindOf,
  roundTo180,
  ssaBases,
} from './triangle-math.js';

describe('triangle angles', () => {
  it('measures a right angle and the angles of a 3-4-5 triangle', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 4, y: 0 };
    const c = { x: 0, y: -3 };
    expect(angleAt(b, a, c)).toBeCloseTo(90);
    const [A, B, C] = angles(a, b, c);
    expect(A + B + C).toBeCloseTo(180);
    expect(B).toBeCloseTo((Math.atan(3 / 4) * 180) / Math.PI);
  });

  it('rounds three angles to whole degrees that still sum to 180', () => {
    expect(roundTo180([59.6, 60.6, 59.8])).toEqual([60, 60, 60]);
    expect(roundTo180([33.4, 33.3, 113.3])).toEqual([34, 33, 113]);
    for (let i = 0; i < 50; i++) {
      const p = 1 + ((i * 37) % 120) + 0.37;
      const q = 1 + ((i * 53) % (178 - p)) + 0.21;
      const r = roundTo180([p, q, 180 - p - q]);
      expect(r.reduce((s, v) => s + v, 0)).toBe(180);
    }
  });

  it('classifies triangles by their largest angle', () => {
    expect(kindOf([60, 60, 60])).toBe('nhọn');
    expect(kindOf([90, 30, 60])).toBe('vuông');
    expect(kindOf([100, 50, 30])).toBe('tù');
  });

  it('draws no arc for a zero angle', () => {
    const o = { x: 0, y: 0 };
    expect(arcPath(o, { x: 1, y: 0 }, { x: 2, y: 0 }, 5)).toBe('');
    expect(arcPath(o, { x: 1, y: 0 }, { x: 0, y: -1 }, 5)).toMatch(/^M /);
  });

  it('writes degrees with a decimal comma', () => {
    expect(degText(47)).toBe('47°');
    expect(degText(32.5)).toBe('32,5°');
  });
});

describe('constructions', () => {
  it('solves c.g.c: 3, 90°, 4 gives a 3-4-5 triangle', () => {
    const t = fromSAS(3, 90, 4);
    expect(t.a).toBeCloseTo(5);
    expect(t.A + t.B + t.C).toBeCloseTo(180);
    expect(t.C).toBeCloseTo((Math.atan(3 / 4) * 180) / Math.PI);
  });

  it('solves g.c.g and refuses angles that add up to 180 or more', () => {
    const t = fromASA(60, 5, 60);
    expect(t?.b).toBeCloseTo(5);
    expect(t?.c).toBeCloseTo(5);
    expect(fromASA(100, 5, 80)).toBeNull();
  });

  it('finds none, one or two triangles from two sides and a non-included angle', () => {
    expect(ssaBases(30, 6, 2)).toEqual([]);
    expect(ssaBases(30, 6, 3)).toHaveLength(1); // b equals the height
    expect(ssaBases(30, 6, 4)).toHaveLength(2);
    expect(ssaBases(30, 6, 7)).toHaveLength(1); // b longer than c
    for (const x of ssaBases(30, 6, 4)) {
      // Law of cosines: b² = c² + x² − 2cx·cos B.
      expect(36 + x * x - 12 * x * Math.cos(Math.PI / 6)).toBeCloseTo(16);
    }
  });

  it('fits points into a box keeping proportions', () => {
    const { map, k } = fitInto(
      [
        { x: 0, y: 0 },
        { x: 2, y: 1 },
      ],
      { x: 10, y: 10, w: 100, h: 100 },
    );
    expect(k).toBe(50);
    expect(map({ x: 0, y: 0 })).toEqual({ x: 10, y: 35 });
  });
});
