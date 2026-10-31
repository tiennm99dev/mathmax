/**
 * The two games of the lesson: turn a khối lập phương beside a khối hộp
 * chữ nhật to compare them, and a round of solids and everyday objects to
 * name. Rounds are built from a seed, so the first one is the same on the
 * server and in the browser. Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import { OBJECTS, SOLID_NAMES, kindOf, objectSentence } from '../_shared/solids.js';

/** @typedef {import('../_shared/solids.js').SolidKind} SolidKind */
/** @typedef {import('../_shared/solids.js').Box} Box */

/** The cube shown in the compare game. */
export const CUBE = /** @type {Box} */ ({ dims: { a: 2, b: 2, c: 2 }, color: '#60a5fa' });

/** The boxes the child can put beside the cube. */
export const BOXES = /** @type {const} */ ([
  { id: 'dai', label: 'Hộp dài', box: { dims: { a: 4, b: 2, c: 2 }, color: '#f59e0b' } },
  { id: 'det', label: 'Hộp dẹt', box: { dims: { a: 3.2, b: 2.2, c: 1 }, color: '#f59e0b' } },
  { id: 'cao', label: 'Hộp cao', box: { dims: { a: 2, b: 1.4, c: 3.6 }, color: '#f59e0b' } },
]);

/** Colours of plain solids in a round. */
const COLORS = ['#60a5fa', '#f59e0b', '#34d399', '#f472b6', '#a78bfa'];

/** Sides of plain boxes that are clearly not cubes. */
const BOX_DIMS = [
  { a: 3, b: 2, c: 1 },
  { a: 4, b: 1.5, c: 1.5 },
  { a: 1.5, b: 1.5, c: 3 },
  { a: 3, b: 2, c: 2 },
  { a: 2, b: 1, c: 3 },
];

/** Sides of plain cubes (the size changes, the shape does not). */
const CUBE_SIDES = [1, 2, 3];

/**
 * @typedef {object} RoundItem
 * @property {SolidKind} kind the right answer
 * @property {Box[]} boxes what to draw
 * @property {string} name what it is, such as "con xúc xắc" or "khối màu xanh"
 * @property {string} why the sentence shown after the answer
 * @property {{ yaw: number, pitch: number }} view how it is first seen
 */

/**
 * A plain solid of the kind with a random size and colour.
 * @param {() => number} rand
 * @param {SolidKind} kind
 * @returns {RoundItem}
 */
export function plainSolid(rand, kind) {
  const s = pick(rand, CUBE_SIDES);
  const dims = kind === 'lap-phuong' ? { a: s, b: s, c: s } : { ...pick(rand, BOX_DIMS) };
  const why =
    kind === 'lap-phuong'
      ? 'Mọi mặt đều là hình vuông to bằng nhau: đó là khối lập phương.'
      : 'Có mặt là hình chữ nhật, các mặt không to bằng nhau hết: đó là khối hộp chữ nhật.';
  return {
    kind,
    boxes: [{ dims, color: pick(rand, COLORS) }],
    name: 'một khối',
    why,
    view: { yaw: pick(rand, [-35, -20, 25, 40]), pitch: pick(rand, [15, 25, 35]) },
  };
}

/**
 * A round of six: three of each solid, half of them everyday objects.
 * @param {number} seed
 * @returns {RoundItem[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  /** @type {RoundItem[]} */
  const items = [];
  for (const kind of /** @type {SolidKind[]} */ (['lap-phuong', 'hop-chu-nhat'])) {
    const objects = shuffle(
      rand,
      OBJECTS.filter((o) => o.kind === kind),
    ).slice(0, 2);
    for (const o of objects) {
      items.push({
        kind,
        boxes: [o.box],
        name: o.name,
        why: objectSentence(o),
        view: { yaw: pick(rand, [-35, -25, 30]), pitch: pick(rand, [18, 26]) },
      });
    }
    items.push(plainSolid(rand, kind));
  }
  return shuffle(rand, items);
}

/**
 * The answer a drawn item should get: the kind of its single box.
 * @param {RoundItem} item
 */
export function answerOf(item) {
  return kindOf(item.boxes[0].dims);
}

/**
 * Feedback after a guess.
 * @param {RoundItem} item
 * @param {SolidKind} guess
 */
export function guessMessage(item, guess) {
  if (guess === item.kind) return `Đúng rồi! ${item.why}`;
  return `Chưa đúng. Đây không phải ${SOLID_NAMES[guess]}. Em xoay khối, nhìn các mặt rồi chọn lại nhé.`;
}

/**
 * What the compare game says about the box beside the cube.
 * @param {(typeof BOXES)[number]['id']} id
 */
export function compareMessage(id) {
  const box = BOXES.find((b) => b.id === id) ?? BOXES[0];
  const d = box.box.dims;
  const squares = [d.a === d.b, d.a === d.c, d.b === d.c].filter(Boolean).length;
  const extra =
    squares > 0 ? ' Hộp này có 2 mặt là hình vuông, các mặt khác là hình chữ nhật.' : '';
  return `Khối lập phương: 6 mặt là hình vuông to bằng nhau. ${box.label}: các mặt không to bằng nhau hết, đó là khối hộp chữ nhật.${extra}`;
}
