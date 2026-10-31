import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { checkSign, compare, mouthFacing, newPair, sentence } from './engine.js';

describe('comparing numbers engine', () => {
  it('puts the right sign between two numbers', () => {
    expect(compare(7, 4)).toBe('>');
    expect(compare(2, 9)).toBe('<');
    expect(compare(5, 5)).toBe('=');
    expect(compare(0, 10)).toBe('<');
  });

  it('reads the comparison', () => {
    expect(sentence(7, 4)).toBe('7 > 4. Bảy lớn hơn bốn.');
    expect(sentence(3, 8)).toBe('3 < 8. Ba bé hơn tám.');
    expect(sentence(6, 6)).toBe('6 = 6. Sáu bằng sáu.');
  });

  it('opens the mouth towards the larger number', () => {
    expect(mouthFacing(9, 1)).toBe('left');
    expect(mouthFacing(1, 9)).toBe('right');
    expect(mouthFacing(4, 4)).toBe('closed');
  });

  it('checks a picked sign', () => {
    expect(checkSign(8, 3, '>').ok).toBe(true);
    expect(checkSign(8, 3, '<').ok).toBe(false);
    expect(checkSign(8, 3, '<').text).toContain('Số 8 lớn hơn');
    expect(checkSign(2, 2, '>').text).toContain('giống nhau');
    expect(checkSign(2, 2, '=').ok).toBe(true);
  });

  it('draws fresh pairs from 0 to 10', () => {
    const rand = rng(11);
    /** @type {[number, number]} */
    let prev = [3, 7];
    const bad = [];
    for (let i = 0; i < 300; i++) {
      const next = newPair(prev, rand);
      if (next.some((n) => n < 0 || n > 10) || (next[0] === prev[0] && next[1] === prev[1])) {
        bad.push(next);
      }
      prev = next;
    }
    expect(bad).toEqual([]);
  });
});
