/**
 * The turning models of "Khối trụ, khối cầu": both solids as faces for the
 * orthographic view of `#lib/geom-engine/solid.js`, what the child sees from
 * each direction, and the cards of the find-the-object game. Pure and
 * DOM-free.
 *
 * Model space: z points up and the centre of the solid is the origin.
 */
import {
  arrowView as turnByArrow,
  cross3,
  dot3,
  dragView as turnByDrag,
  drawOrder,
  facesViewer,
  sub3,
  viewPoint,
} from '#lib/geom-engine/solid.js';
import { THINGS, thingSentence } from '../_shared/solids.js';

/** @typedef {import('#lib/geom-engine/solid.js').Face} Face */
/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {import('#lib/geom-engine/solid.js').View} View */
/** @typedef {'tru' | 'cau'} RoundSolid */
/** @typedef {'ngang' | 'tren' | 'duoi'} Direction */
/** @typedef {[number, number, number]} Hsl */
/** @typedef {Face & { color: Hsl }} PaintedFace */

export const CYLINDER_RADIUS = 65;
export const CYLINDER_HEIGHT = 120;
export const SPHERE_RADIUS = 85;

const SIDES = 48;
const BAND = 6;
const LONGITUDES = 24;
const LATITUDES = 12;
const PANEL = 2;

const CAN_BLUE = /** @type {Hsl} */ ([217, 91, 60]);
const CAN_SKY = /** @type {Hsl} */ ([199, 89, 74]);
const ROUND_FACE = /** @type {Hsl} */ ([43, 96, 58]);
const BALL_RED = /** @type {Hsl} */ ([0, 84, 64]);
const BALL_CREAM = /** @type {Hsl} */ ([48, 96, 82]);

/**
 * A point on a circle at height `z`.
 * @param {number} r
 * @param {number} deg
 * @param {number} z
 * @returns {P3}
 */
function ringPoint(r, deg, z) {
  const a = (deg * Math.PI) / 180;
  return { x: r * Math.cos(a), y: r * Math.sin(a), z };
}

/**
 * A standing cylinder: the side in stripes, so a turn shows, and two round
 * faces in a colour of their own.
 * @returns {PaintedFace[]}
 */
export function cylinderFaces() {
  const r = CYLINDER_RADIUS;
  const h = CYLINDER_HEIGHT / 2;
  const step = 360 / SIDES;
  /** @type {PaintedFace[]} */
  const faces = [];
  for (let i = 0; i < SIDES; i++) {
    const a = i * step;
    const b = (i + 1) * step;
    faces.push({
      id: `side-${i}`,
      kind: 'side',
      index: i,
      pts: [ringPoint(r, a, -h), ringPoint(r, b, -h), ringPoint(r, b, h), ringPoint(r, a, h)],
      color: Math.floor(i / BAND) % 2 ? CAN_SKY : CAN_BLUE,
    });
  }
  const around = Array.from({ length: SIDES }, (_, i) => i * step);
  faces.push({
    id: 'top',
    kind: 'top',
    index: -1,
    pts: around.map((a) => ringPoint(r, a, h)),
    color: ROUND_FACE,
  });
  faces.push({
    id: 'bottom',
    kind: 'bottom',
    index: -1,
    pts: [...around].reverse().map((a) => ringPoint(r, a, -h)),
    color: ROUND_FACE,
  });
  return faces;
}

/**
 * A ball in coloured panels, so a turn shows even though its outline stays
 * the same.
 * @returns {PaintedFace[]}
 */
export function sphereFaces() {
  const R = SPHERE_RADIUS;
  const lonStep = 360 / LONGITUDES;
  const latStep = 180 / LATITUDES;
  /** @param {number} lat @param {number} lon */
  const at = (lat, lon) => {
    const t = (lat * Math.PI) / 180;
    return ringPoint(R * Math.cos(t), lon, R * Math.sin(t));
  };
  /** @type {PaintedFace[]} */
  const faces = [];
  for (let j = 0; j < LATITUDES; j++) {
    const low = -90 + j * latStep;
    const high = low + latStep;
    for (let i = 0; i < LONGITUDES; i++) {
      const a = i * lonStep;
      const b = (i + 1) * lonStep;
      /** @type {P3[]} */
      let pts = [at(low, a), at(low, b), at(high, b), at(high, a)];
      // A panel touching a pole is a triangle: its two pole corners coincide.
      if (j === 0) pts = [at(low, a), at(high, b), at(high, a)];
      if (j === LATITUDES - 1) pts = [at(low, a), at(low, b), at(high, a)];
      faces.push({
        id: `side-${j}-${i}`,
        kind: 'side',
        index: i,
        pts,
        color: Math.floor(i / PANEL) % 2 ? BALL_CREAM : BALL_RED,
      });
    }
  }
  return faces;
}

const CYLINDER = cylinderFaces();
const SPHERE = sphereFaces();

/**
 * How far a face is turned towards the viewer: 1 straight on, 0 edge on.
 * @param {P3[]} pts
 * @param {View} view
 */
function facing(pts, view) {
  const n = cross3(sub3(pts[1], pts[0]), sub3(pts[2], pts[0]));
  const size = Math.sqrt(dot3(n, n));
  const eye = {
    x: viewPoint({ x: 1, y: 0, z: 0 }, view).depth,
    y: viewPoint({ x: 0, y: 1, z: 0 }, view).depth,
    z: viewPoint({ x: 0, y: 0, z: 1 }, view).depth,
  };
  return size === 0 ? 0 : dot3(n, eye) / size;
}

/**
 * The outline of the cylinder in this view: both visible rims and the two
 * side lines where the curved side turns away.
 * @param {View} view
 * @returns {Array<[P3, P3]>}
 */
export function cylinderLines(view) {
  const side = CYLINDER.filter((f) => f.kind === 'side');
  const front = side.map((f) => facesViewer(f.pts, view));
  /** @type {Array<[P3, P3]>} */
  const lines = [];
  side.forEach((f, i) => {
    if (front[i]) lines.push([f.pts[0], f.pts[1]], [f.pts[3], f.pts[2]]);
    if (front[i] !== front[(i + 1) % side.length]) lines.push([f.pts[1], f.pts[2]]);
  });
  for (const f of CYLINDER) {
    if (f.kind === 'side' || !facesViewer(f.pts, view)) continue;
    f.pts.forEach((p, i) => lines.push([p, f.pts[(i + 1) % f.pts.length]]));
  }
  return lines;
}

/**
 * What to draw for a solid in a view.
 * @param {RoundSolid} kind
 * @param {View} view
 * @param {(p: { x: number, y: number }) => { x: number, y: number }} toScreen
 */
export function drawSolid(kind, view, toScreen) {
  const faces = kind === 'tru' ? CYLINDER : SPHERE;
  const polys = drawOrder(faces, view, toScreen)
    .filter((d) => d.front)
    .map((d) => {
      const [h, s, l] = /** @type {PaintedFace} */ (d.face).color;
      const light = l * (0.72 + 0.28 * facing(d.face.pts, view));
      return {
        id: d.face.id,
        kind: d.face.kind,
        points: d.screen.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '),
        fill: `hsl(${h} ${s}% ${light.toFixed(1)}%)`,
      };
    });
  const lines =
    kind === 'tru'
      ? cylinderLines(view).map(([a, b], i) => {
          const p = toScreen(viewPoint(a, view));
          const q = toScreen(viewPoint(b, view));
          return { id: i, x1: p.x, y1: p.y, x2: q.x, y2: q.y };
        })
      : [];
  return { polys, lines };
}

/** Lowest tilt: far enough below the ground to see the bottom face. */
export const MIN_PITCH = -80;

/**
 * The view after a drag, with the near side of the solid following the
 * pointer: drag right and the near side moves right.
 * @param {View} view
 * @param {number} dx
 * @param {number} dy
 * @returns {View}
 */
export function dragView(view, dx, dy) {
  return turnByDrag(view, dx, dy, { pitchRate: 0.6, minPitch: MIN_PITCH });
}

/**
 * The view after an arrow, or null for any other key. Left and right name the
 * way the near side moves, as every solid view turns (`arrowView` in
 * `#lib/geom-engine/solid.js`).
 * @param {View} view
 * @param {string} key
 * @param {boolean} [shift]
 * @returns {View | null}
 */
export function arrowView(view, key, shift = false) {
  return turnByArrow(view, key, shift, { minPitch: MIN_PITCH });
}

/**
 * Which way the child is looking from, or null between the three.
 * @param {View} view
 * @returns {Direction | null}
 */
export function directionOf(view) {
  if (Math.abs(view.pitch) <= 12) return 'ngang';
  if (view.pitch >= 55) return 'tren';
  if (view.pitch <= -55) return 'duoi';
  return null;
}

/** The three directions to try, with what each is called. */
export const DIRECTIONS = /** @type {const} */ ([
  { id: 'ngang', label: 'Nhìn ngang' },
  { id: 'tren', label: 'Nhìn từ trên' },
  { id: 'duoi', label: 'Nhìn từ dưới' },
]);

/**
 * What the child sees of a solid in this view.
 * @param {RoundSolid} kind
 * @param {View} view
 */
export function viewNote(kind, view) {
  const from = directionOf(view);
  if (kind === 'cau') {
    if (from === 'ngang') return 'Nhìn ngang: khối cầu tròn đều.';
    if (from === 'tren') return 'Nhìn từ trên: khối cầu vẫn tròn đều.';
    if (from === 'duoi') return 'Nhìn từ dưới: khối cầu vẫn tròn đều.';
    return 'Xoay thế nào, khối cầu cũng tròn đều. Nó không có mặt phẳng nào.';
  }
  if (from === 'ngang')
    return 'Nhìn ngang: em thấy mặt cong bao quanh, trông gần giống hình chữ nhật.';
  if (from === 'tren') return 'Nhìn từ trên: em thấy mặt tròn màu vàng ở trên.';
  if (from === 'duoi') return 'Nhìn từ dưới: em thấy mặt tròn màu vàng ở dưới.';
  return view.pitch > 0
    ? 'Em thấy một mặt tròn phẳng ở trên và mặt cong bao quanh.'
    : 'Em thấy một mặt tròn phẳng ở dưới và mặt cong bao quanh.';
}

/**
 * What the child found out once it has looked from all three directions.
 * @param {RoundSolid} kind
 */
export function foundOut(kind) {
  return kind === 'tru'
    ? 'Giỏi quá! Khối trụ có hai mặt tròn phẳng ở hai đầu và một mặt cong bao quanh.'
    : 'Giỏi quá! Nhìn từ phía nào, khối cầu cũng tròn đều. Khối cầu chỉ có mặt cong.';
}

/** The bins of the find-the-object game. */
export const FIND_BINS = [
  { id: 'tru', label: 'Khối trụ' },
  { id: 'cau', label: 'Khối cầu' },
  { id: 'khac', label: 'Khối khác' },
];

const IN_GAME = [
  'lon-nuoc',
  'ong-nuoc',
  'khuc-go',
  'cuc-pin',
  'qua-bong',
  'qua-cam',
  'qua-dia-cau',
  'den-long',
  'hop-qua',
  'xuc-xac',
];

/** The cards of the find-the-object game, one per thing. */
export const FIND_CARDS = IN_GAME.map((id) => {
  const thing = /** @type {import('../_shared/solids.js').Thing} */ (
    THINGS.find((t) => t.id === id)
  );
  return {
    id,
    label: thing.name,
    bin: thing.kind === 'tru' || thing.kind === 'cau' ? thing.kind : 'khac',
    why: thingSentence(thing),
  };
});
