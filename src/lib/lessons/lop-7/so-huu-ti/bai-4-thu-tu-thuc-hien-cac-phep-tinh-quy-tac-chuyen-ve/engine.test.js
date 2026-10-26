import { describe, it, expect } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import {
  EQUATIONS,
  balanced,
  equationTex,
  isX,
  isolated,
  move,
  sideValue,
  solution,
  termText,
  tilt,
} from './engine.js';

describe('transposition balance', () => {
  it('solves each equation', () => {
    expect(EQUATIONS.map(solution)).toEqual([
      fraction(-1, 4),
      fraction(3, 2),
      fraction(-1, 2),
      fraction(1, 2),
      fraction(-2, 1),
      fraction(-2, 3),
    ]);
  });

  it('starts level at the solution', () => {
    for (const e of EQUATIONS) expect(balanced(e, solution(e))).toBe(true);
  });

  it('stays level after moving every number with its sign changed', () => {
    for (const e0 of EQUATIONS) {
      const x = solution(e0);
      let e = e0;
      for (let guard = 0; !isolated(e) && guard < 10; guard++) {
        const side = e.left.some(isX) ? 'left' : 'right';
        const i = e[side].findIndex((t) => !isX(t));
        e = move(e, side, i, true);
        expect(balanced(e, x)).toBe(true);
      }
      expect(isolated(e)).toBe(true);
      const other = e.left.some(isX) ? e.right : e.left;
      expect(sideValue(other, x)).toEqual(x);
    }
  });

  it('tips the scale when the sign is kept', () => {
    const e = EQUATIONS[0];
    const x = solution(e);
    const wrong = move(e, 'left', 1, false);
    expect(balanced(wrong, x)).toBe(false);
    // x alone on the left, 1/2 + 3/4 on the right: right is heavier by 3/2.
    expect(tilt(wrong, x)).toEqual(fraction(-3, 2));
  });

  it('never moves the unknown', () => {
    const e = EQUATIONS[0];
    expect(move(e, 'left', 0, true)).toBe(e);
  });

  it('leaves 0 on a side emptied by a move', () => {
    const e = move(EQUATIONS[4], 'left', 0, true);
    expect(equationTex(e)).toBe('0 = x + 0{,}8 + 1{,}2');
  });

  it('writes terms with book signs', () => {
    expect(equationTex(EQUATIONS[1])).toBe('x - 2{,}5 = -1');
    expect(termText(EQUATIONS[3].left[1], false)).toBe('− 1/4');
    expect(termText(EQUATIONS[4].left[0], true)).toBe('−1,2');
  });
});
