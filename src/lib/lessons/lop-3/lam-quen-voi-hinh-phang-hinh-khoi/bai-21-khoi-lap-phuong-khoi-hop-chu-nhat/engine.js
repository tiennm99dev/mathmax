/**
 * The lesson's counting board: which vertices, edges and faces of a solid have
 * been tapped and what the board says about them. Also its quiz round. Pure and
 * DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import { capitalize } from '#lib/core/kid/quiz.js';
import { clamp } from '#lib/core/visuals/svg-math.js';
import { clampPitch, turnByKey, wrapYaw } from '#lib/geom-engine/solid.js';
import { FACE_SHAPES, SOLID_NAMES } from '../_shared/box.js';
import {
  antOnFrame,
  countSolidPart,
  faceShape,
  nameSolid,
  paintEdges,
  paperLantern,
  thingSolid,
  vertexFlowers,
} from '../_shared/solid-questions.js';

/** @typedef {import('../_shared/box.js').SolidKind} SolidKind */
/** @typedef {'dinh' | 'canh' | 'mat'} PartKind */

/** The parts to count, with their name and how many there are. */
export const PARTS = /** @type {Readonly<Record<PartKind, { name: string, total: number }>>} */ ({
  dinh: { name: 'đỉnh', total: 8 },
  canh: { name: 'cạnh', total: 12 },
  mat: { name: 'mặt', total: 6 },
});

/**
 * The list a tap leaves: an id is counted once, in the order it was tapped.
 * @param {readonly string[]} list
 * @param {string} id
 */
export function countPart(list, id) {
  return list.includes(id) ? [...list] : [...list, id];
}

/** Lowest tilt: far enough below the ground to see the bottom face. */
const MIN_PITCH = -45;

/**
 * The view after a drag, with the near side of the solid following the pointer.
 * @param {import('../_shared/box.js').View} view
 * @param {number} dx
 * @param {number} dy
 */
export function dragView(view, dx, dy) {
  return {
    yaw: wrapYaw(view.yaw + dx * 0.7),
    pitch: clampPitch(view.pitch + dy * 0.5, MIN_PITCH),
  };
}

/**
 * The view after a turn button named by its arrow. Left and right name the way
 * the near side moves, the opposite of the way `turnByKey` moves the eye.
 * @param {import('../_shared/box.js').View} view
 * @param {'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'} key
 */
export function turnView(view, key) {
  /** @type {Record<string, string>} */
  const swap = { ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' };
  return turnByKey(view, swap[key] ?? key, true, MIN_PITCH) ?? view;
}

/** How far from a vertex or an edge a press still reaches it, in board units. */
export const REACH = 28;

/**
 * The vertex or edge a press means: the nearest one within `REACH`. Choosing by
 * distance keeps an edge behind the solid tappable even where wide touch areas
 * of the edges in front would cover it.
 * @param {{ x: number, y: number }} p the press on the board
 * @param {readonly { id: string, a: { x: number, y: number }, b: { x: number, y: number } }[]} parts
 *   a vertex is an edge whose two ends are the same point
 * @returns {string | null}
 */
export function nearestPart(p, parts) {
  let best = null;
  let bestDistance = REACH;
  for (const { id, a, b } of parts) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const span = dx * dx + dy * dy;
    const t = span === 0 ? 0 : clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / span, 0, 1);
    const distance = Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
    if (distance <= bestDistance) {
      best = id;
      bestDistance = distance;
    }
  }
  return best;
}

/**
 * What the board says while a part of a solid is being counted.
 * @param {SolidKind} solid
 * @param {PartKind} part
 * @param {number} count how many have been tapped
 * @param {number} leftInView how many in the view are still not tapped
 */
export function countMessage(solid, part, count, leftInView) {
  const { name, total } = PARTS[part];
  const title = capitalize(SOLID_NAMES[solid]);
  if (count === total) {
    return part === 'mat'
      ? `Đủ rồi! ${title} có 6 mặt, mỗi mặt là ${FACE_SHAPES[solid]}.`
      : `Đủ rồi! ${title} có ${total} ${name}.`;
  }
  if (count === 0) {
    return part === 'mat'
      ? 'Em chạm vào từng mặt để đếm. Xoay khối để thấy cả các mặt phía sau.'
      : `Em chạm vào từng ${name} để đếm. Nét đứt là phần ở phía sau khối.`;
  }
  if (leftInView === 0) {
    return `Em đã đếm ${count} ${name}. Em xoay khối để tìm ${name} còn lại.`;
  }
  return part === 'mat'
    ? `Em đã đếm ${count} mặt. Mặt này là ${FACE_SHAPES[solid]}.`
    : `Em đã đếm ${count} ${name}.`;
}

/**
 * What the board says about the two solids, once both were counted in full;
 * null before that.
 * @param {(solid: SolidKind, part: PartKind) => number} countOf
 */
export function compareMessage(countOf) {
  const solids = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);
  const parts = /** @type {const} */ (['dinh', 'canh', 'mat']);
  const done = solids.every((s) => parts.every((p) => countOf(s, p) === PARTS[p].total));
  if (!done) return null;
  return 'Hai khối đều có 8 đỉnh, 12 cạnh, 6 mặt. Chúng khác nhau ở các mặt: khối lập phương có mặt là hình vuông, khối hộp chữ nhật có mặt là hình chữ nhật.';
}

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'phan-biet': 'Phân biệt hai khối',
  dem: 'Đếm đỉnh, cạnh, mặt',
  mat: 'Hình dạng các mặt',
  'thuc-te': 'Bài toán thực tế',
});

/**
 * A round of eight questions on a seed.
 * @param {number} seed
 * @returns {(import('../_shared/solid-questions.js').SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return [
    { kind: 'phan-biet', ...nameSolid(rand) },
    { kind: 'dem', ...countSolidPart(rand) },
    { kind: 'mat', ...faceShape(rand) },
    { kind: 'phan-biet', ...thingSolid(rand) },
    { kind: 'dem', ...antOnFrame(rand) },
    { kind: 'thuc-te', ...paintEdges(rand) },
    { kind: 'thuc-te', ...paperLantern(rand) },
    { kind: 'thuc-te', ...vertexFlowers(rand) },
  ];
}
