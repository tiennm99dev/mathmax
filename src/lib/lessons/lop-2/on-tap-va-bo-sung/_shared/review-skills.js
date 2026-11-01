/**
 * Review questions on addition and subtraction without carrying within 100:
 * whole tens in the head, a two-digit number plus or minus a one- or
 * two-digit number, a calculation set out in columns, the parts of a sum
 * or difference (số hạng, tổng, số bị trừ, số trừ, hiệu), how much more or
 * less, comparing a calculation with a number, and short word problems.
 * Pure and DOM-free; each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { makeProblem } from '#lib/core/kid/column.js';
import { compareSign, tensOnes } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';

/**
 * What a question shows above its options: a calculation set out in
 * columns, waiting for its result.
 * @typedef {{ type: 'column', a: number, b: number, op: '+' | '-' }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} KidSkill */

const MINUS = '−';

/**
 * "32 + 15" or "47 − 15".
 * @param {number} a
 * @param {number} b
 * @param {'+' | '-'} op
 */
export function expr(a, b, op) {
  return `${a} ${op === '+' ? '+' : MINUS} ${b}`;
}

/**
 * Up to four number options in increasing order: the right one and the
 * slips a child makes (one off, ten off, the other operation), all from 0
 * to 99.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} [slips] likely wrong answers to prefer
 * @returns {{ options: string[], answer: number }}
 */
export function nearOptions(rand, right, slips = []) {
  const ok = (/** @type {number} */ v) => v !== right && v >= 0 && v <= 99;
  const first = [...new Set(slips.filter(ok))];
  const rest = shuffle(
    rand,
    [right - 1, right + 1, right - 10, right + 10].filter((v) => ok(v) && !first.includes(v)),
  );
  const values = [right, ...[...first, ...rest].slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * The working, ones column first, then tens.
 * @param {number} a
 * @param {number} b
 * @param {'+' | '-'} op
 */
export function columnWords(a, b, op) {
  const x = tensOnes(a);
  const y = tensOnes(b);
  const s = op === '+' ? '+' : MINUS;
  const ones = op === '+' ? x.ones + y.ones : x.ones - y.ones;
  const tens = op === '+' ? x.tens + y.tens : x.tens - y.tens;
  const c = op === '+' ? a + b : a - b;
  const tensPart =
    y.tens === 0 ? `Hàng chục: hạ ${x.tens}.` : `Hàng chục: ${x.tens} ${s} ${y.tens} = ${tens}.`;
  return `Hàng đơn vị: ${x.ones} ${s} ${y.ones} = ${ones}. ${tensPart} Vậy ${expr(a, b, op)} = ${c}.`;
}

/**
 * A calculation of one of the book's four kinds without carrying.
 * @param {() => number} rand
 * @param {'+' | '-'} op
 */
function calc(rand, op) {
  const kind =
    op === '+'
      ? pick(rand, /** @type {const} */ (['add-one', 'add-two']))
      : pick(rand, /** @type {const} */ (['sub-one', 'sub-two']));
  const p = makeProblem(rand, kind);
  return { a: p.a, b: p.b, c: op === '+' ? p.a + p.b : p.a - p.b };
}

/** @type {KidSkill} */
export const tensSkill = {
  id: 'tron-chuc',
  label: 'Tính nhẩm số tròn chục',
  make(rand) {
    const x = int(rand, 1, 8);
    const y = int(rand, 1, 9 - x);
    if (rand() < 0.5) {
      return {
        prompt: `${expr(10 * x, 10 * y, '+')} = ?`,
        ...nearOptions(rand, 10 * (x + y), [10 * Math.abs(x - y)]),
        hint: `${x} chục cộng ${y} chục bằng mấy chục?`,
        solution: `${x} chục + ${y} chục = ${x + y} chục. Vậy ${expr(10 * x, 10 * y, '+')} = ${10 * (x + y)}.`,
      };
    }
    const n = x + y;
    return {
      prompt: `${expr(10 * n, 10 * x, '-')} = ?`,
      ...nearOptions(rand, 10 * y, [10 * (n + x)]),
      hint: `${n} chục bớt ${x} chục thì còn mấy chục?`,
      solution: `${n} chục ${MINUS} ${x} chục = ${y} chục. Vậy ${expr(10 * n, 10 * x, '-')} = ${10 * y}.`,
    };
  },
};

/** @type {KidSkill} */
export const addSkill = {
  id: 'cong',
  label: 'Phép cộng không nhớ',
  make(rand) {
    const { a, b, c } = calc(rand, '+');
    return {
      prompt: `${expr(a, b, '+')} = ?`,
      ...nearOptions(rand, c, [a - b]),
      hint: 'Em cộng đơn vị với đơn vị, rồi cộng chục với chục.',
      solution: columnWords(a, b, '+'),
    };
  },
};

/** @type {KidSkill} */
export const subtractSkill = {
  id: 'tru',
  label: 'Phép trừ không nhớ',
  make(rand) {
    const { a, b, c } = calc(rand, '-');
    return {
      prompt: `${expr(a, b, '-')} = ?`,
      ...nearOptions(rand, c, [a + b]),
      hint: 'Em trừ đơn vị cho đơn vị, rồi trừ chục cho chục.',
      solution: columnWords(a, b, '-'),
    };
  },
};

/** @type {KidSkill} */
export const columnSkill = {
  id: 'dat-tinh',
  label: 'Đặt tính rồi tính',
  make(rand) {
    const op = rand() < 0.5 ? '+' : '-';
    const { a, b, c } = calc(rand, op);
    const { ones } = tensOnes(b);
    // Writing a one-digit number under the tens is the classic slip.
    const misplaced =
      b < 10 ? (op === '+' ? a + 10 * ones : a - 10 * ones) : op === '+' ? a - b : a + b;
    return {
      prompt: `Đặt tính rồi tính: ${expr(a, b, op)}. Kết quả là bao nhiêu?`,
      visual: { type: 'column', a, b, op },
      ...nearOptions(rand, c, [misplaced]),
      hint: 'Đơn vị thẳng cột đơn vị, chục thẳng cột chục. Em tính từ phải sang trái.',
      solution: columnWords(a, b, op),
    };
  },
};

/** @type {KidSkill} */
export const partsSkill = {
  id: 'thanh-phan',
  label: 'Số hạng, tổng, số bị trừ, số trừ, hiệu',
  make(rand) {
    const roll = rand();
    if (roll < 0.35) {
      const { a, b, c } = calc(rand, '+');
      return {
        prompt: `Các số hạng là ${a} và ${b}. Tổng là bao nhiêu?`,
        ...nearOptions(rand, c, [a - b]),
        hint: 'Muốn tính tổng, em cộng các số hạng.',
        solution: `${expr(a, b, '+')} = ${c}. Tổng là ${c}.`,
      };
    }
    if (roll < 0.7) {
      const { a, b, c } = calc(rand, '-');
      return {
        prompt: `Số bị trừ là ${a}, số trừ là ${b}. Hiệu là bao nhiêu?`,
        ...nearOptions(rand, c, [a + b]),
        hint: 'Muốn tính hiệu, em lấy số bị trừ trừ đi số trừ.',
        solution: `${expr(a, b, '-')} = ${c}. Hiệu là ${c}.`,
      };
    }
    const op = rand() < 0.5 ? '+' : '-';
    let { a, b, c } = calc(rand, op);
    // Three different numbers, so the number asked about has one name.
    for (let i = 0; i < 20 && (a === b || b === c || a === c); i++) ({ a, b, c } = calc(rand, op));
    const names = op === '+' ? ['Số hạng', 'Số hạng', 'Tổng'] : ['Số bị trừ', 'Số trừ', 'Hiệu'];
    const which = int(rand, 0, 2);
    const value = [a, b, c][which];
    const right = names[which];
    const wrong =
      op === '+' ? ['Số hạng', 'Tổng', 'Hiệu'] : ['Số bị trừ', 'Số trừ', 'Hiệu', 'Tổng'];
    return {
      prompt: `Trong phép tính ${expr(a, b, op)} = ${c}, số ${value} gọi là gì?`,
      ...mixOptions(
        rand,
        right,
        shuffle(
          rand,
          wrong.filter((w) => w !== right),
        ).slice(0, 2),
      ),
      hint:
        op === '+'
          ? 'Hai số được cộng là số hạng, kết quả là tổng.'
          : 'Số đứng đầu là số bị trừ, số sau dấu trừ là số trừ, kết quả là hiệu.',
      solution: `Trong ${expr(a, b, op)} = ${c}: ${names
        .map((n, i) => `${[a, b, c][i]} là ${n.toLowerCase()}`)
        .join(', ')}.`,
    };
  },
};

/** @type {KidSkill} */
export const moreLessSkill = {
  id: 'hon-kem',
  label: 'Hơn, kém nhau bao nhiêu',
  make(rand) {
    const { a, b, c } = calc(rand, '-');
    if (rand() < 0.5) {
      return {
        prompt: `Số ${a} hơn số ${b} là bao nhiêu?`,
        ...nearOptions(rand, c, [a + b]),
        hint: 'Muốn biết hơn bao nhiêu, em lấy số lớn trừ số bé.',
        solution: `${expr(a, b, '-')} = ${c}. ${a} hơn ${b} là ${c}.`,
      };
    }
    return {
      prompt: `Số ${b} kém số ${a} là bao nhiêu?`,
      ...nearOptions(rand, c, [a + b]),
      hint: 'Số nào lớn hơn? Em lấy số lớn trừ số bé.',
      solution: `${expr(a, b, '-')} = ${c}. ${b} kém ${a} là ${c}.`,
    };
  },
};

/** @type {KidSkill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh phép tính với số',
  make(rand) {
    const op = rand() < 0.5 ? '+' : '-';
    const { a, b, c } = calc(rand, op);
    const roll = rand();
    let n = c;
    if (roll < 0.4) n = Math.min(99, c + int(rand, 1, 9));
    else if (roll < 0.8) n = Math.max(0, c - int(rand, 1, 9));
    if (n === c && roll < 0.8) n = c + 1;
    const sign = compareSign(c, n);
    return {
      prompt: `Chọn dấu đúng: ${expr(a, b, op)} ... ${n}`,
      ...signOptions(sign),
      hint: `Em tính ${expr(a, b, op)} trước, rồi so sánh với ${n}.`,
      solution: `${expr(a, b, op)} = ${c}. ${c} ${sign} ${n}, nên ${expr(a, b, op)} ${sign} ${n}.`,
    };
  },
};

/** Things in the word problems: where they are, and what they are called. */
const THINGS = [
  { what: 'quyển sách', where: 'Thư viện lớp có' },
  { what: 'cây', where: 'Vườn trường có' },
  { what: 'con gà', where: 'Nhà bác Ba có' },
  { what: 'quả bóng', where: 'Cửa hàng có' },
];

/** Two groups that collected something, for "ít hơn bao nhiêu" problems. */
const GROUPS = [
  { what: 'cây', verb: 'trồng được' },
  { what: 'quyển vở', verb: 'quyên góp được' },
  { what: 'bông hoa', verb: 'gấp được' },
];

/** @type {KidSkill} */
export const storySkill = {
  id: 'bai-toan',
  label: 'Bài toán',
  make(rand) {
    const t = pick(rand, THINGS);
    const roll = rand();
    if (roll < 0.35) {
      const { a, b, c } = calc(rand, '+');
      return {
        prompt: `${t.where} ${a} ${t.what}. Có thêm ${b} ${t.what} nữa. Hỏi có tất cả bao nhiêu ${t.what}?`,
        ...nearOptions(rand, c, [a - b]),
        hint: 'Thêm vào thì em làm phép cộng.',
        solution: `${expr(a, b, '+')} = ${c}. Có tất cả ${c} ${t.what}.`,
      };
    }
    if (roll < 0.7) {
      const { a, b, c } = calc(rand, '-');
      return {
        prompt: `${t.where} ${a} ${t.what}. Đã bớt đi ${b} ${t.what}. Hỏi còn lại bao nhiêu ${t.what}?`,
        ...nearOptions(rand, c, [a + b]),
        hint: 'Bớt đi thì em làm phép trừ.',
        solution: `${expr(a, b, '-')} = ${c}. Còn lại ${c} ${t.what}.`,
      };
    }
    const g = pick(rand, GROUPS);
    const { a, b, c } = calc(rand, '-');
    return {
      prompt: `Tổ Một ${g.verb} ${a} ${g.what}, tổ Hai ${g.verb} ${b} ${g.what}. Tổ Hai ${g.verb} ít hơn tổ Một bao nhiêu ${g.what}?`,
      ...nearOptions(rand, c, [a + b]),
      hint: 'Muốn biết ít hơn bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `${expr(a, b, '-')} = ${c}. Tổ Hai ${g.verb} ít hơn tổ Một ${c} ${g.what}.`,
    };
  },
};

/** The parts of the review, in the order of the chapter. */
export const REVIEW_SKILLS = [
  tensSkill,
  addSkill,
  subtractSkill,
  columnSkill,
  partsSkill,
  moreLessSkill,
  compareSkill,
  storySkill,
];
