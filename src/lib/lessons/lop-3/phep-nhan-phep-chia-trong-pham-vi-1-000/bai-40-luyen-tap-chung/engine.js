/**
 * The mixed practice of the chapter: multiplying and dividing in the head and
 * in columns, the order of operations in an expression, how many times one
 * number is another, and word problems. One question of each part in a shuffled
 * order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import {
  divText,
  divWords,
  drawDivision,
  drawProduct,
  forgotCarry,
  mulWords,
  slipOptions,
} from '../_shared/columns.js';
import { leftToRightSlip, valueOf, workText } from '../_shared/expression.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  nham: 'Nhân, chia nhẩm số tròn trăm',
  nhan: 'Nhân có nhớ một lần',
  'nhan-nho': 'Nhân có nhớ hai lần',
  chia: 'Chia hết số có ba chữ số',
  'chia-du': 'Phép chia có dư',
  'chia-0': 'Chữ số 0 ở thương',
  'chia-hai-so': 'Lấy hai chữ số để chia',
  'trai-phai': 'Biểu thức tính từ trái sang phải',
  'nhan-chia': 'Biểu thức có nhân, chia trước',
  ngoac: 'Biểu thức có dấu ngoặc',
  'gap-may-lan': 'Số lớn gấp mấy lần số bé',
  'bai-nhan': 'Bài toán có phép nhân',
  'bai-chia': 'Bài toán có phép chia có dư',
});

/**
 * A quotient and its remainder written the book's way.
 * @param {number} q
 * @param {number} rest
 */
const withRest = (q, rest) => (rest > 0 ? `${q} (dư ${rest})` : String(q));

/**
 * The options of a division with a remainder: a remainder not below the
 * divisor, a quotient one too big and a remainder off by one.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} d
 */
function restOptions(rand, n, d) {
  const q = Math.floor(n / d);
  const rest = n % d;
  const off = rest + 1 < d ? rest + 1 : rest - 1;
  return mixOptions(rand, withRest(q, rest), [
    withRest(q - 1, rest + d),
    withRest(q + 1, rest),
    withRest(q, off),
  ]);
}

/**
 * An expression worked from left to right.
 * @param {() => number} rand
 */
function drawOrder(rand) {
  if (rand() < 0.5) {
    const a = int(rand, 15, 60);
    const b = int(rand, 11, 40);
    return `${a} + ${b} − ${int(rand, 5, a + b - 1)}`;
  }
  const d = int(rand, 2, 6);
  return `${d * int(rand, 2, 9)} : ${d} × ${int(rand, 2, 5)}`;
}

/**
 * An expression with multiplying or dividing to do first.
 * @param {() => number} rand
 */
function drawStrong(rand) {
  const b = int(rand, 2, 9);
  const c = int(rand, 2, 9);
  return pick(rand, [
    `${int(rand, 10, 60)} + ${b} × ${c}`,
    `${b * c + int(rand, 1, 40)} − ${b} × ${c}`,
    `${int(rand, 10, 60)} + ${b * c} : ${b}`,
  ]);
}

/**
 * An expression with brackets, whose value is a whole number that is not
 * negative.
 * @param {() => number} rand
 */
function drawBrackets(rand) {
  const big = int(rand, 8, 15);
  const small = int(rand, 2, 7);
  const sum = int(rand, 2, 5) + int(rand, 2, 4);
  return pick(rand, [
    `${int(rand, 2, 9)} × (${big} − ${small})`,
    `${sum * int(rand, 2, 9)} : (${sum - 1} + 1)`,
    `(${big + small} + ${big - small}) : 2`,
    `${big + small + int(rand, 1, 20)} − (${big} + ${small})`,
  ]);
}

/**
 * A question on an expression's value.
 * @param {string} text
 * @param {string} hint
 * @returns {Question}
 */
function expressionQuestion(text, hint) {
  const right = valueOf(text);
  return {
    prompt: `Tính giá trị của biểu thức: ${text}.`,
    ...slipOptions(right, [leftToRightSlip(text), right + 10]),
    hint,
    solution: `${workText(text)}.`,
  };
}

/** Word problems where one thing is some times another. */
const TIMES_STORIES = [
  {
    text: (/** @type {number} */ a, /** @type {number} */ b) =>
      `Thùng thứ nhất có ${a} quyển vở. Thùng thứ hai có số vở gấp ${b} lần thùng thứ nhất. Thùng thứ hai có bao nhiêu quyển vở?`,
    say: 'quyển vở',
  },
  {
    text: (/** @type {number} */ a, /** @type {number} */ b) =>
      `Mỗi hũ có ${a} ml mật ong. Hỏi ${b} hũ như thế có bao nhiêu mi-li-lít mật ong?`,
    say: 'ml mật ong',
  },
];

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  nham: (rand) => {
    const d = int(rand, 2, 4);
    const q = int(rand, 1, Math.floor(9 / d));
    if (rand() < 0.5) {
      const hundreds = q * 100;
      return {
        prompt: `Tính nhẩm: ${hundreds} × ${d} = ?`,
        ...slipOptions(hundreds * d, [q * d * 10, hundreds + d, hundreds * d + 100]),
        hint: `Em nhẩm: ${q} trăm × ${d} = mấy trăm?`,
        solution: `${q} trăm × ${d} = ${q * d} trăm. Vậy ${hundreds} × ${d} = ${hundreds * d}.`,
      };
    }
    const n = q * d * 100;
    return {
      prompt: `Tính nhẩm: ${n} : ${d} = ?`,
      ...slipOptions(q * 100, [q * 10, n - d, q * 100 + 100]),
      hint: `Em nhẩm: ${q * d} trăm : ${d} = mấy trăm?`,
      solution: `${q * d} trăm : ${d} = ${q} trăm. Vậy ${n} : ${d} = ${q * 100}.`,
    };
  },
  nhan: (rand) => {
    const { a, b } = drawProduct(rand, 'one');
    return {
      prompt: `Đặt tính rồi tính: ${a} × ${b} = ?`,
      ...slipOptions(a * b, [forgotCarry(a, b), a * b + 100, a + b]),
      hint: 'Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ vào hàng tiếp theo.',
      solution: mulWords(a, b),
    };
  },
  'nhan-nho': (rand) => {
    const { a, b } = drawProduct(rand, 'two');
    return {
      prompt: `Đặt tính rồi tính: ${a} × ${b} = ?`,
      ...slipOptions(a * b, [forgotCarry(a, b), a * b - 10, a * b + 100]),
      hint: 'Phép nhân này có nhớ ở cả hàng đơn vị và hàng chục.',
      solution: mulWords(a, b),
    };
  },
  chia: (rand) => {
    const { n, d } = drawDivision(rand, 'exact');
    const q = n / d;
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...slipOptions(q, [q + 10, q - 1, q + 100]),
      hint: 'Em chia từ hàng trăm, rồi hạ từng chữ số.',
      solution: divWords(n, d),
    };
  },
  'chia-du': (rand) => {
    const { n, d } = drawDivision(rand, 'rest');
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...restOptions(rand, n, d),
      hint: `Số dư phải bé hơn số chia, tức là bé hơn ${d}.`,
      solution: divWords(n, d),
    };
  },
  'chia-0': (rand) => {
    const { n, d } = drawDivision(rand, 'zero');
    const q = Math.floor(n / d);
    const dropped = Number(String(q).replace(/0/g, ''));
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...mixOptions(rand, withRest(q, n % d), [
        withRest(dropped, n % d),
        withRest(q + 10, n % d),
        withRest(q + 1, n % d),
      ]),
      hint: 'Mỗi lần hạ một chữ số, em viết một chữ số ở thương, có thể là 0.',
      solution: divWords(n, d),
    };
  },
  'chia-hai-so': (rand) => {
    const { n, d } = drawDivision(rand, 'two');
    const q = Math.floor(n / d);
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...mixOptions(rand, withRest(q, n % d), [
        withRest(q + 1, n % d),
        withRest(q + 10, n % d),
        withRest(q > 10 ? q - 10 : q + 2, n % d),
      ]),
      hint: `Hàng trăm bé hơn ${d}, em lấy hai chữ số đầu để chia.`,
      solution: divWords(n, d),
    };
  },
  'trai-phai': (rand) =>
    expressionQuestion(drawOrder(rand), 'Các phép tính cùng loại: em tính từ trái sang phải.'),
  'nhan-chia': (rand) =>
    expressionQuestion(drawStrong(rand), 'Em làm phép nhân, phép chia trước; cộng, trừ sau.'),
  ngoac: (rand) => expressionQuestion(drawBrackets(rand), 'Em tính trong ngoặc trước.'),
  'gap-may-lan': (rand) => {
    const small = int(rand, 2, 9);
    const times = int(rand, 2, 9);
    const big = small * times;
    return {
      prompt: `Số lớn là ${big}, số bé là ${small}. Số lớn gấp mấy lần số bé?`,
      ...slipOptions(times, [big - small, times + 2, big + small]),
      hint: 'Em lấy số lớn chia cho số bé.',
      solution: `${big} : ${small} = ${times}. Số lớn gấp ${times} lần số bé.`,
    };
  },
  'bai-nhan': (rand) => {
    const { a, b } = drawProduct(rand, pick(rand, /** @type {const} */ (['plain', 'one'])));
    const story = pick(rand, TIMES_STORIES);
    return {
      prompt: story.text(a, b),
      ...slipOptions(a * b, [forgotCarry(a, b), a + b, a * b + 100]),
      hint: `Em tính ${a} × ${b}.`,
      solution: `${mulWords(a, b)} Đáp số: ${a * b} ${story.say}.`,
    };
  },
  'bai-chia': (rand) => {
    const { n, d } = drawDivision(rand, 'rest');
    const q = Math.floor(n / d);
    const rest = n % d;
    const off = rest + 1 < d ? rest + 1 : rest - 1 || d - 1;
    const say = (/** @type {number} */ x, /** @type {number} */ y) => `${x} hộp, thừa ${y} cái`;
    return {
      prompt: `Có ${n} cái bánh, xếp vào các hộp, mỗi hộp ${d} cái. Xếp được nhiều nhất bao nhiêu hộp và còn thừa mấy cái bánh?`,
      ...mixOptions(rand, say(q, rest), [say(q - 1, rest + d), say(q + 1, rest), say(q, off)]),
      hint: `Em tính ${n} : ${d}. Số bánh thừa phải bé hơn ${d}.`,
      solution: `${divText(n, d)}. Đáp số: ${say(q, rest)}.`,
    };
  },
};

/**
 * A round with one question of every part, shuffled.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
