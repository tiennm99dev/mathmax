import { describe, expect, it } from 'vitest';
import { TASKS, equation, nudge, resultOf, sheetRows, stepsOf } from './engine.js';

/** @typedef {import('./engine.js').Op} Op */

describe('column steps', () => {
  it('build the right result for every task, one digit per step', () => {
    const wrong = [];
    for (const op of /** @type {Op[]} */ (['+', '−', '×', ':'])) {
      for (const { a, b } of TASKS[op]) {
        const steps = stepsOf(op, a, b);
        const digits = steps.map((s) => s.digit);
        const written = op === ':' ? digits.join('') : digits.reverse().join('');
        const same = op === ':' || String(resultOf(op, a, b)).length === String(a).length;
        if (written !== String(resultOf(op, a, b)) || !same) wrong.push(`${a} ${op} ${b}`);
        if (steps.some((s) => s.digit < 0 || s.digit > 9)) wrong.push(`${a} ${op} ${b} digit`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('say each step the book way', () => {
    expect(stepsOf('+', 45637, 28485).map((s) => s.say)).toEqual([
      '7 cộng 5 bằng 12, viết 2, nhớ 1',
      '3 cộng 8 bằng 11, thêm 1 bằng 12, viết 2, nhớ 1',
      '6 cộng 4 bằng 10, thêm 1 bằng 11, viết 1, nhớ 1',
      '5 cộng 8 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1',
      '4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7',
    ]);
    expect(stepsOf('−', 9245, 3678)[0].say).toBe(
      '5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1',
    );
    expect(stepsOf('−', 9245, 3678)[1].say).toBe(
      '7 thêm 1 bằng 8; 4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1',
    );
    expect(stepsOf('×', 12345, 4)[1].say).toBe('4 nhân 4 bằng 16, thêm 2 bằng 18, viết 8, nhớ 1');
    expect(stepsOf(':', 25632, 4).map((s) => s.say)).toEqual([
      '25 chia 4 được 6, viết 6; 6 nhân 4 bằng 24; 25 trừ 24 bằng 1',
      'Hạ 6, được 16. 16 chia 4 được 4, viết 4; 4 nhân 4 bằng 16; 16 trừ 16 bằng 0',
      'Hạ 3, được 3. 3 chia 4 được 0, viết 0; 0 nhân 4 bằng 0; 3 trừ 0 bằng 3',
      'Hạ 2, được 32. 32 chia 4 được 8, viết 8; 8 nhân 4 bằng 32; 32 trừ 32 bằng 0',
    ]);
  });

  it('write the finished sentence with a remainder', () => {
    expect(equation(':', 47819, 6)).toBe('47 819 : 6 = 7 969 (dư 5)');
    expect(equation('×', 18207, 5)).toBe('18 207 × 5 = 91 035');
  });

  it('show the whole step after a second slip', () => {
    const step = stepsOf('+', 6718, 2451)[0];
    expect(nudge('+', step, 1)).not.toContain(String(step.digit));
    expect(nudge('+', step, 2)).toBe('Em làm thế này nhé: 8 cộng 1 bằng 9, viết 9.');
  });
});

describe('division sheet', () => {
  it('grows by a product and a rest per round', () => {
    expect(sheetRows(9648, 3, 0)).toEqual([{ cells: ['9', '6', '4', '8'], line: false }]);
    expect(sheetRows(9648, 3, 1)).toEqual([
      { cells: ['9', '6', '4', '8'], line: false },
      { cells: ['9', '', '', ''], line: true },
      { cells: ['0', '6', '', ''], line: false },
    ]);
    expect(sheetRows(47819, 6, 4)).toHaveLength(9);
  });
});
