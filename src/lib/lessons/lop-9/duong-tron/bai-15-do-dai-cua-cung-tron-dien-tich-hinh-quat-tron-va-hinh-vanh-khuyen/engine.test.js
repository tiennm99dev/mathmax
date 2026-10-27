import { describe, it, expect } from 'vitest';
import { piText } from '../_shared/pi-text.js';
import { arcLength, ringArea, ringLine, sectorArea, sectorLines } from './engine.js';

describe('arc length and sector area', () => {
  it('takes n/360 of the circumference and of the disc', () => {
    expect(arcLength(6, 60)).toBeCloseTo(2 * Math.PI, 12);
    expect(arcLength(5, 360)).toBeCloseTo(2 * Math.PI * 5, 12);
    expect(sectorArea(10, 72)).toBeCloseTo(20 * Math.PI, 12);
    expect(sectorArea(3, 360)).toBeCloseTo(9 * Math.PI, 12);
  });

  it('gives the sector area as half the arc length times the radius', () => {
    for (const [r, n] of [
      [3, 40],
      [4.5, 135],
      [2, 300],
    ]) {
      expect(sectorArea(r, n)).toBeCloseTo((arcLength(r, n) * r) / 2, 12);
    }
  });

  it('subtracts the inner disc from the outer one for an annulus', () => {
    expect(ringArea(5, 3)).toBeCloseTo(16 * Math.PI, 12);
  });
});

describe('working lines', () => {
  it('writes multiples of π the way the book does', () => {
    expect(piText(2)).toBe('2π');
    expect(piText(1)).toBe('π');
    expect(piText(0.5)).toBe('0,5π');
    expect(piText(7 / 3)).toBe('7π/3');
    expect(piText(1 / 3)).toBe('π/3');
  });

  it('works a 60° sector of radius 6 cm', () => {
    const s = sectorLines(12, 60);
    expect(s.part).toBe('1/6');
    expect(s.length).toBe('l = πRn/180 = π·6·60/180 = 2π ≈ 6,28 cm');
    expect(s.area).toBe('S = πR²n/360 = π·6²·60/360 = 6π ≈ 18,85 cm²');
    expect(s.circumference).toBe('C = 2πR = 2π·6 = 12π ≈ 37,70 cm');
  });

  it('works an annulus of radii 5 cm and 3 cm', () => {
    expect(ringLine(10, 6)).toBe('S = π(R² − r²) = π(5² − 3²) = 16π ≈ 50,27 cm²');
  });
});
