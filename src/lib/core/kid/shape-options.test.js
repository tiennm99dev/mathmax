import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { figureTitle, shapeOptions } from './shape-options.js';

describe('shapeOptions', () => {
  it('names a figure at the start of an option', () => {
    expect(figureTitle('vuong')).toBe('Hình vuông');
  });

  it('offers the right shape and two other shapes', () => {
    const rand = rng(3);
    const bad = [];
    for (let i = 0; i < 40; i++) {
      const { options, answer } = shapeOptions(rand, 'tron');
      if (options[answer] !== 'Hình tròn' || new Set(options).size !== 3) bad.push(options);
    }
    expect(bad).toEqual([]);
  });
});
