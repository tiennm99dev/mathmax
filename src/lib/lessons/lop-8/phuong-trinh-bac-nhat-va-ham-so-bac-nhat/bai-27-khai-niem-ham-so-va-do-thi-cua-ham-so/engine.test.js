import { describe, expect, it } from 'vitest';
import { FUNCTIONS, TARGETS, graphRuns, place } from './engine.js';

describe('function machine', () => {
  it('computes the listed functions', () => {
    const [a, b, c, d] = FUNCTIONS.map((fn) => fn.f);
    expect(a(3)).toBe(5);
    expect(b(-2)).toBe(5);
    expect(c(-3)).toBe(5);
    expect(d(100)).toBe(3);
  });

  it('names where a point lies', () => {
    expect(place(0, 0)).toBe('là gốc toạ độ O');
    expect(place(2, 0)).toContain('trục hoành');
    expect(place(0, -1)).toContain('trục tung');
    expect(place(1, 1)).toContain('thứ I');
    expect(place(-1, 1)).toContain('thứ II');
    expect(place(-1, -1)).toContain('thứ III');
    expect(place(1, -1)).toContain('thứ IV');
    expect(TARGETS.length).toBeGreaterThan(3);
  });

  it('keeps graph runs inside the window', () => {
    const box = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
    const runs = graphRuns((x) => x * x - 4, box);
    expect(runs.length).toBe(1);
    for (const p of runs.flat()) expect(Math.abs(p.y)).toBeLessThanOrEqual(10);
    expect(graphRuns((x) => 2 * x - 1, box)[0][0].x).toBeGreaterThanOrEqual(-10);
  });
});
