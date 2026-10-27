import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  DATASETS,
  detailText,
  equalsTex,
  relativeRows,
  roundedText,
  scaleFactor,
  scaleText,
} from './engine.js';

describe('relative frequencies', () => {
  it('turns frequencies into percentages and pie angles', () => {
    const rows = relativeRows(DATASETS[0].counts);
    expect(rows.map((r) => roundedText(r.f))).toEqual(['≈ 26,7', '40', '20', '≈ 13,3']);
    expect(rows.map((r) => r.angle)).toEqual([96, 144, 72, 48]);
    const travel = relativeRows(DATASETS[1].counts);
    expect(travel.map((r) => r.f)).toEqual([15, 35, 20, 30]);
    expect(travel.reduce((s, r) => s + r.angle, 0)).toBe(360);
  });

  it('handles an empty sample', () => {
    expect(relativeRows([0, 0])).toEqual([
      { m: 0, f: 0, angle: 0 },
      { m: 0, f: 0, angle: 0 },
    ]);
    expect(detailText('1', 0, 0)).toMatch(/^Cỡ mẫu bằng/);
  });

  it('writes the working with = or ≈', () => {
    expect(equalsTex(40)).toBe('= 40');
    expect(equalsTex(80 / 3)).toBe('\\approx 26{,}7');
    const text = detailText('0', 8, 30);
    expect(text).toBe(
      'Giá trị "0": $f = \\dfrac{8}{30} \\cdot 100\\% \\approx 26{,}7\\%$; góc ở tâm của hình quạt: $360^\\circ \\cdot \\dfrac{8}{30} = 96^\\circ$.',
    );
    for (const m of text.matchAll(/\$([^$]+)\$/g)) {
      expect(() =>
        katex.renderToString(m[1], { strict: 'error', throwOnError: true }),
      ).not.toThrow();
    }
  });

  it('spots a sample scaled by a common factor', () => {
    expect(scaleFactor([16, 24, 12, 8], [8, 12, 6, 4])).toBe(2);
    expect(scaleFactor([8, 12, 6, 4], [8, 12, 6, 4])).toBeNull();
    expect(scaleFactor([9, 12, 6, 4], [8, 12, 6, 4])).toBeNull();
    expect(scaleFactor([4, 6, 3, 2], [8, 12, 6, 4])).toBe(0.5);
  });

  it('explains a scaling with the factor written the Vietnamese way', () => {
    expect(scaleText(2, 30, 60)).toContain('gấp 2 lần');
    const half = scaleText(0.5, 30, 15);
    expect(half).toContain('$0{,}5$');
    expect(half).not.toContain('0.5');
    katex.renderToString('0{,}5', { strict: 'error' });
  });
});
