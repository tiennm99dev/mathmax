import { describe, expect, it } from 'vitest';
import { areCollinear, lineThrough, polylineFigure, zigzag } from './figures.js';

describe('figures of the plane-shape chapter', () => {
  it('tells collinear points from others', () => {
    expect(areCollinear({ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 3, y: 6 })).toBe(true);
    expect(areCollinear({ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 3, y: 5 })).toBe(false);
    expect(areCollinear({ x: 40, y: 10 }, { x: 40, y: 20 }, { x: 40, y: 90 })).toBe(true);
  });

  it('runs a line through two points to the edges of the drawing', () => {
    expect(lineThrough({ x: 10, y: 20 }, { x: 50, y: 20 }, 100, 40)).toEqual([
      { x: 0, y: 20 },
      { x: 100, y: 20 },
    ]);
    expect(lineThrough({ x: 30, y: 10 }, { x: 30, y: 30 }, 100, 40)).toEqual([
      { x: 30, y: 0 },
      { x: 30, y: 40 },
    ]);
    const [p, q] = lineThrough({ x: 10, y: 10 }, { x: 20, y: 20 }, 100, 40);
    expect(p).toEqual({ x: 0, y: 0 });
    expect(q).toEqual({ x: 40, y: 40 });
  });

  it('draws a longer polyline part longer and keeps it inside the drawing', () => {
    const lengths = [3, 6, 4];
    const pts = zigzag(lengths);
    const drawn = lengths.map((_, i) =>
      Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y),
    );
    expect(drawn[0]).toBeLessThan(drawn[2]);
    expect(drawn[2]).toBeLessThan(drawn[1]);
    const out = pts.filter((p) => p.x < 0 || p.x > 320 || p.y < 0 || p.y > 150);
    expect(out).toEqual([]);
  });

  it('keeps a short part readable and every length label inside the drawing', () => {
    const bad = [];
    for (const lengths of [
      [2, 9],
      [9, 2],
      [9, 2, 9],
      [2, 2, 9],
      [9, 2, 2],
      [9, 9, 9],
    ]) {
      const f = polylineFigure('ABCD'.slice(0, lengths.length + 1), lengths);
      const dots = f.dots ?? [];
      for (let i = 0; i + 1 < dots.length; i++) {
        if (Math.hypot(dots[i + 1].x - dots[i].x, dots[i + 1].y - dots[i].y) < 40) {
          bad.push([lengths, 'short', i]);
        }
      }
      for (const t of f.texts ?? []) {
        if (t.x < 20 || t.x > 300 || t.y < 14 || t.y > 148) bad.push([lengths, t]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('names a polyline letter by letter', () => {
    const f = polylineFigure('MNP', [4, 7]);
    expect(f.segments).toEqual([
      ['M', 'N'],
      ['N', 'P'],
    ]);
    expect(f.texts?.map((t) => t.text)).toEqual(['4 cm', '7 cm']);
  });
});
