/**
 * A mixed practice round over the chapter "Làm quen với một số hình phẳng":
 * naming a shape, finding a shape among others, the shape of an everyday
 * object, counting one shape in a picture and counting the sticks of a
 * stick shape. Questions are built from a seed, so the first round is the
 * same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import {
  COLORS,
  OBJECTS,
  SHAPES,
  SHAPE_LOOKS,
  SHAPE_NAMES,
  objectSentence,
  shapeTitle,
} from '../_shared/shapes.js';

/** @typedef {import('../_shared/shapes.js').ShapeKind} ShapeKind */
/** @typedef {import('../_shared/shapes.js').Figure} Figure */
/** @typedef {'name' | 'find' | 'object' | 'count' | 'sticks'} Kind */
/** @typedef {{ x1: number, y1: number, x2: number, y2: number }} Stick */
/** @typedef {{ label: string, figure?: Figure }} Option */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   figure?: Figure;
 *   object?: import('../_shared/shapes.js').ObjectId;
 *   scene?: Figure[];
 *   sticks?: Stick[];
 *   options: Option[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['name', 'find', 'object', 'count', 'sticks']);

/** What each kind practises, for the score line. */
export const KIND_LABELS = /** @type {const} */ ({
  name: 'Gọi tên hình',
  find: 'Tìm hình',
  object: 'Hình của đồ vật',
  count: 'Đếm hình',
  sticks: 'Xếp que tính',
});

/** Turns that keep each shape easy to recognise (no square stood on a corner). */
const TURNS = /** @type {const} */ ({
  vuong: [0, 0, 15, 30],
  tron: [0],
  'tam-giac': [0, 0, 180, 20],
  'chu-nhat': [0, 90, 20],
});

/**
 * A shape of the given kind with a random colour, size, turn and proportions.
 * @param {() => number} rand
 * @param {ShapeKind} kind
 * @returns {Figure}
 */
export function randomFigure(rand, kind) {
  return {
    kind,
    color: pick(rand, COLORS),
    size: pick(rand, [0.65, 0.8, 1]),
    turn: pick(rand, TURNS[kind]),
    variant: int(rand, 0, 2),
  };
}

/**
 * The four shape names as options, in the book's order.
 * @returns {Option[]}
 */
function nameOptions() {
  return SHAPES.map((kind) => ({ label: shapeTitle(kind) }));
}

/**
 * Up to four number options that include `right`, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @param {number} [lo]
 * @returns {{ options: Option[], answer: number }}
 */
export function numberOptions(rand, right, lo = 1) {
  const near = [];
  for (let d = -3; d <= 3; d++) if (d !== 0 && right + d >= lo) near.push(right + d);
  const values = [right, ...shuffle(rand, near).slice(0, 3)].sort((a, b) => a - b);
  return { options: values.map((v) => ({ label: String(v) })), answer: values.indexOf(right) };
}

/**
 * @param {number} x1 @param {number} y1 @param {number} x2 @param {number} y2
 * @returns {Stick}
 */
const stick = (x1, y1, x2, y2) => ({ x1, y1, x2, y2 });

/**
 * Stick pictures on a 200 × 140 canvas: each stick is one segment.
 * @type {ReadonlyArray<{ id: string, name: string, sticks: Stick[], how: string }>}
 */
export const STICK_SHAPES = [
  {
    id: 'tam-giac',
    name: 'hình tam giác',
    sticks: [stick(100, 20, 150, 110), stick(150, 110, 50, 110), stick(50, 110, 100, 20)],
    how: 'Hình tam giác có 3 cạnh, mỗi cạnh 1 que.',
  },
  {
    id: 'vuong',
    name: 'hình vuông',
    sticks: [
      stick(60, 20, 140, 20),
      stick(140, 20, 140, 100),
      stick(140, 100, 60, 100),
      stick(60, 100, 60, 20),
    ],
    how: 'Hình vuông có 4 cạnh, mỗi cạnh 1 que.',
  },
  {
    id: 'chu-nhat',
    name: 'hình chữ nhật',
    sticks: [
      stick(20, 30, 100, 30),
      stick(100, 30, 180, 30),
      stick(180, 30, 180, 110),
      stick(180, 110, 100, 110),
      stick(100, 110, 20, 110),
      stick(20, 110, 20, 30),
    ],
    how: 'Mỗi cạnh dài có 2 que, mỗi cạnh ngắn có 1 que.',
  },
  {
    id: 'ngoi-nha',
    name: 'ngôi nhà',
    sticks: [
      stick(70, 75, 100, 23),
      stick(100, 23, 130, 75),
      stick(70, 75, 130, 75),
      stick(130, 75, 130, 135),
      stick(130, 135, 70, 135),
      stick(70, 135, 70, 75),
    ],
    how: 'Mái nhà có 2 que, thân nhà là hình vuông có 4 que.',
  },
  {
    id: 'hai-vuong',
    name: 'hai hình vuông chung một cạnh',
    sticks: [
      stick(20, 30, 100, 30),
      stick(100, 30, 180, 30),
      stick(180, 30, 180, 110),
      stick(180, 110, 100, 110),
      stick(100, 110, 20, 110),
      stick(20, 110, 20, 30),
      stick(100, 30, 100, 110),
    ],
    how: 'Que ở giữa là cạnh chung của hai hình vuông, em chỉ đếm nó một lần.',
  },
];

const NUMBER_WORDS = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
];

/**
 * "một, hai, ba" counted up to n.
 * @param {number} n
 */
export function countAloud(n) {
  return NUMBER_WORDS.slice(1, n + 1).join(', ');
}

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  if (kind === 'name') {
    const shape = pick(rand, SHAPES);
    return {
      kind,
      prompt: 'Đây là hình gì?',
      figure: randomFigure(rand, shape),
      options: nameOptions(),
      answer: SHAPES.indexOf(shape),
      hint: 'Em đếm số cạnh của hình. Hình không có cạnh là hình tròn. Hình có 4 cạnh: em xem 4 cạnh có dài bằng nhau không.',
      solution: `Đây là ${SHAPE_NAMES[shape]}. ${SHAPE_LOOKS[shape]}`,
    };
  }
  if (kind === 'find') {
    const shape = pick(rand, SHAPES);
    const kinds = shuffle(rand, [...SHAPES]);
    const options = kinds.map((k) => {
      const figure = randomFigure(rand, k);
      return { label: SHAPE_NAMES[k], figure };
    });
    return {
      kind,
      prompt: `Chạm vào ${SHAPE_NAMES[shape]}.`,
      options,
      answer: kinds.indexOf(shape),
      hint: `${SHAPE_LOOKS[shape]} Em đếm số cạnh của từng hình.`,
      solution: `${SHAPE_LOOKS[shape]} Đó là hình em cần tìm.`,
    };
  }
  if (kind === 'object') {
    const object = pick(rand, OBJECTS);
    return {
      kind,
      prompt: `${object.part} có dạng hình gì?`,
      object: object.id,
      options: nameOptions(),
      answer: SHAPES.indexOf(object.shape),
      hint: 'Em nhìn hình dạng của đồ vật và đếm số cạnh. Có 4 cạnh thì em xem 4 cạnh có dài bằng nhau không.',
      solution: objectSentence(object),
    };
  }
  if (kind === 'count') {
    const shape = pick(rand, SHAPES);
    const n = int(rand, 2, 5);
    const others = SHAPES.filter((k) => k !== shape);
    const total = int(rand, Math.max(6, n + 2), 9);
    const kinds = [
      ...Array.from({ length: n }, () => shape),
      ...Array.from({ length: total - n }, () => pick(rand, others)),
    ];
    return {
      kind,
      prompt: `Có mấy ${SHAPE_NAMES[shape]}?`,
      scene: shuffle(rand, kinds).map((k) => randomFigure(rand, k)),
      ...numberOptions(rand, n),
      hint: `Em chỉ đếm ${SHAPE_NAMES[shape]}. ${SHAPE_LOOKS[shape]}`,
      solution: `Đếm từng ${SHAPE_NAMES[shape]}: ${countAloud(n)}. Có ${n} ${SHAPE_NAMES[shape]}.`,
    };
  }
  const shape = pick(rand, STICK_SHAPES);
  const n = shape.sticks.length;
  return {
    kind,
    prompt: `Bạn Mai xếp ${shape.name} bằng que tính. Bạn dùng mấy que tính?`,
    sticks: shape.sticks,
    ...numberOptions(rand, n, 2),
    hint: `Chạm vào từng que và đếm. ${shape.how}`,
    solution: `${shape.how} Đếm: ${countAloud(n)}. Bạn Mai dùng ${n} que tính.`,
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
