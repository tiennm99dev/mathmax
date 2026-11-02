/**
 * The mixed practice round of "Luyện tập chung" for the chapter "Làm quen với
 * hình khối": naming solids, the form of everyday things, counting solids in
 * a picture, repeating patterns, the compartment with the largest result, and
 * word problems. Questions are built from a seed, so the first round is the
 * same on the server and in the browser. Pure and DOM-free.
 */
import { COLORS } from '#lib/core/kid/shapes.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions, questionKey } from '#lib/core/kid/quiz.js';
import {
  SOLID_KINDS,
  SOLID_NAMES,
  THINGS,
  solidTitle,
  stackTotal,
  thingSentence,
} from '../_shared/solids.js';

/** @typedef {import('../_shared/solids.js').SolidKind} SolidKind */
/**
 * What a question shows above its options.
 * @typedef {{ type: 'solid', kind: SolidKind, color: string, lying: boolean }
 *   | { type: 'thing', id: string, name: string }
 *   | { type: 'scene', items: SolidKind[] }
 *   | { type: 'pattern', items: Array<SolidKind | null> }
 *   | { type: 'cells', cells: Array<{ expr: string, value: number, kind: 'tru' | 'cau' }> }
 *   | { type: 'blocks', blocks: Array<{ kind: 'tru' | 'cau', kg: number }> }
 *   | { type: 'stack', rows: number }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/** @typedef {'nhan-khoi' | 'do-vat' | 'dem-khoi' | 'quy-luat' | 'phep-tinh' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'nhan-khoi',
  'do-vat',
  'dem-khoi',
  'quy-luat',
  'phep-tinh',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'nhan-khoi': 'Nhận dạng các khối',
  'do-vat': 'Đồ vật có dạng khối gì',
  'dem-khoi': 'Đếm các khối trong hình',
  'quy-luat': 'Tìm khối theo quy luật',
  'phep-tinh': 'Tính rồi tìm ô đúng',
  'bai-toan': 'Giải bài toán',
});

/** Every solid's name as an option. */
const ALL_NAMES = SOLID_KINDS.map(solidTitle);

/**
 * Naming a solid in a picture, or from what it looks like.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function solidQuestion(rand) {
  if (rand() < 0.3) {
    const kind = pick(rand, /** @type {const} */ (['tru', 'cau']));
    return {
      prompt:
        kind === 'tru'
          ? 'Khối nào có hai mặt tròn phẳng ở hai đầu?'
          : 'Khối nào tròn đều về mọi phía, không có mặt phẳng?',
      ...mixOptions(rand, solidTitle(kind), ALL_NAMES),
      hint: 'Em nhớ lại lúc xoay các khối. Khối nào có mặt phẳng, khối nào không?',
      solution:
        kind === 'tru'
          ? 'Khối trụ có hai mặt tròn phẳng ở hai đầu và một mặt cong.'
          : 'Khối cầu tròn đều về mọi phía và không có mặt phẳng.',
    };
  }
  const kind = pick(rand, ['tru', 'tru', 'cau', 'cau', 'hop-chu-nhat', 'lap-phuong']);
  const solid = /** @type {SolidKind} */ (kind);
  return {
    prompt: 'Đây là khối gì?',
    visual: {
      type: 'solid',
      kind: solid,
      color: pick(rand, COLORS),
      lying: solid === 'tru' && rand() < 0.5,
    },
    ...mixOptions(rand, solidTitle(solid), ALL_NAMES),
    hint: 'Khối này có mặt phẳng không? Mặt của nó là hình gì?',
    solution: `Đây là ${SOLID_NAMES[solid]}. Đứng hay nằm, màu gì thì khối cũng không đổi tên.`,
  };
}

/**
 * Which form a thing has, or which thing has a form.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function thingQuestion(rand) {
  if (rand() < 0.5) {
    const thing = pick(rand, THINGS);
    return {
      prompt: `${thing.name[0].toUpperCase()}${thing.name.slice(1)} có dạng khối gì?`,
      visual: { type: 'thing', id: thing.id, name: thing.name },
      ...mixOptions(rand, solidTitle(thing.kind), ALL_NAMES),
      hint: 'Em nhìn hình dạng của vật, không nhìn màu sắc.',
      solution: thingSentence(thing),
    };
  }
  const kind = pick(rand, /** @type {const} */ (['tru', 'cau']));
  const right = pick(
    rand,
    THINGS.filter((t) => t.kind === kind),
  );
  const others = shuffle(
    rand,
    THINGS.filter((t) => t.kind !== kind),
  ).slice(0, 3);
  const things = shuffle(rand, [right, ...others]);
  return {
    prompt: `Vật nào có dạng ${SOLID_NAMES[kind]}?`,
    options: things.map((t) => ({ label: t.name, thing: t.id })),
    answer: things.indexOf(right),
    hint:
      kind === 'tru' ? 'Tìm vật có hai mặt tròn phẳng ở hai đầu.' : 'Tìm vật tròn đều về mọi phía.',
    solution: thingSentence(right),
  };
}

/**
 * How many of one solid a mixed picture has.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function countQuestion(rand) {
  const target = pick(rand, /** @type {const} */ (['tru', 'cau', 'hop-chu-nhat']));
  const others = SOLID_KINDS.filter((k) => k !== target);
  const count = int(rand, 2, 6);
  const rest = int(rand, 3, 5);
  const items = shuffle(rand, [
    ...Array.from({ length: count }, () => target),
    ...Array.from({ length: rest }, () => pick(rand, others)),
  ]);
  const name = SOLID_NAMES[target];
  return {
    prompt: `Trong hình có bao nhiêu ${name}?`,
    visual: { type: 'scene', items },
    ...numberOptions(rand, count, 0, 10),
    hint: `Em chỉ tay vào từng ${name} và đếm. Đừng đếm nhầm sang khối khác.`,
    solution: `Trong hình có ${count} ${name}.`,
  };
}

/**
 * The solid that fills the gap in a repeating row.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function patternQuestion(rand) {
  const size = int(rand, 2, 4);
  const cycle = shuffle(rand, [...SOLID_KINDS]).slice(0, size);
  const length = size * 2 + 1;
  // The gap sits after one whole cycle, so the rule can be read off the row.
  const gap = int(rand, size, length - 1);
  const items = Array.from({ length }, (_, i) => (i === gap ? null : cycle[i % size]));
  const right = cycle[gap % size];
  const names = cycle.map((k) => SOLID_NAMES[k]).join(', ');
  const wrong = SOLID_KINDS.filter((k) => k !== right);
  const { options, answer } = mixOptions(rand, right, [...wrong]);
  return {
    prompt: 'Khối nào thay vào dấu hỏi?',
    visual: { type: 'pattern', items },
    options: options.map((k) => ({
      label: SOLID_NAMES[/** @type {SolidKind} */ (k)],
      solid: k,
    })),
    answer,
    hint: 'Các khối lặp lại theo một nhóm. Em tìm nhóm đó rồi đọc tiếp đến dấu hỏi.',
    solution: `Nhóm ${names} lặp lại. Dấu hỏi là ${SOLID_NAMES[right]}.`,
  };
}

/**
 * Four compartments with a product or quotient: which solid is the one with
 * the largest result?
 * @param {() => number} rand
 * @returns {Asked}
 */
export function cellsQuestion(rand) {
  /** @type {Array<{ expr: string, value: number }>} */
  const pool = [];
  for (const m of [2, 5]) {
    for (let k = 1; k <= 10; k++) {
      pool.push({ expr: `${m} × ${k}`, value: m * k });
      pool.push({ expr: `${m * k} : ${m}`, value: k });
    }
  }
  /** @type {Array<{ expr: string, value: number }>} */
  const chosen = [];
  for (const entry of shuffle(rand, pool)) {
    if (!chosen.some((c) => c.value === entry.value)) chosen.push(entry);
    if (chosen.length === 4) break;
  }
  const kinds = shuffle(rand, /** @type {Array<'tru' | 'cau'>} */ (['tru', 'tru', 'cau', 'cau']));
  const cells = chosen.map((c, i) => ({ ...c, kind: kinds[i] }));
  const best = cells.reduce((a, b) => (b.value > a.value ? b : a));
  return {
    prompt: 'Quả bóng rơi vào ô có kết quả lớn nhất. Ô đó có dạng khối gì?',
    visual: { type: 'cells', cells },
    options: ['Khối trụ', 'Khối cầu'],
    answer: best.kind === 'tru' ? 0 : 1,
    hint: 'Em tính kết quả ở từng ô rồi tìm số lớn nhất.',
    solution: `${cells.map((c) => `${c.expr} = ${c.value}`).join('; ')}. Lớn nhất là ${best.expr} = ${best.value}, ô đó có dạng ${SOLID_NAMES[best.kind]}.`,
  };
}

/**
 * Options written with a unit, the right one and some real mistakes.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} wrong
 * @param {string} unit
 */
function unitOptions(rand, right, wrong, unit) {
  const unique = [...new Set(wrong.filter((w) => w > 0 && w !== right))].slice(0, 3);
  const values = shuffle(rand, [right, ...unique]);
  return { options: values.map((v) => `${v} ${unit}`), answer: values.indexOf(right) };
}

/**
 * Word problems: an elephant pulling wooden blocks, a pangolin's burrow,
 * stacked boxes and boxes of cans.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const variant = int(rand, 0, 4);
  const fives = (/** @type {number} */ lo, /** @type {number} */ hi) => int(rand, lo, hi) * 5;
  if (variant === 0) {
    const a = fives(3, 9);
    let b = fives(3, 9);
    if (b === a) b = a === 45 ? 40 : a + 5;
    const c = fives(2, 6);
    const sum = a + b;
    return {
      prompt: 'Voi kéo các khối gỗ trong hình. Hai khối cầu nặng tất cả bao nhiêu ki-lô-gam?',
      visual: {
        type: 'blocks',
        blocks: [
          { kind: 'cau', kg: a },
          { kind: 'tru', kg: c },
          { kind: 'cau', kg: b },
        ],
      },
      ...unitOptions(rand, sum, [sum + 10, sum - 10, a + c, b + c], 'kg'),
      hint: 'Tìm hai khối cầu trong hình rồi cộng số ki-lô-gam của chúng.',
      solution: `Hai khối cầu nặng tất cả là: ${a} + ${b} = ${sum} (kg). Đáp số: ${sum} kg.`,
    };
  }
  if (variant === 1) {
    const a = fives(4, 6);
    const b = a + fives(1, 3);
    const c = fives(2, 5);
    const d = c + fives(1, 3);
    const least = a + c;
    return {
      prompt:
        'Em chọn một khối cầu và một khối trụ sao cho nhẹ nhất. Hai khối đó nặng tất cả bao nhiêu ki-lô-gam?',
      visual: {
        type: 'blocks',
        blocks: [
          { kind: 'cau', kg: b },
          { kind: 'tru', kg: c },
          { kind: 'cau', kg: a },
          { kind: 'tru', kg: d },
        ],
      },
      ...unitOptions(rand, least, [a + d, b + c, b + d], 'kg'),
      hint: 'Chọn khối cầu nhẹ hơn và khối trụ nhẹ hơn, rồi cộng lại.',
      solution: `Khối cầu nhẹ hơn nặng ${a} kg, khối trụ nhẹ hơn nặng ${c} kg. ${a} + ${c} = ${least} (kg). Đáp số: ${least} kg.`,
    };
  }
  if (variant === 2) {
    const start = int(rand, 1, 3) * 10;
    const end = int(rand, 6, 9) * 10;
    const more = end - start;
    return {
      prompt: `Tê tê đào một cái hang dạng khối trụ. Lúc đầu hang sâu ${start} cm, sau đó hang sâu ${end} cm. Hang sâu thêm bao nhiêu xăng-ti-mét?`,
      ...unitOptions(rand, more, [more + 10, more - 10, end], 'cm'),
      hint: 'Muốn biết sâu thêm bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `Hang sâu thêm là: ${end} − ${start} = ${more} (cm). Đáp số: ${more} cm.`,
    };
  }
  if (variant === 3) {
    const rows = int(rand, 3, 5);
    const total = stackTotal(rows);
    const sum = Array.from({ length: rows }, (_, i) => i + 1).join(' + ');
    return {
      prompt: 'Các hộp dạng khối trụ xếp chồng như hình. Có tất cả bao nhiêu hộp?',
      visual: { type: 'stack', rows },
      ...numberOptions(rand, total, 1, 20),
      hint: 'Em đếm số hộp ở từng hàng rồi cộng lại.',
      solution: `Có tất cả: ${sum} = ${total} (hộp).`,
    };
  }
  const per = pick(rand, [2, 5]);
  const boxes = int(rand, 2, 9);
  const total = per * boxes;
  const object = pick(rand, ['lon sữa', 'quả bóng', 'cục pin']);
  return {
    prompt: `Mỗi hộp có ${per} ${object}. Hỏi ${boxes} hộp như vậy có tất cả bao nhiêu ${object}?`,
    ...unitOptions(rand, total, [per + boxes, per * (boxes + 1), per * (boxes - 1)], object),
    hint: `Lấy số ${object} ở một hộp nhân với số hộp.`,
    solution: `${boxes} hộp có tất cả là: ${per} × ${boxes} = ${total} (${object}). Đáp số: ${total} ${object}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  'nhan-khoi': solidQuestion,
  'do-vat': thingQuestion,
  'dem-khoi': countQuestion,
  'quy-luat': patternQuestion,
  'phep-tinh': cellsQuestion,
  'bai-toan': storyQuestion,
};

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  return { ...MAKERS[kind](rand), kind };
}

/**
 * A round of two questions per kind in mixed order, with no question twice.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const asked = new Set();
  return shuffle(rand, [...KINDS, ...KINDS]).map((kind) => {
    let q = makeQuestion(kind, rand);
    for (let tries = 0; asked.has(questionKey(q)) && tries < 20; tries++) {
      q = makeQuestion(kind, rand);
    }
    asked.add(questionKey(q));
    return q;
  });
}
