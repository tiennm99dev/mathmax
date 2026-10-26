import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, PAGE_23_SKILLS } from './skills.js';
import { readValue, valueText } from './rational.js';

const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Turns a printed expression ('2/3 − (−1/2) · 0,5', '(−2/3)³', '3x + 0,5')
 * into JavaScript and evaluates it, with `x` bound to the given value.
 * Every fraction is wrapped in brackets so ':' and '·' bind as printed.
 * @param {string} text
 * @param {number} [x]
 */
function evaluate(text, x = 0) {
  const js = text
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `**${[...m].map((c) => SUPERSCRIPT.indexOf(c)).join('')}`)
    .replace(/−/g, '-')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/-?\d+\/\d+/g, (m) => `(${m})`)
    .replace(/(\d)x/g, '$1*x')
    .replace(/·/g, '*')
    .replace(/:/g, '/')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')');
  return Function('x', `"use strict"; return (${js});`)(x);
}

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  if (prompt.startsWith('Tìm x, biết: ')) {
    const [left, right] = prompt.slice('Tìm x, biết: '.length, -1).split(' = ');
    const f = (/** @type {number} */ v) => evaluate(left, v) - evaluate(right, v);
    const f0 = f(0);
    return -f0 / (f(1) - f0);
  }
  if (prompt.startsWith('Viết ')) {
    const expr = prompt.slice('Viết '.length, prompt.indexOf(' dưới dạng'));
    const base = readValue(/của (\S+)\. Số mũ/.exec(prompt)?.[1] ?? '');
    if (base === null) throw new Error(prompt);
    return Math.log(Math.abs(evaluate(expr))) / Math.log(Math.abs(base));
  }
  const m = /^Tính (?:nhanh )?(.*)\.$/.exec(prompt);
  if (!m) throw new Error(`unknown prompt ${prompt}`);
  return evaluate(m[1]);
}

describe('skills for powers, order of operations and transposition', () => {
  it('evaluates printed expressions the way the book reads them', () => {
    expect(evaluate('(−2/3)³')).toBeCloseTo(-8 / 27, 12);
    expect(evaluate('1/3 + 2/3 · (−3/4)')).toBeCloseTo(-1 / 6, 12);
    expect(evaluate('1 : 1/2 · 2')).toBeCloseTo(4, 12);
    expect(evaluate('[(−1/2)³]²')).toBeCloseTo(1 / 64, 12);
    expect(evaluate('3x − 0,5', 2)).toBeCloseTo(5.5, 12);
  });

  for (const skill of PAGE_23_SKILLS) {
    it(`${skill.id} answers match a recomputation from the prompt`, () => {
      const r = rng(2027);
      for (let i = 0; i < 800; i++) {
        const q = skill.make(r);
        expect(Number.isFinite(q.answer), q.prompt).toBe(true);
        expect(q.answer, q.prompt).toBeCloseTo(recompute(q.prompt), 7);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        for (const t of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          expect(t, t).not.toMatch(/-\d/);
          expect(t, t).not.toMatch(/undefined|NaN|Infinity|\+ −|−−/);
        }
        // A conversion step only lists numbers whose fraction form looks different.
        for (const t of q.steps.filter((s) => s.startsWith('Viết dưới dạng phân số: '))) {
          for (const part of t.slice('Viết dưới dạng phân số: '.length, -1).split('; ')) {
            const [left, right] = part.split(' = ');
            expect(left, t).not.toBe(right);
          }
        }
        // The answer, written back the way the board shows it, reads as the same number.
        const shown = valueText(q.answer).split(' = ')[0];
        expect(readValue(shown), q.prompt).toBe(q.answer);
      }
    });
  }

  it('asks for exponents of bases other than 0, 1 and −1 only', () => {
    const r = rng(5);
    for (let i = 0; i < 300; i++) {
      const q = PAGE_23_SKILLS[1].make(r);
      expect(Number.isInteger(q.answer) && q.answer > 0, q.prompt).toBe(true);
    }
  });

  it('builds full practice and chapter sets without repeats', () => {
    const page = buildSet(PAGE_23_SKILLS, 3, 1);
    expect(page).toHaveLength(12);
    expect(new Set(page.map((q) => q.prompt)).size).toBe(12);
    const chapter = buildSet(CHAPTER_SKILLS, 2, 1);
    expect(chapter).toHaveLength(14);
    expect(new Set(chapter.map((q) => q.prompt)).size).toBe(14);
  });
});
