import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  addendTask,
  balanceMessage,
  filledSentence,
  firstTask,
  judge,
  makeTask,
  minuendTask,
  subtrahendTask,
  workingText,
} from './engine.js';

/**
 * Totals of the pans once the "?" takes a value.
 * @param {import('./engine.js').Task} task
 * @param {number} value
 */
function pans(task, value) {
  /** @param {Array<number | null>} loads */
  const total = (loads) => loads.map((v) => v ?? value).reduce((s, v) => s + v, 0);
  return [total(task.pans.left), total(task.pans.right)];
}

describe('finding a missing number', () => {
  it('works the book calculations', () => {
    expect(addendTask(20, 35).answer).toBe(15);
    expect(addendTask(12, 30).answer).toBe(18);
    expect(minuendTask(14, 25).answer).toBe(39);
    expect(minuendTask(36, 25).answer).toBe(61);
    expect(subtrahendTask(34, 12).answer).toBe(22);
    expect(subtrahendTask(52, 28).answer).toBe(24);
  });

  it('writes the calculation the rule gives', () => {
    expect(workingText(addendTask(20, 35))).toBe('35 − 20 = 15');
    expect(workingText(minuendTask(14, 25))).toBe('25 + 14 = 39');
    expect(workingText(subtrahendTask(34, 12))).toBe('34 − 12 = 22');
    expect(filledSentence(subtrahendTask(34, 12), 22)).toBe('34 − 22 = 12');
  });

  it('balances the pans exactly on the answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const kind of /** @type {const} */ (['so-hang', 'so-bi-tru', 'so-tru'])) {
        const task = makeTask(rng(seed), kind);
        const [l, r] = pans(task, task.answer);
        if (l !== r || task.answer <= 0) bad.push([kind, seed, 'level']);
        const [l2, r2] = pans(task, task.answer + 1);
        if (l2 === r2) bad.push([kind, seed, 'tilt']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('holds the equation true when filled with the answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const kind of /** @type {const} */ (['so-hang', 'so-bi-tru', 'so-tru'])) {
        const task = makeTask(rng(seed), kind);
        const [lhs, rhs] = filledSentence(task, task.answer).split(' = ');
        const [a, sign, b] = lhs.split(' ');
        const value = sign === '+' ? Number(a) + Number(b) : Number(a) - Number(b);
        if (value !== Number(rhs)) bad.push([kind, seed]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('judges a guess and names the lower pan', () => {
    const add = firstTask('so-hang');
    expect(judge(add, 10)).toBe('low');
    expect(judge(add, 20)).toBe('high');
    expect(judge(add, 15)).toBe('right');
    expect(balanceMessage(add, 10)).toBe('Đĩa bên trái thấp hơn. Số 10 còn bé quá.');
    expect(balanceMessage(add, 20)).toBe('Đĩa bên phải thấp hơn. Số 20 còn lớn quá.');
    expect(balanceMessage(add, 15)).toContain('? + 20 = 35'.replace('?', '15'));

    const sub = firstTask('so-bi-tru');
    expect(balanceMessage(sub, 30)).toBe('Đĩa bên phải thấp hơn. Số 30 còn bé quá.');
    expect(balanceMessage(sub, 50)).toBe('Đĩa bên trái thấp hơn. Số 50 còn lớn quá.');
  });

  it('says the same as the tilt of the pans', () => {
    for (const kind of /** @type {const} */ (['so-hang', 'so-bi-tru', 'so-tru'])) {
      const task = firstTask(kind);
      const [l, r] = pans(task, task.answer - 1);
      const lower = l > r ? 'trái' : 'phải';
      expect(balanceMessage(task, task.answer - 1)).toContain(`Đĩa bên ${lower} thấp hơn`);
    }
  });
});
