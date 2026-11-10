import { describe, expect, it } from 'vitest';
import { massParts, massTotal } from '../_shared/measures.js';
import {
  EMPTY,
  MAX_BLOCKS,
  TARGETS,
  breakBlock,
  canBreak,
  canJoin,
  joinBlocks,
  partsText,
  scaleMessage,
  swapText,
} from './engine.js';

describe('breaking and joining blocks', () => {
  it('keeps the mass when one block becomes ten smaller ones', () => {
    const parts = { ...EMPTY, ta: 3 };
    expect(canBreak(parts, 'ta')).toBe(true);
    const broken = breakBlock(parts, 'ta');
    expect(broken).toEqual({ tan: 0, ta: 2, yen: 10, kg: 0 });
    expect(massTotal(broken)).toBe(300);
    expect(canJoin(broken, 'yen')).toBe(true);
    expect(joinBlocks(broken, 'yen')).toEqual(parts);
  });

  it('breaks only into an empty smaller unit and never below the kilogram', () => {
    expect(canBreak({ ...EMPTY, ta: 1, yen: 2 }, 'ta')).toBe(false);
    expect(canBreak({ ...EMPTY, kg: 3 }, 'kg')).toBe(false);
    expect(canJoin({ ...EMPTY, tan: 9, ta: 10 }, 'ta')).toBe(false);
    expect(swapText('tan')).toBe('1 tấn = 10 tạ');
    expect(swapText('yen')).toBe('1 yến = 10 kg');
  });
});

describe('the scale', () => {
  it('can match every target with blocks it allows', () => {
    const bad = TARGETS.filter((t) => {
      const parts = massParts(t.kg);
      const fits = Object.entries(parts).every(
        ([id, n]) => n <= MAX_BLOCKS[/** @type {keyof typeof MAX_BLOCKS} */ (id)],
      );
      return !fits || !scaleMessage(t, parts).done;
    });
    expect(bad).toEqual([]);
  });

  it('says how far the scale is from the target', () => {
    const cow = TARGETS.find((t) => t.name === 'Con bò');
    if (!cow) throw new Error('no cow');
    expect(scaleMessage(cow, { ...EMPTY, ta: 3 }).text).toContain('Còn nhẹ hơn con bò 50 kg');
    expect(scaleMessage(cow, { ...EMPTY, ta: 4 }).text).toContain('Nặng hơn con bò 50 kg');
    const done = scaleMessage(cow, { ...EMPTY, ta: 2, yen: 15 });
    expect(done.done).toBe(true);
    expect(done.text).toContain('3 tạ 5 yến');
    expect(partsText({ ...EMPTY, ta: 3, yen: 10 })).toBe('3 tạ 10 yến');
  });
});
