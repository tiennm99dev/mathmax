import { describe, expect, it } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { SKILLS_TRANG_37, lapPhuongTrinh, phuongTrinh } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * One side of an equation as the prompts print it ('3(x − 2) + 4',
 * '(x + 1)/3') turned into a function of x, independently of the writer.
 * @param {string} text
 * @returns {(x: number) => number}
 */
function side(text) {
  const js = text
    .replace(/−/g, '-')
    .replace(/·/g, '*')
    .replace(/(\d)\s*(?=[x(])/g, '$1*')
    .replace(/\)\s*(?=[x(])/g, ')*');
  if (!/^[\d\sx+\-*/().]+$/.test(js)) throw new Error(`cannot read ${text}`);
  return /** @type {(x: number) => number} */ (new Function('x', `return ${js};`));
}

/** @param {string} eq */
function equation(eq) {
  const [l, r] = eq.split(' = ').map(side);
  return (/** @type {number} */ x) => l(x) - r(x);
}

describe('chapter drill skills', () => {
  it('every equation question has the stored answer as its only root', () => {
    for (const q of sample(phuongTrinh)) {
      const m = /Giải phương trình (.+)\. Nhập nghiệm x\./.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const f = equation(/** @type {RegExpExecArray} */ (m)[1]);
      expect(f(q.answer)).toBeCloseTo(0, 9);
      expect(Math.abs(f(q.answer + 1))).toBeGreaterThan(1e-9);
    }
  });

  it('every word problem states an equation whose root gives the answer', () => {
    for (const q of sample(lapPhuongTrinh)) {
      const line = q.steps.find((s) => s.startsWith('Phương trình: '));
      expect(line, q.prompt).toBeDefined();
      const f = equation(/** @type {string} */ (line).slice('Phương trình: '.length, -1));
      const root = -f(0) / (f(1) - f(0));
      expect(Number.isInteger(Math.round(root * 1e9) / 1e9), q.prompt).toBe(true);
      expect(root).toBeGreaterThan(0);
      if (q.unit === 'sản phẩm') {
        const per = Number(/mỗi ngày một tổ làm (\d+)/.exec(q.prompt)?.[1]);
        expect(q.answer).toBe(per * Math.round(root));
      } else {
        expect(q.answer).toBe(Math.round(root));
      }
      expect(q.steps.at(-1)).toContain(String(q.answer));
    }
  });

  it('writes the book minus sign and no doubled signs', () => {
    for (const q of [...sample(phuongTrinh), ...sample(lapPhuongTrinh)]) {
      for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
        expect(text).not.toMatch(/[+−] [+−]|\d-|\(x\)/);
      }
    }
  });

  it('builds a full practice set without repeats', () => {
    const set = buildSet(SKILLS_TRANG_37, 5, 7);
    expect(set).toHaveLength(10);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
  });
});
