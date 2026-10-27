import { describe, it, expect } from 'vitest';
import {
  check,
  checkLine,
  foundCount,
  isLinear,
  lineKind,
  record,
  systemShape,
  systemVerdict,
} from './engine.js';

const eq = { a: 2, b: 3, c: 4 };

describe('one equation', () => {
  it('checks a pair by substitution', () => {
    expect(check(eq, { x: -1, y: 2 })).toEqual({ value: 4, ok: true });
    expect(check(eq, { x: 1, y: 2 })).toEqual({ value: 8, ok: false });
    expect(checkLine(eq, { x: -1, y: 2 })).toBe('2 · (−1) + 3 · 2 = 4, đúng bằng vế phải');
    expect(checkLine(eq, { x: 1, y: 2 })).toBe('2 · 1 + 3 · 2 = 8 ≠ 4');
    expect(checkLine({ a: 1, b: 0, c: -3 }, { x: 2, y: 0 })).toBe('2 = 2 ≠ −3');
  });

  it('knows linear equations and the shape of their solution set', () => {
    expect(isLinear({ a: 0, b: 0, c: 1 })).toBe(false);
    expect(isLinear({ a: 0, b: 2, c: 3 })).toBe(true);
    expect(lineKind({ a: 0, b: 2, c: 3 })).toBe('đường thẳng song song với trục Ox');
    expect(lineKind({ a: 0, b: 2, c: 0 })).toBe('trục Ox');
    expect(lineKind({ a: 1, b: 0, c: 2 })).toBe('đường thẳng song song với trục Oy');
    expect(lineKind({ a: 1, b: 0, c: 0 })).toBe('trục Oy');
    expect(lineKind(eq)).toBe('đường thẳng');
  });

  it('records tried points once each', () => {
    let list = record([], { x: 2, y: 0 }, true);
    list = record(list, { x: 1, y: 1 }, false);
    list = record(list, { x: 2, y: 0 }, true);
    expect(list).toEqual([
      { x: 1, y: 1, ok: false },
      { x: 2, y: 0, ok: true },
    ]);
    expect(foundCount(list)).toBe(1);
  });
});

describe('a system', () => {
  const one = { a: 1, b: 2, c: 4 };
  const two = { a: 1, b: -1, c: 1 };

  it('says which equations a point satisfies', () => {
    expect(systemVerdict(one, two, { x: 2, y: 1 }).tone).toBe('ok');
    expect(systemVerdict(one, two, { x: 0, y: 2 }).text).toMatch(/chỉ thoả mãn phương trình \(1\)/);
    expect(systemVerdict(one, two, { x: 1, y: 0 }).text).toMatch(/chỉ thoả mãn phương trình \(2\)/);
    expect(systemVerdict(one, two, { x: 0, y: 0 }).tone).toBe('info');
  });

  it('reads the number of solutions from the lines', () => {
    expect(systemShape(one, two)).toMatch(/đúng một nghiệm/);
    expect(systemShape(one, { a: 2, b: 1, c: 1 })).toMatch(/không nguyên/);
    expect(systemShape(one, { a: 1, b: 1, c: 0 }, 3)).toMatch(/ngoài khung/);
    expect(systemShape(one, { a: 1, b: 1, c: 0 }, 6)).toMatch(/đúng một nghiệm/);
    expect(systemShape(one, { a: 2, b: 4, c: 1 })).toMatch(/vô nghiệm/);
    expect(systemShape(one, { a: -2, b: -4, c: -8 })).toMatch(/vô số nghiệm/);
  });
});
