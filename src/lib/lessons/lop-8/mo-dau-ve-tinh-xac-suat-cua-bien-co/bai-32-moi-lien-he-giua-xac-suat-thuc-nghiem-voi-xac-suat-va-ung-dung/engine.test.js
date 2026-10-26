import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { MAX_TRIALS, addTrials, emptyRun, estimate, samplePath } from './engine.js';

describe('repeated trials', () => {
  it('counts the times the event happens', () => {
    const seq = [0.1, 0.9, 0.2, 0.8];
    let i = 0;
    const run = addTrials(emptyRun(), 4, 0.5, () => seq[i++]);
    expect(run).toEqual({ n: 4, k: 2, path: [1, 0.5, 2 / 3, 0.5] });
  });

  it('gets close to the probability over many trials', () => {
    const rand = rng(11);
    const run = addTrials(emptyRun(), MAX_TRIALS, 1 / 6, rand);
    expect(run.n).toBe(MAX_TRIALS);
    expect(Math.abs(run.k / run.n - 1 / 6)).toBeLessThan(0.02);
    expect(addTrials(run, 10, 0.5, rand).n).toBe(MAX_TRIALS);
  });

  it('samples the path evenly and keeps the last point', () => {
    expect(samplePath([], 5)).toEqual([]);
    expect(samplePath([1, 0.5], 5)).toEqual([
      [1, 1],
      [2, 0.5],
    ]);
    const path = Array.from({ length: 1000 }, (_, i) => i);
    const pts = samplePath(path, 11);
    expect(pts).toHaveLength(11);
    expect(pts[0]).toEqual([1, 0]);
    expect(pts.at(-1)).toEqual([1000, 999]);
  });

  it('estimates a count from the experimental probability', () => {
    expect(estimate(20, 36, 100)).toBe(7);
    expect(estimate(1000, 3, 100)).toBe(30);
    expect(estimate(20, 0, 0)).toBe(0);
  });
});
