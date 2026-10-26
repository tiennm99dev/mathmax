import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { PAGE_50_SKILLS } from './skills.js';
import { angleAt } from './transversal.js';

const SUB = '₀₁₂₃₄₅₆₇₈₉';

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  let m;
  if ((m = /kề bù, xÔy = (\d+)°\. Tính yÔz/.exec(prompt))) return 180 - Number(m[1]);
  if ((m = /góc lớn gấp (\d+) lần góc nhỏ/.exec(prompt))) return 180 / (Number(m[1]) + 1);
  if ((m = /hơn kém nhau (\d+)°/.exec(prompt))) return (180 + Number(m[1])) / 2;
  if ((m = /Tổng của hai góc đối đỉnh là (\d+)°/.exec(prompt))) return 180 - Number(m[1]) / 2;
  if ((m = /mÔp = (\d+)°\. Tính nÔq/.exec(prompt))) return Number(m[1]);
  if ((m = /mÔp = (\d+)°\. Tính pÔn/.exec(prompt))) return 180 - Number(m[1]);
  if ((m = /xÔy = (\d+)°\. Tính xÔt/.exec(prompt))) return Number(m[1]) / 2;
  if ((m = /xÔt = (\d+)°\. Tính xÔy/.exec(prompt))) return Number(m[1]) * 2;
  if ((m = /xÔy = (\d+)°, Ox' là tia đối/.exec(prompt))) return 180 - Number(m[1]) / 2;
  if ((m = /Â(.) = (\d+)°\. Để a \/\/ b thì B̂(.)/.exec(prompt))) {
    const i = /** @type {1|2|3|4} */ (SUB.indexOf(m[1]));
    const k = /** @type {1|2|3|4} */ (SUB.indexOf(m[3]));
    const a = Number(m[2]);
    // Build the figure: line a horizontal, transversal whose angle Â_i is a.
    for (let g = 1; g < 180; g++) {
      if (angleAt(i, 0, g) === a) return angleAt(k, 0, g);
    }
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('page 50 skills', () => {
  it('stores answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildSet(PAGE_50_SKILLS, 3, seed)) {
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(Number.isInteger(q.answer) && q.answer > 0 && q.answer < 180).toBe(true);
        expect(q.steps.at(-1)).toContain(`${q.answer}°`);
        for (const h of q.hints ?? []) expect(h).not.toMatch(new RegExp(`= ${q.answer}°\\.?$`));
      }
    }
  });

  it('draws every skill', () => {
    const set = buildSet(PAGE_50_SKILLS, 3, 7);
    expect(new Set(set.map((q) => q.skill)).size).toBe(PAGE_50_SKILLS.length);
    expect(set).toHaveLength(12);
  });
});
