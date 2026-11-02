import { describe, expect, it } from 'vitest';
import { roundProblems } from '../_shared/table-round.js';
import { BASE, buildRound, calendarRows, divMessage, mulMessage } from './engine.js';

describe('the table of 7 on a calendar', () => {
  it('ends every week on a product of the table', () => {
    expect(calendarRows(2)).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
    ]);
    expect(calendarRows(10).map((week) => week.at(-1))).toEqual([
      7, 14, 21, 28, 35, 42, 49, 56, 63, 70,
    ]);
  });

  it('says what each number of weeks shows', () => {
    expect(mulMessage(1)).toBe('1 tuần có 7 ngày. 7 × 1 = 7.');
    expect(mulMessage(4)).toBe('4 tuần có 28 ngày. 7 + 7 + 7 + 7 = 28. 7 × 4 = 28.');
    expect(mulMessage(10)).toContain('63, 70');
  });

  it('says how many days stay as the weeks are ringed', () => {
    expect(divMessage(3, 0)).toBe('Có 21 ngày. 21 ngày là mấy tuần?');
    expect(divMessage(3, 1)).toBe('Đã khoanh 1 tuần, còn 14 ngày.');
    expect(divMessage(3, 3)).toBe('Hết ngày rồi! 21 ngày là 3 tuần. Vì 7 × 3 = 21 nên 21 : 7 = 3.');
  });
});

describe('the quiz round', () => {
  it('has the right answer among distinct options for every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) bad.push(...roundProblems(buildRound(seed), BASE));
    expect(bad).toEqual([]);
  });
});
