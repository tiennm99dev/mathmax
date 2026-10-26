import { describe, expect, it } from 'vitest';
import {
  X,
  cancelAll,
  commonDen,
  den,
  denPoly,
  denTex,
  denText,
  expand,
  extraFactor,
  factor,
  hasCommon,
  lin,
  num,
  productTex,
  productText,
  ratioAt,
  ratioTex,
  ratioText,
  reduce,
  standing,
} from './factors.js';

describe('products of factors', () => {
  it('write numbers first and repeated factors as powers', () => {
    expect(productTex([lin(-2), num(3), lin(-2), X])).toBe('3x(x - 2)^{2}');
    expect(productTex([num(2), num(2), X, X])).toBe('4x^{2}');
    expect(productTex([lin(1)])).toBe('x + 1');
    expect(productTex([])).toBe('1');
    expect(productText([num(-1), lin(-1)])).toBe('−(x − 1)');
    expect(productText([X, factor(1, 0, 1)])).toBe('x(x² + 1)');
  });

  it('write fractions as TeX and as plain text', () => {
    expect(ratioTex([lin(-1)], [X])).toBe('\\dfrac{x - 1}{x}');
    expect(ratioTex([lin(-1)], [])).toBe('x - 1');
    expect(ratioText([lin(-1), lin(1)], [num(2), X])).toBe('(x − 1)(x + 1)/(2x)');
    expect(ratioText([num(2), num(2), X], [lin(1)])).toBe('4x/(x + 1)');
    expect(ratioText([lin(-1)], [lin(3)])).toBe('(x − 1)/(x + 3)');
    expect(ratioText([num(3), lin(3)], [X, X])).toBe('3(x + 3)/x²');
  });

  it('expand and evaluate', () => {
    expect(expand([lin(-2), lin(2)])).toEqual([-4, 0, 1]);
    expect(ratioAt([lin(1)], [lin(-2)], 2)).toBeNull();
    expect(ratioAt([lin(1)], [lin(-2)], 4)).toBe(2.5);
  });

  it('cancel common factors', () => {
    const top = [num(2), num(3), X, X];
    const bottom = [num(2), num(2), num(2), X, X, X];
    const { topOut, bottomOut } = cancelAll(top, bottom);
    expect(hasCommon(top, topOut, bottom, bottomOut)).toBe(false);
    expect(ratioTex(standing(top, topOut), standing(bottom, bottomOut))).toBe('\\dfrac{3}{4x}');
  });
});

describe('common denominators', () => {
  const d1 = den(6, [
    [X, 2],
    [lin(-1), 1],
  ]);
  const d2 = den(4, [
    [X, 1],
    [lin(-1), 2],
  ]);

  it('take the least common multiple and the highest powers', () => {
    const c = commonDen([d1, d2]);
    expect(denTex(c)).toBe('12x^{2}(x - 1)^{2}');
    expect(denText(c)).toBe('12x²(x − 1)²');
    expect(denTex(extraFactor(c, d1))).toBe('2(x - 1)');
    expect(denTex(extraFactor(c, d2))).toBe('3x');
    expect(denPoly(den(2, [[lin(1), 2]]))).toEqual([2, 4, 2]);
  });

  it('reduce a numerator over a common denominator', () => {
    const r = reduce(
      [1, 1],
      den(1, [
        [X, 1],
        [lin(1), 1],
      ]),
    );
    expect(r.top).toEqual([1]);
    expect(denTex(r.bottom)).toBe('x');
    const s = reduce([6, 3], den(6, [[lin(2), 1]]));
    expect(s.top).toEqual([1]);
    expect(denTex(s.bottom)).toBe('2');
  });
});
