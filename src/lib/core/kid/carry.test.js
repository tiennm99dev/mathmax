import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KINDS } from './column.js';
import {
  carrySteps,
  carryText,
  freshCarry,
  isCarry,
  makeCarry,
  opOf,
  differenceOptions,
} from './carry.js';

describe('carrying in columns', () => {
  it('reads the columns the way the book does', () => {
    expect(carryText(35, 7, '+')).toBe(
      '5 cộng 7 bằng 12, viết 2, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42.',
    );
    expect(carryText(36, 28, '+')).toBe(
      '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. Vậy 36 + 28 = 64.',
    );
    expect(carryText(42, 7, '-')).toBe(
      '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3. Vậy 42 − 7 = 35.',
    );
    expect(carryText(62, 37, '-')).toBe(
      '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Vậy 62 − 37 = 25.',
    );
  });

  it('tells carrying calculations from the others', () => {
    expect(isCarry(35, 7, '+')).toBe(true);
    expect(isCarry(34, 5, '+')).toBe(false);
    expect(isCarry(95, 8, '+')).toBe(false);
    expect(isCarry(42, 7, '-')).toBe(true);
    expect(isCarry(47, 2, '-')).toBe(false);
    expect(isCarry(12, 5, '-')).toBe(false);
  });

  it('draws carrying problems whose column digits make the result', () => {
    const bad = [];
    const rand = rng(5);
    for (const kind of KINDS) {
      let prev;
      for (let i = 0; i < 80; i++) {
        const p = freshCarry(rand, kind, prev);
        const op = opOf(kind);
        const r = op === '+' ? p.a + p.b : p.a - p.b;
        const [ones, tens] = carrySteps(p.a, p.b, op);
        const oneDigit = kind.endsWith('one');
        if (!isCarry(p.a, p.b, op) || p.op !== op) bad.push([kind, p]);
        if (oneDigit !== p.b < 10) bad.push([kind, 'size', p]);
        if (tens.digit * 10 + ones.digit !== r) bad.push([kind, 'digits', p]);
        if (prev && prev.a === p.a && prev.b === p.b) bad.push([kind, 'repeat', p]);
        prev = p;
      }
    }
    expect(bad).toEqual([]);
    expect(makeCarry(rng(1), 'add-one').op).toBe('+');
  });
});

describe('differenceOptions', () => {
  it('offers the forgotten carry among the options, by default', () => {
    const { options, answer } = differenceOptions(() => 0.5, 25);
    expect(options[answer]).toBe('25');
    expect(options).toContain('35');
  });

  it('takes the slip a lesson expects, and never repeats a number', () => {
    const { options, answer } = differenceOptions(() => 0.5, 35, 45);
    expect(options[answer]).toBe('35');
    expect(options).toContain('45');
    expect(new Set(options).size).toBe(options.length);
  });
});
