import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { PAIRS, deepestLevel, lineText, signVerdict, windowAt } from './engine.js';

describe('zoom windows', () => {
  it('shows the thousand, hundred and ten around a number', () => {
    expect(windowAt(0, 3456)).toEqual({ lo: 0, hi: 10000, step: 1000 });
    expect(windowAt(1, 3456)).toEqual({ lo: 3000, hi: 4000, step: 100 });
    expect(windowAt(2, 3456)).toEqual({ lo: 3400, hi: 3500, step: 10 });
    expect(windowAt(3, 3456)).toEqual({ lo: 3450, hi: 3460, step: 1 });
    expect(windowAt(3, 10000)).toEqual({ lo: 9990, hi: 10000, step: 1 });
  });

  it('zooms only while both numbers stay in view', () => {
    expect(deepestLevel(5094, 5940)).toBe(1);
    expect(deepestLevel(3456, 3465)).toBe(2);
    expect(deepestLevel(9999, 10000)).toBe(3);
    expect(deepestLevel(4030, 4300)).toBe(1);
    const lost = [];
    for (const [a, b] of PAIRS) {
      for (let level = 0; level <= deepestLevel(a, b); level++) {
        const w = windowAt(level, Math.min(a, b));
        if ([a, b].some((v) => v < w.lo || v > w.hi)) lost.push([a, b, level]);
      }
    }
    expect(lost).toEqual([]);
  });

  it('says which number is on the left', () => {
    expect(lineText(2, 3456, 3465)).toContain(`${fmt(3456)} nằm bên trái ${fmt(3465)}`);
    expect(lineText(0, 3456, 3465)).toContain('phóng to');
    expect(lineText(0, 2468, 2468)).toContain('cùng một điểm');
  });
});

describe('picking the sign', () => {
  it('accepts the right sign with the reason', () => {
    const v = signVerdict(3456, 3465, '<');
    expect(v.ok).toBe(true);
    expect(v.text).toContain('hàng chục');
    expect(signVerdict(2468, 2468, '=').ok).toBe(true);
  });

  it('refuses a wrong sign without giving it away', () => {
    const v = signVerdict(1000, 999, '<');
    expect(v.ok).toBe(false);
    expect(v.text).toContain('không bé hơn');
  });
});
