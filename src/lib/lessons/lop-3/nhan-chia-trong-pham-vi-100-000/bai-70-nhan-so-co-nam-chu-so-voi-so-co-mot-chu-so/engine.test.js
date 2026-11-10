import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { drawMul } from '../_shared/columns.js';
import { partsOf, partsSum } from './engine.js';

describe('the place-value model', () => {
  it('splits the number by place and skips a 0 digit', () => {
    expect(partsOf({ a: 31504, b: 3 }).map((p) => p.product)).toEqual([12, 1500, 3000, 90000]);
    expect(partsSum({ a: 31504, b: 3 }).replaceAll(GROUP, ' ')).toBe(
      '90 000 + 3 000 + 1 500 + 12 = 94 512',
    );
  });

  it('has parts that add up to the product', () => {
    const rand = rng(4);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const task = drawMul(rand, 'many');
      const sum = partsOf(task).reduce((s, p) => s + p.product, 0);
      if (sum !== task.a * task.b) bad.push(task);
    }
    expect(bad).toEqual([]);
  });
});
