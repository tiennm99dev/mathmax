import { describe, expect, it } from 'vitest';
import { hopsFor, round } from './engine.js';

describe('the table of 2', () => {
  it('lands each hop on the next product', () => {
    expect(hopsFor(0)).toEqual([]);
    const last = hopsFor(10).at(-1);
    expect(last).toEqual({ from: 18, to: 20, label: '+2' });
  });

  it('builds rounds with the right product', () => {
    const bad = [];
    for (let seed = 1; seed <= 12; seed++) {
      for (const q of round(seed)) {
        const right = 2 * (q.visual?.n ?? 0);
        if (q.options[q.answer] !== String(right)) bad.push([seed, q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });
});
