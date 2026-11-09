import { describe, expect, it } from 'vitest';
import { sidesOf } from '../_shared/figures.js';
import {
  QUADS,
  TRIANGLES,
  antAt,
  cornersOf,
  fitWidth,
  shortcutText,
  sideName,
  walkText,
  wholeSides,
} from './engine.js';

describe('the shapes', () => {
  it('have whole sides only', () => {
    const bad = [];
    for (const pts of [...TRIANGLES, ...QUADS]) {
      for (const s of sidesOf(pts)) if (Math.abs(s - Math.round(s)) > 1e-9) bad.push(s);
    }
    expect(bad).toEqual([]);
  });

  it('gives the lengths of each preset', () => {
    expect(TRIANGLES.map((p) => wholeSides(p))).toEqual([
      [3, 4, 5],
      [5, 6, 5],
      [5, 8, 5],
    ]);
    expect(QUADS.map((p) => wholeSides(p))).toEqual([
      [3, 5, 9, 5],
      [4, 5, 7, 4],
      [5, 4, 5, 4],
    ]);
  });

  it('builds rectangles and squares from their sizes', () => {
    const size = { preset: 0, length: 5, width: 3, side: 4 };
    expect(wholeSides(cornersOf('chu-nhat', size))).toEqual([5, 3, 5, 3]);
    expect(wholeSides(cornersOf('vuong', size))).toEqual([4, 4, 4, 4]);
    expect(cornersOf('tam-giac', { ...size, preset: 4 })).toBe(TRIANGLES[1]);
  });

  it('keeps a rectangle longer than wide', () => {
    expect(fitWidth(5, 3)).toBe(3);
    expect(fitWidth(3, 3)).toBe(2);
    expect(fitWidth(2, 5)).toBe(1);
  });
});

describe('the ant', () => {
  it('crawls along the sides', () => {
    const pts = TRIANGLES[0];
    expect(antAt(pts, 0, 0)).toEqual(pts[0]);
    expect(antAt(pts, 1, 0.5)).toEqual({ x: 2, y: 3 });
    expect(antAt(pts, 3, 0)).toEqual(pts[0]);
  });

  it('adds up the sides it has walked', () => {
    expect(walkText('tam-giac', [3, 4, 5], 0)).toContain('cạnh AB');
    expect(walkText('tam-giac', [3, 4, 5], 1)).toContain('3 cm');
    expect(walkText('tam-giac', [3, 4, 5], 2)).toContain('3 + 4 = 7 (cm)');
    expect(walkText('tam-giac', [3, 4, 5], 3)).toBe(
      'Kiến bò hết một vòng: 3 + 4 + 5 = 12 (cm). Chu vi hình tam giác ABC là 12 cm.',
    );
    expect(walkText('tu-giac', [3, 5, 9, 5], 4)).toContain('hình tứ giác MNPQ là 22 cm');
    expect(sideName(['M', 'N', 'P', 'Q'], 3)).toBe('QM');
  });

  it('shows the quick rule only for rectangles and squares', () => {
    const size = { length: 5, width: 3, side: 4 };
    expect(shortcutText('chu-nhat', size)).toContain('(5 + 3) × 2 = 16 (cm)');
    expect(shortcutText('vuong', size)).toContain('4 × 4 = 16 (cm)');
    expect(shortcutText('tam-giac', size)).toBeNull();
  });
});
