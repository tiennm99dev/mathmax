import { describe, it, expect } from 'vitest';
import { solveSystem, clipToBox, constantThrough, isDegenerate } from './system.js';

describe('solveSystem', () => {
  it('crossing lines yield the single intersection point', () => {
    // x + y = 3 and x - y = 1 meet at (2, 1)
    const s = solveSystem({ a: 1, b: 1, c: 3 }, { a: 1, b: -1, c: 1 });
    expect(s.kind).toBe('unique');
    if (s.kind !== 'unique') throw new Error('unreachable');
    expect(s.point.x).toBeCloseTo(2);
    expect(s.point.y).toBeCloseTo(1);
  });

  it('distinct parallel lines have no solution', () => {
    expect(solveSystem({ a: 2, b: 3, c: 6 }, { a: 4, b: 6, c: 1 }).kind).toBe('parallel');
  });

  it('proportional equations describe the same line', () => {
    expect(solveSystem({ a: 2, b: 3, c: 6 }, { a: 4, b: 6, c: 12 }).kind).toBe('coincident');
  });

  it('negated equations describe the same line', () => {
    expect(solveSystem({ a: 1, b: -2, c: 4 }, { a: -1, b: 2, c: -4 }).kind).toBe('coincident');
  });

  it('a vertical and a horizontal line cross at their constants', () => {
    // x = 3 and y = -2
    const s = solveSystem({ a: 1, b: 0, c: 3 }, { a: 0, b: 1, c: -2 });
    expect(s.kind).toBe('unique');
    if (s.kind !== 'unique') throw new Error('unreachable');
    expect(s.point).toEqual({ x: 3, y: -2 });
  });

  it('two vertical lines are parallel, not unique', () => {
    expect(solveSystem({ a: 1, b: 0, c: 3 }, { a: 1, b: 0, c: 5 }).kind).toBe('parallel');
  });

  it('an equation with a = b = 0 is degenerate', () => {
    expect(solveSystem({ a: 0, b: 0, c: 1 }, { a: 1, b: 1, c: 2 }).kind).toBe('degenerate');
    expect(solveSystem({ a: 1, b: 1, c: 2 }, { a: 0, b: 0, c: 0 }).kind).toBe('degenerate');
  });

  it('solution satisfies both equations', () => {
    const l1 = { a: 3, b: -5, c: 7 };
    const l2 = { a: -2, b: 4, c: 1 };
    const s = solveSystem(l1, l2);
    if (s.kind !== 'unique') throw new Error('expected unique');
    expect(l1.a * s.point.x + l1.b * s.point.y).toBeCloseTo(l1.c);
    expect(l2.a * s.point.x + l2.b * s.point.y).toBeCloseTo(l2.c);
  });
});

describe('isDegenerate', () => {
  it('flags only the zero-coefficient equation', () => {
    expect(isDegenerate({ a: 0, b: 0, c: 5 })).toBe(true);
    expect(isDegenerate({ a: 0, b: 1, c: 5 })).toBe(false);
  });
});

describe('clipToBox', () => {
  it('a slanted line meets two box edges', () => {
    // y = x  →  x - y = 0, clipped to [-10,10]²
    const seg = clipToBox({ a: 1, b: -1, c: 0 }, -10, 10, -10, 10);
    expect(seg).not.toBeNull();
    if (!seg) throw new Error('unreachable');
    expect(seg[0]).toEqual({ x: -10, y: -10 });
    expect(seg[1]).toEqual({ x: 10, y: 10 });
  });

  it('a vertical line spans the box height', () => {
    const seg = clipToBox({ a: 1, b: 0, c: 4 }, -10, 10, -10, 10);
    if (!seg) throw new Error('expected a segment');
    expect(seg.map((p) => p.x)).toEqual([4, 4]);
    expect(seg.map((p) => p.y).sort((m, n) => m - n)).toEqual([-10, 10]);
  });

  it('a horizontal line spans the box width', () => {
    const seg = clipToBox({ a: 0, b: 1, c: -3 }, -10, 10, -10, 10);
    if (!seg) throw new Error('expected a segment');
    expect(seg.map((p) => p.y)).toEqual([-3, -3]);
    expect(seg.map((p) => p.x).sort((m, n) => m - n)).toEqual([-10, 10]);
  });

  it('a line outside the box returns null', () => {
    expect(clipToBox({ a: 0, b: 1, c: 50 }, -10, 10, -10, 10)).toBeNull();
  });

  it('a line touching only a corner returns null', () => {
    // x + y = 20 meets [-10,10]² only at (10, 10)
    expect(clipToBox({ a: 1, b: 1, c: 20 }, -10, 10, -10, 10)).toBeNull();
  });

  it('a degenerate equation returns null', () => {
    expect(clipToBox({ a: 0, b: 0, c: 1 }, -10, 10, -10, 10)).toBeNull();
  });

  it('endpoints satisfy the equation', () => {
    const line = { a: 2, b: 3, c: 6 };
    const seg = clipToBox(line, -10, 10, -10, 10);
    if (!seg) throw new Error('expected a segment');
    for (const p of seg) expect(line.a * p.x + line.b * p.y).toBeCloseTo(line.c);
  });
});

describe('constantThrough', () => {
  it('returns the constant that puts the line on the given point', () => {
    const line = { a: 2, b: 3, c: 0 };
    const c = constantThrough(line, { x: 1, y: 2 });
    expect(c).toBe(8);
    // the translated line really does pass through the point
    expect(line.a * 1 + line.b * 2).toBeCloseTo(c);
  });
});
