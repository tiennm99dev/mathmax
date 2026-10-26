import { describe, it, expect } from 'vitest';
import {
  PUZZLES,
  RULES,
  apply,
  exprTex,
  isDone,
  power,
  sameValue,
  value,
  valueTex,
} from './engine.js';

/** @typedef {import('./engine.js').Expr} Expr */

/**
 * Every expression reachable from `e` by correct rule cards.
 * @param {Expr} e
 * @returns {Expr[]}
 */
function reachable(e) {
  const out = [e];
  for (const r of RULES.filter((x) => x.correct)) {
    const res = apply(e, r.id);
    if ('next' in res) out.push(...reachable(res.next));
  }
  return out;
}

describe('power rule puzzle', () => {
  it('computes exact powers', () => {
    expect(power({ f: { n: -2, d: 3 }, form: 'frac' }, 3)).toEqual({ n: -8n, d: 27n });
    expect(power({ f: { n: 5, d: 1 }, form: 'int' }, 0)).toEqual({ n: 1n, d: 1n });
    expect(valueTex({ n: -1n, d: 8n })).toBe('\\frac{-1}{8}');
  });

  it('writes expressions with the base in brackets', () => {
    expect(exprTex(PUZZLES[0])).toBe(
      '\\left(\\frac{2}{3}\\right)^{5} \\cdot \\left(\\frac{2}{3}\\right)^{3}',
    );
    expect(exprTex(PUZZLES[5])).toBe(
      '\\left(-0{,}5\\right)^{9} : \\left[\\left(-0{,}5\\right)^{2}\\right]^{3}',
    );
  });

  for (const [i, p] of PUZZLES.entries()) {
    it(`puzzle ${i + 1}: true rules keep the value, false rules change it`, () => {
      const states = reachable(p);
      expect(states.some(isDone)).toBe(true);
      const v0 = value(p);
      for (const s of states) {
        expect(sameValue(value(s), v0)).toBe(true);
        for (const r of RULES) {
          const res = apply(s, r.id);
          if (!('next' in res)) continue;
          expect(sameValue(value(res.next), v0)).toBe(r.correct);
        }
      }
    });
  }

  it('reads the expression left to right', () => {
    const res = apply(PUZZLES[3], 'chia');
    expect('reason' in res).toBe(true);
    const ok = apply(PUZZLES[3], 'nhan');
    expect('next' in ok && ok.next.terms).toEqual([{ m: 7 }, { m: 5 }]);
  });

  it('asks for the power of a power first', () => {
    const res = apply(PUZZLES[4], 'nhan');
    expect('reason' in res && res.reason).toMatch(/lũy thừa của lũy thừa/);
  });

  it('gives the final values of the puzzles', () => {
    const finals = PUZZLES.map((p) => valueTex(value(p)));
    expect(finals).toEqual([
      '\\frac{256}{6561}',
      '-27',
      '\\frac{1}{64}',
      '\\frac{9}{4}',
      '\\frac{8}{125}',
      '\\frac{-1}{8}',
    ]);
  });
});
