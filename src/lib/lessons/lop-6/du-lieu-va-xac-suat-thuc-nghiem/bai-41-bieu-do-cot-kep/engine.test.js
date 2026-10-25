import { describe, it, expect } from 'vitest';
import { BOYS, CLASSES, GIRLS, compareText, largestGap, questions, total } from './engine.js';

describe('double bar chart comparisons', () => {
  it('says which group is larger and by how much', () => {
    expect(compareText('6B', 22, 17)).toBe('Lớp 6B: 22 nam và 17 nữ, số nam nhiều hơn 5 bạn.');
    expect(compareText('6C', 15, 21)).toBe('Lớp 6C: 15 nam và 21 nữ, số nữ nhiều hơn 6 bạn.');
    expect(compareText('6D', 20, 20)).toBe('Lớp 6D: 20 nam và 20 nữ, số nam bằng số nữ.');
  });

  it('totals each data set', () => {
    expect(total(BOYS)).toBe(75);
    expect(total(GIRLS)).toBe(78);
  });

  it('finds the widest gap, ties included', () => {
    expect(largestGap(BOYS, GIRLS)).toEqual([2]);
    expect(largestGap([1, 5], [4, 2])).toEqual([0, 1]);
  });

  it('gives every quiz question one class as answer', () => {
    const names = questions().map((q) => q.answer.map((i) => CLASSES[i]));
    expect(names).toEqual([['6B'], ['6D'], ['6C'], ['6D']]);
  });
});
