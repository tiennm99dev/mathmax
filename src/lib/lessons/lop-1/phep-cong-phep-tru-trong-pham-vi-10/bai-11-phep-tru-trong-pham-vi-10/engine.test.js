import { describe, it, expect } from 'vitest';
import { countGone, feedback, freshBranch, story, toggleBird, zeroNote } from './engine.js';

describe('birds on a branch engine', () => {
  it('starts with every bird on the branch', () => {
    expect(freshBranch(4)).toEqual([false, false, false, false]);
  });

  it('lets a bird leave and come back', () => {
    const once = toggleBird(freshBranch(5), 2);
    expect(countGone(once)).toBe(1);
    expect(countGone(toggleBird(once, 2))).toBe(0);
  });

  it('tells the subtraction for both meanings', () => {
    expect(story('bot', 6, 2)).toBe(
      'Trên cành có 6 con chim. 2 con bay đi. Trên cành còn lại 4 con. Ta viết 6 − 2 = 4.',
    );
    expect(story('tach', 5, 5)).toContain('không còn con nào');
    expect(story('tach', 5, 5)).toContain('5 − 5 = 0');
  });

  it('points out the zero cases', () => {
    expect(zeroNote(7, 0)).toContain('7 − 0 = 7');
    expect(zeroNote(7, 7)).toContain('7 − 7 = 0');
    expect(zeroNote(7, 3)).toBe('');
    expect(feedback('bot', 3, 1)).toContain('ba trừ một bằng hai');
  });

  it('keeps every subtraction right', () => {
    const bad = [];
    for (let n = 1; n <= 10; n++) {
      for (let k = 0; k <= n; k++) {
        if (!story('bot', n, k).includes(`${n} − ${k} = ${n - k}`)) bad.push([n, k]);
      }
    }
    expect(bad).toEqual([]);
  });
});
