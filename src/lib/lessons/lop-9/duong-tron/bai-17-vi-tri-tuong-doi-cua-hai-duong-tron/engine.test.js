import { describe, it, expect } from 'vitest';
import { COMMON, chordFoot, relation, sentence } from './engine.js';

describe('two circles (O; R) and (O′; r)', () => {
  it('classifies by comparing d with R + r and R − r', () => {
    expect(relation(50, 40, 30)).toBe('cat');
    expect(relation(70, 40, 30)).toBe('tiep-xuc-ngoai');
    expect(relation(71, 40, 30)).toBe('ngoai-nhau');
    expect(relation(10, 40, 30)).toBe('tiep-xuc-trong');
    expect(relation(11, 40, 30)).toBe('cat');
    expect(relation(5, 40, 30)).toBe('dung-nhau');
    expect(relation(0, 40, 30)).toBe('dong-tam');
  });

  it('counts the common points', () => {
    expect(COMMON[relation(50, 40, 30)]).toBe(2);
    expect(COMMON[relation(70, 40, 30)]).toBe(1);
    expect(COMMON[relation(10, 40, 30)]).toBe(1);
    expect(COMMON[relation(80, 40, 30)]).toBe(0);
    expect(COMMON[relation(5, 40, 30)]).toBe(0);
  });

  it('places the common chord on the line of centres', () => {
    // (O; 5) and (O′; 5) with OO′ = 8: the chord is 2 · 3 = 6 at 4 from O
    const f = chordFoot(8, 5, 5);
    expect(f?.a).toBeCloseTo(4, 12);
    expect(f?.h).toBeCloseTo(3, 12);
    // (O; 15) and (O′; 13) with OO′ = 14: foot 9 from O, half chord 12
    const g = chordFoot(14, 15, 13);
    expect(g?.a).toBeCloseTo(9, 12);
    expect(g?.h).toBeCloseTo(12, 12);
    expect(chordFoot(7, 4, 3)?.h).toBeCloseTo(0, 6);
    expect(chordFoot(8, 4, 3)).toBeNull();
  });

  it('writes the comparison in the live sentence', () => {
    expect(sentence(50, 40, 30)).toContain('R − r = 1 < d = 5 < R + r = 7');
    expect(sentence(70, 40, 30)).toContain('tiếp xúc ngoài');
    expect(sentence(10, 40, 30)).toContain('tiếp xúc trong');
    expect(sentence(75, 40, 30)).toContain('d = 7,5 > R + r = 7');
    expect(sentence(5, 40, 30)).toContain('đựng');
    expect(sentence(0, 40, 30)).toContain('đồng tâm');
  });
});
