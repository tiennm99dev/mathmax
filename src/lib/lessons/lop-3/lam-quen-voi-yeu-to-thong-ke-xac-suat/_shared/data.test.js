import { describe, expect, it } from 'vitest';
import { countBy, extremes, tallyBundles, totalOf } from './data.js';

describe('data helpers', () => {
  it('bundles tally strokes by five', () => {
    expect(tallyBundles(0)).toEqual([]);
    expect(tallyBundles(4)).toEqual([4]);
    expect(tallyBundles(5)).toEqual([5]);
    expect(tallyBundles(12)).toEqual([5, 5, 2]);
  });

  it('counts items by category and adds the counts', () => {
    expect(countBy([0, 2, 2, 1, 2], 3)).toEqual([1, 1, 3]);
    expect(countBy([], 2)).toEqual([0, 0]);
    expect(totalOf([{ count: 18 }, { count: 29 }, { count: 6 }])).toBe(53);
  });

  it('finds the most and the fewest, ties included', () => {
    const rows = [
      { label: 'Bò', count: 45 },
      { label: 'Gà', count: 120 },
      { label: 'Lợn', count: 78 },
      { label: 'Dê', count: 36 },
    ];
    expect(extremes(rows)).toEqual({ max: 120, min: 36, most: ['Gà'], least: ['Dê'] });
    const tie = extremes([
      { label: 'A', count: 3 },
      { label: 'B', count: 3 },
    ]);
    expect(tie.most).toEqual(['A', 'B']);
    expect(tie.least).toEqual(['A', 'B']);
  });
});
