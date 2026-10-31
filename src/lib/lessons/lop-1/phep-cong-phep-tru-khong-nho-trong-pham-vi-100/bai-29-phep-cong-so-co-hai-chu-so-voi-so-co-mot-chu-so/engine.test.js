import { describe, it, expect } from 'vitest';
import { FIRST, moveMessage } from './engine.js';
import { isNoCarry } from '../_shared/column.js';

describe('adding loose sticks to a two-digit number', () => {
  it('starts on a no-carry calculation', () => {
    expect(isNoCarry(FIRST.a, FIRST.b, '+')).toBe(true);
  });

  it('counts the loose sticks as they come in', () => {
    expect(moveMessage(41, 5, 0)).toContain('4 chục và 1 que rời');
    expect(moveMessage(41, 5, 2)).toBe('Hàng đơn vị đã có 3 que rời. Còn 3 que nữa.');
    expect(moveMessage(41, 5, 5)).toContain('4 chục và 6 que rời: 46 que tính');
  });

  it('reads round tens without "0 que rời"', () => {
    expect(moveMessage(30, 4, 0)).toContain('Có 30 que tính: 3 chục.');
    expect(moveMessage(30, 4, 4)).toContain('3 chục và 4 que rời: 34 que tính');
  });
});
