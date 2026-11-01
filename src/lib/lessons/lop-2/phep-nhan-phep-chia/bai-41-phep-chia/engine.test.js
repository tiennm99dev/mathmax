import { describe, expect, it } from 'vitest';
import {
  CANDY,
  GROUP_PLATES,
  GROUP_TASKS,
  PLATE_ROOM,
  SHARE_TASKS,
  WIDTH,
  bowlSpot,
  counts,
  nextPlate,
  pictureHeight,
  plateAt,
  plateBox,
  plateSpot,
  sentences,
  spotOf,
  status,
} from './engine.js';

/**
 * @param {number} total
 * @returns {import('./engine.js').Where}
 */
const bowl = (total) => Array.from({ length: total }, () => null);

describe('sharing out', () => {
  it('asks only for whole answers that fit the plates', () => {
    const bad = [];
    for (const t of SHARE_TASKS) {
      if (t.total % t.parts !== 0 || t.total / t.parts > PLATE_ROOM) bad.push(t);
    }
    for (const t of GROUP_TASKS) {
      if (t.total % t.each !== 0 || t.total / t.each > GROUP_PLATES) bad.push(t);
    }
    expect(bad).toEqual([]);
  });

  it('solves every task by tapping alone', () => {
    const bad = [];
    for (const task of [...SHARE_TASKS, ...GROUP_TASKS]) {
      const where = bowl(task.total);
      for (let i = 0; i < task.total; i++) where[i] = nextPlate(task, where);
      if (!status(task, where).done) bad.push(task);
    }
    expect(bad).toEqual([]);
  });

  it('writes the same division for both meanings of 6 : 2', () => {
    const share = sentences({ mode: 'share', total: 6, parts: 2 });
    const group = sentences({ mode: 'group', total: 6, each: 2 });
    expect(share.division).toBe('6 : 2 = 3');
    expect(group.division).toBe('6 : 2 = 3');
    expect(share.result).toBe('Mỗi bạn được 3 cái kẹo.');
    expect(group.result).toBe('Chia được cho 3 bạn.');
    expect(share.multiplication).toBe('3 × 2 = 6');
    expect(group.multiplication).toBe('2 × 3 = 6');
  });

  it('keeps the blank free of the answer', () => {
    expect(sentences({ mode: 'share', total: 8, parts: 2 }).blank).toBe('8 : 2 = ?');
  });
});

describe('checking the plates', () => {
  const share = /** @type {const} */ ({ mode: 'share', total: 6, parts: 2 });
  const group = /** @type {const} */ ({ mode: 'group', total: 6, each: 2 });

  it('counts plates', () => {
    expect(counts([0, 1, 0, null], 3)).toEqual([2, 1, 0]);
  });

  it('wants equal plates when sharing', () => {
    expect(status(share, [0, 0, 1, null, null, null]).text).toContain('Còn 3 cái');
    expect(status(share, [0, 0, 0, 0, 1, 1]).text).toContain('phải bằng nhau');
    expect(status(share, [0, 0, 0, 1, 1, 1])).toMatchObject({ done: true });
  });

  it('wants full plates when giving a set number', () => {
    expect(status(group, [0, 0, 0, null, null, null]).text).toContain('chỉ được 2 cái');
    expect(status(group, [0, 0, 1, 1, 2, 3]).text).toContain('đủ 2 cái');
    expect(status(group, [0, 0, 2, 2, 4, 4])).toMatchObject({ done: true });
    expect(status(group, [0, 0, 1, 1, 2, 2]).text).toContain('Chia được cho 3 bạn');
  });
});

describe('the picture', () => {
  it('keeps every spot on the picture and candy inside its plate', () => {
    const bad = [];
    for (let id = 0; id < 12; id++) {
      const s = bowlSpot(id);
      if (s.x < 0 || s.x + CANDY > WIDTH) bad.push(['bowl', id]);
    }
    for (let p = 0; p < GROUP_PLATES; p++) {
      const box = plateBox(p);
      for (let slot = 0; slot < PLATE_ROOM; slot++) {
        const s = plateSpot(p, slot);
        if (s.x < box.x || s.x + CANDY > box.x + box.w) bad.push(['x', p, slot]);
        if (s.y < box.y || s.y + CANDY > box.y + box.h) bad.push(['y', p, slot]);
      }
      if (box.x + box.w > WIDTH || box.y + box.h > pictureHeight(GROUP_PLATES)) bad.push(['p', p]);
    }
    expect(bad).toEqual([]);
  });

  it('finds the plate under a point', () => {
    const b = plateBox(4);
    expect(plateAt(b.x + 1, b.y + 1, 6)).toBe(4);
    expect(plateAt(b.x + 1, b.y + 1, 2)).toBe(null);
    expect(plateAt(1, 1, 6)).toBe(null);
  });

  it('places a candy by its order on the plate', () => {
    expect(spotOf([null, 1, 1], 2)).toEqual(plateSpot(1, 1));
    expect(spotOf([null, 1, 1], 0)).toEqual(bowlSpot(0));
  });
});
