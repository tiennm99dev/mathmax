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
  it('starts from the ten thousands when they are big enough', () => {
    const task = firstTask('exact');
    const steps = stepsOf(task);
    expect(steps.map((s) => s.kind).join(' ')).toBe(
      'digit rest down digit rest down digit rest down digit rest down digit rest',
    );
    expect(stageMessage(task, 0)).toBe('Em chia từ hàng chục nghìn. 4 chia 3 được mấy?');
    expect(quotientText(task, steps.length)).toBe('15263');
  });

  it('takes two digits when the ten thousands are too small', () => {
    const task = firstTask('rest');
    expect(stageMessage(task, 0)).toBe('2 bé hơn 3, nên em lấy 21 để chia. 21 chia 3 được mấy?');
    expect(stepsOf(task).map((s) => s.answer)).toEqual([7, 0, 4, 1, 1, 3, 4, 1, 7, 5, 2]);
  });

  it('says why a 0 goes in the quotient', () => {
    const task = firstTask('zero');
    expect(stepsOf(task)[6]).toMatchObject({ kind: 'digit', partial: 2, answer: 0 });
    expect(stageMessage(task, 7)).toContain('Chữ số 0 giữ chỗ hàng chục.');
    expect(quotientText(task, stepsOf(task).length)).toBe('3205');
  });

  it('ends on the sentence and a check', () => {
    const task = firstTask('rest');
    const end = plain(stageMessage(task, stepsOf(task).length));
    expect(end).toContain('21 437 : 3 = 7 145 (dư 2).');
    expect(end).toContain('Thử lại: 7 145 × 3 = 21 435, 21 435 + 2 = 21 437.');
  });

  it('guides a wrong digit', () => {
    const task = firstTask('rest');
    expect(wrongMessage(task, 0, 8, 1)).toContain('Em thử số bé hơn');
    expect(wrongMessage(task, 0, 6, 1)).toContain('Em thử số lớn hơn');
    expect(wrongMessage(task, 1, 3, 1)).toBe('Chưa đúng. Em trừ lại: 21 − 21.');
    expect(wrongMessage(task, 0, 8, 2)).toContain('viết 7');
  });
});

describe('the sheet', () => {
  it('prints the rounds of 16 025 : 5 as the book does', () => {
    const task = firstTask('zero');
    expect(shown(sheetRows(task, stepsOf(task).length))).toEqual([
      '16025',
      '15',
      '10',
      '10',
      '02',
      '0',
      '25',
      '25',
      '0',
    ]);
  });

  it('keeps each digit in its column', () => {
    const task = firstTask('rest');
    const rows = sheetRows(task, stepsOf(task).length);
    expect(rows.every((r) => r.cells.length === 5)).toBe(true);
    expect(rows[1].cells).toEqual(['2', '1', '', '', '']);
    expect(rows.at(-1)?.cells).toEqual(['', '', '', '', '2']);
  });

  it('tints what is being divided and marks the digit coming down', () => {
    const task = firstTask('rest');
    expect(sheetRows(task, 0)[0].active).toEqual([0, 1]);
    expect(sheetRows(task, 2)[0].active).toEqual([2]);
    const after = sheetRows(task, 3);
    expect(after[2].fly).toBe(2);
    expect(after[2].active).toEqual([2]);
  });

  it('adds up for drawn tasks: quotient, columns and meaning lines', () => {
    const rand = rng(21);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero'])) {
      for (let i = 0; i < 50; i++) {
        const task = makeTask(rand, kind);
        const steps = stepsOf(task);
        if (Number(quotientText(task, steps.length)) !== Math.floor(task.n / task.d)) {
          bad.push(task);
        }
        if (steps.some((s) => s.answer < 0 || s.answer > 9)) bad.push(task);
        const rows = sheetRows(task, steps.length);
        if (rows.some((r) => r.cells.length !== 5)) bad.push(task);
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
      '21 nghìn : 3 = 7 nghìn',
      '4 trăm : 3 = 1 trăm, còn 1 trăm',
      '13 chục : 3 = 4 chục, còn 1 chục',
      '17 đơn vị : 3 = 5 đơn vị, còn 2 đơn vị',
    ]);
  });
});
