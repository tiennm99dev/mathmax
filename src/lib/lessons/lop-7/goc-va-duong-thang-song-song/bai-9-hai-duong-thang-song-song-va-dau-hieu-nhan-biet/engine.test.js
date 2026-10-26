import { describe, it, expect } from 'vitest';
import { GAMMAS, LIMIT, freshBeta, pairStatus } from './engine.js';

describe('parallel-line tester', () => {
  it('reports equal pairs only when line b is parallel to a', () => {
    for (const g of GAMMAS) {
      for (const kind of /** @type {const} */ (['dong-vi', 'so-le-trong'])) {
        const count = kind === 'dong-vi' ? 4 : 2;
        for (let k = 0; k < count; k++) {
          for (let beta = -LIMIT; beta <= LIMIT; beta++) {
            expect(pairStatus(beta, g, kind, k).equal).toBe(beta === 0);
          }
        }
      }
    }
  });

  it('measures the alternate interior angles A1 and B3', () => {
    const s = pairStatus(10, 65, 'so-le-trong', 0);
    expect([s.i, s.j]).toEqual([1, 3]);
    expect(s.atA).toBe(115);
    expect(s.atB).toBe(125);
  });

  it('never starts parallel', () => {
    let seed = 0;
    const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let n = 0; n < 50; n++) {
      const b = freshBeta(rand);
      expect(b).not.toBe(0);
      expect(Math.abs(b)).toBeLessThanOrEqual(LIMIT);
    }
  });
});
