import { describe, it, expect } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import {
  KEYS,
  TASKS,
  displayTokens,
  evaluate,
  factorText,
  factorize,
  formatResult,
  lcm,
  press,
  run,
} from './engine.js';

/** @param {string} line keys separated by spaces */
const keys = (line) => line.split(' ');

describe('evaluate', () => {
  it('follows the order of operations', () => {
    expect(
      run(keys('2 lpar 3 mul 5 sq sub 2 lpar 5 add 7 rpar rpar add 3 shift sq eq')).screen,
    ).toBe('129');
    // 3 · {120 + [55 − (11 − 3 · 2²)]} + 2³ = 536
    expect(
      run(
        keys(
          '3 lpar 1 2 0 add lpar 5 5 sub lpar 1 1 sub 3 mul 2 sq rpar rpar rpar add 2 shift sq eq',
        ),
      ).screen,
    ).toBe('536');
  });

  it('multiplies implicitly before a bracket', () => {
    expect(evaluate(['2', '(', '5', '+', '7', ')'])).toBe(24);
  });

  it('closes brackets left open at the end', () => {
    expect(evaluate(['GCD(', '2', '1', '5', ',', '7', '5'])).toBe(5);
  });

  it('binds powers tighter than a leading minus', () => {
    expect(evaluate(['-', '2', 'sq'])).toBe(-4);
    expect(evaluate(['2', '^', '1', '0'])).toBe(1024);
  });

  it('reports errors the way the calculator does', () => {
    expect(run(keys('5 div 0 eq')).screen).toBe('Math ERROR');
    expect(run(keys('5 add mul 2 eq')).screen).toBe('Syntax ERROR');
    expect(run(keys('rpar 2 eq')).screen).toBe('Syntax ERROR');
  });

  it('writes decimals with a comma', () => {
    expect(run(keys('7 div 4 eq')).screen).toBe('1,75');
    expect(formatResult(-2.5)).toBe('−2,5');
  });

  it('switches to powers of ten for very large or very small results', () => {
    expect(run(keys('2 pow 4 0 eq')).screen).toBe('1,099511628 × 10^12');
    expect(formatResult(2 ** 100)).toBe('1,2676506 × 10^30');
    expect(formatResult(1e-12)).toBe('1 × 10^-12');
    expect(formatResult(9999999999)).toBe('9999999999');
  });
});

describe('number theory keys', () => {
  it('finds GCD and LCM', () => {
    expect(gcd(215, 75)).toBe(5);
    expect(lcm(45, 72)).toBe(360);
    expect(run(keys('alpha div 4 5 shift rpar 7 2 rpar eq')).screen).toBe('360');
  });

  it('factorises with FACT', () => {
    expect(factorize(847)).toEqual([
      [7, 1],
      [11, 2],
    ]);
    expect(factorText(246)).toBe('2 × 3 × 41');
    expect(factorText(14791)).toBe('7 × 2113');
    expect(factorText(360)).toBe('2³ × 3² × 5');
  });

  it('asks for = before FACT', () => {
    const s = run(keys('8 4 7 shift fact'));
    expect(s.screen).toBe('');
    expect(s.note).toMatch(/=/);
  });

  it('does not factorise an earlier answer after an error', () => {
    const s = run(keys('8 4 7 eq 5 div 0 eq shift fact'));
    expect(s.screen).toBe('Math ERROR');
    expect(s.note).toMatch(/=/);
  });
});

describe('key handling', () => {
  it('continues from Ans after an operator, starts over after a digit', () => {
    let s = run(keys('6 sq eq'));
    s = press(s, 'add');
    expect(displayTokens(s.tokens)).toBe('Ans+');
    s = press(press(s, '4'), 'eq');
    expect(s.screen).toBe('40');
    s = press(s, '9');
    expect(s.tokens).toEqual(['9']);
  });

  it('shows the expression with calculator symbols', () => {
    const s = run(keys('alpha mul 1 2 shift rpar 1 8 rpar'));
    expect(displayTokens(s.tokens)).toBe('GCD(12,18)');
  });

  it('gives the answers stored in the lesson exercises', () => {
    expect(run(keys('lpar 1 7 add 3 rpar sq sub 4 shift sq div 2 eq')).screen).toBe('368');
    expect(run(keys('3 pow 7 eq')).screen).toBe('2187');
    expect(run(keys('alpha mul 8 4 shift rpar 1 2 0 rpar eq')).screen).toBe('12');
    expect(run(keys('alpha div 3 6 shift rpar 5 4 rpar eq')).screen).toBe('108');
    expect(run(keys('2 4 6 eq shift fact')).screen).toBe('2 × 3 × 41');
  });

  it('runs every guided task to its stated result', () => {
    const ids = new Set(KEYS.map((k) => k.id));
    for (const t of TASKS) {
      for (const k of t.keys) expect(ids.has(k), `${t.id}: ${k}`).toBe(true);
      expect(run(t.keys).screen, t.id).toBe(t.result);
    }
  });
});
