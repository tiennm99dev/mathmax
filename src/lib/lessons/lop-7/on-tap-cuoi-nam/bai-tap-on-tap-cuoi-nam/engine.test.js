import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  REVIEW_SKILLS,
  daThuc,
  daiLuongTiLe,
  hinhKhoi,
  polyAt,
  polyText,
  soHuuTi,
  soThuc,
  tamGiac,
  thongKe,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 500) {
  const r = rng(2027);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Numbers in a text, with the book's minus, grouping and decimal comma undone. */
const nums = (/** @type {string} */ text) =>
  [
    ...text
      .replace(/−/g, '-')
      .replace(/(\d)\u202f(?=\d{3}\b)/g, '$1')
      .replace(/(\d),(\d)/g, '$1.$2')
      .matchAll(/-?\d+(?:\.\d+)?/g),
  ].map((m) => Number(m[0]));

/** @param {import('#lib/fraction-engine/fraction.js').Fraction} f */
const value = (f) => f.n / f.d;

describe('polynomial helpers', () => {
  it('writes polynomials the way the book does, with zero terms left out', () => {
    expect(polyText([2, -3, 0, 5])).toBe('2x³ − 3x² + 5');
    expect(polyText([1, 0, -1, 0])).toBe('x³ − x');
    expect(polyText([-1, 1, 0])).toBe('−x² + x');
    expect(polyText([0, 0])).toBe('0');
    expect(polyAt([2, -3, 0, 5], -2)).toBe(-23);
  });
});

describe('every review skill', () => {
  for (const skill of REVIEW_SKILLS) {
    it(`${skill.id} writes its answer the way it checks it`, () => {
      for (const q of sample(skill)) {
        const all = [q.prompt, q.display, ...q.steps, ...q.hints].join(' ');
        expect(all, q.prompt).not.toMatch(/undefined|NaN|Infinity|\d\.\d|--|\+ -/);
        // A negative number after an operation sign is written in brackets.
        expect(all, q.prompt).not.toMatch(/[\d)x²³] [+−·:] −/);
        const shown = readValue(q.display);
        expect(shown, q.display).not.toBeNull();
        expect(sameValue(/** @type {any} */ (shown), q.answer), q.prompt).toBe(true);
        expect(q.steps.at(-1), q.prompt).toContain(q.display);
        expect(q.hints.length).toBeGreaterThan(0);
        expect(q.simplest === true, q.prompt).toBe(q.prompt.includes('phân số tối giản'));
        if (q.simplest) expect(inLowestTerms(q.display), q.display).toBe(true);
        for (const h of q.hints) expect(h).not.toContain(`= ${q.display}.`);
      }
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('rational numbers', () => {
    for (const q of sample(soHuuTi)) {
      const f = fracs(q.prompt);
      const x = value(q.answer);
      if (q.prompt.startsWith('Tìm x')) expect(x).toBeCloseTo(f[1] + f[0], 12);
      else if (q.prompt.includes('²')) expect(x).toBeCloseTo(f[0] * f[0] - f[1], 12);
      else expect(x).toBeCloseTo(f[0] + f[1] / f[2], 12);
    }
  });

  it('square roots and absolute values', () => {
    for (const q of sample(soThuc)) {
      const n = nums(q.prompt);
      if (q.prompt.startsWith('Tính')) {
        expect(value(q.answer)).toBeCloseTo(Math.sqrt(n[0]) + Math.sqrt(n[1]), 9);
      } else if (q.prompt.startsWith('Tìm')) {
        const a = n[0];
        const b = n.at(-1) ?? 0;
        const x = value(q.answer);
        expect(x).toBeLessThan(a);
        expect(Math.abs(x - a)).toBe(b);
      } else {
        expect(value(q.answer)).toBeCloseTo(Math.round(Math.sqrt(n[0]) * 100) / 100, 9);
      }
    }
  });

  it('proportions', () => {
    for (const q of sample(daiLuongTiLe)) {
      const n = nums(q.prompt.replace(/7A|7B|7C/g, ''));
      const x = value(q.answer);
      if (q.prompt.startsWith('Tìm x')) {
        const [a, b, c] = [n[0], n[1], n[2]];
        expect(x * c).toBe(a * b);
      } else if (q.prompt.startsWith('Ba lớp')) {
        const [total, p, qq, r] = n;
        const cls = /Lớp (7[ABC])/.exec(q.prompt)?.[1];
        const share = cls === '7A' ? p : cls === '7B' ? qq : r;
        expect(x).toBe((total / (p + qq + r)) * share);
      } else {
        const [w1, d1, w2] = n;
        expect(x * w2).toBe(w1 * d1);
      }
    }
  });

  it('polynomial values, roots and coefficients', () => {
    for (const q of sample(daThuc)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Tìm nghiệm')) {
        const poly = /= (.+)\.$/.exec(q.prompt)?.[1] ?? '';
        const [a, b] = parseLinear(poly);
        expect(a * x + b).toBe(0);
      } else if (q.prompt.startsWith('Tính giá trị')) {
        const m = /P\(x\) = (.+) tại x = (.+)\.$/.exec(q.prompt);
        const terms = parsePoly(m?.[1] ?? '');
        const at = nums(m?.[2] ?? '')[0];
        expect(x).toBe(terms.reduce((sum, [c, e]) => sum + c * at ** e, 0));
      } else {
        const m =
          /P\(x\) = (.+) và Q\(x\) = (.+)\. Tìm (.+) trong đa thức P\(x\) ([+−]) Q\(x\)\.$/.exec(
            q.prompt,
          );
        const power = m?.[3] === 'hệ số tự do' ? 0 : m?.[3] === 'hệ số của x' ? 1 : 2;
        const coef = (/** @type {string} */ t) =>
          parsePoly(t).reduce((sum, [c, e]) => (e === power ? sum + c : sum), 0);
        const p = coef(m?.[1] ?? '');
        const qq = coef(m?.[2] ?? '');
        expect(x).toBe(m?.[4] === '+' ? p + qq : p - qq);
      }
    }
  });

  it('statistics', () => {
    for (const q of sample(thongKe)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.startsWith('Lớp 7B')) expect(x).toBe((n[2] * n[1]) / 100);
      else if (q.prompt.startsWith('Trong')) expect(x).toBeCloseTo((n[1] * 100) / n[0], 12);
      else {
        const counts = n.filter((_, i) => i % 2 === 1);
        expect(x).toBe(Math.max(...counts) - Math.min(...counts));
      }
    }
  });

  it('triangle facts', () => {
    for (const q of sample(tamGiac)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes('góc ngoài')) expect(x).toBe(n[0] + n[1]);
      else if (q.prompt.includes('cân tại A')) expect(2 * x + n[0]).toBe(180);
      else if (q.prompt.includes('góc C')) expect(x + n[0] + n[1]).toBe(180);
      else if (q.prompt.includes('trọng tâm'))
        expect(x).toBe(q.prompt.includes('AG') ? (2 * n[0]) / 3 : n[0] / 3);
      else {
        const [a, b] = n;
        let count = 0;
        for (let c = 1; c < 100; c++) if (c < a + b && a < b + c && b < a + c) count++;
        expect(x).toBe(count);
      }
    }
  });

  it('solids', () => {
    for (const q of sample(hinhKhoi)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes('hộp chữ nhật')) {
        expect(n[1]).toBeLessThanOrEqual(n[0]);
        expect(x).toBe(n[0] * n[1] * n[2]);
      } else if (q.prompt.includes('lập phương')) expect(x).toBe(4 * n[0] * n[0]);
      else if (q.prompt.includes('lăng trụ đứng tam giác'))
        expect(x).toBe((n[0] + n[1] + n[2]) * n[3]);
      else expect(x).toBe((((n[0] + n[1]) * n[2]) / 2) * n[3]);
    }
  });

  it('probabilities', () => {
    for (const q of sample(xacSuat)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Một hộp')) {
        const n = nums(q.prompt);
        const total = n[3];
        const k = n.at(-1) ?? 1;
        let fav = 0;
        for (let i = 1; i <= total; i++) if (i % k === 0) fav++;
        expect(x).toBeCloseTo(fav / total, 12);
      } else {
        const event = /Số chấm xuất hiện (.+)"/.exec(q.prompt)?.[1] ?? '';
        /** @type {Record<string, (d: number) => boolean>} */
        const tests = {
          'là số nguyên tố': (d) => [2, 3, 5].includes(d),
          'là số chẵn': (d) => d % 2 === 0,
          'chia hết cho 3': (d) => d % 3 === 0,
          'lớn hơn 4': (d) => d > 4,
          'nhỏ hơn 7': (d) => d < 7,
          'lớn hơn 6': (d) => d > 6,
          'là số lẻ nhỏ hơn 4': (d) => d % 2 === 1 && d < 4,
          'khác 6': (d) => d !== 6,
        };
        const fav = [1, 2, 3, 4, 5, 6].filter(tests[event]).length;
        expect(x).toBeCloseTo(fav / 6, 12);
      }
    }
  });
});

/**
 * Coefficients [a, b] of a linear polynomial written like '−3x + 6'.
 * @param {string} poly
 */
function parseLinear(poly) {
  const m = /^(−?)(\d*)x(?: ([+−]) (\d+))?$/.exec(poly);
  if (!m) throw new Error(poly);
  const a = (m[1] ? -1 : 1) * (m[2] ? Number(m[2]) : 1);
  const b = m[3] ? (m[3] === '−' ? -1 : 1) * Number(m[4]) : 0;
  return [a, b];
}

/**
 * Fractions and integers in a text as numbers, in order: '(−3/4) + 2' → [−0.75, 2].
 * @param {string} text
 */
function fracs(text) {
  return [...text.replace(/−/g, '-').matchAll(/-?\d+(?:\/\d+)?/g)].map((m) => {
    const [p, d = '1'] = m[0].split('/');
    return Number(p) / Number(d);
  });
}

/**
 * Terms [coefficient, exponent] of a polynomial written like '−3x³ + x − 5'.
 * @param {string} poly
 */
function parsePoly(poly) {
  const exps = { '': 1, '²': 2, '³': 3 };
  return poly
    .replace(/ ([+−]) /g, ' $1')
    .split(' ')
    .map((term) => {
      const m = /^([+−]?)(\d*)(x?)([²³]?)$/.exec(term);
      if (!m) throw new Error(poly);
      const sign = m[1] === '−' ? -1 : 1;
      const c = m[2] ? Number(m[2]) : 1;
      const e = m[3] ? exps[/** @type {'' | '²' | '³'} */ (m[4])] : 0;
      return /** @type {[number, number]} */ ([sign * c, e]);
    });
}
