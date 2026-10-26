import { describe, it, expect } from 'vitest';
import { kindOf } from './integers.js';

describe('kindOf', () => {
  it('names the sign of an integer', () => {
    expect(kindOf(3)).toBe('số nguyên dương');
    expect(kindOf(-3)).toBe('số nguyên âm');
    expect(kindOf(0)).toMatch(/^số 0/);
  });
});
