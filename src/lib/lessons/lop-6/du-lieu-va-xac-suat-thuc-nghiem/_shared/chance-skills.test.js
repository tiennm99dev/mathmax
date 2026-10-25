import { describe, it, expect } from 'vitest';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  PAGE_97_SKILLS,
  ketQuaSuKien,
  readPercentOrNatural,
  xacSuatThucNghiem,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(97);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Every whole number written in a text, in order. @param {string} text */
const numbers = (text) => [...text.matchAll(/\d+/g)].map((m) => Number(m[0]));

/** The faces of a die event, worked out from its wording. @param {string} text */
function dieFaces(text) {
  const all = [1, 2, 3, 4, 5, 6];
  if (text.includes('số chẵn')) return all.filter((f) => f % 2 === 0);
  if (text.includes('số lẻ')) return all.filter((f) => f % 2 === 1);
  if (text.includes('nguyên tố')) return [2, 3, 5];
  if (text.includes('hợp số')) return [4, 6];
  if (text.includes('chia hết cho 3')) return all.filter((f) => f % 3 === 0);
  if (text.includes('lớn hơn 4')) return all.filter((f) => f > 4);
  if (text.includes('nhỏ hơn 3')) return all.filter((f) => f < 3);
  throw new Error(`unknown event: ${text}`);
}

/**
 * Recomputes the answer of a generated question from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const ns = numbers(prompt);
  const event = /"([^"]+)"/.exec(prompt)?.[1] ?? '';
  if (prompt.includes('tấm thẻ')) return Math.floor(ns[0] / ns[3]);
  if (prompt.startsWith('Gieo một con xúc xắc. Có')) return dieFaces(event).length;
  if (prompt.includes('Lấy ra cùng lúc hai quả')) return (ns[0] * (ns[0] - 1)) / 2;
  if (prompt.startsWith('Gieo đồng thời')) {
    const [a, b] = ns;
    return [(a + b) % 2 === 0, a + b > 6, a === b, (a * b) % 3 === 0].filter(Boolean).length;
  }
  if (prompt.startsWith('Tung một đồng xu')) {
    const [n, heads] = ns;
    const k = event.endsWith('ngửa') ? heads : n - heads;
    return (k * 100) / n;
  }
  if (prompt.includes('đã xuất hiện bao nhiêu lần')) return (ns[0] * ns[2]) / 100;
  if (prompt.startsWith('Lấy một quả bóng')) {
    const n = ns[0];
    const colour = event.replace('Không lấy được bóng ', '');
    const m = new RegExp(`${colour} (\\d+) lần`).exec(prompt);
    return ((n - Number(m?.[1])) * 100) / n;
  }
  if (prompt.includes('lần lượt là')) {
    const n = ns[0];
    const counts = ns.slice(7, 13); // after n and the face labels 1 to 6
    expect(counts.reduce((s, x) => s + x, 0)).toBe(n);
    const k = dieFaces(event).reduce((s, f) => s + counts[f - 1], 0);
    return (k * 100) / n;
  }
  throw new Error(`unknown prompt: ${prompt}`);
}

describe('chance skills', () => {
  for (const skill of PAGE_97_SKILLS) {
    it(`${skill.id} gives natural answers that match the prompt`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer) && q.answer >= 0, q.prompt).toBe(true);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.at(-1), q.prompt).toContain(String(q.answer));
      }
    });

    it(`${skill.id} always offers hints`, () => {
      for (const q of sample(skill, 100)) {
        expect(hintsFor({ skill: skill.id, ...q }).length).toBeGreaterThan(0);
      }
    });
  }

  it('keeps experimental probabilities between 0 and 100 percent', () => {
    for (const q of sample(xacSuatThucNghiem)) {
      if (q.prompt.endsWith('phần trăm?')) {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThanOrEqual(100);
      }
    }
  });

  it('covers every variant of each skill', () => {
    const KINDS = ['tấm thẻ', 'Gieo một con xúc xắc. Có', 'cùng lúc hai quả', 'Gieo đồng thời'];
    const MORE = [
      'Tung một đồng xu',
      'đã xuất hiện bao nhiêu lần',
      'Lấy một quả bóng',
      'lần lượt là',
    ];
    const kinds = (
      /** @type {import('#lib/core/drill.js').Skill} */ s,
      /** @type {string[]} */ keys,
    ) => new Set(sample(s).map((q) => keys.findIndex((k) => q.prompt.includes(k))));
    expect([...kinds(ketQuaSuKien, KINDS)].sort()).toEqual([0, 1, 2, 3]);
    expect([...kinds(xacSuatThucNghiem, MORE)].sort()).toEqual([0, 1, 2, 3]);
  });

  it('builds a page 97 set and a chapter set without repeats', () => {
    const page = buildSet(PAGE_97_SKILLS, 5, 1);
    expect(page).toHaveLength(10);
    expect(new Set(page.map((q) => q.prompt)).size).toBe(10);
    const chapter = buildSet(CHAPTER_SKILLS, 2, 1);
    expect(chapter).toHaveLength(12);
    expect(new Set(chapter.map((q) => q.prompt)).size).toBe(12);
  });

  it('reads answers with or without a percent sign', () => {
    expect(readPercentOrNatural('65')).toBe(65);
    expect(readPercentOrNatural(' 65 % ')).toBe(65);
    expect(readPercentOrNatural('6,5')).toBeNull();
  });
});
