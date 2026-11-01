import { describe, expect, it } from 'vitest';
import {
  PIECE_SHAPES,
  TANGRAM_BOARD,
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
} from './tangram.js';

const unitSquare = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

/** @type {import('./tangram.js').Puzzle} */
const square = {
  id: 'vuong',
  title: 'Hình vuông',
  goal: 'Ghép 2 hình tam giác thành 1 hình vuông.',
  done: 'Hai hình tam giác ghép thành một hình vuông.',
  target: [
    [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ],
  ],
  pieces: [
    { shape: 'tri2', color: '#f87171', rot: 0 },
    { shape: 'tri2', color: '#60a5fa', rot: 1 },
  ],
};

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

  it('reports overlaps, pieces poking out and gaps', () => {
    const t = boardTarget(square)[0][0];
    const same = boardStatus(square, [
      { rot: 0, x: t.x, y: t.y },
      { rot: 0, x: t.x, y: t.y },
    ]);
    expect(same.state).toBe('overlap');
    const out = boardStatus(square, [
      { rot: 0, x: t.x + 1, y: t.y },
      { rot: 0, x: 0, y: 6 },
    ]);
    expect(out.state).toBe('outside');
    const half = boardStatus(square, [
      { rot: 0, x: t.x, y: t.y },
      { rot: 0, x: 0, y: 6 },
    ]);
    expect(half).toMatchObject({ state: 'gap', covered: 8, total: 16 });
    expect(statusMessage(square, half)).toContain('còn chỗ trống');
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
      x: TANGRAM_BOARD.w - 2,
      y: TANGRAM_BOARD.h - 2,
    });
    expect(placed(tri, 0, 1, 1)[0]).toEqual({ x: 1, y: 1 });
  });

  it('works on a board of another size', () => {
    const board = { w: 5, h: 6, tray: 3 };
    expect(boardTarget(square, board)[0][0]).toEqual({ x: 1, y: 0 });
    expect(startPoses(square, board).map((p) => p.y)).toEqual([4, 4]);
    expect(clampPose(PIECE_SHAPES.tri2.corners, { rot: 0, x: 9, y: 9 }, board)).toEqual({
      rot: 0,
      x: 3,
      y: 4,
    });
    const poses = solve(square, board);
    expect(poses && boardStatus(square, poses, board).state).toBe('done');
  });
});
