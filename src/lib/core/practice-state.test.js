import { describe, it, expect } from 'vitest';
import { loadSolved, saveSolved, scrambledOrder } from './practice-state.js';

function memoryStorage() {
  /** @type {Map<string, string>} */
  const data = new Map();
  return {
    data,
    /** @param {string} k */
    getItem: (k) => data.get(k) ?? null,
    /** @param {string} k @param {string} v */
    setItem: (k, v) => void data.set(k, v),
  };
}

const throwing = {
  getItem() {
    throw new Error('SecurityError');
  },
  setItem() {
    throw new Error('QuotaExceededError');
  },
};

describe('solved store', () => {
  it('round-trips solved indices per key', () => {
    const s = memoryStorage();
    expect(saveSolved('/a/', [0, 2], s)).toBe(true);
    expect(loadSolved('/a/', 5, s)).toEqual([0, 2]);
    expect(loadSolved('/b/', 5, s)).toEqual([]);
  });

  it('drops stale, repeated and junk entries', () => {
    const s = memoryStorage();
    s.setItem('practice:/a/', JSON.stringify([4, 1, 1, 9, -1, 'x', 2.5]));
    expect(loadSolved('/a/', 5, s)).toEqual([1, 4]);
    s.setItem('practice:/a/', '{not json');
    expect(loadSolved('/a/', 5, s)).toEqual([]);
    s.setItem('practice:/a/', '{"a":1}');
    expect(loadSolved('/a/', 5, s)).toEqual([]);
  });

  it('works without storage', () => {
    expect(loadSolved('/a/', 5, null)).toEqual([]);
    expect(saveSolved('/a/', [1], null)).toBe(false);
  });

  it('survives storage that throws', () => {
    expect(loadSolved('/a/', 5, throwing)).toEqual([]);
    expect(saveSolved('/a/', [1], throwing)).toBe(false);
  });

  it('falls back to the global storage, which Node lacks', () => {
    expect(loadSolved('/a/', 5)).toEqual([]);
  });
});

describe('scrambledOrder', () => {
  it('keeps the authored order when it is not the answer', () => {
    expect(scrambledOrder([2, 0, 1])).toEqual([0, 1, 2]);
  });

  it('reverses when the authored order is already the answer', () => {
    expect(scrambledOrder([0, 1, 2])).toEqual([2, 1, 0]);
  });
});
