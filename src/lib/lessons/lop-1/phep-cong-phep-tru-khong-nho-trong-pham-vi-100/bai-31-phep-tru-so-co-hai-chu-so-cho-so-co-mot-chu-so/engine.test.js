import { describe, it, expect } from 'vitest';
import { FIRST, crossedCount, freshRow, takeMessage, toggle } from './engine.js';
import { isNoCarry } from '../_shared/column.js';

describe('taking loose sticks away from a two-digit number', () => {
  it('starts on a no-borrow calculation', () => {
    expect(isNoCarry(FIRST.a, FIRST.b, '-')).toBe(true);
  });

  it('crosses out and puts back loose sticks', () => {
    let row = freshRow(76);
    expect(row).toHaveLength(6);
    row = toggle(row, 0);
    row = toggle(row, 3);
    expect(crossedCount(row)).toBe(2);
    expect(crossedCount(toggle(row, 3))).toBe(1);
  });

  it('guides the child to take away exactly b sticks', () => {
    expect(takeMessage(76, 5, 0).text).toContain('7 chục và 6 que rời');
    expect(takeMessage(76, 5, 3).text).toBe('Em đã bớt 3 que. Bớt thêm 2 que nữa.');
    expect(takeMessage(76, 5, 6).text).toContain('nhiều quá');
    expect(takeMessage(76, 5, 5)).toEqual({
      done: true,
      text: 'Bớt 5 que rời, còn 1 que rời. Bó chục giữ nguyên. Còn lại 7 chục và 1 que rời: 71 que tính. Bây giờ em đặt tính nhé.',
    });
    expect(takeMessage(48, 8, 8).text).toContain('Còn lại 4 chục: 40 que tính');
  });
});
