import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, luyThua, nhanChia, tapHop, thuTuPhepTinh } from './skills.js';

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Evaluates a printed expression independently of the stepping engine, by
 * turning it into JavaScript syntax.
 * @param {string} text
 */
function evalPrinted(text) {
  const js = text
    .replace(/[\u202f\s]/g, '')
    .replace(/[[{]/g, '(')
    .replace(/[\]}]/g, ')')
    .replace(/−/g, '-')
    .replace(/·/g, '*')
    .replace(/:/g, '/')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (s) => `**${[...s].map((c) => SUP.indexOf(c)).join('')}`);
  expect(js).toMatch(/^[\d+\-*/()]+$/);
  return Function(`"use strict"; return (${js});`)();
}

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 300) {
  const r = rng(2024);
  return Array.from({ length: count }, () => skill.make(r));
}

describe('every chapter skill', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives natural answers with a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer >= 0, q.prompt).toBe(true);
        expect(q.prompt.length).toBeGreaterThan(5);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.prompt).not.toMatch(/undefined|NaN/);
        expect(q.steps.join(' ')).not.toMatch(/undefined|NaN/);
      }
    });
  }
});

describe('stored answers match a recomputation', () => {
  it('counts the elements of A by brute force', () => {
    for (const q of sample(tapHop)) {
      const m = /\| (\d+) ([<≤]) x ([<≤]) (\d+)\}/.exec(q.prompt);
      if (!m) {
        const word = /"(.+)"/.exec(q.prompt)?.[1] ?? '';
        expect(q.answer).toBe(new Set(word.replace(/ /g, '')).size);
        continue;
      }
      const [lo, hi] = [Number(m[1]), Number(m[4])];
      let count = 0;
      for (let x = 0; x <= hi + 1; x++) {
        const okLo = m[2] === '<' ? lo < x : lo <= x;
        const okHi = m[3] === '<' ? x < hi : x <= hi;
        if (okLo && okHi) count++;
      }
      expect(q.answer, q.prompt).toBe(count);
    }
  });

  it('checks remainders, dividends and missing factors', () => {
    for (const q of sample(nhanChia)) {
      const n = (q.prompt.replace(/\u202f/g, '').match(/\d+/g) ?? []).map(Number);
      if (q.prompt.startsWith('Tìm số dư')) expect(q.answer).toBe(n[0] % n[1]);
      else if (q.prompt.startsWith('Trong một phép chia'))
        expect(q.answer).toBe(n[0] * n[1] + n[2]);
      else if (q.prompt.startsWith('Tính')) expect(q.answer).toBe(n[0] * n[1] + n[2] * n[3]);
      else expect(n[0] * q.answer).toBe(n[1]);
    }
  });

  it('checks powers, exponents and square roots', () => {
    const sup = (/** @type {string} */ s) => Number([...s].map((c) => SUP.indexOf(c)).join(''));
    for (const q of sample(luyThua)) {
      const p = q.prompt.replace(/\u202f/g, '');
      let m;
      if ((m = /^Tính (\d+)([⁰-⁹¹²³]+)\.$/.exec(p)))
        expect(q.answer).toBe(Number(m[1]) ** sup(m[2]));
      else if ((m = /^Viết \d+([⁰-⁹¹²³]+) ([·:]) \d+([⁰-⁹¹²³]+)/.exec(p))) {
        const [a, b] = [sup(m[1]), sup(m[3])];
        expect(q.answer).toBe(m[2] === '·' ? a + b : a - b);
      } else if ((m = /^Tìm số tự nhiên n, biết (\d+)ⁿ = (\d+)\.$/.exec(p))) {
        expect(Number(m[1]) ** q.answer).toBe(Number(m[2]));
      } else if ((m = /^Số chính phương (\d+)/.exec(p))) expect(q.answer ** 2).toBe(Number(m[1]));
      else throw new Error(`unrecognised prompt: ${p}`);
    }
  });

  it('evaluates generated expressions independently', () => {
    for (const q of sample(thuTuPhepTinh)) {
      const expr = /biểu thức (.+)\.$/.exec(q.prompt)?.[1] ?? '';
      expect(evalPrinted(expr), q.prompt).toBe(q.answer);
    }
  });
});
