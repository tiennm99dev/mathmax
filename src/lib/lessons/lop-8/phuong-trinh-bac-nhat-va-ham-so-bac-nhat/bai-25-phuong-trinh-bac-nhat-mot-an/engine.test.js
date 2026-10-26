import { describe, expect, it } from 'vitest';
import {
  LINEAR_PUZZLES,
  PUZZLES,
  apply,
  canCollect,
  collect,
  divideOut,
  divisor,
  fracTex,
  linearEquation,
  linearTex,
  moveTerm,
  reduce,
  solved,
  divisorToIsolate,
  equationTex,
  sideTex,
  solvedValue,
  tilt,
} from './engine.js';

describe('balance-scale equation', () => {
  it('every puzzle is level at its solution and only there', () => {
    for (const p of PUZZLES) {
      expect(tilt(p, p.solution)).toBe(0);
      expect(tilt(p, p.solution + 1)).not.toBe(0);
    }
  });

  it('moves on both pans keep the scale level', () => {
    const p = PUZZLES[2]; // 4x + 1 = 2x + 7
    let s = { left: p.left, right: p.right };
    for (const move of [
      { kind: 'remove-x' },
      { kind: 'remove-x' },
      { kind: 'remove-one' },
      { kind: 'divide', k: 2 },
    ]) {
      const r = apply(s, /** @type {import('./engine.js').Move} */ (move), 'both');
      expect(r.ok).toBe(true);
      if (r.ok) s = r.scale;
      expect(tilt(s, p.solution)).toBe(0);
    }
    expect(equationTex(s)).toBe('x = 3');
    expect(solvedValue(s)).toBe(3);
  });

  it('a move on one pan tips the scale', () => {
    const p = PUZZLES[0];
    const r = apply(p, { kind: 'remove-one' }, 'left');
    expect(r.ok).toBe(true);
    if (r.ok) expect(tilt(r.scale, p.solution)).toBe(-1);
  });

  it('refuses impossible moves', () => {
    const s = { left: { x: 3, c: 2 }, right: { x: 0, c: 11 } };
    expect(apply(s, { kind: 'remove-x' }, 'both').ok).toBe(false);
    expect(apply(s, { kind: 'divide', k: 3 }, 'both').ok).toBe(false);
    const r = apply(
      { left: { x: 3, c: 0 }, right: { x: 0, c: 9 } },
      { kind: 'divide', k: 3 },
      'both',
    );
    expect(r.ok && equationTex(r.scale)).toBe('x = 3');
  });

  it('writes sides and finds the isolating divisor', () => {
    expect(sideTex({ x: 0, c: 0 })).toBe('0');
    expect(sideTex({ x: 1, c: 4 })).toBe('x + 4');
    expect(divisorToIsolate({ left: { x: 3, c: 0 }, right: { x: 0, c: 9 } })).toBe(3);
    expect(divisorToIsolate({ left: { x: 0, c: 8 }, right: { x: 2, c: 0 } })).toBe(2);
    expect(solvedValue({ left: { x: 0, c: 4 }, right: { x: 1, c: 0 } })).toBe(4);
    expect(solvedValue({ left: { x: 2, c: 0 }, right: { x: 0, c: 4 } })).toBeNull();
  });
});

describe('term-by-term solving', () => {
  /**
   * Solve by the widget's moves: x-terms left, constants right, collect, divide.
   * @param {number[]} abcd
   */
  function run(abcd) {
    const [a, b, c, d] = abcd;
    let eq = linearEquation(a, b, c, d);
    for (const t of eq.right.filter((t) => t.x)) eq = moveTerm(eq, t.id);
    for (const t of eq.left.filter((t) => !t.x)) eq = moveTerm(eq, t.id);
    eq = collect(eq);
    return divideOut(eq);
  }

  it('solves every widget equation exactly', () => {
    expect(run(LINEAR_PUZZLES[0])?.value).toEqual([3, 1]);
    expect(run(LINEAR_PUZZLES[1])?.value).toEqual([4, 1]);
    expect(run(LINEAR_PUZZLES[2])?.value).toEqual([-2, 1]);
    expect(run(LINEAR_PUZZLES[3])?.value).toEqual([-2, 5]);
    for (const [a, b, c, d] of LINEAR_PUZZLES) {
      const r = run([a, b, c, d]);
      expect(r).not.toBeNull();
      const [p, q] = r ? r.value : [0, 0];
      expect(a * p + b * q).toBe(c * p + d * q);
    }
  });

  it('changes the sign of a moved term', () => {
    const eq = linearEquation(3, -5, -1, 7);
    expect(linearTex(eq)).toBe('3x - 5 = -x + 7');
    const moved = moveTerm(eq, 2);
    expect(linearTex(moved)).toBe('3x = -x + 7 + 5');
    expect(canCollect(moved)).toBe(true);
    const both = moveTerm(moved, 3);
    expect(linearTex(both)).toBe('3x + x = 7 + 5');
    expect(canCollect(both)).toBe(true);
    expect(linearTex(collect(both))).toBe('4x = 12');
  });

  it('reads the solution and writes fractions', () => {
    expect(solved(linearEquation(1, 0, 0, -3))).toEqual([-3, 1]);
    expect(solved(linearEquation(0, 4, 1, 0))).toEqual([4, 1]);
    expect(solved(linearEquation(2, 0, 0, 4))).toBeNull();
    expect(divisor(linearEquation(1, 0, 0, 4))).toBeNull();
    expect(reduce(6, -4)).toEqual([-3, 2]);
    expect(fracTex([-2, 5])).toBe('-\\dfrac{2}{5}');
    expect(fracTex([7, 1])).toBe('7');
  });
});
