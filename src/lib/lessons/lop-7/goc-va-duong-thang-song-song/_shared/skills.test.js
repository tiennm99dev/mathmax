import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, PAGE_50_SKILLS, PAGE_58_SKILLS } from './skills.js';
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

/**
 * Recomputes a page 58 answer from its prompt alone, by building the figure.
 * @param {string} prompt
 * @returns {number}
 */
function recompute58(prompt) {
  let m;
  /** @param {string} c */
  const no = (c) => /** @type {1|2|3|4} */ (SUB.indexOf(c));
  if ((m = /Â(.) gấp (\d+) lần Â(.)\. Tính B̂(.)/.exec(prompt))) {
    const i = no(m[1]);
    const j = no(m[3]);
    const k = Number(m[2]);
    // a // b: the angles at B equal those at A; find the transversal that fits.
    for (let g = 1; g < 180; g++) {
      if (angleAt(i, 0, g) === k * angleAt(j, 0, g)) return angleAt(no(m[4]), 0, g);
    }
  }
  if ((m = /Biết Â(.) = (\d+)°\. Tính B̂(.)/.exec(prompt))) {
    for (let g = 1; g < 180; g++) {
      if (angleAt(no(m[1]), 0, g) === Number(m[2])) return angleAt(no(m[3]), 0, g);
    }
  }
  if ((m = /góc ABC gấp (\d+) lần góc BCD\. Tính góc (ABC|BCD)/.exec(prompt))) {
    const c = 180 / (Number(m[1]) + 1);
    return m[2] === 'BCD' ? c : 180 - c;
  }
  if ((m = /xÂM = (\d+)°, yB̂M = (\d+)°/.exec(prompt))) return Number(m[1]) + Number(m[2]);
  if ((m = /AM̂B = (\d+)°, xÂM = (\d+)°/.exec(prompt))) return Number(m[1]) - Number(m[2]);
  if ((m = /Có (\d+) đường thẳng phân biệt đôi một song song và (\d+) đường/.exec(prompt))) {
    const k = Number(m[1]);
    const n = Number(m[2]);
    // Count pairs over an explicit list of line directions: 0° or 90°.
    const dirs = [...Array(k).fill(0), ...Array(n).fill(90)];
    let par = 0;
    let perp = 0;
    for (let x = 0; x < dirs.length; x++) {
      for (let y = x + 1; y < dirs.length; y++) {
        if (dirs[x] === dirs[y]) par++;
        else perp++;
      }
    }
    return prompt.includes('vuông góc với nhau?') ? perp : par;
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('page 58 skills', () => {
  it('stores answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildSet(PAGE_58_SKILLS, 3, seed)) {
        expect(q.answer, q.prompt).toBe(recompute58(q.prompt));
        expect(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 180).toBe(true);
        expect(q.steps.at(-1)).toMatch(new RegExp(`= ${q.answer}°?[.)]?( \\(.*\\))?\\.?$`));
      }
    }
  });

  it('builds a chapter review set that draws every skill', () => {
    const set = buildSet(CHAPTER_SKILLS, 2, 11);
    expect(new Set(set.map((q) => q.skill)).size).toBe(CHAPTER_SKILLS.length);
    expect(set).toHaveLength(2 * CHAPTER_SKILLS.length);
  });
});
