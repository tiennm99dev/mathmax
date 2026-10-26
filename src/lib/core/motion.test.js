import { describe, expect, it } from 'vitest';
import { frameLoop, reducedMotion, wrap } from './motion.js';

describe('motion helpers', () => {
  it('wraps a position into its field on both sides', () => {
    expect(wrap(5, 0, 10)).toBe(5);
    expect(wrap(12, 0, 10)).toBe(2);
    expect(wrap(-3, 0, 10)).toBe(7);
    expect(wrap(10, 0, 10)).toBe(0);
    expect(wrap(-25, -10, 10)).toBe(-5);
  });

  it('does nothing outside a browser', () => {
    expect(reducedMotion()).toBe(false);
    const stop = frameLoop(() => {
      throw new Error('no frames in Node');
    });
    expect(typeof stop).toBe('function');
    stop();
  });
});
