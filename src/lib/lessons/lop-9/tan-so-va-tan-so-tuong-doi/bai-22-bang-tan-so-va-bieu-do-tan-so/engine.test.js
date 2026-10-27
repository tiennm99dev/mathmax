import { describe, expect, it } from 'vitest';
import {
  SAMPLE,
  TARGETS,
  compareToTarget,
  frequencyRows,
  joinValues,
  mostFrequent,
  summaryText,
} from './engine.js';

describe('frequency table of raw scores', () => {
  it('counts the opening sample', () => {
    expect(frequencyRows(SAMPLE)).toEqual([
      { value: 5, count: 1 },
      { value: 6, count: 2 },
      { value: 7, count: 5 },
      { value: 8, count: 7 },
      { value: 9, count: 3 },
      { value: 10, count: 2 },
    ]);
  });

  it('finds the most frequent values, ties included', () => {
    expect(mostFrequent(frequencyRows(SAMPLE))).toEqual({ count: 7, values: [8] });
    expect(mostFrequent(frequencyRows([6, 7, 7, 6, 9]))).toEqual({ count: 2, values: [6, 7] });
  });

  it('summarises the sample', () => {
    expect(summaryText(SAMPLE)).toBe(
      'Cỡ mẫu $n = 1 + 2 + 5 + 7 + 3 + 2 = 20$. Giá trị 8 có tần số lớn nhất (bằng 7).',
    );
    expect(summaryText([])).toMatch(/^Chưa có dữ liệu/);
    expect(summaryText([6, 7])).toMatch(/cùng tần số 1/);
    expect(joinValues([6, 7, 8])).toBe('6, 7 và 8');
  });

  it('compares a sample with a target table', () => {
    const target = TARGETS[0];
    expect(compareToTarget([6, 7, 9, 7, 6, 7], target).done).toBe(true);
    const off = compareToTarget([6, 7, 7, 7, 7, 10], target);
    expect(off.done).toBe(false);
    expect(off.text).toBe(
      'Chưa khớp: giá trị 6 còn thiếu 1; giá trị 7 thừa 1; giá trị 9 còn thiếu 1; giá trị 10 thừa 1.',
    );
  });
});
