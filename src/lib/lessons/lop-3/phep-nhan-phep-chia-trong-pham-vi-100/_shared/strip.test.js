import { describe, expect, it } from 'vitest';
import { holdsText, slipOptions } from './strip.js';

describe('numbers on strip pieces', () => {
  it('prints a number only on a piece wide enough for it', () => {
    expect(holdsText(3, 30)).toBe(true);
    expect(holdsText(2, 60)).toBe(false);
  });
});

describe('options from real slips', () => {
  it('holds the right answer once, among different numbers in order', () => {
    const { options, answer } = slipOptions(18, [9, 24, 12]);
    expect(options).toEqual(['9', '12', '18', '24']);
    expect(options[answer]).toBe('18');
  });

  it('drops a slip equal to the answer and still gives four choices', () => {
    const { options, answer } = slipOptions(4, [4, 0]);
    expect(options).toEqual(['0', '4', '5', '6']);
    expect(options[answer]).toBe('4');
  });
});
