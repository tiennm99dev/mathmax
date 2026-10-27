import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  TASKS,
  angleAt,
  angleKind,
  clipLine,
  construction,
  geogebraAngle,
  midpoint,
  onLine,
  rotate,
} from './engine.js';

const O = { x: 100, y: 200 };
const A = { x: 220, y: 200 };

describe('angles', () => {
  it('turns counterclockwise as seen on screen', () => {
    const p = rotate({ x: 1, y: 0 }, { x: 0, y: 0 }, 90);
    expect(p.x).toBeCloseTo(0, 9);
    expect(p.y).toBeCloseTo(-1, 9);
  });

  it('measures the angle between two rays from 0 to 180 degrees', () => {
    expect(angleAt(A, O, rotate(A, O, 50))).toBeCloseTo(50, 9);
    expect(angleAt(A, O, rotate(A, O, 300))).toBeCloseTo(60, 9);
  });

  it('gives the counterclockwise GeoGebra reading, which depends on click order', () => {
    const B = rotate(A, O, 50);
    expect(geogebraAngle(A, O, B)).toBeCloseTo(50, 9);
    expect(geogebraAngle(B, O, A)).toBeCloseTo(310, 9);
  });

  it('names angles by size', () => {
    expect(angleKind(35)).toBe('góc nhọn');
    expect(angleKind(90)).toBe('góc vuông');
    expect(angleKind(120)).toBe('góc tù');
    expect(angleKind(180)).toBe('góc bẹt');
  });
});

describe('points and lines', () => {
  it('finds the midpoint and collinear points', () => {
    expect(midpoint({ x: 0, y: 0 }, { x: 10, y: 4 })).toEqual({ x: 5, y: 2 });
    expect(onLine({ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 30, y: 30 })).toBe(true);
    expect(onLine({ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 30, y: 20 })).toBe(false);
  });

  it('clips a line to the board, and a ray only from its origin', () => {
    const line = clipLine({ x: 100, y: 100 }, { x: 200, y: 100 }, 400, 300);
    expect(line).toEqual([
      { x: 0, y: 100 },
      { x: 400, y: 100 },
    ]);
    const ray = clipLine({ x: 100, y: 100 }, { x: 200, y: 100 }, 400, 300, true);
    expect(ray).toEqual([
      { x: 100, y: 100 },
      { x: 400, y: 100 },
    ]);
    const diag = clipLine({ x: 0, y: 0 }, { x: 1, y: 1 }, 400, 300);
    expect(diag?.[1]).toEqual({ x: 300, y: 300 });
  });
});

describe('construction', () => {
  it('builds every task in at least three steps', () => {
    const pts = [O, A, { x: 160, y: 120 }];
    for (const t of TASKS) {
      const c = construction(t.value, pts);
      expect(c.steps.length, t.label).toBeGreaterThanOrEqual(3);
      expect(c.verdict.length).toBeGreaterThan(0);
    }
  });

  it('puts the midpoint halfway', () => {
    const c = construction('trung-diem', [O, A]);
    const [am, mb, ab] = c.measures.map((m) => m.value);
    expect(am).toBeCloseTo(mb, 9);
    expect(am + mb).toBeCloseTo(ab, 9);
    expect(ab).toBe(dist(O, A));
  });

  it('builds the given angle with OA′ = OA', () => {
    for (const deg of [30, 90, 135, 180]) {
      const [angle, oa1, oa] = construction('goc-cho-truoc', [O, A], deg).measures;
      expect(angle.value).toBeCloseTo(deg, 6);
      expect(oa1.value).toBeCloseTo(oa.value, 9);
    }
  });

  it('tells whether A, B, C are collinear', () => {
    expect(construction('duong-thang', [O, A, { x: 300, y: 200 }]).verdict).toContain(
      'thẳng hàng, tia',
    );
    expect(construction('duong-thang', [O, A, { x: 300, y: 100 }]).verdict).toContain(
      'không thẳng hàng',
    );
  });
});
