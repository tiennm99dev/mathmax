/**
 * A shape-building board (thực hành lắp ghép, xếp hình): pieces with corners
 * on a unit grid,
 * turned in quarter turns and moved cell by cell, are checked against a
 * target outline. Every corner sits on a grid point and every edge runs
 * along the grid or one of its 45° diagonals, so each piece is a union of
 * the four quarter triangles that a cell's two diagonals cut. One sample
 * point inside each quarter, never on an edge, tells exactly what a piece
 * covers. Pure and DOM-free.
 */

/** @typedef {{ x: number, y: number }} Point */
/** @typedef {'tri2' | 'tri1' | 'quarter' | 'roof' | 'square' | 'rect'} PieceShape */

/**
 * A puzzle: the target outlines (starting at (0, 0)) and the pieces that
 * fill them, each a base shape with its colour and starting turn.
 * @typedef {{
 *   id: string;
 *   title: string;
 *   goal: string;
 *   done: string;
 *   target: Point[][];
 *   pieces: Array<{ shape: PieceShape, color: string, rot: number }>;
 * }} Puzzle
 */

/**
 * A board: `w` × `h` grid cells, with the tray where pieces wait from row
 * `tray` down and the target above it.
 * @typedef {{ w: number, h: number, tray: number }} Board
 */

/** The board the grade 1 lessons use: 9 × 8 cells, the tray from row 5. */
export const TANGRAM_BOARD = /** @type {Readonly<Board>} */ ({ w: 9, h: 8, tray: 5 });

/** One sample per quarter triangle of a unit cell (top, right, bottom, left). */
const QUARTERS = [
  { x: 0.5, y: 0.2 },
  { x: 0.8, y: 0.5 },
  { x: 0.5, y: 0.8 },
  { x: 0.2, y: 0.5 },
];

/**
 * Base piece outlines, corners in grid units with y pointing down: `tri2` a
 * right triangle with legs of 2, `tri1` with legs of 1, `quarter` a quarter
 * of a 2 × 2 square cut by its diagonals, `roof` the triangle of two `tri2`,
 * `square` 2 × 2 and `rect` 2 × 1.
 * @type {Record<PieceShape, { name: string, corners: Point[] }>}
 */
export const PIECE_SHAPES = {
  tri2: {
    name: 'hình tam giác',
    corners: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ],
  },
  tri1: {
    name: 'hình tam giác nhỏ',
    corners: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  },
  quarter: {
    name: 'hình tam giác',
    corners: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
    ],
  },
  roof: {
    name: 'hình tam giác to',
    corners: [
      { x: 0, y: 2 },
      { x: 2, y: 0 },
      { x: 4, y: 2 },
    ],
  },
  square: {
    name: 'hình vuông',
    corners: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  rect: {
    name: 'hình chữ nhật',
    corners: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 1 },
    ],
  },
};

/**
 * Shifts corners so the smallest x and y are 0.
 * @param {Point[]} corners
 * @returns {Point[]}
 */
export function normalize(corners) {
  const mx = Math.min(...corners.map((p) => p.x));
  const my = Math.min(...corners.map((p) => p.y));
  return corners.map((p) => ({ x: p.x - mx + 0, y: p.y - my + 0 }));
}

/**
 * The corners after `rot` quarter turns clockwise on screen, normalized.
 * @param {Point[]} corners
 * @param {number} rot
 * @returns {Point[]}
 */
export function turned(corners, rot) {
  let out = corners;
  const n = ((rot % 4) + 4) % 4;
  for (let i = 0; i < n; i++) out = out.map((p) => ({ x: -p.y, y: p.x }));
  return normalize(out);
}

/**
 * Width and height of an outline in grid units.
 * @param {Point[]} corners
 */
export function sizeOf(corners) {
  return {
    w: Math.max(...corners.map((p) => p.x)) - Math.min(...corners.map((p) => p.x)),
    h: Math.max(...corners.map((p) => p.y)) - Math.min(...corners.map((p) => p.y)),
  };
}

/**
 * The corners of a piece turned `rot` times with its top left at (x, y).
 * @param {Point[]} corners @param {number} rot @param {number} x @param {number} y
 * @returns {Point[]}
 */
export function placed(corners, rot, x, y) {
  return turned(corners, rot).map((p) => ({ x: p.x + x, y: p.y + y }));
}

/**
 * Whether a point lies inside a polygon (ray casting); points are never on
 * an edge here.
 * @param {Point} p @param {Point[]} poly
 */
export function inside(p, poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) {
      hit = !hit;
    }
  }
  return hit;
}

/**
 * Keys of the quarter samples a polygon covers.
 * @param {Point[]} poly
 * @returns {string[]}
 */
export function coverOf(poly) {
  const x0 = Math.floor(Math.min(...poly.map((p) => p.x)));
  const y0 = Math.floor(Math.min(...poly.map((p) => p.y)));
  const x1 = Math.ceil(Math.max(...poly.map((p) => p.x)));
  const y1 = Math.ceil(Math.max(...poly.map((p) => p.y)));
  /** @type {string[]} */
  const keys = [];
  for (let cy = y0; cy < y1; cy++) {
    for (let cx = x0; cx < x1; cx++) {
      QUARTERS.forEach((q, i) => {
        if (inside({ x: cx + q.x, y: cy + q.y }, poly)) keys.push(`${cx},${cy},${i}`);
      });
    }
  }
  return keys;
}

/**
 * Where a puzzle's target sits on the board: centred above the tray.
 * @param {Puzzle} puzzle
 * @param {Board} [board]
 */
export function targetOrigin(puzzle, board = TANGRAM_BOARD) {
  const all = puzzle.target.flat();
  const { w, h } = sizeOf(all);
  return { x: Math.floor((board.w - w) / 2), y: Math.max(0, Math.floor((board.tray - h) / 2)) };
}

/**
 * The target outlines moved to their place on the board.
 * @param {Puzzle} puzzle
 * @param {Board} [board]
 * @returns {Point[][]}
 */
export function boardTarget(puzzle, board = TANGRAM_BOARD) {
  const o = targetOrigin(puzzle, board);
  return puzzle.target.map((poly) => poly.map((p) => ({ x: p.x + o.x, y: p.y + o.y })));
}

/** @typedef {{ rot: number, x: number, y: number }} Pose */

/**
 * Where each piece starts: in the tray, left to right, one cell apart.
 * @param {Puzzle} puzzle
 * @param {Board} [board]
 * @returns {Pose[]}
 */
export function startPoses(puzzle, board = TANGRAM_BOARD) {
  let x = 0;
  return puzzle.pieces.map((piece) => {
    const { w } = sizeOf(turned(PIECE_SHAPES[piece.shape].corners, piece.rot));
    const pose = { rot: piece.rot, x, y: board.tray + 1 };
    x += w + 1;
    return pose;
  });
}

/**
 * Keeps a piece fully on the board, on whole cells.
 * @param {Point[]} corners base outline @param {Pose} pose @param {Board} [board]
 * @returns {Pose}
 */
export function clampPose(corners, pose, board = TANGRAM_BOARD) {
  const { w, h } = sizeOf(turned(corners, pose.rot));
  return {
    rot: ((pose.rot % 4) + 4) % 4,
    x: Math.min(board.w - w, Math.max(0, Math.round(pose.x))),
    y: Math.min(board.h - h, Math.max(0, Math.round(pose.y))),
  };
}

/**
 * How the pieces cover the target.
 * - `done`: the pieces fill the target exactly, no overlap.
 * - `overlap`: two pieces lie on top of each other.
 * - `outside`: a piece pokes out of the target while touching it.
 * - `gap`: part of the target is still empty.
 * @param {Puzzle} puzzle @param {Pose[]} poses @param {Board} [board]
 * @returns {{ state: 'done' | 'overlap' | 'outside' | 'gap', covered: number, total: number, inside: number }}
 */
export function boardStatus(puzzle, poses, board = TANGRAM_BOARD) {
  const target = new Set(boardTarget(puzzle, board).flatMap(coverOf));
  /** @type {Map<string, number>} */
  const seen = new Map();
  let overlap = false;
  let outside = false;
  let inTarget = 0;
  puzzle.pieces.forEach((piece, i) => {
    const cover = coverOf(
      placed(PIECE_SHAPES[piece.shape].corners, poses[i].rot, poses[i].x, poses[i].y),
    );
    const touches = cover.some((k) => target.has(k));
    if (touches) inTarget += 1;
    for (const k of cover) {
      seen.set(k, (seen.get(k) ?? 0) + 1);
      if ((seen.get(k) ?? 0) > 1) overlap = true;
      if (touches && !target.has(k)) outside = true;
    }
  });
  let covered = 0;
  for (const k of target) if (seen.has(k)) covered += 1;
  const total = target.size;
  /** @type {'done' | 'overlap' | 'outside' | 'gap'} */
  let state = 'gap';
  if (overlap) state = 'overlap';
  else if (outside) state = 'outside';
  else if (covered === total) state = 'done';
  return { state, covered, total, inside: inTarget };
}

/**
 * One way to fill the target, found by trying every turn and cell for each
 * piece in turn; null if there is none.
 * @param {Puzzle} puzzle
 * @param {Board} [board]
 * @returns {Pose[] | null}
 */
export function solve(puzzle, board = TANGRAM_BOARD) {
  const target = new Set(boardTarget(puzzle, board).flatMap(coverOf));
  /** @type {Pose[]} */
  const poses = [];
  /** @type {Set<string>} */
  const used = new Set();
  /** @param {number} i @returns {boolean} */
  const place = (i) => {
    if (i === puzzle.pieces.length) return used.size === target.size;
    const corners = PIECE_SHAPES[puzzle.pieces[i].shape].corners;
    for (let rot = 0; rot < 4; rot++) {
      for (let y = 0; y < board.tray; y++) {
        for (let x = 0; x < board.w; x++) {
          const cover = coverOf(placed(corners, rot, x, y));
          if (!cover.every((k) => target.has(k) && !used.has(k))) continue;
          cover.forEach((k) => used.add(k));
          poses.push({ rot, x, y });
          if (place(i + 1)) return true;
          poses.pop();
          cover.forEach((k) => used.delete(k));
        }
      }
    }
    return false;
  };
  return place(0) ? poses : null;
}

/**
 * The feedback line for the board, read aloud by screen readers.
 * @param {Puzzle} puzzle @param {ReturnType<typeof boardStatus>} status
 */
export function statusMessage(puzzle, status) {
  if (status.state === 'done') return `Ghép xong rồi! ${puzzle.done}`;
  if (status.state === 'overlap') return 'Có hai mảnh chồng lên nhau. Em dời một mảnh ra nhé.';
  if (status.state === 'outside')
    return 'Có mảnh nằm lệch ra ngoài hình mẫu. Em dời hoặc xoay mảnh đó.';
  if (status.inside === 0) return 'Em kéo các mảnh vào hình mẫu nhé.';
  return 'Hình mẫu còn chỗ trống. Em ghép tiếp nhé.';
}
