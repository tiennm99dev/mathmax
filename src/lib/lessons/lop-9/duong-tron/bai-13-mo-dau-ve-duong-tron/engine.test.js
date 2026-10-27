import { describe, it, expect } from 'vitest';
import { inAxis, position, sentence, throughCentre } from './engine.js';

describe('position of a point against a circle', () => {
  it('compares OM with R', () => {
    expect(position(25, 40)).toBe('trong');
    expect(position(40, 40)).toBe('tren');
    expect(position(41, 40)).toBe('ngoai');
    expect(position(0, 10)).toBe('trong');
  });

  it('writes the comparison with the decimal comma', () => {
    expect(sentence(32, 40, 'none')).toBe(
      'OM = 3,2 cm < R = 4 cm: điểm M nằm bên trong đường tròn (O; 4 cm).',
    );
    expect(sentence(45, 45, 'centre')).toContain('M′ cũng nằm trên đường tròn');
    expect(sentence(50, 30, 'axis')).toContain('d là đường trung trực của MM′');
  });
});

describe('symmetric images keep the distance to the centre', () => {
  it('turns a direction half a turn through the centre', () => {
    expect(throughCentre(30)).toBe(210);
    expect(throughCentre(270)).toBe(90);
  });

  it('reflects a direction in an axis through the centre', () => {
    expect(inAxis(30, 0)).toBe(330);
    expect(inAxis(30, 90)).toBe(150);
    expect(inAxis(45, 45)).toBe(45);
    // reflecting twice gives the point back
    expect(inAxis(inAxis(123, 70), 70)).toBe(123);
  });
});
