import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { midStatus, newLength } from './engine.js';

describe('midpoint of a segment', () => {
  it('lights up only at the midpoint', () => {
    expect(midStatus(56, 28)).toEqual({ ma: 28, mb: 28, isMid: true, nearer: null, gap: 0 });
    expect(midStatus(56, 20).isMid).toBe(false);
    expect(midStatus(56, 20).nearer).toBe('A');
    expect(midStatus(56, 20).gap).toBe(8);
    expect(midStatus(56, 40).nearer).toBe('B');
  });

  it('does not take a point of a zero segment for a midpoint', () => {
    expect(midStatus(0, 0).isMid).toBe(false);
  });

  it('draws even lengths in range that differ from the last one', () => {
    const r = rng(7);
    for (let k = 0; k < 300; k++) {
      const ab = newLength(r, 56);
      expect(ab % 2).toBe(0);
      expect(ab).toBeGreaterThanOrEqual(30);
      expect(ab).toBeLessThanOrEqual(100);
      expect(ab).not.toBe(56);
    }
  });
});
