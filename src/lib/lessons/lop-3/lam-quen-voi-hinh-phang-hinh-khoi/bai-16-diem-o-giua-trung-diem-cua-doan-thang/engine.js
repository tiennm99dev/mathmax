/**
 * The lesson's board: point M dragged on a grid above a ruler, told when it is
 * between A and B and when it is the midpoint of AB. Also its quiz round. Pure
 * and DOM-free.
 */
import { rng, shuffle } from '#lib/core/drill.js';
import {
  doubleOf,
  findMidpoint,
  halfOf,
  hopsToMiddle,
  isBetween,
  isMidpoint,
} from '../_shared/segment-questions.js';

/** SVG units per centimetre, one grid cell. */
export const CELL = 30;
/** Space round the grid. */
export const PAD = 20;
/** Grid columns and the row of segment AB. */
export const COLS = 12;
export const LINE_ROW = 3;
/** The column of A. */
export const A_COL = 1;
/** The lengths AB can have. */
export const LENGTHS = [6, 8, 10];

/**
 * Where a grid crossing sits on the board.
 * @param {number} col @param {number} row
 */
export const toBoard = (col, row) => ({ x: PAD + col * CELL, y: PAD + row * CELL });

/**
 * The grid crossing nearest a board point.
 * @param {{ x: number, y: number }} p
 */
export function snapToGrid(p) {
  const clampTo = (/** @type {number} */ v, /** @type {number} */ hi) =>
    Math.max(0, Math.min(hi, Math.round(v)));
  return { col: clampTo((p.x - PAD) / CELL, COLS), row: clampTo((p.y - PAD) / CELL, LINE_ROW) };
}

/**
 * @typedef {'lech' | 'ngoai' | 'dau' | 'giua' | 'trung-diem'} Place
 */

/**
 * Where M is, against a segment AB of `length` cm.
 * @param {number} col @param {number} row of M
 * @param {number} length
 * @returns {Place}
 */
export function placeOf(col, row, length) {
  if (row !== LINE_ROW) return 'lech';
  const am = col - A_COL;
  if (am < 0 || am > length) return 'ngoai';
  if (am === 0 || am === length) return 'dau';
  return am * 2 === length ? 'trung-diem' : 'giua';
}

/**
 * What the board says.
 * @param {number} col @param {number} row of M
 * @param {number} length
 */
export function placeMessage(col, row, length) {
  const am = col - A_COL;
  const mb = length - am;
  switch (placeOf(col, row, length)) {
    case 'lech':
      return 'A, M, B không thẳng hàng. M không phải là điểm ở giữa hai điểm A và B.';
    case 'ngoai':
      return 'A, M, B thẳng hàng nhưng M nằm ngoài đoạn thẳng AB. M không phải là điểm ở giữa.';
    case 'dau':
      return `M trùng với điểm ${am === 0 ? 'A' : 'B'}. Em kéo M vào giữa đoạn thẳng AB.`;
    case 'giua':
      return `M là điểm ở giữa hai điểm A và B. AM = ${am} cm, MB = ${mb} cm. Hai đoạn chưa bằng nhau, nên M chưa là trung điểm.`;
    default:
      return `M là điểm ở giữa hai điểm A và B, và AM = MB = ${am} cm. M là trung điểm của đoạn thẳng AB!`;
  }
}

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'o-giua': 'Điểm ở giữa',
  'la-trung-diem': 'Có là trung điểm không',
  'tim-trung-diem': 'Tìm trung điểm',
  'mot-nua': 'Độ dài từ trung điểm',
  'gap-doi': 'Độ dài cả đoạn thẳng',
  'cao-cao': 'Cào cào nhảy',
});

/**
 * A round of eight questions on a seed; the yes and no answers come in an
 * order the seed mixes, so no place on the screen is always right.
 * @param {number} seed
 * @returns {(import('../_shared/segment-questions.js').SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const [between1, between2] = shuffle(rand, /** @type {const} */ (['giua', 'lech', 'ngoai']));
  const [mid1, mid2] = shuffle(rand, [true, false]);
  return [
    { kind: 'o-giua', ...isBetween(rand, between1) },
    { kind: 'la-trung-diem', ...isMidpoint(rand, mid1) },
    { kind: 'tim-trung-diem', ...findMidpoint(rand) },
    { kind: 'mot-nua', ...halfOf(rand) },
    { kind: 'o-giua', ...isBetween(rand, between2) },
    { kind: 'la-trung-diem', ...isMidpoint(rand, mid2) },
    { kind: 'gap-doi', ...doubleOf(rand) },
    { kind: 'cao-cao', ...hopsToMiddle(rand) },
  ];
}
