import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { lcm } from '#lib/numtheory-engine/index.js';
import { CHAPTER_SKILLS } from './skills.js';
import { readFraction, valueText } from './fractions.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Every fraction or integer in a text, as written: '3/−4' keeps its parts.
 * @param {string} text
 * @returns {Array<{ n: number, d: number }>}
 */
const fracs = (text) =>
  [...text.replace(/−/g, '-').matchAll(/(-?\d+)(?:\/(-?\d+))?/g)].map((m) => ({
    n: Number(m[1]),
    d: m[2] === undefined ? 1 : Number(m[2]),
  }));

const val = (/** @type {{ n: number, d: number }} */ f) => f.n / f.d;
const close = (/** @type {number} */ x, /** @type {number} */ y) => Math.abs(x - y) < 1e-12;

/**
 * Recomputes the answer of a generated question from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const body = prompt.replace(/^[^\d−-]*/, '');
  const f = fracs(prompt);
  if (prompt.startsWith('Tìm số nguyên x')) {
    // x/b = c/d: f = [b, c/d] after the 'x/'
    const [b, cd] = fracs(prompt.split('x/')[1]);
    return (b.n * cd.n) / cd.d;
  }
  if (prompt.startsWith('Rút gọn')) {
    const v = val(f[0]);
    for (let d = 1; ; d++)
      if (Number.isInteger(Math.round(v * d)) && close(Math.round(v * d) / d, v))
        return Math.round(v * d);
  }
  if (prompt.includes('có mẫu')) {
    const v = val(f[0]);
    return v * f[1].n;
  }
  if (prompt.startsWith('Phân số nào lớn hơn')) return Math.max(val(f[0]), val(f[1]));
  if (prompt.startsWith('Viết hỗn số')) {
    const [w, part] = f;
    return w.n + val(part);
  }
  if (prompt.includes('dưới dạng hỗn số')) {
    const v = val(f[0]);
    return v - Math.floor(v);
  }
  if (prompt.startsWith('Quy đồng')) return lcm(Math.abs(f[0].d), Math.abs(f[1].d));
  if (prompt.startsWith('Tìm số đối')) return -val(f[0]);
  if (prompt.startsWith('Tìm phân số nghịch đảo')) return 1 / val(f[0]);
  if (prompt.startsWith('Tính')) {
    const [a, b] = f;
    if (body.includes(' + ')) return val(a) + val(b);
    if (body.includes(' − ')) return val(a) - val(b);
    if (body.includes(' · ')) return val(a) * val(b);
    if (body.includes(' : ')) return val(a) / val(b);
  }
  throw new Error(`unknown prompt: ${prompt}`);
}

describe('every chapter skill', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives clean questions with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer), q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        expect(q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ')).not.toMatch(
          /undefined|NaN|Infinity|--|\+ -|\/0\b|\/1\b/,
        );
      }
    });

    it(`${skill.id} stores answers that match a recomputation from the prompt`, () => {
      for (const q of sample(skill)) {
        expect(close(q.answer, recompute(q.prompt)), q.prompt).toBe(true);
      }
    });

    it(`${skill.id} answers round-trip through the written form`, () => {
      for (const q of sample(skill)) {
        expect(readFraction(valueText(q.answer)), q.prompt).toBe(q.answer);
      }
    });
  }
});
