import { describe, it, expect } from 'vitest';
import {
  alike,
  collect,
  evalPoly,
  isCollected,
  mono,
  monoDegree,
  monoOperand,
  monoTex,
  monoText,
  mulMono,
  mulPoly,
  neg,
  parsePoly,
  polyDegree,
  polyTex,
  polyText,
  products,
  varKey,
} from './poly.js';

describe('monomials', () => {
  it('normalises the variable part', () => {
    expect(mono(3, { y: 1, x: 2, z: 0 })).toEqual({ coef: 3, vars: { x: 2, y: 1 } });
    expect(varKey(mono(3, { y: 1, x: 2 }))).toBe('x2y1');
    expect(varKey(mono(5))).toBe('');
  });

  it('finds the degree, with none for zero', () => {
    expect(monoDegree(mono(-3, { x: 2, y: 1 }))).toBe(3);
    expect(monoDegree(mono(7))).toBe(0);
    expect(monoDegree(mono(0, { x: 1 }))).toBeNull();
  });

  it('tells alike monomials apart', () => {
    expect(alike(mono(2, { x: 2, y: 1 }), mono(-5, { y: 1, x: 2 }))).toBe(true);
    expect(alike(mono(2, { x: 2, y: 1 }), mono(2, { x: 1, y: 2 }))).toBe(false);
    expect(alike(mono(4), mono(-9))).toBe(true);
    expect(alike(mono(0, { x: 1 }), mono(1, { x: 1 }))).toBe(false);
  });

  it('multiplies coefficients and adds exponents', () => {
    const p = mulMono(mono(3, { x: 2, y: 1 }), mono(-2, { x: 1, y: 3 }));
    expect(p).toEqual({ coef: -6, vars: { x: 3, y: 4 } });
  });

  it('writes the book way', () => {
    expect(monoText(mono(-3, { x: 2, y: 1 }))).toBe('−3x²y');
    expect(monoText(mono(1, { x: 1, y: 1 }))).toBe('xy');
    expect(monoText(mono(-1, { y: 1 }))).toBe('−y');
    expect(monoText(mono(-1))).toBe('−1');
    expect(monoText(mono(12, { x: 10 }))).toBe('12x¹⁰');
    expect(monoOperand(mono(-2, { x: 1 }))).toBe('(−2x)');
    expect(monoTex(mono(-3, { x: 2, y: 1 }))).toBe('-3x^{2}y');
  });
});

describe('polynomials', () => {
  const p = parsePoly('3x^2y - xy + 5 - x^2y + 2xy - 5');

  it('parses authored presets', () => {
    expect(p).toHaveLength(6);
    expect(p[1]).toEqual(mono(-1, { x: 1, y: 1 }));
    expect(parsePoly('−2x^3')).toEqual([mono(-2, { x: 3 })]);
    expect(() => parsePoly('3x*y')).toThrow();
  });

  it('collects like terms in first-appearance order and drops zeros', () => {
    expect(isCollected(p)).toBe(false);
    const c = collect(p);
    expect(polyText(c)).toBe('2x²y + xy');
    expect(isCollected(c)).toBe(true);
    expect(collect(parsePoly('x - x'))).toEqual([]);
  });

  it('finds the degree from the collected form', () => {
    expect(polyDegree(p)).toBe(3);
    // The degree-5 terms cancel, so the degree is that of what is left.
    expect(polyDegree(parsePoly('x^4y + 3xy - x^4y + 2'))).toBe(2);
    expect(polyDegree(parsePoly('x - x'))).toBeNull();
    expect(polyDegree(parsePoly('7'))).toBe(0);
  });

  it('writes plain text and TeX', () => {
    expect(polyText(parsePoly('x^2 - 2xy + y^2'))).toBe('x² − 2xy + y²');
    expect(polyText([])).toBe('0');
    expect(polyTex(parsePoly('-x^2y + 3'))).toBe('-x^{2}y + 3');
    expect(polyText(neg(parsePoly('x - 2y')))).toBe('−x + 2y');
  });

  it('multiplies term by term', () => {
    const a = parsePoly('x + y');
    const b = parsePoly('x - y');
    expect(products(a, b).map(monoText)).toEqual(['x²', '−xy', 'xy', '−y²']);
    expect(polyText(mulPoly(a, b))).toBe('x² − y²');
    expect(polyText(mulPoly(parsePoly('2x'), parsePoly('3x^2 - 5xy + 1')))).toBe(
      '6x³ − 10x²y + 2x',
    );
  });

  it('agrees with the value of the product at many points', () => {
    const a = parsePoly('2x - 3y + 1');
    const b = parsePoly('x^2 + xy - 4');
    for (const x of [-3, -1, 0, 2, 5]) {
      for (const y of [-2, 1, 4]) {
        const v = { x, y };
        expect(evalPoly(mulPoly(a, b), v)).toBe(evalPoly(a, v) * evalPoly(b, v));
      }
    }
  });
});
