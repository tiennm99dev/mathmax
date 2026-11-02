/**
 * Kid questions on an angle (vertex and sides), right angles and how many
 * right angles a shape has, each with its picture. Pure and DOM-free.
 */
import { pick } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { cornerMarks, nameAway, pointAt, rightCorners } from './scene.js';

/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {import('./scene.js').Pt} Pt */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Scene>} SceneQuestion */

/** Vertex first, then the two points on the sides. */
const NAMES = /** @type {const} */ ([
  ['O', 'A', 'B'],
  ['M', 'P', 'Q'],
  ['I', 'K', 'L'],
  ['G', 'H', 'E'],
]);

/** The measures an angle that is not right may have: clearly not 90°. */
const NOT_RIGHT = [45, 60, 120, 135];

/** Where the first side of an angle may point. */
const TURNS = [-20, 0, 25, 180, 200, 270, 300];

const W = 320;
const H = 230;
const SIDE = 92;

/**
 * An angle with vertex in the middle of the card. Its right-angle mark is held
 * back until the question ends.
 * @param {number} deg measure
 * @param {number} turn direction of the first side
 * @param {readonly [string, string, string]} names
 * @param {string} label
 * @returns {Scene}
 */
function angleScene(deg, turn, names, label) {
  const [o, p, q] = names;
  const raw = { x: 0, y: 0 };
  const corners = [raw, pointAt(raw, SIDE, turn), pointAt(raw, SIDE, turn + deg)];
  const xs = corners.map((c) => c.x);
  const ys = corners.map((c) => c.y);
  const vertex = {
    x: W / 2 - (Math.min(...xs) + Math.max(...xs)) / 2,
    y: H / 2 - (Math.min(...ys) + Math.max(...ys)) / 2,
  };
  const a = pointAt(vertex, SIDE, turn);
  const b = pointAt(vertex, SIDE, turn + deg);
  const inside = pointAt(vertex, 10, turn + deg / 2);
  return {
    w: W,
    h: H,
    label,
    lines: [
      { a: vertex, b: a },
      { a: vertex, b },
    ],
    dots: [
      { at: vertex, name: o, nameAt: nameAway(vertex, inside, 20) },
      { at: a, name: p, nameAt: nameAway(a, vertex, 18) },
      { at: b, name: q, nameAt: nameAway(b, vertex, 18) },
    ],
    reveal: deg === 90 ? { corners: [{ at: vertex, p: a, q: b }] } : undefined,
  };
}

/**
 * Whether an angle is right, as if checked with a set square.
 * @param {() => number} rand
 * @param {boolean} right
 * @returns {SceneQuestion}
 */
export function isRightAngle(rand, right) {
  const names = pick(rand, NAMES);
  const deg = right ? 90 : pick(rand, NOT_RIGHT);
  const turn = pick(rand, TURNS);
  const [o, p, q] = names;
  const looks = deg < 90 ? 'hẹp hơn' : 'rộng hơn';
  return {
    prompt: 'Em đặt ê ke lên góc này. Đây là góc vuông hay góc không vuông?',
    options: ['Góc vuông', 'Góc không vuông'],
    answer: right ? 0 : 1,
    hint: 'Góc vuông vừa khít với góc vuông của ê ke.',
    solution: right
      ? `Hai cạnh ${o}${p}, ${o}${q} trùng hai cạnh góc vuông của ê ke, nên đây là góc vuông.`
      : `Góc này ${looks} góc vuông của ê ke, nên đây là góc không vuông.`,
    visual: angleScene(deg, turn, names, `Góc đỉnh ${o}, cạnh ${o}${p}, ${o}${q}.`),
  };
}

/**
 * The vertex of an angle.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function findVertex(rand) {
  const names = pick(rand, NAMES);
  const [o, p, q] = names;
  return {
    prompt: 'Điểm nào là đỉnh của góc?',
    ...mixOptions(rand, o, [p, q]),
    hint: 'Đỉnh là nơi hai cạnh của góc gặp nhau.',
    solution: `Hai cạnh gặp nhau tại ${o}, nên ${o} là đỉnh của góc.`,
    visual: angleScene(
      pick(rand, [...NOT_RIGHT, 90]),
      pick(rand, TURNS),
      names,
      `Một góc có hai cạnh là đoạn thẳng ${o}${p} và đoạn thẳng ${o}${q}.`,
    ),
  };
}

/**
 * The two sides of an angle.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function findSides(rand) {
  const names = pick(rand, NAMES);
  const [o, p, q] = names;
  const right = `${o}${p} và ${o}${q}`;
  return {
    prompt: `Góc đỉnh ${o} có hai cạnh nào?`,
    ...mixOptions(rand, right, [`${p}${q} và ${o}${p}`, `${p}${q} và ${o}${q}`]),
    hint: `Hai cạnh của góc đều đi ra từ đỉnh ${o}.`,
    solution: `Góc đỉnh ${o}; cạnh ${o}${p}, ${o}${q}.`,
    visual: angleScene(
      pick(rand, [...NOT_RIGHT, 90]),
      pick(rand, TURNS),
      names,
      `Góc đỉnh ${o}, hai đoạn thẳng đi ra từ ${o} đến ${p} và đến ${q}.`,
    ),
  };
}

/**
 * Shapes on a grid, whose right angles a child counts. Corners are whole
 * numbers so the test of a right angle is exact.
 * @type {readonly { name: string, points: Pt[] }[]}
 */
export const COUNT_SHAPES = [
  {
    name: 'hình tam giác',
    points: [
      { x: 0, y: 4 },
      { x: 3, y: 0 },
      { x: 6, y: 4 },
    ],
  },
  {
    name: 'hình tam giác',
    points: [
      { x: 1, y: 0 },
      { x: 1, y: 4 },
      { x: 6, y: 4 },
    ],
  },
  {
    name: 'hình tứ giác',
    points: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 6, y: 4 },
      { x: 0, y: 4 },
    ],
  },
  {
    name: 'hình tứ giác',
    points: [
      { x: 2, y: 0 },
      { x: 6, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
    ],
  },
  {
    name: 'hình tứ giác',
    points: [
      { x: 1, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 4 },
      { x: 1, y: 4 },
    ],
  },
  {
    name: 'hình năm cạnh',
    points: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 6, y: 2 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
    ],
  },
  {
    name: 'hình năm cạnh',
    points: [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 2 },
      { x: 3, y: 4 },
      { x: 0, y: 4 },
    ],
  },
];

/**
 * How many right angles a shape has.
 * @param {() => number} rand
 * @param {(typeof COUNT_SHAPES)[number]} [given]
 * @returns {SceneQuestion}
 */
export function countRightAngles(rand, given = pick(rand, COUNT_SHAPES)) {
  const count = rightCorners(given.points).length;
  const unit = 40;
  const points = given.points.map((p) => ({ x: 40 + p.x * unit, y: 20 + p.y * unit }));
  const options = [0, 1, 2, 3, 4];
  return {
    prompt: 'Hình này có mấy góc vuông?',
    options: options.map(String),
    answer: options.indexOf(count),
    hint: 'Em kiểm tra từng góc của hình như khi đặt ê ke vào, rồi đếm.',
    solution:
      count === 0
        ? `${capitalize(given.name)} này không có góc vuông nào.`
        : `${capitalize(given.name)} này có ${count} góc vuông, các dấu xanh chỉ các góc đó.`,
    visual: {
      w: 320,
      h: 200,
      label: `Một ${given.name} có ${given.points.length} góc.`,
      settledLabel: `Một ${given.name} có ${count} góc vuông.`,
      polygons: [{ points }],
      reveal: { corners: cornerMarks(points) },
    },
  };
}
