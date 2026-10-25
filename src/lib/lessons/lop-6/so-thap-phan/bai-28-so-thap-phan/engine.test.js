import { describe, it, expect } from 'vitest';
import {
  TARGETS,
  compareText,
  fractionText,
  judge,
  overview,
  places,
  snapTo,
  text,
  ticks,
  zoomIn,
  zoomOut,
} from './engine.js';

describe('zoomIn and zoomOut', () => {
  it('cuts the segment that holds the marker into ten', () => {
    const v1 = zoomIn(overview(), 1470);
    expect(v1).toEqual({ level: 1, start: 1000, end: 2000 });
    const v2 = zoomIn(v1, 1470);
    expect(v2).toEqual({ level: 2, start: 1400, end: 1500 });
    const v3 = zoomIn(v2, 1470);
    expect(v3).toEqual({ level: 3, start: 1470, end: 1480 });
    expect(zoomIn(v3, 1470)).toBe(v3);
  });

  it('zooms into the segment left of zero for negative numbers', () => {
    const v1 = zoomIn(overview(), -1470);
    expect(v1).toEqual({ level: 1, start: -2000, end: -1000 });
    expect(zoomIn(v1, -1470)).toEqual({ level: 2, start: -1500, end: -1400 });
  });

  it('keeps a marker on the right end inside the new view', () => {
    expect(zoomIn(overview(), 3000)).toEqual({ level: 1, start: 2000, end: 3000 });
    expect(zoomIn({ level: 1, start: 1000, end: 2000 }, 2000)).toEqual({
      level: 2,
      start: 1900,
      end: 2000,
    });
  });

  it('undoes a zoom', () => {
    const v3 = zoomIn(zoomIn(zoomIn(overview(), -2705), -2705), -2705);
    expect(v3).toEqual({ level: 3, start: -2710, end: -2700 });
    expect(zoomOut(v3)).toEqual({ level: 2, start: -2800, end: -2700 });
    expect(zoomOut(zoomOut(v3))).toEqual({ level: 1, start: -3000, end: -2000 });
    expect(zoomOut(zoomOut(zoomOut(v3)))).toEqual(overview());
  });

  it('can reach every challenge target exactly', () => {
    for (const t of TARGETS) {
      let view = overview();
      for (let i = 0; i < 3; i++) view = zoomIn(view, t);
      expect(ticks(view)).toContain(t);
      expect(snapTo(view, t)).toBe(t);
    }
  });
});

describe('ticks and snapTo', () => {
  it('lists eleven ticks once zoomed in', () => {
    expect(ticks({ level: 2, start: 1400, end: 1500 })).toEqual([
      1400, 1410, 1420, 1430, 1440, 1450, 1460, 1470, 1480, 1490, 1500,
    ]);
    expect(ticks(overview())).toHaveLength(7);
  });

  it('snaps to the nearest tick inside the view', () => {
    const view = { level: 1, start: 1000, end: 2000 };
    expect(snapTo(view, 1449)).toBe(1400);
    expect(snapTo(view, 1451)).toBe(1500);
    expect(snapTo(view, 2600)).toBe(2000);
  });
});

describe('reading a decimal', () => {
  it('writes the decimal comma and a real minus sign', () => {
    expect(text(1470)).toBe('1,47');
    expect(text(-83)).toBe('−0,083');
    expect(text(-2000)).toBe('−2');
  });

  it('splits the digits by place', () => {
    expect(places(-2705)).toEqual({
      negative: true,
      int: 2,
      tenths: 7,
      hundredths: 0,
      thousandths: 5,
    });
  });

  it('gives the decimal fraction with the smallest power of ten', () => {
    expect(fractionText(1470)).toBe('147/100');
    expect(fractionText(-83)).toBe('−83/1000');
    expect(fractionText(-600)).toBe('−6/10');
    expect(fractionText(2000)).toBe('2');
  });

  it('compares like the book: negative numbers below zero', () => {
    expect(compareText(-1470, -1400)).toBe('−1,47 < −1,4');
    expect(compareText(83, -40)).toBe('0,083 > −0,04');
    expect(compareText(500, 500)).toBe('0,5 = 0,5');
  });

  it('points the learner the right way', () => {
    expect(judge(1400, 1470).text).toContain('sang phải');
    expect(judge(-1400, -1470).text).toContain('sang trái');
    expect(judge(-1470, -1470).ok).toBe(true);
  });
});
