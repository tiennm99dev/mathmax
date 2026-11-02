import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { freshCarry } from '#lib/core/kid/carry.js';
import { canTake, differenceOptions, table, tableMessage } from './engine.js';

describe('taking sticks away with one bundle untied', () => {
  it('needs a bundle untied once the loose sticks run out', () => {
    expect(canTake(table(42, 7, false, 1))).toBe(true);
    expect(canTake(table(42, 7, false, 2))).toBe(false);
    expect(tableMessage(42, 7, false, 2)).toContain('Em tháo 1 bó');
    expect(table(42, 7, true, 2)).toEqual({ tens: 3, ones: 12, taken: 2, left: 5 });
    expect(canTake(table(42, 7, true, 7))).toBe(false);
    expect(tableMessage(42, 7, true, 7)).toContain('3 chục và 5 que rời, tức là 35');
  });

  it('ends on the difference however the sticks are taken', () => {
    const bad = [];
    const rand = rng(4);
    let prev;
    for (let i = 0; i < 80; i++) {
      const p = freshCarry(rand, 'sub-one', prev);
      // Untie first, then take every stick.
      const t = table(p.a, p.b, true, p.b);
      if (t.tens * 10 + t.ones - t.taken !== p.a - p.b) bad.push(['table', p]);
      // Without untying, the loose sticks never cover the number taken away.
      if (canTake(table(p.a, p.b, false, p.a % 10))) bad.push(['untie', p]);
      const { options, answer } = differenceOptions(rand, p.a, p.b);
      if (options[answer] !== String(p.a - p.b)) bad.push(['answer', p, options]);
      if (new Set(options).size !== 4) bad.push(['options', p, options]);
      prev = p;
    }
    expect(bad).toEqual([]);
  });
});
