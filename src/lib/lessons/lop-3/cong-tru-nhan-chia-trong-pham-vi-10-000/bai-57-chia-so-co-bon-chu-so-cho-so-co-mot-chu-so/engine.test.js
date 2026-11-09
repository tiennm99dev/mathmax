import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
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

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('the steps', () => {
  it('asks for a digit and a rest in each round, and brings digits down between', () => {
    const steps = stepsOf(firstTask('exact'));
    expect(steps.map((s) => s.kind).join(' ')).toBe(
      'digit rest down digit rest down digit rest down digit rest',
    );
    expect(steps.map((s) => s.answer)).toEqual([2, 0, 3, 1, 0, 6, 2, 0, 9, 3, 0]);
  });

  it('starts from two digits when the thousands are too small', () => {
    const steps = stepsOf(firstTask('two'));
    expect(steps.map((s) => s.answer)).toEqual([3, 0, 7, 1, 3, 6, 9, 0]);
    expect(stageMessage(firstTask('two'), 0)).toBe(
      '1 bé hơn 4, nên em lấy 12 để chia. 12 chia 4 được mấy?',
    );
  });

  it('says why a 0 goes in the quotient', () => {
    const task = firstTask('zero');
    expect(stepsOf(task)[3]).toMatchObject({ kind: 'digit', partial: 2, answer: 0 });
    expect(stageMessage(task, 4)).toContain('Chữ số 0 giữ chỗ hàng trăm.');
    expect(quotientText(task, stepsOf(task).length)).toBe('1054');
  });

  it('ends on the sentence and a check', () => {
    const task = firstTask('rest');
    const end = plain(stageMessage(task, stepsOf(task).length));
    expect(end).toContain('2 487 : 2 = 1 243 (dư 1).');
    expect(end).toContain('Thử lại: 1 243 × 2 = 2 486, 2 486 + 1 = 2 487.');
  });

  it('guides a wrong digit', () => {
    const task = firstTask('rest');
    expect(wrongMessage(task, 0, 2, 1)).toContain('Em thử số bé hơn');
    expect(wrongMessage(task, 3, 1, 1)).toContain('Em thử số lớn hơn');
    expect(wrongMessage(task, 1, 3, 1)).toBe('Chưa đúng. Em trừ lại: 2 − 2.');
    expect(wrongMessage(task, 0, 2, 2)).toContain('viết 1');
  });
});

describe('the sheet', () => {
  it('prints the rounds of 4 216 : 4 as the book does', () => {
    const task = firstTask('zero');
    expect(shown(sheetRows(task, stepsOf(task).length))).toEqual([
      '4216',
      '4',
      '02',
      '0',
      '21',
      '20',
      '16',
      '16',
      '0',
    ]);
  });

  it('keeps each digit in its column', () => {
    const task = firstTask('two');
    const rows = sheetRows(task, stepsOf(task).length);
    expect(rows.map((r) => r.cells)).toEqual([
      ['1', '2', '7', '6'],
      ['1', '2', '', ''],
      ['', '0', '7', ''],
      ['', '', '4', ''],
      ['', '', '3', '6'],
      ['', '', '3', '6'],
      ['', '', '', '0'],
    ]);
  });

  it('tints what is being divided and marks the digit coming down', () => {
    const task = firstTask('rest');
    expect(sheetRows(task, 0)[0].active).toEqual([0]);
    expect(sheetRows(task, 2)[0].active).toEqual([1]);
    const after = sheetRows(task, 3);
    expect(after[2].fly).toBe(1);
    expect(after[2].active).toEqual([1]);
    expect(sheetRows(firstTask('two'), 0)[0].active).toEqual([0, 1]);
  });

  it('adds up for drawn tasks: quotient, columns and meaning lines', () => {
    const rand = rng(21);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero', 'two'])) {
      for (let i = 0; i < 50; i++) {
        const task = makeTask(rand, kind);
        const steps = stepsOf(task);
        if (Number(quotientText(task, steps.length)) !== Math.floor(task.n / task.d)) {
          bad.push(task);
        }
        if (steps.some((s) => s.answer < 0 || s.answer > 9)) bad.push(task);
        const rows = sheetRows(task, steps.length);
        if (rows.some((r) => r.cells.length !== 4)) bad.push(task);
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
      '2 nghìn : 2 = 1 nghìn',
      '4 trăm : 2 = 2 trăm',
      '8 chục : 2 = 4 chục',
      '7 đơn vị : 2 = 3 đơn vị, còn 1 đơn vị',
    ]);
  });
});
