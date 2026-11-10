import { describe, expect, it } from 'vitest';
import {
  angleName,
  clampMeasure,
  clockAngle,
  degreeOptions,
  foldUpper,
  kindOf,
  kindWhy,
  measureAt,
  measureFrom,
  protractorText,
  rayDirection,
  scaleReadings,
} from './angle.js';

describe('angle kinds', () => {
  it('names an angle by comparing it with 90°', () => {
    expect([10, 89, 90, 91, 179, 180].map(kindOf)).toEqual([
      'nhon',
      'nhon',
      'vuong',
      'tu',
      'tu',
      'bet',
    ]);
    expect(kindWhy(56)).toContain('56° bé hơn 90°');
    expect(kindWhy(127)).toContain('góc tù');
  });

  it('writes the book name of an angle', () => {
    expect(angleName('O', 'A', 'B')).toBe('góc đỉnh O; cạnh OA, OB');
  });
});

describe('protractor', () => {
  it('turns a measure into a direction and back on either side', () => {
    const bad = [];
    for (const side of /** @type {const} */ (['phai', 'trai']))
      for (let m = 0; m <= 180; m += 5)
        if (measureFrom(rayDirection(m, side), side) !== m) bad.push([side, m]);
    expect(bad).toEqual([]);
  });

  it('folds pointer directions below the base line to the nearer end', () => {
    expect([120, 200, 300].map(foldUpper)).toEqual([120, 180, 0]);
  });

  it('snaps to 5° and keeps the two sides apart', () => {
    expect([0, 2, 3, 62, 181].map(clampMeasure)).toEqual([5, 5, 5, 60, 180]);
    expect(measureAt(300, 'phai')).toBe(5);
    expect(measureAt(43, 'trai')).toBe(135);
  });

  it('gives both scale numbers and tells which one starts at OA', () => {
    expect(scaleReadings(60, 'phai')).toEqual({ inner: 60, outer: 120 });
    expect(scaleReadings(60, 'trai')).toEqual({ inner: 120, outer: 60 });
    const text = protractorText(35, 'trai', ['O', 'A', 'B']);
    expect(text).toContain('vạch 145 ở vòng số trong và vạch 35 ở vòng số ngoài');
    expect(text).toContain('Vạch 0 của vòng số ngoài nằm trên cạnh OA');
  });
});

describe('degree options', () => {
  it('holds the measure, the wrong-scale reading and distinct options', () => {
    const bad = [];
    for (let m = 5; m <= 180; m += 5) {
      const { options, answer, optionLabels } = degreeOptions(m);
      const values = options.map((o) => Number(o.replace('°', '')));
      const ok =
        options[answer] === `${m}°` &&
        new Set(options).size === 4 &&
        values.every((v) => v > 0 && v <= 180) &&
        (m === 90 || values.includes(180 - m) || m === 180) &&
        optionLabels[answer] === `${m} độ`;
      if (!ok) bad.push(m);
    }
    expect(bad).toEqual([]);
  });
});

describe('clock', () => {
  it('measures the angle between the hands at a whole hour', () => {
    expect([1, 2, 3, 4, 5, 6, 9, 10, 12].map(clockAngle)).toEqual([
      30, 60, 90, 120, 150, 180, 90, 60, 0,
    ]);
  });
});
