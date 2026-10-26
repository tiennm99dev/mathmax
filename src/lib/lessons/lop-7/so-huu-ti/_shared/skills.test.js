import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { PAGE_14_SKILLS } from './skills.js';
import { readValue, valueText } from './rational.js';

/**
 * Every number in a text, read back as a value: −5/6, 0,25, 7.
 * @param {string} text
 */
const numbers = (text) =>
  [...text.matchAll(/−?\d+(?:,\d+)?(?:\/\d+)?/g)].map((m) => {
    const v = readValue(m[0]);
    if (v === null) throw new Error(`unreadable ${m[0]}`);
    return v;
  });

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const n = numbers(prompt);
  if (prompt.startsWith('Tìm số đối')) return -n[0];
  if (prompt.startsWith('Tìm số nghịch đảo')) return 1 / n[0];
  if (prompt.startsWith('Số nào lớn')) return Math.max(...n);
  if (prompt.startsWith('Số nào nhỏ')) return Math.min(...n);
  if (prompt.startsWith('Có bao nhiêu')) {
    let c = 0;
    for (let x = -100; x <= 100; x++) if (n[0] < x && x < n[1]) c++;
    return c;
  }
  if (prompt.startsWith('Viết số')) {
    const v = n[0];
    for (let d = 1; d <= 100; d++) if (Math.abs(Math.round(v * d) - v * d) < 1e-9) return d;
    throw new Error(prompt);
  }
  if (prompt.startsWith('Tính một cách hợp lí')) return n[0] - (n[1] - n[2]);
  const op = /^Tính \S+ ([+−·:]) /.exec(prompt)?.[1];
  const [a, b] = n;
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '·') return a * b;
  if (op === ':') return a / b;
  throw new Error(`unknown prompt ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of PAGE_14_SKILLS) {
    it(`${skill.id} answers match a recomputation from the prompt`, () => {
      const r = rng(2026);
      for (let i = 0; i < 600; i++) {
        const q = skill.make(r);
        expect(Number.isFinite(q.answer)).toBe(true);
        expect(q.answer).toBeCloseTo(recompute(q.prompt), 9);
        expect(q.steps.length).toBeGreaterThan(0);
        // Book typography: a true minus sign, never a hyphen before a digit.
        for (const t of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          expect(t).not.toMatch(/-\d/);
          expect(t).not.toMatch(/undefined|NaN/);
        }
        expect(valueText(q.answer)).not.toMatch(/\d\.\d/);
      }
    });
  }

  it('builds a full set without repeats', () => {
    const set = buildSet(PAGE_14_SKILLS, 4, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
  });
});
