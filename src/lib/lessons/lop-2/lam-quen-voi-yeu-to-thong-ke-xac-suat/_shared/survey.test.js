import { describe, expect, it } from 'vitest';
import { extremes, tallyBundles, tallyWords } from './survey.js';

describe('tally bundles', () => {
  it('groups strokes in fives', () => {
    expect(tallyBundles(0)).toEqual([]);
    expect(tallyBundles(4)).toEqual([4]);
    expect(tallyBundles(5)).toEqual([5]);
    expect(tallyBundles(12)).toEqual([5, 5, 2]);
  });

  it('reads a tally in words', () => {
    expect(tallyWords(3)).toBe('3 vạch');
    expect(tallyWords(5)).toBe('1 bó 5 vạch');
    expect(tallyWords(7)).toBe('1 bó 5 vạch và 2 vạch');
  });
});

describe('extremes', () => {
  it('names every category that ties', () => {
    const rows = [
      { label: 'nắng', count: 3 },
      { label: 'mưa', count: 2 },
      { label: 'mây', count: 2 },
    ];
    expect(extremes(rows)).toEqual({ max: 3, min: 2, most: ['nắng'], least: ['mưa', 'mây'] });
  });
});
