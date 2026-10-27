import { describe, it, expect } from 'vitest';
import { PROBLEMS, answerOf, measure, rootsOf } from './engine.js';

const byId = (/** @type {string} */ id) => {
  const p = PROBLEMS.find((q) => q.id === id);
  if (!p) throw new Error(id);
  return p;
};

describe('word problems', () => {
  it('the garden keeps 8 and rejects −12', () => {
    const roots = rootsOf(byId('vuon'));
    expect(roots.map((r) => [r.value, r.keep])).toEqual([
      [8, true],
      [-12, false],
    ]);
    expect(roots[1].reason).toContain('loại');
  });

  it('the car keeps 30 and rejects −40', () => {
    expect(rootsOf(byId('xe')).map((r) => [r.value, r.keep])).toEqual([
      [30, true],
      [-40, false],
    ]);
  });

  it('only the answer fits the story on the slider', () => {
    for (const p of PROBLEMS) {
      const answer = answerOf(p);
      expect((answer - p.min) % p.step).toBe(0);
      for (let x = p.min; x <= p.max; x += p.step) {
        expect(measure(p, x).ok, `${p.id} at ${x}`).toBe(x === answer);
      }
    }
  });

  it('the answer checks against the statement itself', () => {
    const w = answerOf(byId('vuon'));
    expect(w * (w + 4)).toBe(96);
    const v = answerOf(byId('xe'));
    expect(120 / v - 120 / (v + 10)).toBe(1);
  });

  it('describes the dragged value', () => {
    expect(measure(byId('vuon'), 6).text).toContain('6 · 10 = 60 m², nhỏ hơn 96 m²');
    expect(measure(byId('xe'), 30).text).toContain('Sớm hơn 1 giờ');
    expect(measure(byId('xe'), 20).text).toContain('nhiều hơn 1 giờ');
  });
});
