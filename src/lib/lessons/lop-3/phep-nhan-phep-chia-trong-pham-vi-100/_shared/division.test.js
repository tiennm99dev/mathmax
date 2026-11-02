import { describe, expect, it } from 'vitest';
import { cells, divText, oneStepRows } from './division.js';

describe('a division written the book’s way', () => {
  it('writes the remainder only when there is one', () => {
    expect(divText(8, 2)).toBe('8 : 2 = 4');
    expect(divText(9, 2)).toBe('9 : 2 = 4 (dư 1)');
    expect(divText(34, 6)).toBe('34 : 6 = 5 (dư 4)');
  });

  it('puts each digit in its column', () => {
    expect(cells(7)).toEqual({ t: '', o: '7' });
    expect(cells(34)).toEqual({ t: '3', o: '4' });
  });

  it('sets out one step: dividend, what was shared, what is left', () => {
    expect(oneStepRows(34, 6)).toEqual([
      { t: '3', o: '4' },
      { t: '3', o: '0', line: true },
      { t: '', o: '4' },
    ]);
  });
});
