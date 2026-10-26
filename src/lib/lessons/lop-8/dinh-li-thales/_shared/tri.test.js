import { describe, it, expect } from 'vitest';
import {
  angleAt,
  bisectorFoot,
  cross,
  dist,
  gcd,
  isParallel,
  midpoint,
  simplify,
  triangleFromSides,
} from './tri.js';

describe('triangle helpers', () => {
  it('measures angles in degrees', () => {
    const V = { x: 0, y: 0 };
    expect(angleAt(V, { x: 1, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90, 9);
    expect(angleAt(V, { x: 1, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(180, 9);
    expect(angleAt(V, { x: 1, y: 1 }, { x: 1, y: -1 })).toBeCloseTo(90, 9);
  });

  it('rejects sides that break the triangle inequality', () => {
    expect(triangleFromSides(2, 3, 5)).toBeNull();
    expect(triangleFromSides(3, 4, 5)).not.toBeNull();
  });

  it('builds a 3-4-5 triangle right-angled at A', () => {
    const t = triangleFromSides(3, 4, 5);
    if (!t) throw new Error('no triangle');
    expect(angleAt(t.A, t.B, t.C)).toBeCloseTo(90, 9);
    expect(t.A.y).toBeLessThan(0);
  });

  it('puts the bisector foot where DB/DC = AB/AC and the angle is halved', () => {
    const t = triangleFromSides(6, 9, 10);
    if (!t) throw new Error('no triangle');
    const D = bisectorFoot(t.A, t.B, t.C);
    expect(dist(D, t.B) / dist(D, t.C)).toBeCloseTo(6 / 9, 9);
    expect(dist(D, t.B)).toBeCloseTo(4, 9);
    expect(angleAt(t.A, t.B, D)).toBeCloseTo(angleAt(t.A, D, t.C), 9);
  });

  it('finds parallel segments and collinear points', () => {
    const A = { x: 2, y: 8 };
    const B = { x: 0, y: 0 };
    const C = { x: 10, y: 0 };
    expect(isParallel(midpoint(A, B), midpoint(A, C), B, C)).toBe(true);
    expect(isParallel(A, B, B, C)).toBe(false);
    expect(cross(B, C, { x: 5, y: 0 })).toBe(0);
  });

  it('reduces fractions', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(simplify(4, 12)).toEqual([1, 3]);
    expect(simplify(5, 7)).toEqual([5, 7]);
  });
});
