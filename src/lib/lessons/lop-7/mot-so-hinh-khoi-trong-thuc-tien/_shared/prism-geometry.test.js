import { describe, it, expect } from 'vitest';
import {
  drawOrder,
  facesViewer,
  measures,
  perimeter,
  polygonArea,
  prismFaces,
  rectBase,
  viewCentre,
  viewPoint,
} from './prism-geometry.js';

const close = (/** @type {number} */ a, /** @type {number} */ b) => expect(a).toBeCloseTo(b, 9);

describe('measures', () => {
  it('gives the box formulas S_xq = 2(a + b)c and V = abc', () => {
    const m = measures(rectBase(5, 3), 4);
    close(m.C, 16);
    close(m.S, 15);
    close(m.lateral, 64);
    close(m.total, 94);
    close(m.volume, 60);
  });

  it('gives S_xq = 4a² and V = a³ for a cube', () => {
    const m = measures(rectBase(6, 6), 6);
    close(m.lateral, 144);
    close(m.volume, 216);
  });

  it('works on a triangular base', () => {
    const tri = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ];
    close(perimeter(tri), 12);
    close(polygonArea(tri), 6);
    close(measures(tri, 10).volume, 60);
    close(measures(tri, 10).lateral, 120);
  });
});

describe('prismFaces', () => {
  const base = rectBase(5, 3);

  it('builds the closed box with the top at height h', () => {
    const faces = prismFaces(base, 4, 0);
    expect(faces.map((f) => f.id)).toEqual([
      'bottom',
      'side-0',
      'top',
      'side-1',
      'side-2',
      'side-3',
    ]);
    const top = faces.find((f) => f.id === 'top');
    top?.pts.forEach((p, i) => {
      close(p.x, base[i].x);
      close(p.y, base[i].y);
      close(p.z, 4);
    });
  });

  it('lays every face flat at t = 1 without changing its shape', () => {
    const closed = prismFaces(base, 4, 0);
    const flat = prismFaces(base, 4, 1);
    flat.forEach((f, k) => {
      f.pts.forEach((p) => close(p.z, 0));
      const c = closed[k].pts;
      f.pts.forEach((p, i) => {
        const j = (i + 1) % f.pts.length;
        const q = f.pts[j];
        close(
          Math.hypot(q.x - p.x, q.y - p.y, q.z - p.z),
          Math.hypot(c[j].x - c[i].x, c[j].y - c[i].y, c[j].z - c[i].z),
        );
      });
    });
  });

  it('puts the flat top beyond side 0, away from the base', () => {
    const top = prismFaces(base, 4, 1).find((f) => f.id === 'top');
    // Side 0 runs along y = 0 and falls to y in [-4, 0]; the top lies in [-7, -4].
    top?.pts.forEach((p) => {
      expect(p.y).toBeLessThanOrEqual(-4 + 1e-9);
      expect(p.y).toBeGreaterThanOrEqual(-7 - 1e-9);
    });
  });

  it('keeps the flat net free of overlaps for a triangle', () => {
    const tri = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ];
    const flat = prismFaces(tri, 2, 1);
    const area = flat.reduce((s, f) => s + polygonArea(f.pts), 0);
    const m = measures(tri, 2);
    close(area, m.total);
  });
});

describe('view', () => {
  it('shows the front, the right side and the top of a box seen from front right above', () => {
    const view = { yaw: -30, pitch: 25 };
    const faces = prismFaces(rectBase(5, 3), 4, 0);
    const front = Object.fromEntries(faces.map((f) => [f.id, facesViewer(f.pts, view)]));
    expect(front).toEqual({
      bottom: false,
      'side-0': true,
      top: true,
      'side-1': true,
      'side-2': false,
      'side-3': false,
    });
  });

  it('draws far faces first', () => {
    const view = { yaw: -30, pitch: 25 };
    const order = drawOrder(prismFaces(rectBase(5, 3), 4, 0), view, (p) => p);
    for (let i = 1; i < order.length; i++)
      expect(order[i].depth).toBeGreaterThanOrEqual(order[i - 1].depth);
    expect(order.at(-1)?.front).toBe(true);
  });

  it('maps up to screen up with no turn or tilt', () => {
    const p = viewPoint({ x: 1, y: 2, z: 3 }, { yaw: 0, pitch: 0 });
    close(p.x, 1);
    close(p.y, -3);
    close(p.depth, -2);
  });

  it('centres on the solid when closed and on the net when open', () => {
    const c0 = viewCentre(rectBase(4, 2), 6, 0);
    close(c0.x, 2);
    close(c0.y, 1);
    close(c0.z, 3);
    const c1 = viewCentre(rectBase(4, 2), 6, 1);
    close(c1.z, 0);
    close(c1.x, 2);
    // Net spans y from -8 (top beyond side 0) to 2 + 6 = 8.
    close(c1.y, 0);
  });
});

describe('faceName', () => {
  it('names faces the way the book does', async () => {
    const { faceName, faceIds } = await import('./prism-geometry.js');
    const names = ['A', 'B', 'C', 'D'];
    expect(faceIds(4).map((id) => faceName(id, names))).toEqual([
      'ABCD',
      "A'B'C'D'",
      "ABB'A'",
      "BCC'B'",
      "CDD'C'",
      "DAA'D'",
    ]);
  });
});
