import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { SETS, left, nextCard, rowReasons, take } from './engine.js';

describe('the card sets', () => {
  it('hold distinct numbers up to 100 000', () => {
    const bad = SETS.filter(
      (s) => new Set(s.numbers).size !== s.numbers.length || s.numbers.some((n) => n > 100000),
    );
    expect(bad).toEqual([]);
  });
});

describe('taking cards', () => {
  it('asks for the smallest or the largest card left', () => {
    expect(nextCard([76200, 76199, 67200, 76020], [], 'up')).toBe(67200);
    expect(nextCard([58000, 85000, 50800, 80500], [85000], 'down')).toBe(80500);
    expect(nextCard([1, 2], [1, 2], 'up')).toBeNull();
    expect(left([1, 2, 3], [2])).toEqual([1, 3]);
  });

  it('puts the right card in the row', () => {
    const r = take([99999, 100000, 9999, 90999], [], 'up', 9999);
    expect(r.ok).toBe(true);
    expect(r.row).toEqual([9999]);
    expect(r.text).toContain('bé nhất');
  });

  it('refuses a wrong card without naming the right one', () => {
    const r = take([99999, 100000, 9999, 90999], [9999], 'up', 99999);
    expect(r.ok).toBe(false);
    expect(r.row).toEqual([9999]);
    expect(r.text).toContain(`còn thẻ bé hơn ${fmt(99999)}`);
    expect(r.text).not.toContain(fmt(90999));
  });

  it('finishes every set in the sorted order with a reason per pair', () => {
    const bad = [];
    for (const s of SETS) {
      const sorted = [...s.numbers].sort((a, b) => (s.direction === 'up' ? a - b : b - a));
      /** @type {number[]} */
      let row = [];
      let last = '';
      for (const card of sorted) {
        const r = take(s.numbers, row, s.direction, card);
        if (!r.ok) bad.push([s.numbers, card]);
        row = r.row;
        last = r.text;
      }
      if (!last.startsWith('Xong rồi!')) bad.push(['end', s.numbers]);
      if (rowReasons(row).length !== row.length - 1) bad.push(['reasons', s.numbers]);
    }
    expect(bad).toEqual([]);
    expect(rowReasons([76199, 76200])[0]).toContain('Ở hàng trăm: 1 bé hơn 2.');
  });
});
