import { describe, it, expect } from 'vitest';
import { frame, labelOutside, measureTri, placeVertex, same, toGrid } from './grid-triangle.js';

const box = { minX: -4, maxX: 4, minY: -3, maxY: 3 };
const tri = { A: { x: 0, y: 2 }, B: { x: -2, y: 0 }, C: { x: 2, y: 0 } };

describe('grid triangle', () => {
  it('snaps to the half-unit grid inside the box', () => {
    expect(toGrid(1.26)).toBe(1.5);
    expect(placeVertex(tri, 'A', { x: 9.2, y: 0.7 }, box)).toEqual({ x: 4, y: 0.5 });
  });

  it('keeps a vertex in place rather than flattening the triangle', () => {
    expect(placeVertex(tri, 'A', { x: 0, y: 0 }, box)).toEqual(tri.A);
  });

  it('measures exact squared sides and the angle at each vertex', () => {
    const m = measureTri(tri);
    expect(m.sq).toEqual({ A: 16, B: 8, C: 8 });
    expect(same(m.sq.B, m.sq.C)).toBe(true);
    expect(m.angle.A).toBeCloseTo(90, 9);
    expect(m.angle.B).toBeCloseTo(45, 9);
    expect(m.angle.A + m.angle.B + m.angle.C).toBeCloseTo(180, 9);
  });

  it('converts between grid and SVG units', () => {
    const f = frame(20, 100, 80);
    expect(f.toSvg({ x: 1, y: 2 })).toEqual({ x: 120, y: 40 });
    expect(f.fromSvg({ x: 120, y: 40 })).toEqual({ x: 1, y: 2 });
  });

  it('puts a label away from the centroid', () => {
    const s = labelOutside(tri.A, tri, 1);
    expect(s.x).toBeCloseTo(0, 9);
    expect(s.y).toBeGreaterThan(tri.A.y);
  });
});
