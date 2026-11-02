import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { newVesselPair } from '#lib/core/kid/capacity.js';
import { litreOptions, moreOptions, vesselLabel } from './engine.js';

describe('litres', () => {
  it('offers litre options that hold the right one', () => {
    const bad = [];
    const rand = rng(16);
    for (let l = 2; l <= 10; l++) {
      const { options, answer } = litreOptions(rand, l);
      if (options[answer] !== `${l} l` || new Set(options).size !== options.length) bad.push(l);
    }
    expect(bad).toEqual([]);
  });

  it('names the container that holds more', () => {
    const bad = [];
    const rand = rng(61);
    for (let i = 0; i < 100; i++) {
      const pair = newVesselPair(rand);
      const { answer } = moreOptions(pair);
      if (pair[answer].l <= pair[1 - answer].l) bad.push(pair);
    }
    expect(bad).toEqual([]);
    expect(
      moreOptions([
        { id: 'can', l: 5 },
        { id: 'bucket', l: 8 },
      ]),
    ).toEqual({
      options: ['Can chứa được nhiều nước hơn.', 'Xô chứa được nhiều nước hơn.'],
      answer: 1,
    });
    expect(vesselLabel('can', true)).toBe('Can đã hết nước');
  });
});
