import { describe, it, expect } from 'vitest';
import {
  CARDS,
  MAX_COUNT,
  NUMBER_WORDS,
  compareTray,
  moveObject,
  nextTarget,
  trayMessage,
} from './engine.js';

describe('counting tray engine', () => {
  it('offers one card and one word for every number from 0 to 5', () => {
    expect(CARDS).toEqual([0, 1, 2, 3, 4, 5]);
    expect(NUMBER_WORDS).toHaveLength(MAX_COUNT + 1);
  });

  it('never repeats the previous target', () => {
    for (let prev = 0; prev <= MAX_COUNT; prev++) {
      for (const r of [0, 0.2, 0.5, 0.99]) {
        const next = nextTarget(prev, () => r);
        expect(next).not.toBe(prev);
        expect(CARDS).toContain(next);
      }
    }
  });

  it('can reach every number, including 0, on the first round', () => {
    const seen = new Set(CARDS.map((_, i) => nextTarget(null, () => i / CARDS.length)));
    expect([...seen].sort()).toEqual(CARDS);
  });

  it('stays in range even when random returns its upper edge', () => {
    expect(CARDS).toContain(nextTarget(3, () => 0.999999));
  });

  it('compares the tray with the target', () => {
    expect(compareTray(3, 3)).toBe('match');
    expect(compareTray(1, 4)).toBe('add');
    expect(compareTray(5, 2)).toBe('remove');
  });

  it('keeps the tray count between 0 and 5', () => {
    expect(moveObject(0, 'out')).toBe(0);
    expect(moveObject(5, 'in')).toBe(5);
    expect(moveObject(2, 'in')).toBe(3);
    expect(moveObject(2, 'out')).toBe(1);
  });

  it('tells the child how many to add or remove', () => {
    expect(trayMessage(1, 4, 'quả táo')).toContain('thêm 3 quả táo');
    expect(trayMessage(5, 2, 'con cá')).toContain('bớt ra 3 con cá');
    expect(trayMessage(4, 4, 'ngôi sao')).toContain('Đúng rồi');
    expect(trayMessage(0, 0, 'bông hoa')).toContain('số 0');
  });
});
