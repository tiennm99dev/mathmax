import { describe, expect, it } from 'vitest';
import { SHAPES, areaOf, compareText, inShape, tileText } from './engine.js';

describe('the shapes to tile', () => {
  it('have the areas the widget reports', () => {
    expect(SHAPES.map((_, i) => areaOf(i))).toEqual([8, 8, 5, 6, 8]);
  });

  it('pairs two shapes of another form with the same area first', () => {
    expect(SHAPES[0].rows).not.toEqual(SHAPES[1].rows);
    expect(areaOf(0)).toBe(areaOf(1));
  });

  it('knows which places belong to a shape', () => {
    expect(inShape(SHAPES[2].rows, 0, 0)).toBe(false);
    expect(inShape(SHAPES[2].rows, 1, 0)).toBe(true);
    expect(inShape(SHAPES[2].rows, 5, 0)).toBe(false);
  });
});

describe('the live lines', () => {
  it('counts the squares and gives the area once covered', () => {
    expect(tileText(8, 0)).toContain('chạm');
    expect(tileText(8, 3)).toContain('chưa được lát kín');
    expect(tileText(8, 8)).toBe('Hình được lát kín bằng 8 ô vuông 1 cm². Diện tích hình là 8 cm².');
  });

  it('compares the shapes tiled', () => {
    expect(compareText([{ name: 'Hình A', area: 8 }])).toBeNull();
    expect(
      compareText([
        { name: 'Hình A', area: 8 },
        { name: 'Hình B', area: 8 },
      ]),
    ).toContain('diện tích bằng nhau');
    expect(
      compareText([
        { name: 'Hình B', area: 8 },
        { name: 'Hình C', area: 5 },
      ]),
    ).toBe('Hình B (8 cm²) có diện tích lớn hơn Hình C (5 cm²).');
  });
});
