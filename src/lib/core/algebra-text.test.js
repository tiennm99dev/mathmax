import { describe, it, expect } from 'vitest';
import {
  eqTex,
  eqText,
  factorTex,
  factorText,
  isShortDecimal,
  linTex,
  linText,
  monoText,
  numText,
  pairText,
  rootValue,
  signedFracTex,
  signedFracText,
  substituteText,
  sumText,
} from './algebra-text.js';

describe('linear expressions', () => {
  it('writes αx + β the book way in text and TeX', () => {
    expect(linText(3, -2)).toBe('3x − 2');
    expect(linText(-1, 0)).toBe('−x');
    expect(linText(0, -5)).toBe('−5');
    expect(linText(0, 0)).toBe('0');
    expect(linText(2, 1, 'y')).toBe('2y + 1');
    expect(linTex(-3, 4)).toBe('-3x + 4');
    expect(factorText(3)).toBe('x − 3');
    expect(factorText(-2)).toBe('x + 2');
    expect(factorTex(0)).toBe('x');
  });

  it('writes signed fractions in lowest terms with a positive denominator', () => {
    expect(signedFracText(6, -14)).toBe('−3/7');
    expect(signedFracText(4, 2)).toBe('2');
    expect(signedFracTex(-6, 14)).toBe('-\\frac{3}{7}');
    expect(signedFracTex(0, 5)).toBe('0');
  });
});

describe('two-variable equations', () => {
  it('writes ax + by = c and substitutes a pair', () => {
    expect(eqText(2, -3, -5)).toBe('2x − 3y = −5');
    expect(eqText(0, 1, 4)).toBe('y = 4');
    expect(eqTex(-1, 1, 0)).toBe('-x + y = 0');
    expect(pairText(2, -1)).toBe('(2; −1)');
    expect(substituteText(2, -3, 3, -1)).toBe('2 · 3 − 3 · (−1) = 9');
  });

  it('writes monomials and sums in x and y', () => {
    expect(monoText(-3, 2, 1)).toBe('−3x²y');
    expect(monoText(1, 1, 1)).toBe('xy');
    expect(monoText(5, 0, 0)).toBe('5');
    expect(
      sumText([
        [3, 2, 1],
        [-1, 1, 1],
        [5, 0, 0],
      ]),
    ).toBe('3x²y − xy + 5');
  });
});

describe('roots', () => {
  it('writes a short decimal root exactly and others to three places', () => {
    expect(rootValue(2.5)).toEqual({ exact: true, sign: '=', text: '2,5' });
    expect(rootValue(Math.SQRT2)).toEqual({ exact: false, sign: '≈', text: '1,414' });
    expect(isShortDecimal(0.25)).toBe(true);
    expect(isShortDecimal(0.125)).toBe(false);
    expect(numText(-3)).toBe('−3');
    expect(numText(6.25)).toBe('6,25');
  });
});
