import { describe, it, expect } from 'vitest';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, SKILLS_TRANG_106 } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const P = Math.PI;

/**
 * Recomputes a question's answer from its prompt alone, independently of
 * the generators: the exact k of a result kπ, or the rounded value.
 * @param {string} p
 * @returns {number}
 */
function solve(p) {
  const round = (/** @type {number} */ v, /** @type {number} */ places) =>
    Math.round(v * 10 ** places) / 10 ** places;
  const n = (/** @type {RegExpExecArray} */ m, /** @type {number} */ i) => Number(m[i]);
  /** @type {RegExpExecArray | null} */
  let m = /^Hình trụ có bán kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính diện tích xung quanh/.exec(
    p,
  );
  if (m) return 2 * n(m, 1) * n(m, 2);
  m = /^Hình trụ có bán kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính thể tích/.exec(p);
  if (m) return n(m, 1) ** 2 * n(m, 2);
  m = /^Hình trụ có thể tích \$(\d+)\\pi\$ cm³ và bán kính đáy (\d+) cm/.exec(p);
  if (m) return n(m, 1) / n(m, 2) ** 2;
  m = /^Hình trụ có đường kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính diện tích toàn phần/.exec(p);
  if (m) {
    const r = n(m, 1) / 2;
    return round(2 * P * r * n(m, 2) + 2 * P * r * r, 1);
  }
  m = /^Hình nón có bán kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính độ dài đường sinh/.exec(p);
  if (m) return Math.hypot(n(m, 1), n(m, 2));
  m = /^Hình nón có bán kính đáy (\d+) cm, đường sinh (\d+) cm/.exec(p);
  if (m) return n(m, 1) * n(m, 2);
  m = /^Hình nón có bán kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính thể tích/.exec(p);
  if (m) return (n(m, 1) ** 2 * n(m, 2)) / 3;
  m = /^Hình nón có bán kính đáy (\d+) cm, chiều cao (\d+) cm\. Tính diện tích toàn phần/.exec(p);
  if (m) {
    const [r, h] = [n(m, 1), n(m, 2)];
    return round(P * r * Math.hypot(r, h) + P * r * r, 1);
  }
  m = /^Mặt cầu có bán kính (\d+) cm/.exec(p);
  if (m) return 4 * n(m, 1) ** 2;
  m = /^Hình cầu có bán kính (\d+) cm\. Tính thể tích/.exec(p);
  if (m) return (4 * n(m, 1) ** 3) / 3;
  m = /^Cắt hình cầu bán kính (\d+) cm bởi một mặt phẳng cách tâm (\d+) cm/.exec(p);
  if (m) return Math.sqrt(n(m, 1) ** 2 - n(m, 2) ** 2);
  m = /^Một mặt cầu có diện tích \$(\d+)\\pi\$ cm²/.exec(p);
  if (m) return Math.sqrt(n(m, 1) / 4);
  m = /^Một quả bóng hình cầu có đường kính (\d+) cm/.exec(p);
  if (m) return round((4 / 3) * P * (n(m, 1) / 2) ** 3, 1);
  m =
    /hình trụ bán kính đáy (\d+) mm, chiều cao (\d+) mm và hai nửa hình cầu bán kính (\d+) mm/.exec(
      p,
    );
  if (m) {
    expect(m[3]).toBe(m[1]);
    const [r, h] = [n(m, 1), n(m, 2)];
    return round(P * r * r * h + (4 / 3) * P * r ** 3, 1);
  }
  m =
    /hình nón bán kính đáy (\d+) cm, chiều cao (\d+) cm, chứa đầy kem .* nửa hình cầu kem bán kính (\d+) cm/.exec(
      p,
    );
  if (m) {
    expect(m[3]).toBe(m[1]);
    const [r, h] = [n(m, 1), n(m, 2)];
    return round((P * r * r * h) / 3 + (2 / 3) * P * r ** 3, 1);
  }
  m = /thùng nước hình trụ có đường kính đáy (\d+) dm và chiều cao (\d+) dm/.exec(p);
  if (m) return round(P * (n(m, 1) / 2) ** 2 * n(m, 2), 0);
  m = /cốc hình trụ có bán kính đáy (\d+) cm .* viên bi hình cầu bán kính (\d+) cm/.exec(p);
  if (m) return round(((4 / 3) * P * n(m, 2) ** 3) / (P * n(m, 1) ** 2), 1);
  throw new Error(`No solver for: ${p}`);
}

describe('chapter skills', () => {
  it('match an independent recomputation from the prompt', () => {
    /** @type {string[]} */
    const failures = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const want = solve(q.prompt);
        if (Math.abs(want - q.answer) > 1e-9) failures.push(`${q.prompt} → ${q.answer} ≠ ${want}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it('give answers that read back exactly as typed', () => {
    /** @type {string[]} */
    const failures = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (readNumber(numberText(q.answer)) !== q.answer) failures.push(q.prompt);
      }
    }
    expect(failures).toEqual([]);
  });

  it('never leave a rounded answer on a rounding half', () => {
    /** @type {string[]} */
    const failures = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (!/làm tròn/.test(q.prompt)) continue;
        const exact = /hàng đơn vị/.test(q.prompt) ? q.answer : q.answer * 10;
        if (!Number.isInteger(Math.round(exact * 1e6) / 1e6)) failures.push(q.prompt);
      }
    }
    expect(failures).toEqual([]);
  });

  it('write a tenths-rounded result with its tenths digit and keep water rises visible', () => {
    /** @type {string[]} */
    const failures = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (!/hàng phần mười/.test(q.prompt)) continue;
        const last = q.steps[q.steps.length - 1];
        if (!/\\approx [\d\\,]+\{,\}\d\$/.test(last)) failures.push(last);
        if (/Mực nước dâng/.test(q.prompt) && q.answer < 0.2) failures.push(q.prompt);
      }
    }
    expect(failures).toEqual([]);
  });

  it('build sets of distinct questions with hints and steps', () => {
    const set = buildSet(SKILLS_TRANG_106, 4, 7);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
    const review = buildSet(CHAPTER_SKILLS, 3, 11);
    expect(review).toHaveLength(12);
    for (const q of review) {
      expect(q.steps.length).toBeGreaterThan(0);
      expect(q.hints?.length ?? 0).toBeGreaterThan(0);
    }
  });
});
