import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { canMove, explain, frameMessage, frames, newPair, sumOptions } from './engine.js';

describe('two ten-frames for an addition across ten', () => {
  it('moves blue dots into the first frame', () => {
    const { first, second } = frames(9, 5, 1);
    expect(first.filter((c) => c === 'red')).toHaveLength(9);
    expect(first[9]).toBe('blue');
    expect(second.filter((c) => c === 'blue')).toHaveLength(4);
    expect(canMove(9, 0)).toBe(true);
    expect(canMove(9, 1)).toBe(false);
  });

  it('says what is missing, then reads the sum', () => {
    expect(frameMessage(8, 5, 1)).toContain('Còn thiếu 1 chấm');
    expect(frameMessage(8, 5, 2)).toContain('5 = 2 + 3. 10 + 3 = 13.');
    expect(explain(9, 5)).toBe('Tách 5 = 1 + 4. 9 + 1 = 10. 10 + 4 = 14. Vậy 9 + 5 = 14.');
  });

  it('draws additions across ten with options that hold the sum', () => {
    const bad = [];
    const rand = rng(3);
    let prev;
    for (let i = 0; i < 60; i++) {
      const p = newPair(rand, prev);
      if (p.a + p.b <= 10 || p.b > 9 || (prev && p.a === prev.a && p.b === prev.b)) bad.push(p);
      const { options, answer } = sumOptions(rand, p.a, p.b);
      if (options[answer] !== String(p.a + p.b) || new Set(options).size !== options.length)
        bad.push(options);
      prev = p;
    }
    expect(bad).toEqual([]);
  });
});
