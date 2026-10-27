import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  centralAngle,
  imageOf,
  interiorAngle,
  keepingAngles,
  keepingSteps,
  magnet,
  polygonName,
  vertices,
} from './engine.js';

describe('regular polygon measures', () => {
  it('gives the central and interior angles', () => {
    expect(centralAngle(5)).toBe(72);
    expect(interiorAngle(5)).toBe(108);
    expect(interiorAngle(6)).toBe(120);
    expect(interiorAngle(3)).toBe(60);
  });

  it('names polygons the way the book does', () => {
    expect(polygonName(6)).toBe('lục giác đều');
    expect(polygonName(7)).toBe('đa giác đều 7 cạnh');
  });

  it('draws equal sides, and a hexagon side equal to R', () => {
    const pts = vertices(6, { x: 0, y: 0 }, 10);
    for (let i = 0; i < 6; i++) expect(dist(pts[i], pts[(i + 1) % 6])).toBeCloseTo(10);
  });
});

describe('rotations that keep the polygon', () => {
  it('lists n angles, the last one 360°', () => {
    expect(keepingAngles(4)).toEqual([90, 180, 270, 360]);
  });

  it('accepts multiples of 360°/n only', () => {
    expect(keepingSteps(5, 144)).toBe(2);
    expect(keepingSteps(5, 140)).toBeNull();
    expect(keepingSteps(7, magnet(7, 51))).toBe(1);
    expect(magnet(7, 49)).toBe(49);
  });

  it('maps the rotated vertices onto the vertices', () => {
    const before = vertices(5, { x: 0, y: 0 }, 10);
    const after = vertices(5, { x: 0, y: 0 }, 10, 144);
    // A1 turned 144° clockwise lands on A3
    expect(imageOf(5, 1, 2, true)).toBe(3);
    expect(dist(after[0], before[2])).toBeCloseTo(0);
    // counter-clockwise by 144° it lands on A4
    expect(imageOf(5, 1, 2, false)).toBe(4);
    expect(dist(vertices(5, { x: 0, y: 0 }, 10, -144)[0], before[3])).toBeCloseTo(0);
  });
});
