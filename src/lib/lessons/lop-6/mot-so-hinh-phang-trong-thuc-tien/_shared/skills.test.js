import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, LESSON_SKILLS, chuViDienTich, tuGiac, vanDungThucTe } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Natural numbers in a text, with the book's narrow-space grouping undone. */
const nums = (/** @type {string} */ text) =>
  [...text.replace(/(\d)\u202f(?=\d{3}\b)/g, '$1').matchAll(/\d+/g)].map((m) => Number(m[0]));

describe('every chapter skill', () => {
  it('keeps the practice skills inside the review skills', () => {
    for (const s of LESSON_SKILLS) expect(CHAPTER_SKILLS).toContain(s);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives natural answers, hints and a solution ending on the answer`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer > 0, q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        const all = q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ');
        expect(all).not.toMatch(/undefined|NaN|Infinity|\.\d/);
        const last = nums(q.steps[q.steps.length - 1]);
        expect(last, q.steps.join(' | ')).toContain(q.answer);
        // A hint never repeats the final step, which holds the answer.
        expect(q.hints).not.toContain(q.steps[q.steps.length - 1]);
      }
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('areas in Bài 20', () => {
    for (const q of sample(chuViDienTich)) {
      const n = nums(q.prompt);
      if (q.prompt.startsWith('Tính diện tích hình chữ nhật')) expect(q.answer).toBe(n[0] * n[1]);
      if (q.prompt.startsWith('Tính diện tích hình bình hành')) expect(q.answer).toBe(n[0] * n[1]);
      if (q.prompt.startsWith('Tính diện tích hình thoi')) expect(q.answer).toBe((n[0] * n[1]) / 2);
      if (q.prompt.startsWith('Tính diện tích hình thang'))
        expect(q.answer).toBe(((n[0] + n[1]) * n[2]) / 2);
      if (q.prompt.startsWith('Tính chu vi hình chữ nhật'))
        expect(q.answer).toBe(2 * (n[0] + n[1]));
    }
  });

  it('isosceles trapezoids have legs long enough to exist', () => {
    for (const q of sample(tuGiac)) {
      if (!q.prompt.startsWith('Hình thang cân')) continue;
      const [a, b, c] = nums(q.prompt);
      expect(2 * c, q.prompt).toBeGreaterThan(a - b);
      expect(q.answer).toBe(a + b + 2 * c);
    }
  });

  it('tile counts cover the floor exactly', () => {
    for (const q of sample(vanDungThucTe)) {
      if (!q.prompt.startsWith('Nền')) continue;
      const [a, b, c] = nums(q.prompt);
      expect((100 * a) % c).toBe(0);
      expect((100 * b) % c).toBe(0);
      expect(q.answer).toBe((100 * a * 100 * b) / (c * c));
    }
  });
});
