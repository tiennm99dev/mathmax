import { describe, it, expect } from 'vitest';
import { CHALLENGES, listForm, membership, propertyForm, sameSet } from './engine.js';

describe('listForm', () => {
  it('sorts, removes duplicates and separates with semicolons', () => {
    expect(listForm('A', [3, 0, 2, 3])).toBe('A = {0; 2; 3}');
  });
});

describe('propertyForm', () => {
  it('describes consecutive numbers from 0 with a strict upper bound', () => {
    expect(propertyForm('A', [0, 1, 2, 3, 4])).toBe('A = {x ∈ ℕ | x < 5}');
  });

  it('describes consecutive numbers not from 0 with both bounds', () => {
    expect(propertyForm('A', [4, 5, 6, 7])).toBe('A = {x ∈ ℕ | 4 ≤ x ≤ 7}');
  });

  it('describes even and odd numbers', () => {
    expect(propertyForm('A', [0, 2, 4, 6])).toBe('A = {x ∈ ℕ | x là số chẵn, x < 7}');
    expect(propertyForm('A', [1, 3, 5])).toBe('A = {x ∈ ℕ | x là số lẻ, x < 6}');
    expect(propertyForm('A', [6, 8, 10])).toBe('A = {x ∈ ℕ | x là số chẵn, 6 ≤ x ≤ 10}');
  });

  it('describes multiples and equal remainders', () => {
    expect(propertyForm('A', [0, 3, 6, 9])).toBe('A = {x ∈ ℕ | x chia hết cho 3, x < 10}');
    expect(propertyForm('A', [1, 5, 9, 13])).toBe('A = {x ∈ ℕ | x chia cho 4 dư 1, x < 14}');
    expect(propertyForm('A', [5, 9, 13])).toBe('A = {x ∈ ℕ | x chia cho 4 dư 1, 5 ≤ x ≤ 13}');
  });

  it('every described set is exactly the set of naturals with that property', () => {
    // Re-derive the set from the rule for all three-element patterns in 0..15.
    for (let lo = 0; lo <= 15; lo++) {
      for (let d = 1; lo + 2 * d <= 15; d++) {
        const s = [lo, lo + d, lo + 2 * d];
        const text = propertyForm('A', s);
        expect(text).not.toBeNull();
        const hi = lo + 2 * d;
        const from = /x < (\d+)/.test(/** @type {string} */ (text)) ? 0 : lo;
        const rebuilt = [];
        for (let x = from; x <= hi; x++) if (d === 1 || x % d === lo % d) rebuilt.push(x);
        expect(rebuilt).toEqual(s);
      }
    }
  });

  it('returns null for irregular sets, single elements and two spaced numbers', () => {
    expect(propertyForm('A', [1, 2, 5])).toBeNull();
    expect(propertyForm('A', [7])).toBeNull();
    expect(propertyForm('A', [])).toBeNull();
    expect(propertyForm('A', [2, 9])).toBeNull();
  });
});

describe('membership and challenges', () => {
  it('writes ∈ and ∉', () => {
    expect(membership(3, 'A', [1, 3])).toBe('3 ∈ A');
    expect(membership(4, 'A', [1, 3])).toBe('4 ∉ A');
  });

  it('every challenge target is reachable from the tray 0..15', () => {
    for (const c of CHALLENGES) {
      expect(c.target.every((n) => n >= 0 && n <= 15)).toBe(true);
    }
    expect(sameSet([5, 0, 15, 10], CHALLENGES[3].target)).toBe(true);
    expect(sameSet([0, 5], CHALLENGES[3].target)).toBe(false);
  });
});
