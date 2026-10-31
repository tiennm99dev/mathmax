/**
 * A mixed practice round over the chapter "Làm quen với một số hình khối":
 * naming a solid, the solid of an everyday object, counting the cubes of a
 * wall, and the position words in the room and in the queue. Questions are
 * built from a seed, so the first round is the same on the server and in
 * the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { SCENES, askQuestion } from '../_shared/positions.js';
import {
  OBJECTS,
  SOLIDS,
  SOLID_LOOKS,
  countAloud,
  cubeWall,
  objectSentence,
  solidTitle,
} from '../_shared/solids.js';

/** @typedef {import('../_shared/solids.js').Box} Box */
/** @typedef {'khoi' | 'do-vat' | 'dem' | 'phong' | 'hang'} Kind */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   boxes?: Box[];
 *   boxLabel?: string;
 *   scene?: import('../_shared/positions.js').SceneId;
 *   place?: string;
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['khoi', 'do-vat', 'dem', 'phong', 'hang']);

/** What each kind practises, for the score line. */
export const KIND_LABELS = /** @type {const} */ ({
  khoi: 'Gọi tên khối',
  'do-vat': 'Khối của đồ vật',
  dem: 'Đếm khối',
  phong: 'Trên, dưới, trái, phải',
  hang: 'Trước, sau, ở giữa',
});

const COLORS = ['#60a5fa', '#f59e0b', '#34d399', '#f472b6'];
const BOX_DIMS = [
  { a: 3, b: 2, c: 1 },
  { a: 4, b: 1.5, c: 1.5 },
  { a: 1.5, b: 1.5, c: 3 },
  { a: 2, b: 1, c: 3 },
];

/**
 * Walls of cubes to count: column heights, at most 9 cubes.
 * @type {ReadonlyArray<readonly number[]>}
 */
export const WALLS = [
  [2, 1],
  [3],
  [2, 2],
  [3, 1],
  [1, 2, 1],
  [3, 2],
  [2, 2, 2],
  [3, 2, 1],
  [1, 3, 1],
  [3, 3, 1],
  [3, 2, 2],
  [3, 3, 2],
  [3, 3, 3],
];

/**
 * Up to four number options that include `right`, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @returns {{ options: string[], answer: number }}
 */
export function numberOptions(rand, right) {
  const near = [];
  for (let d = -2; d <= 2; d++) if (d !== 0 && right + d >= 1) near.push(right + d);
  const values = [right, ...shuffle(rand, near).slice(0, 3)].sort((a, b) => a - b);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/** @param {readonly number[]} heights */
function wallSteps(heights) {
  let done = 0;
  return heights
    .map((h, i) => {
      const words = countAloud(done + h)
        .split(', ')
        .slice(done);
      done += h;
      return `cột ${i + 1}: ${words.join(', ')}`;
    })
    .join('; ');
}

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  const names = SOLIDS.map(solidTitle);
  if (kind === 'khoi') {
    const solid = pick(rand, SOLIDS);
    const s = int(rand, 1, 3);
    const dims = solid === 'lap-phuong' ? { a: s, b: s, c: s } : { ...pick(rand, BOX_DIMS) };
    return {
      kind,
      prompt: 'Đây là khối gì?',
      boxes: [{ dims, color: pick(rand, COLORS) }],
      boxLabel: 'Một khối',
      options: names,
      answer: SOLIDS.indexOf(solid),
      hint: 'Em nhìn các mặt của khối. Mọi mặt là hình vuông to bằng nhau thì là khối lập phương.',
      solution: SOLID_LOOKS[solid],
    };
  }
  if (kind === 'do-vat') {
    const o = pick(rand, OBJECTS);
    const title = o.name[0].toUpperCase() + o.name.slice(1);
    return {
      kind,
      prompt: `${title} có dạng khối gì?`,
      boxes: [o.box],
      boxLabel: title,
      options: names,
      answer: SOLIDS.indexOf(o.kind),
      hint: 'Em nhìn mặt trước của đồ vật: đó là hình vuông hay hình chữ nhật?',
      solution: objectSentence(o),
    };
  }
  if (kind === 'dem') {
    const heights = pick(rand, WALLS);
    const n = heights.reduce((s, h) => s + h, 0);
    return {
      kind,
      prompt: 'Có mấy khối lập phương?',
      boxes: cubeWall(heights, pick(rand, COLORS)),
      boxLabel: `Các khối lập phương xếp thành ${heights.length} cột`,
      ...numberOptions(rand, n),
      hint: 'Đếm từng cột, từ dưới lên trên. Mỗi khối chỉ đếm một lần.',
      solution: `Đếm ${wallSteps(heights)}. Có ${n} khối lập phương.`,
    };
  }
  const scene = SCENES[kind === 'phong' ? 'phong' : 'hang'];
  const q = askQuestion(scene, rand);
  const noun = scene.moverName[0].toUpperCase() + scene.moverName.slice(1);
  const right = scene.phrases[q.options[q.answer]];
  return {
    kind,
    prompt: `${noun} ở đâu?`,
    scene: scene.id,
    place: q.place,
    options: q.options.map((id) => `${noun} ${scene.phrases[id]}.`),
    answer: q.answer,
    hint:
      scene.id === 'phong'
        ? 'Bên trái là phía tay trái của em khi nhìn tranh. Em xem đồ vật ở cao hơn hay thấp hơn mặt bàn.'
        : 'Hàng đi vào cửa bên trái. Bạn gần cửa hơn là bạn đứng trước.',
    solution: `${noun} ${right}.`,
  };
}

/**
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = shuffle(rand, [...KINDS, ...KINDS]);
  return kinds.map((k) => makeQuestion(k, rand));
}

/**
 * Kinds the child missed at the first try, to suggest what to review.
 * @param {readonly Question[]} round
 * @param {ReadonlyArray<boolean | null>} firstTry
 * @returns {string[]}
 */
export function weakKinds(round, firstTry) {
  const missed = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) missed.add(q.kind);
  });
  return KINDS.filter((k) => missed.has(k)).map((k) => KIND_LABELS[k]);
}
