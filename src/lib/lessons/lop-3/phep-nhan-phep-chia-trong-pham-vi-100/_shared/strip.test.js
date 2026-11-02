import { describe, expect, it } from 'vitest';
import { slipOptions } from './strip.js';

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
