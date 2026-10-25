import { describe, it, expect } from 'vitest';
import { addModel, subModel } from './engine.js';

describe('addModel', () => {
  it('hops forward b steps', () => {
    const m = addModel(7, 5);
    expect(m.result).toBe(12);
    expect(m.hops).toEqual([expect.objectContaining({ from: 7, to: 12, label: '+5' })]);
    expect(m.equation).toBe('7 + 5 = 12');
  });

  it('a + b and b + a land on the same point', () => {
    for (let a = 0; a <= 20; a++) {
      for (let b = 0; b <= 20; b++) expect(addModel(a, b).result).toBe(addModel(b, a).result);
    }
  });

  it('adding 0 draws no hop', () => {
    expect(addModel(4, 0).hops).toEqual([]);
  });
});

describe('subModel', () => {
  it('hops back when a ≥ b and checks with addition', () => {
    const m = subModel(12, 5);
    expect(m.ok).toBe(true);
    expect(m.result).toBe(7);
    expect(m.hops[0]).toEqual(expect.objectContaining({ from: 12, to: 7 }));
    expect(m.message).toContain('7 + 5 = 12');
  });

  it('a − a = 0', () => {
    expect(subModel(9, 9).result).toBe(0);
  });

  it('cannot subtract a larger number in ℕ; the hop stops at 0', () => {
    const m = subModel(4, 9);
    expect(m.ok).toBe(false);
    expect(m.result).toBeNull();
    expect(m.hops[0]).toEqual(expect.objectContaining({ from: 4, to: 0 }));
    expect(m.message).toContain('thiếu 5 bước');
  });

  it('0 − b with b > 0 has no hop to draw', () => {
    expect(subModel(0, 3).hops).toEqual([]);
  });
});
