import { describe, expect, it } from 'vitest';
import { sumParts } from '#lib/core/kid/place-value.js';
import { NUMBERS, allOpen, digitText, doneText, sumSoFar, tapNote } from './engine.js';

describe('tapping the digits', () => {
  it('says what a digit stands for', () => {
    expect(digitText(345, 'hundreds')).toBe('Chữ số 3 ở hàng trăm: 3 trăm là 300.');
    expect(digitText(345, 'tens')).toBe('Chữ số 4 ở hàng chục: 4 chục là 40.');
    expect(digitText(345, 'ones')).toBe('Chữ số 5 ở hàng đơn vị: 5 đơn vị là 5.');
  });

  it('explains that a zero digit has no part', () => {
    expect(digitText(408, 'tens')).toContain('không viết vào tổng');
  });

  it('fills the sum as the digits open', () => {
    expect(sumSoFar(345, [])).toBe('345 = ? + ? + ?');
    expect(sumSoFar(345, ['tens'])).toBe('345 = ? + 40 + ?');
    expect(sumSoFar(345, ['hundreds', 'tens', 'ones'])).toBe('345 = 300 + 40 + 5');
    expect(sumSoFar(408, ['hundreds', 'ones'])).toBe('408 = 400 + 8');
  });

  it('is done once every part that is not zero is open', () => {
    expect(allOpen(408, ['hundreds'])).toBe(false);
    expect(allOpen(408, ['hundreds', 'ones'])).toBe(true);
    expect(allOpen(345, ['hundreds', 'tens'])).toBe(false);
  });

  it('closes with the book sums', () => {
    expect(doneText(814)).toContain('814 = 800 + 10 + 4');
    expect(doneText(607)).toContain('607 = 600 + 7');
  });
});

describe('the line after a tap', () => {
  it('leads the child before the first tap', () => {
    expect(tapNote(408, [], null).tone).toBe('info');
  });

  it('explains a digit while the sum is open', () => {
    expect(tapNote(345, ['tens'], 'tens').text).toBe('Chữ số 4 ở hàng chục: 4 chục là 40.');
  });

  it('closes the sum once every part is open', () => {
    const note = tapNote(408, ['hundreds', 'ones'], 'ones');
    expect(note.tone).toBe('ok');
    expect(note.text).toBe(doneText(408));
  });

  it('still explains a zero digit tapped after the sum is finished', () => {
    const note = tapNote(408, ['hundreds', 'ones', 'tens'], 'tens');
    expect(note.tone).toBe('ok');
    expect(note.text).toContain('không viết vào tổng');
    expect(note.text).toContain('408 = 400 + 8');
  });
});

describe('the numbers to split', () => {
  it('adds back up to each number', () => {
    const bad = NUMBERS.filter((n) => sumParts(n).reduce((s, p) => s + p, 0) !== n);
    expect(bad).toEqual([]);
  });
});
