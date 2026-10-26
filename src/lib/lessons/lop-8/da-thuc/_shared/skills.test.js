import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  collect,
  evalPoly,
  mono,
  mulMono,
  mulPoly,
  neg,
  parsePoly,
  polyDegree,
  varKey,
} from './poly.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_17,
  SKILLS_TRANG_25,
  chiaDaThuc,
  congTruDaThuc,
  daThuc,
  donThuc,
  nhanDaThuc,
} from './skills.js';

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
  it('lists one skill per lesson', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_17, ...SKILLS_TRANG_25]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(5);
  });

  for (const skill of CHAPTER_SKILLS) {
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

/**
 * The quotient of a polynomial by a monomial, term by term, or null when a
 * term is not divisible or, with `whole`, a coefficient is not an integer.
 * @param {import('./poly.js').Mono[]} a
 * @param {import('./poly.js').Mono} b
 * @param {boolean} [whole]
 */
function divide(a, b, whole = true) {
  const out = [];
  for (const t of a) {
    /** @type {Record<string, number>} */
    const vars = { ...t.vars };
    for (const [name, e] of Object.entries(b.vars)) {
      if ((vars[name] ?? 0) < e) return null;
      vars[name] -= e;
    }
    if (whole && t.coef % b.coef !== 0) return null;
    out.push(mono(t.coef / b.coef, vars));
  }
  return out;
}

describe('answers recomputed from the prompts, second half', () => {
  it('products', () => {
    for (const q of sample(nhanDaThuc)) {
      const one = /^Tính ([^(]+)\(([^()]+)\)\. Hệ số của hạng tử chứa (\S+) trong/.exec(q.prompt);
      if (one) {
        const res = mulPoly(fromText(one[1]), fromText(one[2]));
        const key = varKey(fromText(one[3])[0]);
        expect(q.answer, q.prompt).toBe(res.find((t) => varKey(t) === key)?.coef);
        continue;
      }
      const two = /\(([^()]+)\)\(([^()]+)\)/.exec(q.prompt);
      expect(two, q.prompt).not.toBeNull();
      const res = mulPoly(fromText(two?.[1] ?? ''), fromText(two?.[2] ?? ''));
      if (q.prompt.includes('chứa xy')) {
        expect(q.answer, q.prompt).toBe(res.find((t) => varKey(t) === 'x1y1')?.coef ?? 0);
      } else if (q.prompt.includes('Tìm bậc')) {
        expect(q.answer, q.prompt).toBe(polyDegree(res));
      } else {
        expect(q.answer, q.prompt).toBe(evalPoly(res, pointOf(q.prompt)));
      }
    }
  });

  it('quotients', () => {
    for (const q of sample(chiaDaThuc)) {
      const n = /đa thức (.+) chia hết cho đơn thức (.+)\.$/.exec(q.prompt);
      if (n) {
        const b = fromText(n[2])[0];
        /** @param {number} k */
        const at = (k) => divide(fromText(n[1].replace(/ⁿ/g, SUP[k])), b, false);
        expect(at(q.answer), q.prompt).not.toBeNull();
        if (q.answer > 0) expect(at(q.answer - 1), q.prompt).toBeNull();
        continue;
      }
      const m = /phép chia \(([^()]+)\) : \(?([^()\s]+)\)?(?:\.| rồi)/.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const quot = divide(fromText(m?.[1] ?? ''), fromText(m?.[2] ?? '')[0]);
      expect(quot, q.prompt).not.toBeNull();
      const res = /** @type {import('./poly.js').Mono[]} */ (quot);
      const part = /hạng tử chứa (\S+) trong thương/.exec(q.prompt);
      if (part) {
        const key = varKey(fromText(part[1])[0]);
        expect(q.answer, q.prompt).toBe(res.find((t) => varKey(t) === key)?.coef);
      } else if (q.prompt.includes('bậc')) {
        expect(q.answer, q.prompt).toBe(polyDegree(res));
      } else {
        expect(q.answer, q.prompt).toBe(evalPoly(res, pointOf(q.prompt)));
      }
    }
  });
});
