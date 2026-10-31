import { describe, it, expect } from 'vitest';
import { NUMBER_WORDS, TOP, capitalWord, freshInt, wordOf } from './number-words.js';

describe('number words 0 to 10', () => {
  it('has one word per number', () => {
    expect(NUMBER_WORDS).toHaveLength(TOP + 1);
    expect(wordOf(0)).toBe('không');
    expect(wordOf(7)).toBe('bảy');
    expect(wordOf(10)).toBe('mười');
    expect(capitalWord(5)).toBe('Năm');
  });

  it('picks a fresh number in range', () => {
    const bad = [];
    for (let prev = 6; prev <= 10; prev++) {
      for (const r of [0, 0.3, 0.7, 0.999999]) {
        const n = freshInt(6, 10, prev, () => r);
        if (n === prev || n < 6 || n > 10) bad.push([prev, r, n]);
      }
    }
    expect(bad).toEqual([]);
    expect(freshInt(3, 3, 3)).toBe(3);
  });
});
