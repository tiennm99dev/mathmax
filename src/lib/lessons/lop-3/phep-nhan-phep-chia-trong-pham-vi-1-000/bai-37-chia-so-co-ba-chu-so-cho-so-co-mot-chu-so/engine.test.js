import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  firstTask,
  makeTask,
  quotientText,
  roundLines,
  sheetRows,
  stageMessage,
  stepsOf,
  wrongMessage,
} from './engine.js';

/** @param {import('./engine.js').Row[]} rows */
const shown = (rows) => rows.map((r) => r.cells.join(''));

describe('the steps', () => {
  it('asks for a digit and a rest in each round, and brings digits down between', () => {
    const steps = stepsOf(firstTask('exact'));
    expect(steps.map((s) => s.kind).join(' ')).toBe('digit rest down digit rest down digit rest');
    expect(steps.map((s) => s.answer)).toEqual([1, 0, 9, 3, 0, 6, 2, 0]);
  });

  it('starts from two digits when the hundreds are too small', () => {
    const steps = stepsOf(firstTask('two'));
    expect(steps.map((s) => s.answer)).toEqual([5, 5, 4, 9, 0]);
    expect(stageMessage(firstTask('two'), 0)).toBe(
      '3 bé hơn 6, nên em lấy 35 để chia. 35 chia 6 được mấy?',
    );
  });

  it('says why a 0 goes in the quotient', () => {
    const task = firstTask('zero');
    expect(stepsOf(task)[3]).toMatchObject({ kind: 'digit', partial: 1, answer: 0 });
    expect(stageMessage(task, 4)).toContain('Chữ số 0 giữ chỗ hàng chục.');
    expect(quotientText(task, 8)).toBe('103');
  });

  it('ends on the sentence and a check', () => {
    const task = firstTask('rest');
    const end = stageMessage(task, stepsOf(task).length);
    expect(end).toContain('538 : 4 = 134 (dư 2).');
    expect(end).toContain('Thử lại: 134 × 4 = 536, 536 + 2 = 538.');
  });

  it('guides a wrong digit', () => {
    const task = firstTask('rest');
    expect(wrongMessage(task, 0, 2, 1)).toContain('Em thử số bé hơn');
    expect(wrongMessage(task, 3, 1, 1)).toContain('Em thử số lớn hơn');
    expect(wrongMessage(task, 1, 3, 1)).toBe('Chưa đúng. Em trừ lại: 5 − 4.');
    expect(wrongMessage(task, 0, 2, 2)).toContain('viết 1');
  });
});

describe('the sheet', () => {
  it('prints the rounds of 518 : 5 as the book does', () => {
    const task = firstTask('zero');
    expect(shown(sheetRows(task, stepsOf(task).length))).toEqual([
      '518',
      '5',
      '01',
      '0',
      '18',
      '15',
      '3',
    ]);
  });

  it('keeps each digit in its column', () => {
    const task = firstTask('two');
    const rows = sheetRows(task, stepsOf(task).length);
    expect(rows.map((r) => r.cells)).toEqual([
      ['3', '5', '4'],
      ['3', '0', ''],
      ['', '5', '4'],
      ['', '5', '4'],
      ['', '', '0'],
    ]);
  });

  it('tints what is being divided and marks the digit coming down', () => {
    const task = firstTask('rest');
    expect(sheetRows(task, 0)[0].active).toEqual([0]);
    expect(sheetRows(task, 2)[0].active).toEqual([1]);
    const after = sheetRows(task, 3);
    expect(after[2].fly).toBe(1);
    expect(after[2].active).toEqual([0, 1]);
    expect(sheetRows(firstTask('two'), 0)[0].active).toEqual([0, 1]);
  });

  it('adds up for drawn tasks: quotient, columns and meaning lines', () => {
    const rand = rng(21);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero', 'two'])) {
      for (let i = 0; i < 60; i++) {
        const task = makeTask(rand, kind);
        const steps = stepsOf(task);
        if (Number(quotientText(task, steps.length)) !== Math.floor(task.n / task.d))
          bad.push(task);
        if (steps.some((s) => s.answer < 0 || s.answer > 9)) bad.push(task);
        const rows = sheetRows(task, steps.length);
        if (rows.some((r) => r.cells.length !== 3)) bad.push(task);
        if (Number(rows.at(-1)?.cells.join('')) !== task.n % task.d) bad.push(task);
        for (let stage = 0; stage <= steps.length; stage++) {
          if (stageMessage(task, stage).includes('undefined')) bad.push(task);
          sheetRows(task, stage);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('explains each round by its place', () => {
    const task = firstTask('rest');
    expect(roundLines(task, stepsOf(task).length)).toEqual([
      '5 trăm : 4 = 1 trăm, còn 1 trăm',
      '13 chục : 4 = 3 chục, còn 1 chục',
      '18 đơn vị : 4 = 4 đơn vị, còn 2 đơn vị',
    ]);
  });
});
