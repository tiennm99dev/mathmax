import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

  describe('frameLoop with animation frames', () => {
    /** @type {Map<number, FrameRequestCallback>} */
    let queue;
    let next = 0;
    let now = 0;
    const flush = () => {
      const due = [...queue.entries()];
      queue.clear();
      now += 16;
      for (const [, cb] of due) cb(now);
    };

    beforeEach(() => {
      queue = new Map();
      vi.stubGlobal('requestAnimationFrame', (/** @type {FrameRequestCallback} */ cb) => {
        queue.set(++next, cb);
        return next;
      });
      vi.stubGlobal('cancelAnimationFrame', (/** @type {number} */ id) => queue.delete(id));
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('reports elapsed seconds and stops from outside', () => {
      /** @type {number[]} */
      const ticks = [];
      const stop = frameLoop((dt) => ticks.push(dt));
      flush();
      flush();
      flush();
      expect(ticks).toEqual([0.016, 0.016]);
      stop();
      expect(queue.size).toBe(0);
    });

    it('stops when stop() is called from inside onTick', () => {
      let calls = 0;
      /** @type {() => void} */
      let stop = () => {};
      stop = frameLoop(() => {
        calls++;
        if (calls === 2) stop();
      });
      for (let i = 0; i < 6; i++) flush();
      expect(calls).toBe(2);
      expect(queue.size).toBe(0);
    });
  });
});
