import { describe, it, expect } from 'vitest';
import { collinear, inRect, lineInRect, lineRelation, onLine, rayExit, same } from './engine.js';

const R = { x0: 0, y0: 0, x1: 11, y1: 7 };

describe('points and lines', () => {
  it('compares points', () => {
    expect(same({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
    expect(same({ x: 1, y: 2 }, { x: 2, y: 1 })).toBe(false);
  });

  it('tells collinear points apart', () => {
    expect(collinear({ x: 1, y: 5 }, { x: 9, y: 1 }, { x: 5, y: 3 })).toBe(true);
    expect(collinear({ x: 1, y: 5 }, { x: 9, y: 1 }, { x: 5, y: 4 })).toBe(false);
    expect(collinear({ x: 1, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 3 })).toBe(false);
    expect(onLine({ x: 11, y: 0 }, { x: 1, y: 5 }, { x: 9, y: 1 })).toBe(true);
  });

  it('classifies two lines', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 4, y: 2 };
    expect(lineRelation(a, b, { x: 0, y: 3 }, { x: 2, y: 4 }).kind).toBe('song-song');
    expect(lineRelation(a, b, { x: 6, y: 3 }, { x: 2, y: 1 }).kind).toBe('trung-nhau');
    expect(lineRelation(a, a, { x: 6, y: 3 }, { x: 2, y: 1 }).kind).toBe('khong-xac-dinh');
    const cut = lineRelation(a, b, { x: 0, y: 4 }, { x: 4, y: 0 });
    expect(cut.kind).toBe('cat-nhau');
    if (cut.kind === 'cat-nhau') {
      expect(cut.point.x).toBeCloseTo(8 / 3);
      expect(cut.point.y).toBeCloseTo(4 / 3);
    }
  });

  it('finds the intersection on both lines', () => {
    const a = { x: 1, y: 5 };
    const b = { x: 9, y: 1 };
    const c = { x: 5, y: 5 };
    const d = { x: 10, y: 6 };
    const cut = lineRelation(a, b, c, d);
    expect(cut.kind).toBe('cat-nhau');
    if (cut.kind !== 'cat-nhau') return;
    const p = cut.point;
    const onAB = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
    const onCD = (d.x - c.x) * (p.y - c.y) - (d.y - c.y) * (p.x - c.x);
    expect(Math.abs(onAB)).toBeLessThan(1e-9);
    expect(Math.abs(onCD)).toBeLessThan(1e-9);
  });

  it('clips a line to the board', () => {
    expect(rayExit({ x: 2, y: 2 }, { x: 1, y: 0 }, R)).toEqual({ x: 11, y: 2 });
    expect(rayExit({ x: 2, y: 2 }, { x: 0, y: 0 }, R)).toEqual({ x: 2, y: 2 });
    const [p, q] = lineInRect({ x: 1, y: 1 }, { x: 2, y: 2 }, R);
    expect(p).toEqual({ x: 7, y: 7 });
    expect(q).toEqual({ x: 0, y: 0 });
    expect(inRect({ x: 3, y: 8 }, R)).toBe(false);
    expect(inRect({ x: 11, y: 7 }, R)).toBe(true);
  });
});
