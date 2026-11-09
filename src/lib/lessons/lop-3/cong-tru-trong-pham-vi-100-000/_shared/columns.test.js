import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import {
  askFor,
  borrowLabel,
  carriesOf,
  columnWords,
  drawColumn,
  equation,
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

describe('reading a five-digit calculation the book way', () => {
  it('adds with a carry in every column', () => {
    expect(plain(columnWords(45637, 28485, '+'))).toBe(
      '7 cộng 5 bằng 12, viết 2, nhớ 1. 3 cộng 8 bằng 11, thêm 1 bằng 12, viết 2, nhớ 1. 6 cộng 4 bằng 10, thêm 1 bằng 11, viết 1, nhớ 1. 5 cộng 8 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7. Vậy 45 637 + 28 485 = 74 122.',
    );
    expect(carriesOf(45637, 28485, '+')).toBe(4);
  });

  it('adds a four-digit number', () => {
    expect(stepsOf(45216, 7395, '+')[4].say).toBe('4 thêm 1 bằng 5, viết 5');
    expect(stepsOf(41216, 7352, '+')[4].say).toBe('Hạ 4, viết 4');
  });

  it('subtracts with borrowing', () => {
    expect(plain(columnWords(23285, 12967, '-'))).toBe(
      '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 6 thêm 1 bằng 7, 8 trừ 7 bằng 1, viết 1. 2 không trừ được 9, lấy 12 trừ 9 bằng 3, viết 3, nhớ 1. 2 thêm 1 bằng 3, 3 trừ 3 bằng 0, viết 0. 2 trừ 1 bằng 1, viết 1. Vậy 23 285 − 12 967 = 10 318.',
    );
    expect(stepsOf(60254, 8317, '-')[4].say).toBe('6 trừ 1 bằng 5, viết 5');
  });

  it('leaves leading zeros of a difference unwritten', () => {
    const steps = stepsOf(52346, 51819, '-');
    expect(steps[3].blank).toBe(true);
    expect(steps[4].say).toBe('5 trừ 5 bằng 0, không cần viết');
    expect(planOf(52346, 51819, '-').filter((x) => x.type === 'digit')).toHaveLength(3);
  });

  it('knows the forgotten-carry slip', () => {
    expect(noCarry(45637, 28485, '+')).toBe(63012);
    expect(noCarry(72146, 35258, '-')).toBe(47998);
  });
});

describe('the board', () => {
  it('borrows, then shows the carried 1 beside the next column', () => {
    const plan = planOf(23285, 12967, '-');
    expect(plan.map((x) => x.type)).toEqual([
      'borrow',
      'digit',
      'digit',
      'borrow',
      'digit',
      'digit',
      'digit',
    ]);
    const sheet = sheetAt(23285, 12967, '-', 1);
    expect(sheet.borrowed[0]).toBe(true);
    expect(sheet.carries[1]).toBe(1);
    expect(borrowLabel(plan[3].step)).toBe('Mượn 1 nghìn: 2 thành 12');
    expect(askFor(plan[0], '-')).toBe('Hàng đơn vị: 5 không trừ được 7. Em mượn 1 chục nhé.');
    expect(askFor(plan[2], '-')).toBe('Hàng chục: 6 thêm 1 bằng 7. 8 trừ 7. Em viết chữ số nào?');
    expect(askFor(plan[5], '-')).toBe('Hàng nghìn: 2 thêm 1 bằng 3. 3 trừ 3. Em viết chữ số nào?');
  });

  it('borrows from the ten thousands', () => {
    const plan = planOf(72146, 35258, '-');
    const last = plan.filter((x) => x.type === 'borrow').at(-1);
    expect(last && borrowLabel(last.step)).toBe('Mượn 1 chục nghìn: 2 thành 12');
  });

  it('writes every digit of a finished calculation', () => {
    const sheet = sheetAt(45637, 28485, '+', 5);
    expect(sheet.written.slice(0, 5).reverse().join('')).toBe('74122');
    expect(sheet.carries).toEqual([0, 1, 1, 1, 1, 0]);
    expect(sheet.active).toBe(null);
    expect(sheet.finished).toBe(5);
  });

  it('nudges after a slip and shows the working after two', () => {
    const [ones, tens] = stepsOf(45637, 28485, '+');
    expect(wrongFor(ones, '+', 1, 1)).toBe(
      'Số 1 là số em nhớ sang hàng chục. Ở hàng này em viết chữ số khác.',
    );
    expect(wrongFor(tens, '+', 1, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    expect(wrongFor(tens, '+', 2, 2)).toContain('3 cộng 8 bằng 11, thêm 1 bằng 12');
    const ten = stepsOf(45637, 28485, '+')[4];
    expect(wrongFor(ten, '+', 6, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    const sub = stepsOf(23285, 12967, '-')[1];
    expect(wrongFor(sub, '-', 2, 1)).toBe('Em quên thêm 1 đã nhớ vào 6 rồi.');
  });
});

describe('drawn calculations', () => {
  it('fit their kind and stay within 99 999', () => {
    const rand = rng(7);
    const bad = [];
    for (const op of /** @type {const} */ (['+', '-'])) {
      for (const [kind, lo, hi] of /** @type {const} */ ([
        ['plain', 0, 0],
        ['one', 1, 1],
        ['many', 2, 4],
      ])) {
        for (let i = 0; i < 40; i++) {
          const { a, b } = drawColumn(rand, op, kind);
          const r = resultOf(a, b, op);
          const digits = sheetAt(a, b, op, planOf(a, b, op).length)
            .written.reverse()
            .join('');
          const c = carriesOf(a, b, op);
          if (r > 99999 || r <= 0 || Number(digits) !== r || c < lo || c > hi) bad.push([op, a, b]);
          if (a < 10000 || b < 1000) bad.push([op, a, b]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats the task just done', () => {
    const rand = rng(2);
    const not = drawColumn(rand, '-', 'one');
    const bad = [];
    for (let i = 0; i < 50; i++) {
      const next = drawColumn(rand, '-', 'one', not);
      if (next.a === not.a && next.b === not.b) bad.push(next);
    }
    expect(bad).toEqual([]);
  });
});

describe('options', () => {
  it('keeps four different whole numbers with the right one', () => {
    const { options, answer } = slipOptions(74122, [63012, 74122, -3]);
    expect(new Set(options).size).toBe(4);
    expect(plain(options[answer])).toBe('74 122');
    expect(plain(equation(23285, 12967, '-'))).toBe('23 285 − 12 967 = 10 318');
  });
});
