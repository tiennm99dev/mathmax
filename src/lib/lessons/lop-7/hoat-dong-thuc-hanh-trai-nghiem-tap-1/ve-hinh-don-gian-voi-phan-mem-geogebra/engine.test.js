import { describe, it, expect } from 'vitest';
import {
  FIGURES,
  angleAt,
  bisectorLine,
  construction,
  dist,
  distToLine,
  fitToBoard,
  placeTriangle,
  projectOnLine,
  thirdVertexSAS,
  thirdVertexSSS,
  triangleKind,
} from './engine.js';

/** @type {import('./engine.js').State} */
const BASE = {
  a: { x: 120, y: 230 },
  b: { x: 300, y: 210 },
  m: { x: 200, y: 110 },
  unit: 44,
  ab: 4,
  bc: 5,
  ca: 6,
  angle: 60,
  w: 440,
  h: 330,
};

/** @param {import('./engine.js').Figure} f @param {Partial<import('./engine.js').State>} [over] */
const measuresOf = (f, over = {}) =>
  Object.fromEntries(construction(f, { ...BASE, ...over }).measures.map((m) => [m.label, m.value]));

describe('thirdVertexSSS', () => {
  it('puts C at the given distances from A and B, above AB', () => {
    const c = /** @type {{ x: number, y: number }} */ (thirdVertexSSS(5, 6, 4));
    expect(dist(c, { x: 0, y: 0 })).toBeCloseTo(6, 9);
    expect(dist(c, { x: 4, y: 0 })).toBeCloseTo(5, 9);
    expect(c.y).toBeLessThan(0);
  });
  it('returns null when the circles miss or only touch', () => {
    expect(thirdVertexSSS(3, 6, 2)).toBeNull();
    expect(thirdVertexSSS(2, 3, 6)).toBeNull();
    expect(thirdVertexSSS(2, 3, 5)).toBeNull();
  });
});

describe('thirdVertexSAS', () => {
  it('turns AC by the angle above AB', () => {
    const c = thirdVertexSAS(5, 60);
    expect(dist(c, { x: 0, y: 0 })).toBeCloseTo(5, 9);
    expect(angleAt({ x: 6, y: 0 }, { x: 0, y: 0 }, c)).toBeCloseTo(60, 9);
  });
});

describe('fitToBoard', () => {
  it('keeps every point inside the margin', () => {
    const { place } = fitToBoard(
      [
        { x: -3, y: -2 },
        { x: 9, y: 4 },
      ],
      440,
      330,
      20,
      44,
    );
    for (const p of [place({ x: -3, y: -2 }), place({ x: 9, y: 4 })]) {
      expect(p.x).toBeGreaterThanOrEqual(20 - 1e-9);
      expect(p.x).toBeLessThanOrEqual(420 + 1e-9);
      expect(p.y).toBeGreaterThanOrEqual(20 - 1e-9);
      expect(p.y).toBeLessThanOrEqual(310 + 1e-9);
    }
  });
});

describe('construction', () => {
  for (const f of FIGURES) {
    it(`${f.label}: has steps, a verdict and finite measures`, () => {
      const built = construction(f.value, BASE);
      expect(built.ok).toBe(true);
      expect(built.steps.length).toBeGreaterThanOrEqual(3);
      expect(built.verdict.length).toBeGreaterThan(0);
      for (const m of built.measures) expect(Number.isFinite(m.value), m.label).toBe(true);
    });
  }

  it('parallel: the alternate angles are equal', () => {
    const m = measuresOf('song-song');
    expect(m['Góc MAB']).toBeCloseTo(m['Góc AMN'], 9);
    expect(m['Khoảng cách từ M đến a']).toBeCloseTo(distToLine(BASE.m, BASE.a, BASE.b) / 44, 9);
  });

  it('bisector: both halves are half the angle', () => {
    const m = measuresOf('phan-giac');
    expect(m['Góc BAt']).toBeCloseTo(m['Góc BAC'] / 2, 9);
    expect(m['Góc tAC']).toBeCloseTo(m['Góc BAC'] / 2, 9);
  });

  it('perpendicular bisector: right angle at the midpoint, MA = MB for M on g', () => {
    const { i, d } = bisectorLine(BASE.a, BASE.b);
    const onG = projectOnLine(BASE.m, i, d);
    const m = measuresOf('trung-truc', { m: onG });
    expect(m['Góc giữa g và AB']).toBeCloseTo(90, 9);
    expect(m.IA).toBeCloseTo(m.IB, 9);
    expect(m.MA).toBeCloseTo(m.MB, 9);
  });

  it('three sides 4, 5, 6: measured sides match, angles as the book reports', () => {
    const m = measuresOf('ccc');
    expect(m.AB).toBeCloseTo(4, 9);
    expect(m.BC).toBeCloseTo(5, 9);
    expect(m.CA).toBeCloseTo(6, 9);
    expect(m['Góc A'] + m['Góc B'] + m['Góc C']).toBeCloseTo(180, 9);
  });

  it('three sides 2, 3, 6: no triangle', () => {
    const built = construction('ccc', { ...BASE, ab: 2, bc: 3, ca: 6 });
    expect(built.ok).toBe(false);
    expect(built.measures).toEqual([]);
  });

  it('AB = 6, AC = 5, angle A = 60°: BC ≈ 5,57, B ≈ 51,05°, C ≈ 68,95° (acute)', () => {
    const m = measuresOf('cgc', { ab: 6, ca: 5, angle: 60 });
    expect(m.BC).toBeCloseTo(Math.sqrt(31), 9);
    expect(m['Góc A']).toBeCloseTo(60, 9);
    expect(m['Góc B']).toBeCloseTo(51.05, 2);
    expect(m['Góc C']).toBeCloseTo(68.95, 2);
    expect(m['Tổng ba góc']).toBeCloseTo(180, 9);
    expect(construction('cgc', { ...BASE, ab: 6, ca: 5 }).verdict).toContain('tam giác nhọn');
  });

  it('right angle at A with AB = 4, AC = 3 gives BC = 5', () => {
    expect(measuresOf('cgc', { ab: 4, ca: 3, angle: 90 }).BC).toBeCloseTo(5, 9);
  });

  it('places triangles inside the board', () => {
    for (const s of [
      { ab: 7, ca: 7, angle: 160 },
      { ab: 1, ca: 7, angle: 20 },
    ]) {
      const { A, B, C } = placeTriangle('cgc', { ...BASE, ...s });
      for (const p of [A, B, /** @type {{ x: number, y: number }} */ (C)]) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(440);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(330);
      }
    }
  });
});

describe('triangleKind', () => {
  it('names acute, right and obtuse triangles', () => {
    expect(triangleKind([60, 51, 69])).toBe('tam giác nhọn');
    expect(triangleKind([90, 45, 45])).toBe('tam giác vuông');
    expect(triangleKind([120, 30, 30])).toBe('tam giác tù');
  });
});
