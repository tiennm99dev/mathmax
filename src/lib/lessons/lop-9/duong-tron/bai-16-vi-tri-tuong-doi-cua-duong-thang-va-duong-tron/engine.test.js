import { describe, it, expect } from 'vitest';
import {
  COMMON,
  halfChord,
  lineSentence,
  relation,
  tangentSentence,
  tangentText,
  tangents,
} from './engine.js';

describe('a line and a circle', () => {
  it('compares the distance d with the radius', () => {
    expect(relation(20, 30)).toBe('cat');
    expect(relation(30, 30)).toBe('tiep-xuc');
    expect(relation(31, 30)).toBe('khong');
    expect(COMMON[relation(0, 30)]).toBe(2);
  });

  it('cuts a chord of length 2√(R² − d²)', () => {
    expect(halfChord(3, 5)).toBeCloseTo(4, 12);
    expect(halfChord(5, 5)).toBe(0);
    expect(lineSentence(30, 50)).toContain('Dây AB = 2√(R² − d²) ≈ 8,00 cm');
    expect(lineSentence(30, 30)).toContain('tiếp tuyến');
    expect(lineSentence(42, 30)).toContain('không giao nhau');
  });
});

describe('two tangents from an outside point', () => {
  it('gives equal tangent lengths from Pythagoras', () => {
    expect(tangents(5, 3).length).toBeCloseTo(4, 12);
    expect(tangents(13, 5).length).toBeCloseTo(12, 12);
  });

  it('makes the angles AMB and AOB supplementary', () => {
    const t = tangents(6, 3);
    expect(t.amb).toBeCloseTo(60, 9);
    expect(t.aob).toBeCloseTo(120, 9);
    expect(t.amb + t.aob).toBeCloseTo(180, 12);
  });

  it('writes the tangent length exactly when it is a whole number of tenths', () => {
    expect(tangentText(50, 30)).toBe('√(5² − 3²) = 4');
    expect(tangentText(46, 30)).toBe('√(4,6² − 3²) ≈ 3,49');
    expect(tangentSentence(60, 30)).toContain('Góc AMB ≈ 60° và góc AOB ≈ 120°');
  });
});
