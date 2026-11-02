import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  asksOf,
  blocksAt,
  checkText,
  firstTask,
  makeTask,
  quotientText,
  sheetRows,
  stageMessage,
  wrongMessage,
} from './engine.js';

describe('division from the tens', () => {
  it('asks the book’s questions for 75 : 3', () => {
    const asks = asksOf({ n: 75, d: 3 });
    expect(asks.map((a) => a.answer)).toEqual([2, 1, 5, 0]);
    expect(asks[0].say).toBe('7 chia 3 được 2, viết 2.');
    expect(asks[1].say).toBe('2 nhân 3 bằng 6; 7 trừ 6 bằng 1.');
    expect(asks[2].say).toBe('15 chia 3 được 5, viết 5.');
  });

  it('brings the ones down after the tens', () => {
    expect(stageMessage({ n: 75, d: 3 }, 2)).toContain('Hạ 5, được 15.');
    expect(stageMessage({ n: 75, d: 3 }, 0)).toBe('Em chia từ hàng chục. 7 chia 3 được mấy?');
  });

  it('ends on the division sentence and a check', () => {
    expect(stageMessage({ n: 29, d: 2 }, 4)).toContain('29 : 2 = 14 (dư 1).');
    expect(checkText({ n: 75, d: 3 })).toBe('Thử lại: 25 × 3 = 75.');
    expect(checkText({ n: 29, d: 2 })).toBe('Thử lại: 14 × 2 = 28, 28 + 1 = 29.');
  });

  it('sets out the sheet as the book prints it', () => {
    const rows = sheetRows({ n: 53, d: 5 }, 4).map((r) => `${r.t}${r.o}`);
    expect(rows).toEqual(['53', '5', '03', '0', '3']);
    expect(sheetRows({ n: 53, d: 5 }, 0)).toHaveLength(1);
    expect(quotientText({ n: 53, d: 5 }, 4)).toBe('10');
    expect(quotientText({ n: 53, d: 5 }, 1)).toBe('1');
    expect(quotientText({ n: 53, d: 5 }, 0)).toBe('');
  });

  it('guides a wrong digit', () => {
    const task = { n: 75, d: 3 };
    expect(wrongMessage(task, 0, 3, 1)).toContain('Em thử số bé hơn');
    expect(wrongMessage(task, 0, 1, 1)).toContain('Em thử số lớn hơn');
    expect(wrongMessage(task, 1, 2, 1)).toContain('7 − 6');
    expect(wrongMessage(task, 0, 1, 2)).toContain('viết 2');
  });
});

describe('the blocks and the tasks', () => {
  it('keeps every block at each stage, for many tasks', () => {
    const bad = [];
    const rand = rng(9);
    for (const kind of /** @type {const} */ (['exact', 'rest'])) {
      for (let i = 0; i < 120; i++) {
        const task = makeTask(rand, kind);
        const asks = asksOf(task);
        if (asks.length !== 4 || asks.some((a) => a.answer > 9 || a.answer < 0)) bad.push(task);
        if (kind === 'exact' ? task.n % task.d !== 0 : task.n % task.d === 0) bad.push(task);
        for (let stage = 0; stage <= 4; stage++) {
          const b = blocksAt(task, stage);
          const shared = (b.perTens * 10 + b.perOnes) * task.d;
          if (shared + b.pileTens * 10 + b.pileOnes !== task.n || b.pileOnes < 0) bad.push(task);
        }
        const end = blocksAt(task, 4);
        if (end.pileOnes !== task.n % task.d || end.pileTens !== 0) bad.push(task);
        const q = Number(quotientText(task, 4));
        if (q !== Math.floor(task.n / task.d)) bad.push(task);
      }
    }
    expect(bad).toEqual([]);
  });

  it('shares the tens first and leaves the remainder last', () => {
    expect(blocksAt(firstTask('rest'), 1)).toEqual({
      perTens: 1,
      perOnes: 0,
      pileTens: 0,
      pileOnes: 9,
    });
    expect(blocksAt({ n: 75, d: 3 }, 1).pileTens).toBe(1);
    expect(blocksAt({ n: 75, d: 3 }, 2)).toEqual({
      perTens: 2,
      perOnes: 0,
      pileTens: 0,
      pileOnes: 15,
    });
  });
});
