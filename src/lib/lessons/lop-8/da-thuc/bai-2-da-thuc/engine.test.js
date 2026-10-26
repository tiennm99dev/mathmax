import { describe, it, expect } from 'vitest';
import { PRESETS, degrees, mergeTerms, signedText, termsOf } from './engine.js';
import { collect, isCollected, polyDegree, polyText } from '../_shared/poly.js';

describe('presets', () => {
  it('need collecting and keep at least two terms afterwards', () => {
    for (const p of PRESETS) {
      const terms = termsOf(p.src).map((t) => t.m);
      expect(isCollected(terms)).toBe(false);
      expect(collect(terms).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('collect to the forms the lesson states', () => {
    const forms = PRESETS.map((p) => polyText(collect(termsOf(p.src).map((t) => t.m))));
    expect(forms).toEqual(['−2x²y + 5xy + 1', '−xy² + 3 + 7x²', 'x²y³ + xy + y²']);
    expect(PRESETS.map((p) => polyDegree(termsOf(p.src).map((t) => t.m)))).toEqual([3, 3, 5]);
  });
});

describe('mergeTerms', () => {
  const start = termsOf(PRESETS[0].src);

  it('refuses one term or unlike terms', () => {
    expect(mergeTerms(start, ['t0']).ok).toBe(false);
    const bad = mergeTerms(start, ['t0', 't1']);
    expect(bad.ok).toBe(false);
    expect(bad.message).toContain('không đồng dạng');
    expect(bad.terms).toBe(start);
  });

  it('puts the sum where the first picked term was', () => {
    const r = mergeTerms(start, ['t0', 't2']);
    expect(r.ok).toBe(true);
    expect(r.message).toBe('Gộp: x²y − 3x²y = −2x²y.');
    expect(polyText(r.terms.map((t) => t.m))).toBe('−2x²y + 3xy − 3 + 2xy + 4');
  });

  it('drops terms that cancel', () => {
    const n = termsOf(PRESETS[1].src);
    const r = mergeTerms(n, ['t0', 't3']);
    expect(r.terms).toHaveLength(4);
    expect(r.message).toContain('triệt tiêu');
  });

  it('reaches the collected form and its degree by merging step by step', () => {
    let t = mergeTerms(start, ['t0', 't2']).terms;
    t = mergeTerms(t, ['t1', 't4']).terms;
    t = mergeTerms(t, ['t3', 't5']).terms;
    expect(isCollected(t.map((x) => x.m))).toBe(true);
    expect(degrees(t)).toEqual({ degrees: [3, 2, 0], max: 3 });
  });
});

describe('signedText', () => {
  it('writes the sign in front of later terms', () => {
    const [a, b] = termsOf('x^2 - 3xy');
    expect(signedText(a.m, true)).toBe('x²');
    expect(signedText(b.m, false)).toBe('− 3xy');
  });
});
