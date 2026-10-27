import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  END,
  HEIGHTS,
  START,
  WIDTHS,
  classText,
  groupDetail,
  groupIndex,
  groupRows,
  percentText,
  widthNote,
} from './engine.js';

describe('grouping data into classes', () => {
  it('holds 40 heights inside the range', () => {
    expect(HEIGHTS).toHaveLength(40);
    expect(HEIGHTS.every((h) => h >= START && h < END)).toBe(true);
  });

  it('puts a boundary value in the class it opens', () => {
    expect(groupIndex(165, 150, 5)).toBe(3);
    expect(groupIndex(164, 150, 5)).toBe(2);
    expect(classText({ lo: 165, hi: 170 })).toBe('[165; 170)');
  });

  it('builds the grouped table for every width', () => {
    const counts = Object.fromEntries(
      WIDTHS.map((w) => [w, groupRows(HEIGHTS, START, END, w).map((r) => r.m)]),
    );
    expect(counts[5]).toEqual([3, 6, 10, 10, 6, 5]);
    expect(counts[10]).toEqual([9, 20, 11]);
    expect(counts[15]).toEqual([19, 21]);
    for (const w of WIDTHS) {
      const rows = groupRows(HEIGHTS, START, END, w);
      expect(rows.reduce((s, r) => s + r.m, 0)).toBe(40);
      expect(rows.reduce((s, r) => s + r.f, 0)).toBeCloseTo(100, 9);
      expect(rows[0].mid).toBe(START + w / 2);
    }
  });

  it('writes relative frequencies and the width note', () => {
    const rows = groupRows(HEIGHTS, START, END, 5);
    expect(rows.map((r) => percentText(r.f))).toEqual(['7,5', '15', '25', '25', '15', '12,5']);
    expect(percentText(100 / 3)).toBe('≈ 33,3');
    expect(widthNote(rows, 5)).toMatch(
      /^Độ dài nhóm 5 cm: 6 nhóm\. Các nhóm \[160; 165\), \[165; 170\)/,
    );
    expect(widthNote(groupRows(HEIGHTS, START, END, 2), 2)).toMatch(/quá hẹp/);
    expect(widthNote(groupRows(HEIGHTS, START, END, 15), 15)).toMatch(/quá rộng/);
  });
});

describe('class detail', () => {
  it('writes the working for a class in strict TeX', () => {
    const row = groupRows(HEIGHTS, START, END, 5)[0];
    const text = groupDetail(row, 40);
    expect(text).toBe(
      'Nhóm [150; 155) gồm các chiều cao $x$ với $150 \\le x < 155$: tần số $m = 3$; tần số tương đối $f = \\dfrac{3}{40} \\cdot 100\\% = 7{,}5\\%$; giá trị đại diện $\\dfrac{150 + 155}{2} = 152{,}5$.',
    );
    for (const m of text.matchAll(/\$([^$]+)\$/g)) {
      expect(() =>
        katex.renderToString(m[1], { strict: 'error', throwOnError: true }),
      ).not.toThrow();
    }
  });
});
