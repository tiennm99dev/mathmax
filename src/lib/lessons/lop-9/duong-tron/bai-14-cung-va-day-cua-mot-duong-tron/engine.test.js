import { describe, it, expect } from 'vitest';
import { centralAngle, chord, chordText, minorArc, sentence } from './engine.js';

describe('central angle and arcs', () => {
  it('measures the angle AOB between 0 and 180 degrees', () => {
    expect(centralAngle(30, 100)).toBe(70);
    expect(centralAngle(350, 20)).toBe(30);
    expect(centralAngle(10, 250)).toBe(120);
    expect(centralAngle(0, 180)).toBe(180);
  });

  it('starts the minor arc so that it turns counter-clockwise', () => {
    expect(minorArc(30, 100)).toEqual({ from: 30, sweep: 70 });
    expect(minorArc(100, 30)).toEqual({ from: 30, sweep: 70 });
    expect(minorArc(350, 20)).toEqual({ from: 350, sweep: 30 });
  });

  it('makes the major arc 360 degrees minus the minor arc', () => {
    expect(sentence(4, 75)).toContain('sđ cung lớn AB = 360° − 75° = 285°');
  });
});

describe('chord length', () => {
  it('equals the radius at 60 degrees and the diameter at 180 degrees', () => {
    expect(chord(4, 60)).toBeCloseTo(4, 12);
    expect(chord(4, 90)).toBeCloseTo(4 * Math.SQRT2, 12);
    expect(chord(4, 120)).toBeCloseTo(4 * Math.sqrt(3), 12);
    expect(chord(4, 180)).toBeCloseTo(8, 12);
  });

  it('never exceeds the diameter', () => {
    for (let d = 1; d <= 180; d++) expect(chord(4, d)).toBeLessThanOrEqual(8 + 1e-12);
  });

  it('writes exact values where the book does', () => {
    expect(chordText(4, 60)).toBe('AB = 4 cm');
    expect(chordText(4, 90)).toBe('AB = 4√2 ≈ 5,66 cm');
    expect(chordText(4, 120)).toBe('AB = 4√3 ≈ 6,93 cm');
    expect(chordText(4, 40)).toBe('AB ≈ 2,74 cm');
    expect(sentence(4, 180)).toContain('đường kính');
  });
});
