import { describe, expect, it } from 'vitest';
import {
  DEFAULTS,
  FIGURES,
  angleAt,
  bounds,
  construction,
  ratioOnSide,
  thirdVertex,
} from './engine.js';

/** @param {import('./engine.js').Figure} f @param {Partial<import('./engine.js').Params>} [over] */
const measures = (f, over = {}) =>
  Object.fromEntries(
    construction(f, { ...DEFAULTS, ...over }).measures.map((m) => [m.label, m.value]),
  );

describe('thirdVertex', () => {
  it('puts C at the given distances above AB', () => {
    const c = /** @type {{ x: number, y: number }} */ (thirdVertex(3, 2, 4));
    expect(Math.hypot(c.x, c.y)).toBeCloseTo(2, 9);
    expect(Math.hypot(c.x - 3, c.y)).toBeCloseTo(4, 9);
    expect(c.y).toBeGreaterThan(0);
  });

  it('returns null when the triangle inequality fails', () => {
    expect(thirdVertex(3, 1, 4)).toBeNull();
    expect(thirdVertex(2, 3, 6)).toBeNull();
  });
});

describe('rectangle', () => {
  it('has four right angles and equal diagonals', () => {
    const m = measures('chu-nhat', { ab: 6, bc: Math.sqrt(45) });
    for (const k of ['Góc A', 'Góc B', 'Góc C', 'Góc D']) expect(m[k]).toBeCloseTo(90, 9);
    expect(m.AC).toBeCloseTo(9, 9);
    expect(m.BD).toBeCloseTo(9, 9);
  });
});

describe('parallelogram', () => {
  it('keeps opposite sides and angles equal and bisecting diagonals', () => {
    const m = measures('binh-hanh');
    expect(m.CD).toBeCloseTo(4, 9);
    expect(m.DA).toBeCloseTo(3, 9);
    expect(m['Góc B']).toBeCloseTo(120, 9);
    expect(m['Góc D']).toBeCloseTo(120, 9);
    expect(m['Góc A']).toBeCloseTo(60, 9);
    expect(m.IJ).toBeCloseTo(0, 9);
  });

  it('draws C above AB', () => {
    const built = construction('binh-hanh', { ...DEFAULTS, angle: 70 });
    expect(bounds(built.steps).minY).toBeCloseTo(0, 9);
  });
});

describe('rhombus', () => {
  it('has four equal sides and perpendicular diagonals that bisect the angles', () => {
    for (const angle of [40, 90, 120]) {
      const m = measures('hinh-thoi', { ab: 3, angle });
      for (const k of ['AB', 'BC', 'CD', 'DA']) expect(m[k]).toBeCloseTo(3, 9);
      expect(m['Góc AOB']).toBeCloseTo(90, 9);
      expect(m['Góc ABD']).toBeCloseTo(angle / 2, 9);
      expect(m['Góc DBC']).toBeCloseTo(angle / 2, 9);
    }
  });
});

describe('trapezoid ADEC', () => {
  it('matches the book data', () => {
    const m = measures('hinh-thang');
    expect(m.AD).toBeCloseTo(6, 9);
    expect(m.EC).toBeCloseTo(3, 9);
    expect(m.AC).toBeCloseTo(2, 9);
    expect(m.DE).toBeCloseTo(4, 9);
    expect(m['Góc A + góc C']).toBeCloseTo(180, 9);
  });

  it('fails when the helper triangle does not exist', () => {
    expect(construction('hinh-thang', { ...DEFAULTS, legAC: 1, legDE: 5 }).ok).toBe(false);
    expect(construction('hinh-thang', { ...DEFAULTS, big: 3, small: 3 }).ok).toBe(false);
  });
});

describe('Thalès', () => {
  it('gives equal ratios for any apex and any M', () => {
    for (const apex of [
      { x: 2, y: 4 },
      { x: -1, y: 2 },
      { x: 7, y: 5 },
    ]) {
      for (const t of [0.2, 0.5, 0.75]) {
        const m = measures('thales', { apex, t });
        expect(m['AM / AB']).toBeCloseTo(t, 9);
        expect(m['AN / AC']).toBeCloseTo(t, 9);
        expect(m['AM / MB']).toBeCloseTo(m['AN / NC'], 9);
      }
    }
  });

  it('keeps M on the side', () => {
    expect(ratioOnSide({ x: 1, y: 2 }, { x: 2, y: 4 })).toBeCloseTo(0.5, 9);
    expect(ratioOnSide({ x: 50, y: 50 }, { x: 2, y: 4 })).toBe(0.1);
    expect(ratioOnSide({ x: -50, y: -50 }, { x: 2, y: 4 })).toBe(0.9);
  });
});

describe('every figure', () => {
  it('has steps with a tool and a verdict', () => {
    for (const f of FIGURES) {
      const built = construction(f.value, DEFAULTS);
      expect(built.ok).toBe(true);
      expect(built.steps.length).toBeGreaterThan(3);
      expect(built.verdict.length).toBeGreaterThan(10);
    }
    expect(angleAt({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90, 9);
  });
});
