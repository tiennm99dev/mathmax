import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { readNumber } from '#lib/core/decimal.js';
import { GROUP } from '#lib/core/number-format.js';
import { CHAPTER_SKILLS, PRACTICE_121, answerText } from './skills.js';

/**
 * Numbers in a prompt, in order, read with a decimal comma and the book's
 * digit grouping undone. Units such as cm² and cm³ are dropped first.
 * @param {string} prompt
 */
const numbers = (prompt) =>
  [
    ...prompt
      .replaceAll(GROUP, '')
      .replace(/[²³]/g, '')
      .matchAll(/\d+(?:,\d+)?/g),
  ].map((m) => Number(m[0].replace(',', '.')));

/**
 * Recomputes a question's answer from its prompt alone, with the textbook
 * formulas S_xq = p · d and V = ⅓ · S · h.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  const tri = prompt.includes('tam giác đều');
  const n = numbers(prompt);
  const half = (/** @type {number} */ a) => (tri ? (3 * a) / 2 : 2 * a);
  if (prompt.includes('tiền mua vải')) {
    const [a, d, price] = n;
    return 2 * a * d * price;
  }
  if (prompt.includes('lít nước')) {
    const [a, h] = n;
    return (a * a * h) / 3;
  }
  if (prompt.includes('Thể tích hình hộp')) return n[0] / 3;
  if (prompt.includes('tổng độ dài tất cả các cạnh')) return 3 * n[0] + 3 * n[1];
  if (prompt.includes('diện tích đáy') && prompt.includes('Tính thể tích'))
    return (n[0] * n[1]) / 3;
  if (prompt.includes('Tính trung đoạn SI')) {
    const [a, h] = n;
    const d = Math.hypot(h, a / 2);
    expect(Number.isInteger(d)).toBe(true);
    return d;
  }
  if (prompt.includes('cạnh bên') && prompt.includes('diện tích xung quanh')) {
    const [a, e] = n;
    const d = Math.sqrt(e * e - (a / 2) ** 2);
    expect(Number.isInteger(d)).toBe(true);
    // The slant height must be longer than the distance from H to a side.
    expect(d).toBeGreaterThan(tri ? a / (2 * Math.sqrt(3)) : a / 2);
    return half(a) * d;
  }
  if (prompt.includes('Tính chiều cao')) {
    const [a, V] = n;
    return (3 * V) / (a * a);
  }
  if (prompt.includes('chiều cao') && prompt.includes('Tính thể tích')) {
    const [a, h] = n;
    return (a * a * h) / 3;
  }
  if (prompt.includes('Tính trung đoạn')) {
    const [a, S] = n;
    return S / half(a);
  }
  if (prompt.includes('trung đoạn')) {
    const [a, d] = n;
    // A real pyramid: its slant height is longer than the inradius of the base.
    expect(d).toBeGreaterThan(tri ? a / (2 * Math.sqrt(3)) : a / 2);
    const lateral = half(a) * d;
    if (prompt.includes('toàn phần')) return lateral + a * a;
    return lateral;
  }
  throw new Error(`unknown prompt: ${prompt}`);
}

const SETS = [
  ['page 121', PRACTICE_121, 4],
  ['chapter', CHAPTER_SKILLS, 2],
];

describe.each(SETS)('%s skills', (_, skills, perSkill) => {
  it('store answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildSet(
        /** @type {any} */ (skills),
        /** @type {number} */ (perSkill),
        seed,
      )) {
        const want = recompute(q.prompt);
        expect(Math.abs(q.answer - want), q.prompt).toBeLessThan(1e-9);
        expect(q.answer, q.prompt).toBeGreaterThan(0);
        // At most one decimal digit, so the learner can type it exactly.
        expect(Number.isInteger(Math.round(q.answer * 10 * 1e6) / 1e6), q.prompt).toBe(true);
        expect(q.unit, q.prompt).toBeTruthy();
        expect(q.steps.at(-1), q.prompt).toContain(answerText(q.answer));
        expect(readNumber(answerText(q.answer).replaceAll(GROUP, ''))).toBe(q.answer);
        for (const h of q.hints ?? [])
          expect(h, q.prompt).not.toMatch(new RegExp(`= ${answerText(q.answer)}(?![\\d,])`));
      }
    }
  });
});

describe('coverage', () => {
  it('reaches every kind of question', () => {
    const kinds = new Set();
    for (let seed = 1; seed <= 400; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 2, seed))
        kinds.add(q.prompt.replaceAll(GROUP, '').replace(/\d+(,\d+)?/g, '#'));
    }
    // 4 + 5 + 3 + 4 kinds of question.
    expect(kinds.size).toBe(16);
  });

  it('draws one skill per lesson topic in each set', () => {
    expect(new Set(buildSet(PRACTICE_121, 4, 7).map((q) => q.skill)).size).toBe(2);
    expect(buildSet(PRACTICE_121, 4, 7)).toHaveLength(8);
    expect(buildSet(CHAPTER_SKILLS, 2, 7)).toHaveLength(8);
  });
});
