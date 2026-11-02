/**
 * Word problems solved in two steps, the way the book sets them: one quantity
 * is given, a second is compared with it (times, divided down, more or fewer),
 * and the question asks for both together. Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';

/** @typedef {'gap' | 'giam' | 'hon' | 'kem'} Relation */

/**
 * A word problem with its numbers filled in.
 * @typedef {object} Story
 * @property {Relation} rel how the second quantity compares with the first
 * @property {number} a the given quantity
 * @property {number} k the number in the comparison
 * @property {number} second the quantity found in step 1
 * @property {number} total the answer, found in step 2
 * @property {string} unit written after a number in a calculation ("l")
 * @property {string} answerUnit written after the answer ("l nước mắm")
 * @property {string} thing what is counted ("lít nước mắm")
 * @property {string} first who holds the given quantity ("Can thứ nhất")
 * @property {string} other who holds the second quantity ("Can thứ hai")
 * @property {string} both the two together ("Cả hai can")
 * @property {string} otherMid `other` in the middle of a sentence
 * @property {string} bothMid `both` in the middle of a sentence
 * @property {string} verb "đựng", "dài", "gấp được"…
 * @property {string} link the comparison after `other` ("đựng gấp 3 lần can thứ nhất")
 * @property {string} given the sentences of the problem, without the question
 * @property {string} text the whole problem
 */

/**
 * @typedef {object} Scene
 * @property {Relation} rel
 * @property {[number, number][]} pairs values of `a` and `k`; the first is the book's
 * @property {string} unit
 * @property {string} answerUnit
 * @property {string} thing
 * @property {string} first
 * @property {string} other
 * @property {string} both
 * @property {string} verb
 * @property {boolean} [named] `other` is a person's name, which keeps its capital
 * @property {(k: number) => string} link
 * @property {(a: number, k: number) => string} given
 */

/** @type {Readonly<Record<Relation, { op: string, word: string }>>} */
const RELATIONS = {
  gap: { op: '×', word: 'nhân' },
  giam: { op: ':', word: 'chia' },
  hon: { op: '+', word: 'cộng' },
  kem: { op: '−', word: 'trừ' },
};

/** @type {readonly Scene[]} */
export const SCENES = [
  {
    rel: 'gap',
    pairs: [
      [5, 3],
      [6, 3],
      [4, 5],
      [7, 2],
    ],
    unit: 'l',
    answerUnit: 'l nước mắm',
    thing: 'lít nước mắm',
    first: 'Can thứ nhất',
    other: 'Can thứ hai',
    both: 'Cả hai can',
    verb: 'đựng',
    link: (k) => `đựng gấp ${k} lần can thứ nhất`,
    given: (a, k) =>
      `Can thứ nhất đựng ${a} l nước mắm. Can thứ hai đựng số lít nước mắm gấp ${k} lần can thứ nhất.`,
  },
  {
    rel: 'kem',
    pairs: [
      [10, 3],
      [12, 4],
      [15, 5],
      [14, 6],
    ],
    unit: 'cái',
    answerUnit: 'cái thuyền',
    thing: 'cái thuyền',
    first: 'Mai',
    other: 'Nam',
    named: true,
    both: 'Cả hai bạn',
    verb: 'gấp được',
    link: (k) => `gấp được ít hơn Mai ${k} cái`,
    given: (a, k) => `Mai gấp được ${a} cái thuyền. Nam gấp được ít hơn Mai ${k} cái thuyền.`,
  },
  {
    rel: 'kem',
    pairs: [
      [10, 4],
      [16, 5],
      [20, 6],
      [13, 2],
    ],
    unit: 'máy tính',
    answerUnit: 'máy tính',
    thing: 'máy tính',
    first: 'Buổi sáng',
    other: 'Buổi chiều',
    both: 'Cả hai buổi',
    verb: 'bán được',
    link: (k) => `bán được ít hơn buổi sáng ${k} máy tính`,
    given: (a, k) =>
      `Buổi sáng cửa hàng bán được ${a} máy tính. Buổi chiều bán được ít hơn buổi sáng ${k} máy tính.`,
  },
  {
    rel: 'gap',
    pairs: [
      [9, 2],
      [8, 3],
      [6, 4],
      [12, 2],
    ],
    unit: 'cm',
    answerUnit: 'cm',
    thing: 'xăng-ti-mét',
    first: 'Đoạn thẳng AB',
    other: 'Đoạn thẳng BC',
    both: 'Đường gấp khúc ABC',
    verb: 'dài',
    link: (k) => `dài gấp ${k} lần đoạn thẳng AB`,
    given: (a, k) =>
      `Đường gấp khúc ABC có đoạn thẳng AB dài ${a} cm. Đoạn thẳng BC dài gấp ${k} lần đoạn thẳng AB.`,
  },
  {
    rel: 'hon',
    pairs: [
      [30, 10],
      [25, 15],
      [40, 6],
      [35, 10],
    ],
    unit: 'kg',
    answerUnit: 'kg',
    thing: 'ki-lô-gam',
    first: 'Bao ngô',
    other: 'Bao gạo',
    both: 'Cả hai bao',
    verb: 'nặng',
    link: (k) => `nặng hơn bao ngô ${k} kg`,
    given: (a, k) => `Bao ngô nặng ${a} kg. Bao gạo nặng hơn bao ngô ${k} kg.`,
  },
  {
    rel: 'giam',
    pairs: [
      [30, 2],
      [36, 3],
      [48, 4],
      [24, 2],
    ],
    unit: 'kg',
    answerUnit: 'kg gạo',
    thing: 'ki-lô-gam gạo',
    first: 'Buổi sáng',
    other: 'Buổi chiều',
    both: 'Cả hai buổi',
    verb: 'bán được',
    link: (k) => `bán được số gạo giảm đi ${k} lần so với buổi sáng`,
    given: (a, k) =>
      `Buổi sáng cửa hàng bán được ${a} kg gạo. Buổi chiều bán được số gạo giảm đi ${k} lần so với buổi sáng.`,
  },
  {
    rel: 'hon',
    pairs: [
      [30, 5],
      [24, 6],
      [28, 7],
      [35, 8],
    ],
    unit: 'cây',
    answerUnit: 'cây',
    thing: 'cây',
    first: 'Lớp 3A',
    other: 'Lớp 3B',
    both: 'Cả hai lớp',
    verb: 'trồng được',
    link: (k) => `trồng được nhiều hơn lớp 3A ${k} cây`,
    given: (a, k) => `Lớp 3A trồng được ${a} cây. Lớp 3B trồng được nhiều hơn lớp 3A ${k} cây.`,
  },
  {
    rel: 'gap',
    pairs: [
      [8, 4],
      [6, 3],
      [9, 2],
      [7, 5],
    ],
    unit: 'con',
    answerUnit: 'con cá',
    thing: 'con cá',
    first: 'Bể thứ nhất',
    other: 'Bể thứ hai',
    both: 'Cả hai bể',
    verb: 'có',
    link: (k) => `có số cá gấp ${k} lần bể thứ nhất`,
    given: (a, k) => `Bể thứ nhất có ${a} con cá. Bể thứ hai có số cá gấp ${k} lần bể thứ nhất.`,
  },
  {
    rel: 'giam',
    pairs: [
      [40, 5],
      [45, 3],
      [36, 4],
      [28, 2],
    ],
    unit: 'l',
    answerUnit: 'l nước',
    thing: 'lít nước',
    first: 'Thùng to',
    other: 'Thùng bé',
    both: 'Cả hai thùng',
    verb: 'có',
    link: (k) => `có số nước giảm đi ${k} lần so với thùng to`,
    given: (a, k) =>
      `Thùng to có ${a} l nước. Thùng bé có số nước giảm đi ${k} lần so với thùng to.`,
  },
];

/**
 * The result of the comparison.
 * @param {Relation} rel
 * @param {number} a
 * @param {number} k
 */
export function compared(rel, a, k) {
  if (rel === 'gap') return a * k;
  if (rel === 'giam') return a / k;
  return rel === 'hon' ? a + k : a - k;
}

/**
 * A sentence opening moved to the middle of a sentence.
 * @param {string} text
 */
const midSentence = (text) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;

/**
 * A scene with one of its pairs of numbers.
 * @param {Scene} scene
 * @param {[number, number]} [pair] the book's numbers when left out
 * @returns {Story}
 */
export function makeStory(scene, pair = scene.pairs[0]) {
  const [a, k] = pair;
  const { rel, unit, answerUnit, thing, first, other, both, verb } = scene;
  const second = compared(rel, a, k);
  const given = scene.given(a, k);
  const bothMid = midSentence(both);
  const question = `Hỏi ${bothMid} ${verb} bao nhiêu ${thing}?`;
  return {
    rel,
    a,
    k,
    second,
    total: a + second,
    unit,
    answerUnit,
    thing,
    first,
    other,
    both,
    otherMid: scene.named ? other : midSentence(other),
    bothMid,
    verb,
    link: scene.link(k),
    given,
    text: `${given} ${question}`,
  };
}

/**
 * A story from every scene, in a mixed order, each with a drawn pair.
 * @param {() => number} rand
 * @returns {Story[]}
 */
export function drawStories(rand) {
  return shuffle(rand, SCENES).map((scene) => makeStory(scene, pick(rand, scene.pairs)));
}

/**
 * The question of step 1, as a sentence without its question mark.
 * @param {Story} s
 */
export const firstAsk = (s) => `${s.other} ${s.verb} bao nhiêu ${s.thing}`;

/**
 * The question of step 2, as a sentence without its question mark.
 * @param {Story} s
 */
export const totalAsk = (s) => `${s.both} ${s.verb} bao nhiêu ${s.thing}`;

/**
 * The question of step 1 in the middle of a sentence.
 * @param {Story} s
 */
export const firstAskMid = (s) => `${s.otherMid} ${s.verb} bao nhiêu ${s.thing}`;

/**
 * The question of step 2 in the middle of a sentence.
 * @param {Story} s
 */
export const totalAskMid = (s) => `${s.bothMid} ${s.verb} bao nhiêu ${s.thing}`;

/**
 * The calculation of step 1 ("5 × 3").
 * @param {Story} s
 */
export const firstCalc = (s) => `${s.a} ${RELATIONS[s.rel].op} ${s.k}`;

/**
 * The calculation of step 2 ("5 + 15").
 * @param {Story} s
 */
export const totalCalc = (s) => `${s.a} + ${s.second}`;

/**
 * Why step 1 uses its operation.
 * @param {Story} s
 */
export const firstReason = (s) => `${s.other} ${s.link}: em làm phép ${RELATIONS[s.rel].word}.`;

/**
 * The solution as the book writes it, one step at a time.
 * @param {Story} s
 * @returns {{ title: string, line: string }[]}
 */
export function solutionSteps(s) {
  return [
    {
      title: `${s.other} ${s.verb} số ${s.thing} là:`,
      line: `${firstCalc(s)} = ${s.second} (${s.unit})`,
    },
    {
      title: `${s.both} ${s.verb} số ${s.thing} là:`,
      line: `${totalCalc(s)} = ${s.total} (${s.unit})`,
    },
  ];
}

/**
 * The closing line of the solution.
 * @param {Story} s
 */
export const answerLine = (s) => `Đáp số: ${s.total} ${s.answerUnit}.`;

/**
 * A calculation as a screen reader says it.
 * @param {string} calc
 */
export const spoken = (calc) =>
  calc.replace('×', 'nhân').replace(':', 'chia').replace('+', 'cộng').replace('−', 'trừ');

/**
 * A fixed mix of `options` for a story, the same on the server and the browser.
 * @param {Story} s
 * @param {string[]} options
 * @param {string} right
 * @returns {{ options: string[], answer: number }}
 */
function mixed(s, options, right) {
  const out = shuffle(rng(s.a * 101 + s.k), options);
  return { options: out, answer: out.indexOf(right) };
}

/**
 * Tap the thing to find first: the missing quantity, not the one already given.
 * @param {Story} s
 */
export function needOptions(s) {
  const right = firstAsk(s);
  return mixed(s, [right, `${s.first} ${s.verb} bao nhiêu ${s.thing}`], right);
}

/**
 * Tap the calculation of step 1 among the four operations on the same numbers;
 * a division that does not come out even and a subtraction below zero stay out.
 * @param {Story} s
 */
export function firstOptions(s) {
  const { a, k } = s;
  const all = [`${a} × ${k}`, `${a} + ${k}`];
  if (a > k) all.push(`${a} − ${k}`);
  if (a % k === 0) all.push(`${a} : ${k}`);
  return mixed(s, all, firstCalc(s));
}

/**
 * Tap the calculation of step 2: together means adding.
 * @param {Story} s
 */
export function totalOptions(s) {
  const { a, second } = s;
  const big = Math.max(a, second);
  const small = Math.min(a, second);
  return mixed(s, [totalCalc(s), `${big} − ${small}`, `${a} × ${second}`], totalCalc(s));
}

/**
 * The picture of the second quantity as paper-strip pieces, drawn on a scale
 * shared with the first. Its value shows only once `known`.
 * @param {Story} s
 * @param {boolean} known
 * @returns {{ size: number, tone: import('./strip.js').StripTone, text?: string }[]}
 */
export function secondParts(s, known) {
  const value = known ? String(s.second) : '?';
  const { a, k, second } = s;
  if (s.rel === 'gap') {
    return Array.from({ length: k }, () => ({
      size: a,
      tone: /** @type {const} */ ('copy'),
      text: String(a),
    }));
  }
  if (s.rel === 'hon') {
    return [
      { size: a, tone: 'copy', text: String(a) },
      { size: k, tone: 'plus', text: String(k) },
    ];
  }
  if (s.rel === 'kem') {
    return [
      { size: second, tone: 'copy', text: value },
      { size: k, tone: 'faded', text: String(k) },
    ];
  }
  return [
    { size: second, tone: 'copy', text: value },
    ...Array.from({ length: k - 1 }, () => ({
      size: second,
      tone: /** @type {const} */ ('faded'),
    })),
  ];
}

/**
 * What a screen reader hears for the second strip, without the unknown value.
 * @param {Story} s
 * @param {boolean} known
 */
export function secondLabel(s, known) {
  const end = known ? `, được ${s.second} ${s.unit}` : '';
  return `${s.other} ${s.link}${end}`;
}
