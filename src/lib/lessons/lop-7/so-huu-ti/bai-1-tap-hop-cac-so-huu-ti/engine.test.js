import { describe, it, expect } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import {
  MAX,
  MIN,
  PARTS,
  TARGETS,
  ascending,
  isOn,
  markerFraction,
  partsNeeded,
  tickLabel,
  zoomStart,
} from './engine.js';

describe('number line placement', () => {
  it('every target fits on the line and on some allowed division', () => {
    for (const t of TARGETS) {
      const v = t.f.n / t.f.d;
      expect(v).toBeGreaterThanOrEqual(MIN);
      expect(v).toBeLessThanOrEqual(MAX);
      expect(PARTS.some((n) => n % partsNeeded(t) === 0)).toBe(true);
    }
  });

  it('decimal targets are finite decimals with tenths or hundredths', () => {
    for (const t of TARGETS.filter((x) => x.form === 'dec')) {
      expect(100 % partsNeeded(t)).toBe(0);
    }
  });

  it('finds the marker on a target only on an exact tick', () => {
    const t = { f: fraction(-5, 4), form: /** @type {const} */ ('frac') };
    expect(isOn(t, -1.25, 4)).toBe(true);
    expect(isOn(t, -1.25, 8)).toBe(true);
    expect(isOn(t, -1.2, 5)).toBe(false);
    expect(markerFraction(-10 / 8, 8)).toEqual({ n: -10, d: 8 });
  });

  it('labels ticks as integers or k/n', () => {
    expect(tickLabel(-2, 4)).toBe('−2');
    expect(tickLabel(-5 / 4, 4)).toBe('−5/4');
    expect(tickLabel(2 / 3, 3)).toBe('2/3');
    expect(tickLabel(0, 3)).toBe('0');
  });

  it('zooms into the unit segment that holds the marker', () => {
    expect(zoomStart(-1.25)).toBe(-2);
    expect(zoomStart(2 / 3)).toBe(0);
    expect(zoomStart(3)).toBe(2);
    expect(zoomStart(-3)).toBe(-3);
    expect(zoomStart(1)).toBe(1);
  });

  it('sorts written numbers by value', () => {
    expect(ascending(TARGETS.slice(0, 3)).map((t) => t.f)).toEqual([
      { n: -5, d: 4 },
      { n: -6, d: 10 },
      { n: 2, d: 3 },
    ]);
  });
});
