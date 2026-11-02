/**
 * The mixed practice of this chapter: plates of fruit that show why multiplying
 * or dividing by 1 and by 0 works as it does, and a round drawn from the whole
 * chapter (the make-up of a number, column calculations, finding a missing
 * number, the tables of 2 to 5, a broken line and word problems). Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { exprText, resultOf } from '#lib/core/kid/column.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { carryCount, columnWords, forgotCarry } from '../_shared/columns.js';
import { nearOptions, unitOptions } from '../_shared/options.js';
import {
  divLine,
  mulLine,
  productOptions,
  quotientOptions,
  repeatedSum,
} from '../_shared/times.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/** @typedef {'nhan-1' | 'nhan-0' | 'chia-1' | 'chia-so-0'} Rule */

/**
 * What a question draws.
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: Op }
 *   | { type: 'broken', lengths: number[] }
 * )} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** The rules of the plates, with what each tab says. */
export const RULES = /** @type {const} */ ([
  { value: 'nhan-1', label: 'Nhân với 1' },
  { value: 'nhan-0', label: 'Nhân với 0' },
  { value: 'chia-1', label: 'Chia cho 1' },
  { value: 'chia-so-0', label: 'Số 0 chia' },
]);

/** How many plates or fruits a rule may use. */
export const MIN_N = 2;
export const MAX_N = 9;

/**
 * What the plates show for a rule and a number: the fruits on each plate, and
 * the sentence that goes with it.
 * @param {Rule} rule
 * @param {number} n
 * @returns {{ plates: number[], line: string, words: string }}
 */
export function platesFor(rule, n) {
  if (rule === 'nhan-1') {
    return {
      plates: Array.from({ length: n }, () => 1),
      line: `1 × ${n} = ${n}`,
      words: `${n} đĩa, mỗi đĩa 1 quả. 1 × ${n} = ${repeatedSum(1, n)} = ${n}. Đổi chỗ: ${n} × 1 = ${n}.`,
    };
  }
  if (rule === 'nhan-0') {
    return {
      plates: Array.from({ length: n }, () => 0),
      line: `0 × ${n} = 0`,
      words: `${n} đĩa, mỗi đĩa 0 quả. 0 × ${n} = ${repeatedSum(0, n)} = 0. Đổi chỗ: ${n} × 0 = 0.`,
    };
  }
  if (rule === 'chia-1') {
    return {
      plates: [n],
      line: `${n} : 1 = ${n}`,
      words: `${n} quả xếp hết vào 1 đĩa. Đĩa đó có ${n} quả. ${n} : 1 = ${n}.`,
    };
  }
  return {
    plates: Array.from({ length: n }, () => 0),
    line: `0 : ${n} = 0`,
    words: `Không có quả nào, chia cho ${n} đĩa. Mỗi đĩa có 0 quả. 0 : ${n} = 0.`,
  };
}

/**
 * Two calculations of the tables with the same result, and how to tell them
 * apart from other pairs.
 * @type {ReadonlyArray<readonly [string, string, number]>}
 */
export const SAME_RESULT = [
  ['15 : 3', '25 : 5', 5],
  ['3 × 4', '2 × 6', 12],
  ['14 : 2', '28 : 4', 7],
  ['0 : 6', '5 × 0', 0],
  ['4 × 5', '2 × 10', 20],
  ['3 × 6', '2 × 9', 18],
  ['36 : 4', '27 : 3', 9],
  ['5 × 6', '3 × 10', 30],
];

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'cau-tao': 'Cấu tạo số',
  'so-sanh': 'So sánh số đo',
  'dat-tinh': 'Đặt tính rồi tính',
  'nhieu-it': 'Bài toán nhiều hơn, ít hơn',
  'tim-so': 'Tìm thành phần phép cộng, phép trừ',
  bang: 'Bảng nhân, bảng chia',
  'voi-1': 'Nhân, chia với 1',
  'voi-0': 'Nhân, chia với 0',
  'tim-thua-so': 'Tìm số trong phép nhân, phép chia',
  'cung-ket-qua': 'Phép tính cùng kết quả',
  'gap-khuc': 'Đường gấp khúc',
  'bai-toan': 'Bài toán nhân, chia',
});

/** The tables of this chapter. */
const TABLES = /** @type {const} */ ([2, 3, 4, 5]);

/**
 * The animals of the book's weight question, each with a likely range of
 * kilograms that keeps them in the book's order.
 */
const ANIMALS = /** @type {const} */ ([
  { name: 'Báo', lo: 40, hi: 90 },
  { name: 'Sư tử', lo: 120, hi: 190 },
  { name: 'Hổ', lo: 200, hi: 280 },
  { name: 'Gấu trắng Bắc Cực', lo: 350, hi: 600 },
]);

/**
 * A column calculation within 1 000 with exactly one carry.
 * @param {() => number} rand
 * @param {Op} [op]
 * @returns {{ a: number, b: number, op: Op, result: number }}
 */
export function oneCarry(rand, op) {
  const sign = op ?? (rand() < 0.5 ? '+' : '-');
  for (;;) {
    const a = int(rand, 100, 999);
    const b = rand() < 0.5 ? int(rand, 11, 99) : int(rand, 100, 999);
    const result = resultOf(a, b, sign);
    if (result < 10 || result > 999 || carryCount(a, b, sign) !== 1) continue;
    return { a, b, op: sign, result };
  }
}

/**
 * The questions of one part, by kind.
 * @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Omit<Question, 'kind'>>}
 */
const MAKERS = {
  'cau-tao'(rand) {
    const h = int(rand, 1, 9);
    const t = int(rand, 1, 9);
    let u = int(rand, 1, 9);
    while (u === t) u = int(rand, 1, 9);
    const n = h * 100 + t * 10 + u;
    const right = `${h}00 + ${t}0 + ${u}`;
    return {
      prompt: `Viết số ${n} thành tổng các trăm, chục, đơn vị.`,
      ...mixOptions(rand, right, [
        `${h}00 + ${u}0 + ${t}`,
        `${h}0 + ${t}0 + ${u}`,
        `${h}00 + ${t} + ${u}`,
      ]),
      hint: `Số ${n} có ${h} trăm, ${t} chục, ${u} đơn vị.`,
      solution: `${n} = ${right}.`,
    };
  },
  'so-sanh'(rand) {
    const skip = int(rand, 0, ANIMALS.length - 1);
    const animals = ANIMALS.filter((_, i) => i !== skip).map((a) => ({
      name: a.name,
      kg: int(rand, a.lo, a.hi),
    }));
    const lightest = rand() < 0.5;
    const right = lightest ? animals[0] : animals[animals.length - 1];
    const list = shuffle(rand, animals);
    return {
      prompt: `${list.map((a) => `${a.name} nặng ${a.kg} kg`).join('. ')}. Con nào ${lightest ? 'nhẹ' : 'nặng'} nhất?`,
      ...mixOptions(
        rand,
        right.name,
        animals.filter((a) => a !== right).map((a) => a.name),
      ),
      hint: `Em so sánh các số, tìm số ${lightest ? 'bé' : 'lớn'} nhất.`,
      solution: `Số ${lightest ? 'bé' : 'lớn'} nhất là ${right.kg}. ${right.name} ${lightest ? 'nhẹ' : 'nặng'} nhất.`,
    };
  },
  'dat-tinh'(rand) {
    const { a, b, op, result } = oneCarry(rand);
    return {
      prompt: `Đặt tính rồi tính: ${exprText(a, b, op)}`,
      visual: { type: 'column', a, b, op },
      ...nearOptions(rand, result, [forgotCarry(a, b, op) ?? result + 10]),
      hint:
        op === '+'
          ? 'Em tính từ phải sang trái. Được số có hai chữ số thì nhớ 1 sang hàng bên trái.'
          : 'Em tính từ phải sang trái. Trừ không được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
      solution: columnWords(a, b, op),
    };
  },
  'nhieu-it'(rand) {
    const more = rand() < 0.5;
    const op = more ? '+' : '-';
    let calc = oneCarry(rand, op);
    while (calc.b >= calc.a) calc = oneCarry(rand, op);
    const { a, b, result } = calc;
    return {
      prompt: `Trường Quang Trung có ${a} học sinh. Trường Lê Lợi có ${more ? 'nhiều' : 'ít'} hơn Trường Quang Trung ${b} học sinh. Trường Lê Lợi có bao nhiêu học sinh?`,
      ...unitOptions(
        rand,
        result,
        'học sinh',
        [more ? a - b : a + b, forgotCarry(a, b, op) ?? result + 10],
        1000,
        1,
      ),
      hint: more ? 'Nhiều hơn: em làm phép cộng.' : 'Ít hơn: em làm phép trừ.',
      solution: `${exprText(a, b, op)} = ${result} (học sinh).`,
    };
  },
  'tim-so'(rand) {
    const x = int(rand, 11, 60);
    const y = int(rand, 11, 60);
    const form = rand();
    if (form < 0.34) {
      return {
        prompt: `? + ${y} = ${x + y}. Số cần tìm là số nào?`,
        ...nearOptions(rand, x, [x + 2 * y]),
        hint: 'Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia.',
        solution: `${x + y} − ${y} = ${x}.`,
      };
    }
    if (form < 0.67) {
      return {
        prompt: `? − ${y} = ${x}. Số cần tìm là số nào?`,
        ...nearOptions(rand, x + y, [Math.abs(x - y)]),
        hint: 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.',
        solution: `${x} + ${y} = ${x + y}.`,
      };
    }
    return {
      prompt: `${x + y} − ? = ${x}. Số cần tìm là số nào?`,
      ...nearOptions(rand, y, [x + y + x]),
      hint: 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.',
      solution: `${x + y} − ${x} = ${y}.`,
    };
  },
  bang(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 2, 10);
    if (rand() < 0.5) {
      return {
        prompt: `${base} × ${n} = ?`,
        ...productOptions(base, n),
        hint: `Em đọc lại bảng nhân ${base}.`,
        solution: `${mulLine(base, n)}.`,
      };
    }
    return {
      prompt: `${base * n} : ${base} = ?`,
      ...quotientOptions(base, n),
      hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${base * n}?`,
      solution: `Vì ${mulLine(base, n)} nên ${divLine(base, n)}.`,
    };
  },
  'voi-1'(rand) {
    const n = int(rand, 2, 9);
    const shape = pick(rand, [`1 × ${n}`, `${n} × 1`, `${n} : 1`]);
    return {
      prompt: `${shape} = ?`,
      ...nearOptions(rand, n, [n + 1, 1, n - 1], 20),
      hint: 'Số nào nhân với 1 hay chia cho 1 cũng bằng chính số đó.',
      solution: `${shape} = ${n}.`,
    };
  },
  'voi-0'(rand) {
    const n = int(rand, 2, 9);
    const shape = pick(rand, [`0 × ${n}`, `${n} × 0`, `0 : ${n}`]);
    return {
      prompt: `${shape} = ?`,
      ...nearOptions(rand, 0, [n, 1], 20),
      hint: 'Số nào nhân với 0 cũng bằng 0. Số 0 chia cho số nào khác 0 cũng bằng 0.',
      solution: `${shape} = 0.`,
    };
  },
  'tim-thua-so'(rand) {
    const a = pick(rand, TABLES);
    const b = int(rand, 2, 10);
    const total = a * b;
    if (rand() < 0.5) {
      return {
        prompt: `${a} × ? = ${total}. Số cần tìm là số nào?`,
        ...quotientOptions(a, b),
        hint: `Em nghĩ: ${a} nhân với mấy thì bằng ${total}?`,
        solution: `Vì ${mulLine(a, b)} nên số cần tìm là ${b}.`,
      };
    }
    return {
      prompt: `${total} : ? = ${a}. Số cần tìm là số nào?`,
      ...quotientOptions(a, b),
      hint: `Em tính ${total} : ${a}.`,
      solution: `Vì ${total} : ${b} = ${a} nên số cần tìm là ${b}.`,
    };
  },
  'cung-ket-qua'(rand) {
    const pair = pick(rand, SAME_RESULT);
    const swap = rand() < 0.5;
    const asked = swap ? pair[1] : pair[0];
    const right = swap ? pair[0] : pair[1];
    const others = shuffle(
      rand,
      SAME_RESULT.filter((p) => p !== pair),
    )
      .slice(0, 3)
      .map((p) => p[rand() < 0.5 ? 0 : 1]);
    return {
      prompt: `Phép tính nào có kết quả bằng ${asked}?`,
      ...mixOptions(rand, right, others),
      hint: 'Em tính kết quả của từng phép tính, rồi so sánh.',
      solution: `${asked} = ${pair[2]}. ${right} = ${pair[2]}.`,
    };
  },
  'gap-khuc'(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 3, 5);
    const right = base * n;
    return {
      prompt: `Đường gấp khúc có ${n} đoạn, mỗi đoạn dài ${base} cm. Đường gấp khúc dài bao nhiêu?`,
      visual: { type: 'broken', lengths: Array.from({ length: n }, () => base) },
      ...unitOptions(rand, right, 'cm', [base + n, base * (n + 1), base * (n - 1)], 100, 1),
      hint: 'Em lấy độ dài một đoạn nhân với số đoạn.',
      solution: `${mulLine(base, n)} (cm).`,
    };
  },
  'bai-toan'(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 2, 10);
    if (rand() < 0.5) {
      return {
        prompt: `Tổ em có ${n} bạn, mỗi bạn góp ${base} quyển vở. Tổ em góp được bao nhiêu quyển vở?`,
        ...unitOptions(rand, base * n, 'quyển', [base + n, base * (n + 1)], 100, 1),
        hint: `${base} được lấy ${n} lần. Em viết phép nhân.`,
        solution: `${mulLine(base, n)} (quyển vở).`,
      };
    }
    return {
      prompt: `Xếp đều ${base * n} quả cam vào ${base} đĩa. Mỗi đĩa có mấy quả cam?`,
      ...unitOptions(rand, n, 'quả', [n + 1, n - 1, base], 20, 1),
      hint: 'Chia đều: em làm phép chia.',
      solution: `${divLine(base, n)} (quả cam).`,
    };
  },
};

/**
 * A round with one question of each part.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ kind, ...MAKERS[kind](rand) }));
}
