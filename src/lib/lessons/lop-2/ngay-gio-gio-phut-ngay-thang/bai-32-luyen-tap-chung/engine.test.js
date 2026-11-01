import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { WEEKDAYS, daysIn, upperFirst, weekdayOf } from '../_shared/time.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/**
 * The right option worked out again from the question alone, or null where the
 * words of the answer depend on the problem.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const v = q.visual;
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'doc-gio': {
      const t = v?.clock ?? 0;
      const h = Math.floor(t / 60) || 12;
      const m = t % 60;
      return m ? `${h} giờ ${m} phút` : `${h} giờ`;
    }
    case 'doi-gio': {
      if (/^\d+ giờ còn gọi/.test(q.prompt)) {
        const h = nums[0];
        const part = h <= 18 ? 'chiều' : h <= 21 ? 'tối' : 'đêm';
        return `${h - 12} giờ ${part}`;
      }
      return `${nums[0] + 12} giờ`;
    }
    case 'gio-phut':
      if (q.prompt.startsWith('Một ngày')) return '24 giờ';
      return nums[2] ? `${nums[2]} phút` : `${(nums[1] - nums[0]) * 60} phút`;
    case 'thu-ngay':
      return upperFirst(WEEKDAYS[weekdayOf(nums[1], nums[0])]);
    case 'tuan':
      return String(q.prompt.includes('tuần sau') ? nums[0] + 7 : nums[0] - 7);
    case 'so-ngay':
      return `${daysIn(nums[0])} ngày`;
    default:
      return null;
  }
}

describe('the mixed round', () => {
  it('covers every kind', () => {
    const kinds = new Set(buildRound(1).map((q) => q.kind));
    expect([...kinds].sort()).toEqual([...KINDS].sort());
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
    expect(buildRound(1)).toHaveLength(13);
  });

  it('stores the answer the question asks for, across many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        const right = texts[q.answer];
        const expected = recompute(q);
        if (expected !== null && right !== expected) bad.push(`${q.prompt} → ${right}`);
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push(texts.join('/'));
        if (q.answer < 0 || q.answer >= texts.length) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps the week questions on the sheet', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'tuan')) {
        const month = q.visual?.month ?? 0;
        const right = Number(optionText(q.options[q.answer]));
        if (right < 1 || right > daysIn(month)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('checks the word problems by their stated times', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'bai-toan')) {
        const right = optionText(q.options[q.answer]);
        if (q.prompt.startsWith('Bảo tàng')) {
          const closes = Number(q.prompt.match(/đến (\d+) giờ/)?.[1]);
          const at = Number(right.match(/lúc (\d+) giờ/)?.[1]);
          if (at <= closes) bad.push(q.prompt);
        } else if (q.prompt.startsWith('Nam học') && right !== 'Hát và Vẽ') {
          bad.push(q.prompt);
        } else if (q.prompt.startsWith('Nhà Nam')) {
          const trips = [...q.prompt.matchAll(/([^\s,]+(?: [^\s,]+)?) ngày (\d+)/g)].map((m) => ({
            place: m[1].replace(/^Nhà Nam đi /, ''),
            date: Number(m[2]),
          }));
          const first = q.prompt.includes('đầu tiên');
          const want = [...trips].sort((a, b) => (first ? a.date - b.date : b.date - a.date))[0];
          if (!want.place.endsWith(right)) bad.push(`${q.prompt} → ${right}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
