/**
 * The mixed practice of the grade 4 chapter on angles: reading a
 * protractor, naming an angle by its measure or by its picture, the angle
 * between the hands of a clock, equal angles and two angles put side by
 * side. One round of eight questions in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import {
  KINDS,
  KIND_OPTIONS,
  NAME_SETS,
  angleName,
  clockAngle,
  degreeOptions,
  kindOf,
  kindWhy,
} from '../_shared/angle.js';
import { angleFigure, pairFigure } from '../_shared/figure.js';
import { drawMeasure, readingQuestion } from '../_shared/questions.js';

/** @typedef {import('../_shared/questions.js').Question} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-thuoc': 'Đọc thước đo góc',
  'theo-so-do': 'Gọi tên góc theo số đo',
  'theo-hinh': 'Nhận ra góc nhọn, góc tù, góc bẹt trên hình',
  'dong-ho': 'Góc tạo bởi hai kim đồng hồ',
  'bang-nhau': 'Tìm các góc bằng nhau',
  'ghep-goc': 'Số đo của hai góc ghép lại',
});

/**
 * The answer index of kind `kind` among `KIND_OPTIONS`.
 * @param {import('../_shared/angle.js').AngleKind} kind
 */
const kindAnswer = (kind) => KINDS.indexOf(kind);

/**
 * Naming an angle from its measure, drawn with the measure written on it.
 * @param {() => number} rand
 * @returns {Question}
 */
export function byMeasure(rand) {
  const m = pick(rand, [int(rand, 2, 17) * 5, int(rand, 19, 35) * 5, 90, 180]);
  const names = pick(rand, NAME_SETS);
  const [o, p, q] = names;
  return {
    prompt: `${capital(angleName(o, p, q))} có số đo ${m}°. Đó là góc gì?`,
    options: [...KIND_OPTIONS],
    answer: kindAnswer(kindOf(m)),
    hint: 'Em so sánh số đo với 90° (góc vuông) và 180° (góc bẹt).',
    solution: kindWhy(m),
    visual: {
      type: 'figure',
      figure: angleFigure(m, int(rand, 0, 7) * 15, names, { showMeasure: true }),
    },
  };
}

/** Measures that are easy to tell apart from a right angle by eye. */
const CLEAR = [25, 30, 45, 60, 90, 120, 135, 150, 180];

/**
 * A measure for a picture question, other than `avoid`.
 * @param {() => number} rand
 * @param {number} [avoid]
 */
export function clearMeasure(rand, avoid) {
  let m = pick(rand, CLEAR);
  while (m === avoid) m = pick(rand, CLEAR);
  return m;
}

/**
 * Naming an angle of measure `m` from its picture alone.
 * @param {() => number} rand
 * @param {number} m
 * @returns {Question}
 */
export function byPicture(rand, m) {
  const names = pick(rand, NAME_SETS);
  const [o, p, q] = names;
  return {
    prompt: `Em nhìn hình. ${capital(angleName(o, p, q))} là góc gì?`,
    options: [...KIND_OPTIONS],
    answer: kindAnswer(kindOf(m)),
    hint: 'Em tưởng tượng đặt góc vuông của ê ke vào đỉnh góc, một cạnh ê ke nằm trên một cạnh của góc. Cạnh kia của góc nằm trong hay ngoài ê ke?',
    solution: `${capital(angleName(o, p, q))} có số đo ${m}°. ${kindWhy(m)}`,
    visual: { type: 'figure', figure: angleFigure(m, int(rand, 0, 23) * 15, names) },
  };
}

/**
 * The kind of angle made by the hands of a clock at a whole hour.
 * @param {() => number} rand
 * @returns {Question}
 */
export function clockKind(rand) {
  const h = int(rand, 1, 11);
  const m = clockAngle(h);
  return {
    prompt: `Đồng hồ chỉ ${h} giờ. Hai kim đồng hồ tạo thành góc gì?`,
    options: [...KIND_OPTIONS],
    answer: kindAnswer(kindOf(m)),
    hint: 'Lúc 3 giờ và lúc 9 giờ hai kim tạo thành góc vuông. Lúc 6 giờ hai kim nằm trên một đường thẳng.',
    solution: `Lúc ${h} giờ, hai kim đồng hồ tạo thành góc ${m}°. ${kindWhy(m)}`,
    visual: { type: 'clock', minutes: h * 60 },
  };
}

/**
 * Four measured angles, two pairs of equal ones: which angle equals a given
 * one.
 * @param {() => number} rand
 * @returns {Question}
 */
export function equalAngles(rand) {
  const a = int(rand, 3, 17) * 5;
  const b = int(rand, 19, 34) * 5;
  const vertices = shuffle(rand, ['S', 'D', 'G', 'L']);
  const measures = shuffle(rand, [a, a, b, b]);
  const ask = int(rand, 0, 3);
  const twin = measures.findIndex((v, i) => i !== ask && v === measures[ask]);
  const list = vertices.map((v, i) => `góc đỉnh ${v} bằng ${measures[i]}°`).join(', ');
  const others = vertices.filter((_, i) => i !== ask).map((v) => `Góc đỉnh ${v}`);
  const { options, answer } = mixOptions(
    rand,
    `Góc đỉnh ${vertices[twin]}`,
    others.filter((o) => o !== `Góc đỉnh ${vertices[twin]}`),
  );
  return {
    prompt: `Đo được: ${list}. Góc nào bằng góc đỉnh ${vertices[ask]}?`,
    options,
    answer,
    hint: `Em tìm góc có cùng số đo với góc đỉnh ${vertices[ask]}.`,
    solution: `Góc đỉnh ${vertices[ask]} và góc đỉnh ${vertices[twin]} đều bằng ${measures[ask]}°, nên hai góc bằng nhau.`,
    visual: { type: 'none' },
  };
}

/**
 * Two angles with a shared side: the measure of the angle they make together.
 * @param {() => number} rand
 * @returns {Question}
 */
export function joinedAngles(rand) {
  const a = int(rand, 2, 9) * 10;
  const b = int(rand, 2, (180 - a) / 10 - 1) * 10;
  const sum = a + b;
  return {
    prompt: `Góc đỉnh O; cạnh OM, ON bằng ${a}°. Góc đỉnh O; cạnh ON, OP bằng ${b}°. Góc đỉnh O; cạnh OM, OP bằng bao nhiêu độ?`,
    ...degreeOptions(sum),
    hint: 'Góc đỉnh O; cạnh OM, OP gồm cả hai góc nhỏ ghép lại.',
    solution: `Góc đỉnh O; cạnh OM, OP gồm hai góc ghép lại: ${a}° + ${b}° = ${sum}°.`,
    visual: { type: 'figure', figure: pairFigure(a, b) },
  };
}

/**
 * First letter in upper case.
 * @param {string} text
 */
function capital(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * A round of eight questions, shuffled: a protractor reading with the side
 * on the right and one with it on the left, an angle named from its
 * measure, two from their pictures, a clock, equal angles and two angles put
 * together.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const p1 = clearMeasure(rand);
  const p2 = clearMeasure(rand, p1);
  /** @type {Question[]} */
  const round = [
    { ...readingQuestion(rand, 'phai', drawMeasure(rand)), kind: 'doc-thuoc' },
    { ...readingQuestion(rand, 'trai', drawMeasure(rand)), kind: 'doc-thuoc' },
    { ...byMeasure(rand), kind: 'theo-so-do' },
    { ...byPicture(rand, p1), kind: 'theo-hinh' },
    { ...byPicture(rand, p2), kind: 'theo-hinh' },
    { ...clockKind(rand), kind: 'dong-ho' },
    { ...equalAngles(rand), kind: 'bang-nhau' },
    { ...joinedAngles(rand), kind: 'ghep-goc' },
  ];
  return shuffle(rand, round);
}
