import { describe, it, expect } from 'vitest';
import { rng, buildSet } from '#lib/core/drill.js';
import { answerText, readNumber } from '#lib/core/decimal.js';
import { CHAPTER_SKILLS, PRACTICE_SKILLS, phanGiac, thales, trungBinh, thucTe } from './skills.js';

const RUNS = 400;

/**
 * The numbers named `name = …` in a prompt, read with a decimal comma.
 * @param {string} text
 * @returns {Record<string, number>}
 */
function given(text) {
  /** @type {Record<string, number>} */
  const out = {};
  for (const m of text.matchAll(/\b([A-Z]{2}) = (\d+(?:,\d+)?)/g)) {
    out[m[1]] = Number(m[2].replace(',', '.'));
  }
  return out;
}

/** @param {number} a @param {number} b */
const close = (a, b) => Math.abs(a - b) < 1e-9;

describe('chapter skills', () => {
  it('make answers that read back from their printed form', () => {
    for (const skill of CHAPTER_SKILLS) {
      const rand = rng(7);
      for (let k = 0; k < RUNS; k++) {
        const q = skill.make(rand);
        expect(q.answer).toBeGreaterThan(0);
        expect(Number.isFinite(q.answer)).toBe(true);
        expect(Math.round(q.answer * 100)).toBeCloseTo(q.answer * 100, 9);
        expect(readNumber(answerText(q.answer))).toBe(q.answer);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.steps.at(-1)).toContain(answerText(q.answer));
        expect(q.prompt).not.toMatch(/\d\.\d/);
        expect(q.steps.join(' ')).not.toMatch(/\d\.\d/);
      }
    }
  });

  it('keeps Thalès answers in proportion with the given lengths', () => {
    const rand = rng(11);
    for (let k = 0; k < RUNS; k++) {
      const q = thales.make(rand);
      const g = given(q.prompt);
      const asked = /Tính (\w+)\./.exec(q.prompt)?.[1];
      const v = { ...g, [String(asked)]: q.answer };
      const am = v.AM ?? v.AB - v.MB;
      const ab = v.AB ?? v.AM + v.MB;
      const an = v.AN ?? v.AC - v.NC;
      const ac = v.AC ?? v.AN + v.NC;
      expect(close(am * ac, an * ab), q.prompt).toBe(true);
      expect(am).toBeLessThan(ab);
      expect(an).toBeLessThan(ac);
    }
  });

  it('keeps bisector answers in proportion and the triangle real', () => {
    const rand = rng(13);
    for (let k = 0; k < RUNS; k++) {
      const q = phanGiac.make(rand);
      const g = given(q.prompt);
      const asked = /Tính (\w+)\./.exec(q.prompt)?.[1];
      const v = { ...g, [String(asked)]: q.answer };
      const bc = v.BC ?? v.DB + v.DC;
      const db = v.DB ?? bc - v.DC;
      const dc = v.DC ?? bc - db;
      expect(close(db * v.AC, dc * v.AB), q.prompt).toBe(true);
      expect(v.AB + v.AC).toBeGreaterThan(bc);
      expect(Math.abs(v.AB - v.AC)).toBeLessThan(bc);
    }
  });

  it('halves or doubles with the midline', () => {
    const rand = rng(17);
    for (let k = 0; k < RUNS; k++) {
      const q = trungBinh.make(rand);
      const g = given(q.prompt);
      if (/Tính MN/.test(q.prompt)) expect(q.answer).toBe(g.BC / 2);
      if (/Tính BC/.test(q.prompt)) expect(q.answer).toBe(2 * g.MN);
      if (/chu vi/.test(q.prompt)) {
        expect(q.answer).toBe((g.AB + g.AC + g.BC) / 2);
        expect(g.AB + g.AC).toBeGreaterThan(g.BC);
        expect(Math.abs(g.AB - g.AC)).toBeLessThan(g.BC);
      }
      if (q.unit === '°') expect(q.prompt).toContain(`= ${q.answer}°`);
    }
  });

  it('solves the real-life problems', () => {
    const rand = rng(19);
    for (let k = 0; k < RUNS; k++) {
      const q = thucTe.make(rand);
      const g = given(q.prompt);
      if (/hồ/.test(q.prompt)) expect(q.answer).toBe(2 * g.MN);
      else expect(close(g.AM * g.AC, q.answer * g.AB), q.prompt).toBe(true);
    }
  });

  it('builds full sets without repeats', () => {
    const practice = buildSet(PRACTICE_SKILLS, 4, 1);
    expect(practice).toHaveLength(12);
    expect(new Set(practice.map((q) => q.prompt)).size).toBe(12);
    const review = buildSet(CHAPTER_SKILLS, 3, 1);
    expect(review).toHaveLength(12);
    expect(new Set(review.map((q) => q.prompt)).size).toBe(12);
  });
});
