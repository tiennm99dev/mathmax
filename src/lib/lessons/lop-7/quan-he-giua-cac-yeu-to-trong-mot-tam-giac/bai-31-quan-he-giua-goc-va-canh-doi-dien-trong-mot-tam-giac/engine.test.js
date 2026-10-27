import { describe, it, expect } from 'vitest';
import { angleChain, anglesFollowSides, rankGroups, sideChain, sideKind } from './engine.js';
import { cross } from '#lib/geom-engine/plane.js';
import { placeVertex } from '#lib/geom-engine/grid-triangle.js';

describe('angle and opposite side', () => {
  it('ranks a scalene triangle and pairs each side with its opposite angle', () => {
    const t = { A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 0, y: 3 } };
    const g = rankGroups(t);
    expect(g).toEqual([['A'], ['C'], ['B']]);
    expect(sideChain(g)).toBe('BC > AB > CA');
    expect(angleChain(g)).toBe('Â > Ĉ > B̂');
    expect(sideKind(g)).toBe('thuong');
  });

  it('groups equal sides exactly', () => {
    const iso = { A: { x: 0, y: 4 }, B: { x: -2, y: 0 }, C: { x: 2, y: 0 } };
    expect(rankGroups(iso)).toEqual([['B', 'C'], ['A']]);
    expect(sideChain(rankGroups(iso))).toBe('CA = AB > BC');
    expect(sideKind(rankGroups(iso))).toBe('can');
  });

  it('keeps the angle order equal to the side order on every grid triangle', () => {
    const pts = [];
    for (let x = -3; x <= 3; x += 1.5) for (let y = -2; y <= 2; y += 1) pts.push({ x, y });
    let checked = 0;
    for (const A of pts)
      for (const B of pts)
        for (const C of pts) {
          if (Math.abs(cross(A, B, C)) < 1) continue;
          expect(anglesFollowSides({ A, B, C })).toBe(true);
          checked++;
        }
    expect(checked).toBeGreaterThan(1000);
  });

  it('refuses a drag that would flatten the triangle', () => {
    const t = { A: { x: 0, y: 3 }, B: { x: -3, y: 0 }, C: { x: 3, y: 0 } };
    const box = { minX: -6, maxX: 6, minY: -4, maxY: 5 };
    expect(placeVertex(t, 'A', { x: 1.1, y: 0.1 }, box)).toEqual(t.A);
    expect(placeVertex(t, 'A', { x: 1.1, y: 2.2 }, box)).toEqual({ x: 1, y: 2 });
    expect(placeVertex(t, 'A', { x: 99, y: 99 }, box)).toEqual({ x: 6, y: 5 });
  });
});
