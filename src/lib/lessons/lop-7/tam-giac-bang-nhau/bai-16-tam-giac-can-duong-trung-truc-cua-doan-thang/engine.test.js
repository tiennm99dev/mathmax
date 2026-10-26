import { describe, it, expect } from 'vitest';
import { APEX, BOX, STEP, placeM, readings } from './engine.js';

describe('perpendicular-bisector board', () => {
  it('keeps M on d in the constrained mode and snaps to the equilateral apex', () => {
    expect(placeM({ x: 2.3, y: 3.1 }, 'tren-d')).toEqual({ x: 0, y: 3 });
    expect(placeM({ x: -1, y: 5.1 }, 'tren-d')).toEqual({ x: 0, y: APEX });
    expect(placeM({ x: 0, y: 5.6 }, 'tren-d')).toEqual({ x: 0, y: 5.5 });
    expect(placeM({ x: 0, y: 99 }, 'tren-d').y).toBe(BOX.maxY);
  });

  it('reaches the apex by keyboard steps from both sides', () => {
    const up = placeM({ x: 0, y: 4.5 + STEP }, 'tren-d');
    expect(up.y).toBe(APEX);
    const down = placeM({ x: 0, y: 5.5 - STEP }, 'tren-d');
    expect(down.y).toBe(APEX);
    const past = placeM({ x: 0, y: APEX + STEP }, 'tren-d');
    expect(past.y).toBe(5.5);
  });

  it('snaps a free M to the half-unit grid inside the box', () => {
    expect(placeM({ x: 1.26, y: -0.7 }, 'tu-do')).toEqual({ x: 1.5, y: -0.5 });
    expect(placeM({ x: -40, y: -40 }, 'tu-do')).toEqual({ x: BOX.minX, y: BOX.minY });
  });

  it('finds MA = MB exactly when M is on d', () => {
    for (let x = BOX.minX; x <= BOX.maxX; x += STEP) {
      for (let y = BOX.minY; y <= BOX.maxY; y += STEP) {
        const r = readings({ x, y });
        expect(r.equalMAMB).toBe(x === 0);
        expect(r.onD).toBe(x === 0);
        if (r.triangle) expect(r.atM + r.atA + r.atB).toBeCloseTo(180);
      }
    }
  });

  it('gives equal base angles on d and 60° at the apex', () => {
    const r = readings({ x: 0, y: 4 });
    expect(r.MA).toBeCloseTo(5);
    expect(r.apexes).toEqual(['M']);
    expect(r.atA).toBeCloseTo(r.atB);
    const e = readings({ x: 0, y: APEX });
    expect(e.equilateral).toBe(true);
    expect(e.apexes).toEqual(['M', 'A', 'B']);
    expect(e.atA).toBeCloseTo(60);
    expect(e.atM).toBeCloseTo(60);
  });

  it('notices a triangle isosceles at A off the bisector', () => {
    const r = readings({ x: -3, y: 6 });
    expect(r.apexes).toEqual(['A']);
    expect(r.atM).toBeCloseTo(r.atB);
    expect(r.atA).toBeCloseTo(90);
  });

  it('has no triangle when M lies on line AB', () => {
    const r = readings({ x: 0, y: 0 });
    expect(r.triangle).toBe(false);
    expect(r.MA).toBe(3);
    expect(r.apexes).toEqual([]);
  });
});
