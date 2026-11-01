/**
 * Word problems about adding and taking away (bài toán về thêm, bớt một số
 * đơn vị): picture stories within 20 whose subtractions never cross ten,
 * with the solution set out the book's way: "Số bông hoa có tất cả là:
 * 9 + 6 = 15 (bông). Đáp số: 15 bông hoa." Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { MINUS } from '#lib/core/number-format.js';

/**
 * One kind of story: the picture, what is counted, the unit written in the
 * solution, and the sentences of the story.
 * @typedef {object} Thing
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} name what is counted ("bông hoa")
 * @property {string} unit unit in the solution ("bông")
 * @property {(a: number) => string} start
 * @property {(b: number) => string} add
 * @property {(b: number) => string} take
 */

/** @type {readonly Thing[]} */
export const THINGS = [
  {
    picture: 'chick',
    name: 'con gà con',
    unit: 'con',
    start: (a) => `Trên sân có ${a} con gà con.`,
    add: (b) => `Có thêm ${b} con gà con chạy tới.`,
    take: (b) => `${b} con gà con chạy vào chuồng.`,
  },
  {
    picture: 'flower',
    name: 'bông hoa',
    unit: 'bông',
    start: (a) => `Lọ hoa có ${a} bông hoa.`,
    add: (b) => `Việt cắm thêm ${b} bông hoa.`,
    take: (b) => `Mai lấy ra ${b} bông hoa.`,
  },
  {
    picture: 'fish',
    name: 'con cá',
    unit: 'con',
    start: (a) => `Trong bể có ${a} con cá.`,
    add: (b) => `Bố thả thêm ${b} con cá vào bể.`,
    take: (b) => `Bố vớt ${b} con cá sang bể khác.`,
  },
  {
    picture: 'balloon',
    name: 'quả bóng bay',
    unit: 'quả',
    start: (a) => `Lan có ${a} quả bóng bay.`,
    add: (b) => `Mẹ mua thêm cho Lan ${b} quả bóng bay.`,
    take: (b) => `${b} quả bóng bay bị gió thổi bay mất.`,
  },
  {
    picture: 'apple',
    name: 'quả táo',
    unit: 'quả',
    start: (a) => `Trên đĩa có ${a} quả táo.`,
    add: (b) => `Mẹ để thêm ${b} quả táo.`,
    take: (b) => `Cả nhà đã ăn ${b} quả táo.`,
  },
  {
    picture: 'butterfly',
    name: 'con bướm',
    unit: 'con',
    start: (a) => `Trong vườn có ${a} con bướm.`,
    add: (b) => `Có thêm ${b} con bướm bay đến.`,
    take: (b) => `${b} con bướm bay đi.`,
  },
];

/**
 * A story: which thing, adding (`them`) or taking away (`bot`), the number
 * at the start and the number that comes or goes.
 * @typedef {{ thing: number, kind: 'them' | 'bot', a: number, b: number }} Story
 */

/**
 * The answer of a story.
 * @param {Story} s
 */
export function result(s) {
  return s.kind === 'them' ? s.a + s.b : s.a - s.b;
}

/**
 * The sentences of a story: its start, the change and the question.
 * @param {Story} s
 */
export function storyText(s) {
  const t = THINGS[s.thing];
  return {
    start: t.start(s.a),
    change: s.kind === 'them' ? t.add(s.b) : t.take(s.b),
    question:
      s.kind === 'them' ? `Hỏi có tất cả bao nhiêu ${t.name}?` : `Hỏi còn lại bao nhiêu ${t.name}?`,
  };
}

/**
 * The solution (bài giải) as the book sets it out: the sentence, the
 * calculation with its unit in brackets, and the answer.
 * @param {Story} s
 * @returns {string[]}
 */
export function solutionLines(s) {
  const t = THINGS[s.thing];
  const c = result(s);
  return s.kind === 'them'
    ? [
        `Số ${t.name} có tất cả là:`,
        `${s.a} + ${s.b} = ${c} (${t.unit})`,
        `Đáp số: ${c} ${t.name}.`,
      ]
    : [
        `Số ${t.name} còn lại là:`,
        `${s.a} ${MINUS} ${s.b} = ${c} (${t.unit})`,
        `Đáp số: ${c} ${t.name}.`,
      ];
}

/**
 * A new story, about another thing than the last one: adding stays within
 * 20, taking away never crosses ten (from 15 take at most 5). Without a
 * `kind` it switches between adding and taking away, starting with adding.
 * @param {() => number} rand
 * @param {Story} [previous]
 * @param {Story['kind']} [kind]
 * @returns {Story}
 */
export function newStory(rand, previous, kind) {
  const next = kind ?? (previous?.kind === 'them' ? 'bot' : 'them');
  for (let i = 0; i < 40; i++) {
    const thing = int(rand, 0, THINGS.length - 1);
    let a;
    let b;
    if (next === 'them') {
      a = int(rand, 3, 12);
      b = int(rand, 2, Math.min(8, 20 - a));
    } else {
      a = int(rand, 5, 19);
      const most = Math.min(8, a <= 10 ? a - 1 : a - 10);
      if (most < 2) continue;
      b = int(rand, 2, most);
    }
    if (!previous || thing !== previous.thing) return { thing, kind: next, a, b };
  }
  return next === 'them'
    ? { thing: 1, kind: 'them', a: 9, b: 6 }
    : { thing: 0, kind: 'bot', a: 15, b: 4 };
}
