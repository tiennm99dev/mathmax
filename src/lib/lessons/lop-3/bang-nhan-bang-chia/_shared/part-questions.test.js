import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  equalFigure,
  figureLabel,
  isEqual,
  isOneOver,
  partPaths,
  partWords,
  sliceAngles,
  unevenSizes,
} from './parts.js';
import {
  equalParts,
  pickPart,
  readPart,
  readWritten,
  rightOrWrong,
  shareOf,
} from './part-questions.js';

const NS = [2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Runs a check on every number of parts over several seeds and lists the failures.
 * @param {(rand: () => number, n: number) => boolean} ok
 */
function failures(ok) {
  const bad = [];
  for (const n of NS) {
    for (let seed = 1; seed <= 25; seed++) {
      if (!ok(rng(seed * 31 + n), n)) bad.push([n, seed]);
    }
  }
  return bad;
}

/** @param {any} q */
const wellFormed = (q) =>
  q.answer >= 0 &&
  q.answer < q.options.length &&
  q.options.length >= 2 &&
  new Set(q.options.map((/** @type {any} */ o) => o.label ?? o)).size === q.options.length;

describe('how the book writes and reads a part', () => {
  it('reads every part the book reads', () => {
    expect(NS.map(partWords)).toEqual([
      'một phần hai',
      'một phần ba',
      'một phần tư',
      'một phần năm',
      'một phần sáu',
      'một phần bảy',
      'một phần tám',
      'một phần chín',
    ]);
  });

  it('cuts a circle into slices that fill it', () => {
    const slices = sliceAngles([1, 1, 1, 1]);
    expect(slices.map((s) => s.end)).toEqual([90, 180, 270, 360]);
    expect(sliceAngles([2, 1, 1])[0].end).toBe(180);
  });

  it('draws one path for each part', () => {
    expect(partPaths({ shape: 'circle', sizes: [1, 1, 1], shaded: 0 })).toHaveLength(3);
    expect(partPaths({ shape: 'bar', sizes: [2, 1], shaded: 0 })).toHaveLength(2);
    expect(partPaths({ shape: 'grid', sizes: Array(9).fill(1), shaded: 0 })).toHaveLength(9);
  });

  it('names a square grid as a square and a wider grid as a rectangle', () => {
    expect(figureLabel(equalFigure('grid', 4))).toMatch(/^Hình vuông/);
    expect(figureLabel(equalFigure('grid', 9))).toMatch(/^Hình vuông/);
    expect(figureLabel(equalFigure('grid', 6))).toMatch(/^Hình chữ nhật/);
  });

  it('keeps uneven sizes uneven in every pattern', () => {
    const bad = NS.flatMap((n) =>
      [0, 1, 2].filter((p) => new Set(unevenSizes(n, p)).size < 2).map((p) => [n, p]),
    );
    expect(bad).toEqual([]);
  });
});

describe('the questions on a part', () => {
  it('gives the coloured part its number of equal parts', () => {
    expect(
      failures((rand, n) => {
        const q = readPart(rand, n);
        const v = /** @type {any} */ (q.visual);
        const right = /** @type {any} */ (q.options[q.answer]);
        return wellFormed(q) && q.options.length === 4 && right.n === n && isOneOver(v.figure, n);
      }),
    ).toEqual([]);
  });

  it('reads the written part', () => {
    expect(
      failures((rand, n) => {
        const q = readWritten(rand, n);
        const clean = q.options.every((o) => /^\p{Lu}\S* phần \S+$/u.test(String(o)));
        return wellFormed(q) && clean && String(q.options[q.answer]).toLowerCase() === partWords(n);
      }),
    ).toEqual([]);
  });

  it('has one shape coloured 1/n among the pictures', () => {
    expect(
      failures((rand, n) => {
        const q = pickPart(rand, n);
        const right = q.options.filter((o) => isOneOver(/** @type {any} */ (o).figure, n));
        return wellFormed(q) && right.length === 1 && right[0] === q.options[q.answer];
      }),
    ).toEqual([]);
  });

  it('has one shape with equal parts among the pictures', () => {
    expect(
      failures((rand, n) => {
        const q = equalParts(rand, n);
        const right = q.options.filter((o) => isEqual(/** @type {any} */ (o).figure));
        return wellFormed(q) && right.length === 1 && right[0] === q.options[q.answer];
      }),
    ).toEqual([]);
  });

  it('judges a claim by the shape it is about', () => {
    expect(
      failures((rand, n) => {
        const q = rightOrWrong(rand, n);
        const said = Number(q.prompt.match(/1\/(\d)/)?.[1]);
        const truth = isOneOver(/** @type {any} */ (q.visual).figure, said);
        return q.options[q.answer] === (truth ? 'Đúng' : 'Sai');
      }),
    ).toEqual([]);
  });

  it('divides a set into equal parts it can draw', () => {
    expect(
      failures((rand, n) => {
        const q = shareOf(rand, n);
        const v = /** @type {any} */ (q.visual);
        const each = v.total / v.parts;
        return (
          wellFormed(q) &&
          Number.isInteger(each) &&
          each >= 2 &&
          v.total <= 24 &&
          v.parts === n &&
          q.options[q.answer] === String(each)
        );
      }),
    ).toEqual([]);
  });
});
