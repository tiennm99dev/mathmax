import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  areaLayout,
  askColumn,
  carryOf,
  digitOf,
  firstTask,
  makeTask,
  partLines,
  sayColumn,
  wrongMessage,
} from './engine.js';

describe('multiplying in columns', () => {
  it('says each column the book’s way', () => {
    const plain = firstTask('plain');
    expect(sayColumn(plain, 'ones')).toBe('3 nhân 2 bằng 6, viết 6');
    expect(sayColumn(plain, 'tens')).toBe('3 nhân 1 bằng 3, viết 3');
    const carry = firstTask('carry');
    expect(sayColumn(carry, 'ones')).toBe('3 nhân 6 bằng 18, viết 8, nhớ 1');
    expect(sayColumn(carry, 'tens')).toBe('3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7');
  });

  it('asks for the carry in the tens column only when there is one', () => {
    expect(askColumn(firstTask('carry'), 'tens')).toContain('thêm 1 đã nhớ');
    expect(askColumn(firstTask('plain'), 'tens')).not.toContain('đã nhớ');
  });

  it('names the slips of a forgotten or misplaced carry', () => {
    const task = firstTask('carry');
    expect(wrongMessage(task, 'tens', 6, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    expect(wrongMessage(task, 'ones', 1, 1)).toContain('nhớ sang hàng chục');
    expect(wrongMessage(task, 'ones', 5, 1)).toContain('3 hàng, mỗi hàng 6 ô');
    expect(wrongMessage(task, 'ones', 5, 2)).toContain('viết 8');
  });

  it('splits the number into tens and ones', () => {
    expect(partLines(firstTask('carry'))).toEqual({
      ones: '6 × 3 = 18',
      tens: '20 × 3 = 60',
      sum: '60 + 18 = 78',
    });
  });

  it('draws one cell per unit inside the box', () => {
    const { cell, tensWidth, onesWidth, height } = areaLayout({ a: 26, b: 3 }, 320, 180);
    expect(tensWidth + onesWidth).toBeCloseTo(320);
    expect(height).toBeCloseTo(3 * cell);
    expect(areaLayout({ a: 11, b: 9 }, 320, 180).height).toBeCloseTo(180);
  });
});

describe('new tasks', () => {
  it('stay in range, of the kind asked, and the digits make the product', () => {
    const bad = [];
    const rand = rng(11);
    for (const kind of /** @type {const} */ (['plain', 'carry'])) {
      for (let i = 0; i < 150; i++) {
        const task = makeTask(rand, kind);
        const value = digitOf(task, 'tens') * 10 + digitOf(task, 'ones');
        const kindRight = kind === 'carry' ? carryOf(task) > 0 : carryOf(task) === 0;
        if (value !== task.a * task.b || value > 99 || !kindRight) bad.push(task);
      }
    }
    expect(bad).toEqual([]);
  });

  it('differ from the task on screen', () => {
    const rand = rng(3);
    const not = firstTask('plain');
    const same = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTask(rand, 'plain', not);
      if (t.a === not.a && t.b === not.b) same.push(t);
    }
    expect(same).toEqual([]);
  });
});
