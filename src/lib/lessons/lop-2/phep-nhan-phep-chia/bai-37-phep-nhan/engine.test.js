import { describe, expect, it } from 'vitest';
import { plateMessage, readPlates, TASKS } from './engine.js';

describe('reading the plates', () => {
  it('writes a multiplication only for equal plates', () => {
    expect(readPlates([2, 2, 2])).toMatchObject({
      total: 6,
      sum: '2 + 2 + 2 = 6',
      product: '2 × 3 = 6',
    });
    expect(readPlates([2, 3, 2])).toMatchObject({ total: 7, canMultiply: false, product: null });
  });

  it('never multiplies empty plates', () => {
    expect(readPlates([0, 0])).toMatchObject({ canMultiply: false, hasEmpty: true });
    expect(readPlates([2, 0])).toMatchObject({ canMultiply: false, hasEmpty: true });
  });

  it('reads one plate as taken once', () => {
    expect(readPlates([3])).toMatchObject({ sum: '3', product: '3 × 1 = 3' });
  });
});

describe('feedback', () => {
  const task = { each: 2, plates: 3 };

  it('walks from empty to the task', () => {
    expect(plateMessage([0, 2], task, 'quả cam')).toContain('Còn đĩa trống');
    expect(plateMessage([1, 2], task, 'quả cam')).toContain('chưa bằng nhau');
    expect(plateMessage([3, 3], task, 'quả cam')).toContain('xếp lại cho đúng đề bài');
    expect(plateMessage([2, 2, 2], task, 'quả cam')).toContain('Đúng rồi! 2 được lấy 3 lần');
  });

  it('asks only for layouts the board can hold', () => {
    const bad = TASKS.filter((t) => t.each > 5 || t.plates > 5 || t.plates < 2);
    expect(bad).toEqual([]);
  });
});
