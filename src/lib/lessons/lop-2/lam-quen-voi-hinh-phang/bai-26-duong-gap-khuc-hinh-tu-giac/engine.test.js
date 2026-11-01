import { describe, expect, it } from 'vitest';
import {
  CHALLENGES,
  COLS,
  FIGURE_BINS,
  FIGURE_CARDS,
  QUAD_CARDS,
  ROWS,
  challengeNote,
  meets,
  nameOf,
  partLengths,
  pathText,
  refusal,
} from './engine.js';

/**
 * Whether a walk through `path` is accepted dot by dot.
 * @param {import('./engine.js').Spot[]} path
 */
function legal(path) {
  return path.every((p, i) => refusal(path.slice(0, i), p) === null);
}

describe('drawing a polyline on the grid', () => {
  it('adds up the parts and names the corners', () => {
    const path = [
      { c: 0, r: 0 },
      { c: 3, r: 0 },
      { c: 3, r: 2 },
    ];
    expect(partLengths(path)).toEqual([3, 2]);
    expect(nameOf(path.length)).toBe('ABC');
    expect(pathText(path)).toBe('Đường gấp khúc ABC gồm 2 đoạn thẳng. Độ dài: 3 + 2 = 5 (cm).');
  });

  it('refuses dots that leave the row and column, repeat, go on straight or touch the line', () => {
    const a = { c: 1, r: 1 };
    const b = { c: 4, r: 1 };
    const c = { c: 4, r: 3 };
    expect(refusal([a], { c: 2, r: 2 })).toBe('off-grid');
    expect(refusal([a], a)).toBe('same');
    expect(refusal([a, b], { c: 5, r: 1 })).toBe('straight');
    expect(refusal([a, b], { c: 2, r: 1 })).toBe('touches');
    expect(refusal([a, b, c, { c: 2, r: 3 }], { c: 2, r: 0 })).toBe('touches');
    expect(refusal([a, b], c)).toBeNull();
  });

  it('stops at seven corners', () => {
    const path = [
      { c: 0, r: 0 },
      { c: 1, r: 0 },
      { c: 1, r: 1 },
      { c: 2, r: 1 },
      { c: 2, r: 2 },
      { c: 3, r: 2 },
      { c: 3, r: 3 },
    ];
    expect(legal(path)).toBe(true);
    expect(refusal(path, { c: 5, r: 3 })).toBe('full');
  });

  it('has a legal drawing on the board for every challenge', () => {
    const solutions = [
      [
        { c: 0, r: 0 },
        { c: 3, r: 0 },
        { c: 3, r: 4 },
      ],
      [
        { c: 0, r: 0 },
        { c: 5, r: 0 },
        { c: 5, r: 3 },
        { c: 3, r: 3 },
      ],
      [
        { c: 0, r: 0 },
        { c: 5, r: 0 },
        { c: 5, r: 2 },
        { c: 1, r: 2 },
        { c: 1, r: 3 },
      ],
      [
        { c: 0, r: 0 },
        { c: 2, r: 0 },
        { c: 2, r: 2 },
        { c: 4, r: 2 },
        { c: 4, r: 4 },
        { c: 5, r: 4 },
      ],
    ];
    /** @type {unknown[]} */
    const bad = [];
    CHALLENGES.forEach((ch, i) => {
      const s = solutions[i];
      if (!legal(s) || !meets(s, ch)) bad.push(ch);
      if (s.some((p) => p.c >= COLS || p.r >= ROWS)) bad.push(ch);
    });
    expect(bad).toEqual([]);
  });
});

describe('sorting quadrilaterals', () => {
  it('counts four corners on every closed quadrilateral and nowhere else', () => {
    const bad = [];
    for (const card of QUAD_CARDS) {
      const f = FIGURE_CARDS[card.id];
      const quad = f.shapes?.length === 1 && f.shapes[0].length === 4;
      if ((card.bin === 'tu-giac') !== quad) bad.push(card.id);
      if (!FIGURE_BINS.some((b) => b.id === card.bin)) bad.push(card.id);
    }
    expect(bad).toEqual([]);
    expect(QUAD_CARDS).toHaveLength(8);
  });

  it('says when a polyline has gone past the task, and only then', () => {
    const task = { parts: 2, cm: 7 };
    const spots = (/** @type {Array<[number, number]>} */ ...list) =>
      list.map(([c, r]) => ({ c, r }));
    expect(challengeNote(spots([0, 0], [1, 0]), task)).toBe('');
    expect(challengeNote(spots([0, 0], [5, 0], [5, 2]), task)).toBe('');
    expect(challengeNote(spots([0, 0], [5, 0], [5, 1]), task)).toContain('dài 7 cm');
    expect(challengeNote(spots([0, 0], [1, 0], [1, 1], [2, 1]), task)).toContain('2 đoạn thẳng');
    expect(challengeNote(spots([0, 0], [5, 0], [5, 4]), { parts: 3, cm: 9 })).toContain('dài 9 cm');
  });
});
