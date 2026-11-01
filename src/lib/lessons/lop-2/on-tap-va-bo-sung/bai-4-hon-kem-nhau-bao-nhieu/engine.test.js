import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { answerOptions, compareRows, explain, extraBlocks, newRows, question } from './engine.js';

describe('comparing two rows', () => {
  it('finds the difference and the longer row', () => {
    expect(compareRows(9, 6)).toEqual({ diff: 3, more: 'top' });
    expect(compareRows(4, 11)).toEqual({ diff: 7, more: 'bottom' });
    expect(compareRows(5, 5)).toEqual({ diff: 0, more: null });
    expect(extraBlocks(9, 6)).toEqual([6, 7, 8]);
    expect(extraBlocks(6, 9)).toEqual([]);
  });

  it('asks and explains both ways', () => {
    expect(question(9, 6)).toContain('nhiều hơn');
    expect(question(6, 9)).toContain('ít hơn');
    expect(explain(9, 6)).toBe(
      '9 − 6 = 3. Hàng trên nhiều hơn hàng dưới 3 khối. Hàng dưới ít hơn hàng trên 3 khối. 9 hơn 6 là 3, 6 kém 9 là 3.',
    );
    expect(explain(6, 9)).toContain('Hàng dưới nhiều hơn hàng trên 3 khối');
    expect(explain(5, 5)).toContain('bằng nhau');
  });

  it('offers distinct options that hold the difference', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const rand = rng(seed);
      const { top, bottom } = newRows(rand);
      const { options, answer } = answerOptions(rand, top, bottom);
      const diff = Math.abs(top - bottom);
      if (options[answer] !== diff) bad.push(['answer', top, bottom]);
      if (new Set(options).size !== options.length || options.length < 2)
        bad.push(['size', options]);
      if (options.some((v) => v < 0)) bad.push(['negative', options]);
    }
    expect(bad).toEqual([]);
  });

  it('changes the rows on each new task', () => {
    const rand = rng(2);
    let prev = newRows(rand);
    const bad = [];
    for (let i = 0; i < 30; i++) {
      const next = newRows(rand, prev);
      if (next.top === prev.top && next.bottom === prev.bottom) bad.push(next);
      prev = next;
    }
    expect(bad).toEqual([]);
  });
});
