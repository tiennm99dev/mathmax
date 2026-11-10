import { describe, expect, it } from 'vitest';
import { kindOf } from '../_shared/angle.js';
import { BINS, GOALS, SORT_ANGLES, compareText, goalMessage, sortCards } from './engine.js';

describe('naming by comparing with 90°', () => {
  it('writes the comparison with a right angle', () => {
    expect([40, 90, 135, 180].map(compareText)).toEqual([
      '40° < 90°',
      '90° = 90°',
      '135° > 90°',
      '180° = 90° + 90°',
    ]);
  });

  it('accepts exactly the angles of the asked kind', () => {
    const bad = [];
    for (const goal of GOALS)
      for (let m = 5; m <= 180; m += 5)
        if (goalMessage(m, goal).done !== (kindOf(m) === goal)) bad.push([goal, m]);
    expect(bad).toEqual([]);
    expect(goalMessage(120, 'nhon').text).toContain('lại gần');
    expect(goalMessage(40, 'tu').text).toContain('qua vạch nét đứt');
    expect(goalMessage(90, 'tu').text).toContain('qua vạch nét đứt');
    expect(goalMessage(175, 'tu').text).toContain('góc tù');
  });
});

describe('angle cards', () => {
  it('fill every bin and tell the measure on each card', () => {
    const cards = sortCards();
    expect(new Set(cards.map((c) => c.bin))).toEqual(new Set(BINS.map((b) => b.id)));
    expect(cards.every((c, i) => c.label.endsWith(`${SORT_ANGLES[i].m}°`))).toBe(true);
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
  });
});
