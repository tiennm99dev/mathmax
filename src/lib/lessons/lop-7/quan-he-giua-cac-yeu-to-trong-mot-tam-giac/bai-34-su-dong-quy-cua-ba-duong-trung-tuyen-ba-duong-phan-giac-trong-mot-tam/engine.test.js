import { describe, it, expect } from 'vitest';
import { bisectors, medians } from './engine.js';
import { angleAt, cross, dist } from '#lib/geom-engine/plane.js';

/** A spread of grid triangles, acute, right and obtuse. */
function triangles() {
  const out = [];
  const pts = [];
  for (let x = -4; x <= 4; x += 2) for (let y = -3; y <= 3; y += 1.5) pts.push({ x, y });
  for (const A of pts)
    for (const B of pts)
      for (const C of pts) if (Math.abs(cross(A, B, C)) >= 1) out.push({ A, B, C });
  return out;
}

describe('medians', () => {
  it('meet at G with AG = 2/3 AM on every median', () => {
    for (const t of triangles()) {
      const m = medians(t);
      for (const r of m.rows) {
        expect(r.ratio).toBeCloseTo(2 / 3, 9);
        expect(r.toG).toBeCloseTo(2 * r.rest, 9);
        // G lies on the median.
        expect(Math.abs(cross(r.vertex, r.end, m.G))).toBeLessThan(1e-9);
      }
    }
  });
});

describe('angle bisectors', () => {
  it('meet at a point equally far from the three sides', () => {
    for (const t of triangles()) {
      const b = bisectors(t);
      expect(b.IH).toBeCloseTo(b.IK, 9);
      expect(b.IK).toBeCloseTo(b.IL, 9);
      // I lies on each bisector segment, which halves its angle.
      expect(Math.abs(cross(t.A, b.D, b.I))).toBeLessThan(1e-9);
      expect(Math.abs(cross(t.B, b.E, b.I))).toBeLessThan(1e-9);
      expect(Math.abs(cross(t.C, b.F, b.I))).toBeLessThan(1e-9);
      expect(angleAt(t.A, t.B, b.D)).toBeCloseTo(angleAt(t.A, b.D, t.C), 6);
    }
  });

  it('finds the inradius of the 3-4-5 right triangle', () => {
    const b = bisectors({ A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 0, y: 3 } });
    expect(b.IH).toBeCloseTo(1, 12);
    expect(dist(b.I, { x: 1, y: 1 })).toBeCloseTo(0, 12);
  });
});
