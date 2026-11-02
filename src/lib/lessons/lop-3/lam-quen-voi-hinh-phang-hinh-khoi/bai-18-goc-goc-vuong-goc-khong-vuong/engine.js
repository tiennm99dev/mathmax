/**
 * The lesson's virtual set square: dragged onto an angle, its right corner
 * sits on the vertex and one short side along a side of the angle, so the
 * child compares the other side. Also its quiz round. Pure and DOM-free.
 */
import { rng, shuffle } from '#lib/core/drill.js';
import {
  countRightAngles,
  findSides,
  findVertex,
  isRightAngle,
} from '../_shared/angle-questions.js';
import { pointAt } from '../_shared/scene.js';

/** Size of the board. */
export const WIDTH = 380;
export const HEIGHT = 320;
/** How far from the vertex the set square snaps onto it. */
export const SNAP = 44;
/** Length of the two sides of an angle, drawn. */
const ANGLE_SIDE = 130;
/** Lengths of the set square's two sides round its right corner. */
const LONG_LEG = 110;
const SHORT_LEG = 80;

/**
 * The angles to check, named as the book names them. A right angle may sit
 * tilted: what counts is how it fits the set square.
 * @typedef {{ vertex: string, p: string, q: string, deg: number, turn: number, at: { x: number, y: number } }} AngleCard
 * @type {readonly AngleCard[]}
 */
export const ANGLES = [
  { vertex: 'A', p: 'B', q: 'C', deg: 90, turn: -90, at: { x: 90, y: 190 } },
  { vertex: 'M', p: 'N', q: 'P', deg: 60, turn: -60, at: { x: 90, y: 200 } },
  { vertex: 'G', p: 'H', q: 'K', deg: 90, turn: -60, at: { x: 90, y: 180 } },
  { vertex: 'P', p: 'Q', q: 'R', deg: 120, turn: -120, at: { x: 190, y: 190 } },
  { vertex: 'I', p: 'L', q: 'T', deg: 45, turn: -45, at: { x: 90, y: 200 } },
  { vertex: 'E', p: 'X', q: 'Y', deg: 135, turn: -150, at: { x: 200, y: 170 } },
];

/** Where the set square waits, its right corner on this point. */
export const START = { x: 280, y: 290 };

/**
 * The ends of an angle's two sides.
 * @param {AngleCard} card
 */
export function angleEnds(card) {
  return {
    p: pointAt(card.at, ANGLE_SIDE, card.turn),
    q: pointAt(card.at, ANGLE_SIDE, card.turn + card.deg),
  };
}

/**
 * Whether the set square's corner is close enough to the vertex to sit on it.
 * @param {AngleCard} card
 * @param {{ x: number, y: number }} corner
 */
export function isOnVertex(card, corner) {
  return Math.hypot(corner.x - card.at.x, corner.y - card.at.y) <= SNAP;
}

/**
 * The corners of the set square. Lying on a vertex, its right corner is there
 * and one leg along the first side of the angle. Elsewhere it lies level.
 * @param {AngleCard} card
 * @param {{ x: number, y: number }} corner
 */
export function setSquare(card, corner) {
  const on = isOnVertex(card, corner);
  const at = on ? card.at : corner;
  const turn = on ? card.turn : -90;
  return {
    corner: at,
    long: pointAt(at, LONG_LEG, turn),
    short: pointAt(at, SHORT_LEG, turn + 90),
  };
}

/**
 * How the angle compares with the set square's right corner.
 * @param {number} deg
 */
export const fitOf = (deg) => (deg === 90 ? 'vua' : deg < 90 ? 'hep' : 'rong');

/**
 * The name of an angle the way the book writes it.
 * @param {AngleCard} card
 */
export const angleName = (card) =>
  `Góc đỉnh ${card.vertex}; cạnh ${card.vertex}${card.p}, ${card.vertex}${card.q}`;

/**
 * What the board says.
 * @param {AngleCard} card
 * @param {boolean} on whether the set square sits on the vertex
 * @param {boolean | null} saidRight what the child answered, null if nothing yet
 */
export function checkMessage(card, on, saidRight) {
  if (!on) return `Em kéo ê ke để góc vuông của ê ke đặt đúng vào đỉnh ${card.vertex}.`;
  if (saidRight === null) {
    return `Một cạnh ê ke nằm trên cạnh ${card.vertex}${card.p}. Em nhìn cạnh ${card.vertex}${card.q}: có trùng cạnh kia của ê ke không?`;
  }
  const isRight = card.deg === 90;
  const reason = {
    vua: `Cạnh ${card.vertex}${card.q} trùng cạnh ê ke, nên đây là góc vuông.`,
    hep: `Cạnh ${card.vertex}${card.q} nằm bên trong ê ke, không trùng cạnh ê ke, nên đây là góc không vuông.`,
    rong: `Cạnh ${card.vertex}${card.q} nằm bên ngoài ê ke, không trùng cạnh ê ke, nên đây là góc không vuông.`,
  }[fitOf(card.deg)];
  return saidRight === isRight ? `Đúng rồi! ${reason}` : `Chưa đúng. ${reason}`;
}

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  dinh: 'Đỉnh của góc',
  canh: 'Cạnh của góc',
  vuong: 'Góc vuông hay không',
  dem: 'Đếm góc vuông',
});

/**
 * A round of eight questions on a seed. Its right and not-right angles come in
 * an order the seed mixes.
 * @param {number} seed
 * @returns {(import('../_shared/angle-questions.js').SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const [r1, r2, r3] = shuffle(rand, [true, false, rand() < 0.5]);
  return [
    { kind: 'dinh', ...findVertex(rand) },
    { kind: 'canh', ...findSides(rand) },
    { kind: 'vuong', ...isRightAngle(rand, r1) },
    { kind: 'dem', ...countRightAngles(rand) },
    { kind: 'vuong', ...isRightAngle(rand, r2) },
    { kind: 'dinh', ...findVertex(rand) },
    { kind: 'vuong', ...isRightAngle(rand, r3) },
    { kind: 'dem', ...countRightAngles(rand) },
  ];
}
