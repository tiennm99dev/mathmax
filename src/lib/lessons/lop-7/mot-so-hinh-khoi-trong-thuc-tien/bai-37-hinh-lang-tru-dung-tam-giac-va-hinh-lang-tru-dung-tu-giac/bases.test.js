import { describe, it, expect } from 'vitest';
import { BASES } from './bases.js';
import { dist, measures, polygonArea } from '../_shared/prism-geometry.js';

describe('BASES', () => {
  it('has the side lengths its description gives, in order AB, BC, CD/CA, DA', () => {
    const lens = BASES.map((b) => b.pts.map((p, i) => dist(p, b.pts[(i + 1) % b.pts.length])));
    expect(lens).toEqual([
      [4, 5, 3],
      [6, 5, 5],
      [6, 4, 3, 5],
      [8, 5, 2, 5],
    ]);
    for (const b of BASES) expect(Number.isInteger(polygonArea(b.pts))).toBe(true);
  });

  it('keeps every base counter-clockwise', () => {
    for (const b of BASES) {
      let s = 0;
      b.pts.forEach((p, i) => {
        const q = b.pts[(i + 1) % b.pts.length];
        s += p.x * q.y - q.x * p.y;
      });
      expect(s).toBeGreaterThan(0);
    }
  });

  it('gives the expected areas and perimeters', () => {
    expect(BASES.map((b) => [measures(b.pts, 1).C, measures(b.pts, 1).S])).toEqual([
      [12, 6],
      [16, 12],
      [18, 18],
      [20, 20],
    ]);
  });
});
