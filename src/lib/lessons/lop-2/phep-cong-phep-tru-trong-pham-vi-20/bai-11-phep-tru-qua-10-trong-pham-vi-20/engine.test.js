import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { canCross, differenceOptions, explain, frameMessage, frames, newPair } from './engine.js';

describe('two ten-frames for a subtraction across ten', () => {
  it('draws the dots and the crossed ones', () => {
    const { first, second } = frames(12, [9], [0, 1]);
    expect(first.filter((x) => x === 'red')).toHaveLength(9);
    expect(first[9]).toBe('gone');
    expect(second.slice(0, 3)).toEqual(['gone', 'gone', 'empty']);
  });

  it('crosses the second frame first and never more than asked', () => {
    const state = { c: 12, b: 3, goneFirst: /** @type {number[]} */ ([]), goneSecond: [0] };
    expect(canCross(state, 'first', 9)).toBe(false);
    expect(canCross(state, 'second', 1)).toBe(true);
    expect(canCross(state, 'second', 2)).toBe(false);
    expect(canCross({ ...state, goneSecond: [0, 1] }, 'first', 9)).toBe(true);
    expect(canCross({ ...state, goneSecond: [0, 1], goneFirst: [9] }, 'first', 8)).toBe(false);
  });

  it('passes the 10 mark step by step', () => {
    expect(frameMessage(12, 3, 2)).toBe(
      'Đã bớt 2 chấm, còn 10 chấm. Cần bớt thêm 1 chấm nữa ở khung thứ nhất.',
    );
    expect(frameMessage(15, 7, 6)).toBe('Còn 9 chấm. Cần bớt thêm 1 chấm nữa.');
    expect(frameMessage(12, 3, 3)).toContain('3 = 2 + 1');
    expect(explain(12, 3)).toBe('Tách 3 = 2 + 1. 12 − 2 = 10. 10 − 1 = 9. Vậy 12 − 3 = 9.');
  });

  it('draws subtractions across ten with options that hold the difference', () => {
    const bad = [];
    const rand = rng(11);
    let prev;
    for (let i = 0; i < 60; i++) {
      const p = newPair(rand, prev);
      if (p.c < 11 || p.c > 18 || p.c - p.b >= 10 || p.b > 9) bad.push(p);
      if (prev && p.c === prev.c && p.b === prev.b) bad.push(['same', p]);
      const { options, answer } = differenceOptions(rand, p.c, p.b);
      if (options[answer] !== String(p.c - p.b)) bad.push(options);
      prev = p;
    }
    expect(bad).toEqual([]);
  });
});
