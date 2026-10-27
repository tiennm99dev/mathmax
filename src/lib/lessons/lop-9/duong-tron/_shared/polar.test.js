import { describe, it, expect } from 'vitest';
import { fromSvg, tenths, toSvg, wrapDeg } from './polar.js';

const O = { x: 100, y: 100 };

describe('polar positions around the centre', () => {
  it('draws positive angles above the centre and reads them back', () => {
    const p = toSvg(O, 20, 3, 90);
    expect(p.x).toBeCloseTo(100, 9);
    expect(p.y).toBeCloseTo(40, 9);
    const back = fromSvg(O, 20, toSvg(O, 20, 2.5, 210));
    expect(back.dist).toBeCloseTo(2.5, 9);
    expect(back.deg).toBeCloseTo(210, 9);
  });

  it('wraps directions into whole degrees from 0 to 359', () => {
    expect(wrapDeg(-5)).toBe(355);
    expect(wrapDeg(360)).toBe(0);
    expect(wrapDeg(721.4)).toBe(1);
  });

  it('rounds distances to tenths, clamps them and snaps onto the magnet', () => {
    expect(tenths(3.24, 0, 60)).toBe(32);
    expect(tenths(9, 0, 60)).toBe(60);
    expect(tenths(3.92, 0, 60, 40)).toBe(40);
    expect(tenths(3.8, 0, 60, 40)).toBe(38);
  });
});
