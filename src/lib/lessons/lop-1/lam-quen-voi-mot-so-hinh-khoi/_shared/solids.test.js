import { describe, expect, it } from 'vitest';
import { cross3, sub3 } from '#lib/geom-engine/solid.js';
import {
  DICE,
  OBJECTS,
  boxFaces,
  countAloud,
  cubeWall,
  decoMarks,
  faceGroups,
  isCube,
  kindOf,
  onFace,
  outerFaces,
  shade,
} from './solids.js';

describe('solids of the chapter', () => {
  it('lists every face counter-clockwise seen from outside', () => {
    const box = { pos: { x: 1, y: 2, z: 0 }, dims: { a: 4, b: 2, c: 3 }, color: '#000000' };
    const centre = { x: 3, y: 3, z: 1.5 };
    const bad = [];
    for (const f of boxFaces(box)) {
      const n = cross3(sub3(f.pts[1], f.pts[0]), sub3(f.pts[2], f.pts[0]));
      const out = sub3(f.pts[0], centre);
      if (n.x * out.x + n.y * out.y + n.z * out.z <= 0) bad.push(f.face);
    }
    expect(bad).toEqual([]);
  });

  it('tells a cube from any other box', () => {
    expect(isCube({ a: 2, b: 2, c: 2 })).toBe(true);
    expect(kindOf({ a: 2, b: 2, c: 4 })).toBe('hop-chu-nhat');
    expect(kindOf({ a: 3, b: 3, c: 3 })).toBe('lap-phuong');
  });

  it('puts all faces of a cube in one size group and a box in two or three', () => {
    expect(new Set(Object.values(faceGroups({ a: 2, b: 2, c: 2 }))).size).toBe(1);
    const tall = faceGroups({ a: 2, b: 2, c: 4 });
    expect(new Set(Object.values(tall)).size).toBe(2);
    expect(tall.top).toBe(tall.bottom);
    expect(tall.top).not.toBe(tall.front);
    const brick = faceGroups({ a: 4, b: 2, c: 1 });
    expect(new Set(Object.values(brick)).size).toBe(3);
    expect(brick.top).toBe(0);
  });

  it('gives each everyday object the solid its box has', () => {
    const bad = OBJECTS.filter((o) => kindOf(o.box.dims) !== o.kind).map((o) => o.id);
    expect(bad).toEqual([]);
    expect(OBJECTS.filter((o) => o.kind === 'lap-phuong').length).toBeGreaterThanOrEqual(3);
    expect(OBJECTS.filter((o) => o.kind === 'hop-chu-nhat').length).toBeGreaterThanOrEqual(3);
  });

  it('draws a dice whose opposite faces add up to 7', () => {
    expect(DICE.top + DICE.bottom).toBe(7);
    expect(DICE.front + DICE.back).toBe(7);
    expect(DICE.left + DICE.right).toBe(7);
    expect(decoMarks('dice', 'right')).toHaveLength(3);
  });

  it('hides the faces pressed between cubes of a wall', () => {
    const wall = cubeWall([2, 1]);
    expect(wall).toHaveLength(3);
    // 3 cubes have 18 faces; 2 touching pairs hide 4 of them.
    expect(outerFaces(wall)).toHaveLength(14);
  });

  it('maps places on a face to points of its parallelogram', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 2 },
      { x: 1, y: 2 },
    ];
    expect(onFace(pts, 0.5, 0.5)).toEqual({ x: 2.5, y: 1 });
    expect(onFace(pts, 1, 1)).toEqual({ x: 5, y: 2 });
  });

  it('shades colours towards white or black', () => {
    expect(shade('#808080', 0)).toBe('#808080');
    expect(shade('#000000', 1)).toBe('#ffffff');
    expect(shade('#ffffff', -1)).toBe('#000000');
  });

  it('counts aloud in Vietnamese', () => {
    expect(countAloud(3)).toBe('một, hai, ba');
  });
});
