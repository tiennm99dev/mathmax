import { describe, it, expect } from 'vitest';
import { challengeResult } from './engine.js';

describe('choosing the points inside an angle', () => {
  it('accepts the exact set in any order', () => {
    expect(challengeResult(['P', 'T'], ['T', 'P']).ok).toBe(true);
    expect(challengeResult([], []).ok).toBe(true);
  });

  it('names wrong picks and counts missed points without naming them', () => {
    const r = challengeResult(['P', 'T'], ['P', 'Q']);
    expect(r.ok).toBe(false);
    expect(r.text).toContain('Q không nằm trong');
    expect(r.text).toContain('thiếu 1 điểm');
    expect(r.text).not.toContain('T');
  });
});
