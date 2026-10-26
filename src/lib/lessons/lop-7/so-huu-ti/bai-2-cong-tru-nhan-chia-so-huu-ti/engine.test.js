import { describe, it, expect } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import { readWritten } from '../_shared/rational.js';
import { solve } from './engine.js';

/** @param {string} t */
const w = (t) => {
  const r = readWritten(t);
  if (!r) throw new Error(t);
  return r;
};

/** @param {string} a @param {import('./engine.js').Op} op @param {string} b */
function result(a, op, b) {
  const out = solve(w(a), op, w(b));
  if ('error' in out) throw new Error(out.error);
  return out;
}

describe('step-by-step rational calculator', () => {
  it('adds a decimal and a fraction through a common denominator', () => {
    const out = result('0,25', '+', '-5/6');
    expect(out.result).toEqual(fraction(-7, 12));
    expect(out.steps[0].tex).toBe('0{,}25 = \\frac{1}{4}');
    expect(out.steps.some((s) => s.caption.includes('mẫu chung là 12'))).toBe(true);
  });

  it('subtracts by adding the opposite', () => {
    const out = result('-2/3', '-', '-1/6');
    expect(out.result).toEqual(fraction(-1, 2));
    expect(out.steps.some((s) => s.caption.includes('số đối'))).toBe(true);
    expect(out.steps.at(-1)?.tex).toBe('\\frac{-2}{3} - \\frac{-1}{6} = \\frac{-1}{2} = -0{,}5');
  });

  it('multiplies and simplifies', () => {
    expect(result('-1,2', '*', '5/9').result).toEqual(fraction(-2, 3));
    expect(result('4', '*', '-3/8').result).toEqual(fraction(-3, 2));
  });

  it('divides by multiplying by the reciprocal', () => {
    const out = result('3/4', ':', '-1,5');
    expect(out.result).toEqual(fraction(-1, 2));
    expect(out.steps.some((s) => s.caption.includes('nghịch đảo của −3/2 là −2/3'))).toBe(true);
  });

  it('refuses to divide by zero', () => {
    expect('error' in solve(w('1/2'), ':', w('0'))).toBe(true);
  });

  it('agrees with plain arithmetic on many inputs', () => {
    const nums = ['-7/4', '2/3', '0,6', '-1,25', '5', '-3', '9/-12', '0'];
    for (const a of nums)
      for (const b of nums)
        for (const op of /** @type {const} */ (['+', '-', '*', ':'])) {
          const out = solve(w(a), op, w(b));
          if ('error' in out) {
            expect(op).toBe(':');
            continue;
          }
          const x = w(a).f.n / w(a).f.d;
          const y = w(b).f.n / w(b).f.d;
          const want = op === '+' ? x + y : op === '-' ? x - y : op === '*' ? x * y : x / y;
          expect(out.result.n / out.result.d).toBeCloseTo(want, 12);
        }
  });
});
