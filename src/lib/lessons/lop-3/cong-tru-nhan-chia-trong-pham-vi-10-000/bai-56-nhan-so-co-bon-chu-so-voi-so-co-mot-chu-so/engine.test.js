import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { drawColumn } from '../_shared/columns.js';
import { partsOf, partsSum } from './engine.js';

describe('the area model', () => {
  it('splits the number by place', () => {
    expect(partsOf({ a: 1427, b: 3 }).map((p) => p.product)).toEqual([21, 60, 1200, 3000]);
    expect(partsSum({ a: 1427, b: 3 }).replaceAll(GROUP, ' ')).toBe(
      '3 000 + 1 200 + 60 + 21 = 4 281',
    );
  });

  it('has parts that add up to the product', () => {
    const rand = rng(4);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const task = drawColumn(rand, '×', 'many');
      const sum = partsOf(task).reduce((s, p) => s + p.product, 0);
      if (sum !== task.a * task.b) bad.push(task);
    }
    expect(bad).toEqual([]);
  });
});
