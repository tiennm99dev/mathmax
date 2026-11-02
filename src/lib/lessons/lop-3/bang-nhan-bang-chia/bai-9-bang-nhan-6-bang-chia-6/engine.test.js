import { describe, expect, it } from 'vitest';
import { roundProblems } from '../_shared/table-round.js';
import { BASE, backwardsMessage, buildRound, divMessage, mulMessage } from './engine.js';

describe('the table of 6 on a grid of dots', () => {
  it('says what each number of rows shows, forwards and backwards', () => {
    expect(mulMessage(1)).toBe('1 hàng, mỗi hàng 6 chấm. 6 × 1 = 6.');
    expect(mulMessage(4)).toBe('4 hàng, mỗi hàng 6 chấm. 6 + 6 + 6 + 6 = 24. 6 × 4 = 24.');
    expect(mulMessage(10)).toContain('54, 60');
    expect(backwardsMessage(4)).toBe(
      'Đọc ngược lại: 24 chấm, mỗi hàng 6 chấm, được 4 hàng. 24 : 6 = 4.',
    );
  });

  it('says how many dots stay as the rows are ringed', () => {
    expect(divMessage(4, 0)).toBe('Có 24 chấm. Khoanh được mấy hàng, mỗi hàng 6 chấm?');
    expect(divMessage(4, 1)).toBe('Đã khoanh 1 hàng, còn 18 chấm.');
    expect(divMessage(4, 4)).toBe(
      'Hết chấm rồi! Khoanh được 4 hàng. Vì 6 × 4 = 24 nên 24 : 6 = 4.',
    );
  });
});

describe('the quiz round', () => {
  it('has the right answer among distinct options for every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) bad.push(...roundProblems(buildRound(seed), BASE));
    expect(bad).toEqual([]);
  });
});
