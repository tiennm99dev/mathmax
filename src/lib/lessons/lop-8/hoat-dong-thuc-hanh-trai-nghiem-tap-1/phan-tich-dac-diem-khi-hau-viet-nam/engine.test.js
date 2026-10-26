import { describe, expect, it } from 'vitest';
import { CITIES, cityOf, rainyMonths, seasonText, summary, valueText } from './engine.js';

describe('CITIES', () => {
  it('have twelve months of every quantity', () => {
    for (const c of CITIES) {
      expect(c.temp).toHaveLength(12);
      expect(c.rain).toHaveLength(12);
      expect(c.humid).toHaveLength(12);
    }
  });
});

describe('summary', () => {
  it('matches the numbers used in the lesson for Hà Nội', () => {
    const s = summary(cityOf('ha-noi'));
    expect(s.meanTemp).toBeCloseTo(23.658, 3);
    expect(s.tempRange).toBeCloseTo(12.8, 9);
    expect(s.hottest).toBe(7);
    expect(s.coldest).toBe(1);
    expect(s.totalRain).toBe(1676);
    expect(s.wettest).toBe(8);
    expect(s.rainy).toEqual([5, 6, 7, 8, 9, 10]);
    expect(s.season).toBe('tháng 5 đến tháng 10');
  });

  it('matches the numbers used in the lesson for Huế', () => {
    const s = summary(cityOf('hue'));
    expect(s.meanTemp).toBeCloseTo(25.167, 3);
    expect(s.tempRange).toBeCloseTo(9.4, 9);
    expect(s.totalRain).toBe(2831);
    expect(s.wettest).toBe(10);
    expect(s.rainy).toEqual([1, 9, 10, 11, 12]);
    expect(s.season).toBe('tháng 9 đến tháng 1');
  });

  it('matches the numbers used in the lesson for TP Hồ Chí Minh', () => {
    const s = summary(cityOf('tp-hcm'));
    expect(s.meanTemp).toBeCloseTo(27.075, 3);
    expect(s.tempRange).toBeCloseTo(3.2, 9);
    expect(s.hottest).toBe(4);
    expect(s.totalRain).toBe(1932);
    expect(s.wettest).toBe(9);
    expect(s.season).toBe('tháng 5 đến tháng 11');
  });
});

describe('seasonText', () => {
  it('handles empty, full and broken seasons', () => {
    expect(seasonText([])).toBe('không có');
    expect(seasonText(rainyMonths(Array(12).fill(150)))).toBe('cả năm');
    expect(seasonText([2, 5])).toBe('tháng 2, tháng 5');
  });
});

describe('valueText', () => {
  it('writes decimals with a comma and the unit', () => {
    expect(valueText(23.658, 'temp')).toBe('23,7 °C');
    expect(valueText(1676, 'rain')).toBe('1\u202f676 mm');
    expect(valueText(80, 'humid')).toBe('80%');
  });
});
