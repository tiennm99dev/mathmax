import { describe, it, expect } from 'vitest';
import { rng, buildSet } from '#lib/core/drill.js';
import { readNumber } from '#lib/core/decimal.js';
import {
  PRACTICE_108,
  PRACTICE_91,
  answerText,
  dongDang,
  hinhDongDang,
  pythagore,
  tamGiacVuong,
  truongHop,
} from './skills.js';

const RUNS = 400;
const ALL = [...PRACTICE_91, ...PRACTICE_108];

/**
 * The numbers named `XY = …` in a prompt, read with a decimal comma.
 * @param {string} text
 * @returns {Record<string, number>}
 */
function given(text) {
  /** @type {Record<string, number>} */
  const out = {};
  for (const m of text.matchAll(/([A-Z]′?[A-Z]′?) = (\d+(?:,\d+)?)/g)) {
    out[m[1]] = Number(m[2].replace(',', '.'));
  }
  return out;
}

/** All numbers in a text, in order, read with a decimal comma. @param {string} text */
const numbers = (text) =>
  [...text.replace(/(\d)\s(\d)/g, '$1$2').matchAll(/\d+(?:,\d+)?/g)].map((m) =>
    Number(m[0].replace(',', '.')),
  );

/** @param {number} a @param {number} b */
const close = (a, b) => Math.abs(a - b) < 1e-9;

/** @param {import('#lib/core/drill.js').Skill} skill @param {number} seed */
function* questions(skill, seed) {
  const rand = rng(seed);
  for (let i = 0; i < RUNS; i++) yield skill.make(rand);
}

describe('chapter skills', () => {
  it('make answers that read back from their printed form', () => {
    for (const skill of ALL) {
      for (const q of questions(skill, 7)) {
        expect(q.answer).toBeGreaterThan(0);
        expect(Math.round(q.answer * 100)).toBeCloseTo(q.answer * 100, 9);
        expect(readNumber(answerText(q.answer))).toBe(q.answer);
        expect(q.steps.at(-1)).toContain(answerText(q.answer));
        expect(q.prompt).not.toMatch(/\d\.\d/);
        expect(q.steps.join(' ')).not.toMatch(/\d\.\d/);
      }
    }
  });

  it('keeps similar-triangle answers in the scale factor', () => {
    for (const q of questions(dongDang, 11)) {
      const g = given(q.prompt);
      if (/Tính B′C′/.test(q.prompt)) expect(close(q.answer * g.AB, g.BC * g['A′B′'])).toBe(true);
      if (/Tính MN/.test(q.prompt)) {
        expect(close(q.answer * g.AB, g.BC * g.AM)).toBe(true);
        expect(g.AM).toBeLessThan(g.AB);
      }
      if (/chu vi/.test(q.prompt)) {
        const [k, a, b, c] = numbers(q.prompt.replace(/A′B′C′|ABC/g, ''));
        expect(close(q.answer, k * (a + b + c))).toBe(true);
      }
      if (q.unit === '°') {
        const [A, B] = numbers(q.prompt);
        expect(q.answer).toBe(180 - A - B);
        expect(q.answer).toBeGreaterThan(0);
      }
    }
  });

  it('solves the three similarity cases', () => {
    for (const q of questions(truongHop, 13)) {
      const g = given(q.prompt);
      if (/Tính PM/.test(q.prompt)) {
        expect(close(g.MN * g.BC, g.NP * g.AB)).toBe(true);
        expect(close(q.answer * g.AB, g.CA * g.MN)).toBe(true);
        expect(g.AB + g.BC).toBeGreaterThan(g.CA);
        expect(Math.abs(g.AB - g.BC)).toBeLessThan(g.CA);
      } else if (/Tính B′C′/.test(q.prompt)) {
        expect(close(g['A′B′'] * g.AC, g['A′C′'] * g.AB)).toBe(true);
        expect(close(q.answer * g.AB, g.BC * g['A′B′'])).toBe(true);
      } else if (/Tính AD/.test(q.prompt)) {
        expect(q.answer * g.AC).toBe(g.AB * g.AB);
        expect(q.answer).toBeLessThan(g.AC);
      } else if (/Tính AB/.test(q.prompt)) {
        expect(q.answer * q.answer).toBe(g.AD * g.AC);
      } else {
        expect(close(q.answer * g.AB, g.DE)).toBe(true);
        const angles = numbers(q.prompt.split('AB =')[0]);
        expect(angles[0] + angles[1]).toBeLessThan(180);
      }
    }
  });

  it('keeps Pythagoras answers right', () => {
    for (const q of questions(pythagore, 17)) {
      const [x, y] = numbers(q.prompt);
      if (/Tính BC|đường chéo/.test(q.prompt))
        expect(close(q.answer ** 2, x * x + y * y)).toBe(true);
      else expect(close(q.answer ** 2, x * x - y * y)).toBe(true);
    }
  });

  it('solves the right-triangle problems', () => {
    for (const q of questions(tamGiacVuong, 19)) {
      const g = given(q.prompt);
      if (/Tính AH/.test(q.prompt)) expect(q.answer ** 2).toBe(g.HB * g.HC);
      else if (/Tính AB/.test(q.prompt)) expect(close(q.answer ** 2, g.BH * g.BC)).toBe(true);
      else if (/Tính DF/.test(q.prompt)) {
        expect(close(g.EF * g.AB, g.DE * g.BC)).toBe(true);
        const ac = Math.sqrt(g.BC ** 2 - g.AB ** 2);
        expect(close(q.answer * g.BC, ac * g.EF)).toBe(true);
      } else {
        const [h, s, big] = numbers(q.prompt);
        expect(close(q.answer * s, h * big)).toBe(true);
      }
    }
  });

  it('solves the perspective and map problems', () => {
    for (const q of questions(hinhDongDang, 23)) {
      const nums = numbers(q.prompt);
      if (/Tính OA′/.test(q.prompt)) expect(close(q.answer, nums[0] * nums[1])).toBe(true);
      else if (/Tính tỉ số/.test(q.prompt)) expect(close(q.answer * nums[0], nums[1])).toBe(true);
      else if (/chu vi/.test(q.prompt)) {
        const [a, b, c, k] = nums;
        expect(close(q.answer, k * (a + b + c))).toBe(true);
      } else {
        const [, n, d] = nums;
        expect(close(q.answer * 100000, n * d)).toBe(true);
      }
    }
  });

  it('builds full sets without repeats', () => {
    const p91 = buildSet(PRACTICE_91, 5, 1);
    expect(p91).toHaveLength(10);
    expect(new Set(p91.map((q) => q.prompt)).size).toBe(10);
    const p108 = buildSet(PRACTICE_108, 4, 1);
    expect(p108).toHaveLength(12);
    expect(new Set(p108.map((q) => q.prompt)).size).toBe(12);
  });
});
