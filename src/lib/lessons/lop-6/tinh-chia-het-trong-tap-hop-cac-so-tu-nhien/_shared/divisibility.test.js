import { describe, it, expect } from 'vitest';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import {
  digitSum,
  digitTestReason,
  divisorsOf,
  factorTex,
  factorText,
  factorize,
  gcdFactors,
  lcmFactors,
  multiplesUpTo,
  passesDigitTest,
  productOf,
} from './divisibility.js';

describe('divisorsOf', () => {
  it('lists every divisor in order', () => {
    expect(divisorsOf(1)).toEqual([1]);
    expect(divisorsOf(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(divisorsOf(36)).toEqual([1, 2, 3, 4, 6, 9, 12, 18, 36]);
    expect(divisorsOf(13)).toEqual([1, 13]);
  });

  it('agrees with trial division up to 300', () => {
    for (let n = 1; n <= 300; n++) {
      const brute = Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
      expect(divisorsOf(n)).toEqual(brute);
    }
  });
});

describe('multiplesUpTo', () => {
  it('starts at 0 unless told not to', () => {
    expect(multiplesUpTo(4, 30)).toEqual([0, 4, 8, 12, 16, 20, 24, 28]);
    expect(multiplesUpTo(7, 21, false)).toEqual([7, 14, 21]);
  });
});

describe('digit tests', () => {
  it('match real divisibility for 1 to 3000', () => {
    for (let n = 1; n <= 3000; n++) {
      for (const d of /** @type {const} */ ([2, 3, 5, 9])) {
        expect(passesDigitTest(n, d), `${n} / ${d}`).toBe(n % d === 0);
      }
    }
  });

  it('explain the decision', () => {
    expect(digitSum(1234)).toBe(10);
    expect(digitTestReason(135, 9)).toBe(
      'Tổng các chữ số 1 + 3 + 5 = 9 chia hết cho 9, nên 135 chia hết cho 9.',
    );
    expect(digitTestReason(47, 2)).toContain('không chia hết cho 2');
    expect(digitTestReason(85, 5)).toContain('85 chia hết cho 5');
  });
});

describe('factorize', () => {
  it('rebuilds n from its prime factors', () => {
    for (let n = 2; n <= 2000; n++) expect(productOf(factorize(n))).toBe(n);
    expect(factorize(84)).toEqual([
      [2, 2],
      [3, 1],
      [7, 1],
    ]);
  });

  it('prints like the book', () => {
    expect(factorText(factorize(84))).toBe('2² · 3 · 7');
    expect(factorTex(factorize(72))).toBe('2^{3} \\cdot 3^{2}');
  });

  it('builds ƯCLN and BCNN from the factors', () => {
    for (let a = 2; a <= 120; a++) {
      for (let b = 2; b <= 120; b++) {
        expect(productOf(lcmFactors(a, b))).toBe(lcm(a, b));
        expect(productOf(gcdFactors(a, b))).toBe(gcd(a, b));
      }
    }
  });
});
