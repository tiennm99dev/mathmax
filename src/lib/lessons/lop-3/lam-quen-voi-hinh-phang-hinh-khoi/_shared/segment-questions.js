/**
 * Kid questions on the point between two points and the midpoint of a segment,
 * each with its picture. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';

/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Scene>} SceneQuestion */

const W = 320;
const LEFT = 28;
const RIGHT = W - 28;
const LINE_Y = 60;

/** The answers of a yes-or-no question, always in this order. */
const YES_NO = ['Có', 'Không'];

/** End points and a middle point of a segment. */
const NAMES = /** @type {const} */ ([
  ['A', 'M', 'B'],
  ['C', 'I', 'D'],
  ['P', 'O', 'Q'],
  ['E', 'K', 'G'],
]);

/**
 * A straight segment cut into `parts` equal pieces: the x of each cut.
 * @param {number} parts
 * @param {number} i
 */
const cutX = (parts, i) => LEFT + ((RIGHT - LEFT) * i) / parts;

/**
 * A named point on the line.
 * @param {string} name
 * @param {number} x
 */
const onLine = (name, x) => ({
  at: { x, y: LINE_Y },
  name,
  nameAt: { x, y: LINE_Y - 24 },
});

/**
 * Whether M, with both lengths written, is the midpoint of AB.
 * @param {() => number} rand
 * @param {boolean} yes
 * @returns {SceneQuestion}
 */
export function isMidpoint(rand, yes) {
  const [a, m, b] = pick(rand, NAMES);
  const total = pick(rand, [6, 8, 10, 12]);
  const left = yes ? total / 2 : pick(rand, [total / 2 - 1, total / 2 + 1, total / 2 - 2]);
  const right = total - left;
  const x = LEFT + ((RIGHT - LEFT) * left) / total;
  return {
    prompt: `${m} là điểm ở giữa hai điểm ${a} và ${b}. ${m} có là trung điểm của đoạn thẳng ${a}${b} không?`,
    options: YES_NO,
    answer: yes ? 0 : 1,
    hint: `So sánh độ dài hai đoạn thẳng ${a}${m} và ${m}${b}.`,
    solution: yes
      ? `${a}${m} = ${m}${b} = ${left} cm, nên ${m} là trung điểm của đoạn thẳng ${a}${b}.`
      : `${a}${m} = ${left} cm, ${m}${b} = ${right} cm. Hai độ dài khác nhau, nên ${m} không là trung điểm của đoạn thẳng ${a}${b}.`,
    visual: {
      w: W,
      h: 110,
      label: `Đoạn thẳng ${a}${b}, điểm ${m} ở giữa. ${a}${m} dài ${left} xăng-ti-mét, ${m}${b} dài ${right} xăng-ti-mét.`,
      lines: [{ a: { x: LEFT, y: LINE_Y }, b: { x: RIGHT, y: LINE_Y } }],
      dots: [onLine(a, LEFT), onLine(m, x), onLine(b, RIGHT)],
      texts: [
        { x: (LEFT + x) / 2, y: LINE_Y + 26, text: `${left} cm` },
        { x: (x + RIGHT) / 2, y: LINE_Y + 26, text: `${right} cm` },
      ],
    },
  };
}

/**
 * Which of three named points on a segment cut into equal pieces is its midpoint.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function findMidpoint(rand) {
  const parts = pick(rand, [4, 6]);
  const middle = parts / 2;
  const others = shuffle(
    rand,
    Array.from({ length: parts - 1 }, (_, i) => i + 1).filter((i) => i !== middle),
  ).slice(0, 2);
  const stops = [middle, ...others].sort((p, q) => p - q);
  const names = shuffle(rand, ['M', 'N', 'K']);
  const midName = names[stops.indexOf(middle)];
  const ticks = Array.from({ length: parts + 1 }, (_, i) => cutX(parts, i));
  return {
    prompt: 'Các vạch chia đoạn thẳng AB thành các phần bằng nhau. Điểm nào là trung điểm của AB?',
    ...mixOptions(
      rand,
      midName,
      names.filter((n) => n !== midName),
    ),
    hint: 'Đếm số phần từ điểm đó đến A và đến B. Hai số phải bằng nhau.',
    solution: `Từ ${midName} đến A và đến B đều có ${middle} phần, nên ${midName} là trung điểm của đoạn thẳng AB.`,
    visual: {
      w: W,
      h: 100,
      label: `Đoạn thẳng AB chia thành ${parts} phần bằng nhau. ${stops.map((s, i) => `Điểm ${names[i]} cách A ${s} phần`).join(', ')}.`,
      lines: [
        { a: { x: LEFT, y: LINE_Y }, b: { x: RIGHT, y: LINE_Y } },
        ...ticks.map((x) => ({
          a: { x, y: LINE_Y - 7 },
          b: { x, y: LINE_Y + 7 },
          width: 2,
        })),
      ],
      dots: [
        onLine('A', LEFT),
        onLine('B', RIGHT),
        ...stops.map((s, i) => onLine(names[i], cutX(parts, s))),
      ],
    },
  };
}

/**
 * Whether O lies between A and B: on the segment, off the line, or on the line
 * but beyond an end.
 * @param {() => number} rand
 * @param {'giua' | 'lech' | 'ngoai'} where
 * @returns {SceneQuestion}
 */
export function isBetween(rand, where) {
  const ax = 40;
  const bx = where === 'ngoai' ? 200 : 280;
  const x = where === 'ngoai' ? 280 : int(rand, 110, 210);
  const y = where === 'lech' ? 28 : 80;
  const texts = {
    giua: 'A, O, B thẳng hàng và O nằm giữa A và B, nên O là điểm ở giữa hai điểm A và B.',
    lech: 'A, O, B không thẳng hàng, nên O không phải là điểm ở giữa hai điểm A và B.',
    ngoai:
      'A, B, O thẳng hàng nhưng O nằm ngoài đoạn thẳng AB, nên O không phải là điểm ở giữa hai điểm A và B.',
  };
  const placed = {
    giua: 'O nằm trên đoạn thẳng AB',
    lech: 'O nằm phía trên đoạn thẳng AB',
    ngoai: 'O nằm bên phải điểm B, trên cùng một đường thẳng',
  };
  return {
    prompt: 'O có là điểm ở giữa hai điểm A và B không?',
    options: YES_NO,
    answer: where === 'giua' ? 0 : 1,
    hint: 'Ba điểm phải thẳng hàng, và O phải nằm giữa A và B.',
    solution: texts[where],
    visual: {
      w: W,
      h: 120,
      label: `Hai điểm A và B, ${placed[where]}.`,
      lines: [{ a: { x: ax, y: 80 }, b: { x: bx, y: 80 } }],
      dots: [
        { at: { x: ax, y: 80 }, name: 'A', nameAt: { x: ax, y: 104 } },
        { at: { x: bx, y: 80 }, name: 'B', nameAt: { x: bx, y: 104 } },
        {
          at: { x, y },
          name: 'O',
          color: '#e11d48',
          nameAt: where === 'lech' ? { x: x + 20, y } : { x, y: y + 24 },
        },
      ],
    },
  };
}

/**
 * A segment with M as its midpoint and one length written.
 * @param {string} written
 * @param {string} label
 * @param {boolean} wholeSegment whether the text goes under the whole segment
 * @returns {Scene}
 */
function midScene(written, label, wholeSegment) {
  const mid = (LEFT + RIGHT) / 2;
  return {
    w: W,
    h: 110,
    label,
    lines: [{ a: { x: LEFT, y: LINE_Y }, b: { x: RIGHT, y: LINE_Y } }],
    dots: [onLine('A', LEFT), onLine('M', mid), onLine('B', RIGHT)],
    texts: [{ x: wholeSegment ? mid : (LEFT + mid) / 2, y: LINE_Y + 26, text: written }],
  };
}

/**
 * The length from the midpoint to an end, from the whole segment.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function halfOf(rand) {
  const half = int(rand, 3, 9);
  const whole = half * 2;
  return {
    prompt: `M là trung điểm của đoạn thẳng AB. AB dài ${whole} cm. AM dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, half, 1, whole),
    hint: 'AM và MB dài bằng nhau. Hai đoạn ấy ghép lại thành AB.',
    solution: `${whole} : 2 = ${half}. AM dài ${half} cm.`,
    visual: midScene(
      `AB = ${whole} cm`,
      `Đoạn thẳng AB dài ${whole} xăng-ti-mét, M là trung điểm.`,
      true,
    ),
  };
}

/**
 * The whole segment, from the length from the midpoint to an end.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function doubleOf(rand) {
  const half = int(rand, 3, 9);
  const whole = half * 2;
  return {
    prompt: `M là trung điểm của đoạn thẳng AB. AM dài ${half} cm. AB dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, whole, half, whole + 3),
    hint: 'MB dài bằng AM. AB gồm cả hai đoạn ấy.',
    solution: `${half} × 2 = ${whole}. AB dài ${whole} cm.`,
    visual: midScene(
      `${half} cm`,
      `M là trung điểm của đoạn thẳng AB, AM dài ${half} xăng-ti-mét.`,
      false,
    ),
  };
}

/**
 * How many more hops take a grasshopper to the midpoint.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function hopsToMiddle(rand) {
  const [parts, done] = pick(rand, [
    [6, 1],
    [6, 2],
    [10, 1],
    [10, 2],
    [10, 3],
    [12, 2],
    [12, 3],
    [12, 4],
  ]);
  const left = parts / 2 - done;
  const y = 70;
  const ticks = Array.from({ length: parts + 1 }, (_, i) => cutX(parts, i));
  return {
    prompt: `Đoạn thẳng AB dài ${parts} bước nhảy. Cào cào đã nhảy ${done} bước từ A. Cào cào cần nhảy thêm mấy bước để đến trung điểm của AB?`,
    ...numberOptions(rand, left, 1, parts / 2 + 1),
    hint: 'Từ A đến trung điểm là một nửa số bước của cả đoạn thẳng.',
    solution: `Từ A đến trung điểm có ${parts} : 2 = ${parts / 2} bước. Cào cào cần nhảy thêm ${parts / 2} − ${done} = ${left} bước.`,
    visual: {
      w: W,
      h: 110,
      label: `Đoạn thẳng AB chia thành ${parts} bước nhảy bằng nhau, cào cào đang ở vạch thứ ${done} tính từ A.`,
      lines: [
        { a: { x: LEFT, y }, b: { x: RIGHT, y } },
        ...ticks.map((x) => ({ a: { x, y: y - 6 }, b: { x, y: y + 6 }, width: 2 })),
      ],
      hops: Array.from({ length: done }, (_, i) => ({
        a: { x: cutX(parts, i), y },
        b: { x: cutX(parts, i + 1), y },
      })),
      dots: [
        { at: { x: LEFT, y }, name: 'A', nameAt: { x: LEFT, y: y + 24 } },
        { at: { x: RIGHT, y }, name: 'B', nameAt: { x: RIGHT, y: y + 24 } },
        { at: { x: cutX(parts, done), y }, color: '#16a34a' },
      ],
    },
  };
}
