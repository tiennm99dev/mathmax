import { describe, expect, it } from 'vitest';
import {
  A_COL,
  KIND_LABELS,
  LINE_ROW,
  buildRound,
  placeMessage,
  placeOf,
  snapToGrid,
  toBoard,
} from './engine.js';

/** @typedef {ReturnType<typeof buildRound>[number]} Question */

/**
 * The named dot of a question's picture.
 * @param {Question} q
 * @param {string} name
 */
function dot(q, name) {
  const found = q.visual?.dots?.find((d) => d.name === name);
  if (!found) throw new Error(`no dot ${name}`);
  return found.at;
}

/**
 * The right option worked out again from the question.
 * @param {Question} q
 * @returns {string}
 */
function recomputed(q) {
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'mot-nua':
      return String(nums[0] / 2);
    case 'gap-doi':
      return String(nums[0] * 2);
    case 'cao-cao':
      return String(nums[0] / 2 - nums[1]);
    case 'tim-trung-diem': {
      const mid = (dot(q, 'A').x + dot(q, 'B').x) / 2;
      const name = q.visual?.dots?.find(
        (d) => d.name && d.name !== 'A' && d.name !== 'B' && Math.abs(d.at.x - mid) < 0.01,
      )?.name;
      return name ?? '';
    }
    case 'la-trung-diem': {
      const lengths = (q.visual?.texts ?? []).map((t) => t.text);
      return lengths[0] === lengths[1] ? 'Có' : 'Không';
    }
    default: {
      const [a, b, o] = [dot(q, 'A'), dot(q, 'B'), dot(q, 'O')];
      return o.y === a.y && o.x > a.x && o.x < b.x ? 'Có' : 'Không';
    }
  }
}

describe('the midpoint board', () => {
  it('tells the five places of M', () => {
    const on = (/** @type {number} */ am) => placeOf(A_COL + am, LINE_ROW, 8);
    expect(placeOf(A_COL + 4, 0, 8)).toBe('lech');
    expect(on(-1)).toBe('ngoai');
    expect(on(9)).toBe('ngoai');
    expect(on(0)).toBe('dau');
    expect(on(8)).toBe('dau');
    expect(on(3)).toBe('giua');
    expect(on(4)).toBe('trung-diem');
  });

  it('names the lengths only when they mean something', () => {
    expect(placeMessage(A_COL + 3, LINE_ROW, 8)).toContain('AM = 3 cm, MB = 5 cm');
    expect(placeMessage(A_COL + 4, LINE_ROW, 8)).toContain('AM = MB = 4 cm');
    expect(placeMessage(A_COL + 4, 1, 8)).not.toContain('cm');
  });

  it('snaps to the grid and stays on it', () => {
    expect(snapToGrid(toBoard(4, 2))).toEqual({ col: 4, row: 2 });
    expect(snapToGrid({ x: -50, y: 9999 })).toEqual({ col: 0, row: LINE_ROW });
    expect(snapToGrid({ x: 9999, y: -50 })).toEqual({ col: 12, row: 0 });
  });
});

describe('the round', () => {
  it('has right answers worked out again from each question', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = q.options[q.answer];
        if (right !== recomputed(q)) bad.push(`${seed}: ${q.prompt} -> ${String(right)}`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${seed}: repeats ${q.prompt}`);
        if (!(q.kind in KIND_LABELS)) bad.push(`${seed}: kind ${q.kind}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('does not always have the same yes-or-no answer', () => {
    const yes = new Set();
    for (let seed = 1; seed <= 20; seed++) {
      yes.add(buildRound(seed).find((q) => q.kind === 'la-trung-diem')?.answer);
    }
    expect(yes.size).toBe(2);
  });
});
