import { describe, expect, it } from 'vitest';
import { TASKS, canFill, cannotFillMessage, finish, leftOver, progressMessage } from './engine.js';

describe('sweets into bags', () => {
  it('fills bags until too few are left', () => {
    const task = { total: 9, per: 2 };
    expect(leftOver(task, 3)).toBe(3);
    expect(canFill(task, 3)).toBe(true);
    expect(canFill(task, 4)).toBe(false);
    expect(progressMessage(task, 1)).toBe('Đã đóng 1 túi. Còn 7 cái kẹo.');
  });

  it('refuses to stop while another bag fits', () => {
    const stop = finish({ total: 9, per: 2 }, 3);
    expect(stop.done).toBe(false);
    expect(stop.text).toContain('Số dư phải bé hơn số chia');
  });

  it('names an exact division and a division with a remainder', () => {
    expect(finish({ total: 8, per: 2 }, 4)).toEqual({
      done: true,
      text: '8 : 2 = 4. Đây là phép chia hết.',
    });
    expect(finish({ total: 9, per: 2 }, 4)).toEqual({
      done: true,
      text: '9 : 2 = 4 (dư 1). Đây là phép chia có dư. Số dư 1 bé hơn số chia 2.',
    });
  });

  it('says why no bag can be filled', () => {
    expect(cannotFillMessage({ total: 8, per: 2 }, 4)).toContain('Hết kẹo');
    expect(cannotFillMessage({ total: 9, per: 2 }, 4)).toContain('Chỉ còn 1 cái kẹo');
  });

  it('holds both kinds of division, within the tables', () => {
    const rests = TASKS.map((t) => t.total % t.per);
    expect(rests.filter((r) => r === 0).length).toBeGreaterThan(2);
    expect(rests.filter((r) => r > 0).length).toBeGreaterThan(2);
    expect(TASKS.filter((t) => Math.floor(t.total / t.per) > 9)).toEqual([]);
  });
});
