import { describe, it, expect } from 'vitest';
import { STEPS, TRIANGLES, measures, nearestStep, stepOf } from './engine.js';
import { dist, isParallel, lerp, triangleFromSides } from '#lib/geom-engine/plane.js';

describe('the Thalès widget model', () => {
  it('builds every offered triangle with the stated sides', () => {
    for (const t of TRIANGLES) {
      const tri = triangleFromSides(t.ab, t.ac, t.bc);
      expect(tri).not.toBeNull();
      if (!tri) continue;
      expect(dist(tri.A, tri.B)).toBeCloseTo(t.ab, 9);
      expect(dist(tri.A, tri.C)).toBeCloseTo(t.ac, 9);
      expect(dist(tri.B, tri.C)).toBeCloseTo(t.bc, 9);
    }
  });

  it("calls B'C' parallel to BC exactly when the drawing is parallel", () => {
    for (const t of TRIANGLES) {
      const tri = triangleFromSides(t.ab, t.ac, t.bc);
      if (!tri) throw new Error('bad triangle');
      for (let i = 1; i < STEPS; i++) {
        for (let j = 1; j < STEPS; j++) {
          const Bp = lerp(tri.A, tri.B, i / STEPS);
          const Cp = lerp(tri.A, tri.C, j / STEPS);
          expect(measures(t, i, j).parallel).toBe(isParallel(Bp, Cp, tri.B, tri.C));
        }
      }
    }
  });

  it('gives lengths that add up and equal ratios when parallel', () => {
    const t = TRIANGLES[0];
    const m = measures(t, 4, 4);
    expect(m.abP).toBe(4);
    expect(m.bPb).toBe(8);
    expect(m.acP).toBe(5);
    expect(m.cPc).toBe(10);
    expect(m.ratioB).toEqual([1, 3]);
    expect(m.ratioC).toEqual([1, 3]);
    expect(m.ratioB2).toEqual([1, 2]);
    expect(m.ratioC2).toEqual([1, 2]);
    expect(measures(t, 4, 5).ratioC).toEqual([5, 12]);
  });

  it('snaps a pointer to the nearest inner step', () => {
    const A = { x: 0, y: 0 };
    const B = { x: 120, y: 0 };
    expect(nearestStep(A, B, { x: 41, y: 30 })).toBe(4);
    expect(nearestStep(A, B, { x: -50, y: 0 })).toBe(1);
    expect(nearestStep(A, B, { x: 500, y: 0 })).toBe(STEPS - 1);
    expect(stepOf(0)).toBe(1);
    expect(stepOf(14)).toBe(STEPS - 1);
  });
});
