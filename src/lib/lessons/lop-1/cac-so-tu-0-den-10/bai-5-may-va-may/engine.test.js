import { describe, it, expect } from 'vitest';
import { clampLeft, joinText, progressText, remember, splitText, splits } from './engine.js';

describe('split and join engine', () => {
  it('lists every split with both parts at least one', () => {
    expect(splits(5)).toEqual([
      [1, 4],
      [2, 3],
      [3, 2],
      [4, 1],
    ]);
    expect(splits(2)).toEqual([[1, 1]]);
    const bad = [];
    for (let n = 2; n <= 10; n++) {
      const all = splits(n);
      if (all.length !== n - 1) bad.push(n);
      if (all.some(([l, r]) => l < 1 || r < 1 || l + r !== n)) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('writes split and join sentences', () => {
    expect(splitText(7, 3)).toBe('7 gồm 3 và 4');
    expect(joinText(7, 3)).toBe('3 và 4 gộp lại được 7');
  });

  it('keeps the left part in range', () => {
    expect(clampLeft(6, 0)).toBe(1);
    expect(clampLeft(6, 9)).toBe(5);
    expect(clampLeft(6, 3)).toBe(3);
  });

  it('remembers each split once', () => {
    expect(remember(remember(remember([], 3), 1), 3)).toEqual([1, 3]);
  });

  it('reports progress', () => {
    expect(progressText(6, 2)).toContain('2 trong 5');
    expect(progressText(6, 5)).toContain('đủ 5 cách');
  });
});
