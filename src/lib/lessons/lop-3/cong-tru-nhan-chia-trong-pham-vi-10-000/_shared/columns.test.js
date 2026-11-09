import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import {
  askFor,
  borrowLabel,
  carriesOf,
  checkText,
  columnWords,
  divText,
  divWords,
  drawColumn,
  drawDivision,
  equation,
  isDivKind,
  noCarry,
  planOf,
  resultOf,
  sheetAt,
  slipOptions,
  stepsOf,
  wrongFor,
} from './columns.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('reading a calculation the book way', () => {
  it('adds with two carries', () => {
    expect(plain(columnWords(3628, 4845, '+'))).toBe(
      '8 cộng 5 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7. 6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. Vậy 3 628 + 4 845 = 8 473.',
    );
  });

  it('adds a three-digit number', () => {
    expect(plain(columnWords(3847, 635, '+'))).toBe(
      '7 cộng 5 bằng 12, viết 2, nhớ 1. 4 cộng 3 bằng 7, thêm 1 bằng 8, viết 8. 8 cộng 6 bằng 14, viết 4, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 3 847 + 635 = 4 482.',
    );
    expect(stepsOf(3812, 135, '+')[3].say).toBe('Hạ 3, viết 3');
  });

  it('subtracts with borrowing', () => {
    expect(plain(columnWords(6378, 2549, '-'))).toBe(
      '8 không trừ được 9, lấy 18 trừ 9 bằng 9, viết 9, nhớ 1. 4 thêm 1 bằng 5, 7 trừ 5 bằng 2, viết 2. 3 không trừ được 5, lấy 13 trừ 5 bằng 8, viết 8, nhớ 1. 2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3. Vậy 6 378 − 2 549 = 3 829.',
    );
    expect(stepsOf(4628, 719, '-')[3].say).toBe('4 trừ 1 bằng 3, viết 3');
  });

  it('leaves a leading zero of a difference unwritten', () => {
    const steps = stepsOf(5624, 4718, '-');
    expect(steps[3].blank).toBe(true);
    expect(steps[3].say).toBe('4 thêm 1 bằng 5, 5 trừ 5 bằng 0, không cần viết');
    expect(planOf(5624, 4718, '-').filter((x) => x.type === 'digit')).toHaveLength(3);
  });

  it('multiplies with carries', () => {
    expect(plain(columnWords(1427, 3, '×'))).toBe(
      '3 nhân 7 bằng 21, viết 1, nhớ 2. 3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8. 3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4. Vậy 1 427 × 3 = 4 281.',
    );
    expect(carriesOf(2018, 4, '×')).toBe(1);
  });

  it('knows the forgotten-carry slip', () => {
    expect(noCarry(1456, 2738, '+')).toBe(3184);
    expect(noCarry(1234, 3, '×')).toBe(3692);
    expect(noCarry(4291, 3864, '-')).toBe(1437);
  });
});

describe('the board', () => {
  it('borrows, then shows the carried 1 beside the next column', () => {
    const plan = planOf(6378, 2549, '-');
    expect(plan.map((x) => x.type)).toEqual([
      'borrow',
      'digit',
      'digit',
      'borrow',
      'digit',
      'digit',
    ]);
    const sheet = sheetAt(6378, 2549, '-', 1);
    expect(sheet.borrowed[0]).toBe(true);
    expect(sheet.carries[1]).toBe(1);
    expect(sheet.active).toBe(0);
    expect(borrowLabel(plan[0].step)).toBe('Mượn 1 chục: 8 thành 18');
    expect(askFor(plan[0], '-')).toBe('Hàng đơn vị: 8 không trừ được 9. Em mượn 1 chục nhé.');
    expect(askFor(plan[2], '-')).toBe('Hàng chục: 4 thêm 1 bằng 5. 7 trừ 5. Em viết chữ số nào?');
  });

  it('writes every digit of a finished calculation', () => {
    const sheet = sheetAt(3628, 4845, '+', 4);
    expect(sheet.written.slice(0, 4).reverse().join('')).toBe('8473');
    expect(sheet.carries).toEqual([0, 1, 0, 1, 0]);
    expect(sheet.active).toBe(null);
    expect(sheet.finished).toBe(4);
  });

  it('nudges after a slip and shows the working after two', () => {
    const [, tens] = stepsOf(3628, 4845, '+');
    expect(wrongFor(tens, '+', 6, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    expect(wrongFor(tens, '+', 6, 2)).toContain('2 cộng 4 bằng 6, thêm 1 bằng 7');
    const [ones] = stepsOf(3628, 4845, '+');
    expect(wrongFor(ones, '+', 1, 1)).toContain('nhớ sang hàng chục');
    const sub = stepsOf(6378, 2549, '-')[1];
    expect(wrongFor(sub, '-', 3, 1)).toBe('Em quên thêm 1 đã nhớ vào 4 rồi.');
  });
});

describe('drawn calculations', () => {
  it('fit their kind and stay within 9 999', () => {
    const rand = rng(7);
    const bad = [];
    for (const op of /** @type {const} */ (['+', '-', '×'])) {
      for (const [kind, lo, hi] of /** @type {const} */ ([
        ['plain', 0, 0],
        ['one', 1, 1],
        ['many', 2, 3],
      ])) {
        for (let i = 0; i < 40; i++) {
          const { a, b } = drawColumn(rand, op, kind);
          const r = resultOf(a, b, op);
          const digits = sheetAt(a, b, op, planOf(a, b, op).length)
            .written.reverse()
            .join('');
          const c = carriesOf(a, b, op);
          if (r > 9999 || r < 0 || Number(digits) !== r || c < lo || c > hi) bad.push([op, a, b]);
          if (a < 1000) bad.push([op, a, b]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats the task just done', () => {
    const rand = rng(2);
    const not = drawColumn(rand, '+', 'one');
    const bad = [];
    for (let i = 0; i < 50; i++) {
      const next = drawColumn(rand, '+', 'one', not);
      if (next.a === not.a && next.b === not.b) bad.push(next);
    }
    expect(bad).toEqual([]);
  });
});

describe('dividing', () => {
  it('writes the sentence, the words and the check', () => {
    expect(plain(divText(2487, 2))).toBe('2 487 : 2 = 1 243 (dư 1)');
    expect(plain(divWords(1276, 4))).toBe(
      '12 chia 4 được 3, viết 3; 3 nhân 4 bằng 12; 12 trừ 12 bằng 0. Hạ 7, được 7. 7 chia 4 được 1, viết 1; 1 nhân 4 bằng 4; 7 trừ 4 bằng 3. Hạ 6, được 36. 36 chia 4 được 9, viết 9; 9 nhân 4 bằng 36; 36 trừ 36 bằng 0. Vậy 1 276 : 4 = 319.',
    );
    expect(plain(checkText(2487, 2))).toBe('Thử lại: 1 243 × 2 = 2 486, 2 486 + 1 = 2 487.');
  });

  it('draws divisions of each case', () => {
    const rand = rng(5);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero', 'two'])) {
      for (let i = 0; i < 40; i++) {
        const { n, d } = drawDivision(rand, kind);
        if (!isDivKind(n, d, kind) || n < 1000 || n > 9999) bad.push([kind, n, d]);
      }
    }
    expect(bad).toEqual([]);
    expect(isDivKind(6308, 7, 'two')).toBe(true);
    expect(isDivKind(6369, 3, 'exact')).toBe(true);
  });
});

describe('options', () => {
  it('keeps four different whole numbers with the right one', () => {
    const { options, answer } = slipOptions(4194, [3184, 4194, -3]);
    expect(new Set(options).size).toBe(4);
    expect(plain(options[answer])).toBe('4 194');
    expect(plain(equation(4252, 5284, '+'))).toBe('4 252 + 5 284 = 9 536');
  });
});
