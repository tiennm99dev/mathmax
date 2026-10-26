import { describe, it, expect } from 'vitest';
import { TILT, meetLine, parallelPair, record, transversalDir } from './engine.js';

const M = { x: 200, y: 95 };

describe('lines through a point outside a line', () => {
  it('meets the line for every tilt except 0°', () => {
    for (let phi = -TILT; phi <= TILT; phi++) {
      const r = meetLine(M, 235, phi);
      expect(r.parallel).toBe(phi === 0);
    }
  });

  it('meets far away for a small tilt and at the foot for a steep one', () => {
    const near = meetLine(M, 235, 80);
    const far = meetLine(M, 235, 1);
    if (near.parallel || far.parallel) throw new Error('should meet');
    expect(near.dist).toBeCloseTo(140 / Math.tan((80 * Math.PI) / 180));
    expect(far.dist).toBeGreaterThan(8000);
    // A line tilted up to the right meets a (below M) on the left.
    expect(far.N.x).toBeLessThan(M.x);
    expect(far.N.y).toBeCloseTo(235);
  });

  it('records each tilt once, in order', () => {
    expect(record(record(record([], 20), -5), 20)).toEqual([-5, 20]);
  });
});

describe('transversal across two parallel lines', () => {
  it('folds and clamps its direction', () => {
    expect(transversalDir(70, 40, 140)).toBe(70);
    expect(transversalDir(250, 40, 140)).toBe(70);
    expect(transversalDir(10, 40, 140)).toBe(40);
  });

  it('gives equal corresponding and alternate angles, supplementary co-interior ones', () => {
    for (let g = 40; g <= 140; g++) {
      for (let k = 0; k < 4; k++) {
        const s = parallelPair(g, 'dong-vi', k);
        expect(s.atA).toBe(s.atB);
      }
      for (let k = 0; k < 2; k++) {
        const s = parallelPair(g, 'so-le-trong', k);
        expect(s.atA).toBe(s.atB);
        expect(parallelPair(g, 'trong-cung-phia', k).sum).toBe(180);
      }
    }
  });
});
