/**
 * The lesson's virtual compass: one leg on the centre, the pencil leg dragged
 * to a whole number of centimetres, then turned once round to draw the circle.
 * Also its quiz round. Pure and DOM-free.
 */
import { rng, shuffle } from '#lib/core/drill.js';
import {
  diameterFrom,
  findCentre,
  findSegment,
  otherRadius,
  radiusFrom,
  twoCircles,
} from '../_shared/circle-questions.js';
import { pointAt } from '../_shared/scene.js';

/** SVG units per centimetre. */
export const CM = 30;
/** Size of the board and where the centre is. */
export const SIZE = 360;
export const CENTRE = { x: SIZE / 2, y: SIZE / 2 };
/** The radii the compass opens to, in centimetres. */
export const MIN_RADIUS = 1;
export const MAX_RADIUS = 5;
/** How the pencil leg turns, in degrees per snap. */
export const TURN_STEP = 15;
/** Length of a compass leg, in SVG units. */
const LEG = 110;
/** How long the turn takes, in seconds. */
export const TURN_SECONDS = 1.6;
/** Most extra radii the widget draws to compare. */
export const MAX_EXTRA = 5;

/**
 * Radius (in cm) and direction (in degrees, 0 to 345) of a point on the board,
 * snapped to what the compass can do.
 * @param {{ x: number, y: number }} p
 */
export function readRim(p) {
  const dx = p.x - CENTRE.x;
  const dy = p.y - CENTRE.y;
  const radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, Math.round(Math.hypot(dx, dy) / CM)));
  const raw = (Math.atan2(dy, dx) * 180) / Math.PI;
  const deg = (((Math.round(raw / TURN_STEP) * TURN_STEP) % 360) + 360) % 360;
  return { radius, deg };
}

/**
 * The board point of a radius and direction.
 * @param {number} radius cm
 * @param {number} deg
 */
export const rimPoint = (radius, deg) => pointAt(CENTRE, radius * CM, deg);

/**
 * Where the compass's hinge is, with its legs on `tip` and the centre: above
 * the line between them, so it stays on the board.
 * @param {{ x: number, y: number }} tip
 */
export function hingeOf(tip) {
  const midX = (CENTRE.x + tip.x) / 2;
  const midY = (CENTRE.y + tip.y) / 2;
  const half = Math.hypot(tip.x - CENTRE.x, tip.y - CENTRE.y) / 2;
  const rise = Math.sqrt(LEG * LEG - half * half);
  const len = half * 2 || 1;
  let nx = -(tip.y - CENTRE.y) / len;
  let ny = (tip.x - CENTRE.x) / len;
  if (ny > 0 || (ny === 0 && nx > 0)) {
    nx = -nx;
    ny = -ny;
  }
  return { x: midX + nx * rise, y: midY + ny * rise };
}

/**
 * The SVG path of the part of the circle drawn so far.
 * @param {number} radius cm
 * @param {number} deg where the pencil started
 * @param {number} sweep degrees drawn, 0 to 360
 */
export function drawnArc(radius, deg, sweep) {
  if (sweep <= 0) return '';
  const r = radius * CM;
  const start = pointAt(CENTRE, r, deg);
  if (sweep >= 360) {
    const far = pointAt(CENTRE, r, deg + 180);
    return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${far.x} ${far.y} A ${r} ${r} 0 1 1 ${start.x} ${start.y}`;
  }
  const end = pointAt(CENTRE, r, deg + sweep);
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${end.x} ${end.y}`;
}

/**
 * What the board says.
 * @param {number} radius cm
 * @param {boolean} drawn
 * @param {number} extra radii added to compare
 */
export function compassMessage(radius, drawn, extra) {
  if (!drawn) {
    return `Compa mở rộng ${radius} cm. Em quay compa một vòng để vẽ đường tròn tâm O.`;
  }
  const diameter = `Bán kính OP = ${radius} cm. Đường kính PQ = ${radius} × 2 = ${radius * 2} cm.`;
  return extra > 0
    ? `${diameter} Các bán kính đều dài ${radius} cm.`
    : `${diameter} Đường kính gấp 2 lần bán kính.`;
}

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  tam: 'Tìm tâm',
  'ban-kinh': 'Tìm bán kính',
  'duong-kinh': 'Tìm đường kính',
  'tinh-duong-kinh': 'Tính đường kính',
  'tinh-ban-kinh': 'Tính bán kính',
  'bang-nhau': 'Các bán kính bằng nhau',
  'hai-hinh-tron': 'Hai hình tròn',
});

/**
 * A round of eight questions on a seed.
 * @param {number} seed
 * @returns {(import('../_shared/circle-questions.js').SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const [first, second] = shuffle(rand, /** @type {const} */ (['ban-kinh', 'duong-kinh']));
  return [
    { kind: 'tam', ...findCentre(rand) },
    { kind: first, ...findSegment(rand, first) },
    { kind: second, ...findSegment(rand, second) },
    { kind: 'tinh-duong-kinh', ...diameterFrom(rand) },
    { kind: 'tinh-ban-kinh', ...radiusFrom(rand) },
    { kind: 'bang-nhau', ...otherRadius(rand) },
    { kind: 'tinh-duong-kinh', ...diameterFrom(rand) },
    { kind: 'hai-hinh-tron', ...twoCircles(rand) },
  ];
}
