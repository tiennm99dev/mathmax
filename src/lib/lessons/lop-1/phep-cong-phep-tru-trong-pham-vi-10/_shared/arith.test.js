import { describe, it, expect } from 'vitest';
import {
  addText,
  addWords,
  clampInt,
  relatedSubtractions,
  subText,
  subWords,
  wordOf,
} from './arith.js';

describe('addition and subtraction text', () => {
  it('prints and reads an addition', () => {
    expect(addText(3, 2)).toBe('3 + 2 = 5');
    expect(addWords(3, 2)).toBe('ba cộng hai bằng năm');
  });

  it('prints and reads a subtraction with the book minus sign', () => {
    expect(subText(5, 2)).toBe('5 − 2 = 3');
    expect(subWords(4, 4)).toBe('bốn trừ bốn bằng không');
  });

  it('names the numbers 0 to 10', () => {
    expect(wordOf(0)).toBe('không');
    expect(wordOf(10)).toBe('mười');
  });

  it('clamps whole numbers', () => {
    expect(clampInt(12, 0, 10)).toBe(10);
    expect(clampInt(-1, 0, 10)).toBe(0);
  });

  it('lists the subtractions that undo an addition', () => {
    expect(relatedSubtractions(3, 2)).toEqual(['5 − 2 = 3', '5 − 3 = 2']);
    expect(relatedSubtractions(4, 4)).toEqual(['8 − 4 = 4']);
  });
});
