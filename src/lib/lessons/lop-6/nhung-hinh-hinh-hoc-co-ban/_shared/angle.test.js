import { describe, it, expect } from 'vitest';
import { along, ccwSides, measure } from '#lib/core/visuals/angle-math.js';
import { clockAngle, directionTo, kindOf, placeOf } from './angle.js';

const O = { x: 200, y: 150 };

describe('angle helpers', () => {
  it('measures the smaller turn between two rays', () => {
    expect(measure(0, 60)).toBe(60);
    expect(measure(60, 0)).toBe(60);
    expect(measure(350, 20)).toBe(30);
    expect(measure(0, 180)).toBe(180);
    expect(measure(10, 300)).toBe(70);
  });

  it('classifies by measure', () => {
    expect(kindOf(45)).toBe('nhon');
    expect(kindOf(90)).toBe('vuong');
    expect(kindOf(91)).toBe('tu');
    expect(kindOf(180)).toBe('bet');
  });

  it('reads directions back from points', () => {
    for (const d of [0, 37, 90, 135, 180, 270, 359]) {
      expect(directionTo(O, along(O, 100, d))).toBe(d);
    }
  });

  it('tells inside, outside, sides and vertex apart', () => {
    expect(placeOf(O, 0, 90, along(O, 80, 45))).toBe('trong');
    expect(placeOf(O, 0, 90, along(O, 80, 135))).toBe('ngoai');
    expect(placeOf(O, 0, 90, along(O, 80, 300))).toBe('ngoai');
    expect(placeOf(O, 0, 90, along(O, 80, 0))).toBe('canh-x');
    expect(placeOf(O, 0, 90, along(O, 80, 90))).toBe('canh-y');
    expect(placeOf(O, 0, 90, O)).toBe('dinh');
    // A point on the line of Ox but behind O is not on the side Ox.
    expect(placeOf(O, 0, 90, along(O, 80, 180))).toBe('ngoai');
  });

  it('handles angles that cross the 0° direction and reflex turns', () => {
    expect(placeOf(O, 330, 30, along(O, 80, 0))).toBe('trong');
    expect(placeOf(O, 330, 30, along(O, 80, 180))).toBe('ngoai');
    expect(placeOf(O, 30, 330, along(O, 80, 0))).toBe('trong');
    expect(placeOf(O, 100, 300, along(O, 80, 200))).toBe('ngoai');
    expect(placeOf(O, 100, 300, along(O, 80, 20))).toBe('trong');
  });

  it('gives a straight angle no interior point', () => {
    expect(placeOf(O, 0, 180, along(O, 80, 90))).toBe('bet');
    expect(placeOf(O, 0, 0, along(O, 80, 90))).toBe('trung');
  });

  it('finds clock angles at whole hours', () => {
    expect(clockAngle(3)).toBe(90);
    expect(clockAngle(2)).toBe(60);
    expect(clockAngle(5)).toBe(150);
    expect(clockAngle(6)).toBe(180);
    expect(clockAngle(9)).toBe(90);
    expect(clockAngle(10)).toBe(60);
    expect(clockAngle(12)).toBe(0);
  });
});

describe('angle drawing', () => {
  it('orders the sides along the smaller turn', () => {
    expect(ccwSides(10, 100)).toEqual({ from: 10, to: 100, sweep: 90 });
    expect(ccwSides(100, 10)).toEqual({ from: 10, to: 100, sweep: 90 });
    expect(ccwSides(300, 20)).toEqual({ from: 300, to: 20, sweep: 80 });
    expect(ccwSides(0, 180).sweep).toBe(180);
  });
});
