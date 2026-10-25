import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { readDecimal, valueText } from './decimal.js';
import { PAGE_41_SKILLS, lamTron, soThapPhan, tinhToan } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Every number written in a text, in order: '−3,25', '(−0,4)', '1 234'.
 * @param {string} text
 */
const numbers = (text) =>
  [...text.replaceAll(GROUP, '').matchAll(/−?\d+(?:,\d+)?/g)].map((m) =>
    Number(m[0].replace('−', '-').replace(',', '.')),
  );

const close = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;

/**
 * Rounds x to `d` decimals (d may be negative for tens, hundreds, ...),
 * rounding the opposite of a negative number.
 * @param {number} x @param {number} d
 */
function roundBook(x, d) {
  const f = 10 ** d;
  const a = Math.abs(x) * f;
  const r = Math.floor(a + 0.5 + 1e-9) / f;
  return x < 0 ? -r : r;
}

/**
 * Recomputes the answer of a generated question from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const ns = numbers(prompt);
  if (prompt.startsWith('Viết phân số thập phân')) return ns[0] / ns[1];
  if (prompt.startsWith('Viết số')) return Math.round(ns[0] * ns[1]);
  if (prompt.startsWith('Tìm số lớn nhất')) return Math.max(...ns);
  if (prompt.startsWith('Tìm số nhỏ nhất')) return Math.min(...ns);
  if (prompt.startsWith('Làm tròn')) {
    const place = prompt.split(' đến ')[1];
    const d = {
      'hàng phần mười.': 1,
      'hàng phần trăm.': 2,
      'hàng phần nghìn.': 3,
      'hàng chục.': -1,
      'hàng trăm.': -2,
      'hàng nghìn.': -3,
    }[place];
    if (d === undefined) throw new Error(`unknown place in ${prompt}`);
    return roundBook(ns[0], d);
  }
  if (prompt.startsWith('Tính')) {
    if (prompt.includes(' · ') && prompt.includes(' + ') && !prompt.includes(' : ')) {
      if (/^Tính \S+ \+ \S+ · /.test(prompt) && ns.length === 3) return ns[0] + ns[1] * ns[2];
    }
    if (prompt.includes(' · ')) return ns[0] * ns[1];
    if (prompt.includes(' : ')) return ns[0] / ns[1];
    if (prompt.includes(' + ')) return ns[0] + ns[1];
    if (prompt.includes(' − ')) return ns[0] - ns[1];
  }
  throw new Error(`no recompute rule for ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of [soThapPhan, tinhToan, lamTron]) {
    it(`${skill.id}: every answer matches its prompt`, () => {
      for (const q of sample(skill)) {
        expect(close(recompute(q.prompt), q.answer), q.prompt).toBe(true);
      }
    });

    it(`${skill.id}: the answer survives being typed back`, () => {
      for (const q of sample(skill)) {
        expect(readDecimal(valueText(q.answer)), q.prompt).toBe(q.answer);
        expect(q.steps.length).toBeGreaterThan(1);
        expect(q.hints?.length).toBeGreaterThan(0);
        // No hint states the answer, unless it is a one-digit number.
        if (!(Number.isInteger(q.answer) && Math.abs(q.answer) < 10)) {
          for (const h of q.hints ?? [])
            expect(numbers(h), `${q.prompt} | ${h}`).not.toContain(q.answer);
        }
      }
    });
  }

  it('builds a full drill set of distinct questions', () => {
    const set = buildSet(PAGE_41_SKILLS, 4, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
  });
});
