import { describe, it, expect } from 'vitest';
import { aimStatus, heightFrom, heightOk, metres, tanDeg, trueAngle } from './engine.js';

describe('clinometer height', () => {
  it('adds the eye height to d·tan α', () => {
    expect(tanDeg(45)).toBeCloseTo(1, 12);
    expect(heightFrom(20, 45, 1.5)).toBeCloseTo(21.5, 9);
    expect(heightFrom(30, 30, 1.5)).toBeCloseTo(1.5 + 10 * Math.sqrt(3), 9);
  });

  it('finds the angle that aims at the top, and tells high from low', () => {
    const a = trueAngle(21.5, 20, 1.5);
    expect(a).toBeCloseTo(45, 9);
    expect(aimStatus(45, 21.5, 20, 1.5)).toBe('hit');
    expect(aimStatus(45.5, 21.5, 20, 1.5)).toBe('high');
    expect(aimStatus(44.5, 21.5, 20, 1.5)).toBe('low');
  });

  it('accepts a typed height rounded to tenths', () => {
    // 1,5 + 30·tan 35° ≈ 22,506
    expect(heightOk(22.5, 30, 35, 1.5)).toBe(true);
    expect(heightOk(22.6, 30, 35, 1.5)).toBe(true);
    expect(heightOk(21, 30, 35, 1.5)).toBe(false);
    expect(heightOk(null, 30, 35, 1.5)).toBe(false);
    expect(metres(22.506)).toBe('22,5');
  });
});
