import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  boxMessage,
  dividendTask,
  divisorTask,
  dotRows,
  factorTask,
  firstTask,
  judge,
  makeTask,
  sentence,
  workingText,
} from './engine.js';

const count = (/** @type {string[][]} */ rows, /** @type {string} */ state) =>
  rows.flat().filter((d) => d === state).length;

describe('the mystery box tasks', () => {
  it('writes the sentence with the box in its place', () => {
    expect(sentence(factorTask(4, 28))).toBe('? × 4 = 28');
    expect(sentence(factorTask(4, 28, false))).toBe('4 × ? = 28');
    expect(sentence(dividendTask(3, 5))).toBe('? : 3 = 5');
    expect(sentence(divisorTask(15, 5))).toBe('15 : ? = 5');
    expect(sentence(divisorTask(15, 5), 3)).toBe('15 : 3 = 5');
  });

  it('finds the hidden number with the rule of each kind', () => {
    expect(factorTask(4, 28).answer).toBe(7);
    expect(workingText(factorTask(4, 28))).toBe('28 : 4 = 7');
    expect(workingText(factorTask(4, 28, false))).toBe('28 : 4 = 7');
    expect(dividendTask(3, 5).answer).toBe(15);
    expect(workingText(dividendTask(3, 5))).toBe('5 × 3 = 15');
    expect(divisorTask(15, 5).answer).toBe(3);
    expect(workingText(divisorTask(15, 5))).toBe('15 : 5 = 3');
  });

  it('draws what a guess misses or goes past', () => {
    const task = factorTask(4, 28);
    const low = dotRows(task, 5);
    expect(count(low, 'in')).toBe(20);
    expect(count(low, 'empty')).toBe(8);
    expect(count(low, 'extra')).toBe(0);
    expect(low).toHaveLength(7);
    const high = dotRows(task, 8);
    expect(count(high, 'in')).toBe(28);
    expect(count(high, 'extra')).toBe(4);
    const right = dotRows(task, 7);
    expect(count(right, 'empty') + count(right, 'extra')).toBe(0);
    expect(count(dotRows(dividendTask(3, 5), 10), 'empty')).toBe(5);
  });

  it('says what a guess shows', () => {
    const task = factorTask(4, 28);
    expect(boxMessage(task, 5)).toBe('Số 5 còn bé quá: thiếu 8 chấm.');
    expect(boxMessage(task, 8)).toBe('Số 8 lớn quá: thừa 4 chấm.');
    expect(boxMessage(task, 7)).toBe(
      'Hộp mở rồi! 7 × 4 = 28. Em tính: 28 : 4 = 7. Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.',
    );
  });

  it('makes tasks whose answer really completes the sentence', () => {
    const bad = [];
    const rand = rng(7);
    for (const kind of /** @type {const} */ (['thua-so', 'so-bi-chia', 'so-chia'])) {
      for (let i = 0; i < 60; i++) {
        const task = makeTask(rand, kind);
        const a = task.before ?? task.answer;
        const b = task.after ?? task.answer;
        const value = task.op === '×' ? a * b : a / b;
        if (value !== task.result) bad.push(sentence(task));
        if (!Number.isInteger(task.answer) || task.answer > task.maxGuess) bad.push(sentence(task));
        if (judge(task, task.answer) !== 'right') bad.push(sentence(task));
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats the task on screen', () => {
    const rand = rng(3);
    const bad = [];
    let task = firstTask('so-chia');
    for (let i = 0; i < 60; i++) {
      const next = makeTask(rand, 'so-chia', task);
      if (sentence(next) === sentence(task)) bad.push(sentence(next));
      task = next;
    }
    expect(bad).toEqual([]);
  });
});
