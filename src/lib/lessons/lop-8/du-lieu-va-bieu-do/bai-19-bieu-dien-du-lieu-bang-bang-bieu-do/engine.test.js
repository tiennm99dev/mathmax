import { describe, it, expect } from 'vitest';
import {
  BAR_TASK,
  CHART_KINDS,
  DATA_SETS,
  PIE_TASK,
  exactPercents,
  iconRow,
  mismatches,
} from './engine.js';

describe('data sets', () => {
  it('give one value per label and exactly one best chart', () => {
    for (const s of DATA_SETS) {
      expect(s.values).toHaveLength(s.labels.length);
      const best = CHART_KINDS.filter((k) => s.verdict[k.value].fit === 'best');
      expect(best).toHaveLength(1);
    }
  });

  it('match the percentages quoted for the sports survey', () => {
    expect(exactPercents(DATA_SETS[0].values)).toEqual([40, 30, 20, 10]);
  });
});

describe('iconRow', () => {
  it('splits a value into whole icons and a part', () => {
    expect(iconRow(35, 10)).toEqual({ whole: 3, part: 0.5 });
    expect(iconRow(12, 3)).toEqual({ whole: 4, part: 0 });
    expect(iconRow(17, 5)).toEqual({ whole: 3, part: 0.4 });
  });
});

describe('drawing tasks', () => {
  it('can be drawn exactly with the chart steps', () => {
    for (const v of BAR_TASK.values) {
      expect(v % BAR_TASK.step).toBe(0);
      expect(v).toBeLessThanOrEqual(BAR_TASK.max);
    }
    const pct = exactPercents(PIE_TASK.values);
    expect(pct).toEqual([35, 25, 15, 25]);
    for (const p of pct) expect(p % 5).toBe(0);
  });

  it('mismatches lists the positions that differ', () => {
    expect(mismatches([1, 2, 3], [1, 0, 3])).toEqual([1]);
    expect(mismatches([1, 2], [1, 2])).toEqual([]);
  });
});
