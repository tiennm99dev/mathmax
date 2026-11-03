import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  askColumn,
  doneMessage,
  firstTask,
  makeTask,
  partLines,
  rowBlocks,
  sumLine,
  wrongMessage,
} from './engine.js';

describe('asking column by column', () => {
  it('asks from the ones and adds the carry later', () => {
    const task = firstTask('two');
    expect(askColumn(task, 0)).toBe('Hàng đơn vị: 3 nhân 4. Em viết chữ số nào?');
    expect(askColumn(task, 1)).toBe('Hàng chục: 3 nhân 6, rồi thêm 1 đã nhớ. Em viết chữ số nào?');
    expect(askColumn(task, 2)).toBe('Hàng trăm: 3 nhân 1, rồi thêm 1 đã nhớ. Em viết chữ số nào?');
  });

  it('spots a forgotten carry and a carry written down', () => {
    const task = firstTask('two');
    expect(wrongMessage(task, 1, 8, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    expect(wrongMessage(task, 0, 1, 1)).toContain('nhớ sang hàng bên trái');
    expect(wrongMessage(task, 0, 7, 1)).toBe('Chưa đúng. Em tính lại 3 nhân 4.');
    expect(wrongMessage(task, 0, 7, 2)).toBe('Em xem nhé: 3 nhân 4 bằng 12, viết 2, nhớ 1.');
  });
});

describe('the block model', () => {
  it('splits the factor and adds the parts back', () => {
    const task = firstTask('plain');
    expect(rowBlocks(task)).toEqual({ hundreds: 2, tens: 1, ones: 3 });
    expect(partLines(task)).toEqual(['3 × 3 = 9', '10 × 3 = 30', '200 × 3 = 600']);
    expect(sumLine(task)).toBe('600 + 30 + 9 = 639');
    expect(doneMessage(task)).toBe('213 × 3 = 639.');
  });

  it('fits the drawing and the sums for drawn tasks', () => {
    const rand = rng(11);
    const bad = [];
    for (const kind of /** @type {const} */ (['plain', 'one', 'two'])) {
      for (let i = 0; i < 80; i++) {
        const task = makeTask(rand, kind);
        const { hundreds } = rowBlocks(task);
        const total = sumLine(task)
          .split(' = ')[0]
          .split(' + ')
          .reduce((sum, part) => sum + Number(part), 0);
        if (hundreds > 4 || task.b > 9 || total !== task.a * task.b) bad.push(task);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats the task it was told not to', () => {
    const rand = rng(2);
    const first = firstTask('one');
    expect(makeTask(rand, 'one', first)).not.toEqual(first);
  });
});
