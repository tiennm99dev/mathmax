import { describe, it, expect } from 'vitest';
import { CHALLENGES, START, TOTAL, check, rows } from './engine.js';

describe('pie chart rows', () => {
  it('starts with the whole class', () => {
    expect(START.reduce((s, d) => s + d.value, 0)).toBe(TOTAL);
  });

  it('gives each student 2.5% and 9°', () => {
    const r = rows(START);
    expect(r.map((x) => x.percent)).toEqual([25, 35, 15, 25]);
    expect(r.map((x) => x.angle)).toEqual([90, 126, 54, 90]);
    expect(r.reduce((s, x) => s + x.angle, 0)).toBe(360);
  });

  it('rounds values the chart hands back to whole students', () => {
    const r = rows([
      { label: 'a', value: 9.999999999 },
      { label: 'b', value: 30.000000001 },
    ]);
    expect(r.map((x) => x.count)).toEqual([10, 30]);
    expect(r[0].percent).toBe(25);
  });

  it('handles an empty chart', () => {
    expect(rows([{ label: 'a', value: 0 }])[0].percent).toBe(0);
  });
});

describe('challenges', () => {
  it('have counts that fill the class and match their text', () => {
    for (const c of CHALLENGES)
      expect(
        c.counts.reduce((s, n) => s + n, 0),
        c.id,
      ).toBe(TOTAL);
    const pct = CHALLENGES[0].counts.map((n) => (n * 100) / TOTAL);
    expect(pct).toEqual([25, 40, 15, 20]);
    const deg = CHALLENGES[2].counts.map((n) => (n * 360) / TOTAL);
    expect(deg).toEqual([90, 180, 36, 54]);
  });

  it('says which slice is off, then reports success', () => {
    const c = CHALLENGES[0];
    const miss = check(START, c);
    expect(miss.done).toBe(false);
    expect(miss.text).toContain('Xe đạp');
    expect(miss.text).toContain('lớn hơn');
    const data = START.map((d, i) => ({ ...d, value: c.counts[i] }));
    expect(check(data, c).done).toBe(true);
  });
});
