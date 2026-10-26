import { describe, it, expect } from 'vitest';
import { MAX_AREA, MAX_LEVEL, MIN_AREA, bracketAt, bracketText, tryDigit } from './engine.js';

describe('trapping √2', () => {
  it('finds 1 < √2 < 2, then 1,4 < √2 < 1,5, then 1,41 < √2 < 1,42', () => {
    expect(bracketText(2, 0)).toMatchObject({ lo: '1', hi: '2', loSquare: '1', hiSquare: '4' });
    expect(bracketText(2, 1)).toMatchObject({
      lo: '1,4',
      hi: '1,5',
      loSquare: '1,96',
      hiSquare: '2,25',
    });
    expect(bracketText(2, 2)).toMatchObject({ lo: '1,41', loSquare: '1,9881', hiSquare: '2,0164' });
    expect(bracketText(2, 3).lo).toBe('1,414');
  });

  it('says whether a tried digit is too big, too small or right', () => {
    expect(tryDigit(2, 1, 5)).toMatchObject({ candidate: '1,5', square: '2,25', status: 'big' });
    expect(tryDigit(2, 1, 3)).toMatchObject({ candidate: '1,3', square: '1,69', status: 'small' });
    expect(tryDigit(2, 1, 4).status).toBe('right');
    expect(tryDigit(2, 0, 1).status).toBe('right');
  });

  it('marks an exact square root', () => {
    expect(tryDigit(49, 0, 7)).toMatchObject({ status: 'right', exact: true });
    expect(tryDigit(49, 0, 6).status).toBe('small');
  });
});

describe('every area', () => {
  it('has exactly one right digit per level, and it brackets √S', () => {
    for (let s = MIN_AREA; s <= MAX_AREA; s++) {
      for (let level = 0; level <= MAX_LEVEL; level++) {
        const right = [];
        for (let k = 0; k <= 9; k++) if (tryDigit(s, level, k).status === 'right') right.push(k);
        expect(right).toEqual([bracketAt(s, level).digit]);
        const b = bracketText(s, level);
        expect(b.loValue).toBeLessThanOrEqual(Math.sqrt(s));
        expect(b.hiValue).toBeGreaterThan(Math.sqrt(s));
      }
    }
  });
});
