import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { SUB_FACTS, crossesTen } from '../_shared/facts.js';
import {
  COLUMNS,
  additionOf,
  family,
  keyOf,
  nextClosed,
  openFact,
  partner,
  question,
} from './engine.js';

describe('the subtraction table across ten', () => {
  it('lays out the 36 facts in columns 11 to 18', () => {
    expect(COLUMNS.map((col) => col.facts.length)).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    expect(COLUMNS[0].facts.map((f) => f.b)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(COLUMNS[7].facts).toEqual([{ c: 18, b: 9 }]);
  });

  it('ties every fact to an addition of the addition table', () => {
    const keys = new Set(SUB_FACTS.map(keyOf));
    const bad = SUB_FACTS.filter((f) => {
      const d = f.c - f.b;
      return !crossesTen(f.b, d) || !keys.has(keyOf(partner(f))) || partner(partner(f)).b !== f.b;
    });
    expect(bad).toEqual([]);
    expect(additionOf({ c: 12, b: 3 })).toBe('9 + 3 = 12');
    expect(family({ c: 12, b: 3 })).toEqual([
      '3 + 9 = 12',
      '9 + 3 = 12',
      '12 − 3 = 9',
      '12 − 9 = 3',
    ]);
    expect(family({ c: 14, b: 7 })).toEqual(['7 + 7 = 14', '14 − 7 = 7']);
  });

  it('asks for the difference with the right option and no giveaway hint', () => {
    const rand = rng(5);
    const bad = [];
    for (const f of SUB_FACTS) {
      const q = question(f, rand);
      if (q.options[q.answer] !== String(f.c - f.b)) bad.push(f);
      if (new Set(q.options).size !== q.options.length) bad.push(['options', f]);
      if (q.hint.includes(`= ${f.c - f.b}`)) bad.push(['hint', f]);
    }
    expect(bad).toEqual([]);
    expect(question({ c: 13, b: 5 }, rng(1)).reason).toBe(
      'Vì 5 + 8 = 13 nên 13 − 5 = 8. Em cũng biết luôn 13 − 8 = 5.',
    );
  });

  it('opens a fact with its partner and walks to the next closed one', () => {
    let open = openFact(new Set(), { c: 12, b: 3 });
    expect([...open]).toEqual(['12-3', '12-9']);
    expect(nextClosed(open, { c: 12, b: 3 })).toEqual({ c: 12, b: 4 });
    expect(nextClosed(open)).toEqual({ c: 11, b: 2 });
    for (const f of SUB_FACTS) open = openFact(open, f);
    expect(open.size).toBe(36);
    expect(nextClosed(open)).toBeNull();
  });
});
