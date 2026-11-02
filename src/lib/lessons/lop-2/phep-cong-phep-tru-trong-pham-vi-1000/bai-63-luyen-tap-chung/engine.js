/**
 * The mixed practice round of "Luyện tập chung" for adding and subtracting to
 * 1000: column additions and subtractions with and without a carry, mental
 * sums of hundreds, three-term calculations, the largest or smallest result,
 * finding a wrong calculation and short real-life problems. Questions are built
 * from a seed, so the first round is the same on the server and in the browser.
 * Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { equationText, exprText, resultOf } from '#lib/core/kid/column.js';
import { drawFresh, mixOptions, questionKey } from '#lib/core/kid/quiz.js';
import { columnText, drawProblem, forgetCarry } from '../_shared/column-three.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/** @typedef {import('../_shared/problems.js').Problem} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/** @typedef {'cong' | 'tru' | 'nham' | 'ba-so' | 'lon-be' | 'sai' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Phép cộng',
  tru: 'Phép trừ',
  nham: 'Tính nhẩm số tròn trăm',
  'ba-so': 'Tính từ trái sang phải',
  'lon-be': 'Kết quả lớn nhất, bé nhất',
  sai: 'Tìm phép tính sai',
  'bai-toan': 'Giải bài toán',
});

/** Every kind of the round. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/** How many questions of each kind a round asks. */
const COUNTS = /** @type {Record<Kind, number>} */ ({
  cong: 3,
  tru: 3,
  nham: 1,
  'ba-so': 1,
  'lon-be': 1,
  sai: 1,
  'bai-toan': 2,
});

/** @type {ReadonlyArray<import('../_shared/column-three.js').Place | null>} */
const CARRY_PLACES = [null, 'ones', 'tens'];

/**
 * Up to three wrong numbers a child really writes for a result: the forgotten
 * carry first, then ten or a hundred off. All are from 10 to 999.
 * @param {() => number} rand
 * @param {{ a: number, b: number, op: Op }} problem
 */
function slips(rand, { a, b, op }) {
  const r = resultOf(a, b, op);
  const forgot = forgetCarry(a, b, op);
  const near = shuffle(rand, [r - 10, r + 10, r - 100, r + 100, r + 1, r - 1]);
  const pool = [...new Set([forgot, ...near])];
  return pool.filter((v) => v !== r && v >= 10 && v <= 999).slice(0, 3);
}

/**
 * Number options in increasing order, so a child can scan them.
 * @param {number} right
 * @param {number[]} wrong
 */
function sortedOptions(right, wrong) {
  const values = [right, ...wrong].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * A column calculation.
 * @param {() => number} rand
 * @param {Op} op
 * @returns {Asked}
 */
function columnQuestion(rand, op) {
  const problem = drawProblem(rand, op, pick(rand, CARRY_PLACES));
  const { a, b } = problem;
  return {
    prompt: `Em tính: ${exprText(a, b, op)} = ?`,
    ...sortedOptions(resultOf(a, b, op), slips(rand, problem)),
    hint: `Em ${op === '+' ? 'cộng' : 'trừ'} từ hàng đơn vị. Hàng nào ${op === '+' ? 'đủ 10' : 'không đủ để trừ'} thì nhớ 1.`,
    solution: columnText(a, b, op),
    visual: problem,
  };
}

/**
 * A mental sum or difference of whole hundreds, up to 1000.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function mentalQuestion(rand) {
  const x = int(rand, 1, 9);
  const y = int(rand, 1, 10 - x);
  const add = rand() < 0.5;
  const [a, b, r] = add ? [x * 100, y * 100, (x + y) * 100] : [(x + y) * 100, y * 100, x * 100];
  const sign = add ? '+' : '−';
  const words = add
    ? `${x} trăm + ${y} trăm = ${x + y} trăm`
    : `${x + y} trăm − ${y} trăm = ${x} trăm`;
  const wrong = [r - 100, r + 100, add ? Math.abs(x - y) * 100 : r + 200].filter(
    (v) => v !== r && v > 0 && v <= 1000,
  );
  return {
    prompt: `Tính nhẩm: ${a} ${sign} ${b} = ?`,
    ...sortedOptions(r, [...new Set(wrong)]),
    hint: `Em ${add ? 'cộng' : 'trừ'} số trăm.`,
    solution: `${words}. Vậy ${a} ${sign} ${b} = ${r}.`,
  };
}

/**
 * Three terms, worked from left to right: the book's 800 − 200 + 135.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function threeTermQuestion(rand) {
  const a = int(rand, 3, 9) * 100;
  const b = int(rand, 1, a / 100 - 1) * 100;
  const middle = a - b;
  const c = int(rand, 111, Math.min(399, 999 - middle));
  const r = middle + c;
  const wrong = [a + b + c, r - 100, r + 100, r + 10, r - 10].filter((v) => v >= 10 && v <= 999);
  return {
    prompt: `Em tính: ${a} − ${b} + ${c} = ?`,
    ...sortedOptions(r, [...new Set(wrong)].slice(0, 3)),
    hint: `Em tính từ trái sang phải: ${a} − ${b} trước.`,
    solution: `${a} − ${b} = ${middle}. ${middle} + ${c} = ${r}.`,
  };
}

/**
 * Three calculations with different results: which one is the largest or the
 * smallest.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function extremeQuestion(rand) {
  /** @type {Array<{ a: number, b: number, op: Op }>} */
  const problems = [];
  while (problems.length < 3) {
    const p = drawProblem(rand, rand() < 0.5 ? '+' : '-', pick(rand, CARRY_PLACES));
    if (problems.every((q) => resultOf(q.a, q.b, q.op) !== resultOf(p.a, p.b, p.op))) {
      problems.push(p);
    }
  }
  const results = problems.map((p) => resultOf(p.a, p.b, p.op));
  const largest = rand() < 0.5;
  const target = largest ? Math.max(...results) : Math.min(...results);
  const texts = problems.map((p) => exprText(p.a, p.b, p.op));
  const right = texts[results.indexOf(target)];
  return {
    prompt: `Phép tính nào có kết quả ${largest ? 'lớn nhất' : 'bé nhất'}?`,
    ...mixOptions(
      rand,
      right,
      texts.filter((t) => t !== right),
    ),
    hint: 'Em tính kết quả của từng phép tính rồi so sánh.',
    solution: `${problems.map((p) => equationText(p.a, p.b, p.op)).join('. ')}. Kết quả ${largest ? 'lớn nhất' : 'bé nhất'} là ${target}.`,
  };
}

/**
 * Three calculations of which one is wrong, by a forgotten carry.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function wrongQuestion(rand) {
  const op = rand() < 0.5 ? '+' : '-';
  const bad = drawProblem(rand, op, pick(rand, ['ones', 'tens']));
  const slip = forgetCarry(bad.a, bad.b, bad.op);
  const right = `${exprText(bad.a, bad.b, bad.op)} = ${slip}`;
  const others = [drawProblem(rand, '+', pick(rand, CARRY_PLACES)), drawProblem(rand, '-', null)];
  return {
    prompt: 'Phép tính nào sai?',
    ...mixOptions(
      rand,
      right,
      others.map((p) => equationText(p.a, p.b, p.op)),
    ),
    hint: 'Em tính lại từng phép tính. Đừng quên nhớ 1.',
    solution: `${columnText(bad.a, bad.b, bad.op)} Phép tính ghi ${slip} là sai.`,
  };
}

/**
 * A short real-life problem, in the book's settings.
 * @typedef {{ op: Op, unit: string, text: (a: number, b: number) => string, verb: string }} Story
 */

/** @type {readonly Story[]} */
export const STORIES = [
  {
    op: '+',
    unit: 'kg',
    text: (a, b) =>
      `Buổi sáng cửa hàng bán được ${a} kg gạo, buổi chiều bán được ${b} kg gạo. Cả hai buổi bán được bao nhiêu ki-lô-gam gạo?`,
    verb: 'Cả hai buổi bán được',
  },
  {
    op: '+',
    unit: 'km',
    text: (a, b) =>
      `Ngày thứ nhất, đàn sếu bay được ${a} km. Ngày thứ hai, đàn sếu bay được nhiều hơn ngày thứ nhất ${b} km. Ngày thứ hai đàn sếu bay được bao nhiêu ki-lô-mét?`,
    verb: 'Ngày thứ hai đàn sếu bay được',
  },
  {
    op: '-',
    unit: 'm',
    text: (a, b) =>
      `Đội Một sửa được ${a} m đường. Đội Hai sửa được ít hơn đội Một ${b} m. Đội Hai sửa được bao nhiêu mét đường?`,
    verb: 'Đội Hai sửa được',
  },
  {
    op: '-',
    unit: 'cây',
    text: (a, b) =>
      `Vườn ươm có ${a} cây giống. Người ta lấy đi ${b} cây để trồng rừng. Vườn ươm còn lại bao nhiêu cây giống?`,
    verb: 'Vườn ươm còn lại',
  },
];

/**
 * A short real-life problem.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const story = pick(rand, STORIES);
  const problem = drawProblem(rand, story.op, pick(rand, CARRY_PLACES));
  const { a, b, op } = problem;
  const r = resultOf(a, b, op);
  return {
    prompt: story.text(a, b),
    ...sortedOptions(r, slips(rand, problem)),
    hint: `Em làm phép ${op === '+' ? 'cộng' : 'trừ'}: ${exprText(a, b, op)}.`,
    solution: `${story.verb}: ${equationText(a, b, op)} (${story.unit}). Đáp số: ${r} ${story.unit}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  cong: (rand) => columnQuestion(rand, '+'),
  tru: (rand) => columnQuestion(rand, '-'),
  nham: mentalQuestion,
  'ba-so': threeTermQuestion,
  'lon-be': extremeQuestion,
  sai: wrongQuestion,
  'bai-toan': storyQuestion,
};

/**
 * A round of twelve different questions in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = KINDS.flatMap((k) => Array.from({ length: COUNTS[k] }, () => k));
  /** @type {Set<string>} */
  const asked = new Set();
  return shuffle(rand, kinds).map((kind) => {
    const skill = { id: kind, label: KIND_LABELS[kind], make: MAKERS[kind] };
    const q = { ...drawFresh(skill, asked, rand), kind };
    asked.add(questionKey(q));
    return q;
  });
}
