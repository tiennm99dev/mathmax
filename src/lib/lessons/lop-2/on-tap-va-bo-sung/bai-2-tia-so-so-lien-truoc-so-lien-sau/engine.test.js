import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  HI,
  SPAN,
  clampRay,
  judge,
  makeTask,
  neighbours,
  shown,
  slideWindow,
  targetOf,
} from './engine.js';

describe('number ray window', () => {
  it('keeps a shown number on each side of the frog', () => {
    const bad = [];
    let start = 0;
    for (const pos of [0, 1, 5, 6, 30, 29, 25, 99, 100, 50]) {
      start = slideWindow(start, pos);
      const nums = shown(start);
      if (!nums.includes(pos)) bad.push(['hidden', pos]);
      if (pos > 0 && !nums.includes(pos - 1)) bad.push(['before', pos]);
      if (pos < HI && !nums.includes(pos + 1)) bad.push(['after', pos]);
      if (nums[0] < 0 || nums[SPAN - 1] > HI) bad.push(['range', pos]);
    }
    expect(bad).toEqual([]);
  });

  it('stays put while the frog hops inside it', () => {
    expect(slideWindow(10, 11)).toBe(10);
    expect(slideWindow(10, 13)).toBe(10);
    expect(slideWindow(10, 14)).toBe(11);
    expect(slideWindow(10, 10)).toBe(9);
    expect(clampRay(-3)).toBe(0);
    expect(clampRay(104)).toBe(100);
  });

  it('names the numbers just before and after', () => {
    expect(neighbours(37)).toEqual({ before: 36, after: 38 });
    expect(neighbours(0)).toEqual({ before: null, after: 1 });
    expect(neighbours(99)).toEqual({ before: 98, after: 100 });
  });
});

describe('frog game', () => {
  it('targets one hop from the start, inside the ray', () => {
    const bad = [];
    let t = null;
    for (let seed = 1; seed <= 40; seed++) {
      const next = makeTask(rng(seed), t);
      if (t && next.kind === t.kind && next.n === t.n) bad.push(['repeat', seed]);
      const target = targetOf(next);
      if (Math.abs(target - next.n) !== 1 || target < 0 || target > HI) bad.push([seed, next]);
      t = next;
    }
    expect(bad).toEqual([]);
  });

  it('judges each kind of task', () => {
    expect(targetOf({ kind: 'sau', n: 37 })).toBe(38);
    expect(targetOf({ kind: 'truoc', n: 37 })).toBe(36);
    expect(targetOf({ kind: 'la-sau-cua', n: 45 })).toBe(44);
    expect(targetOf({ kind: 'la-truoc-cua', n: 45 })).toBe(46);
    expect(judge({ kind: 'sau', n: 37 }, 37).state).toBe('ask');
    expect(judge({ kind: 'sau', n: 37 }, 38).text).toContain('Số liền sau của 37 là 38');
    expect(judge({ kind: 'la-sau-cua', n: 45 }, 44).text).toContain('Số liền trước của 45 là 44');
    expect(judge({ kind: 'sau', n: 37 }, 36).text).toContain('nhảy tiến');
    expect(judge({ kind: 'truoc', n: 37 }, 35).text).toContain('xa quá');
  });
});
