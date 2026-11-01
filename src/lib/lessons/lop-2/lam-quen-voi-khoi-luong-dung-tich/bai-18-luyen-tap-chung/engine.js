/**
 * The mixed practice round of "Luyện tập chung" for the chapter "Làm quen
 * với khối lượng, dung tích": reading which pan of a balance is heavier,
 * reading a mass off a level balance, adding and subtracting kilograms,
 * counting the 1 l mugs a container fills, adding and subtracting litres,
 * and word problems in kg and l. Questions are built from a seed, so the
 * first round is the same on the server and in the browser. Pure and
 * DOM-free.
 */
import { int, rng, shuffle } from '#lib/core/drill.js';
import { capitalize, numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { CUPS, newVesselTask, vessel } from '../_shared/capacity.js';
import { fewestWeights, massThing, newPair, newWeighTask, weightsText } from '../_shared/mass.js';

/**
 * What the widget draws above the options: a balance with its loads, or a
 * container poured out into full 1 l mugs.
 * @typedef {{ type: 'scale', left: import('../_shared/mass.js').Load[], right: import('../_shared/mass.js').Load[] }
 *   | { type: 'cups', id: import('../_shared/capacity.js').VesselId, l: number }} Visual
 */

/** @typedef {'nang-nhe' | 'doc-can' | 'tinh-kg' | 'doc-lit' | 'tinh-lit' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'nang-nhe',
  'doc-can',
  'tinh-kg',
  'doc-lit',
  'tinh-lit',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'nang-nhe': 'Nặng hơn, nhẹ hơn',
  'doc-can': 'Đọc cân đĩa',
  'tinh-kg': 'Tính với ki-lô-gam',
  'doc-lit': 'Đếm số lít',
  'tinh-lit': 'Tính với lít',
  'bai-toan': 'Giải bài toán',
});

/**
 * Number options near `right`, written with a unit.
 * @param {() => number} rand
 * @param {number} right
 * @param {string} unit
 * @param {number} lo
 * @param {number} hi
 */
function unitOptions(rand, right, unit, lo, hi) {
  const { options, answer } = numberOptions(rand, right, lo, hi);
  return { options: options.map((o) => `${o} ${unit}`), answer };
}

/**
 * Two things on a balance that does not stay level: which is heavier, or
 * which is lighter.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function heavierQuestion(rand) {
  let pair = newPair(rand);
  for (let i = 0; i < 20 && pair[0].kg === pair[1].kg; i++) pair = newPair(rand);
  if (pair[0].kg === pair[1].kg) pair = [pair[0], { ...pair[1], kg: pair[0].kg + 1 }];
  const [a, b] = pair.map((p) => massThing(p.id).name);
  const lighter = rand() < 0.5;
  const leftHeavy = pair[0].kg > pair[1].kg;
  const answer = lighter === leftHeavy ? 1 : 0;
  const [heavy, light] = leftHeavy ? [a, b] : [b, a];
  return {
    prompt: `Nhìn cân đĩa. Vật nào ${lighter ? 'nhẹ hơn' : 'nặng hơn'}?`,
    visual: {
      type: 'scale',
      left: [{ kind: 'thing', ...pair[0] }],
      right: [{ kind: 'thing', ...pair[1] }],
    },
    options: [capitalize(a), capitalize(b)],
    answer,
    hint: 'Đĩa nào thấp hơn thì vật trên đĩa đó nặng hơn.',
    solution: `Đĩa có ${heavy} thấp hơn. ${capitalize(heavy)} nặng hơn ${light}, ${light} nhẹ hơn ${heavy}.`,
  };
}

/**
 * A level balance with a thing against weights: how many kilograms.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function readScaleQuestion(rand) {
  const t = newWeighTask(rand);
  const kg = Math.max(2, t.kg);
  const weights = fewestWeights(kg);
  const two = weights.indexOf(2);
  if (weights.length < 3 && two >= 0 && rand() < 0.5) weights.splice(two, 1, 1, 1);
  const name = massThing(t.id).name;
  const sum = weights.length > 1 ? `${weights.join(' + ')} = ${kg} (kg)` : `${kg} kg`;
  return {
    prompt: `Cân thăng bằng. ${capitalize(name)} nặng mấy ki-lô-gam?`,
    visual: {
      type: 'scale',
      left: [{ kind: 'thing', id: t.id, kg }],
      right: weights.map((w) => ({ kind: 'weight', kg: w })),
    },
    ...unitOptions(rand, kg, 'kg', 1, 15),
    hint: 'Cân thăng bằng: vật nặng bằng tất cả quả cân ở đĩa kia cộng lại.',
    solution: `Các quả cân: ${weightsText(weights)}. Nặng: ${sum}. ${capitalize(name)} cân nặng ${kg} kg.`,
  };
}

/**
 * Adding or subtracting two measures within 20.
 * @param {() => number} rand
 * @param {string} unit 'kg' or 'l'
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function measureSumQuestion(rand, unit) {
  if (rand() < 0.5) {
    const a = int(rand, 2, 12);
    const b = int(rand, 2, 20 - a);
    return {
      prompt: `${a} ${unit} + ${b} ${unit} = ?`,
      ...unitOptions(rand, a + b, unit, 0, 20),
      hint: `Em cộng ${a} + ${b} như cộng hai số, rồi viết ${unit} sau kết quả.`,
      solution: `${a} + ${b} = ${a + b}, nên ${a} ${unit} + ${b} ${unit} = ${a + b} ${unit}.`,
    };
  }
  const a = int(rand, 8, 20);
  const b = int(rand, 2, Math.min(9, a - 1));
  return {
    prompt: `${a} ${unit} ${MINUS} ${b} ${unit} = ?`,
    ...unitOptions(rand, a - b, unit, 0, 20),
    hint: `Em trừ ${a} ${MINUS} ${b} như trừ hai số, rồi viết ${unit} sau kết quả.`,
    solution: `${a} ${MINUS} ${b} = ${a - b}, nên ${a} ${unit} ${MINUS} ${b} ${unit} = ${a - b} ${unit}.`,
  };
}

/**
 * A container poured out into full 1 l mugs: how many litres it holds.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function countLitresQuestion(rand) {
  const t = newVesselTask(rand);
  const name = vessel(t.id).name;
  return {
    prompt: `Rót hết nước trong ${name} ra, được đầy các ca 1 l như hình. ${capitalize(name)} chứa được mấy lít nước?`,
    visual: { type: 'cups', id: t.id, l: t.l },
    ...unitOptions(rand, t.l, 'l', 1, CUPS),
    hint: 'Mỗi ca đầy là 1 l. Em đếm số ca đầy nước.',
    solution: `Có ${t.l} ca đầy, mỗi ca 1 l. ${capitalize(name)} chứa được ${t.l} l nước.`,
  };
}

/**
 * A word problem with kilograms or litres, set out the book's way.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function storyQuestion(rand) {
  const story = int(rand, 0, 3);
  if (story === 0) {
    const a = int(rand, 6, 12);
    const b = int(rand, 3, Math.min(8, 20 - a));
    return {
      prompt: `Bao gạo to nặng ${a} kg, bao gạo bé nặng ${b} kg. Cả hai bao gạo nặng bao nhiêu ki-lô-gam?`,
      ...unitOptions(rand, a + b, 'kg', 0, 20),
      hint: 'Hỏi "cả hai bao" nên em làm phép cộng.',
      solution: `Cả hai bao gạo nặng là: ${a} + ${b} = ${a + b} (kg). Đáp số: ${a + b} kg.`,
    };
  }
  if (story === 1) {
    const a = int(rand, 5, 9);
    const b = int(rand, 2, a - 2);
    return {
      prompt: `Con ngỗng nặng ${a} kg. Con gà nhẹ hơn con ngỗng ${b} kg. Con gà nặng bao nhiêu ki-lô-gam?`,
      ...unitOptions(rand, a - b, 'kg', 0, 20),
      hint: 'Nhẹ hơn thì em làm phép trừ.',
      solution: `Con gà nặng là: ${a} ${MINUS} ${b} = ${a - b} (kg). Đáp số: ${a - b} kg.`,
    };
  }
  if (story === 2) {
    const a = int(rand, 3, 9);
    const b = int(rand, 2, 8);
    return {
      prompt: `Xô bé chứa được ${a} l nước. Xô to chứa được nhiều hơn xô bé ${b} l nước. Xô to chứa được bao nhiêu lít nước?`,
      ...unitOptions(rand, a + b, 'l', 0, 20),
      hint: 'Nhiều hơn thì em làm phép cộng.',
      solution: `Xô to chứa được số lít nước là: ${a} + ${b} = ${a + b} (l). Đáp số: ${a + b} l nước.`,
    };
  }
  const a = int(rand, 10, 18);
  const b = int(rand, 3, 9);
  return {
    prompt: `Can to đựng ${a} l nước mắm. Can bé đựng ít hơn can to ${b} l. Can bé đựng bao nhiêu lít nước mắm?`,
    ...unitOptions(rand, a - b, 'l', 0, 20),
    hint: 'Ít hơn thì em làm phép trừ.',
    solution: `Can bé đựng số lít nước mắm là: ${a} ${MINUS} ${b} = ${a - b} (l). Đáp số: ${a - b} l nước mắm.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  'nang-nhe': heavierQuestion,
  'doc-can': readScaleQuestion,
  'tinh-kg': (rand) => measureSumQuestion(rand, 'kg'),
  'doc-lit': countLitresQuestion,
  'tinh-lit': (rand) => measureSumQuestion(rand, 'l'),
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
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return shuffle(rand, [...KINDS, ...KINDS]).map((k) => makeQuestion(k, rand));
}
