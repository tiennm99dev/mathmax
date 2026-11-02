/**
 * Kid questions on triangles, quadrilaterals, rectangles and squares, each with
 * its picture, plus the classification of a figure from its corners. Pure and
 * DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { centreOf, cornerMarks, nameAway, rightCorners } from './scene.js';

/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {import('./scene.js').Pt} Pt */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Scene>} SceneQuestion */

/**
 * @typedef {'tam-giac' | 'tu-giac' | 'chu-nhat' | 'vuong' | 'thang-hang' | 'cat-nhau'} ShapeKind
 */

/** What each kind is called. */
export const KIND_NAMES = /** @type {const} */ ({
  'tam-giac': 'hình tam giác',
  'tu-giac': 'hình tứ giác',
  'chu-nhat': 'hình chữ nhật',
  vuong: 'hình vuông',
});

/**
 * Twice the signed area of triangle pqr; zero when the points are in line.
 * @param {Pt} p @param {Pt} q @param {Pt} r
 */
function turnOf(p, q, r) {
  return (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
}

/**
 * Whether segments pq and rs cross or touch away from a shared corner.
 * @param {Pt} p @param {Pt} q @param {Pt} r @param {Pt} s
 */
function segmentsMeet(p, q, r, s) {
  const d1 = turnOf(p, q, r);
  const d2 = turnOf(p, q, s);
  const d3 = turnOf(r, s, p);
  const d4 = turnOf(r, s, q);
  return Math.sign(d1) * Math.sign(d2) <= 0 && Math.sign(d3) * Math.sign(d4) <= 0;
}

/**
 * Squared lengths of the sides, exact on grid points.
 * @param {Pt[]} points
 * @returns {number[]}
 */
export function sideSquares(points) {
  return points.map((p, i) => {
    const q = points[(i + 1) % points.length];
    return (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
  });
}

/**
 * What three or four grid points make, taken in order round the figure.
 * @param {Pt[]} points
 * @returns {ShapeKind}
 */
export function classify(points) {
  const n = points.length;
  const inLine = points.some(
    (p, i) => turnOf(points[(i + n - 1) % n], p, points[(i + 1) % n]) === 0,
  );
  if (inLine) return 'thang-hang';
  if (n === 3) return 'tam-giac';
  const [a, b, c, d] = points;
  if (segmentsMeet(a, b, c, d) || segmentsMeet(b, c, d, a)) return 'cat-nhau';
  if (rightCorners(points).length < 4) return 'tu-giac';
  const [ab, bc] = sideSquares(points);
  return ab === bc ? 'vuong' : 'chu-nhat';
}

/** The figures a child names, with corners on a grid. */
const NAMED = /** @type {const} */ ([
  {
    kind: 'vuong',
    points: [
      { x: 2, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 4 },
      { x: 2, y: 4 },
    ],
  },
  {
    kind: 'vuong',
    points: [
      { x: 4, y: 0 },
      { x: 6, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 2 },
    ],
  },
  {
    kind: 'chu-nhat',
    points: [
      { x: 1, y: 1 },
      { x: 7, y: 1 },
      { x: 7, y: 4 },
      { x: 1, y: 4 },
    ],
  },
  {
    kind: 'chu-nhat',
    points: [
      { x: 3, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 4 },
      { x: 3, y: 4 },
    ],
  },
  {
    kind: 'tu-giac',
    points: [
      { x: 2, y: 0 },
      { x: 7, y: 1 },
      { x: 6, y: 4 },
      { x: 1, y: 4 },
    ],
  },
  {
    kind: 'tu-giac',
    points: [
      { x: 3, y: 0 },
      { x: 7, y: 0 },
      { x: 5, y: 4 },
      { x: 1, y: 4 },
    ],
  },
  {
    kind: 'tam-giac',
    points: [
      { x: 4, y: 0 },
      { x: 7, y: 4 },
      { x: 1, y: 4 },
    ],
  },
  {
    kind: 'tam-giac',
    points: [
      { x: 2, y: 0 },
      { x: 2, y: 4 },
      { x: 7, y: 4 },
    ],
  },
]);

/** The figures that `nameShape` can show. */
export const NAMED_SHAPES = NAMED;

/**
 * A card with a polygon on it and, when given, its corner names.
 * @param {readonly Pt[]} grid corners in grid units
 * @param {string} label
 * @param {readonly string[]} [names]
 * @returns {Scene}
 */
function shapeScene(grid, label, names = []) {
  const unit = 36;
  const points = grid.map((p) => ({ x: 16 + p.x * unit, y: 34 + p.y * unit }));
  const middle = centreOf(points);
  return {
    w: 320,
    h: 212,
    label,
    polygons: [{ points }],
    dots: names.map((name, i) => ({
      at: points[i],
      name,
      nameAt: nameAway(points[i], middle, 18),
    })),
    reveal: { corners: cornerMarks(points) },
  };
}

/** Why a figure has its name, in one sentence. */
const REASONS = /** @type {const} */ ({
  vuong: 'Hình có 4 góc vuông và 4 cạnh dài bằng nhau, nên là hình vuông.',
  'chu-nhat':
    'Hình có 4 góc vuông, 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau, nên là hình chữ nhật.',
  'tu-giac':
    'Hình có 4 đỉnh, 4 cạnh nhưng không đủ 4 góc vuông, nên chỉ là hình tứ giác, không phải hình chữ nhật hay hình vuông.',
  'tam-giac': 'Hình có 3 đỉnh và 3 cạnh, nên là hình tam giác.',
});

/**
 * What a figure shows, for a screen reader: its sides, right angles and whether
 * its sides are equal, without its name.
 * @param {readonly Pt[]} points
 */
function shapeDescription(points) {
  const corners = rightCorners([...points]).length;
  const sides = new Set(sideSquares([...points])).size;
  const angles = corners === 0 ? 'không có góc vuông' : `có ${corners} góc vuông`;
  const lengths = sides === 1 ? 'các cạnh dài bằng nhau' : 'các cạnh không dài bằng nhau hết';
  return `Một hình có ${points.length} cạnh, ${angles}, ${lengths}.`;
}

/**
 * Naming a figure. Its picture never gives the name away to a screen reader.
 * @param {() => number} rand
 * @param {(typeof NAMED)[number]} [given]
 * @returns {SceneQuestion}
 */
export function nameShape(rand, given = pick(rand, NAMED)) {
  const names = ['Hình tam giác', 'Hình tứ giác', 'Hình chữ nhật', 'Hình vuông'];
  const right = capitalize(KIND_NAMES[given.kind]);
  return {
    prompt: 'Đây là hình gì? Em chọn tên gọi đúng nhất.',
    options: names,
    answer: names.indexOf(right),
    hint: 'Đếm số cạnh. Với hình có 4 cạnh, em xem các góc và độ dài các cạnh.',
    solution: REASONS[given.kind],
    visual: shapeScene(given.points, shapeDescription(given.points)),
  };
}

/**
 * How many vertices, sides or angles a named figure has.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function countParts(rand) {
  const shape = pick(rand, /** @type {const} */ (['tam-giac', 'tu-giac', 'chu-nhat', 'vuong']));
  const part = pick(rand, /** @type {const} */ (['đỉnh', 'cạnh', 'góc']));
  const count = shape === 'tam-giac' ? 3 : 4;
  const figure = NAMED.find((f) => f.kind === shape) ?? NAMED[0];
  const name = KIND_NAMES[shape];
  return {
    prompt: `${capitalize(name)} có mấy ${part}?`,
    options: ['2', '3', '4', '5'],
    answer: count - 2,
    hint: `Em nhìn hình và đếm từng ${part}.`,
    solution: `${capitalize(name)} có ${count} đỉnh, ${count} cạnh và ${count} góc.`,
    visual: shapeScene(figure.points, `Một ${name}.`),
  };
}

/** Corners named in order round a quadrilateral. */
const QUAD_NAMES = /** @type {const} */ ([
  ['A', 'B', 'C', 'D'],
  ['M', 'N', 'P', 'Q'],
  ['E', 'G', 'H', 'I'],
]);

/**
 * Which segment is not a side of a quadrilateral: one across it.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function notASide(rand) {
  const names = pick(rand, QUAD_NAMES);
  const [a, b, c, d] = names;
  const figure = pick(
    rand,
    NAMED.filter((f) => f.points.length === 4),
  );
  const across = pick(rand, [`${a}${c}`, `${b}${d}`]);
  const title = names.join('');
  const sides = shuffle(rand, [`${a}${b}`, `${b}${c}`, `${c}${d}`, `${d}${a}`]).slice(0, 2);
  return {
    prompt: `Đoạn thẳng nào không phải là cạnh của hình ${title}?`,
    ...mixOptions(rand, across, sides),
    hint: 'Cạnh nối hai đỉnh liền nhau, đi theo viền của hình.',
    solution: `${title} có 4 cạnh: ${a}${b}, ${b}${c}, ${c}${d}, ${d}${a}. ${across} nối hai đỉnh không liền nhau, nên không phải là cạnh.`,
    visual: shapeScene(
      figure.points,
      `Hình ${title} có bốn đỉnh ${names.join(', ')}, đi vòng theo thứ tự.`,
      names,
    ),
  };
}

/**
 * A side of a rectangle from the side facing it.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function rectangleSide(rand) {
  const long = int(rand, 7, 15);
  const short = int(rand, 2, long - 2);
  const askLong = rand() < 0.5;
  const right = askLong ? long : short;
  return {
    prompt: `Hình chữ nhật ABCD có AB = ${long} cm, BC = ${short} cm. ${askLong ? 'CD' : 'DA'} dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, right, 1, long + 3),
    hint: 'Trong hình chữ nhật, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.',
    solution: askLong
      ? `CD và AB là hai cạnh dài, nên CD = AB = ${long} cm.`
      : `DA và BC là hai cạnh ngắn, nên DA = BC = ${short} cm.`,
    visual: {
      ...shapeScene(
        [
          { x: 1, y: 1 },
          { x: 7, y: 1 },
          { x: 7, y: 4 },
          { x: 1, y: 4 },
        ],
        `Hình chữ nhật ABCD, cạnh AB dài ${long} xăng-ti-mét, cạnh BC dài ${short} xăng-ti-mét.`,
        ['A', 'B', 'C', 'D'],
      ),
      texts: [
        { x: 160, y: 54, text: `${long} cm` },
        { x: 234, y: 124, text: `${short} cm` },
      ],
    },
  };
}

/**
 * The other sides of a square.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function squareSide(rand) {
  const side = int(rand, 2, 12);
  return {
    prompt: `Hình vuông MNPQ có MN = ${side} cm. PQ dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, side, 1, side + 3),
    hint: 'Bốn cạnh của hình vuông có độ dài như thế nào?',
    solution: `Hình vuông có 4 cạnh dài bằng nhau, nên PQ = MN = ${side} cm.`,
    visual: {
      ...shapeScene(
        [
          { x: 2, y: 0 },
          { x: 6, y: 0 },
          { x: 6, y: 4 },
          { x: 2, y: 4 },
        ],
        `Hình vuông MNPQ, cạnh MN dài ${side} xăng-ti-mét.`,
        ['M', 'N', 'P', 'Q'],
      ),
      texts: [{ x: 160, y: 54, text: `${side} cm` }],
    },
  };
}
