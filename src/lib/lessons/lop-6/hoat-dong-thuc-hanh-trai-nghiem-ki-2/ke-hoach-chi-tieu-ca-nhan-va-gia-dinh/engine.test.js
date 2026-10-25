import { describe, it, expect } from 'vitest';
import {
  PRESETS,
  balanceVerdict,
  budgetReport,
  compareWithTarget,
  percentOf,
  roundMoney,
  roundTo,
} from './engine.js';

const money = (/** @type {number} */ n) => String(n);
const pct = (/** @type {number} */ n) => String(roundTo(n, 2));

describe('percentOf and rounding', () => {
  it('gives the share in percent', () => {
    expect(percentOf(1200000, 3000000)).toBe(40);
    expect(roundTo(percentOf(700000, 3000000), 2)).toBe(23.33);
    expect(roundTo(percentOf(200000, 3000000), 2)).toBe(6.67);
    expect(percentOf(5, 0)).toBe(0);
  });
  it('rounds half away from zero without drift', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
    expect(roundTo(52.727, 0)).toBe(53);
  });
  it('rounds money to the nearest ten thousand', () => {
    expect(roundMoney(2000000 / 3)).toBe(670000);
    expect(roundMoney(2000000 / 3, 100000)).toBe(700000);
  });
});

describe('budgetReport', () => {
  it('reproduces the book table for anh Bình', () => {
    const p = PRESETS[0];
    const r = budgetReport(p.items, p.income);
    expect(r.total).toBe(3000000);
    expect(r.balance).toBe(0);
    expect(r.rows.map((x) => roundTo(x.percent, 2))).toEqual([
      23.33, 3.33, 40, 6.67, 5, 3.33, 8.33, 6.67, 3.33,
    ]);
    expect(r.rows.reduce((s, x) => s + x.percent, 0)).toBeCloseTo(100, 9);
  });

  it('groups the family week into 2 900 000, 2 100 000 and 500 000 đồng', () => {
    const p = PRESETS[1];
    const r = budgetReport(p.items, p.income);
    expect(r.total).toBe(5500000);
    expect(r.groups.map((g) => g.amount)).toEqual([2900000, 2100000, 500000]);
    expect(r.groups.map((g) => roundTo(g.percent, 0))).toEqual([53, 38, 9]);
    expect(r.balance).toBe(500000);
  });
});

describe('balanceVerdict', () => {
  it('flags overspending, an exact fit and savings', () => {
    expect(balanceVerdict(110, 100, money, pct)).toContain('vượt thu 10');
    expect(balanceVerdict(100, 100, money, pct)).toContain('vừa hết');
    expect(balanceVerdict(90, 100, money, pct)).toContain('Còn dư 10 đồng, bằng 10%');
  });
});

describe('compareWithTarget', () => {
  it('marks shares close to, above and below the target', () => {
    const res = compareWithTarget(
      [
        { short: 'A', percent: 52 },
        { short: 'B', percent: 25 },
        { short: 'C', percent: 23 },
      ],
      [50, 40, 10],
    );
    expect(res.map((x) => x.status)).toEqual(['ok', 'under', 'over']);
  });
});
