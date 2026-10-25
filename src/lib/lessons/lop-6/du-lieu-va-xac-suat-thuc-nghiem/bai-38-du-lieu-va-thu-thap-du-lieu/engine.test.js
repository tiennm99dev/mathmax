import { describe, it, expect } from 'vitest';
import { BINS, CARDS } from './engine.js';

describe('class survey cards', () => {
  it('puts every card in a known bin, with unique ids', () => {
    const bins = new Set(BINS.map((b) => b.id));
    for (const c of CARDS) expect(bins.has(c.bin), c.id).toBe(true);
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
  });

  it('uses every bin', () => {
    for (const b of BINS)
      expect(
        CARDS.some((c) => c.bin === b.id),
        b.id,
      ).toBe(true);
  });

  it('marks a number card as reasonable only when it holds a digit', () => {
    for (const c of CARDS.filter((x) => x.bin === 'so-lieu')) expect(c.label).toMatch(/\d/);
    for (const c of CARDS.filter((x) => x.bin === 'khong-so')) expect(c.label).not.toMatch(/\d/);
  });
});
