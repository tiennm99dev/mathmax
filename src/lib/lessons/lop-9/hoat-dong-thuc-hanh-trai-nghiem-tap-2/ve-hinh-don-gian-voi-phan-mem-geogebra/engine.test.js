import { describe, expect, it } from 'vitest';
import { angleAt, dist } from '#lib/geom-engine/plane.js';
import { UNIT, bisectorDirection, construction, distToLine, tangentPoints } from './engine.js';

const O = { x: 160, y: 160 };
const B = { x: 240, y: 160 };

describe('tangent points', () => {
  it('touch the circle at right angles to the radius', () => {
    const M = { x: 360, y: 120 };
    const pts = tangentPoints(O, 80, M);
    expect(pts).toHaveLength(2);
    const bad = [];
    for (const A of pts) {
      if (Math.abs(dist(O, A) - 80) > 1e-9) bad.push('on circle');
      if (Math.abs(angleAt(A, O, M) - 90) > 1e-9) bad.push('right angle');
    }
    expect(bad).toEqual([]);
    expect(dist(M, pts[0])).toBeCloseTo(dist(M, pts[1]), 9);
  });

  it('gives none inside the circle and one on it', () => {
    expect(tangentPoints(O, 80, { x: 200, y: 160 })).toEqual([]);
    expect(tangentPoints(O, 80, { x: 240, y: 160 })).toHaveLength(1);
  });

  it('gives MA = 4 for OM = 5 and R = 3', () => {
    const pts = tangentPoints({ x: 0, y: 0 }, 3, { x: 5, y: 0 });
    expect(dist({ x: 5, y: 0 }, pts[0])).toBeCloseTo(4, 12);
  });
});

describe('constructions', () => {
  it('tangent at B is perpendicular to OB', () => {
    const built = construction('tiep-tuyen-tai', { O, B, M: B, tri: [O, B, B] });
    const line = built.steps.flatMap((s) => s.draw).find((d) => d.kind === 'line');
    if (!line || line.kind !== 'line') throw new Error('expected the tangent line');
    expect(distToLine(O, line.p, line.d)).toBeCloseTo(80, 9);
    expect(built.ok).toBe(true);
  });

  it('two tangents from M have equal lengths', () => {
    const built = construction('tiep-tuyen-qua', { O, B, M: { x: 360, y: 60 }, tri: [O, B, B] });
    const m = Object.fromEntries(built.measures.map((x) => [x.label, x.value]));
    expect(built.ok).toBe(true);
    expect(m.MA).toBeCloseTo(m.MC, 9);
    expect(m['Góc OAM']).toBeCloseTo(90, 9);
    expect(m['Góc OMA']).toBeCloseTo(m['Góc OMC'], 9);
  });

  it('refuses M inside the circle', () => {
    const built = construction('tiep-tuyen-qua', { O, B, M: { x: 180, y: 170 }, tri: [O, B, B] });
    expect(built.ok).toBe(false);
  });

  it('circumcentre is equally far from the vertices, at the hypotenuse midpoint when right', () => {
    const tri = /** @type {[any, any, any]} */ ([
      { x: 80, y: 240 },
      { x: 320, y: 240 },
      { x: 80, y: 60 },
    ]);
    const built = construction('ngoai-tiep', { O, B, M: B, tri });
    const m = Object.fromEntries(built.measures.map((x) => [x.label, x.value]));
    expect(m.OA).toBeCloseTo(m.OB, 9);
    expect(m.OB).toBeCloseTo(m.OC, 9);
    expect(m.OA).toBeCloseTo(150 / UNIT, 9);
    expect(built.verdict).toContain('trung điểm của cạnh huyền');
  });

  it('incentre is equally far from the sides; r = 1 for the 3-4-5 triangle', () => {
    const tri = /** @type {[any, any, any]} */ ([
      { x: 0, y: 0 },
      { x: 4 * UNIT, y: 0 },
      { x: 0, y: 3 * UNIT },
    ]);
    const built = construction('noi-tiep', { O, B, M: B, tri });
    const values = built.measures.map((x) => x.value);
    const bad = values.filter((v) => Math.abs(v - 1) > 1e-9);
    expect(bad).toEqual([]);
  });

  it('bisector direction splits the angle in half', () => {
    const at = { x: 0, y: 0 };
    const p = { x: 10, y: 0 };
    const q = { x: 0, y: 10 };
    const d = bisectorDirection(at, p, q);
    expect(angleAt(at, p, d)).toBeCloseTo(45, 9);
  });
});
