/**
 * The lesson's board: corners dragged on a grid, the figure told what it is and
 * why. Also its quiz round. Pure and DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import {
  classify,
  countParts,
  nameShape,
  notASide,
  rectangleSide,
  sideSquares,
  squareSide,
} from '../_shared/shape-questions.js';
import { rightCorners } from '../_shared/scene.js';

/** SVG units per grid cell, the space round the grid and its size. */
export const CELL = 40;
export const PAD = 24;
export const COLS = 8;
export const ROWS = 6;

/** Where the corners start: a figure with no right angle, so there is work to do. */
export const START_QUAD = [
  { x: 1, y: 1 },
  { x: 6, y: 1 },
  { x: 7, y: 5 },
  { x: 2, y: 5 },
];
export const START_TRIANGLE = [
  { x: 2, y: 1 },
  { x: 7, y: 2 },
  { x: 3, y: 5 },
];

/** Corner names in order round the figure. */
export const QUAD_NAMES = ['A', 'B', 'C', 'D'];
export const TRIANGLE_NAMES = ['A', 'B', 'C'];

/**
 * Where a grid point sits on the board.
 * @param {{ x: number, y: number }} g
 */
export const toBoard = (g) => ({ x: PAD + g.x * CELL, y: PAD + g.y * CELL });

/**
 * The grid point nearest a board point.
 * @param {{ x: number, y: number }} p
 */
export function toGrid(p) {
  const clampTo = (/** @type {number} */ v, /** @type {number} */ hi) =>
    Math.max(0, Math.min(hi, Math.round(v)));
  return { x: clampTo((p.x - PAD) / CELL, COLS), y: clampTo((p.y - PAD) / CELL, ROWS) };
}

/**
 * The lengths of the sides that lie along the grid, in cells; null for a slanted
 * side, whose length a child cannot count.
 * @param {{ x: number, y: number }[]} points
 * @returns {(number | null)[]}
 */
export function cellLengths(points) {
  return points.map((p, i) => {
    const q = points[(i + 1) % points.length];
    if (p.x === q.x) return Math.abs(p.y - q.y);
    if (p.y === q.y) return Math.abs(p.x - q.x);
    return null;
  });
}

/**
 * What the board says about the figure.
 * @param {{ x: number, y: number }[]} points
 */
export function shapeMessage(points) {
  const kind = classify(points);
  const right = rightCorners(points).length;
  const count = right === 0 ? 'không có góc vuông nào' : `có ${right} góc vuông`;
  const equal = new Set(sideSquares(points)).size === 1;
  switch (kind) {
    case 'thang-hang':
      return 'Có ba đỉnh liền nhau nằm thẳng hàng, nên chưa thành hình. Em kéo một đỉnh ra.';
    case 'cat-nhau':
      return 'Các cạnh đang cắt nhau, nên chưa thành hình tứ giác. Em kéo một đỉnh ra.';
    case 'tam-giac':
      return `Hình tam giác: 3 đỉnh, 3 cạnh, 3 góc. Hình này ${count}.`;
    case 'vuong':
      return 'Hình vuông: 4 góc vuông và 4 cạnh dài bằng nhau!';
    case 'chu-nhat':
      return 'Hình chữ nhật: 4 góc vuông, 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau!';
    default:
      return equal
        ? `Hình tứ giác: 4 đỉnh, 4 cạnh, 4 góc. Các cạnh dài bằng nhau nhưng hình ${count}, nên chưa là hình vuông.`
        : `Hình tứ giác: 4 đỉnh, 4 cạnh, 4 góc. Hình này ${count}, chưa đủ 4 góc vuông.`;
  }
}

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'goi-ten': 'Gọi tên hình',
  dem: 'Đếm đỉnh, cạnh, góc',
  canh: 'Cạnh của hình',
  'chu-nhat': 'Cạnh hình chữ nhật',
  vuong: 'Cạnh hình vuông',
});

/**
 * A round of eight questions on a seed.
 * @param {number} seed
 * @returns {(import('../_shared/shape-questions.js').SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return [
    { kind: 'goi-ten', ...nameShape(rand) },
    { kind: 'dem', ...countParts(rand) },
    { kind: 'canh', ...notASide(rand) },
    { kind: 'goi-ten', ...nameShape(rand) },
    { kind: 'chu-nhat', ...rectangleSide(rand) },
    { kind: 'vuong', ...squareSide(rand) },
    { kind: 'goi-ten', ...nameShape(rand) },
    { kind: 'dem', ...countParts(rand) },
  ];
}
