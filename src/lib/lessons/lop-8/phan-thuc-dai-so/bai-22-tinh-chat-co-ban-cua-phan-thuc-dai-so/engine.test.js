import { describe, expect, it } from 'vitest';
import { PRESETS } from './engine.js';
import { cancelAll, expand, hasCommon, ratioTex, standing } from '../_shared/factors.js';

describe('fractions to reduce', () => {
  it('factorise the expanded numerators and denominators', () => {
    expect(PRESETS.map((p) => [expand(p.top), expand(p.bottom)])).toEqual([
      [
        [0, 0, 6],
        [0, 0, 0, 8],
      ],
      [
        [-4, 0, 1],
        [0, 2, 1],
      ],
      [
        [-6, 3],
        [4, -4, 1],
      ],
      [
        [-1, 0, 1],
        [0, -1, 0, 1],
      ],
      [
        [4, 2],
        [6, 5, 1],
      ],
      [
        [2, 1],
        [4, 1],
      ],
    ]);
  });

  it('reduce to the forms the lesson states', () => {
    const reduced = PRESETS.map((p) => {
      const { topOut, bottomOut } = cancelAll(p.top, p.bottom);
      expect(hasCommon(p.top, topOut, p.bottom, bottomOut)).toBe(false);
      return ratioTex(standing(p.top, topOut), standing(p.bottom, bottomOut));
    });
    expect(reduced).toEqual([
      '\\dfrac{3}{4x}',
      '\\dfrac{x - 2}{x}',
      '\\dfrac{3}{x - 2}',
      '\\dfrac{1}{x}',
      '\\dfrac{2}{x + 3}',
      '\\dfrac{x + 2}{x + 4}',
    ]);
  });

  it('see common factors before any is struck, except in the last fraction', () => {
    expect(
      PRESETS.map((p) =>
        hasCommon(
          p.top,
          p.top.map(() => false),
          p.bottom,
          p.bottom.map(() => false),
        ),
      ),
    ).toEqual([true, true, true, true, true, false]);
  });
});
