import { describe, it, expect } from 'vitest';
import { SHAPES, dist, image, imagePolygon, perimeter } from './engine.js';

const O = { x: 100, y: 200 };

describe('perspective image', () => {
  it('puts M′ on ray OM with OM′ = k · OM', () => {
    const m = { x: 160, y: 120 };
    const m2 = image(O, 2.5, m);
    expect(dist(O, m2)).toBeCloseTo(2.5 * dist(O, m), 9);
    // Same direction: the cross product is 0 and the dot product positive.
    const u = { x: m.x - O.x, y: m.y - O.y };
    const v = { x: m2.x - O.x, y: m2.y - O.y };
    expect(u.x * v.y - u.y * v.x).toBeCloseTo(0, 9);
    expect(u.x * v.x + u.y * v.y).toBeGreaterThan(0);
  });

  it('leaves the shape in place when k = 1 and fixes the centre', () => {
    expect(image(O, 1, { x: 7, y: 9 })).toEqual({ x: 7, y: 9 });
    expect(image(O, 3, O)).toEqual(O);
  });

  it('multiplies every side and the perimeter by k', () => {
    for (const pts of Object.values(SHAPES)) {
      const img = imagePolygon(O, 0.5, pts);
      for (let i = 0; i < pts.length; i++) {
        const j = (i + 1) % pts.length;
        expect(dist(img[i], img[j])).toBeCloseTo(0.5 * dist(pts[i], pts[j]), 9);
      }
      expect(perimeter(img)).toBeCloseTo(0.5 * perimeter(pts), 9);
    }
  });
});
