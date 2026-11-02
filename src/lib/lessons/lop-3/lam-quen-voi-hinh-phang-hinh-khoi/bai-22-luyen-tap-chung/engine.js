/**
 * The mixed practice of the chapter: questions from each lesson, and problems
 * the chapter's ideas solve together. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { numberOptions } from '#lib/core/kid/quiz.js';
import { countRightAngles } from '../_shared/angle-questions.js';
import { SOLID_DIMS, START_VIEW, boxScene, projectBox } from '../_shared/box.js';
import { findSegment } from '../_shared/circle-questions.js';
import { pointAt } from '../_shared/scene.js';
import { halfOf, isMidpoint } from '../_shared/segment-questions.js';
import { nameShape, rectangleSide } from '../_shared/shape-questions.js';
import { countSolidPart, nameSolid } from '../_shared/solid-questions.js';

/** @typedef {import('../_shared/scene.js').Scene} Scene */
/** @typedef {import('../_shared/segment-questions.js').SceneQuestion} SceneQuestion */

/** The hours at which the hands are square, with the minute hand on 12. */
const SQUARE_HOURS = /** @type {const} */ ([3, 9]);
/** Other whole hours, leaving out 6, where the hands lie in one straight line. */
const OTHER_HOURS = /** @type {const} */ ([1, 2, 4, 5, 7, 8, 10, 11]);

/**
 * A clock at a whole hour.
 * @param {number} hour
 * @returns {Scene}
 */
function clockScene(hour) {
  const c = { x: 160, y: 95 };
  const r = 82;
  return {
    w: 320,
    h: 190,
    label: `Đồng hồ: kim phút chỉ số 12, kim giờ chỉ số ${hour}.`,
    circles: [{ c, r, color: '#fef9c3' }],
    lines: [
      { a: c, b: pointAt(c, 44, hour * 30 - 90), width: 6 },
      { a: c, b: pointAt(c, 54, -90), color: '#2563eb', width: 4 },
    ],
    dots: [{ at: c, color: '#1e293b' }],
    texts: [12, 3, 6, 9].map((n) => {
      const at = pointAt(c, 68, n * 30 - 90);
      return { x: at.x, y: at.y, text: String(n), color: '#1e293b' };
    }),
  };
}

/**
 * Whether the hands of a clock make a right angle, as in the book's clocks.
 * @param {() => number} rand
 * @param {boolean} yes
 * @returns {SceneQuestion}
 */
export function clockAngle(rand, yes) {
  const hour = yes ? pick(rand, SQUARE_HOURS) : pick(rand, OTHER_HOURS);
  return {
    prompt: `Lúc ${hour} giờ, kim giờ và kim phút có tạo thành góc vuông không?`,
    options: ['Có', 'Không'],
    answer: yes ? 0 : 1,
    hint: 'Góc vuông vừa khít với góc vuông của ê ke. Em so hai kim với góc của ê ke.',
    solution: yes
      ? `Lúc ${hour} giờ, hai kim tạo thành góc vuông.`
      : `Lúc ${hour} giờ, hai kim tạo thành góc không vuông.`,
    visual: clockScene(hour),
  };
}

/**
 * Four circles packed in a square: its side is four radii.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function circlesInSquare(rand) {
  const r = int(rand, 2, 6);
  const right = 4 * r;
  const size = 40;
  const left = 80;
  const top = 18;
  const centres = [
    { x: left + size, y: top + size },
    { x: left + 3 * size, y: top + size },
    { x: left + size, y: top + 3 * size },
    { x: left + 3 * size, y: top + 3 * size },
  ];
  return {
    prompt: `Bốn hình tròn bằng nhau, bán kính ${r} cm, xếp khít trong một hình vuông. Cạnh hình vuông dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, right, 1, right + 3),
    hint: 'Một cạnh hình vuông dài bằng hai đường kính. Em tính một đường kính trước.',
    solution: `Đường kính dài ${r} × 2 = ${2 * r} (cm). Cạnh hình vuông dài ${2 * r} × 2 = ${right} (cm).`,
    visual: {
      w: 320,
      h: 196,
      label: `Hình vuông chứa bốn hình tròn xếp thành 2 hàng, mỗi hàng 2 hình. Mỗi hình tròn có bán kính ${r} xăng-ti-mét.`,
      polygons: [
        {
          points: [
            { x: left, y: top },
            { x: left + 4 * size, y: top },
            { x: left + 4 * size, y: top + 4 * size },
            { x: left, y: top + 4 * size },
          ],
          color: '#f8fafc',
        },
      ],
      circles: centres.map((c) => ({ c, r: size })),
      lines: [{ a: centres[0], b: { x: centres[0].x + size, y: centres[0].y }, color: '#dc2626' }],
      dots: [{ at: centres[0], color: '#dc2626' }],
      texts: [{ x: centres[0].x + 15, y: centres[0].y - 14, text: `${r} cm` }],
    },
  };
}

/**
 * A row of big and small lily pads along a pond: its length adds their
 * diameters.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function leafRow(rand) {
  const small = int(rand, 3, 5);
  const big = small * 2;
  const right = 2 * big + 2 * small;
  const bigR = 40;
  const smallR = 20;
  const radii = shuffle(rand, [bigR, bigR, smallR, smallR]);
  const centreY = 58;
  const left = 40;
  let x = left;
  const circles = radii.map((r) => {
    const c = { x: x + r, y: centreY };
    x += 2 * r;
    return { c, r, color: r === bigR ? '#86efac' : '#bbf7d0' };
  });
  const lineY = centreY + bigR + 16;
  return {
    prompt: `Lá to có đường kính ${big} cm, lá nhỏ có đường kính ${small} cm. Các lá xếp khít thành một hàng từ A đến B. A cách B mấy xăng-ti-mét?`,
    ...numberOptions(rand, right, 1, right + 3),
    hint: 'Hàng có mấy lá to, mấy lá nhỏ? Em cộng đường kính của tất cả các lá.',
    solution: `${big} + ${big} + ${small} + ${small} = ${right} (cm).`,
    visual: {
      w: 320,
      h: 150,
      label: `Một hàng lá xếp khít từ A đến B: hai lá to đường kính ${big} xăng-ti-mét và hai lá nhỏ đường kính ${small} xăng-ti-mét.`,
      circles,
      lines: [{ a: { x: left, y: lineY }, b: { x: x, y: lineY } }],
      dots: [
        { at: { x: left, y: lineY }, name: 'A', nameAt: { x: left - 18, y: lineY } },
        { at: { x, y: lineY }, name: 'B', nameAt: { x: x + 18, y: lineY } },
      ],
    },
  };
}

/**
 * Painting some faces of a big cube made of 8 small ones.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function paintedCube(rand) {
  const faces = int(rand, 2, 6);
  const right = faces * 4;
  const scene = boxScene('lap-phuong', '');
  const { faces: drawn } = projectBox(SOLID_DIMS['lap-phuong'], START_VIEW, scene.w, scene.h);
  const half = (
    /** @type {{ x: number, y: number }} */ p,
    /** @type {{ x: number, y: number }} */ q,
  ) => ({
    x: (p.x + q.x) / 2,
    y: (p.y + q.y) / 2,
  });
  const inner = drawn
    .filter((f) => f.front)
    .flatMap(({ points: [p, q, s, t] }) => [
      { a: half(p, q), b: half(t, s) },
      { a: half(p, t), b: half(q, s) },
    ]);
  return {
    prompt: `Xếp 8 khối lập phương nhỏ thành một khối lập phương lớn. Sơn ${faces} mặt của khối lớn. Có mấy mặt của khối nhỏ được sơn?`,
    ...numberOptions(rand, right, 1, right + 3),
    hint: 'Mỗi mặt của khối lớn gồm mấy mặt của khối nhỏ? Em đếm trên hình.',
    solution: `Mỗi mặt của khối lớn gồm 4 mặt nhỏ. Số mặt nhỏ được sơn là 4 × ${faces} = ${right} (mặt).`,
    visual: {
      ...scene,
      label:
        'Khối lập phương lớn xếp từ 8 khối nhỏ. Mỗi mặt của nó chia thành 2 hàng, mỗi hàng 2 ô.',
      lines: [...(scene.lines ?? []), ...inner],
    },
  };
}

/** What each part of the round practises, in the order the review lists them. */
export const KIND_LABELS = /** @type {const} */ ({
  'trung-diem': 'Trung điểm của đoạn thẳng',
  'hinh-tron': 'Hình tròn',
  goc: 'Góc vuông, góc không vuông',
  hinh: 'Hình chữ nhật, hình vuông',
  khoi: 'Khối lập phương, khối hộp chữ nhật',
  'thuc-te': 'Bài toán thực tế',
});

/**
 * A round of twelve questions from the whole chapter on a seed.
 * @param {number} seed
 * @returns {(SceneQuestion & { kind: string })[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return [
    { kind: 'trung-diem', ...isMidpoint(rand, rand() < 0.5) },
    { kind: 'trung-diem', ...halfOf(rand) },
    { kind: 'goc', ...clockAngle(rand, rand() < 0.5) },
    { kind: 'hinh', ...nameShape(rand) },
    { kind: 'khoi', ...countSolidPart(rand) },
    { kind: 'thuc-te', ...leafRow(rand) },
    { kind: 'hinh-tron', ...findSegment(rand, rand() < 0.5 ? 'ban-kinh' : 'duong-kinh') },
    { kind: 'goc', ...countRightAngles(rand) },
    { kind: 'hinh', ...rectangleSide(rand) },
    { kind: 'khoi', ...nameSolid(rand) },
    { kind: 'thuc-te', ...circlesInSquare(rand) },
    { kind: 'thuc-te', ...paintedCube(rand) },
  ];
}
