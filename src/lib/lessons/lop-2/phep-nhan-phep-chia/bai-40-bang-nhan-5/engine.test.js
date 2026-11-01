import { describe, expect, it } from 'vitest';
import { round } from './engine.js';

describe('the table of 5', () => {
  it('builds rounds with the right product', () => {
    const bad = [];
    for (let seed = 1; seed <= 12; seed++) {
      for (const q of round(seed)) {
        const right = 5 * (q.visual?.n ?? 0);
        if (q.options[q.answer] !== String(right)) bad.push([seed, q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });
});
