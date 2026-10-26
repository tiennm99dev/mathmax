import { describe, expect, it } from 'vitest';
import {
  CasError,
  checkAnswer,
  equal,
  expandFactored,
  factor,
  factorCount,
  factoredTex,
  parse,
  polyTex,
  readPoly,
  run,
  valueTex,
  TASKS,
  checkTask,
} from './engine.js';

/** @param {string} text */
const tex = (text) => valueTex(run(text));
/** @param {string} text */
const poly = (text) => /** @type {import('./engine.js').Poly} */ (readPoly(text));

describe('computing and expanding', () => {
  it('collects like terms in the GeoGebra order', () => {
    expect(tex('(2x + y)(x - 3y) + 5xy')).toBe('2x^{2} - 3y^{2}');
    expect(tex('x^2y + 3xy^2 - x^2y + 2')).toBe('3xy^{2} + 2');
  });

  it('expands powers of sums with fractions', () => {
    expect(tex('Expand((5x - y)^2)')).toBe('25x^{2} - 10xy + y^{2}');
    expect(tex('Expand((1/3x + 2y)^3)')).toBe(
      '\\frac{1}{27}x^{3} + \\frac{2}{3}x^{2}y + 4xy^{2} + 8y^{3}',
    );
  });

  it('reads implicit products, superscripts and the book minus sign', () => {
    expect(tex('2xy^2·3x')).toBe('6x^{2}y^{2}');
    expect(tex('(x − 1)²')).toBe('x^{2} - 2x + 1');
    expect(tex('-x^2 + x')).toBe('-x^{2} + x');
  });

  it('divides by a monomial with "/" only when it divides exactly', () => {
    expect(tex('(6x^3y - 4x^2y^2)/(2x^2y)')).toBe('3x - 2y');
    expect(() => run('(x + 1)/(x - 1)')).toThrow(CasError);
  });
});

describe('Division, Div and Mod', () => {
  it('give quotient and remainder of one-variable polynomials', () => {
    expect(tex('Division(2x^3 + 5x^2 - 2x + 12, 2x^2 - x + 1)')).toBe(
      '\\left\\{x + 3,\\ 9\\right\\}',
    );
    expect(tex('Div(x^3 - 1, x - 1)')).toBe('x^{2} + x + 1');
    expect(tex('Mod(x^2 + 1, x - 2)')).toBe('5');
  });

  it('divide by a monomial term by term', () => {
    expect(tex('Division(3x^4y - 9x^3y^2 - 21x^2y^2, 3x^2y)')).toBe(
      '\\left\\{x^{2} - 3xy - 7y,\\ 0\\right\\}',
    );
  });

  it('refuse two different variables in a long division', () => {
    expect(() => run('Division(x^2 + y, x + y)')).toThrow(CasError);
  });
});

describe('Factor', () => {
  it('finds rational roots and leaves x^2 - 2 alone', () => {
    const f = factor(poly('x^4 - 4x^3 - 7x^2 + 8x + 10'));
    expect(factoredTex(f)).toBe('(x - 5)(x + 1)(x^{2} - 2)');
    expect(factorCount(f)).toBe(3);
    expect(tex('Factor(x^2 - 2)')).toBe('x^{2} - 2');
  });

  it('factors in several variables', () => {
    expect(tex('Factor((x + y + z)^3 - x^3 - y^3 - z^3)')).toBe('3(x + y)(x + z)(y + z)');
    expect(tex('Factor(x^2 - y^2)')).toBe('(x - y)(x + y)');
    expect(tex('Factor(x^2 + 2xy + y^2)')).toBe('(x + y)^{2}');
  });

  it('takes out numbers, signs and common monomials', () => {
    expect(tex('Factor(2x^3 - 6x^2)')).toBe('2x^{2}(x - 3)');
    expect(tex('Factor(-x^2 + 1)')).toBe('-(x - 1)(x + 1)');
    expect(tex('Factor(6x^2 - x - 2)')).toBe('(2x + 1)(3x - 2)');
  });

  it('always multiplies back to the input', () => {
    for (const text of [
      'x^3 - 3x^2 - 4x + 12',
      '4x^2 - 9y^2',
      'x^2y - xy^2',
      '(x + y + z)^3 - x^3 - y^3 - z^3',
    ]) {
      const p = poly(text);
      expect(equal(expandFactored(factor(p)), p)).toBe(true);
    }
  });
});

describe('errors', () => {
  it('explain what went wrong in Vietnamese', () => {
    expect(() => parse('(x + 1')).toThrow('Thiếu dấu ngoặc đóng');
    expect(() => parse('x^y')).toThrow('Số mũ');
    expect(() => parse('Khaitrien(x)')).toThrow('không có lệnh');
    expect(() => run('Division(x)')).toThrow('hai đa thức');
    expect(() => parse('x $ 2')).toThrow('kí tự');
  });
});

describe('checkAnswer', () => {
  const expanded = poly('25x^2 - 10xy + y^2');

  it('accepts an expanded answer in any term order', () => {
    expect(checkAnswer('y^2 - 10xy + 25x^2', expanded, 'expanded').ok).toBe(true);
  });

  it('rejects a right value that is not expanded', () => {
    const r = checkAnswer('(5x - y)^2', expanded, 'expanded');
    expect(r.ok).toBe(false);
    expect(r.message).toContain('chưa khai triển');
  });

  it('rejects a wrong value', () => {
    expect(checkAnswer('25x^2 - 5xy + y^2', expanded, 'expanded').ok).toBe(false);
  });

  it('demands every factor', () => {
    const p = poly('x^4 - 4x^3 - 7x^2 + 8x + 10');
    expect(checkAnswer('(x-5)(x+1)(x^2-2)', p, 'factored').ok).toBe(true);
    expect(checkAnswer('(x^2-4x-5)(x^2-2)', p, 'factored').ok).toBe(false);
    expect(checkAnswer('3(x+y)(y+z)(z+x)', poly('(x+y+z)^3-x^3-y^3-z^3'), 'factored').ok).toBe(
      true,
    );
  });

  it('refuses a GeoGebra command as an answer', () => {
    expect(checkAnswer('Expand((5x-y)^2)', expanded, 'expanded').ok).toBe(false);
  });

  it('prints the zero polynomial', () => {
    expect(polyTex(poly('x - x'))).toBe('0');
  });
});

describe('TASKS', () => {
  it('accept the book answers', () => {
    const answers = {
      tinh: ['2x^2 - 3y^2'],
      kt1: ['25x^2 - 10xy + y^2'],
      kt2: ['1/27x^3 + 2/3x^2y + 4xy^2 + 8y^3'],
      pt1: ['(x - 5)(x + 1)(x^2 - 2)'],
      pt2: ['3(x + y)(y + z)(z + x)'],
      chia1: ['x^2 - 3xy - 7y', '0'],
      chia2: ['x + 3', '9'],
    };
    for (const task of TASKS) {
      const [a, b] = answers[/** @type {keyof typeof answers} */ (task.id)];
      expect(checkTask(task, a, b), task.id).toMatchObject({ ok: true });
    }
  });

  it('report which part of a division is wrong', () => {
    const task = /** @type {import('./engine.js').Task} */ (TASKS.find((t) => t.id === 'chia2'));
    expect(checkTask(task, 'x + 3', '12').message).toMatch(/^Số dư/);
    expect(checkTask(task, 'x + 2', '9').message).toMatch(/^Thương/);
  });
});
