import { describe, expect, it } from 'vitest';
import { TASKS as ADDITIONS } from '../bai-22-phep-cong-cac-so-co-nhieu-chu-so/engine.js';
import { TASKS as SUBTRACTIONS } from '../bai-23-phep-tru-cac-so-co-nhieu-chu-so/engine.js';
import { addSteps, carries, equation, forgotCarry, nudge, stepsOf, subSteps } from './column.js';

/** @typedef {import('./column.js').Op} Op */

/**
 * The number written by the steps, ones first.
 * @param {import('./column.js').Step[]} steps
 */
const written = (steps) =>
  Number(
    steps
      .map((s) => s.digit)
      .reverse()
      .join(''),
  );

describe('column steps', () => {
  it('write the right result one digit per step for every task', () => {
    const wrong = [];
    /** @type {Array<[Op, ReadonlyArray<{ a: number, b: number }>]>} */
    const sets = [
      ['+', ADDITIONS],
      ['−', SUBTRACTIONS],
    ];
    for (const [op, tasks] of sets) {
      for (const { a, b } of tasks) {
        const steps = stepsOf(op, a, b);
        const result = op === '+' ? a + b : a - b;
        if (written(steps) !== result) wrong.push(`${a} ${op} ${b}`);
        if (String(result).length !== steps.length) wrong.push(`${a} ${op} ${b} length`);
        if (steps.some((s) => s.digit < 0 || s.digit > 9)) wrong.push(`${a} ${op} ${b} digit`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('say addition the book way', () => {
    expect(addSteps(367859, 541728).map((s) => s.say)).toEqual([
      '9 cộng 8 bằng 17, viết 7, nhớ 1',
      '5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8',
      '8 cộng 7 bằng 15, viết 5, nhớ 1',
      '7 cộng 1 bằng 8, thêm 1 bằng 9, viết 9',
      '6 cộng 4 bằng 10, viết 0, nhớ 1',
      '3 cộng 5 bằng 8, thêm 1 bằng 9, viết 9',
    ]);
    expect(
      addSteps(2514, 47282)
        .map((s) => s.say)
        .slice(3),
    ).toEqual(['7 cộng 2 bằng 9, viết 9', 'Hạ 4']);
  });

  it('say subtraction the book way', () => {
    expect(subSteps(647253, 285749).map((s) => s.say)).toEqual([
      '3 không trừ được 9, lấy 13 trừ 9 bằng 4, viết 4, nhớ 1',
      '4 thêm 1 bằng 5; 5 trừ 5 bằng 0, viết 0',
      '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1',
      '5 thêm 1 bằng 6; 7 trừ 6 bằng 1, viết 1',
      '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1',
      '2 thêm 1 bằng 3; 6 trừ 3 bằng 3, viết 3',
    ]);
    expect(
      subSteps(92714, 3948)
        .map((s) => s.say)
        .at(-1),
    ).toBe('9 trừ 1 bằng 8, viết 8');
  });

  it('mark which columns send a 1 on', () => {
    expect(addSteps(367859, 541728).map((s) => s.out)).toEqual([1, 0, 1, 0, 1, 0]);
    expect(subSteps(647253, 285749).map((s) => s.extra)).toEqual([0, 1, 0, 1, 0, 1]);
    expect(carries('+', 139820, 240134)).toBe(0);
    expect(carries('−', 520000, 152384)).toBe(5);
  });

  it('give the slip of a forgotten carry', () => {
    expect(forgotCarry('+', 215382, 235595)).toBe(440877);
    expect(forgotCarry('−', 520000, 152384)).toBe(478726);
    expect(forgotCarry('+', 139820, 240134)).toBe(379954);
  });

  it('write the finished sentence and nudge without the answer first', () => {
    expect(equation('+', 367859, 541728)).toBe('367 859 + 541 728 = 909 587');
    const step = subSteps(647253, 285749)[1];
    expect(nudge('−', step, 1)).not.toContain('viết');
    expect(nudge('−', step, 2)).toContain(step.say);
  });
});
