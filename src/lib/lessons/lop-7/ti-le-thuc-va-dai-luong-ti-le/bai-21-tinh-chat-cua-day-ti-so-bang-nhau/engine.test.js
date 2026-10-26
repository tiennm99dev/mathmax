import { describe, it, expect } from 'vitest';
import { TASKS, answerFor, judge, partValue, piecesFrom, snap, startCuts } from './engine.js';

describe('dividing in a ratio', () => {
  it('gives whole answers on the step grid for every task', () => {
    for (const task of TASKS) {
      const parts = answerFor(task);
      expect(parts.reduce((s, p) => s + p, 0)).toBe(task.total);
      for (const p of parts) {
        expect(Number.isInteger(p)).toBe(true);
        expect(p % task.step).toBe(0);
      }
      expect(task.names).toHaveLength(task.ratio.length);
    }
  });

  it('knows the textbook answer 60, 80, 100 for 240 in 3 : 4 : 5', () => {
    const task = TASKS[0];
    expect(partValue(task)).toBe(20);
    expect(answerFor(task)).toEqual([60, 80, 100]);
    expect(judge(task, [60, 80, 100])).toEqual({ ok: true, k: 20 });
  });

  it('names the piece that is too big and the one too small', () => {
    const v = judge(TASKS[0], [80, 80, 80]);
    expect(v.ok).toBe(false);
    if (!v.ok) {
      expect(v.high).toBe(0);
      expect(v.low).toBe(2);
    }
  });

  it('turns cuts into pieces and snaps cut positions', () => {
    expect(piecesFrom([60, 140], 240)).toEqual([60, 80, 100]);
    expect(piecesFrom([60], 150)).toEqual([60, 90]);
    expect(snap(62, 5, 0, 240)).toBe(60);
    expect(snap(-3, 5, 0, 240)).toBe(0);
    expect(startCuts(TASKS[0])).toEqual([80, 160]);
    expect(startCuts(TASKS[1])).toEqual([75]);
  });
});
