import { describe, expect, it } from 'vitest';
import {
  axisFrom,
  experimentalProbability,
  frequencyTable,
  iconRow,
  interquartileRange,
  mean,
  median,
  modes,
  niceAxis,
  niceStep,
  percentages,
  pickWeighted,
  pieSlices,
  probabilities,
  quartiles,
  range,
  stdDev,
  sum,
  variance,
} from './index.js';

describe('descriptive statistics', () => {
  const sample = [7, 8, 5, 9, 8, 6, 8, 10];

  it('computes sum, mean, median, modes and range', () => {
    expect(sum(sample)).toBe(61);
    expect(mean(sample)).toBeCloseTo(7.625);
    expect(median(sample)).toBe(8);
    expect(median([3, 1, 2])).toBe(2);
    expect(modes(sample)).toEqual([8]);
    expect(modes([1, 2, 2, 1])).toEqual([1, 2]);
    expect(range(sample)).toBe(5);
  });

  it('uses the population variance', () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4);
    expect(stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });

  it('finds quartiles as medians of the halves', () => {
    // Odd n: the median 7 is left out of both halves.
    expect(quartiles([1, 3, 5, 7, 9, 11, 13])).toEqual([3, 7, 11]);
    // Even n: the halves split evenly.
    expect(quartiles([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([2.5, 4.5, 6.5]);
    expect(quartiles([4])).toEqual([4, 4, 4]);
    expect(interquartileRange([1, 2, 3, 4, 5, 6, 7, 8])).toBe(4);
  });

  it('refuses an empty sample', () => {
    expect(() => mean([])).toThrow();
    expect(() => median([])).toThrow();
  });
});

describe('frequency', () => {
  it('counts numbers in ascending order', () => {
    expect(frequencyTable([3, 1, 3, 2, 3])).toEqual([
      { value: 1, count: 1, relative: 0.2 },
      { value: 2, count: 1, relative: 0.2 },
      { value: 3, count: 3, relative: 0.6 },
    ]);
  });

  it('keeps first-appearance order for labels', () => {
    expect(frequencyTable(['táo', 'cam', 'táo']).map((r) => r.value)).toEqual(['táo', 'cam']);
  });

  it('rounds percentages so they add to 100', () => {
    expect(percentages([1, 1, 1])).toEqual([34, 33, 33]);
    expect(percentages([1, 2])).toEqual([33, 67]);
    expect(percentages([1, 1, 1], 1)).toEqual([33.4, 33.3, 33.3]);
    expect(percentages([0, 0])).toEqual([0, 0]);
    expect(percentages([2, 5, 7, 11]).reduce((s, p) => s + p, 0)).toBe(100);
  });

  it('lays pie slices clockwise and closes the circle', () => {
    const slices = pieSlices([1, 1, 2]);
    expect(slices).toEqual([
      { start: 0, end: 90, sweep: 90 },
      { start: 90, end: 180, sweep: 90 },
      { start: 180, end: 360, sweep: 180 },
    ]);
    expect(pieSlices([0, 0]).every((s) => s.sweep === 0)).toBe(true);
  });
});

describe('probability', () => {
  it('picks by cumulative weight', () => {
    const w = [1, 2, 1];
    expect(pickWeighted(w, 0)).toBe(0);
    expect(pickWeighted(w, 0.24)).toBe(0);
    expect(pickWeighted(w, 0.25)).toBe(1);
    expect(pickWeighted(w, 0.74)).toBe(1);
    expect(pickWeighted(w, 0.75)).toBe(2);
    expect(pickWeighted(w, 1)).toBe(2);
  });

  it('never picks a zero-weight outcome', () => {
    for (let r = 0; r <= 1; r += 0.01) expect(pickWeighted([0, 1, 0, 1, 0], r)).not.toBe(0);
    expect(pickWeighted([1, 0], 1)).toBe(0);
    expect(() => pickWeighted([0, 0], 0.5)).toThrow();
  });

  it('turns weights into probabilities', () => {
    expect(probabilities([1, 3])).toEqual([0.25, 0.75]);
    expect(experimentalProbability(3, 12)).toBe(0.25);
    expect(experimentalProbability(0, 0)).toBe(0);
  });
});

describe('axis ticks', () => {
  it('picks 1, 2 or 5 times a power of ten', () => {
    expect(niceStep(10, 5)).toBe(2);
    expect(niceStep(100, 4)).toBe(50);
    expect(niceStep(0.9, 3)).toBe(0.5);
    expect(niceStep(0)).toBe(1);
  });

  it('widens the axis to whole steps', () => {
    expect(niceAxis(0, 23)).toEqual({ min: 0, max: 25, step: 5, ticks: [0, 5, 10, 15, 20, 25] });
    expect(niceAxis(0, 0.3, 3).ticks).toEqual([0, 0.1, 0.2, 0.3]);
    expect(niceAxis(5, 5).ticks.length).toBeGreaterThan(1);
  });
});

describe('cut axis', () => {
  it('starts the axis at the base and tops it a round step above the data', () => {
    expect(axisFrom(0, 108)).toEqual({ top: 120, ticks: [0, 20, 40, 60, 80, 100, 120] });
    expect(axisFrom(90, 108)).toEqual({ top: 110, ticks: [90, 95, 100, 105, 110] });
  });
});

describe('picture chart rows', () => {
  it('splits a value into whole icons and part of one more', () => {
    expect(iconRow(35, 10)).toEqual({ whole: 3, part: 0.5 });
    expect(iconRow(12, 3)).toEqual({ whole: 4, part: 0 });
    expect(iconRow(17, 5)).toEqual({ whole: 3, part: 0.4 });
  });
});
