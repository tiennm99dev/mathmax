import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  FIRST_TASK,
  doneLines,
  layMessage,
  makeTask,
  timesOf,
  timesOptions,
  wrongTimes,
} from './engine.js';

describe('laying the short strip', () => {
  it('counts up to the long strip', () => {
    expect(layMessage(FIRST_TASK, 0)).toContain('Thanh dài 6 cm');
    expect(layMessage(FIRST_TASK, 2)).toBe('Đặt 2 lần được 4 cm, chưa đủ 6 cm.');
    expect(layMessage(FIRST_TASK, 3)).toContain('đặt được 3 lần');
  });

  it('closes with the division and the difference', () => {
    expect(doneLines({ big: 24, small: 6 })).toEqual([
      '24 : 6 = 4. Số lớn gấp 4 lần số bé.',
      '24 − 6 = 18. Số lớn hơn số bé 18 đơn vị.',
    ]);
  });
});

describe('the options', () => {
  it('include the difference as a slip and explain it', () => {
    expect(timesOptions({ big: 24, small: 6 })).toEqual([3, 4, 5, 18]);
    expect(wrongTimes({ big: 24, small: 6 }, 18, 1)).toContain('lớn hơn số bé bao nhiêu');
    expect(wrongTimes({ big: 24, small: 6 }, 5, 1)).toContain('24 : 6');
    expect(wrongTimes({ big: 24, small: 6 }, 5, 2)).toBe('Em xem nhé: 24 : 6 = 4.');
  });

  it('fit every drawn pair: whole times, right option held once', () => {
    const rand = rng(4);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const task = makeTask(rand);
      const options = timesOptions(task);
      const times = timesOf(task);
      if (!Number.isInteger(times) || times < 2 || times > 9) bad.push(task);
      if (options.filter((v) => v === times).length !== 1) bad.push(task);
      if (options.length < 3 || new Set(options).size !== options.length) bad.push(task);
    }
    expect(bad).toEqual([]);
  });

  it('never repeats the pair it was told not to', () => {
    expect(makeTask(rng(1), FIRST_TASK)).not.toEqual(FIRST_TASK);
  });
});
