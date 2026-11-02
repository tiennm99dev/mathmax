import { describe, expect, it } from 'vitest';
import { roundProblems } from '../_shared/table-round.js';
import { BASE, buildRound, digitsOf, divMessage, patternMessage } from './engine.js';

describe('the pattern of the table of 9', () => {
  it('has digits adding up to 9 on every row', () => {
    const bad = [];
    for (let n = 1; n <= 10; n++) {
      const { tens, ones } = digitsOf(n);
      if (tens + ones !== 9 || tens * 10 + ones !== BASE * n) bad.push(n);
    }
    expect(bad).toEqual([]);
    expect(digitsOf(1)).toEqual({ tens: 0, ones: 9 });
    expect(digitsOf(10)).toEqual({ tens: 9, ones: 0 });
  });

  it('says what a row shows', () => {
    expect(patternMessage(1)).toBe('9 × 1 = 9. Em coi 9 là 0 chục và 9 đơn vị: 0 + 9 = 9.');
    expect(patternMessage(3)).toContain('9 × 3 = 27. Hai chữ số: 2 + 7 = 9.');
  });

  it('says how many dots stay as the rows are ringed', () => {
    expect(divMessage(5, 0)).toBe('Có 45 chấm. Khoanh được mấy hàng, mỗi hàng 9 chấm?');
    expect(divMessage(5, 2)).toBe('Đã khoanh 2 hàng, còn 27 chấm.');
    expect(divMessage(5, 5)).toBe(
      'Hết chấm rồi! Khoanh được 5 hàng. Vì 9 × 5 = 45 nên 45 : 9 = 5.',
    );
  });
});

describe('the quiz round', () => {
  it('has the right answer among distinct options for every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      bad.push(
        ...roundProblems(
          round.filter((q) => q.kind !== 'pattern'),
          BASE,
        ),
      );
    }
    expect(bad).toEqual([]);
  });

  it('offers only one number of the table on the pattern question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = buildRound(seed).find((q) => q.kind === 'pattern');
      const inTable = (q?.options ?? []).filter((o) => Number(o) % BASE === 0 && Number(o) <= 90);
      if (inTable.length !== 1 || inTable[0] !== q?.options[q.answer]) bad.push([seed, q?.options]);
    }
    expect(bad).toEqual([]);
  });
});
