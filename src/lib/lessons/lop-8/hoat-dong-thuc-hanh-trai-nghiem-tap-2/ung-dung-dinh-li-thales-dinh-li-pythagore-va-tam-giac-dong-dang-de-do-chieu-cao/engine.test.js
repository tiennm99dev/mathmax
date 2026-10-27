import { describe, expect, it } from 'vitest';
import {
  alignDistance,
  heightFromShadow,
  riverLengths,
  shadowLength,
  sightHeight,
  toCm,
  widthByPythagoras,
  widthBySimilar,
} from './engine.js';

describe('shadows', () => {
  it('are as long as the object when the sun is at 45°', () => {
    expect(shadowLength(3, 45)).toBeCloseTo(3, 12);
  });

  it('give the tree height by proportion', () => {
    expect(heightFromShadow(1.5, 2, 12)).toBeCloseTo(9, 12);
    expect(heightFromShadow(1.6, 1.2, 36)).toBeCloseTo(48, 12);
  });

  it('recover the true height at any sun angle', () => {
    for (const angle of [30, 41, 65]) {
      const h = heightFromShadow(1.5, shadowLength(1.5, angle), shadowLength(9.6, angle));
      expect(h).toBeCloseTo(9.6, 9);
    }
  });
});

describe('sighting with a stake', () => {
  it('scales the stake by CT / CA', () => {
    expect(sightHeight(2, 3, 15)).toBeCloseTo(10, 12);
  });

  it('finds where the stake aligns with the tree top', () => {
    const ca = alignDistance(2, 10, 15);
    expect(ca).toBeCloseTo(3, 12);
    expect(sightHeight(2, ca, 15)).toBeCloseTo(10, 12);
  });
});

describe('river width', () => {
  it('matches the 30-40-50 triangle', () => {
    const r = riverLengths(40, 30);
    expect(r.bc).toBeCloseTo(50, 12);
    expect(r.ad).toBeCloseTo(24, 12);
    expect(r.cd).toBeCloseTo(18, 12);
    expect(r.bd).toBeCloseTo(32, 12);
    expect(r.ad ** 2 + r.cd ** 2).toBeCloseTo(30 ** 2, 9);
  });

  it('is found by both methods', () => {
    expect(widthByPythagoras(24, 18)).toBeCloseTo(40, 12);
    expect(widthBySimilar(24, 30, 18)).toBeCloseTo(40, 12);
    expect(widthByPythagoras(12, 9)).toBeCloseTo(20, 12);
    expect(widthBySimilar(12, 15, 9)).toBeCloseTo(20, 12);
  });

  it('stays close when measurements are rounded to the centimetre', () => {
    const r = riverLengths(36, 17);
    const ab = widthBySimilar(toCm(r.ad), 17, toCm(r.cd));
    expect(Math.abs(ab - 36)).toBeLessThan(0.05);
  });
});
