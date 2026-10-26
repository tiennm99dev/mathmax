import { describe as group, it, expect } from 'vitest';
import { GOALS, START, YEARS, changes, describe, trend } from './engine.js';

group('trend of a series', () => {
  it('reads consecutive changes', () => {
    expect(changes(START)).toEqual([30, -10, 40, 30, -10]);
    expect(YEARS).toHaveLength(START.length);
  });

  it('names the overall trend', () => {
    expect(trend([1, 2, 3])).toBe('tang');
    expect(trend([3, 2, 1])).toBe('giam');
    expect(trend([2, 2, 2])).toBe('khong-doi');
    expect(trend([1, 3, 2])).toBe('xen-ke');
    expect(trend([1, 1, 2])).toBe('xen-ke');
  });

  it('describes highest, lowest, largest rise and fall', () => {
    const text = describe(YEARS, START, 'cây').join(' ');
    expect(text).toContain('có lúc tăng, có lúc giảm');
    expect(text).toContain('Cao nhất: 210 cây (2023)');
    expect(text).toContain('Thấp nhất: 120 cây (2019)');
    expect(text).toContain('từ 2021 đến 2022, tăng 40 cây');
    expect(text).toContain('Giảm mạnh nhất: từ 2020 đến 2021; từ 2023 đến 2024, giảm 10 cây');
  });

  it('lists every moment that ties for the highest value and skips a missing fall', () => {
    const text = describe(['A', 'B', 'C'], [5, 9, 9], 'kg').join(' ');
    expect(text).toContain('Cao nhất: 9 kg (B, C)');
    expect(text).not.toContain('Giảm mạnh nhất');
  });
});

group('goals', () => {
  const goal = (/** @type {string} */ id) => {
    const g = GOALS.find((x) => x.id === id);
    if (!g) throw new Error(id);
    return g;
  };
  it('checks each task', () => {
    expect(goal('tang').met(START)).toBe(false);
    expect(goal('tang').met([10, 20, 30, 40, 50, 60])).toBe(true);
    expect(goal('giam').met([60, 50, 40, 30, 20, 10])).toBe(true);
    expect(goal('dinh').met([10, 20, 30, 25, 20, 15])).toBe(true);
    expect(goal('dinh').met([10, 20, 30, 30, 20, 15])).toBe(false);
  });
});
