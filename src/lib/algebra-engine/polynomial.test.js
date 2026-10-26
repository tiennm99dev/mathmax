import { describe, it, expect } from 'vitest';
import {
  add,
  coef,
  collect,
  degree,
  evaluate,
  mul,
  polyTex,
  polyText,
  substituteTex,
  sub,
  termsOf,
  termsTex,
} from './polynomial.js';

describe('collecting and reading a polynomial', () => {
  it('collects like terms and reads degree and coefficients', () => {
    // 2x³ − 3x² − x − 2x³ + 7 = −3x² − x + 7
    const p = collect([
      { c: 2, e: 3 },
      { c: -3, e: 2 },
      { c: -1, e: 1 },
      { c: -2, e: 3 },
      { c: 7, e: 0 },
    ]);
    expect(p).toEqual([7, -1, -3]);
    expect(degree(p)).toBe(2);
    expect(coef(p, 2)).toBe(-3);
    expect(coef(p, 5)).toBe(0);
  });

  it('gives the zero polynomial no degree', () => {
    expect(
      collect([
        { c: 3, e: 2 },
        { c: -3, e: 2 },
      ]),
    ).toEqual([]);
    expect(degree([])).toBeNull();
    expect(degree([5])).toBe(0);
  });
});

describe('operations', () => {
  it('adds and subtracts by degree', () => {
    const p = [1, -3, 2]; // 2x² − 3x + 1
    const q = [-4, 0, -2, 1]; // x³ − 2x² − 4
    expect(add(p, q)).toEqual([-3, -3, 0, 1]);
    expect(sub(p, q)).toEqual([5, -3, 4, -1]);
    expect(sub(p, p)).toEqual([]);
  });

  it('multiplies term by term', () => {
    // (x − 2)(x² + 2x + 4) = x³ − 8
    expect(mul([-2, 1], [4, 2, 1])).toEqual([-8, 0, 0, 1]);
    // 2x · (3x² − x + 5) = 6x³ − 2x² + 10x
    expect(mul([0, 2], [5, -1, 3])).toEqual([0, 10, -2, 6]);
    expect(mul([], [1, 2])).toEqual([]);
  });

  it('evaluates and finds roots', () => {
    const p = [-4, 0, 1]; // x² − 4
    expect(evaluate(p, 2)).toBe(0);
    expect(evaluate(p, -2)).toBe(0);
    expect(evaluate(p, 3)).toBe(5);
    expect(evaluate([0.1, 0.2], 1)).toBe(0.3);
  });
});

describe('writing', () => {
  it('writes TeX with signs and hidden unit coefficients', () => {
    expect(polyTex([7, -1, -3])).toBe('-3x^{2} - x + 7');
    expect(polyTex([0, 1, 0, -1])).toBe('-x^{3} + x');
    expect(polyTex([-1])).toBe('-1');
    expect(polyTex([2.5, 0, 1])).toBe('x^{2} + 2{,}5');
    expect(polyTex([])).toBe('0');
    expect(termsTex(termsOf([7, -1, -3], true), 'y')).toBe('7 - y - 3y^{2}');
  });

  it('writes a substitution with brackets and multiplication dots', () => {
    expect(substituteTex([-4, 0, 1], -2)).toBe('(-2)^{2} - 4');
    expect(substituteTex([-3, 2], 1.5)).toBe('2 \\cdot 1{,}5 - 3');
    expect(substituteTex([0, 1, 1], -1)).toBe('(-1)^{2} + (-1)');
  });

  it('writes plain text with the book minus and superscripts', () => {
    expect(polyText([7, -1, -3])).toBe('−3x² − x + 7');
    expect(polyText([0, 0, 0, 2])).toBe('2x³');
  });
});
