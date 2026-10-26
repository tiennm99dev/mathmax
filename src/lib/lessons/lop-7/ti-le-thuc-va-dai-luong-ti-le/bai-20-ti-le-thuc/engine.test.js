import { describe, it, expect } from 'vitest';
import { div, equals, fraction } from '#lib/fraction-engine/index.js';
import { FORMS, analyze } from './engine.js';

const f = fraction;

describe('analyze', () => {
  it('finds each missing term so that the cross products agree', () => {
    const full = [f(2), f(6), f(5), f(15)];
    for (let i = 0; i < 4; i++) {
      const terms = full.map((t, j) => (j === i ? null : t));
      const out = analyze(terms);
      expect(out.kind).toBe('solve');
      if (out.kind === 'solve') expect(equals(out.value, full[i])).toBe(true);
    }
  });

  it('solves with decimals and negatives exactly', () => {
    // 2,5 : x = 7,5 : 6 gives x = 2.
    const out = analyze([f(5, 2), null, f(15, 2), f(6)]);
    expect(out.kind === 'solve' && equals(out.value, f(2))).toBe(true);
    // 4 : x = −12 : 27 gives x = −9.
    const neg = analyze([f(4), null, f(-12), f(27)]);
    expect(neg.kind === 'solve' && equals(neg.value, f(-9))).toBe(true);
  });

  it('checks the cross products of four terms', () => {
    expect(analyze([f(3), f(7), f(15), f(35)])).toMatchObject({ kind: 'check', ok: true });
    expect(analyze([f(4), f(10), f(6), f(16)])).toMatchObject({ kind: 'check', ok: false });
  });

  it('asks for more terms or refuses a zero term', () => {
    expect(analyze([f(1), null, null, f(2)]).kind).toBe('need');
    expect(analyze([f(0), f(1), null, f(2)]).kind).toBe('zero');
  });

  it('lists four proportions that all hold when ad = bc', () => {
    const t = [f(3), f(-4), f(15), f(-20)];
    for (const [p, q, r, s] of FORMS) {
      expect(equals(div(t[p], t[q]), div(t[r], t[s]))).toBe(true);
    }
  });
});
