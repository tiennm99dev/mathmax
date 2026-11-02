import { describe, expect, it } from 'vitest';
import { buildDivisionRound, divLine, divisionOptions, groupsLabel } from './divide.js';

describe('division sentences', () => {
  it('writes the quotient of the dividend', () => {
    expect(divLine(8, 2)).toBe('8 : 2 = 4');
    expect(divLine(45, 5)).toBe('45 : 5 = 9');
  });

  it('keeps the number of groups unsaid until the picture is grouped', () => {
    expect(groupsLabel('quả táo', 2, 2, false)).toBe('quả táo, quả táo, quả táo, quả táo');
    expect(groupsLabel('quả táo', 2, 2, true)).toBe('2 nhóm, mỗi nhóm 2 quả táo');
  });
});

describe('division options', () => {
  it('holds the quotient among four different positive numbers on every row', () => {
    const bad = [];
    for (const base of [2, 5]) {
      for (let n = 1; n <= 10; n++) {
        const { options, answer } = divisionOptions(base, n);
        const values = options.map(Number);
        if (values[answer] !== n) bad.push(['answer', base, n]);
        if (new Set(values).size !== 4) bad.push(['size', base, n, options]);
        if (values.some((v) => v <= 0)) bad.push(['sign', base, n, options]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('division rounds', () => {
  const stories = [(/** @type {number} */ n) => ({ prompt: `${n} con`, unit: 'con' })];

  it('asks each row once and stores the right quotient', () => {
    const bad = [];
    for (const base of [2, 5]) {
      for (let seed = 1; seed <= 20; seed++) {
        const round = buildDivisionRound(base, stories, seed);
        const rows = round.map((q) => q.visual?.n ?? 0);
        if (new Set(rows).size !== round.length) bad.push(['rows', base, seed]);
        for (const q of round) {
          const n = q.visual?.n ?? 0;
          if (q.options[q.answer] !== String(n)) bad.push(['answer', base, seed, q.prompt]);
          if (!q.solution.includes(divLine(base * n, base))) bad.push(['solution', base, q.prompt]);
          if (q.hint.includes(`= ${n}`)) bad.push(['hint', base, seed, q.hint]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same round from the same seed', () => {
    expect(buildDivisionRound(2, stories, 1)).toEqual(buildDivisionRound(2, stories, 1));
  });
});
