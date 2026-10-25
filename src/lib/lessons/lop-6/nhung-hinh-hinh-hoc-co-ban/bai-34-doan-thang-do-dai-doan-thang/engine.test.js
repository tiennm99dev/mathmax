import { describe, it, expect } from 'vitest';
import { cmText, measure, sumEqualsAB } from './engine.js';

describe('segment measure', () => {
  it('adds up when M lies between A and B', () => {
    const r = measure(10, 66, { x: 34, y: 0 });
    expect(r.ab).toBe(56);
    expect(r.am).toBe(24);
    expect(r.mb).toBe(32);
    expect(r.between).toBe(true);
    expect(sumEqualsAB(r)).toBe(true);
  });

  it('works with B to the left of A', () => {
    const r = measure(66, 10, { x: 20, y: 0 });
    expect(r.ab).toBe(56);
    expect(r.between).toBe(true);
    expect(sumEqualsAB(r)).toBe(true);
  });

  it('gives a larger sum on the line outside the segment', () => {
    const r = measure(10, 50, { x: 70, y: 0 });
    expect(r.onLine).toBe(true);
    expect(r.between).toBe(false);
    expect(r.sum).toBe(r.ab + 2 * 20);
    expect(sumEqualsAB(r)).toBe(false);
  });

  it('gives a larger sum off the line', () => {
    const r = measure(0, 60, { x: 30, y: 40 });
    expect(r.am).toBe(50);
    expect(r.mb).toBe(50);
    expect(r.sum).toBeGreaterThan(r.ab);
    expect(sumEqualsAB(r)).toBe(false);
  });

  it('flags an endpoint', () => {
    const r = measure(10, 50, { x: 50, y: 0 });
    expect(r.atEnd).toBe(true);
    expect(r.between).toBe(false);
    expect(sumEqualsAB(r)).toBe(true);
  });

  it('writes centimetres with a decimal comma', () => {
    expect(cmText(56)).toBe('5,6');
    expect(cmText(60)).toBe('6');
    expect(cmText(4)).toBe('0,4');
    expect(cmText(31.4)).toBe('3,1');
    expect(cmText(39.96)).toBe('4');
  });
});
