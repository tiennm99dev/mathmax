import { describe, expect, it } from 'vitest';
import { SURVEYS, countVotes, sampleVotes, surveySummary } from './engine.js';

describe('the class survey board', () => {
  it('counts votes per choice', () => {
    expect(countVotes([0, 2, 0, 1, 0], 3)).toEqual([3, 1, 1]);
    expect(countVotes([], 2)).toEqual([0, 0]);
  });

  it('gives each sample one number per choice, and rebuilds them from votes', () => {
    const bad = SURVEYS.filter((s) => {
      const counts = countVotes(sampleVotes(s), s.choices.length);
      return s.sample.length !== s.choices.length || counts.join() !== s.sample.join();
    });
    expect(bad).toEqual([]);
  });

  it('sums up empty, tied and clear results', () => {
    const rows = (/** @type {number[]} */ ...n) => n.map((count, i) => ({ label: `L${i}`, count }));
    expect(surveySummary(rows(0, 0))).toContain('Chưa có');
    expect(surveySummary(rows(2, 2))).toContain('bằng nhau, mỗi loại 2 phiếu');
    expect(surveySummary(rows(3, 2, 2))).toBe(
      'Đã ghi 7 phiếu. Nhiều nhất: L0 (3 phiếu). Ít nhất: L1 và L2 (2 phiếu).',
    );
  });
});
