import { describe, expect, it } from 'vitest';
import {
  PIECE_SHAPES,
  TANGRAM_BOARD,
  boardStatus,
  boardTarget,
  coverOf,
  sizeOf,
  solve,
  startPoses,
  statusMessage,
  turned,
} from '#lib/core/kid/tangram.js';
import { PUZZLES } from './engine.js';

const { w: BOARD_W, h: BOARD_H, tray: TRAY_ROW } = TANGRAM_BOARD;

describe('shape-building puzzles', () => {
  it('keeps every piece of every puzzle inside the board at the start', () => {
    const bad = [];
    for (const puzzle of PUZZLES) {
      startPoses(puzzle).forEach((pose, i) => {
        const corners = PIECE_SHAPES[puzzle.pieces[i].shape].corners;
        const { w, h } = sizeOf(turned(corners, pose.rot));
        if (pose.x + w > BOARD_W || pose.y + h > BOARD_H || pose.y < TRAY_ROW) {
          bad.push(`${puzzle.id} ${i}`);
        }
      });
      for (const p of boardTarget(puzzle).flat()) {
        if (p.x < 0 || p.x > BOARD_W || p.y < 0 || p.y > TRAY_ROW) bad.push(`${puzzle.id} target`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts every puzzle unsolved with nothing in the target', () => {
    for (const puzzle of PUZZLES) {
      const status = boardStatus(puzzle, startPoses(puzzle));
      expect(status.state).toBe('gap');
      expect(status.covered).toBe(0);
      expect(statusMessage(puzzle, status)).toContain('kéo các mảnh');
    }
  });

  it('has a solution for every puzzle that the board accepts', () => {
    const failed = [];
    for (const puzzle of PUZZLES) {
      const poses = solve(puzzle);
      if (!poses || boardStatus(puzzle, poses).state !== 'done') failed.push(puzzle.id);
    }
    expect(failed).toEqual([]);
  });

  it('target area equals the total area of the pieces', () => {
    const bad = [];
    for (const puzzle of PUZZLES) {
      const target = new Set(boardTarget(puzzle).flatMap(coverOf)).size;
      const pieces = puzzle.pieces.reduce(
        (n, p) => n + coverOf(PIECE_SHAPES[p.shape].corners).length,
        0,
      );
      if (target !== pieces) bad.push(puzzle.id);
    }
    expect(bad).toEqual([]);
  });
});
