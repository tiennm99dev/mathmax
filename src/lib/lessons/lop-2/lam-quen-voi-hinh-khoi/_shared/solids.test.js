import { describe, expect, it } from 'vitest';
import { SOLID_KINDS, THINGS, solidTitle, stackSum, stackTotal, thingSentence } from './solids.js';

describe('solids', () => {
  it('gives every solid a capitalised name', () => {
    expect(SOLID_KINDS.map(solidTitle)).toEqual([
      'Khối trụ',
      'Khối cầu',
      'Khối hộp chữ nhật',
      'Khối lập phương',
    ]);
  });

  it('keeps thing ids unique and has enough things of each round solid', () => {
    expect(new Set(THINGS.map((t) => t.id)).size).toBe(THINGS.length);
    expect(THINGS.filter((t) => t.kind === 'tru').length).toBeGreaterThanOrEqual(4);
    expect(THINGS.filter((t) => t.kind === 'cau').length).toBeGreaterThanOrEqual(4);
  });

  it('writes what solid a thing has the form of', () => {
    expect(thingSentence({ id: 'x', name: 'quả cam', kind: 'cau' })).toBe(
      'Quả cam có dạng khối cầu.',
    );
  });

  it('counts a stack of rows 1, 2, 3, ...', () => {
    expect([1, 2, 3, 4, 5].map(stackTotal)).toEqual([1, 3, 6, 10, 15]);
    expect(stackSum(1)).toBe('1');
    expect(stackSum(4)).toBe('1 + 2 + 3 + 4 = 10');
  });
});
