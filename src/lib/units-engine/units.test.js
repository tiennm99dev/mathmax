import { describe, expect, it } from 'vitest';
import {
  UNITS,
  breakdown,
  convert,
  dragHourHand,
  dragMinuteHand,
  formatDigital,
  formatNumber,
  formatTime,
  formatVnd,
  fromMinutes,
  handAngles,
  joinMixed,
  parseNumber,
  quantityOf,
  ratio,
  splitMixed,
  toMinutes,
  totalOf,
} from './index.js';

describe('unit table', () => {
  it('lists every quantity from smallest to largest with unique ids', () => {
    const ids = Object.values(UNITS).flatMap((list) => list.map((u) => u.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const list of Object.values(UNITS)) {
      for (let i = 1; i < list.length; i++) {
        expect(list[i].factor).toBeGreaterThan(list[i - 1].factor);
      }
    }
  });

  it('knows which quantity a unit measures', () => {
    expect(quantityOf('kg')).toBe('mass');
    expect(() => quantityOf('ft')).toThrow();
  });
});

describe('convert', () => {
  it('converts length, mass and capacity by powers of ten', () => {
    expect(convert(3, 'm', 'cm')).toBe(300);
    expect(convert(25, 'mm', 'cm')).toBe(2.5);
    expect(convert(1.2, 'km', 'm')).toBe(1200);
    expect(convert(3, 'yen', 'kg')).toBe(30);
    expect(convert(2, 'tan', 'ta')).toBe(20);
    expect(convert(1500, 'ml', 'l')).toBe(1.5);
  });

  it('avoids binary noise', () => {
    expect(convert(0.3, 'm', 'dm')).toBe(3);
    expect(convert(0.1 + 0.2, 'l', 'ml')).toBe(300);
  });

  it('converts time and money', () => {
    expect(convert(2, 'h', 'min')).toBe(120);
    expect(convert(90, 's', 'min')).toBe(1.5);
    expect(convert(1, 'century', 'year')).toBe(100);
    expect(convert(3, 'week', 'day')).toBe(21);
    expect(convert(25_000, 'dong', 'nghin-dong')).toBe(25);
  });

  it('refuses to mix quantities', () => {
    expect(() => convert(1, 'm', 'kg')).toThrow();
  });

  it('gives the ladder ratio', () => {
    expect(ratio('m', 'dm')).toBe(10);
    expect(ratio('h', 'min')).toBe(60);
    expect(ratio('day', 'h')).toBe(24);
  });
});

describe('mixed units', () => {
  it('splits into whole parts, largest first', () => {
    expect(splitMixed(135, 'min', ['min', 'h'])).toEqual([
      { unit: 'h', value: 2 },
      { unit: 'min', value: 15 },
    ]);
    expect(splitMixed(2.35, 'm', ['m', 'cm'])).toEqual([
      { unit: 'm', value: 2 },
      { unit: 'cm', value: 35 },
    ]);
    expect(splitMixed(3725, 's', ['h', 'min', 's'])).toEqual([
      { unit: 'h', value: 1 },
      { unit: 'min', value: 2 },
      { unit: 's', value: 5 },
    ]);
  });

  it('keeps a remainder in the smallest unit', () => {
    expect(splitMixed(2.355, 'm', ['m', 'cm'])).toEqual([
      { unit: 'm', value: 2 },
      { unit: 'cm', value: 35.5 },
    ]);
  });

  it('joins parts back', () => {
    expect(
      joinMixed(
        [
          { unit: 'h', value: 2 },
          { unit: 'min', value: 15 },
        ],
        'min',
      ),
    ).toBe(135);
    expect(
      joinMixed(
        [
          { unit: 'kg', value: 3 },
          { unit: 'g', value: 50 },
        ],
        'kg',
      ),
    ).toBe(3.05);
  });
});

describe('money', () => {
  it('pays with the fewest notes', () => {
    expect(breakdown(78_500)).toEqual({
      notes: [
        { value: 50_000, count: 1 },
        { value: 20_000, count: 1 },
        { value: 5000, count: 1 },
        { value: 2000, count: 1 },
        { value: 1000, count: 1 },
        { value: 500, count: 1 },
      ],
      rest: 0,
    });
    expect(breakdown(40_000).notes).toEqual([{ value: 20_000, count: 2 }]);
  });

  it('reports what no note covers', () => {
    const b = breakdown(1050);
    expect(b.rest).toBe(50);
    expect(totalOf(b.notes) + b.rest).toBe(1050);
  });

  it('rejects fractional amounts', () => {
    expect(() => breakdown(10.5)).toThrow();
  });
});

describe('clock', () => {
  it('round-trips hours and minutes', () => {
    expect(fromMinutes(toMinutes(7, 15))).toEqual({ hours: 7, minutes: 15 });
    expect(toMinutes(24, 5)).toBe(5);
    expect(fromMinutes(-10)).toEqual({ hours: 23, minutes: 50 });
  });

  it('places the hands', () => {
    expect(handAngles(toMinutes(3, 0))).toEqual({ hour: 90, minute: 0 });
    expect(handAngles(toMinutes(15, 30))).toEqual({ hour: 105, minute: 180 });
  });

  it('snaps the minute hand and carries across 12', () => {
    expect(dragMinuteHand(toMinutes(7, 10), 92, 5)).toBe(toMinutes(7, 15));
    // Forward through 12: 7:55 → 8:00.
    expect(dragMinuteHand(toMinutes(7, 55), 2, 5)).toBe(toMinutes(8, 0));
    // Backward through 12: 8:05 → 7:55.
    expect(dragMinuteHand(toMinutes(8, 5), 330, 5)).toBe(toMinutes(7, 55));
    // Past midnight: 23:58 → 0:01.
    expect(dragMinuteHand(toMinutes(23, 58), 6, 1)).toBe(toMinutes(0, 1));
  });

  it('sets the hour hand within the same half of the day', () => {
    expect(dragHourHand(toMinutes(7, 20), 90)).toBe(toMinutes(3, 20));
    expect(dragHourHand(toMinutes(19, 20), 95)).toBe(toMinutes(15, 20));
  });

  it('reads the time aloud and digitally', () => {
    expect(formatTime(toMinutes(7, 15))).toBe('7 giờ 15 phút');
    expect(formatTime(toMinutes(9, 0))).toBe('9 giờ');
    expect(formatTime(toMinutes(19, 30), { twelveHour: true })).toBe('7 giờ 30 phút tối');
    expect(formatTime(toMinutes(0, 0), { twelveHour: true })).toBe('12 giờ sáng');
    expect(formatDigital(toMinutes(7, 5))).toBe('07:05');
  });
});

describe('number format', () => {
  it('groups thousands with dots and uses a decimal comma', () => {
    expect(formatNumber(12_345.5)).toBe('12.345,5');
    expect(formatNumber(1_000_000)).toBe('1.000.000');
    expect(formatNumber(-0.25)).toBe('−0,25');
    expect(formatNumber(2 / 3, 2)).toBe('0,67');
    expect(formatVnd(50_000)).toBe('50.000 đồng');
  });

  it('parses Vietnamese and English input', () => {
    expect(parseNumber('2,5')).toBe(2.5);
    expect(parseNumber('2.5')).toBe(2.5);
    expect(parseNumber('1.000')).toBe(1000);
    expect(parseNumber('1.250,75')).toBe(1250.75);
    expect(parseNumber(' 12 ')).toBe(12);
    expect(Number.isNaN(parseNumber('abc'))).toBe(true);
    expect(Number.isNaN(parseNumber(''))).toBe(true);
  });
});
