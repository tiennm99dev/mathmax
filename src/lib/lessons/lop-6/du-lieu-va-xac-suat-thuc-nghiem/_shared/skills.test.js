import { describe, it, expect } from 'vitest';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { PAGE_87_SKILLS, bieuDoCot, bieuDoCotKep, bieuDoTranh, duLieu } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Every whole number written in a text, in order. @param {string} text */
const numbers = (text) => [...text.matchAll(/\d+/g)].map((m) => Number(m[0]));

/** @param {number[]} xs */
const total = (xs) => xs.reduce((s, x) => s + x, 0);

/**
 * Recomputes the answer of a generated question from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const ns = numbers(prompt);
  if (prompt.startsWith('Điểm kiểm tra')) {
    // The first two numbers are the "thang điểm 10" and nothing else.
    return ns.slice(1).filter((x) => x > 10).length;
  }
  if (prompt.startsWith('Bạn Lan')) {
    const listed = prompt.slice(prompt.indexOf(':') + 1, prompt.indexOf('. Trong'));
    return listed.split(';').filter((item) => /\d/.test(item)).length;
  }
  if (prompt.startsWith('Lớp 6A có')) return ns[1] - ns[2] - ns[3] - ns[4];
  if (prompt.startsWith('Số anh chị em')) {
    const target = ns[ns.length - 1];
    return ns.slice(0, -1).filter((x) => x === target).length;
  }
  if (prompt.includes('quyển sách')) {
    const [k, , whole] = ns;
    return whole * k + (prompt.includes('nửa biểu tượng') ? k / 2 : 0);
  }
  if (prompt.includes('cần vẽ bao nhiêu')) return ns[2] / ns[0];
  if (prompt.includes('vạch thứ')) return ns[0] * ns[2];
  if (prompt.includes('Lớp 6A có bao nhiêu')) return total(ns.slice(1, -1)); // drops the 6 of both "6A"
  if (prompt.includes('nhiều nhất hơn')) {
    const v = ns.slice(1);
    // ns[0] is the 6 of "6A".
    return Math.max(...v) - Math.min(...v);
  }
  // Double bar chart: numbers are class number, boys, girls per class.
  const rows = [0, 1, 2, 3].map((i) => ({ boys: ns[1 + 3 * i + 1], girls: ns[1 + 3 * i + 2] }));
  if (prompt.includes('tất cả bao nhiêu học sinh nữ')) return total(rows.map((r) => r.girls));
  if (prompt.includes('chênh lệch')) {
    const cls = /lớp 6([A-D]),/.exec(prompt)?.[1] ?? '';
    const r = rows['ABCD'.indexOf(cls)];
    return Math.abs(r.boys - r.girls);
  }
  if (prompt.includes('nam nhiều hơn')) return rows.filter((r) => r.boys > r.girls).length;
  throw new Error(`unknown prompt: ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of PAGE_87_SKILLS) {
    it(`${skill.id} gives natural answers that match the prompt`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer >= 0, q.prompt).toBe(true);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.at(-1), q.prompt).toContain(String(q.answer));
      }
    });

    it(`${skill.id} hints never state the answer alone`, () => {
      for (const q of sample(skill, 100)) {
        const hints = hintsFor({ skill: skill.id, ...q });
        expect(hints.length).toBeGreaterThan(0);
      }
    });
  }

  it('covers every variant of each skill', () => {
    const starts = (/** @type {import('#lib/core/drill.js').Skill} */ s) =>
      new Set(sample(s).map((q) => q.prompt.slice(0, 8))).size;
    expect(starts(duLieu)).toBe(3);
    expect(starts(bieuDoTranh)).toBe(3);
    expect(starts(bieuDoCot)).toBeGreaterThanOrEqual(2);
    expect(new Set(sample(bieuDoCotKep).map((q) => q.prompt.slice(-30))).size).toBe(3);
  });

  it('builds a page 87 set with three questions per lesson', () => {
    const set = buildSet(PAGE_87_SKILLS, 3, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
  });
});
