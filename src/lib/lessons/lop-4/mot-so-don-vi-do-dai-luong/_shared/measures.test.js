import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import {
  centuryOf,
  centuryWhy,
  centuryYears,
  convertArea,
  durationText,
  massParts,
  massText,
  massTotal,
  roman,
} from './measures.js';

describe('mass', () => {
  it('splits kilograms into tấn, tạ, yến and kg and adds them back', () => {
    expect(massParts(1205)).toEqual({ tan: 1, ta: 2, yen: 0, kg: 5 });
    /** @type {number[]} */
    const bad = [];
    for (let kg = 0; kg <= 12000; kg += 7) if (massTotal(massParts(kg)) !== kg) bad.push(kg);
    expect(bad).toEqual([]);
  });

  it('writes a mass with the units that are not empty', () => {
    expect(massText(1205)).toBe('1 tấn 2 tạ 5 kg');
    expect(massText(350)).toBe('3 tạ 5 yến');
    expect(massText(0)).toBe('0 kg');
    expect(massText(12000)).toBe(`12 tấn`);
    expect(massTotal({ yen: 2, kg: 5 })).toBe(25);
  });
});

describe('area', () => {
  it('converts by a hundred between neighbouring units', () => {
    expect(convertArea(1, 'dm2', 'cm2')).toBe(100);
    expect(convertArea(1, 'm2', 'dm2')).toBe(100);
    expect(convertArea(1, 'cm2', 'mm2')).toBe(100);
    expect(convertArea(1, 'm2', 'cm2')).toBe(10000);
    expect(convertArea(500, 'cm2', 'dm2')).toBe(5);
    expect(convertArea(150, 'cm2', 'dm2')).toBeNull();
  });
});

describe('time', () => {
  it('writes seconds as minutes and seconds', () => {
    expect(durationText(125)).toBe('2 phút 5 giây');
    expect(durationText(120)).toBe('2 phút');
    expect(durationText(45)).toBe('45 giây');
  });

  it('writes Roman numerals', () => {
    expect([1, 4, 9, 14, 19, 20, 21, 39].map(roman)).toEqual([
      'I',
      'IV',
      'IX',
      'XIV',
      'XIX',
      'XX',
      'XXI',
      'XXXIX',
    ]);
    expect(() => roman(0)).toThrow();
  });

  it('puts each year in its century, the hundreds closing one', () => {
    expect([1, 100, 101, 1900, 1901, 2000, 2001, 2026].map(centuryOf)).toEqual([
      1, 1, 2, 19, 20, 20, 21, 21,
    ]);
    expect(centuryYears(21)).toEqual([2001, 2100]);
    expect(centuryWhy(1945)).toBe('Năm 1945 thuộc thế kỉ XX (từ năm 1901 đến năm 2000).');
    expect(centuryWhy(1945)).not.toContain(GROUP);
  });
});
