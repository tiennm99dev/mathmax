import { describe, expect, it } from 'vitest';
import { MAX_COUNT, SURVEYS, cleanCount, setCount, surveySummary } from './engine.js';

describe('the class survey sheet', () => {
  it('keeps typed counts whole and in range', () => {
    expect(cleanCount('7')).toBe(7);
    expect(cleanCount(-3)).toBe(0);
    expect(cleanCount('abc')).toBe(0);
    expect(cleanCount(2.6)).toBe(3);
    expect(cleanCount(999)).toBe(MAX_COUNT);
    expect(setCount([1, 2, 3], 1, '9')).toEqual([1, 9, 3]);
  });

  it('gives every survey a sample with one count per choice', () => {
    const bad = SURVEYS.filter(
      (s) => s.sample.length !== s.choices.length || s.sample.some((n) => n > MAX_COUNT),
    );
    expect(bad).toEqual([]);
  });

  it('sums up the total, the most, the fewest and the gap', () => {
    const rows = [
      { label: 'Vườn thú', count: 12 },
      { label: 'Bảo tàng', count: 7 },
      { label: 'Công viên nước', count: 15 },
    ];
    expect(surveySummary(rows)).toBe(
      'Đã ghi 34 câu trả lời. Nhiều nhất: Công viên nước (15 bạn). Ít nhất: Bảo tàng (7 bạn). Số bạn chọn Công viên nước nhiều hơn số bạn chọn Bảo tàng là 8 bạn.',
    );
    expect(surveySummary(rows.map((r) => ({ ...r, count: 0 })))).toContain('Chưa có');
    expect(surveySummary(rows.map((r) => ({ ...r, count: 4 })))).toContain('bằng nhau');
  });
});
