import { describe, expect, it } from 'vitest';
import { buildTableRound, roundProblems, tableKindLabels } from './table-round.js';

/** @type {import('./table-round.js').Story[]} */
const STORIES = [
  (n) => ({ prompt: `Mỗi túi 6 quả. ${n} túi có mấy quả?`, unit: 'quả', divide: false }),
  (n) => ({
    prompt: `Chia đều ${6 * n} quả vào 6 túi. Mỗi túi mấy quả?`,
    unit: 'quả',
    divide: true,
  }),
];
const ASK = { label: 'Hình', prompt: 'Có bao nhiêu?', hint: 'Đếm.', solution: () => 'Xong.' };

describe('the table round', () => {
  it('asks each part on a different row with a right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildTableRound(seed, 6, STORIES, ASK);
      bad.push(...roundProblems(round, 6));
      if (new Set(round.map((q) => q.visual?.n)).size !== round.length) bad.push(['rows', seed]);
    }
    expect(bad).toEqual([]);
  });

  it('names every part it asks', () => {
    const labels = tableKindLabels(6, ASK.label);
    const kinds = buildTableRound(1, 6, STORIES, ASK).map((q) => q.kind ?? '');
    expect(kinds.filter((k) => !(k in labels))).toEqual([]);
  });

  it('builds the same round from the same seed', () => {
    expect(buildTableRound(5, 6, STORIES, ASK)).toEqual(buildTableRound(5, 6, STORIES, ASK));
  });
});
