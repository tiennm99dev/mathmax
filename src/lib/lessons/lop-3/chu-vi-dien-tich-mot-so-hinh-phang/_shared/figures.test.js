import { describe, expect, it } from 'vitest';
import {
  cellCount,
  cellsOf,
  fitBoard,
  perimeter,
  rectArea,
  rectAreaLine,
  rectCorners,
  rectPerimeter,
  rectPerimeterLine,
  rowsText,
  sideLabelSpot,
  sidesOf,
  squareArea,
  squareAreaLine,
  squarePerimeter,
  squarePerimeterLine,
  sumLine,
} from './figures.js';

describe('perimeter and area', () => {
  it('adds the sides and uses the book rules', () => {
    expect(perimeter([3, 4, 5])).toBe(12);
    expect(rectPerimeter(4, 3)).toBe(14);
    expect(squarePerimeter(3)).toBe(12);
    expect(rectArea(4, 3)).toBe(12);
    expect(squareArea(3)).toBe(9);
  });

  it('agrees with adding the four sides of a rectangle and a square', () => {
    const bad = [];
    for (let d = 1; d <= 20; d++) {
      for (let r = 1; r <= d; r++) {
        if (rectPerimeter(d, r) !== perimeter(sidesOf(rectCorners(d, r)))) bad.push([d, r]);
      }
      if (squarePerimeter(d) !== perimeter(sidesOf(rectCorners(d, d)))) bad.push([d]);
    }
    expect(bad).toEqual([]);
  });

  it('writes the lines the book way', () => {
    expect(sumLine([3, 4, 5], 'cm')).toBe('3 + 4 + 5 = 12 (cm)');
    expect(rectPerimeterLine(4, 3, 'dm')).toBe('(4 + 3) × 2 = 14 (dm)');
    expect(squarePerimeterLine(3, 'dm')).toBe('3 × 4 = 12 (dm)');
    expect(rectAreaLine(4, 3)).toBe('4 × 3 = 12 (cm²)');
    expect(squareAreaLine(3)).toBe('3 × 3 = 9 (cm²)');
  });
});

describe('drawing helpers', () => {
  it('fits a polygon inside the board', () => {
    const pts = rectCorners(9, 2);
    const { toBoard } = fitBoard(pts, 340, 230, 44);
    const out = pts.map(toBoard).filter((p) => p.x < 44 - 1e-9 || p.x > 296 + 1e-9);
    expect(out).toEqual([]);
  });

  it('puts side labels outside the polygon', () => {
    const pts = rectCorners(4, 2).map((p) => ({ x: p.x * 10, y: p.y * 10 }));
    expect(sideLabelSpot(pts, 0, 5)).toEqual({ x: 20, y: -5 });
    expect(sideLabelSpot(pts, 1, 5)).toEqual({ x: 45, y: 10 });
  });

  it('reads a shape of squares without its total', () => {
    const rows = ['XX..', 'XXXX'];
    expect(cellCount(rows)).toBe(6);
    expect(cellsOf(['.X'])).toEqual([{ row: 0, col: 1 }]);
    expect(rowsText(rows)).toBe('Hàng 1: 2 ô. Hàng 2: 4 ô');
  });
});
