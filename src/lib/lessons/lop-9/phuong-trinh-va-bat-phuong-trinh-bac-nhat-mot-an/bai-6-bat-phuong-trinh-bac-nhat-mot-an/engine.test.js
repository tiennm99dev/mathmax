import { describe, it, expect } from 'vitest';
import {
  checkText,
  closed,
  inequalityText,
  isSolution,
  pointsRight,
  reverse,
  solutionText,
  solve,
  steps,
} from './engine.js';

/** @type {import('./engine.js').Sign[]} */
const ALL = ['lt', 'gt', 'le', 'ge'];

describe('first-degree inequalities in one unknown', () => {
  it('solves the book example −7x + 3 > 0 as x < 3/7', () => {
    expect(solutionText(-7, 3, 'gt')).toBe('x < 3/7');
    expect(steps(-7, 3, 'gt')).toEqual([
      { tex: '-7x + 3 > 0', note: 'Bất phương trình', flips: false },
      { tex: '-7x > -3', note: 'Chuyển 3 sang vế phải và đổi dấu', flips: false },
      { tex: 'x < \\frac{3}{7}', note: 'Chia hai vế cho −7 < 0: đổi chiều', flips: true },
    ]);
  });

  it('keeps the sign when dividing by a positive number', () => {
    expect(solutionText(2, -6, 'ge')).toBe('x ≥ 3');
    expect(steps(2, -6, 'ge').at(-1)?.flips).toBe(false);
    expect(solutionText(1, 4, 'lt')).toBe('x < −4');
    expect(steps(1, 4, 'lt')).toHaveLength(2);
    expect(solutionText(3, 2, 'lt')).toBe('x < −2/3');
  });

  it('agrees with substitution at every grid point', () => {
    for (let a = -5; a <= 5; a++) {
      if (a === 0) continue;
      for (let b = -10; b <= 10; b++) {
        for (const s of ALL) {
          const sol = solve(a, b, s);
          for (let x2 = -24; x2 <= 24; x2++) {
            const x = x2 / 2;
            const inSet =
              x === sol.bound
                ? closed(sol.sign)
                : pointsRight(sol.sign)
                  ? x > sol.bound
                  : x < sol.bound;
            expect(isSolution(a, b, s, x)).toBe(inSet);
          }
        }
      }
    }
  });

  it('reverses each sign', () => {
    expect(ALL.map(reverse)).toEqual(['gt', 'lt', 'ge', 'le']);
  });

  it('writes the substitution check with a decimal comma', () => {
    expect(checkText(-3, 6, 'ge', 2)).toBe(
      'Thay x = 2: −3 · 2 + 6 = 0; 0 ≥ 0 là khẳng định đúng, nên x = 2 là nghiệm.',
    );
    expect(checkText(2, -1, 'lt', -1.5)).toBe(
      'Thay x = −1,5: 2 · (−1,5) − 1 = −4; −4 < 0 là khẳng định đúng, nên x = −1,5 là nghiệm.',
    );
    expect(checkText(1, 0, 'gt', -2)).toBe(
      'Thay x = −2: (−2) = −2; −2 > 0 là khẳng định sai, nên x = −2 không là nghiệm.',
    );
    expect(inequalityText(-3, 6, 'ge')).toBe('−3x + 6 ≥ 0');
  });
});
