import { describe, expect, it } from 'vitest';
import { ROUNDS, answers, digitInfo, groups, question, tapNote } from './engine.js';

/** Group spaces as plain spaces. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

describe('places and classes', () => {
  it('groups digits by class from the left', () => {
    expect(groups(653720)).toEqual([
      {
        cls: 1,
        digits: [
          { digit: 6, exp: 5 },
          { digit: 5, exp: 4 },
          { digit: 3, exp: 3 },
        ],
      },
      {
        cls: 0,
        digits: [
          { digit: 7, exp: 2 },
          { digit: 2, exp: 1 },
          { digit: 0, exp: 0 },
        ],
      },
    ]);
    expect(groups(45123).map((g) => g.digits.length)).toEqual([2, 3]);
  });

  it('tells the place, class and value of a digit', () => {
    expect(plain(digitInfo(653720, 4))).toBe(
      'Chữ số 5 ở hàng chục nghìn, thuộc lớp nghìn. Giá trị của chữ số 5 là 50 000.',
    );
    expect(digitInfo(653720, 0)).toContain('hàng đơn vị, thuộc lớp đơn vị');
  });
});

describe('the rounds', () => {
  it('has exactly one right digit for every place or value round', () => {
    const bad = ROUNDS.filter((r) => {
      const right = [0, 1, 2, 3, 4, 5].filter((exp) => answers(r, exp));
      return r.ask === 'class' ? right.length !== 3 : right.length !== 1;
    });
    expect(bad).toEqual([]);
  });

  it('asks and answers the book way', () => {
    expect(question(ROUNDS[0])).toBe('Em chạm chữ số ở hàng chục nghìn.');
    expect(tapNote(ROUNDS[0], 4).tone).toBe('ok');
    expect(tapNote(ROUNDS[0], 3).tone).toBe('warn');
    expect(answers(ROUNDS[1], 1)).toBe(true);
    expect(answers(ROUNDS[1], 4)).toBe(false);
    expect(answers(ROUNDS[0], 6)).toBe(false);
  });
});
