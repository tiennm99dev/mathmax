import { describe, it, expect } from 'vitest';
import { CHALLENGES, compare, predecessor, relationSentence, successor } from './engine.js';

describe('order on the number ray', () => {
  it('compares two numbers', () => {
    expect(compare(3, 7)).toBe('<');
    expect(compare(7, 3)).toBe('>');
    expect(compare(5, 5)).toBe('=');
  });

  it('links left of to smaller than', () => {
    expect(relationSentence(3, 7)).toContain('bên trái');
    expect(relationSentence(3, 7)).toContain('3 < 7');
    expect(relationSentence(9, 2)).toContain('9 > 2');
    expect(relationSentence(4, 4)).toContain('trùng nhau');
  });

  it('0 has no predecessor; every number has a successor', () => {
    expect(predecessor(0)).toBeNull();
    expect(predecessor(10)).toBe(9);
    expect(successor(0)).toBe(1);
  });
});

describe('challenges', () => {
  it('each challenge has a solution on the ray 0..20 and is not always true', () => {
    for (const c of CHALLENGES) {
      let yes = 0;
      let total = 0;
      for (let a = 0; a <= 20; a++) {
        for (let b = 0; b <= 20; b++) {
          total++;
          if (c.check(a, b)) yes++;
        }
      }
      expect(yes, c.text).toBeGreaterThan(0);
      expect(yes, c.text).toBeLessThan(total);
    }
  });
});
