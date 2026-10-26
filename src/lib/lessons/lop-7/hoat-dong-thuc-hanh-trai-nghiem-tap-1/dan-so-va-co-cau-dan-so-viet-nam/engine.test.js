import { describe, it, expect } from 'vitest';
import {
  POPULATION,
  STRUCTURE,
  YEARS,
  centralAngle,
  forecastFeedback,
  growth,
  pieMatch,
  share,
  yearlyChanges,
} from './engine.js';

describe('data', () => {
  it('has one population figure per year, rising every year', () => {
    expect(POPULATION).toHaveLength(YEARS.length);
    expect(yearlyChanges().every((d) => d > 0)).toBe(true);
  });
  it('has structures whose two parts add up to 100 %', () => {
    for (const s of Object.values(STRUCTURE)) {
      expect(s.sex[0] + s.sex[1]).toBeCloseTo(100, 9);
      expect(s.residence[0] + s.residence[1]).toBeCloseTo(100, 9);
    }
  });
});

describe('arithmetic the activity asks for', () => {
  it('growth 2011 to 2020: 8,71 million, about 0,97 a year', () => {
    const g = growth(2011, 2020);
    expect(g.total).toBe(8.71);
    expect(g.years).toBe(9);
    expect(g.perYear).toBeCloseTo(0.9678, 4);
  });
  it('largest yearly rise is 2019 to 2020', () => {
    const d = yearlyChanges();
    expect(d).toEqual([1.03, 0.85, 0.96, 0.97, 0.96, 0.96, 0.95, 0.91, 1.12]);
    expect(YEARS[d.indexOf(Math.max(...d)) + 1]).toBe(2020);
  });
  it('urban and rural people in 2020', () => {
    expect(share(36.8, 97.58)).toBeCloseTo(35.909, 3);
    expect(share(63.2, 97.58)).toBeCloseTo(61.671, 3);
    expect(share(50.2, 97.58)).toBeCloseTo(48.985, 3);
  });
  it('central angles', () => {
    expect(centralAngle(36.8)).toBe(132.48);
    expect(centralAngle(63.2)).toBe(227.52);
    expect(centralAngle(34.4)).toBe(123.84);
    expect(centralAngle(49.8) + centralAngle(50.2)).toBeCloseTo(360, 9);
  });
});

describe('pieMatch', () => {
  it('accepts the table value and rejects 0,1 % off', () => {
    expect(pieMatch(36.8, 36.8).ok).toBe(true);
    expect(pieMatch(36.80000001, 36.8).ok).toBe(true);
    expect(pieMatch(36.9, 36.8)).toEqual({ gap: 0.1, ok: false });
  });
});

describe('forecastFeedback', () => {
  it('praises a close forecast and names the trend forecast', () => {
    const f = forecastFeedback(98.55);
    expect(f.near).toBe(true);
    expect(f.text).toContain('98,51');
    expect(f.text).toContain('98,55');
  });
  it('flags a far forecast', () => {
    expect(forecastFeedback(100).near).toBe(false);
  });
});
