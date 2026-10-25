import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  chiaHetSoNguyen,
  congTruSoNguyen,
  nhanSoNguyen,
  quyTacDauNgoac,
  tapHopSoNguyen,
} from './skills.js';

const SKILLS = CHAPTER_SKILLS;

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Every integer in a text: a minus sign glued to digits is a negative sign,
 * a minus sign followed by a space is subtraction.
 * @param {string} text
 */
const ints = (text) =>
  [...text.replace(/(\d)\u202f(?=\d{3}\b)/g, '$1').matchAll(/−?\d+/g)].map((m) =>
    Number(m[0].replace('−', '-')),
  );

/**
 * Evaluates a sum of integers written the book's way: '(−5) + 3 − (2 − 7)'.
 * @param {string} expr
 */
function evalSum(expr) {
  const js = expr.replace(/(\d)\u202f(?=\d{3}\b)/g, '$1').replace(/−/g, '-');
  expect(js).toMatch(/^[-+*\d\s()]+$/);
  return Function(`"use strict"; return (${js});`)();
}

describe('every chapter skill', () => {
  for (const skill of SKILLS) {
    it(`${skill.id} gives integer answers with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        expect(q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ')).not.toMatch(
          /undefined|NaN|Infinity|--|\+ -/,
        );
      }
    });
  }
});

describe('Bài 13 counting steps', () => {
  it('list each integer between the bounds once', () => {
    for (const q of sample(tapHopSoNguyen)) {
      if (!q.prompt.startsWith('Có bao nhiêu')) continue;
      const listed = ints(q.steps[0]);
      expect(new Set(listed).size, q.steps[0]).toBe(listed.length);
    }
  });
});

describe('stored answers match a recomputation', () => {
  it('Bài 13: counting, neighbours, largest and smallest', () => {
    for (const q of sample(tapHopSoNguyen)) {
      const v = ints(q.prompt);
      if (q.prompt.startsWith('Có bao nhiêu')) {
        const [lo, hi] = v;
        let n = 0;
        for (let x = lo + 1; x < hi; x++) n++;
        expect(q.answer, q.prompt).toBe(n);
      } else if (q.prompt.includes('liền trước')) {
        expect(q.answer).toBe(v[0] - 1);
      } else if (q.prompt.includes('liền sau')) {
        expect(q.answer).toBe(v[0] + 1);
      } else if (q.prompt.includes('lớn nhất')) {
        expect(q.answer).toBe(Math.max(...v));
      } else {
        expect(q.answer).toBe(Math.min(...v));
      }
    }
  });

  it('Bài 14: sums, differences, temperatures and x', () => {
    for (const q of sample(congTruSoNguyen)) {
      if (q.prompt.startsWith('Tính: ')) {
        expect(q.answer, q.prompt).toBe(evalSum(q.prompt.slice(6, -1)));
      } else if (q.prompt.startsWith('Nhiệt độ')) {
        const [, t0, , dt] = ints(q.prompt);
        expect(q.answer).toBe(q.prompt.includes('tăng') ? t0 + dt : t0 - dt);
      } else {
        const [a, b] = ints(q.prompt);
        expect(q.answer + a, q.prompt).toBe(b);
      }
    }
  });

  it('Bài 15: bracket sums', () => {
    for (const q of sample(quyTacDauNgoac)) {
      const expr = q.prompt.slice(q.prompt.indexOf(': ') + 2, -1);
      expect(q.answer, q.prompt).toBe(evalSum(expr));
    }
  });

  it('Bài 16: products, quick sums and temperatures', () => {
    for (const q of sample(nhanSoNguyen)) {
      if (q.prompt.startsWith('Lúc')) {
        const [, t0, drop, hours] = ints(q.prompt);
        expect(q.answer, q.prompt).toBe(t0 - hours * drop);
      } else {
        const expr = q.prompt.slice(q.prompt.indexOf(': ') + 2, -1);
        expect(q.answer, q.prompt).toBe(evalSum(expr.replace(/·/g, '*')));
      }
    }
  });

  it('Bài 17: quotients, divisor counts, unknown factors and multiples', () => {
    for (const q of sample(chiaHetSoNguyen)) {
      const v = ints(q.prompt);
      if (q.prompt.startsWith('Tính')) {
        const [a, b] = v;
        expect(b * q.answer, q.prompt).toBe(a);
      } else if (q.prompt.includes('ước nguyên')) {
        const n = Math.abs(v[0]);
        let count = 0;
        for (let d = -n; d <= n; d++) if (d !== 0 && n % d === 0) count++;
        expect(q.answer, q.prompt).toBe(count);
      } else if (q.prompt.startsWith('Tìm số nguyên x')) {
        const [b, p] = v;
        expect(b * q.answer, q.prompt).toBe(p);
      } else {
        const [b, lo, hi] = v;
        let count = 0;
        for (let x = lo + 1; x < hi; x++) if (x % b === 0) count++;
        expect(q.answer, q.prompt).toBe(count);
      }
    }
  });
});
