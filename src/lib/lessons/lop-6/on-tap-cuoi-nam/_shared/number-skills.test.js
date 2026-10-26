import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import { inLowestTerms, readValue, sameValue } from '#lib/core/adaptive.js';
import { NUMBER_SKILLS, chiaHet, soNguyen, soThapPhan } from './number-skills.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Integers in a text, typographic minus and narrow-space grouping undone. */
const ints = (/** @type {string} */ text) =>
  [
    ...text
      .replace(/−/g, '-')
      .replace(/(\d)\u202f(?=\d{3}\b)/g, '$1')
      .matchAll(/-?\d+/g),
  ].map((m) => Number(m[0]));

describe('every number skill', () => {
  for (const skill of NUMBER_SKILLS) {
    it(`${skill.id} writes its answer the way it checks it`, () => {
      for (const q of sample(skill)) {
        const all = [q.prompt, q.display, ...q.steps, ...q.hints].join(' ');
        expect(all, q.prompt).not.toMatch(/undefined|NaN|Infinity|\d\.\d/);
        const shown = readValue(q.display);
        expect(shown, q.display).not.toBeNull();
        expect(sameValue(/** @type {any} */ (shown), q.answer), q.prompt).toBe(true);
        expect(q.steps.at(-1), q.prompt).toContain(q.display);
        expect(q.hints.length).toBeGreaterThan(0);
        expect(q.simplest === true, q.prompt).toBe(q.prompt.includes('phân số tối giản'));
        if (q.simplest) expect(inLowestTerms(q.display), q.display).toBe(true);
        for (const h of q.hints) expect(h).not.toBe(q.steps.at(-1));
      }
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('ƯCLN, BCNN and the lining-up problem', () => {
    for (const q of sample(chiaHet)) {
      const n = ints(q.prompt.replace(/khối 6/gi, ''));
      const value = q.answer.n / q.answer.d;
      if (q.prompt.startsWith('Tìm ƯCLN')) expect(value).toBe(gcd(n[0], n[1]));
      else if (q.prompt.startsWith('Tìm BCNN')) expect(value).toBe(lcm(n[0], n[1]));
      else {
        const [lo, hi, ...rest] = n;
        const r = rest.at(-1) ?? 0;
        const rows = rest.slice(0, -1);
        const fits = [];
        for (let x = lo; x <= hi; x++) if (rows.every((k) => x % k === r)) fits.push(x);
        expect(fits, q.prompt).toEqual([value]);
      }
    }
  });

  it('integer equations', () => {
    for (const q of sample(soNguyen)) {
      if (!q.prompt.startsWith('Tìm số nguyên x')) continue;
      const [a, c] = ints(q.prompt.replace(/\(|\)/g, ''));
      expect(q.answer.n + a).toBe(c);
    }
  });

  it('rounding never lands on a tie and rounds half up', () => {
    for (const q of sample(soThapPhan)) {
      if (!q.prompt.startsWith('Làm tròn')) continue;
      const m = /số (\d+),(\d+) đến hàng (phần mười|phần trăm)/.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const x = Number(`${m?.[1]}.${m?.[2]}`);
      const places = m?.[3] === 'phần mười' ? 1 : 2;
      expect(q.answer.n / q.answer.d).toBeCloseTo(Math.round(x * 10 ** places) / 10 ** places, 9);
    }
  });
});
