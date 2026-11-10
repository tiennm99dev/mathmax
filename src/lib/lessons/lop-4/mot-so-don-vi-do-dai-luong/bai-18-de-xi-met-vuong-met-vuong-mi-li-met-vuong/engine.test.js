import { describe, expect, it } from 'vitest';
import { convertArea } from '../_shared/measures.js';
import { FULL, LEVELS, fillBy, fillMessage } from './engine.js';

describe('zoom levels', () => {
  it('each big square holds 100 small ones', () => {
    const bad = LEVELS.filter((l) => convertArea(1, l.big.id, l.small.id) !== FULL);
    expect(bad).toEqual([]);
    expect(LEVELS.map((l) => l.small.id)).toEqual(['dm2', 'cm2', 'mm2']);
  });

  it('chains each small unit into the next big one', () => {
    for (let i = 1; i < LEVELS.length; i++) expect(LEVELS[i].big).toBe(LEVELS[i - 1].small);
  });
});

describe('filling squares', () => {
  it('stays from 0 to 100', () => {
    expect(fillBy(95, 10)).toBe(100);
    expect(fillBy(5, -10)).toBe(0);
  });

  it('counts the squares left and closes with the conversion', () => {
    const [m] = LEVELS;
    expect(fillMessage(m, 34).text).toContain('3 hàng và 4 ô');
    expect(fillMessage(m, 34).text).toContain('Còn 66 dm² nữa là đủ 1 m²');
    expect(fillMessage(m, 20).text).toContain('2 hàng, mỗi hàng 10 ô');
    const done = fillMessage(LEVELS[1], 100);
    expect(done.done).toBe(true);
    expect(done.text).toContain('1 dm² = 100 cm²');
  });
});
