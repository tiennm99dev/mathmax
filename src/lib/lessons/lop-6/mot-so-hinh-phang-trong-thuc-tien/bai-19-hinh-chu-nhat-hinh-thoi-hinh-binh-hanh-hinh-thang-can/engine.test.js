import { describe, it, expect } from 'vitest';
import { PRESETS, classify, counts, isConvex, lengthText, properties } from './engine.js';

/** @param {number[][]} xy */
const q = (xy) => xy.map(([x, y]) => ({ x, y }));

describe('classify', () => {
  it('names each preset after its key', () => {
    for (const [type, pts] of Object.entries(PRESETS)) expect(classify(pts), type).toBe(type);
  });

  it('tells the square from the rectangle and the rhombus', () => {
    expect(
      classify(
        q([
          [0, 0],
          [3, 0],
          [3, 3],
          [0, 3],
        ]),
      ),
    ).toBe('hinh-vuong');
    // A tilted square is still a square.
    expect(
      classify(
        q([
          [0, 1],
          [3, 0],
          [4, 3],
          [1, 4],
        ]),
      ),
    ).toBe('hinh-vuong');
  });

  it('recognises a trapezoid with unequal legs and a general quadrilateral', () => {
    expect(
      classify(
        q([
          [0, 0],
          [6, 0],
          [4, 3],
          [1, 3],
        ]),
      ),
    ).toBe('hinh-thang');
    expect(
      classify(
        q([
          [0, 0],
          [6, 0],
          [5, 4],
          [1, 2],
        ]),
      ),
    ).toBe('tu-giac');
  });

  it('rejects crossed and degenerate shapes', () => {
    expect(
      isConvex(
        q([
          [0, 0],
          [4, 4],
          [4, 0],
          [0, 4],
        ]),
      ),
    ).toBe(false);
    expect(
      classify(
        q([
          [0, 0],
          [2, 0],
          [4, 0],
          [2, 3],
        ]),
      ),
    ).toBe('khong-loi');
  });
});

describe('properties match the book', () => {
  it('rectangle: equal diagonals, four right angles, opposite sides equal', () => {
    const p = properties(PRESETS['hinh-chu-nhat']);
    expect(p).toMatchObject({
      rightAngles: 4,
      diagonalsEqual: true,
      oppositeSidesEqual: true,
      diagonalsBisect: true,
    });
  });
  it('rhombus: four equal sides, perpendicular diagonals', () => {
    const p = properties(PRESETS['hinh-thoi']);
    expect(p).toMatchObject({ allSidesEqual: true, diagonalsPerpendicular: true, rightAngles: 0 });
  });
  it('parallelogram: diagonals bisect each other, not equal', () => {
    const p = properties(PRESETS['hinh-binh-hanh']);
    expect(p).toMatchObject({ diagonalsBisect: true, diagonalsEqual: false });
  });
  it('isosceles trapezoid: equal diagonals, one pair of parallel sides', () => {
    const p = properties(PRESETS['hinh-thang-can']);
    expect(p).toMatchObject({ diagonalsEqual: true, abParallelCd: true, bcParallelDa: false });
  });
});

describe('counts', () => {
  it('lets a square count as rectangle, rhombus and parallelogram', () => {
    expect(counts('hinh-vuong', 'hinh-chu-nhat')).toBe(true);
    expect(counts('hinh-vuong', 'hinh-thoi')).toBe(true);
    expect(counts('hinh-thoi', 'hinh-binh-hanh')).toBe(true);
    expect(counts('hinh-binh-hanh', 'hinh-thoi')).toBe(false);
    expect(counts('hinh-chu-nhat', 'hinh-thang-can')).toBe(false);
  });
});

describe('lengthText', () => {
  const f = (/** @type {number} */ v) => String(v).replace('.', ',');
  it('writes exact lengths plainly and others rounded', () => {
    expect(lengthText(25, f)).toBe('5');
    expect(lengthText(20, f)).toBe('≈ 4,5');
  });
});
