/**
 * Logic for the shape-building board: pieces with corners on a unit grid,
 * turned in quarter turns and moved cell by cell, are checked against a
 * target outline. Every corner sits on a grid point and every edge runs
 * along the grid or one of its 45° diagonals, so each piece is a union of
 * the four quarter triangles that a cell's two diagonals cut. One sample
 * point inside each quarter, never on an edge, tells exactly what a piece
 * covers. Pure and DOM-free.
 */

/** @typedef {{ x: number, y: number }} Point */

/** Board size in grid cells. */
export const BOARD_W = 9;
export const BOARD_H = 8;
/** First row of the tray where pieces wait; the target sits above it. */
export const TRAY_ROW = 5;

/** One sample per quarter triangle of a unit cell (top, right, bottom, left). */
const QUARTERS = [
  { x: 0.5, y: 0.2 },
  { x: 0.8, y: 0.5 },
  { x: 0.5, y: 0.8 },
  { x: 0.2, y: 0.5 },
];

/**
 * Base piece outlines, corners in grid units with y pointing down.
 * @type {Record<string, { name: string, corners: Point[] }>}
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
 * @typedef {{
 *   id: string;
 *   title: string;
 *   goal: string;
 *   done: string;
 *   target: Point[][];
 *   pieces: Array<{ shape: keyof typeof PIECE_SHAPES, color: string, rot: number }>;
 * }} Puzzle
 */

/** The puzzles, from easy to harder. Target outlines start at (0, 0). */
/** @type {readonly Puzzle[]} */
export const PUZZLES = [
  {
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
  },
  {
    id: 'chu-nhat',
    title: 'Hình chữ nhật',
    goal: 'Ghép 2 hình vuông thành 1 hình chữ nhật.',
    done: 'Hai hình vuông đặt cạnh nhau thành một hình chữ nhật.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'square', color: '#34d399', rot: 0 },
      { shape: 'square', color: '#fbbf24', rot: 0 },
    ],
  },
  {
    id: 'tam-giac',
    title: 'Hình tam giác to',
    goal: 'Ghép 2 hình tam giác thành 1 hình tam giác to.',
    done: 'Hai hình tam giác ghép thành một hình tam giác to hơn.',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#a78bfa', rot: 0 },
      { shape: 'tri2', color: '#f472b6', rot: 0 },
    ],
  },
  {
    id: 'bon-tam-giac',
    title: 'Bốn tam giác',
    goal: 'Ghép 4 hình tam giác thành 1 hình vuông.',
    done: 'Bốn hình tam giác ghép thành một hình vuông.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'quarter', color: '#f87171', rot: 0 },
      { shape: 'quarter', color: '#fbbf24', rot: 1 },
      { shape: 'quarter', color: '#34d399', rot: 2 },
      { shape: 'quarter', color: '#60a5fa', rot: 3 },
    ],
  },
  {
    id: 'ngoi-nha',
    title: 'Ngôi nhà',
    goal: 'Ghép 1 hình vuông và 1 hình tam giác thành ngôi nhà.',
    done: 'Thân nhà là hình vuông, mái nhà là hình tam giác.',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
      [
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 4 },
        { x: 1, y: 4 },
      ],
    ],
    pieces: [
      { shape: 'square', color: '#fbbf24', rot: 0 },
      { shape: 'roof', color: '#f87171', rot: 2 },
    ],
  },
  {
    id: 'thuyen',
    title: 'Con thuyền',
    goal: 'Ghép 3 hình tam giác và 1 hình chữ nhật thành con thuyền.',
    done: 'Cánh buồm và hai mũi thuyền là hình tam giác, thân thuyền là hình chữ nhật.',
    target: [
      [
        { x: 2, y: 0 },
        { x: 4, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 3 },
        { x: 1, y: 3 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f8fafc', rot: 1 },
      { shape: 'rect', color: '#d97706', rot: 1 },
      { shape: 'tri1', color: '#b45309', rot: 0 },
      { shape: 'tri1', color: '#b45309', rot: 2 },
    ],
  },
];

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
 */
export function targetOrigin(puzzle) {
  const all = puzzle.target.flat();
  const { w, h } = sizeOf(all);
  return { x: Math.floor((BOARD_W - w) / 2), y: Math.max(0, Math.floor((TRAY_ROW - h) / 2)) };
}

/**
 * The target outlines moved to their place on the board.
 * @param {Puzzle} puzzle
 * @returns {Point[][]}
 */
export function boardTarget(puzzle) {
  const o = targetOrigin(puzzle);
  return puzzle.target.map((poly) => poly.map((p) => ({ x: p.x + o.x, y: p.y + o.y })));
}

/** @typedef {{ rot: number, x: number, y: number }} Pose */

/**
 * Where each piece starts: in the tray, left to right, one cell apart.
 * @param {Puzzle} puzzle
 * @returns {Pose[]}
 */
export function startPoses(puzzle) {
  let x = 0;
  return puzzle.pieces.map((piece) => {
    const { w } = sizeOf(turned(PIECE_SHAPES[piece.shape].corners, piece.rot));
    const pose = { rot: piece.rot, x, y: TRAY_ROW + 1 };
    x += w + 1;
    return pose;
  });
}

/**
 * Keeps a piece fully on the board, on whole cells.
 * @param {Point[]} corners base outline @param {Pose} pose
 * @returns {Pose}
 */
export function clampPose(corners, pose) {
  const { w, h } = sizeOf(turned(corners, pose.rot));
  return {
    rot: ((pose.rot % 4) + 4) % 4,
    x: Math.min(BOARD_W - w, Math.max(0, Math.round(pose.x))),
    y: Math.min(BOARD_H - h, Math.max(0, Math.round(pose.y))),
  };
}

/**
 * How the pieces cover the target.
 * - `done`: the pieces fill the target exactly, no overlap.
 * - `overlap`: two pieces lie on top of each other.
 * - `outside`: a piece pokes out of the target while touching it.
 * - `gap`: part of the target is still empty.
 * @param {Puzzle} puzzle @param {Pose[]} poses
 * @returns {{ state: 'done' | 'overlap' | 'outside' | 'gap', covered: number, total: number, inside: number }}
 */
export function boardStatus(puzzle, poses) {
  const target = new Set(boardTarget(puzzle).flatMap(coverOf));
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
 * @returns {Pose[] | null}
 */
export function solve(puzzle) {
  const target = new Set(boardTarget(puzzle).flatMap(coverOf));
  /** @type {Pose[]} */
  const poses = [];
  /** @type {Set<string>} */
  const used = new Set();
  /** @param {number} i @returns {boolean} */
  const place = (i) => {
    if (i === puzzle.pieces.length) return used.size === target.size;
    const corners = PIECE_SHAPES[puzzle.pieces[i].shape].corners;
    for (let rot = 0; rot < 4; rot++) {
      for (let y = 0; y < TRAY_ROW; y++) {
        for (let x = 0; x < BOARD_W; x++) {
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
