import { describe, expect, it } from 'vitest';
import {
  PIECE_SHAPES,
  TANGRAM_BOARD,
  boardStatus,
  boardTarget,
  sizeOf,
  solve,
  startPoses,
  turned,
} from '#lib/core/kid/tangram.js';
import {
  PUZZLES,
  REACH,
  RULER_MAX,
  TASKS,
  markText,
  markUnder,
  stepOf,
  stepText,
} from './engine.js';

describe('drawing a segment with the ruler', () => {
  it('goes through the steps in the order of the book', () => {
    expect(stepOf(1, 9, 9, false)).toBe(1);
    expect(stepOf(0, 4, 9, false)).toBe(2);
    expect(stepOf(0, 9, 9, false)).toBe(3);
    expect(stepOf(0, 9, 9, true)).toBe(4);
  });

  it('reads the mark under the point from where the ruler lies', () => {
    expect(markUnder(0, 7)).toBe(7);
    expect(markUnder(2, 7)).toBe(5);
    expect(markUnder(-1, 7)).toBe(8);
  });

  it('never names a mark the ruler does not have', () => {
    expect(markText(0, 7)).toBe('đang ở vạch 7 của thước');
    expect(markText(2, 1)).toBe('nằm ngoài thước');
    expect(markText(-2, RULER_MAX)).toBe('nằm ngoài thước');
  });

  it('says which way the ruler must slide', () => {
    const task = TASKS[0];
    expect(stepText(task, 2, 3, false)).toContain('sang trái');
    expect(stepText(task, -1, 3, false)).toContain('sang phải');
    expect(stepText(task, 0, 3, false)).toContain('đến vạch 9');
    expect(stepText(task, 0, 9, true)).toBe('Đúng rồi! Đoạn thẳng AB dài 9 cm.');
  });

  it('starts every task unfinished and within the ruler', () => {
    const bad = [];
    for (const t of TASKS) {
      if (t.shift === 0 || t.end === t.cm) bad.push(t.name);
      if (Math.abs(t.shift) > REACH || t.cm > RULER_MAX || t.end > RULER_MAX) bad.push(t.name);
      if (t.name.length !== 2) bad.push(t.name);
    }
    expect(bad).toEqual([]);
  });
});

describe('fitting puzzles', () => {
  it('keeps pieces in the tray at the start, and each puzzle can be solved', () => {
    const bad = [];
    const { w, h, tray } = TANGRAM_BOARD;
    for (const puzzle of PUZZLES) {
      startPoses(puzzle).forEach((pose, i) => {
        const corners = PIECE_SHAPES[puzzle.pieces[i].shape].corners;
        const size = sizeOf(turned(corners, pose.rot));
        if (pose.x + size.w > w || pose.y + size.h > h || pose.y < tray) {
          bad.push(`${puzzle.id} piece ${i}`);
        }
      });
      for (const p of boardTarget(puzzle).flat()) {
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > tray) bad.push(`${puzzle.id} target`);
      }
      const answer = solve(puzzle);
      if (!answer) bad.push(`${puzzle.id} no solution`);
      else if (boardStatus(puzzle, answer).state !== 'done') bad.push(`${puzzle.id} not done`);
      if (boardStatus(puzzle, startPoses(puzzle)).state === 'done')
        bad.push(`${puzzle.id} starts done`);
    }
    expect(bad).toEqual([]);
  });
});
