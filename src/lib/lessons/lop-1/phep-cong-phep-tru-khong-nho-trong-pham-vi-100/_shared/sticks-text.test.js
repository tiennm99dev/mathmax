import { describe, it, expect } from 'vitest';
import { sticksWords } from './sticks-text.js';

describe('sticks in words', () => {
  it('names bundles and loose sticks', () => {
    expect(sticksWords(41)).toBe('4 chục và 1 que rời');
    expect(sticksWords(70)).toBe('7 chục');
    expect(sticksWords(5)).toBe('5 que rời');
  });
});
