import { describe, it, expect } from 'vitest';
import {
  MAX_ICONS,
  SCALES,
  TREES,
  clampIcons,
  iconParts,
  iconText,
  iconsFor,
  rowStatus,
  stepFor,
} from './engine.js';

describe('pictograph rows', () => {
  it('rounds symbol counts to halves within the row', () => {
    expect(clampIcons(2.7)).toBe(2.5);
    expect(clampIcons(-1)).toBe(0);
    expect(clampIcons(20)).toBe(MAX_ICONS);
  });

  it('draws whole symbols and a final half', () => {
    expect(iconParts(2.5)).toEqual([1, 1, 0.5]);
    expect(iconParts(3)).toEqual([1, 1, 1]);
    expect(iconParts(0)).toEqual([]);
  });

  it('says symbol counts in words without a decimal point', () => {
    expect(iconText(0.5)).toBe('nửa biểu tượng');
    expect(iconText(1.5)).toBe('1 biểu tượng và nửa biểu tượng');
    expect(iconText(4)).toBe('4 biểu tượng');
  });

  it('compares a row with its table value', () => {
    expect(rowStatus(5, 5, 25)).toEqual({ value: 25, ok: true, text: 'Đúng' });
    expect(rowStatus(2, 10, 25).text).toBe('Thiếu 5 cây (nửa biểu tượng)');
    expect(rowStatus(4, 10, 25).text).toBe('Thừa 15 cây (1 biểu tượng và nửa biểu tượng)');
  });

  it('fits every table value at every scale', () => {
    for (const s of SCALES) {
      for (const t of TREES) {
        const icons = iconsFor(t.count, s);
        expect(icons, `${t.label} at ${s}`).not.toBeNull();
        expect(/** @type {number} */ (icons)).toBeLessThanOrEqual(MAX_ICONS);
      }
    }
    expect(iconsFor(12, 5)).toBeNull();
  });
});

describe('symbol steps', () => {
  it('allows half symbols only when they stand for whole objects', () => {
    expect(stepFor(10)).toBe(0.5);
    expect(stepFor(5)).toBe(1);
    expect(clampIcons(2.5, 1)).toBe(2);
    expect(clampIcons(2.999999999, 1)).toBe(3);
    expect(clampIcons(2.5, 0.5)).toBe(2.5);
  });
});
