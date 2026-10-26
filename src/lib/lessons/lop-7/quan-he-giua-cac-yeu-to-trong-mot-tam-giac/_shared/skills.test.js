import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { PAGE_70_SKILLS } from './skills.js';

/**
 * Recomputes a question's answer from its prompt alone, checking along the
 * way that the data describe a real triangle.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  const n = (/** @type {string} */ s) => Number(s);
  /** @type {RegExpExecArray | null} */
  let m;
  if ((m = /cân tại A có B̂ = (\d+)°\. Góc đối diện với cạnh lớn nhất/.exec(prompt))) {
    const x = n(m[1]);
    expect(x).not.toBe(60);
    return Math.max(x, 180 - 2 * x);
  }
  if ((m = /Â = (\d+)°, B̂ = (\d+)°\. Góc đối diện với cạnh (lớn nhất|nhỏ nhất)/.exec(prompt))) {
    const angles = [n(m[1]), n(m[2]), 180 - n(m[1]) - n(m[2])];
    expect(new Set(angles).size).toBe(3);
    expect(Math.min(...angles)).toBeGreaterThan(0);
    return m[3] === 'lớn nhất' ? Math.max(...angles) : Math.min(...angles);
  }
  if ((m = /độ dài lần lượt (\d+) cm, (\d+) cm, (\d+) cm, (\d+) cm/.exec(prompt))) {
    const found = m;
    const lens = [1, 2, 3, 4].map((i) => n(found[i]));
    const min = Math.min(...lens);
    expect(lens.filter((v) => v === min)).toHaveLength(1);
    return min;
  }
  if ((m = /Khoảng cách từ điểm A đến đường thẳng d bằng (\d+) cm/.exec(prompt)))
    return n(m[1]) + 1;
  if (
    (m = /AB = (\d+) cm, BC = (\d+) cm\. Khoảng cách từ điểm (D|C) đến đường thẳng (BC|AB)/.exec(
      prompt,
    ))
  ) {
    expect(m[3] === 'D' ? 'BC' : 'AB').toBe(m[4]);
    return m[3] === 'D' ? n(m[1]) : n(m[2]);
  }
  if ((m = /cân có AB = (\d+) cm, AC = (\d+) cm/.exec(prompt))) {
    const [s, L] = [n(m[1]), n(m[2])];
    const options = [s, L].filter((bc) => Math.max(s, L, bc) < s + L + bc - Math.max(s, L, bc));
    expect(options).toHaveLength(1);
    return options[0];
  }
  if ((m = /AB = (\d+) cm, AC = (\d+) cm\. Có bao nhiêu giá trị nguyên/.exec(prompt))) {
    const [p, q] = [n(m[1]), n(m[2])];
    let count = 0;
    for (let bc = 1; bc < 100; bc++) if (Math.abs(p - q) < bc && bc < p + q) count++;
    return count;
  }
  if ((m = /tam giác cân có hai cạnh dài (\d+) cm và (\d+) cm/.exec(prompt))) {
    const [u, v] = [n(m[1]), n(m[2])];
    /** @param {number} leg @param {number} base */
    const ok = (leg, base) => base < 2 * leg;
    const found = [
      [u, v],
      [v, u],
    ].filter(([leg, base]) => ok(leg, base));
    expect(found).toHaveLength(1);
    return 2 * found[0][0] + found[0][1];
  }
  if ((m = /AB = (\d+) cm, AC = (\d+) cm và độ dài BC là một số nguyên.*lớn nhất/.exec(prompt))) {
    const [p, q] = [n(m[1]), n(m[2])];
    let best = 0;
    for (let bc = 1; bc < 100; bc++) if (Math.abs(p - q) < bc && bc < p + q) best = bc;
    return best;
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('page 70 skills', () => {
  it('stores answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 120; seed++) {
      for (const q of buildSet(PAGE_70_SKILLS, 4, seed)) {
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(Number.isInteger(q.answer) && q.answer > 0, q.prompt).toBe(true);
        expect(q.steps.at(-1), q.prompt).toContain(String(q.answer));
        for (const h of q.hints ?? []) {
          expect(h, q.prompt).not.toMatch(new RegExp(`= ${q.answer}(°| cm)?\\.?$`));
        }
      }
    }
  });

  it('draws every skill', () => {
    const set = buildSet(PAGE_70_SKILLS, 3, 5);
    expect(new Set(set.map((q) => q.skill)).size).toBe(PAGE_70_SKILLS.length);
    expect(set).toHaveLength(3 * PAGE_70_SKILLS.length);
  });

  it('reaches every kind of question', () => {
    const prompts = new Set();
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet(PAGE_70_SKILLS, 3, seed)) prompts.add(q.prompt.replace(/\d+/g, '#'));
    }
    // 3 angle kinds (largest and smallest worded apart), 4 perpendicular kinds, 4 side kinds.
    expect(prompts.size).toBe(11);
  });
});
