import { describe, it, expect } from 'vitest';
import { PROBLEMS, RULES, judge, ruleOf, valuesText } from './engine.js';

describe('step-by-step transformer', () => {
  it('has distinct rules and only uses known ones', () => {
    const ids = RULES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PROBLEMS) {
      expect(p.steps.length, p.title).toBeGreaterThanOrEqual(2);
      for (const s of p.steps) expect(ids).toContain(s.rule);
    }
  });

  for (const p of PROBLEMS) {
    it(`keeps the value of "${p.title}" at every step`, () => {
      for (const s of p.steps) {
        expect(s.values.length).toBe(p.values.length);
        s.values.forEach((v, i) => expect(v, s.tex).toBeCloseTo(p.values[i], 10));
      }
    });
  }

  it('reaches the expected closed forms', () => {
    const last = (/** @type {number} */ i) => PROBLEMS[i].steps.at(-1)?.values[0];
    expect(last(0)).toBeCloseTo(6 * Math.SQRT2, 12);
    expect(PROBLEMS[1].values[0]).toBeGreaterThan(PROBLEMS[1].values[1]);
    expect(last(4)).toBeCloseTo(Math.sqrt(5) + Math.sqrt(3), 12);
    expect(last(6)).toBeCloseTo(3 * Math.SQRT2 - 1, 12);
  });

  it('praises the right rule and explains a wrong one', () => {
    const p = PROBLEMS[0];
    expect(judge(p, 0, 'ra').ok).toBe(true);
    expect(judge(p, 1, 'gon').text).toContain('xong');
    const wrong = judge(p, 0, 'lien');
    expect(wrong.ok).toBe(false);
    expect(wrong.text).toContain(ruleOf('lien').label);
    expect(wrong.text).toContain('50 = 25·2');
  });

  it('writes the numeric check with a decimal comma', () => {
    expect(valuesText([Math.sqrt(45), Math.sqrt(44)])).toBe('≈ 6,7082 và ≈ 6,6332');
  });
});
