/**
 * The mixed practice of the chapter: multiplying and dividing within 100 000
 * in the head and in columns, expressions and word problems. One question of
 * each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import {
  LIMIT,
  divText,
  divWords,
  drawDivision,
  drawMul,
  mulWords,
  noCarry,
  slipOptions,
  withRest,
} from '../_shared/columns.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'nhan-nham': 'Nhân nhẩm số tròn nghìn',
  'chia-nham': 'Chia nhẩm số tròn nghìn',
  nhan: 'Nhân số có năm chữ số',
  chia: 'Chia hết số có năm chữ số',
  'chia-du': 'Phép chia có dư',
  'bieu-thuc': 'Tính giá trị biểu thức',
  'bai-nhan': 'Bài toán có phép nhân',
  'bai-chia': 'Bài toán chia đều',
  'bai-du': 'Bài toán chia có dư',
  'bai-hai-buoc': 'Bài toán giải bằng hai bước',
});

/**
 * A division `n : d` that divides evenly, with `n` a five-digit number.
 * @param {() => number} rand
 */
function evenDivision(rand) {
  const kind = rand() < 0.5 ? 'exact' : 'zero';
  for (;;) {
    const task = drawDivision(rand, kind);
    if (task.n % task.d === 0) return task;
  }
}

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'nhan-nham': (rand) => {
    const b = int(rand, 2, 9);
    const x = int(rand, Math.ceil(10 / b), Math.floor(99 / b));
    const right = x * b * 1000;
    return {
      prompt: `Tính nhẩm: ${fmt(x * 1000)} × ${b} = ?`,
      ...slipOptions(right, [x * b * 100, right + 1000, x * 1000 + b]),
      hint: `Em nhẩm: ${x} nghìn × ${b} = mấy nghìn?`,
      solution: `${x} nghìn × ${b} = ${x * b} nghìn. Vậy ${fmt(x * 1000)} × ${b} = ${fmt(right)}.`,
    };
  },
  'chia-nham': (rand) => {
    const d = int(rand, 2, 9);
    const q = int(rand, 1, Math.floor(99 / d));
    const n = q * d * 1000;
    const right = q * 1000;
    return {
      prompt: `Tính nhẩm: ${fmt(n)} : ${d} = ?`,
      ...slipOptions(right, [q * 100, right + 1000, q * 10000]),
      hint: `Em nhẩm: ${q * d} nghìn : ${d} = mấy nghìn?`,
      solution: `${q * d} nghìn : ${d} = ${q} nghìn. Vậy ${fmt(n)} : ${d} = ${fmt(right)}.`,
    };
  },
  nhan: (rand) => {
    const { a, b } = drawMul(rand, pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a * b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} × ${b} = ?`,
      ...slipOptions(right, [noCarry(a, b), right - 10, right + 100]),
      hint: 'Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ vào hàng tiếp theo.',
      solution: mulWords(a, b),
    };
  },
  chia: (rand) => {
    const { n, d } = evenDivision(rand);
    const q = n / d;
    const dropped = Number(String(q).replace(/0/g, ''));
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      ...slipOptions(q, [dropped, q + 100, q - 10]),
      hint: 'Em chia từ bên trái. Mỗi lần hạ một chữ số, em viết một chữ số ở thương.',
      solution: divWords(n, d),
    };
  },
  'chia-du': (rand) => {
    const { n, d } = drawDivision(rand, 'rest');
    const q = Math.floor(n / d);
    const rest = n % d;
    const off = rest + 1 < d ? rest + 1 : rest - 1;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      ...mixOptions(rand, withRest(q, rest), [
        withRest(q - 1, rest + d),
        withRest(q + 1, rest),
        off > 0 ? withRest(q, off) : withRest(q + 10, rest),
      ]),
      hint: `Số dư phải bé hơn số chia, tức là bé hơn ${d}.`,
      solution: divWords(n, d),
    };
  },
  'bieu-thuc': (rand) => {
    if (rand() < 0.5) {
      const { a: b, b: c } = drawMul(rand, pick(rand, /** @type {const} */ (['plain', 'one'])));
      const product = b * c;
      if (product > LIMIT - 1000) return MAKERS['bieu-thuc'](rand);
      const a = int(rand, 1000, LIMIT - product);
      const right = a + product;
      return {
        prompt: `Tính giá trị của biểu thức: ${fmt(a)} + ${fmt(b)} × ${c} = ?`,
        ...slipOptions(right, [(a + b) * c, a + b + c, right + 10]),
        hint: 'Biểu thức có phép cộng và phép nhân: em làm phép nhân trước.',
        solution: `${fmt(a)} + ${fmt(b)} × ${c} = ${fmt(a)} + ${fmt(product)} = ${fmt(right)}.`,
      };
    }
    const d = int(rand, 2, 9);
    const c = int(rand, 2, 9);
    const lo = Math.ceil(10000 / d);
    const hi = Math.floor(LIMIT / Math.max(d, c));
    if (lo > hi) return MAKERS['bieu-thuc'](rand);
    const q = int(rand, lo, hi);
    const n = q * d;
    const right = q * c;
    return {
      prompt: `Tính giá trị của biểu thức: ${fmt(n)} : ${d} × ${c} = ?`,
      ...slipOptions(right, [Math.floor(n / (d * c)), q + c, right + 10]),
      hint: 'Biểu thức chỉ có phép nhân và phép chia: em tính từ trái sang phải.',
      solution: `${fmt(n)} : ${d} × ${c} = ${fmt(q)} × ${c} = ${fmt(right)}.`,
    };
  },
  'bai-nhan': (rand) => {
    const { a, b } = drawMul(rand, pick(rand, /** @type {const} */ (['plain', 'one'])));
    const right = a * b;
    return {
      prompt: `Mỗi lần người ta chuyển ${fmt(a)} kg thóc vào kho. Hỏi ${b} lần như thế chuyển được bao nhiêu ki-lô-gam thóc?`,
      ...slipOptions(right, [noCarry(a, b), a + b, right + 100]),
      hint: `${fmt(a)} kg được lấy ${b} lần, em làm phép nhân.`,
      solution: `${b} lần chuyển được: ${fmt(a)} × ${b} = ${fmt(right)} (kg). Đáp số: ${fmt(right)} kg thóc.`,
    };
  },
  'bai-chia': (rand) => {
    const { n, d } = evenDivision(rand);
    const q = n / d;
    return {
      prompt: `Kho có ${fmt(n)} kg muối, chia đều lên ${d} ô tô. Hỏi mỗi ô tô chở bao nhiêu ki-lô-gam muối?`,
      ...slipOptions(q, [n - d, q + 10, Number(String(q).replace(/0/g, ''))]),
      hint: `Chia đều lên ${d} ô tô thì em làm phép chia cho ${d}.`,
      solution: `Mỗi ô tô chở: ${divText(n, d)} (kg). Đáp số: ${fmt(q)} kg muối.`,
    };
  },
  'bai-du': (rand) => {
    const { n, d } = drawDivision(rand, pick(rand, /** @type {const} */ (['rest', 'zero'])));
    const q = Math.floor(n / d);
    const rest = n % d;
    if (rest === 0) return MAKERS['bai-du'](rand);
    /** @param {number} boxes @param {number} left */
    const say = (boxes, left) => `${fmt(boxes)} vỉ, thừa ${left} viên`;
    return {
      prompt: `Có ${fmt(n)} viên thuốc, đóng vào các vỉ, mỗi vỉ ${d} viên. Đóng được nhiều nhất bao nhiêu vỉ và còn thừa mấy viên?`,
      ...mixOptions(rand, say(q, rest), [
        say(q - 1, rest + d),
        say(q + 1, rest),
        say(q, rest + 1 < d ? rest + 1 : rest - 1 || d),
      ]),
      hint: `Em chia ${fmt(n)} cho ${d}. Số viên thừa phải bé hơn ${d}.`,
      solution: `${divText(n, d)}. Đóng được nhiều nhất ${fmt(q)} vỉ, còn thừa ${rest} viên.`,
    };
  },
  'bai-hai-buoc': (rand) => {
    const c = int(rand, 2, 5);
    const a = int(rand, 1000, Math.floor(LIMIT / (c + 1)));
    const more = a * c;
    const right = a + more;
    return {
      prompt: `Trang trại có ${fmt(a)} cây chanh. Số cây cam gấp ${c} lần số cây chanh. Hỏi trang trại có tất cả bao nhiêu cây chanh và cây cam?`,
      ...slipOptions(right, [more, a + c, more + c]),
      hint: 'Trước hết em tính số cây cam, rồi cộng với số cây chanh.',
      solution: `Số cây cam: ${fmt(a)} × ${c} = ${fmt(more)} (cây). Tất cả: ${fmt(a)} + ${fmt(more)} = ${fmt(right)} (cây). Đáp số: ${fmt(right)} cây.`,
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
