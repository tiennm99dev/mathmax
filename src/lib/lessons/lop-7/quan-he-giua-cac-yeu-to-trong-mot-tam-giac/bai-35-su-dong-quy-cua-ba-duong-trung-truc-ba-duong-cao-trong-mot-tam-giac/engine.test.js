import { describe, it, expect } from 'vitest';
import { altitudes, bisectorsOfSides, circumcenter, classify, report, where } from './engine.js';
import { cross, dist } from '#lib/geom-engine/plane.js';

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

/** @param {{ x: number, y: number }} u @param {{ x: number, y: number }} v */
const dot = (u, v) => u.x * v.x + u.y * v.y;
/** @param {{ x: number, y: number }} p @param {{ x: number, y: number }} q */
const vec = (p, q) => ({ x: q.x - p.x, y: q.y - p.y });

describe('perpendicular bisectors', () => {
  it('meet at a point equally far from the three vertices', () => {
    for (const t of triangles()) {
      const b = bisectorsOfSides(t);
      expect(b.OA).toBeCloseTo(b.OB, 9);
      expect(b.OB).toBeCloseTo(b.OC, 9);
      for (const s of b.sides) {
        // O lies on the line through the midpoint perpendicular to the side.
        expect(dot(vec(s.at, b.O), vec(s.from, s.to))).toBeCloseTo(0, 7);
      }
    }
  });

  it('puts O inside, at the hypotenuse midpoint, or outside by the kind of triangle', () => {
    for (const t of triangles()) {
      const k = classify(t);
      const b = bisectorsOfSides(t);
      expect(b.place).toBe(k.kind === 'nhon' ? 'trong' : k.kind === 'vuong' ? 'canh' : 'ngoai');
    }
  });

  it('finds the hypotenuse midpoint of the 3-4-5 right triangle', () => {
    const t = { A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 0, y: 3 } };
    expect(dist(circumcenter(t), { x: 2, y: 1.5 })).toBeCloseTo(0, 12);
    expect(classify(t)).toEqual({ kind: 'vuong', at: 'A' });
  });
});

describe('altitudes', () => {
  it('meet at H, which lies on all three altitudes', () => {
    for (const t of triangles()) {
      const a = altitudes(t);
      for (const r of a.rows) {
        expect(dot(vec(r.vertex, r.foot), vec(r.p, r.q))).toBeCloseTo(0, 7);
        expect(dot(vec(r.vertex, a.H), vec(r.p, r.q))).toBeCloseTo(0, 7);
      }
    }
  });

  it('puts H inside, at the right-angle vertex, or outside by the kind of triangle', () => {
    for (const t of triangles()) {
      const k = classify(t);
      const a = altitudes(t);
      if (k.kind === 'vuong') {
        const v = /** @type {'A' | 'B' | 'C'} */ (k.at);
        expect(dist(a.H, t[v])).toBeCloseTo(0, 9);
      } else expect(a.place).toBe(k.kind === 'nhon' ? 'trong' : 'ngoai');
      // In an obtuse triangle exactly two feet fall on extensions of sides.
      const out = a.rows.filter((r) => r.outside).length;
      expect(out).toBe(k.kind === 'tu' ? 2 : 0);
    }
  });

  it('places H and O on the right sides of the long side when the triangle is obtuse', () => {
    const t = { A: { x: 0, y: 1 }, B: { x: -3, y: 0 }, C: { x: 3, y: 0 } };
    expect(classify(t)).toEqual({ kind: 'tu', at: 'A' });
    expect(circumcenter(t)).toEqual({ x: 0, y: -4 });
    expect(altitudes(t).H).toEqual({ x: 0, y: 9 });
    expect(where(t, { x: 0, y: 0 })).toBe('canh');
    expect(report(t).oText).toContain('khác phía với A');
    expect(report(t).hText).toContain('cùng phía với A');
  });
});
