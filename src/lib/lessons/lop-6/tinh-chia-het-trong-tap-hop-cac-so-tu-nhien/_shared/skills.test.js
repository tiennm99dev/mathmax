import { describe, it, expect } from 'vitest';
import { rng } from './drill.js';
import {
  CHAPTER_SKILLS,
  boiChung,
  dauHieuChiaHet,
  quanHeChiaHet,
  soNguyenTo,
  starDigits,
  uocChung,
} from './skills.js';

/** @param {import('./drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2025);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Reads every whole number in a prompt, ignoring digit-group spaces. */
const nums = (/** @type {string} */ text) =>
  [...text.replace(/(\d)\u202f(?=\d{3}\b)/g, '$1').matchAll(/\d+/g)].map((m) => Number(m[0]));

const range = (/** @type {number} */ lo, /** @type {number} */ hi) =>
  Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

const brutePrime = (/** @type {number} */ n) => n > 1 && range(2, n - 1).every((d) => n % d !== 0);

const bruteGcd = (/** @type {number} */ a, /** @type {number} */ b) =>
  Math.max(...range(1, Math.min(a, b)).filter((d) => a % d === 0 && b % d === 0));

const bruteLcm = (/** @type {number} */ a, /** @type {number} */ b) => {
  let m = Math.max(a, b);
  while (m % a !== 0 || m % b !== 0) m++;
  return m;
};

describe('every chapter skill', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives natural answers with a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer >= 0, q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.prompt + q.steps.join(' ')).not.toMatch(/undefined|NaN|Infinity/);
      }
    });
  }
});

describe('stored answers match a brute-force recomputation', () => {
  it('Bài 8: divisors and multiples', () => {
    for (const q of sample(quanHeChiaHet)) {
      const v = nums(q.prompt);
      if (q.prompt.includes('bao nhiêu ước')) {
        expect(q.answer).toBe(range(1, v[0]).filter((d) => v[0] % d === 0).length);
      } else if (q.prompt.includes('bao nhiêu bội')) {
        const [k, lo, hi] = v;
        expect(q.answer).toBe(range(lo + 1, hi - 1).filter((x) => x % k === 0).length);
      } else {
        const [k, limit] = v;
        const best = Math.max(...range(0, limit - 1).filter((x) => x % k === 0));
        expect(q.answer, q.prompt).toBe(best);
      }
    }
  });

  it('Bài 9: digit replacing the star', () => {
    for (const q of sample(dauHieuChiaHet)) {
      const pattern = /số (\d*\*\d*)/.exec(q.prompt)?.[1] ?? '';
      expect(pattern).toMatch(/\*/);
      const fits = (/** @type {number[]} */ by) =>
        range(0, 9).filter((d) => {
          const text = pattern.replace('*', String(d));
          return !text.startsWith('0') && by.every((m) => Number(text) % m === 0);
        });
      if (q.prompt.includes('lớn nhất')) {
        expect(q.answer).toBe(Math.max(...fits([9])));
      } else if (q.prompt.includes('Có bao nhiêu')) {
        expect(q.answer).toBe(fits([3]).length);
      } else {
        const by = nums(q.prompt.slice(q.prompt.indexOf('cho cả')));
        const ok = fits(by);
        expect(ok, q.prompt).toEqual([q.answer]);
      }
    }
  });

  it('starDigits never puts 0 in front', () => {
    expect(starDigits([null, 2, 6], [3])).toEqual([1, 4, 7]);
    expect(starDigits([3, null, 5], [9])).toEqual([1]);
  });

  it('Bài 10: primes and factorisations', () => {
    for (const q of sample(soNguyenTo)) {
      const v = nums(q.prompt);
      if (q.prompt.includes('bao nhiêu số nguyên tố')) {
        expect(q.answer).toBe(range(v[0] + 1, v[1] - 1).filter(brutePrime).length);
      } else if (q.prompt.includes('Số mũ')) {
        const [n, p] = v;
        let e = 0;
        let m = n;
        while (m % p === 0) {
          m /= p;
          e++;
        }
        expect(brutePrime(p)).toBe(true);
        expect(q.answer).toBe(e);
      } else {
        const n = v[0];
        expect(q.answer).toBe(Math.max(...range(2, n).filter((d) => n % d === 0 && brutePrime(d))));
      }
    }
  });

  it('Bài 11: common divisors', () => {
    for (const q of sample(uocChung)) {
      const [a, b] = nums(q.prompt);
      const g = bruteGcd(a, b);
      expect(g).toBeGreaterThan(1);
      if (q.prompt.includes('bao nhiêu ước chung')) {
        expect(q.answer).toBe(range(1, g).filter((d) => g % d === 0).length);
      } else {
        expect(q.answer).toBe(g);
      }
    }
  });

  it('Bài 12: common multiples', () => {
    for (const q of sample(boiChung)) {
      const v = nums(q.prompt);
      if (q.prompt.startsWith('Tìm BCNN')) {
        expect(q.answer).toBe(bruteLcm(v[0], v[1]));
      } else if (q.prompt.includes('đèn')) {
        const [, p, q2] = v;
        expect(q.answer).toBe(bruteLcm(p, q2));
      } else {
        const [a, b, lo, hi] = v;
        const xs = range(lo, hi).filter((x) => x % a === 0 && x % b === 0);
        expect(xs, q.prompt).toEqual([q.answer]);
      }
    }
  });
});
