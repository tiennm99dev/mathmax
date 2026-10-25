import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  BOOK,
  SPORTS,
  bookTables,
  favouriteText,
  randomSheet,
  ranking,
  tally,
  topIndices,
  total,
} from './engine.js';

const pct = (/** @type {number} */ v) => String(Math.round(v * 100) / 100);

describe('the book survey', () => {
  it('has 1 200 sheets split the same way by gender and by grade group', () => {
    const t = bookTables();
    expect(t.all).toEqual([670, 150, 78, 55, 60, 90, 30, 67]);
    expect(total(t.all)).toBe(1200);
    expect(total(BOOK.boys)).toBe(872);
    expect(total(BOOK.girls)).toBe(328);
    expect(total(BOOK.lower)).toBe(502);
    expect(total(BOOK.upper)).toBe(698);
    expect(t.lower.map((x, i) => x + t.upper[i])).toEqual(t.all);
  });

  it('names football the favourite and ranks the groups as the book does', () => {
    const t = bookTables();
    expect(topIndices(t.all)).toEqual([0]);
    expect(
      ranking(t.girls)
        .slice(0, 3)
        .map((i) => SPORTS[i]),
    ).toEqual(['Bóng đá', 'Đá cầu', 'Bóng chuyền']);
    expect(
      ranking(t.upper)
        .slice(0, 2)
        .map((i) => SPORTS[i]),
    ).toEqual(['Bóng đá', 'Bóng chuyền']);
  });
});

describe('tally', () => {
  it('fills the three tables from answer sheets', () => {
    const t = tally([
      { gender: 'nam', grades: '6-7', sport: 0 },
      { gender: 'nu', grades: '8-9', sport: 0 },
      { gender: 'nu', grades: '6-7', sport: 5 },
    ]);
    expect(t.all.slice(0, 6)).toEqual([2, 0, 0, 0, 0, 1]);
    expect(t.boys[0]).toBe(1);
    expect(t.girls[0] + t.girls[5]).toBe(2);
    expect(t.lower[5]).toBe(1);
    expect(t.upper[0]).toBe(1);
  });
});

describe('favouriteText', () => {
  it('reports one favourite, a tie, or no data', () => {
    expect(favouriteText([3, 1, 0], 'cả lớp', pct)).toBe(
      'Cả lớp: Bóng đá được chọn nhiều nhất (3 phiếu, 75%).',
    );
    expect(favouriteText([2, 2, 0], 'cả lớp', pct)).toContain('Bóng đá, Đá cầu cùng');
    expect(favouriteText([0, 0], 'cả lớp', pct)).toBe('Chưa có phiếu nào của cả lớp.');
  });
});

describe('randomSheet', () => {
  it('draws valid sheets, never aerobics for boys', () => {
    const rand = rng(7);
    for (let k = 0; k < 500; k++) {
      const s = randomSheet(rand);
      expect(s.sport).toBeGreaterThanOrEqual(0);
      expect(s.sport).toBeLessThan(SPORTS.length);
      if (s.gender === 'nam') expect(s.sport).not.toBe(6);
    }
  });
});
