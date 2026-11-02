import { describe, expect, it } from 'vitest';
import { fewestNotes, sumNotes } from '../_shared/money.js';
import { GOODS, MAX_TRAY, SWAPS, payFeedback, swapCount, swapFeedback } from './engine.js';

describe('the shop', () => {
  it('sells goods that notes can pay within the tray', () => {
    const bad = GOODS.filter((g) => {
      const notes = fewestNotes(g.price);
      return !notes || sumNotes(notes) !== g.price || notes.length > MAX_TRAY;
    });
    expect(bad).toEqual([]);
  });

  it('accepts only the exact price', () => {
    const good = { picture: /** @type {const} */ ('star'), name: 'ngôi sao giấy', price: 300 };
    expect(payFeedback(good, []).done).toBe(false);
    expect(payFeedback(good, [100]).text).toContain('Còn thiếu 200 đồng');
    expect(payFeedback(good, [500]).text).toContain('nhiều hơn giá 200 đồng');
    expect(payFeedback(good, [200, 100])).toMatchObject({ done: true });
  });

  it('praises the fewest notes and names them otherwise', () => {
    const good = { picture: /** @type {const} */ ('star'), name: 'ngôi sao giấy', price: 300 };
    expect(payFeedback(good, [200, 100]).text).toContain('ít tờ tiền nhất');
    expect(payFeedback(good, [100, 100, 100]).text).toContain('1 tờ 200 đồng và 1 tờ 100 đồng');
  });
});

describe('swapping notes', () => {
  it('has swaps that come out whole', () => {
    expect(SWAPS.filter((s) => !Number.isInteger(swapCount(s)) || swapCount(s) < 2)).toEqual([]);
    expect(swapCount({ big: 500, small: 100 })).toBe(5);
    expect(swapCount({ big: 1000, small: 200 })).toBe(5);
    expect(swapCount({ big: 1000, small: 500 })).toBe(2);
  });

  it('counts up to the big note', () => {
    const swap = /** @type {const} */ ({ big: 500, small: 100 });
    expect(swapFeedback(swap, 0).done).toBe(false);
    expect(swapFeedback(swap, 3).text).toBe('Có 3 tờ: 300 đồng. Cần đủ 500 đồng.');
    expect(swapFeedback(swap, 5)).toEqual({
      done: true,
      text: 'Đúng rồi! 5 tờ 100 đồng đổi được 1 tờ 500 đồng.',
    });
  });
});
