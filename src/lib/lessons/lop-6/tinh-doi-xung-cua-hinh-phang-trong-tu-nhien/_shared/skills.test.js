import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, LESSON_SKILLS, LETTERS, tamDoiXung, trucDoiXung } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const nums = (/** @type {string} */ text) => [...text.matchAll(/\d+/g)].map((m) => Number(m[0]));

/** The capital letters listed in a prompt ("các chữ cái in hoa A, H, N, có ..."). */
function lettersIn(/** @type {string} */ prompt) {
  const m = prompt.match(/in hoa ((?:[A-Z], )*[A-Z]),/);
  return m ? m[1].split(', ') : [];
}

describe('every chapter skill', () => {
  it('keeps the practice skills inside the review skills', () => {
    for (const s of LESSON_SKILLS) expect(CHAPTER_SKILLS).toContain(s);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives whole answers, hints and a solution ending on the answer`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer >= 0, q.prompt).toBe(true);
        expect(q.hints?.length).toBeGreaterThan(0);
        const all = q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ');
        expect(all).not.toMatch(/undefined|NaN|Infinity|\.\d|Hình hình|Một hình hình/);
        expect(nums(q.steps[q.steps.length - 1])).toContain(q.answer);
        expect(q.hints).not.toContain(q.steps[q.steps.length - 1]);
      }
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('letter counts match the letter table', () => {
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const letters = lettersIn(q.prompt);
        if (letters.length === 0) continue;
        for (const c of letters) expect(LETTERS[c], c).toBeDefined();
        const has = (/** @type {string} */ c) => LETTERS[c];
        let want;
        if (q.prompt.includes('vừa có trục đối xứng vừa có tâm'))
          want = letters.filter((c) => has(c).axis && has(c).center);
        else if (q.prompt.includes('có trục đối xứng nhưng không có tâm'))
          want = letters.filter((c) => has(c).axis && !has(c).center);
        else if (q.prompt.includes('có trục đối xứng')) want = letters.filter((c) => has(c).axis);
        else want = letters.filter((c) => has(c).center);
        expect(q.answer, q.prompt).toBe(want.length);
      }
    }
  });

  it('axis counts of single figures follow the lesson table', () => {
    const table = /** @type {Record<string, number>} */ ({
      'đoạn thẳng': 2,
      'tam giác đều': 3,
      'hình vuông': 4,
      'hình chữ nhật (không phải hình vuông)': 2,
      'hình thoi (không phải hình vuông)': 2,
      'hình thang cân': 1,
      'lục giác đều': 6,
    });
    for (const q of sample(trucDoiXung)) {
      const m = q.prompt.match(/^Một (.+) có bao nhiêu trục đối xứng\?$/);
      if (m) expect(q.answer, q.prompt).toBe(table[m[1]]);
    }
  });

  it('lengths through a centre of symmetry double or halve', () => {
    for (const q of sample(tamDoiXung)) {
      const n = nums(q.prompt);
      if (q.prompt.includes('Tính độ dài đường chéo AC')) expect(q.answer).toBe(2 * n[0]);
      if (q.prompt.includes('Tính OB')) expect(q.answer).toBe(n[0] / 2);
      if (q.prompt.includes("MM'")) expect(q.answer).toBe(2 * n[0]);
      if (q.prompt.includes('đường chéo chính AD')) expect(q.answer).toBe(2 * n[0]);
    }
  });
});
