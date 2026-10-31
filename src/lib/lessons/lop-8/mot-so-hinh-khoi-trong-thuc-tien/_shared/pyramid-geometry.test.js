import { describe, it, expect } from 'vitest';
import {
  baseArea,
  circumradius,
  faceName,
  inradius,
  invertedPyramid,
  num,
  pyramidFaces,
  pyramidLevel,
  pyramidMeasures,
  regularBase,
  squareBox,
} from './pyramid-geometry.js';
import { facesViewer, turnByKey } from '#lib/geom-engine/solid.js';

/** @param {{ x: number, y: number, z: number }} a @param {{ x: number, y: number, z: number }} b */
const dist3 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

describe('regular bases', () => {
  it('have equal sides of the given length', () => {
    for (const n of [3, 4]) {
      const base = regularBase(n, 6);
      for (let i = 0; i < n; i++) {
        const p = base[i];
        const q = base[(i + 1) % n];
        expect(Math.hypot(q.x - p.x, q.y - p.y)).toBeCloseTo(6, 9);
      }
      // Edge 0 is the front edge, parallel to the x-axis.
      expect(base[0].y).toBeCloseTo(base[1].y, 9);
      expect(base[0].y).toBeLessThan(0);
    }
  });

  it('match the textbook radii and areas', () => {
    expect(inradius(4, 6)).toBeCloseTo(3, 9);
    expect(circumradius(4, 6)).toBeCloseTo(3 * Math.SQRT2, 9);
    expect(inradius(3, 6)).toBeCloseTo(Math.sqrt(3), 9);
    expect(circumradius(3, 6)).toBeCloseTo(2 * Math.sqrt(3), 9);
    expect(baseArea(4, 5)).toBeCloseTo(25, 9);
    expect(baseArea(3, 6)).toBeCloseTo(9 * Math.sqrt(3), 9);
  });
});

describe('pyramidMeasures', () => {
  it('gives S_xq = p·d and V = S·h/3 for a square pyramid', () => {
    const m = pyramidMeasures(4, 6, 4);
    expect(m.p).toBe(12);
    expect(m.d).toBeCloseTo(5, 9);
    expect(m.lateral).toBeCloseTo(60, 9);
    expect(m.S).toBeCloseTo(36, 9);
    expect(m.total).toBeCloseTo(96, 9);
    expect(m.volume).toBeCloseTo(48, 9);
    expect(m.edge).toBeCloseTo(Math.sqrt(34), 9);
  });

  it('gives the lateral area as the sum of the side triangles', () => {
    for (const n of [3, 4]) {
      const m = pyramidMeasures(n, 5, 7);
      const faces = pyramidFaces(n, 5, 7, 0).filter((f) => f.kind === 'side');
      let sum = 0;
      for (const f of faces) {
        const [p, q, s] = f.pts;
        const base = dist3(p, q);
        const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2, z: 0 };
        sum += (base * dist3(mid, s)) / 2;
      }
      expect(sum).toBeCloseTo(m.lateral, 9);
    }
  });
});

describe('pyramidFaces', () => {
  it('meets at the apex when closed and keeps every lateral edge equal', () => {
    for (const n of [3, 4]) {
      const m = pyramidMeasures(n, 4, 5);
      for (const f of pyramidFaces(n, 4, 5, 0).filter((x) => x.kind === 'side')) {
        const s = f.pts[2];
        expect(dist3(s, { x: 0, y: 0, z: 5 })).toBeLessThan(1e-9);
        expect(dist3(f.pts[0], s)).toBeCloseTo(m.edge, 9);
      }
    }
  });

  it('lies flat at t = 1 with the apex one slant height out', () => {
    const m = pyramidMeasures(3, 6, 4);
    for (const f of pyramidFaces(3, 6, 4, 1).filter((x) => x.kind === 'side')) {
      for (const p of f.pts) expect(Math.abs(p.z)).toBeLessThan(1e-9);
      const s = f.pts[2];
      expect(Math.hypot(s.x, s.y)).toBeCloseTo(inradius(3, 6) + m.d, 9);
    }
  });

  it('keeps every side triangle the same shape while it unfolds', () => {
    const m = pyramidMeasures(4, 6, 4);
    for (const t of [0, 0.3, 0.7, 1]) {
      for (const f of pyramidFaces(4, 6, 4, t).filter((x) => x.kind === 'side')) {
        expect(dist3(f.pts[0], f.pts[2])).toBeCloseTo(m.edge, 9);
        expect(dist3(f.pts[1], f.pts[2])).toBeCloseTo(m.edge, 9);
      }
    }
  });

  it('shows the front face and hides the base from a raised eye', () => {
    const view = { yaw: 0, pitch: 25 };
    const faces = pyramidFaces(4, 6, 5, 0);
    expect(facesViewer(faces.find((f) => f.id === 'side-0')?.pts ?? [], view)).toBe(true);
    expect(facesViewer(faces.find((f) => f.id === 'side-2')?.pts ?? [], view)).toBe(false);
    expect(facesViewer(faces.find((f) => f.id === 'bottom')?.pts ?? [], view)).toBe(false);
  });
});

describe('containers', () => {
  it('fills a pyramid to the level whose cube is the filled fraction', () => {
    expect(pyramidLevel(8, 1)).toBeCloseTo(8, 9);
    expect(pyramidLevel(8, 1 / 8)).toBeCloseTo(4, 9);
    expect(pyramidLevel(8, 0)).toBe(0);
  });

  it('builds the water inside an upside-down pyramid', () => {
    const faces = invertedPyramid(6, 9, 3);
    const top = faces.find((f) => f.id === 'top');
    expect(top?.pts.every((p) => Math.abs(p.z - 3) < 1e-9)).toBe(true);
    // At a third of the height the water surface has a third of the side.
    expect(
      dist3(top?.pts[0] ?? { x: 0, y: 0, z: 0 }, top?.pts[1] ?? { x: 0, y: 0, z: 0 }),
    ).toBeCloseTo(2, 9);
    // The top faces up, seen from above.
    expect(facesViewer(top?.pts ?? [], { yaw: 0, pitch: 60 })).toBe(true);
  });

  it('builds a box of the given water height', () => {
    const faces = squareBox(4, 2);
    expect(faces).toHaveLength(6);
    expect(facesViewer(faces.find((f) => f.id === 'top')?.pts ?? [], { yaw: 0, pitch: 30 })).toBe(
      true,
    );
    expect(
      facesViewer(faces.find((f) => f.id === 'side-0')?.pts ?? [], { yaw: 0, pitch: 30 }),
    ).toBe(true);
  });
});

describe('helpers', () => {
  it('names faces the book way', () => {
    expect(faceName('side-0', ['A', 'B', 'C'])).toBe('SAB');
    expect(faceName('side-2', ['A', 'B', 'C'])).toBe('SCA');
    expect(faceName('bottom', ['A', 'B', 'C', 'D'])).toBe('ABCD');
  });

  it('writes numbers with a decimal comma', () => {
    expect(num(7.211)).toBe('7,21');
    expect(num(48)).toBe('48');
    expect(num(1200)).toBe('1 200');
  });

  it('turns the view with the arrow keys', () => {
    expect(turnByKey({ yaw: 0, pitch: 20 }, 'ArrowLeft', false)).toEqual({ yaw: 10, pitch: 20 });
    expect(turnByKey({ yaw: 0, pitch: 75 }, 'ArrowUp', false)).toEqual({ yaw: 0, pitch: 80 });
    expect(turnByKey({ yaw: 0, pitch: 20 }, 'Enter', false)).toBeNull();
  });
});
