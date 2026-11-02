import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KIND_NAMES, NAMED_SHAPES, classify, nameShape } from '../_shared/shape-questions.js';
import {
  KIND_LABELS,
  START_QUAD,
  START_TRIANGLE,
  buildRound,
  cellLengths,
  shapeMessage,
  toBoard,
  toGrid,
} from './engine.js';

/** @param {number[][]} coords */
const pts = (coords) => coords.map(([x, y]) => ({ x, y }));

describe('what corners make', () => {
  it('tells every kind of figure', () => {
    expect(
      classify(
        pts([
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
        ]),
      ),
    ).toBe('vuong');
    expect(
      classify(
        pts([
          [0, 0],
          [6, 0],
          [6, 3],
          [0, 3],
        ]),
      ),
    ).toBe('chu-nhat');
    expect(
      classify(
        pts([
          [0, 0],
          [5, 1],
          [6, 4],
          [1, 3],
        ]),
      ),
    ).toBe('tu-giac');
    expect(
      classify(
        pts([
          [0, 0],
          [4, 0],
          [2, 3],
        ]),
      ),
    ).toBe('tam-giac');
    expect(
      classify(
        pts([
          [0, 0],
          [2, 0],
          [4, 0],
        ]),
      ),
    ).toBe('thang-hang');
    expect(
      classify(
        pts([
          [0, 0],
          [2, 0],
          [4, 0],
          [2, 3],
        ]),
      ),
    ).toBe('thang-hang');
    expect(
      classify(
        pts([
          [0, 0],
          [4, 4],
          [4, 0],
          [0, 4],
        ]),
      ),
    ).toBe('cat-nhau');
  });

  it('knows tilted squares and rectangles', () => {
    expect(
      classify(
        pts([
          [2, 0],
          [4, 2],
          [2, 4],
          [0, 2],
        ]),
      ),
    ).toBe('vuong');
    expect(
      classify(
        pts([
          [1, 0],
          [4, 3],
          [3, 4],
          [0, 1],
        ]),
      ),
    ).toBe('chu-nhat');
  });

  it('does not call a diamond with no right angle a square', () => {
    const rhombus = pts([
      [3, 0],
      [5, 3],
      [3, 6],
      [1, 3],
    ]);
    expect(classify(rhombus)).toBe('tu-giac');
    expect(shapeMessage(rhombus)).toContain('chưa là hình vuông');
  });

  it('treats a repeated corner as no figure', () => {
    expect(
      classify(
        pts([
          [0, 0],
          [0, 0],
          [4, 4],
          [0, 4],
        ]),
      ),
    ).toBe('thang-hang');
    expect(
      classify(
        pts([
          [0, 0],
          [4, 0],
          [0, 0],
          [0, 4],
        ]),
      ),
    ).not.toBe('tu-giac');
  });

  it('starts with no right angle on the board', () => {
    expect(classify(START_QUAD)).toBe('tu-giac');
    expect(shapeMessage(START_QUAD)).toContain('không có góc vuông');
    expect(classify(START_TRIANGLE)).toBe('tam-giac');
  });

  it('counts the length of sides along the grid only', () => {
    expect(
      cellLengths(
        pts([
          [0, 0],
          [4, 0],
          [4, 3],
          [1, 5],
        ]),
      ),
    ).toEqual([4, 3, null, null]);
  });

  it('snaps to the grid and stays on it', () => {
    expect(toGrid(toBoard({ x: 3, y: 2 }))).toEqual({ x: 3, y: 2 });
    expect(toGrid({ x: -99, y: 9999 })).toEqual({ x: 0, y: 6 });
  });
});

describe('the round', () => {
  it('names every figure as its corners say', () => {
    const bad = NAMED_SHAPES.filter((f) => classify([...f.points]) !== f.kind).map((f) => f.kind);
    expect(bad).toEqual([]);
    for (const given of NAMED_SHAPES) {
      const q = nameShape(rng(1), given);
      expect(String(q.options[q.answer]).toLowerCase()).toBe(KIND_NAMES[given.kind]);
    }
  });

  it('has right answers worked out again from each question', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = String(q.options[q.answer]);
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        let ok = true;
        if (q.kind === 'dem') ok = Number(right) === (q.prompt.includes('tam giác') ? 3 : 4);
        if (q.kind === 'vuong') ok = Number(right) === nums[0];
        if (q.kind === 'chu-nhat')
          ok = Number(right) === (q.prompt.includes('CD dài') ? nums[0] : nums[1]);
        if (q.kind === 'canh') {
          const title = /hình ([A-Z]{4})/.exec(q.prompt)?.[1] ?? '';
          const sides = [0, 1, 2, 3].map((i) => title[i] + title[(i + 1) % 4]);
          ok =
            !sides.includes(right) &&
            q.options.filter((o) => o !== right).every((o) => sides.includes(String(o)));
        }
        if (!ok) bad.push(`${seed}: ${q.kind} ${q.prompt} -> ${right}`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${seed}: repeats ${q.prompt}`);
        if (!(q.kind in KIND_LABELS)) bad.push(`${seed}: kind ${q.kind}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("never says a figure's name in the picture label while it is open", () => {
    const bad = [];
    for (const given of NAMED_SHAPES) {
      const q = nameShape(rng(2), given);
      if (/hình (tam giác|tứ giác|chữ nhật|vuông)/.test(q.visual?.label ?? ''))
        bad.push(given.kind);
    }
    expect(bad).toEqual([]);
  });
});
