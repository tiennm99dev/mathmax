import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { freshCarry } from '../_shared/carry.js';
import { sumOptions, table, tableMessage } from './engine.js';

describe('adding sticks one at a time', () => {
  it('ties ten loose sticks into a bundle', () => {
    expect(table(35, 7, 4)).toEqual({ tens: 3, ones: 9, left: 3, tied: false });
    expect(table(35, 7, 5)).toEqual({ tens: 4, ones: 0, left: 2, tied: true });
    expect(table(35, 7, 7)).toEqual({ tens: 4, ones: 2, left: 0, tied: true });
  });

  it('says what is missing, then reads the sum', () => {
    expect(tableMessage(35, 7, 3)).toContain('Còn thiếu 2 que');
    expect(tableMessage(35, 7, 5)).toContain('bó thành 1 chục');
    expect(tableMessage(35, 7, 7)).toContain('4 chục và 2 que rời, tức là 42');
  });

  it('offers options that hold the sum and the forgotten carry', () => {
    const bad = [];
    const rand = rng(9);
    let prev;
    for (let i = 0; i < 80; i++) {
      const p = freshCarry(rand, 'add-one', prev);
      const { options, answer } = sumOptions(rand, p.a, p.b);
      if (options[answer] !== String(p.a + p.b)) bad.push(['answer', p, options]);
      if (!options.includes(String(p.a + p.b - 10))) bad.push(['carry', p, options]);
      if (new Set(options).size !== options.length || options.length !== 4) bad.push(options);
      const end = table(p.a, p.b, p.b);
      if (end.tens * 10 + end.ones !== p.a + p.b) bad.push(['table', p]);
      prev = p;
    }
    expect(bad).toEqual([]);
  });
});
