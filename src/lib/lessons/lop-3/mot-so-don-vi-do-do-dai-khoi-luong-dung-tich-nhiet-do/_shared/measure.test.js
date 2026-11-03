import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import {
  cylinderLabel,
  degText,
  dialAngle,
  dialLabel,
  dialPoint,
  gramText,
  mlText,
  mmText,
  rulerLabel,
  sortedOptions,
  thermometerLabel,
} from './measure.js';

describe('measures', () => {
  it('writes measures the way the book does', () => {
    expect(mmText(25)).toBe('25 mm');
    expect(gramText(1000)).toBe('1 000 g');
    expect(mlText(350)).toBe('350 ml');
    expect(degText(37)).toBe('37 °C');
  });

  it('sorts options and keeps the right one', () => {
    const { options, answer } = sortedOptions(mmText, 30, [3, 300, 3, 30, -1]);
    expect(options).toEqual(['3 mm', '30 mm', '300 mm']);
    expect(options[answer]).toBe('30 mm');
  });

  it('turns the needle from one end of the dial to the other', () => {
    expect(dialAngle(0)).toBe(-150);
    expect(dialAngle(500)).toBe(0);
    expect(dialAngle(1000)).toBe(150);
    const top = dialPoint(500, 50, { x: 100, y: 100 });
    expect(top.x).toBeCloseTo(100);
    expect(top.y).toBeCloseTo(50);
  });

  it('names a reading only once the question has ended', () => {
    const cases = [
      [rulerLabel, 25, '25 mm'],
      [dialLabel, 350, '350 g'],
      [cylinderLabel, 450, '450 ml'],
      [thermometerLabel, 37, '37 độ C'],
    ];
    const bad = cases.filter(
      ([label, n, text]) =>
        /** @type {(n: number, s?: boolean) => string} */ (label)(
          /** @type {number} */ (n),
        ).includes(/** @type {string} */ (text)) ||
        !(
          /** @type {(n: number, s?: boolean) => string} */ (label)(
            /** @type {number} */ (n),
            true,
          ).includes(/** @type {string} */ (text))
        ),
    );
    expect(bad).toEqual([]);
  });

  it('describes where the marks are', () => {
    expect(rulerLabel(7)).toContain('qua 7 vạch nhỏ');
    expect(rulerLabel(20)).toContain('đến vạch số 2.');
    expect(rulerLabel(25)).toContain('vạch số 2 rồi thêm 5 vạch nhỏ');
    expect(dialLabel(300)).toContain('đúng vạch có số 300');
    expect(dialLabel(350)).toContain('ngay sau vạch có số 300');
    expect(cylinderLabel(0)).toContain('chưa có nước');
    expect(thermometerLabel(30)).toContain('đúng vạch có số 30');
    expect(thermometerLabel(37)).toContain('cao hơn vạch có số 30 là 7 vạch');
    expect(rulerLabel(0, true)).toContain('chưa dài chút nào');
    expect(dialLabel(1000)).toContain(`vạch có số ${fmt(1000)}`);
    expect(cylinderLabel(1000)).toContain(`vạch có số ${fmt(1000)}`);
  });
});
