import { describe, expect, it } from 'vitest';
import {
  CasError,
  evaluate,
  intersections,
  numericRoots,
  parseEquation,
  parseExpr,
  parseFunction,
  realRoots,
  runCas,
  sameEquation,
  sameFunction,
  samplePieces,
  solvesTask,
  surdTex,
  tokenize,
} from './engine.js';

/** @param {string} s */
const ex = (s) => parseExpr(tokenize(s));
/** @param {string} s @param {number} x */
const at = (s, x) => evaluate(ex(s), { x, y: 0 });

/** @param {import('./engine.js').CasResult} r */
const roots = (r) => (r.kind === 'single' ? r.roots.map((x) => x.tex) : []);

describe('reading input the GeoGebra way', () => {
  it('multiplies implicitly and keeps powers above signs', () => {
    expect(at('3x', 2)).toBe(6);
    expect(at('2(x+1)', 2)).toBe(6);
    expect(at('(x+1)(x-1)', 3)).toBe(8);
    expect(at('-x^2', 3)).toBe(-9);
    expect(at('2x²', 3)).toBe(18);
    expect(at('x^-1', 4)).toBe(0.25);
    expect(at('sqrt(9)x', 2)).toBe(6);
  });

  it('rejects input it cannot read', () => {
    expect(() => ex('2 3')).toThrow(CasError);
    expect(() => ex('z + 1')).toThrow(CasError);
    expect(() => ex('(x + 1')).toThrow(CasError);
    expect(() => parseEquation('x + 1')).toThrow(CasError);
  });
});

describe('roots of polynomials', () => {
  it('finds rational roots exactly', () => {
    expect(realRoots([6, -5, 1]).map((r) => r.tex)).toEqual(['2', '3']);
    expect(realRoots([-1, 0, 4]).map((r) => r.tex)).toEqual(['-\\dfrac{1}{2}', '\\dfrac{1}{2}']);
    expect(realRoots([10, -4, 1])).toEqual([]);
  });

  it('writes irrational roots with a square root', () => {
    expect(realRoots([-1, -2, 1]).map((r) => r.tex)).toEqual(['1 - \\sqrt{2}', '1 + \\sqrt{2}']);
    expect(realRoots([1, 3, 1]).map((r) => r.tex)).toEqual([
      '\\dfrac{-3 - \\sqrt{5}}{2}',
      '\\dfrac{-3 + \\sqrt{5}}{2}',
    ]);
    expect(surdTex(0, -2, 3, 4)).toBe('-\\dfrac{\\sqrt{3}}{2}');
  });

  it('solves a cubic numerically', () => {
    const r = numericRoots([-6, 11, -6, 1]);
    const bad = [1, 2, 3].filter((v, i) => Math.abs(r[i] - v) > 1e-8);
    expect(bad).toEqual([]);
  });
});

describe('Solve for one equation', () => {
  it('solves the equations of the activity', () => {
    expect(roots(runCas('Solve(x^2 - 4x + 10 = 0)'))).toEqual([]);
    expect(roots(runCas('Solve(x + 9/(x - 1) = 7)'))).toEqual(['4']);
    expect(roots(runCas('Solve(x^2 - 2(sqrt(3) - 1)x - 2sqrt(3) = 0)'))).toEqual([
      '-3 + \\sqrt{3}',
      '1 + \\sqrt{3}',
    ]);
    const d = runCas('Solve((x + 1)/(x - 1) - (x - 1)/(x + 1) = 4/(x^2 - 1))');
    expect(roots(d)).toEqual([]);
    expect(d.kind === 'single' && d.excluded.map((x) => x.tex)).toEqual(['-1', '1']);
  });

  it('writes the output like GeoGebra', () => {
    expect(runCas('Solve(x^2 - 5x + 6 = 0)').tex).toBe('\\{x = 2,\\ x = 3\\}');
    expect(runCas('Solutions(x^2 - 5x + 6 = 0)').tex).toBe('\\{2,\\ 3\\}');
    expect(runCas('NSolve(x^2 = 2)').tex).toBe('\\{x \\approx -1{,}4142,\\ x \\approx 1{,}4142\\}');
    expect(runCas('Solve(x^2 + 1 = 0)').tex).toBe('\\{\\}');
    expect(runCas('solve(2x - 3 = 0, x)').tex).toBe('\\{x = \\dfrac{3}{2}\\}');
  });

  it('explains wrong commands', () => {
    expect(() => runCas('x^2 = 4')).toThrow(/Solve\(x\^2 = 4\)/);
    expect(() => runCas('Giai(x = 1)')).toThrow(CasError);
    expect(() => runCas('Solve(x + y = 1)')).toThrow(/hệ/);
  });
});

describe('Solve for a system', () => {
  it('solves the systems of the activity', () => {
    expect(runCas('Solve({3x - 2y = 4, 2x + y = 5}, {x, y})').tex).toBe(
      '\\{\\{x = 2,\\ y = 1\\}\\}',
    );
    expect(runCas('Solve({3x + 2y = 0, 2x - 3y = 0}, {x, y})').tex).toBe(
      '\\{\\{x = 0,\\ y = 0\\}\\}',
    );
    expect(runCas('Solve({x + 2y = 1, 3x - y = 2})').tex).toBe(
      '\\{\\{x = \\dfrac{5}{7},\\ y = \\dfrac{1}{7}\\}\\}',
    );
  });

  it('tells no solution from infinitely many', () => {
    const none = runCas('Solve({2x - y = 3, -4x + 2y = 1}, {x, y})');
    const many = runCas('Solve({x - y = 1, 2x - 2y = 2}, {x, y})');
    expect(none.kind === 'system' && none.count).toBe('none');
    expect(many.kind === 'system' && many.count).toBe('many');
  });

  it('refuses systems that are not of the first degree', () => {
    expect(() => runCas('Solve({x^2 + y = 1, x - y = 0}, {x, y})')).toThrow(CasError);
  });
});

describe('checking tasks', () => {
  it('accepts an equation written another way', () => {
    expect(sameEquation(parseEquation('x^2 - 5x + 6 = 0'), parseEquation('x^2 + 6 = 5x'))).toBe(
      true,
    );
    expect(sameEquation(parseEquation('2x = 4'), parseEquation('x = 2'))).toBe(true);
    expect(sameEquation(parseEquation('x = 2'), parseEquation('x = 3'))).toBe(false);
  });

  it('matches a system in any order', () => {
    const r = runCas('Solve({2x + y = 5, 3x - 2y = 4}, {x, y})');
    expect(solvesTask(r, ['3x - 2y = 4', '2x + y = 5'])).toBe(true);
    expect(solvesTask(r, ['3x - 2y = 4', '2x + y = 6'])).toBe(false);
  });
});

describe('graphs', () => {
  it('reads y = and f(x) = lines', () => {
    expect(sameFunction(parseFunction('y = 2x^2'), parseFunction('f(x) = 2x*x'))).toBe(true);
    expect(sameFunction(parseFunction('-0.5x^2'), parseFunction('y = -x^2/2'))).toBe(true);
    expect(() => parseFunction('y = x + y')).toThrow(CasError);
  });

  it('finds where a parabola meets a line', () => {
    const pts = intersections(parseFunction('y = x^2'), parseFunction('y = x + 2'));
    expect(pts.map((p) => [p.x.tex, p.y.tex])).toEqual([
      ['-1', '1'],
      ['2', '4'],
    ]);
  });

  it('breaks the curve where it is undefined', () => {
    const pieces = samplePieces(parseFunction('y = 1/x'), -5, 5, -5, 5, 200);
    expect(pieces.length).toBeGreaterThanOrEqual(2);
  });
});
