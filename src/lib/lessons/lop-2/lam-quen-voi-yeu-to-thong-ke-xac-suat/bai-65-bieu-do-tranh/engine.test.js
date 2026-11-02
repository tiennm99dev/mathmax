import { describe, expect, it } from 'vitest';
import { MAX_PICTURES, buildMessage, buildRound, makeTask } from './engine.js';

describe('the chart to build', () => {
  it('fits the slots and has one row that is most and one that is fewest', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const counts = makeTask(seed).map((r) => r.count);
      if (Math.max(...counts) > MAX_PICTURES || new Set(counts).size !== 3) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('says which row to fix, then that the chart is done', () => {
    const rows = makeTask(1);
    const right = rows.map((r) => r.count);
    expect(buildMessage(rows, right)).toContain('đã xong');
    expect(buildMessage(rows, [right[0] + 1, right[1], right[2]])).toContain('thừa');
    expect(buildMessage(rows, [right[0] - 1, right[1], right[2]])).toContain('thiếu');
  });
});

describe('the reading round', () => {
  it('stores the answer its chart shows', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      for (const q of buildRound(seed)) {
        const rows = q.visual?.rows ?? [];
        const counts = rows.map((r) => r.count);
        const chosen = String(q.options[q.answer]);
        const expected = {
          most: rows[counts.indexOf(Math.max(...counts))]?.label,
          least: rows[counts.indexOf(Math.min(...counts))]?.label,
          more: String(Math.max(...counts) - Math.min(...counts)),
          total: String(counts.reduce((a, b) => a + b, 0)),
        }[q.kind ?? ''];
        if (q.kind === 'read') {
          const row = rows.find((r) => q.prompt.includes(r.label.toLowerCase()));
          if (String(row?.count) !== chosen) bad.push([seed, q.prompt]);
        } else if (expected !== chosen) bad.push([seed, q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
