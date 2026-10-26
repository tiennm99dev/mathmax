import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { collect, evalPoly, mulMono, neg, parsePoly, polyDegree, varKey } from './poly.js';
import { SKILLS_TRANG_17, congTruDaThuc, daThuc, donThuc } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Reads a polynomial as the prompts print it ('−3x²y + xy') back into
 * monomials, independently of the writer.
 * @param {string} text
 */
function fromText(text) {
  const src = [...text.replace(/−/g, '-')]
    .map((ch) => (SUP.includes(ch) ? `^${SUP.indexOf(ch)}` : ch))
    .join('')
    .replace(/\^(\d)\^(\d)/g, '^$1$2');
  return parsePoly(src);
}

/** @param {string} prompt */
function pointOf(prompt) {
  const m = /x = (−?\d+), y = (−?\d+)/.exec(prompt);
  if (!m) throw new Error(prompt);
  return { x: Number(m[1].replace('−', '-')), y: Number(m[2].replace('−', '-')) };
}

describe('every chapter skill', () => {
  for (const skill of SKILLS_TRANG_17) {
    it(`${skill.id} gives integer answers with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        const all = q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ');
        expect(all, all).not.toMatch(/undefined|NaN|Infinity|null|--|\+ −|\+ -|−−|\^/);
      }
    });
  }
});

describe('answers recomputed from the prompts', () => {
  it('monomials', () => {
    for (const q of sample(donThuc)) {
      const product = /đơn thức (.+) rồi cho biết bậc|đơn thức (.+)\. Hệ số/.exec(q.prompt);
      if (product) {
        const [a, b] = (product[1] ?? product[2])
          .split(' · ')
          .map((s) => fromText(s.replace(/[()]/g, ''))[0]);
        const p = mulMono(a, b);
        const want = q.prompt.includes('bậc') ? polyDegree([p]) : p.coef;
        expect(q.answer, q.prompt).toBe(want);
        continue;
      }
      const sum = /^Tính (.+)\. Hệ số/.exec(q.prompt);
      if (sum) {
        const terms = fromText(sum[1]);
        expect(new Set(terms.map(varKey)).size).toBe(1);
        expect(q.answer, q.prompt).toBe(collect(terms)[0].coef);
        continue;
      }
      const value = /đơn thức (.+) tại/.exec(q.prompt);
      expect(value, q.prompt).not.toBeNull();
      expect(q.answer, q.prompt).toBe(evalPoly(fromText(value?.[1] ?? ''), pointOf(q.prompt)));
    }
  });

  it('polynomials', () => {
    for (const q of sample(daThuc)) {
      const m = /đa thức (.+?)(?:\. Dạng| tại|\.$)/.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const p = fromText(m?.[1] ?? '');
      if (q.prompt.startsWith('Tìm bậc')) expect(q.answer, q.prompt).toBe(polyDegree(p));
      else if (q.prompt.includes('bao nhiêu hạng tử')) expect(q.answer).toBe(collect(p).length);
      else expect(q.answer, q.prompt).toBe(evalPoly(p, pointOf(q.prompt)));
    }
  });

  it('sums and differences', () => {
    for (const q of sample(congTruDaThuc)) {
      const m = /Cho A = (.+) và B = (.+?)\. /.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const a = fromText(m?.[1] ?? '');
      const b = fromText(m?.[2] ?? '');
      const res = collect([...a, ...(q.prompt.includes('A − B') ? neg(b) : b)]);
      const part = /hạng tử chứa (\S+) là/.exec(q.prompt);
      if (part) {
        const key = varKey(fromText(part[1])[0]);
        expect(q.answer, q.prompt).toBe(res.find((t) => varKey(t) === key)?.coef ?? 0);
      } else if (q.prompt.includes('Tìm bậc')) {
        expect(q.answer, q.prompt).toBe(polyDegree(res));
      } else {
        expect(q.answer, q.prompt).toBe(evalPoly(res, pointOf(q.prompt)));
      }
    }
  });
});
