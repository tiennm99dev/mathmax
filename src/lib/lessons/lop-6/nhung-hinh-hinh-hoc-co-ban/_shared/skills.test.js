import { describe, it, expect } from 'vitest';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { clockAngle, kindOf } from './angle.js';
import {
  CHAPTER_SKILLS,
  PAGE_57_SKILLS,
  PAGE_65_SKILLS,
  diemDuongThang,
  doanThang,
  goc,
  soDoGoc,
  tia,
  trungDiem,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Every whole number written in a text, in order. @param {string} text */
const numbers = (text) => [...text.matchAll(/\d+/g)].map((m) => Number(m[0]));

/** @param {number} n */
const pairs = (n) => (n * (n - 1)) / 2;

/**
 * Recomputes the answer of a generated question from its prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  const ns = numbers(prompt);
  if (prompt.includes('giờ đúng')) return clockAngle(ns[0]);
  if (prompt.includes('hàng số')) return ns[1] - ns[0];
  if (prompt.startsWith('Cho sáu góc')) {
    const kind = prompt.includes('góc nhọn trong') ? 'nhon' : 'tu';
    return ns.slice(0, 6).filter((d) => kindOf(d) === kind).length;
  }
  if (prompt.includes('kể cả góc bẹt')) return pairs(ns[0] + 2);
  if (prompt.includes('một cạnh là tia Ox')) return ns[0] - 1;
  if (prompt.includes('tia chung gốc O phân biệt')) return pairs(ns[0]);
  if (prompt.includes('có đúng')) return pairs(ns[0]) - pairs(ns[1]) + 1;
  if (prompt.includes('không có ba điểm nào thẳng hàng')) return pairs(ns[0]);
  if (prompt.includes('giao điểm')) return pairs(ns[0]);
  if (prompt.includes('tia phân biệt')) return 2 * ns[0];
  if (prompt.includes('tia đối nhau')) return ns[0];
  if (prompt.includes('nằm theo đúng thứ tự')) {
    const order = /điểm ([A-H](?:, [A-H])*) nằm theo/.exec(prompt)?.[1].split(', ') ?? [];
    const [p, q] = /hai điểm ([A-H]) và ([A-H])\?/.exec(prompt)?.slice(1) ?? [];
    return order.indexOf(q) - order.indexOf(p) - 1;
  }
  if (prompt.includes('Tính độ dài đoạn thẳng AB')) return ns[0] + ns[1];
  if (prompt.startsWith('Điểm M nằm giữa')) return ns[0] - ns[1];
  if (prompt.includes('đoạn thẳng có hai đầu mút')) return pairs(ns[0]);
  if (prompt.startsWith('Đặt thước')) return ns[1] - ns[0];
  if (prompt.startsWith('M là trung điểm')) return ns[0] / 2;
  if (prompt.startsWith('I là trung điểm')) return 2 * ns[0];
  if (prompt.startsWith('Cho đoạn thẳng PQ')) return ns[0] / 4;
  if (prompt.startsWith('Trên tia Ox')) return (ns[0] + ns[1]) / 2;
  throw new Error(`unknown prompt: ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of [diemDuongThang, tia, doanThang, trungDiem, goc, soDoGoc]) {
    it(`${skill.id} gives natural-number answers that match the prompt`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.answer, q.prompt).toBeGreaterThanOrEqual(1);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.steps.at(-1)).toContain(String(q.answer));
      }
    });

    it(`${skill.id} hints never state the result`, () => {
      for (const q of sample(skill, 200)) {
        const hints = hintsFor({ skill: skill.id, ...q });
        expect(hints.length).toBeGreaterThan(0);
        for (const h of hints) {
          expect(new RegExp(`= ${q.answer}(?![\\d,])`).test(h), h).toBe(false);
        }
      }
    });
  }

  it('builds the angle drill and the chapter test without repeated prompts', () => {
    for (const [skills, per] of /** @type {const} */ ([
      [PAGE_65_SKILLS, 5],
      [CHAPTER_SKILLS, 2],
    ])) {
      const set = buildSet([...skills], per, 1);
      expect(set).toHaveLength(skills.length * per);
      expect(new Set(set.map((q) => q.prompt)).size).toBe(set.length);
    }
  });

  it('builds a set without repeated prompts', () => {
    const set = buildSet(PAGE_57_SKILLS, 3, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
  });
});
