import { describe, expect, it } from 'vitest';
import { SCENARIOS, sides, snapX, total, xForTop } from './engine.js';

/** @param {import('./engine.js').Scenario} s */
function grid(s) {
  const out = [];
  for (let x = s.min; x <= s.max + 1e-9; x += s.step) out.push(snapX(s, x));
  return out;
}

describe('word-problem bar models', () => {
  it('the bars match at the solution and nowhere else on the grid', () => {
    for (const s of SCENARIOS) {
      expect(sides(s, s.solution).diff).toBeCloseTo(0, 9);
      const hits = grid(s).filter((x) => Math.abs(sides(s, x).diff) < 1e-9);
      expect(hits).toEqual([s.solution]);
    }
  });

  it('the solution meets the condition and the bars fit the drawing', () => {
    for (const s of SCENARIOS) {
      expect(s.solution).toBeGreaterThan(s.id === 'nang-suat' ? 2 : 0);
      for (const x of [s.min, s.max]) {
        expect(total(s.top(x))).toBeLessThanOrEqual(s.scaleMax);
        expect(total(s.bottom(x))).toBeLessThanOrEqual(s.scaleMax);
      }
    }
  });

  it('known answers: meeting after 2 h, catching up at 10 h, 600 products', () => {
    const [a, b, c] = SCENARIOS;
    expect(sides(a, 2).left).toBe(180);
    expect(sides(b, 2).left).toBe(120);
    expect(sides(c, 12).left).toBe(600);
  });

  it('snaps x and reads it back from the top bar', () => {
    const s = SCENARIOS[0];
    expect(snapX(s, 1.234)).toBe(1.2);
    expect(snapX(s, -3)).toBe(0);
    expect(snapX(SCENARIOS[2], 1)).toBe(3);
    expect(xForTop(s, 180)).toBe(2);
    expect(xForTop(SCENARIOS[2], 600)).toBe(12);
  });
});

describe('table rows', () => {
  it('each row value is its last-cell expression', () => {
    for (const s of SCENARIOS) {
      for (const row of s.rows) {
        const expr = row.cells[row.cells.length - 1];
        const f = new Function(
          'x',
          `return ${expr.replace(/(\d)x/g, '$1*x').replace(/(\d)\(/g, '$1*(')};`,
        );
        for (const x of [s.min, s.solution, s.max]) expect(row.value(x)).toBeCloseTo(f(x), 9);
      }
    }
  });
});
