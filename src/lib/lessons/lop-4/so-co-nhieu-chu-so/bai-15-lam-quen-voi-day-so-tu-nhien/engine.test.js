import { describe as group, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import {
  LIMIT,
  SPAN,
  TASKS,
  checkTask,
  describe,
  neighbours,
  onRay,
  spoken,
  taskAnswer,
  windowAround,
} from './engine.js';

group('the ray window', () => {
  it('centres the chosen number', () => {
    expect(windowAround(9999)).toEqual([9997, 9998, 9999, 10000, 10001]);
  });

  it('starts at 0 near the start of the ray', () => {
    expect(windowAround(0)).toEqual([0, 1, 2, 3, 4]);
    expect(windowAround(1)).toEqual([0, 1, 2, 3, 4]);
  });

  it('stays whole and on the ray', () => {
    expect(onRay(-3)).toBe(0);
    expect(onRay(LIMIT + 5)).toBe(LIMIT);
    expect(windowAround(LIMIT)).toHaveLength(SPAN);
    expect(windowAround(LIMIT).at(-1)).toBe(LIMIT);
  });
});

group('neighbours', () => {
  it('adds and takes away one', () => {
    expect(neighbours(100000)).toEqual({ before: 99999, after: 100001 });
  });

  it('gives 0 no number before it', () => {
    expect(neighbours(0)).toEqual({ before: null, after: 1 });
    expect(describe(0)).toContain('bé nhất');
    expect(describe(19)).toBe(
      'Số liền trước của 19 là 18 (bớt 1). Số liền sau của 19 là 20 (thêm 1).',
    );
  });

  it('reads the chapter numbers and writes larger ones in digits', () => {
    expect(spoken(1000000)).toBe('một triệu');
    expect(spoken(1000000000)).toBe('1 000 000 000');
  });
});

group('the challenge', () => {
  it('accepts only the right tap for every task', () => {
    const bad = TASKS.filter((task) => {
      const right = taskAnswer(task);
      const wrong = [null, task.given - 1, task.given, task.given + 1, task.given + 2].filter(
        (n) => n !== right && (n === null || n >= 0),
      );
      return !checkTask(task, right).ok || wrong.some((n) => checkTask(task, n).ok);
    });
    expect(bad).toEqual([]);
  });

  it('has 0 among the tasks, with no number before it', () => {
    const zero = TASKS.find((t) => t.given === 0);
    expect(zero && taskAnswer(zero)).toBe(null);
    expect(checkTask({ given: 0, ask: 'truoc' }, 1).text).toContain('Bên trái số 0');
  });

  it('never names the answer in a wrong-tap message', () => {
    const bad = TASKS.filter((task) => {
      const right = taskAnswer(task);
      if (right === null) return false;
      const text = checkTask(task, task.given + (task.ask === 'sau' ? -1 : 1)).text;
      return text.includes(fmt(right));
    });
    expect(bad).toEqual([]);
  });
});
