import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { GROUP, fmt } from '#lib/core/number-format.js';
import { CHAPTER_SKILLS, PAGE_100_SKILLS, PAGE_92_SKILLS } from './skills.js';

/**
 * Numbers written in a prompt, in order, with the book's digit grouping undone.
 * @param {string} prompt
 */
const numbers = (prompt) =>
  [...prompt.replaceAll(GROUP, '').matchAll(/\d+/g)].map((m) => Number(m[0]));

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  const n = numbers(prompt.replace(/cm²|cm³/g, 'cm'));
  if (prompt.includes('tổng diện tích tất cả các mặt')) {
    const [a, b, c] = n;
    return 2 * (a + b) * c + 2 * a * b;
  }
  if (prompt.includes('đáy dài') && prompt.includes('diện tích xung quanh')) {
    const [a, b, S] = n;
    return S / (2 * (a + b));
  }
  if (prompt.startsWith('Một hình hộp chữ nhật dài')) {
    const [a, b, c] = n;
    return 2 * (a + b) * c;
  }
  if (prompt.includes('lít nước')) {
    const [a, b, c] = n;
    expect((a * b * c) % 1000).toBe(0);
    return (a * b * c) / 1000;
  }
  if (prompt.includes('có thể tích') && prompt.includes('hình hộp')) {
    const [V, a, b] = n;
    return V / (a * b);
  }
  if (prompt.startsWith('Tính thể tích của hình hộp')) return n[0] * n[1] * n[2];
  if (prompt.includes('khối gỗ hình lập phương')) return n[0] ** 3;
  if (prompt.includes('lập phương có cạnh')) return 4 * n[0] ** 2;
  if (prompt.includes('lập phương có diện tích xung quanh')) return Math.sqrt(n[0] / 4) ** 3;
  if (prompt.includes('ba cạnh đáy')) {
    const [p, q, r, h] = n;
    const sorted = [p, q, r].sort((x, y) => x - y);
    expect(sorted[0] + sorted[1]).toBeGreaterThan(sorted[2]);
    return (p + q + r) * h;
  }
  if (prompt.includes('tam giác vuông với hai cạnh góc vuông')) return ((n[0] * n[1]) / 2) * n[2];
  if (prompt.includes('đường cao ứng với cạnh đó')) return ((n[0] * n[1]) / 2) * n[2];
  if (prompt.includes('hình thang với hai đáy')) {
    const [big, small, t, h] = n;
    expect(big).toBeGreaterThan(small);
    return (((big + small) * t) / 2) * h;
  }
  if (prompt.includes('hình thoi')) return ((n[0] * n[1]) / 2) * n[2];
  if (prompt.includes('các cạnh đáy')) {
    const [p, q, r, s, h] = n;
    expect(2 * Math.max(p, q, r, s)).toBeLessThan(p + q + r + s);
    return (p + q + r + s) * h;
  }
  if (prompt.includes('chu vi đáy')) return n[1] / n[0];
  if (prompt.includes('diện tích đáy') && prompt.includes('Tính chiều cao')) return n[1] / n[0];
  if (prompt.includes('Tính diện tích đáy')) return n[1] / n[0];
  throw new Error(`unknown prompt: ${prompt}`);
}

const ALL = [
  ['page 92', PAGE_92_SKILLS],
  ['page 100', PAGE_100_SKILLS],
  ['chapter', CHAPTER_SKILLS],
];

describe.each(ALL)('%s skills', (_, skills) => {
  it('store answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet(/** @type {any} */ (skills), 3, seed)) {
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(Number.isInteger(q.answer) && q.answer > 0, q.prompt).toBe(true);
        expect(q.steps.at(-1), q.prompt).toContain(fmt(q.answer));
        expect(q.unit, q.prompt).toBeTruthy();
        for (const h of q.hints ?? [])
          expect(h, q.prompt).not.toMatch(new RegExp(`= ${fmt(q.answer)}(?!\\d)`));
      }
    }
  });
});

describe('coverage', () => {
  it('reaches every kind of question', () => {
    const prompts = new Set();
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed))
        prompts.add(q.prompt.replaceAll(GROUP, '').replace(/\d+/g, '#'));
    }
    // Three kinds per skill, six skills.
    expect(prompts.size).toBe(18);
  });

  it('draws one skill per lesson topic in each set', () => {
    expect(new Set(buildSet(PAGE_92_SKILLS, 4, 3).map((q) => q.skill)).size).toBe(3);
    expect(new Set(buildSet(PAGE_100_SKILLS, 4, 3).map((q) => q.skill)).size).toBe(3);
    expect(buildSet(CHAPTER_SKILLS, 2, 3)).toHaveLength(12);
  });
});
