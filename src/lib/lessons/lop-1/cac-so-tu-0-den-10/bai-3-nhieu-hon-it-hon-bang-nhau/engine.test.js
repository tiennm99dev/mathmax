import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  MAX_GROUP,
  addPair,
  allPaired,
  compareGroups,
  isPaired,
  newGroups,
  progressMessage,
  resultMessage,
} from './engine.js';

describe('pairing engine', () => {
  it('joins each object at most once', () => {
    let pairs = addPair([], 0, 2);
    pairs = addPair(pairs, 0, 1);
    pairs = addPair(pairs, 3, 2);
    expect(pairs).toEqual([[0, 2]]);
    pairs = addPair(pairs, 1, 0);
    expect(pairs).toHaveLength(2);
    expect(isPaired(pairs, 'top', 1)).toBe(true);
    expect(isPaired(pairs, 'bottom', 1)).toBe(false);
  });

  it('is done when the smaller group is used up', () => {
    expect(allPaired([[0, 0]], 3, 1)).toBe(true);
    expect(allPaired([[0, 0]], 3, 2)).toBe(false);
  });

  it('compares the groups', () => {
    expect(compareGroups(5, 3)).toBe('more');
    expect(compareGroups(2, 4)).toBe('less');
    expect(compareGroups(4, 4)).toBe('equal');
  });

  it('names the leftovers and both comparisons', () => {
    const more = resultMessage(5, 3, 'con mèo', 'con cá');
    expect(more).toContain('Còn thừa 2 con mèo');
    expect(more).toContain('Số con mèo nhiều hơn số con cá');
    expect(more).toContain('Số con cá ít hơn số con mèo');
    expect(resultMessage(2, 4, 'con bướm', 'bông hoa')).toContain('Còn thừa 2 bông hoa');
    expect(resultMessage(4, 4, 'a', 'b')).toContain('bằng');
    expect(progressMessage(3, 5, 3, 'a', 'b')).toContain('Còn thừa');
    expect(progressMessage(1, 5, 3, 'a', 'b')).toContain('Đã nối 1 cặp');
  });

  it('draws group sizes in range', () => {
    const rand = rng(7);
    const bad = [];
    let equal = 0;
    for (let i = 0; i < 400; i++) {
      const [t, b] = newGroups(rand);
      if (t < 1 || b < 1 || t > MAX_GROUP || b > MAX_GROUP) bad.push([t, b]);
      if (t === b) equal += 1;
    }
    expect(bad).toEqual([]);
    expect(equal).toBeGreaterThan(40);
    expect(equal).toBeLessThan(400);
  });
});
