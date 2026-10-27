import { describe, expect, it } from 'vitest';
import {
  angleAtC,
  distanceAcross,
  distanceFromDepression,
  elevationFromReading,
  elevationTo,
  heightFrom,
  plumbReading,
  roundTo,
  twoPoint,
} from './engine.js';

describe('clinometer reading', () => {
  it('reads 90° − α on the scale counted from the eye end', () => {
    expect(plumbReading(35)).toBe(55);
    expect(elevationFromReading(62)).toBe(28);
    expect(elevationFromReading(plumbReading(17))).toBe(17);
  });
});

describe('heights from an angle of elevation', () => {
  it('adds the clinometer height to d · tan α', () => {
    expect(roundTo(heightFrom(15, 35, 1.5), 1)).toBe(12);
    expect(roundTo(heightFrom(20, 40, 1.6), 1)).toBe(18.4);
    expect(roundTo(heightFrom(12, 32, 1.5), 1)).toBe(9);
  });

  it('is undone by the true elevation', () => {
    expect(elevationTo(13.5, 12, 1.5)).toBeCloseTo(45, 10);
    expect(heightFrom(23, elevationTo(12.4, 23, 1.5), 1.5)).toBeCloseTo(12.4, 10);
  });
});

describe('distances that cannot be walked', () => {
  it('crosses the river with AC · tan C', () => {
    expect(roundTo(distanceAcross(30, 40), 1)).toBe(25.2);
    expect(roundTo(distanceAcross(25, 50), 1)).toBe(29.8);
    expect(distanceAcross(18, angleAtC(26, 18))).toBeCloseTo(26, 10);
  });

  it('uses two observation points', () => {
    const a = twoPoint(20, 30, 45, 1.5);
    expect(a.near).toBeCloseTo(10 * (Math.sqrt(3) + 1), 10);
    expect(roundTo(a.height, 1)).toBe(28.8);
    expect(roundTo(twoPoint(15, 35, 50, 1.5).height, 1)).toBe(27);
  });

  it('turns an angle of depression into a distance', () => {
    expect(roundTo(distanceFromDepression(30, 20), 1)).toBe(82.4);
  });
});
