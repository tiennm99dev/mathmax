import { describe, expect, it } from 'vitest';
import { PRESETS, baseFactors, combine, expressionTex, fracTex } from './engine.js';
import { checkCommon, denTex } from '../_shared/factors.js';

describe('sums and differences of fractions', () => {
  it('print the expressions with expanded denominators', () => {
    expect(PRESETS.map(expressionTex)).toEqual([
      '\\dfrac{2x + 1}{x + 3} + \\dfrac{x + 8}{x + 3}',
      '\\dfrac{3}{2x} + \\dfrac{5}{4x^{2}}',
      '\\dfrac{x}{x^{2} - 4} - \\dfrac{1}{x + 2}',
      '\\dfrac{1}{x^{2} + x} + \\dfrac{1}{x + 1}',
      '\\dfrac{2}{x - 1} - \\dfrac{x + 3}{x^{2} - 1}',
      '\\dfrac{1}{x - 1} + \\dfrac{1}{x + 1} + \\dfrac{2}{x^{2} - 1}',
    ]);
  });

  it('find the common denominators', () => {
    expect(PRESETS.map((p) => denTex(combine(p).common))).toEqual([
      'x + 3',
      '4x^{2}',
      '(x - 2)(x + 2)',
      'x(x + 1)',
      '(x - 1)(x + 1)',
      '(x - 1)(x + 1)',
    ]);
  });

  it('add the numerators and reduce the result', () => {
    expect(
      PRESETS.map((p) => {
        const c = combine(p);
        return [c.steps, fracTex(c.sum, c.common), fracTex(c.result.top, c.result.bottom)];
      }),
    ).toEqual([
      ['2x + 1 + (x + 8)', '\\dfrac{3x + 9}{x + 3}', '3'],
      ['6x + 5', '\\dfrac{6x + 5}{4x^{2}}', '\\dfrac{6x + 5}{4x^{2}}'],
      ['x - (x - 2)', '\\dfrac{2}{(x - 2)(x + 2)}', '\\dfrac{2}{(x - 2)(x + 2)}'],
      ['1 + x', '\\dfrac{x + 1}{x(x + 1)}', '\\dfrac{1}{x}'],
      ['2x + 2 - (x + 3)', '\\dfrac{x - 1}{(x - 1)(x + 1)}', '\\dfrac{1}{x + 1}'],
      ['x + 1 + (x - 1) + 2', '\\dfrac{2x + 2}{(x - 1)(x + 1)}', '\\dfrac{2}{x - 1}'],
    ]);
  });

  it('accept only the simplest common denominator', () => {
    const terms = PRESETS[1];
    const dens = terms.map((t) => t.bottom);
    const [x] = baseFactors(terms);
    expect(checkCommon(dens, { coef: 4, parts: [{ f: x, exp: 2 }] })).toEqual({ status: 'ok' });
    expect(checkCommon(dens, { coef: 8, parts: [{ f: x, exp: 3 }] })).toEqual({ status: 'high' });
    expect(checkCommon(dens, { coef: 2, parts: [{ f: x, exp: 2 }] })).toEqual({
      status: 'low',
      index: 1,
    });
    expect(checkCommon(dens, { coef: 4, parts: [{ f: x, exp: 1 }] })).toEqual({
      status: 'low',
      index: 1,
    });
  });
});
