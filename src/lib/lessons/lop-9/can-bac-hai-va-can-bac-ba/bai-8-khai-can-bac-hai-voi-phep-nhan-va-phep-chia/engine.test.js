import { describe, it, expect } from 'vitest';
import {
  SQUARES,
  checkSide,
  compare,
  compareSentence,
  productSentence,
  quotientSentence,
  ratioText,
  side,
} from './engine.js';

describe('tiled squares', () => {
  it('offers perfect squares only', () => {
    for (const s of SQUARES) expect(side(s) ** 2).toBe(s);
  });

  it('reads √(ab) = √a·√b off the tiling', () => {
    expect(productSentence(4, 9)).toContain('√36 = √4·√9 = 2·3 = 6');
    expect(productSentence(4, 9)).toContain('ghép từ 9 hình vuông nhỏ');
  });

  it('reads √(a/b) = √a/√b off the cut square', () => {
    expect(quotientSentence(4, 9)).toContain('√(4/9) = √4/√9 = 2/3.');
    expect(quotientSentence(4, 16)).toContain('= 2/4 = 1/2.');
    expect(quotientSentence(16, 4)).toContain('16/4 = 4');
    expect(quotientSentence(16, 4)).toContain('4/2 = 2');
    expect(ratioText(9, 3)).toBe('3');
  });

  it('checks the guessed side and names the area mistake', () => {
    expect(checkSide(6, 4, 9).tone).toBe('ok');
    expect(checkSide(36, 4, 9).text).toContain('diện tích');
    expect(checkSide(5, 4, 9).tone).toBe('warn');
    expect(checkSide(null, 4, 9).tone).toBe('info');
  });
});

describe('free numbers', () => {
  it('agrees on the product and not on the sum', () => {
    const c = compare(2, 8);
    expect(c.product.text).toBe('4');
    expect(c.ofProduct.text).toBe('4');
    expect(c.sumEqual).toBe(false);
    expect(compareSentence(2, 8)).toContain('√10 ≈ 3,162');
    expect(compare(0, 5).sumEqual).toBe(true);
  });

  it('agrees on the rounded product for every pair', () => {
    for (let a = 0; a <= 50; a++) {
      for (let b = 0; b <= 50; b++) {
        const c = compare(a, b);
        expect(c.product.text, `${a} ${b}`).toBe(c.ofProduct.text);
      }
    }
  });
});
