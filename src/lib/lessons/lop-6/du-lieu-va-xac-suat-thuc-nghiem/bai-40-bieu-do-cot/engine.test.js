import { describe, it, expect } from 'vitest';
import { AXIS_MAX, GOAL, SPORTS, barStatus, readings } from './engine.js';

describe('bar chart readings', () => {
  it('reads the class table', () => {
    const r = readings(SPORTS, GOAL);
    expect(r.total).toBe(40);
    expect(r.highest).toEqual(['Bóng đá']);
    expect(r.lowest).toEqual(['Bóng rổ']);
    expect(r.gap).toBe(8);
  });

  it('lists every tied bar', () => {
    expect(readings(['A', 'B', 'C'], [3, 5, 5]).highest).toEqual(['B', 'C']);
  });

  it('checks a drawn chart bar by bar', () => {
    expect(barStatus([12, 6, 6, 5, 10], GOAL)).toEqual([
      { ok: true, text: 'Đúng' },
      { ok: false, text: 'Thấp hơn 2' },
      { ok: true, text: 'Đúng' },
      { ok: false, text: 'Cao hơn 1' },
      { ok: true, text: 'Đúng' },
    ]);
  });

  it('fits the table under the axis', () => {
    expect(Math.max(...GOAL)).toBeLessThanOrEqual(AXIS_MAX);
    expect(GOAL).toHaveLength(SPORTS.length);
  });
});
