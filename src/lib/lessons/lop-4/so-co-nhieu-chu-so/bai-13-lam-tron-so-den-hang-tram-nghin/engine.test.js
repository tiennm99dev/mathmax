import { describe, expect, it } from 'vitest';
import { roundTo } from '../_shared/big-numbers.js';
import { QUIZ, STRETCHES, checkPick, marksAround, roundNote } from './engine.js';

/** Group spaces as plain spaces. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

describe('the marks', () => {
  it('finds the hundred thousands around a number', () => {
    expect(marksAround(3272353)).toEqual({ low: 3200000, high: 3300000 });
    expect(marksAround(900000)).toEqual({ low: 900000, high: 1000000 });
  });

  it('starts every stretch on a mark', () => {
    expect(STRETCHES.filter((s) => s % 100000 !== 0)).toEqual([]);
  });
});

describe('rounding on the line', () => {
  it('goes to the nearer mark and up from halfway', () => {
    expect(roundNote(3230000).target).toBe(3200000);
    expect(roundNote(3270000).target).toBe(3300000);
    expect(plain(roundNote(3250000).text)).toBe(
      '3 250 000 ở chính giữa 3 200 000 và 3 300 000. Chữ số hàng chục nghìn là 5, 5 = 5 nên làm tròn lên: làm tròn đến hàng trăm nghìn được 3 300 000.',
    );
    expect(plain(roundNote(3200000).text)).toContain('đã là số tròn trăm nghìn');
    expect(roundNote(960000).target).toBe(1000000);
  });

  it('accepts only the right mark in the quiz', () => {
    const bad = QUIZ.filter((n) => {
      const { low } = marksAround(n);
      const right = roundTo(n, 100000) === low ? 'low' : 'high';
      const wrong = right === 'low' ? 'high' : 'low';
      return !checkPick(n, right).ok || checkPick(n, wrong).ok;
    });
    expect(bad).toEqual([]);
    expect(checkPick(3121023, 'high').text).toContain('đó là 2');
  });
});
