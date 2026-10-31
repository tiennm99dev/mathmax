import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  GENOTYPES,
  dominantCount,
  normal,
  outcomeCounts,
  punnett,
  selfedGeneration,
  showsDominant,
  tally,
  toss,
} from './engine.js';

describe('genotypes', () => {
  it('writes the dominant gene first', () => {
    expect(normal('aA')).toBe('Aa');
    expect(normal('AA')).toBe('AA');
    expect(normal('aa')).toBe('aa');
  });

  it('shows the dominant trait whenever a gene A is present', () => {
    expect(GENOTYPES.filter(showsDominant)).toEqual(['AA', 'Aa']);
  });
});

describe('crosses', () => {
  it('gives the four outcomes of Aa × Aa, aA included', () => {
    expect(punnett('Aa', 'Aa')).toEqual([
      ['AA', 'Aa'],
      ['aA', 'aa'],
    ]);
    expect(outcomeCounts('Aa', 'Aa')).toEqual({ AA: 1, Aa: 2, aa: 1 });
    expect(dominantCount('Aa', 'Aa')).toBe(3);
  });

  it('matches the other crosses of the lesson', () => {
    expect(outcomeCounts('AA', 'aa')).toEqual({ AA: 0, Aa: 4, aa: 0 });
    expect(outcomeCounts('Aa', 'aa')).toEqual({ AA: 0, Aa: 2, aa: 2 });
    expect(dominantCount('AA', 'Aa')).toBe(4);
    expect(dominantCount('aa', 'aa')).toBe(0);
  });

  it('always has four outcomes', () => {
    const bad = [];
    for (const f of GENOTYPES)
      for (const m of GENOTYPES) {
        const c = outcomeCounts(f, m);
        if (c.AA + c.Aa + c.aa !== 4) bad.push(`${f}×${m}`);
      }
    expect(bad).toEqual([]);
  });
});

describe('coin tosses', () => {
  it('only gives pairs the parents can pass on', () => {
    const rand = rng(7);
    const pairs = Array.from({ length: 200 }, () => toss(rand, 'AA', 'aa'));
    expect(new Set(pairs)).toEqual(new Set(['Aa']));
  });

  it('comes close to 1 : 2 : 1 over many tosses', () => {
    const rand = rng(2024);
    const c = tally(Array.from({ length: 4000 }, () => toss(rand, 'Aa', 'Aa')));
    expect(c.AA / 4000).toBeGreaterThan(0.2);
    expect(c.AA / 4000).toBeLessThan(0.3);
    expect(c.Aa / 4000).toBeGreaterThan(0.45);
    expect(c.Aa / 4000).toBeLessThan(0.55);
  });
});

describe('self-pollinated generations', () => {
  it('starts with F1 all Aa and gives 1 : 2 : 1 in F2', () => {
    expect(selfedGeneration(1)).toEqual({ den: 2, counts: { AA: 0, Aa: 2, aa: 0 } });
    expect(selfedGeneration(2)).toEqual({ den: 4, counts: { AA: 1, Aa: 2, aa: 1 } });
    expect(selfedGeneration(3)).toEqual({ den: 8, counts: { AA: 3, Aa: 2, aa: 3 } });
  });

  it('halves the share of Aa each generation and keeps the total', () => {
    const bad = [];
    for (let k = 1; k <= 10; k++) {
      const { den, counts } = selfedGeneration(k);
      if (counts.AA + counts.Aa + counts.aa !== den) bad.push(`total F${k}`);
      if (counts.Aa / den !== 1 / 2 ** (k - 1)) bad.push(`Aa F${k}`);
    }
    expect(bad).toEqual([]);
  });

  it('rejects a generation before F1', () => {
    expect(() => selfedGeneration(0)).toThrow(RangeError);
  });
});
