import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  EVENTS,
  MAX_ROLLS,
  addRolls,
  eventCount,
  faceCounts,
  roll,
  runningRatio,
  samplePoints,
  spread,
} from './engine.js';

const [six, even, aboveFour] = EVENTS;

describe('experimental probability of die events', () => {
  it('rolls faces from 1 to 6', () => {
    expect(roll(() => 0)).toBe(1);
    expect(roll(() => 0.999999)).toBe(6);
    const r = rng(3);
    const faces = addRolls([], 600, r);
    expect(new Set(faces).size).toBe(6);
  });

  it('counts the rolls that make each event happen', () => {
    const faces = [1, 6, 2, 5, 6, 3, 4, 4, 6, 2];
    expect(faceCounts(faces)).toEqual([1, 2, 1, 2, 1, 3]);
    expect(eventCount(faces, six)).toBe(3);
    expect(eventCount(faces, even)).toBe(7);
    expect(eventCount(faces, aboveFour)).toBe(4);
  });

  it('follows n(A)/n after every roll', () => {
    expect(runningRatio([6, 1, 6, 2], six)).toEqual([1, 0.5, 2 / 3, 0.5]);
  });

  it('never keeps more than the maximum number of rolls', () => {
    const r = rng(1);
    const faces = addRolls(addRolls([], MAX_ROLLS - 3, r), 100, r);
    expect(faces).toHaveLength(MAX_ROLLS);
  });

  it('settles as the number of rolls grows', () => {
    const faces = addRolls([], MAX_ROLLS, rng(2026));
    const ratios = runningRatio(faces, even);
    expect(spread(ratios.slice(0, 50), 40)).toBeGreaterThan(spread(ratios, 1000));
    expect(Math.abs(ratios[ratios.length - 1] - 0.5)).toBeLessThan(0.05);
  });

  it('samples a long run down to a few points, keeping both ends', () => {
    const ratios = Array.from({ length: 1000 }, (_, k) => k);
    const pts = samplePoints(ratios, 50);
    expect(pts).toHaveLength(50);
    expect(pts[0]).toEqual([1, 0]);
    expect(pts.at(-1)).toEqual([1000, 999]);
    expect(samplePoints([0.5, 1])).toEqual([
      [1, 0.5],
      [2, 1],
    ]);
  });
});
