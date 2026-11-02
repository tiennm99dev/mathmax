/**
 * Kid questions on the cube and the box, each with its picture. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { nameAway } from './scene.js';
import { FACE_SHAPES, SOLID_DIMS, SOLID_NAMES, START_VIEW, boxScene, projectBox } from './box.js';

/** @typedef {import('./box.js').SolidKind} SolidKind */
/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Scene>} SceneQuestion */

/** How many of each part both solids have. */
const PART_COUNTS = /** @type {const} */ ({ đỉnh: 8, cạnh: 12, mặt: 6 });

/** Everyday things and the solid they have, sized like the thing. */
const THINGS = /** @type {const} */ ([
  { name: 'Con xúc xắc', kind: 'lap-phuong', dims: { a: 2, b: 2, c: 2 } },
  { name: 'Khối rubik', kind: 'lap-phuong', dims: { a: 2, b: 2, c: 2 } },
  { name: 'Viên gạch', kind: 'hop-chu-nhat', dims: { a: 4, b: 2, c: 1.2 } },
  { name: 'Hộp sữa', kind: 'hop-chu-nhat', dims: { a: 2, b: 1.4, c: 3.6 } },
  { name: 'Hộp bút', kind: 'hop-chu-nhat', dims: { a: 5, b: 1.6, c: 1.2 } },
  { name: 'Cái tủ', kind: 'hop-chu-nhat', dims: { a: 3, b: 1.6, c: 4.4 } },
]);

const SOLIDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);
const SOLID_TITLES = SOLIDS.map((k) => capitalize(SOLID_NAMES[k]));

/**
 * What a solid looks like, for a screen reader, without its name.
 * @param {SolidKind} kind
 */
function solidDescription(kind) {
  return kind === 'lap-phuong'
    ? 'Một khối có các mặt đều là hình vuông to bằng nhau.'
    : 'Một khối có các mặt là hình chữ nhật, không to bằng nhau hết.';
}

/**
 * How many vertices, edges or faces a solid has.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function countSolidPart(rand) {
  const kind = pick(rand, SOLIDS);
  const part = pick(rand, /** @type {const} */ (['đỉnh', 'cạnh', 'mặt']));
  const options = [4, 6, 8, 12];
  return {
    prompt: `${capitalize(SOLID_NAMES[kind])} có mấy ${part}?`,
    options: options.map(String),
    answer: options.indexOf(PART_COUNTS[part]),
    hint: `Em đếm cả những ${part} ở phía sau, chỗ có nét đứt.`,
    solution: `${capitalize(SOLID_NAMES[kind])} có 8 đỉnh, 12 cạnh và 6 mặt.`,
    visual: boxScene(kind, `Một ${SOLID_NAMES[kind]}, các cạnh phía sau vẽ nét đứt.`),
  };
}

/**
 * Telling the two solids apart from a picture.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function nameSolid(rand) {
  const kind = pick(rand, SOLIDS);
  return {
    prompt: 'Đây là khối gì?',
    options: SOLID_TITLES,
    answer: SOLIDS.indexOf(kind),
    hint: 'Em nhìn các mặt của khối: tất cả là hình vuông, hay có hình chữ nhật?',
    solution:
      kind === 'lap-phuong'
        ? 'Các mặt của khối đều là hình vuông to bằng nhau, nên đây là khối lập phương.'
        : 'Các mặt của khối là hình chữ nhật, nên đây là khối hộp chữ nhật.',
    visual: boxScene(kind, solidDescription(kind)),
  };
}

/**
 * What the faces of a solid are.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function faceShape(rand) {
  const kind = pick(rand, SOLIDS);
  const right = capitalize(FACE_SHAPES[kind]);
  const other = capitalize(FACE_SHAPES[kind === 'lap-phuong' ? 'hop-chu-nhat' : 'lap-phuong']);
  return {
    prompt: `Mỗi mặt của ${SOLID_NAMES[kind]} là hình gì?`,
    ...mixOptions(rand, right, [other, 'Hình tam giác', 'Hình tròn']),
    hint: 'Em nhìn một mặt của khối và đếm cạnh, xem các cạnh dài bằng nhau không.',
    solution: `Mỗi mặt của ${SOLID_NAMES[kind]} là ${FACE_SHAPES[kind]}.`,
    visual: boxScene(kind, `Một ${SOLID_NAMES[kind]}.`),
  };
}

/**
 * Which solid an everyday thing has.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function thingSolid(rand) {
  const thing = pick(rand, THINGS);
  return {
    prompt: `${thing.name} có dạng khối gì?`,
    options: SOLID_TITLES,
    answer: SOLIDS.indexOf(thing.kind),
    hint: 'Các mặt của đồ vật này có đều là hình vuông to bằng nhau không?',
    solution: `${thing.name} có các mặt là ${FACE_SHAPES[thing.kind]}, nên có dạng ${SOLID_NAMES[thing.kind]}.`,
    visual: boxScene(thing.kind, `${thing.name}, vẽ thành một khối.`, thing.dims),
  };
}

/**
 * A walk along the edges in front of a box that never visits a corner twice.
 * @param {() => number} rand
 * @param {{ id: string, a: { x: number, y: number }, b: { x: number, y: number }, front: boolean }[]} edges
 * @param {number} length
 */
function frontWalk(rand, edges, length) {
  const front = edges.filter((e) => e.front);
  const key = (/** @type {{ x: number, y: number }} */ p) => `${p.x},${p.y}`;
  for (let tries = 0; tries < 60; tries++) {
    const first = pick(rand, front);
    const path = [first.a, first.b];
    const used = [first];
    while (used.length < length) {
      const end = path[path.length - 1];
      const next = front.filter(
        (e) =>
          !used.includes(e) &&
          (key(e.a) === key(end) || key(e.b) === key(end)) &&
          !path.some((p) => key(p) === key(key(e.a) === key(end) ? e.b : e.a)),
      );
      if (next.length === 0) break;
      const edge = pick(rand, next);
      used.push(edge);
      path.push(key(edge.a) === key(end) ? edge.b : edge.a);
    }
    if (used.length === length) return { path, used };
  }
  throw new Error(`no walk of ${length} edges`);
}

/**
 * How many edges an ant walks along on a box frame.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function antOnFrame(rand) {
  const n = int(rand, 2, 4);
  const scene = boxScene('hop-chu-nhat', '');
  const { edges, centre } = projectBox(SOLID_DIMS['hop-chu-nhat'], START_VIEW, scene.w, scene.h);
  const { path, used } = frontWalk(rand, edges, n);
  const options = [1, 2, 3, 4, 5];
  return {
    prompt: 'Con kiến bò từ A đến B theo đường màu đỏ. Con kiến bò qua mấy cạnh?',
    options: options.map(String),
    answer: options.indexOf(n),
    hint: 'Mỗi đoạn thẳng màu đỏ nối hai đỉnh là một cạnh. Em đếm từng đoạn.',
    solution: `Đường màu đỏ đi qua ${n} cạnh của khối hộp chữ nhật.`,
    visual: {
      ...scene,
      label: `Khung khối hộp chữ nhật. Đường màu đỏ từ A đến B đi qua: ${used.map(() => 'một cạnh').join(', ')}.`,
      settledLabel: `Khung khối hộp chữ nhật. Đường màu đỏ từ A đến B đi qua ${n} cạnh.`,
      lines: [
        ...(scene.lines ?? []),
        ...used.map((e) => ({ a: e.a, b: e.b, color: '#dc2626', width: 6 })),
      ],
      dots: [
        { at: path[0], name: 'A', nameAt: nameAway(path[0], centre, 18), color: '#dc2626' },
        {
          at: path[path.length - 1],
          name: 'B',
          nameAt: nameAway(path[path.length - 1], centre, 18),
          color: '#dc2626',
        },
      ],
    },
  };
}

/**
 * Edges left for the other colour on an iron frame.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function paintEdges(rand) {
  const blue = int(rand, 2, 8);
  const right = 12 - blue;
  return {
    prompt: `Khung sắt dạng khối hộp chữ nhật. Bác thợ sơn ${blue} cạnh màu xanh, các cạnh còn lại màu đỏ. Có mấy cạnh màu đỏ?`,
    ...numberOptions(rand, right, 1, 12),
    hint: 'Khối hộp chữ nhật có tất cả mấy cạnh? Em bớt đi số cạnh màu xanh.',
    solution: `Khối hộp chữ nhật có 12 cạnh. Số cạnh màu đỏ là 12 − ${blue} = ${right} (cạnh).`,
    visual: boxScene('hop-chu-nhat', 'Một khung sắt dạng khối hộp chữ nhật.'),
  };
}

/**
 * Sheets of paper to cover the faces of cube lanterns.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function paperLantern(rand) {
  const n = int(rand, 2, 6);
  const right = 6 * n;
  return {
    prompt: `Mỗi mặt của đèn lồng khối lập phương dán 1 tờ giấy màu. Làm ${n} chiếc đèn lồng cần mấy tờ giấy?`,
    ...mixOptions(
      rand,
      String(right),
      [8 * n, 12 * n, 6 + n].map((v) => String(v)),
    ),
    hint: 'Một chiếc đèn lồng có mấy mặt? Em lấy số đó nhân với số chiếc đèn.',
    solution: `Khối lập phương có 6 mặt, nên mỗi chiếc cần 6 tờ. ${n} chiếc cần 6 × ${n} = ${right} (tờ).`,
    visual: boxScene('lap-phuong', 'Một chiếc đèn lồng dạng khối lập phương.'),
  };
}

/**
 * Flowers pinned on the vertices of a cube.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function vertexFlowers(rand) {
  const each = int(rand, 2, 5);
  const right = 8 * each;
  return {
    prompt: `Mỗi đỉnh của khối lập phương gắn ${each} bông hoa. Có tất cả mấy bông hoa?`,
    ...mixOptions(
      rand,
      String(right),
      [6 * each, 12 * each, 8 + each].map((v) => String(v)),
    ),
    hint: 'Khối lập phương có mấy đỉnh? Em nhân số đỉnh với số bông hoa ở mỗi đỉnh.',
    solution: `Khối lập phương có 8 đỉnh. Số bông hoa là ${each} × 8 = ${right} (bông).`,
    visual: boxScene('lap-phuong', `Một khối lập phương, mỗi đỉnh gắn ${each} bông hoa.`),
  };
}
