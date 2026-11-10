import { describe, expect, it } from 'vitest';
import { centuryOf } from '../_shared/measures.js';
import {
  EVENTS,
  centuriesAround,
  centuryChoices,
  checkCentury,
  guessMessage,
  moveYear,
  placeInCentury,
  stopwatchReading,
} from './engine.js';

describe('the timeline', () => {
  it('keeps the year from 1 to 2100', () => {
    expect(moveYear(50, -100)).toBe(1);
    expect(moveYear(2050, 100)).toBe(2100);
    expect(moveYear(1945, 10)).toBe(1955);
  });

  it('shows five centuries with the year inside', () => {
    expect(centuriesAround(1945)).toEqual([17, 18, 19, 20, 21]);
    expect(centuriesAround(1500)).toEqual([13, 14, 15, 16, 17]);
    expect(centuriesAround(50)).toEqual([1, 2, 3, 4, 5]);
    expect(centuriesAround(2100)).toEqual([17, 18, 19, 20, 21]);
    expect(placeInCentury(1901)).toBe(0);
    expect(placeInCentury(2000)).toBe(1);
  });
});

describe('the century quiz', () => {
  it('offers the right century among its neighbours for every event', () => {
    const bad = EVENTS.filter((e) => {
      const { options, answer } = centuryChoices(e.year);
      return options[answer] !== centuryOf(e.year) || new Set(options).size !== 3;
    });
    expect(bad).toEqual([]);
    expect(centuryChoices(50)).toEqual({ options: [1, 2, 3], answer: 0 });
  });

  it('explains a right and a wrong pick', () => {
    expect(checkCentury(2000, 20).ok).toBe(true);
    expect(checkCentury(2000, 21).text).toContain('Thế kỉ XXI từ năm 2001 đến năm 2100');
    expect(checkCentury(1010, 11).text).toContain('năm 1010 thuộc thế kỉ XI');
  });
});

describe('the stopwatch', () => {
  it('reads minutes and seconds', () => {
    expect(stopwatchReading(65.7)).toEqual({ seconds: 65, face: '01:05', text: '1 phút 5 giây' });
    expect(stopwatchReading(9.99).face).toBe('00:09');
  });

  it('judges a guess', () => {
    expect(guessMessage(10, 10.2)).toContain('đúng 10 giây');
    expect(guessMessage(10, 12)).toContain('chậm hơn 2 giây');
    expect(guessMessage(10, 4)).toContain('sớm hơn 6 giây');
  });
});
