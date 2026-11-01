import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { REVIEW_SKILLS, columnWords, nearOptions } from './review-skills.js';

/**
 * Evaluates "a + b" or "a − b".
 * @param {string} a
 * @param {string} op
 * @param {string} b
 */
const calc = (a, op, b) => (op === '+' ? Number(a) + Number(b) : Number(a) - Number(b));

/** @param {number} x @param {number} y */
const sign = (x, y) => (x === y ? '=' : x > y ? '>' : '<');

/**
 * The right option worked out again from the prompt alone.
 * @param {string} id
 * @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q
 * @returns {string | null}
 */
function recompute(id, q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  const op = p.match(/\d+ ([+−]) \d+/)?.[1] ?? '';
  switch (id) {
    case 'tron-chuc':
    case 'cong':
    case 'tru':
    case 'dat-tinh':
      return String(calc(String(nums[0]), op, String(nums[1])));
    case 'thanh-phan': {
      if (p.startsWith('Các số hạng')) return String(nums[0] + nums[1]);
      if (p.startsWith('Số bị trừ')) return String(nums[0] - nums[1]);
      const [a, b, c, v] = nums;
      if (op === '+') return v === c ? 'Tổng' : 'Số hạng';
      return v === a ? 'Số bị trừ' : v === b ? 'Số trừ' : 'Hiệu';
    }
    case 'hon-kem':
      return String(Math.abs(nums[0] - nums[1]));
    case 'so-sanh':
      return sign(calc(String(nums[0]), op, String(nums[1])), nums[2]);
    case 'bai-toan': {
      // "Tổ Hai ... ít hơn" and things going away subtract; "thêm" adds.
      if (p.includes('thêm')) return String(nums[0] + nums[1]);
      return String(nums[0] - nums[1]);
    }
    default:
      return null;
  }
}

describe('review skills', () => {
  it('stores the answer that the prompt gives', () => {
    const bad = [];
    for (const skill of REVIEW_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed * 31 + skill.id.length));
        const right = optionText(q.options[q.answer]);
        const again = recompute(skill.id, q);
        if (right !== again) bad.push([skill.id, q.prompt, right, again]);
        const texts = q.options.map(optionText);
        if (new Set(texts).size !== texts.length) bad.push(['dup', skill.id, texts]);
        if (texts.length < 2) bad.push(['few', skill.id, texts]);
        if (q.hint.includes(right) && /^\d+$/.test(right)) bad.push(['hint', skill.id, q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never carries or borrows, and stays within 100', () => {
    const bad = [];
    for (const skill of REVIEW_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        const m = q.prompt.match(/(\d+) ([+−]) (\d+)/);
        if (!m) continue;
        const a = Number(m[1]);
        const b = Number(m[3]);
        const carry =
          m[2] === '+' ? (a % 10) + (b % 10) > 9 || a + b > 99 : a % 10 < b % 10 || a < b;
        if (carry) bad.push([skill.id, q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('shows the column for a column question', () => {
    const q = REVIEW_SKILLS.find((s) => s.id === 'dat-tinh')?.make(rng(9));
    expect(q?.visual?.type).toBe('column');
  });
});

describe('helpers', () => {
  it('builds options around the answer', () => {
    const { options, answer } = nearOptions(rng(1), 47, [27]);
    expect(options[answer]).toBe('47');
    expect(options).toContain('27');
    expect(options).toHaveLength(4);
    expect(nearOptions(rng(1), 0).options.every((o) => Number(o) >= 0)).toBe(true);
  });

  it('works column by column', () => {
    expect(columnWords(32, 15, '+')).toBe(
      'Hàng đơn vị: 2 + 5 = 7. Hàng chục: 3 + 1 = 4. Vậy 32 + 15 = 47.',
    );
    expect(columnWords(76, 5, '-')).toBe(
      'Hàng đơn vị: 6 − 5 = 1. Hàng chục: hạ 7. Vậy 76 − 5 = 71.',
    );
  });
});
