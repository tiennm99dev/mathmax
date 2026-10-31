import { describe, expect, it } from 'vitest';
import {
  BOARD_H,
  BOARD_W,
  PIECE_SHAPES,
  PUZZLES,
  TRAY_ROW,
  boardStatus,
  boardTarget,
  clampPose,
  coverOf,
  placed,
  sizeOf,
  solve,
  startPoses,
  statusMessage,
  turned,
} from './engine.js';

const unitSquare = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

describe('shape-building board', () => {
  it('covers four quarters per cell, two for a half-cell triangle', () => {
    expect(coverOf(unitSquare)).toHaveLength(4);
    expect(coverOf(PIECE_SHAPES.tri1.corners)).toHaveLength(2);
    expect(coverOf(PIECE_SHAPES.square.corners)).toHaveLength(16);
    expect(coverOf(PIECE_SHAPES.quarter.corners)).toHaveLength(4);
  });

  it('turns a piece a quarter turn and back after four turns', () => {
    const rect = PIECE_SHAPES.rect.corners;
    expect(sizeOf(turned(rect, 1))).toEqual({ w: 1, h: 2 });
    const key = (/** @type {{x:number,y:number}[]} */ c) => coverOf(c).sort().join(' ');
    expect(key(turned(rect, 4))).toBe(key(rect));
    const tri = PIECE_SHAPES.tri2.corners;
    expect(key(turned(tri, 1))).not.toBe(key(tri));
  });

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

  it('reports overlaps, pieces poking out and gaps', () => {
    const square = PUZZLES[0];
    const t = boardTarget(square)[0][0];
    // Both triangles in the same spot.
    const same = boardStatus(square, [
      { rot: 0, x: t.x, y: t.y },
      { rot: 0, x: t.x, y: t.y },
    ]);
    expect(same.state).toBe('overlap');
    // One triangle half out of the target.
    const out = boardStatus(square, [
      { rot: 0, x: t.x + 1, y: t.y },
      { rot: 0, x: 0, y: 6 },
    ]);
    expect(out.state).toBe('outside');
    // One triangle in place, the other still in the tray.
    const half = boardStatus(square, [
      { rot: 0, x: t.x, y: t.y },
      { rot: 0, x: 0, y: 6 },
    ]);
    expect(half).toMatchObject({ state: 'gap', covered: 8, total: 16 });
    expect(statusMessage(square, half)).toContain('còn chỗ trống');
    // The right turns fill it.
    const done = boardStatus(square, [
      { rot: 0, x: t.x, y: t.y },
      { rot: 2, x: t.x, y: t.y },
    ]);
    expect(done.state).toBe('done');
    expect(statusMessage(square, done)).toContain('Ghép xong');
  });

  it('keeps a moved piece on whole cells inside the board', () => {
    const tri = PIECE_SHAPES.tri2.corners;
    expect(clampPose(tri, { rot: 5, x: -3.4, y: 2.6 })).toEqual({ rot: 1, x: 0, y: 3 });
    expect(clampPose(tri, { rot: 0, x: 20, y: 20 })).toEqual({
      rot: 0,
      x: BOARD_W - 2,
      y: BOARD_H - 2,
    });
    expect(placed(tri, 0, 1, 1)[0]).toEqual({ x: 1, y: 1 });
  });
});
