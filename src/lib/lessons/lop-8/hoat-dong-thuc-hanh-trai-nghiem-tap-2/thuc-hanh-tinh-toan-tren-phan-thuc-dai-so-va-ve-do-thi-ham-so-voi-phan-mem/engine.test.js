import { describe, expect, it } from 'vitest';
import {
  CasError,
  FRACTION_TASKS,
  GRAPH_TASKS,
  checkFraction,
  coordText,
  evalNode,
  intercepts,
  linearForm,
  lineTex,
  parse,
  parseGraph,
  run,
  samplePath,
} from './engine.js';

describe('parse', () => {
  it('reads implicit multiplication, powers and division', () => {
    expect(evalNode(parse('2x^2 - 3xy'), { x: 2, y: 1 })).toBe(2);
    expect(evalNode(parse('1/3x'), { x: 6 })).toBeCloseTo(2);
    expect(evalNode(parse('(x + 1)^2'), { x: 2 })).toBe(9);
    expect(evalNode(parse('x + 1^2'), { x: 2 })).toBe(3);
    expect(evalNode(parse('-x^2'), { x: 3 })).toBe(-9);
    expect(() => parse('x : 2')).toThrow(/dấu \//);
  });

  it('reports mistakes in Vietnamese', () => {
    expect(() => parse('(x + 1')).toThrow(CasError);
    expect(() => parse('x + z')).toThrow(/Không hiểu kí hiệu "z"/);
    expect(() => parse('')).toThrow(CasError);
    expect(() => parse('x)')).toThrow(/Thừa dấu ngoặc/);
  });
});

describe('run', () => {
  it('simplifies a fraction as soon as it is entered', () => {
    expect(run('(x^2 - 1)/(x^2 + 2x + 1)').tex).toBe('\\frac{x - 1}{x + 1}');
    expect(run('Simplify((x^2 - 4)/(x^2 + 4x + 4))').tex).toBe('\\frac{x - 2}{x + 2}');
    expect(run('1/(x - 1) - 2/(x^2 - 1)').tex).toBe('\\frac{1}{x + 1}');
    expect(run('(x^2 + 2x)/(x - 3) * (x^2 - 9)/(x^2 + 5x + 6)').tex).toBe('x');
    expect(run('(x^3 - 8)/(x^2 - 4) / ((x^2 + 2x + 4)/(x + 2))').tex).toBe('1');
    // Without brackets round the divisor, both of its parts divide in turn.
    expect(run('(x^3 - 8)/(x^2 - 4) / (x^2 + 2x + 4)/(x + 2)').tex).toBe(
      '\\frac{1}{x^{2} + 4x + 4}',
    );
  });

  it('writes integer coefficients and a positive leading denominator', () => {
    expect(run('(2x)/(4x + 2)').tex).toBe('\\frac{x}{2x + 1}');
    expect(run('x/2 + x/3').tex).toBe('\\frac{5}{6}x');
    expect(run('1/(1 - x)').tex).toBe('\\frac{-1}{x - 1}');
  });

  it('factors numerator and denominator', () => {
    expect(run('Factor(x^3 - 9x)').tex).toBe('x(x - 3)(x + 3)');
    expect(run('Factor(x^2 + 4x + 4)').tex).toBe('(x + 2)^{2}');
    expect(run('Factor(2x^2 + 2)').tex).toBe('2(x^{2} + 1)');
    expect(run('Factor(x - 2)').tex).toBe('x - 2');
    expect(run('Factor((x^2 - 1)/(x^2 - 4))').tex).toBe('\\frac{(x - 1)(x + 1)}{(x - 2)(x + 2)}');
    expect(run('Factor(6x^2 - x - 2)').tex).toBe('(2x + 1)(3x - 2)');
  });

  it('solves equations in x', () => {
    expect(run('Solutions(4.8 - 2.5(x + 3) = x + 0.5(2 - 6x))').tex).toBe('\\{-\\frac{37}{5}\\}');
    expect(run('Solve(2x - 3 = 5)').tex).toBe('\\{x = 4\\}');
    const none = run('Solutions(2(x + 1) = 2x + 5)');
    expect(none.tex).toBe('\\{\\}');
    expect(none.note).toMatch(/vô nghiệm/);
    expect(run('Solutions(3(x - 1) = 3x - 3)').note).toMatch(/vô số nghiệm/);
    const excluded = run('Solutions(x/(x - 1) = 1/(x - 1))');
    expect(excluded.tex).toBe('\\{\\}');
    expect(excluded.note).toMatch(/bị loại/);
  });

  it('refuses two variables and bare equations', () => {
    expect(() => run('(x^2 - y^2)/(x - y)')).toThrow(/một biến x/);
    expect(() => run('x = 2')).toThrow(/Solve/);
  });
});

describe('checkFraction', () => {
  const [rutGon, tru, nhan, haiBien] = FRACTION_TASKS;

  it('accepts the lowest-terms answer in any equivalent writing', () => {
    expect(checkFraction(rutGon, '(x-2)/(x+2)').ok).toBe(true);
    expect(checkFraction(tru, '1/(x+1)').ok).toBe(true);
    expect(checkFraction(nhan, 'x').ok).toBe(true);
    expect(checkFraction(haiBien, '(x^2 + y^2)/(xy)').ok).toBe(true);
    expect(checkFraction(haiBien, '(y^2 + x^2)/(y x)').ok).toBe(true);
  });

  it('rejects wrong values, unreduced fractions and sums of fractions', () => {
    expect(checkFraction(rutGon, '(x+2)/(x-2)').ok).toBe(false);
    const unreduced = checkFraction(rutGon, '(x^2-4)/(x+2)^2');
    expect(unreduced.ok).toBe(false);
    expect(unreduced.message).toMatch(/chưa tối giản/);
    expect(checkFraction(haiBien, '(x - y)/y + (y + x)/x').message).toMatch(/một phân thức/);
    expect(checkFraction(tru, '1/(x +').ok).toBe(false);
  });

  it('agrees with the CAS on every task', () => {
    for (const task of FRACTION_TASKS) {
      expect(checkFraction(task, task.expected).ok).toBe(true);
      if (task.id !== 'hai-bien') expect(run(task.command).tex).toBe(task.resultTex);
    }
  });
});

describe('graphing', () => {
  it('reads y = and f(x) = lines', () => {
    const g = parseGraph('y = -3x + 3', 'f');
    expect(g.name).toBe('f');
    expect(linearForm(g.node, {})).toEqual({ a: -3, b: 3 });
    const h = parseGraph('g(x) = (1/2)x - 4', 'f');
    expect(h.name).toBe('g');
    expect(linearForm(h.node, {})).toEqual({ a: 0.5, b: -4 });
  });

  it('uses a and b as sliders', () => {
    const g = parseGraph('y = a x + b', 'f');
    expect(g.usesSliders).toBe(true);
    expect(linearForm(g.node, { a: 2, b: -1 })).toEqual({ a: 2, b: -1 });
  });

  it('spots functions that are not first-degree', () => {
    expect(linearForm(parseGraph('y = x^2', 'f').node, {})).toBeNull();
    expect(linearForm(parseGraph('y = 1/x', 'f').node, {})).toBeNull();
  });

  it('finds where a line meets the axes', () => {
    expect(intercepts({ a: -3, b: 3 })).toEqual({ x: 1, y: 3 });
    expect(intercepts({ a: 0.5, b: -4 })).toEqual({ x: 8, y: -4 });
    expect(intercepts({ a: 0, b: 2 }).x).toBeNull();
    expect(coordText(1 / 3)).toBe('1/3');
    expect(coordText(-2.5)).toMatch(/2,5/);
  });

  it('writes the line with a decimal comma', () => {
    expect(lineTex({ a: -3, b: 3 })).toBe('y = -3x + 3');
    expect(lineTex({ a: 0.5, b: -4 })).toBe('y = 0{,}5x - 4');
    expect(lineTex({ a: 1, b: 0 })).toBe('y = x');
    expect(lineTex({ a: 0, b: -2 })).toBe('y = -2');
  });

  it('task targets are first-degree lines', () => {
    for (const t of GRAPH_TASKS) expect(t.a).not.toBe(0);
  });

  it('breaks a sampled path where the function is undefined', () => {
    const runs = samplePath(parse('1/x', ['x']), {}, -5, 5, -5, 5);
    expect(runs.length).toBe(2);
  });
});
