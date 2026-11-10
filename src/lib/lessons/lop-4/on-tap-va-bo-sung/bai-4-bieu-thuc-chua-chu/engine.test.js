import { describe, expect, it } from 'vitest';
import { EXPRESSIONS, reachedGoal, startValues, substitution } from './engine.js';

const byId = (/** @type {string} */ id) => {
  const e = EXPRESSIONS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

describe('expressions with letters', () => {
  it('take the book values', () => {
    expect(byId('square').value({ a: 9, b: 0, c: 0 })).toBe(36);
    expect(byId('mixed').value({ a: 6, b: 0, c: 0 })).toBe(65);
    expect(byId('rect').value({ a: 34, b: 28, c: 0 })).toBe(124);
    expect(byId('triangle').value({ a: 62, b: 75, c: 81 })).toBe(218);
  });

  it('write the substitution the book way', () => {
    expect(substitution(byId('square'), { a: 5, b: 0, c: 0 })).toBe(
      'Nếu a = 5 thì a × 4 = 5 × 4 = 20.',
    );
    expect(substitution(byId('rect'), { a: 10, b: 7, c: 0 })).toBe(
      'Nếu a = 10, b = 7 thì (a + b) × 2 = (10 + 7) × 2 = 17 × 2 = 34.',
    );
    expect(substitution(byId('mixed'), { a: 2, b: 0, c: 0 })).toBe(
      'Nếu a = 2 thì 35 + 5 × a = 35 + 5 × 2 = 35 + 10 = 45.',
    );
  });

  it('start away from the goal, and the goal is within reach', () => {
    const wrong = [];
    for (const e of EXPRESSIONS) {
      if (reachedGoal(e, startValues(e))) wrong.push(`${e.id} starts at goal`);
      for (const { letter, min, max, start } of e.letters) {
        const g = e.goal.values[letter] ?? -1;
        if (g < min || g > max || start < min || start > max) wrong.push(`${e.id} ${letter}`);
      }
    }
    expect(wrong).toEqual([]);
  });
});
