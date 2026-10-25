import { describe, it, expect } from 'vitest';
import {
  FIGURES,
  angleAt,
  circleIntersections,
  construction,
  dist,
  regularPolygon,
  rotate,
} from './engine.js';

const A = { x: 140, y: 220 };
const B = { x: 230, y: 205 };

describe('rotate', () => {
  it('turns counterclockwise as seen on screen (y down)', () => {
    const p = rotate({ x: 1, y: 0 }, { x: 0, y: 0 }, 90);
    expect(p.x).toBeCloseTo(0, 9);
    expect(p.y).toBeCloseTo(-1, 9);
  });
});

describe('regularPolygon', () => {
  for (const n of [3, 4, 6]) {
    it(`has ${n} equal sides and equal angles of ${180 - 360 / n}°`, () => {
      const pts = regularPolygon(A, B, n);
      expect(pts).toHaveLength(n);
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const q = pts[(i + 1) % n];
        const r = pts[(i + 2) % n];
        expect(dist(p, q)).toBeCloseTo(dist(A, B), 9);
        expect(angleAt(p, q, r)).toBeCloseTo(180 - 360 / n, 9);
      }
    });
  }

  it('builds the square above side AB when A is left of B', () => {
    const [, , c] = regularPolygon({ x: 0, y: 0 }, { x: 10, y: 0 }, 4);
    expect(c.x).toBeCloseTo(10, 9);
    expect(c.y).toBeCloseTo(-10, 9);
  });
});

describe('circleIntersections', () => {
  it('finds the two points of equal circles through each other’s centre', () => {
    const r = dist(A, B);
    const pts = circleIntersections(A, r, B, r);
    expect(pts).toHaveLength(2);
    for (const p of pts) {
      expect(dist(p, A)).toBeCloseTo(r, 9);
      expect(dist(p, B)).toBeCloseTo(r, 9);
    }
  });
  it('returns nothing for circles far apart', () => {
    expect(circleIntersections({ x: 0, y: 0 }, 1, { x: 5, y: 0 }, 1)).toEqual([]);
  });
});

describe('construction', () => {
  for (const f of FIGURES) {
    it(`${f.label}: every side measures AB`, () => {
      const { steps, measures, verdict } = construction(f.value, A, B);
      expect(steps.length).toBeGreaterThanOrEqual(3);
      expect(verdict.length).toBeGreaterThan(0);
      for (const m of measures.filter((m) => m.unit === 'length')) {
        expect(m.value, m.label).toBeCloseTo(dist(A, B), 9);
      }
    });
  }

  it('measures the angles the book expects', () => {
    const deg = (/** @type {import('./engine.js').Figure} */ f) =>
      construction(f, A, B)
        .measures.filter((m) => m.unit === 'deg')
        .map((m) => Math.round(m.value * 1e6) / 1e6);
    expect(deg('tam-giac-deu')).toEqual([60]);
    expect(deg('hinh-vuong')).toEqual([90, 90]);
    expect(deg('luc-giac-deu')).toEqual([120, 120]);
  });
});
