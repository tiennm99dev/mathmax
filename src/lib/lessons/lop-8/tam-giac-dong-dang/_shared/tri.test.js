import { describe, it, expect } from 'vitest';
import {
  fitScale,
  fromASA,
  fromHypotenuseLeg,
  fromSAS,
  fromSSS,
  isTriangle,
  layout,
  ratioTex,
  sameRatio,
  similar,
} from './tri.js';

/** @param {import('./tri.js').Tri} t */
const angleSum = (t) => t.A + t.B + t.C;

describe('triangle builders', () => {
  it('rejects lengths that break the triangle inequality', () => {
    expect(isTriangle(3, 4, 5)).toBe(true);
    expect(isTriangle(1, 2, 3)).toBe(false);
    expect(fromSSS(2, 9, 4)).toBeNull();
  });

  it('finds the angles of a 3-4-5 triangle', () => {
    // AB = 3, BC = 5, CA = 4: right angle at A.
    const t = fromSSS(3, 5, 4);
    expect(t?.A).toBeCloseTo(90, 9);
    expect(t && angleSum(t)).toBeCloseTo(180, 9);
  });

  it('builds from two sides and the included angle', () => {
    const t = fromSAS(3, 4, 90);
    expect(t?.bc).toBeCloseTo(5, 9);
    const eq = fromSAS(5, 5, 60);
    expect(eq?.bc).toBeCloseTo(5, 9);
    expect(eq?.B).toBeCloseTo(60, 9);
    expect(fromSAS(3, 4, 180)).toBeNull();
  });

  it('builds from a side and two angles', () => {
    const t = fromASA(6, 60, 60);
    expect(t?.ab).toBeCloseTo(6, 9);
    expect(t?.ca).toBeCloseTo(6, 9);
    expect(fromASA(6, 100, 80)).toBeNull();
  });

  it('builds a right triangle from hypotenuse and leg', () => {
    const t = fromHypotenuseLeg(13, 5);
    expect(t?.ca).toBeCloseTo(12, 9);
    expect(t && angleSum(t)).toBeCloseTo(180, 9);
    expect(fromHypotenuseLeg(5, 5)).toBeNull();
  });
});

describe('similarity', () => {
  it('compares ratios exactly for whole numbers', () => {
    expect(sameRatio(8, 4, 10, 5)).toBe(true);
    expect(sameRatio(8, 4, 11, 5)).toBe(false);
  });

  it('sees that the three cases each force similar triangles', () => {
    const t = fromSSS(4, 5, 6);
    const sss = fromSSS(8, 10, 12);
    const sas = t && fromSAS(2 * t.ab, 2 * t.ca, t.A);
    const aa = t && fromASA(3 * t.bc, t.B, t.C);
    expect(t && sss && similar(t, sss)).toBe(true);
    expect(t && sas && similar(t, sas)).toBe(true);
    expect(t && aa && similar(t, aa)).toBe(true);
    const other = fromSSS(8, 10, 11);
    expect(t && other && similar(t, other)).toBe(false);
  });

  it('sees hypotenuse-leg pairs in proportion as similar', () => {
    const t = fromHypotenuseLeg(5, 3);
    const u = fromHypotenuseLeg(15, 9);
    expect(t && u && similar(t, u)).toBe(true);
  });
});

describe('layout', () => {
  it('places the vertices at the right distances', () => {
    const t = fromSSS(4, 5, 6);
    if (!t) throw new Error('not a triangle');
    const { A, B, C } = layout(t);
    expect(Math.hypot(A.x - B.x, A.y - B.y)).toBeCloseTo(4, 9);
    expect(Math.hypot(A.x - C.x, A.y - C.y)).toBeCloseTo(6, 9);
    expect(C.x).toBe(5);
    expect(A.y).toBeGreaterThan(0);
  });

  it('fits every triangle in the box at one scale', () => {
    const t = fromSSS(4, 5, 6);
    const u = fromSSS(8, 10, 12);
    if (!t || !u) throw new Error('not a triangle');
    const s = fitScale([t, u], 160, 150);
    expect(u.bc * s).toBeLessThanOrEqual(160 + 1e-9);
    expect(layout(u).A.y * s).toBeLessThanOrEqual(150 + 1e-9);
  });
});

describe('ratioTex', () => {
  it('writes the ratio and its lowest terms', () => {
    expect(ratioTex(8, 4)).toBe('\\dfrac{8}{4} = 2');
    expect(ratioTex(6, 4)).toBe('\\dfrac{6}{4} = \\dfrac{3}{2}');
    expect(ratioTex(3, 4)).toBe('\\dfrac{3}{4}');
  });
});
