import { describe, it, expect } from 'vitest';
import { CHALLENGES, analyse, deltaTex, equationTex, solutionTex, verdict } from './engine.js';

describe('analyse', () => {
  it('classifies by the discriminant', () => {
    expect(analyse(2, -5, 3)).toEqual({ kind: 'two', delta: 1, roots: [1.5, 1] });
    expect(analyse(1, -4, 4)).toEqual({ kind: 'double', delta: 0, roots: [2, 2] });
    expect(analyse(1, 1, 3).kind).toBe('none');
    expect(analyse(0, 2, 1).kind).toBe('not-quadratic');
  });
});

describe('TeX', () => {
  it('writes Δ with the coefficients substituted', () => {
    expect(equationTex(2, -5, 3)).toBe('2x^{2} - 5x + 3 = 0');
    expect(deltaTex(2, -5, 3)).toBe('\\Delta = b^2 - 4ac = (-5)^2 - 4 \\cdot 2 \\cdot 3 = 1');
    expect(deltaTex(-0.5, 0, 2)).toContain('(-0{,}5)');
  });

  it('writes both roots with x₁ taking +√Δ', () => {
    const [x1, x2] = solutionTex(2, -5, 3);
    expect(x1).toBe('x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a} = \\dfrac{5 + \\sqrt{1}}{4} = 1{,}5');
    expect(x2).toContain('= 1');
  });

  it('marks irrational roots as approximate', () => {
    const [x1, x2] = solutionTex(1, -1, -1);
    expect(x1).toContain('\\approx 1{,}618');
    expect(x2).toContain('\\approx -0{,}618');
  });

  it('writes a double root and nothing for no roots', () => {
    expect(solutionTex(1, -4, 4)).toEqual(['x_1 = x_2 = -\\dfrac{b}{2a} = \\dfrac{4}{2} = 2']);
    expect(solutionTex(1, 0, 1)).toEqual([]);
  });
});

describe('verdict and challenges', () => {
  it('announces the number of roots', () => {
    expect(verdict(1, -3, 2).text).toContain('hai nghiệm phân biệt');
    expect(verdict(1, 2, 1).text).toContain('nghiệm kép x₁ = x₂ = −1');
    expect(verdict(1, 0, 4).text).toContain('vô nghiệm');
    expect(verdict(0, 1, 1).tone).toBe('warn');
  });

  it('each challenge can be met on the sliders', () => {
    const met = CHALLENGES.map(() => false);
    for (let a = -3; a <= 3; a += 0.5)
      for (let b = -6; b <= 6; b++)
        for (let c = -6; c <= 6; c++)
          CHALLENGES.forEach((ch, i) => {
            if (a !== 0 && ch.test(a, b, c)) met[i] = true;
          });
    expect(met).toEqual(CHALLENGES.map(() => true));
  });

  it('a and c of opposite signs always give two roots', () => {
    for (let a = -3; a <= 3; a += 0.5)
      for (let b = -6; b <= 6; b++)
        for (let c = -6; c <= 6; c++) if (a * c < 0) expect(analyse(a, b, c).kind).toBe('two');
  });
});
