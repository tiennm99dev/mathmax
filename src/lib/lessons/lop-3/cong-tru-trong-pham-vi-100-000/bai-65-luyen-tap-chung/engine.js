/**
 * The mixed practice of the chapter: adding and subtracting within 100 000 in
 * the head and in columns, expressions, checking a subtraction, and word
 * problems. One question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { columnWords, drawColumn, noCarry, slipOptions } from '../_shared/columns.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'cong-nham': 'Cộng nhẩm số tròn nghìn, tròn chục nghìn',
  'tru-nham': 'Trừ nhẩm số tròn nghìn, tròn chục nghìn',
  cong: 'Phép cộng có nhớ',
  tru: 'Phép trừ có nhớ',
  'bieu-thuc': 'Tính giá trị biểu thức',
  'thu-lai': 'Thử lại phép trừ',
  'bai-hon': 'Bài toán nhiều hơn, ít hơn',
  'bai-hai-buoc': 'Bài toán giải bằng hai bước',
});

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'cong-nham': (rand) => {
    if (rand() < 0.5) {
      const x = int(rand, 1, 8);
      const y = int(rand, 1, 10 - x);
      const right = (x + y) * 10000;
      return {
        prompt: `Tính nhẩm: ${fmt(x * 10000)} + ${fmt(y * 10000)} = ?`,
        ...slipOptions(right, [(x + y) * 1000, right - 10000, right + 10000]),
        hint: `Em nhẩm: ${x} chục nghìn + ${y} chục nghìn = mấy chục nghìn?`,
        solution: `${x} chục nghìn + ${y} chục nghìn = ${x + y} chục nghìn. Vậy ${fmt(x * 10000)} + ${fmt(y * 10000)} = ${fmt(right)}.`,
      };
    }
    const x = int(rand, 11, 89);
    const y = int(rand, 2, 9);
    const right = (x + y) * 1000;
    return {
      prompt: `Tính nhẩm: ${fmt(x * 1000)} + ${fmt(y * 1000)} = ?`,
      ...slipOptions(right, [x * 1000 + y * 100, right - 10000, right + 1000]),
      hint: `Em nhẩm: ${x} nghìn + ${y} nghìn = mấy nghìn?`,
      solution: `${x} nghìn + ${y} nghìn = ${x + y} nghìn. Vậy ${fmt(x * 1000)} + ${fmt(y * 1000)} = ${fmt(right)}.`,
    };
  },
  'tru-nham': (rand) => {
    if (rand() < 0.5) {
      const x = int(rand, 3, 10);
      const y = int(rand, 1, x - 1);
      const right = (x - y) * 10000;
      return {
        prompt: `Tính nhẩm: ${fmt(x * 10000)} − ${fmt(y * 10000)} = ?`,
        ...slipOptions(right, [right + 10000, (x - y) * 1000, right - 10000]),
        hint: `Em nhẩm: ${x} chục nghìn − ${y} chục nghìn = mấy chục nghìn?`,
        solution: `${x} chục nghìn − ${y} chục nghìn = ${x - y} chục nghìn. Vậy ${fmt(x * 10000)} − ${fmt(y * 10000)} = ${fmt(right)}.`,
      };
    }
    const x = int(rand, 12, 99);
    const y = int(rand, 2, 9);
    const right = (x - y) * 1000;
    return {
      prompt: `Tính nhẩm: ${fmt(x * 1000)} − ${fmt(y * 1000)} = ?`,
      ...slipOptions(right, [x * 1000 - y * 100, right + 10000, right - 1000]),
      hint: `Em nhẩm: ${x} nghìn − ${y} nghìn = mấy nghìn?`,
      solution: `${x} nghìn − ${y} nghìn = ${x - y} nghìn. Vậy ${fmt(x * 1000)} − ${fmt(y * 1000)} = ${fmt(right)}.`,
    };
  },
  cong: (rand) => {
    const { a, b } = drawColumn(rand, '+', pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a + b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '+'), right - 10, right + 1000]),
      hint: 'Em cộng từ hàng đơn vị. Đủ 10 thì nhớ 1 sang hàng bên trái.',
      solution: columnWords(a, b, '+'),
    };
  },
  tru: (rand) => {
    const { a, b } = drawColumn(rand, '-', pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a - b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} − ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '-'), right + 10, right - 1000]),
      hint: 'Em trừ từ hàng đơn vị. Không trừ được thì lấy thêm 10, rồi nhớ 1 vào hàng bên trái của số trừ.',
      solution: columnWords(a, b, '-'),
    };
  },
  'bieu-thuc': (rand) => {
    const a = int(rand, 20, 60) * 1000;
    const b = int(rand, 5, 30) * 1000;
    const c = int(rand, 5, 15) * 1000;
    if (rand() < 0.5) {
      const first = a + b;
      const right = first - c;
      return {
        prompt: `Tính giá trị biểu thức: ${fmt(a)} + ${fmt(b)} − ${fmt(c)} = ?`,
        ...slipOptions(right, [first + c, a - b + c, right + 1000]),
        hint: 'Biểu thức chỉ có phép cộng, phép trừ: em tính từ trái sang phải.',
        solution: `${fmt(a)} + ${fmt(b)} = ${fmt(first)}. ${fmt(first)} − ${fmt(c)} = ${fmt(right)}.`,
      };
    }
    const inner = b + c;
    const right = a + 40000 - inner;
    const big = a + 40000;
    return {
      prompt: `Tính giá trị biểu thức: ${fmt(big)} − (${fmt(b)} + ${fmt(c)}) = ?`,
      ...slipOptions(right, [big - b + c, right + 1000, right - 10000]),
      hint: 'Biểu thức có dấu ngoặc: em tính trong ngoặc trước.',
      solution: `${fmt(b)} + ${fmt(c)} = ${fmt(inner)}. ${fmt(big)} − ${fmt(inner)} = ${fmt(right)}.`,
    };
  },
  'thu-lai': (rand) => {
    const { a, b } = drawColumn(rand, '-', 'one');
    const d = a - b;
    return {
      prompt: `Để thử lại phép trừ ${fmt(a)} − ${fmt(b)} = ${fmt(d)}, em làm phép tính nào?`,
      ...mixOptions(rand, `${fmt(d)} + ${fmt(b)}`, [
        `${fmt(a)} + ${fmt(b)}`,
        `${fmt(a)} + ${fmt(d)}`,
      ]),
      hint: 'Em lấy hiệu cộng với số trừ, xem có được số bị trừ không.',
      solution: `Em lấy hiệu cộng số trừ: ${fmt(d)} + ${fmt(b)} = ${fmt(a)}, đúng bằng số bị trừ.`,
    };
  },
  'bai-hon': (rand) => {
    const more = rand() < 0.5;
    const { a, b } = more ? drawColumn(rand, '+', 'one') : drawColumn(rand, '-', 'one');
    const right = more ? a + b : a - b;
    const word = more ? 'nhiều hơn' : 'ít hơn';
    const op = more ? '+' : '−';
    return {
      prompt: `Nông trại thứ nhất thu được ${fmt(a)} kg cam. Nông trại thứ hai thu được ${word} nông trại thứ nhất ${fmt(b)} kg cam. Nông trại thứ hai thu được bao nhiêu ki-lô-gam cam?`,
      ...slipOptions(right, [more ? a - b : a + b, noCarry(a, b, more ? '+' : '-')]),
      hint: more ? '"Nhiều hơn" thì em làm phép cộng.' : '"Ít hơn" thì em làm phép trừ.',
      solution: `Nông trại thứ hai thu được: ${fmt(a)} ${op} ${fmt(b)} = ${fmt(right)} (kg). Đáp số: ${fmt(right)} kg cam.`,
    };
  },
  'bai-hai-buoc': (rand) => {
    const total = int(rand, 30, 90) * 1000 + int(rand, 1, 9) * 100;
    const first = int(rand, 10, Math.floor(total / 2000)) * 1000 + int(rand, 1, 9) * 50;
    const second = int(rand, 5, Math.floor((total - first) / 1000) - 1) * 1000;
    const left = total - first;
    const right = left - second;
    return {
      prompt: `Cửa hàng có ${fmt(total)} l xăng. Buổi sáng cửa hàng bán ${fmt(first)} l, buổi chiều bán ${fmt(second)} l. Hỏi cửa hàng còn lại bao nhiêu lít xăng?`,
      ...slipOptions(right, [left, total - second, first + second]),
      hint: 'Trước hết em tính số lít xăng còn lại sau buổi sáng.',
      solution: `Sau buổi sáng còn lại: ${fmt(total)} − ${fmt(first)} = ${fmt(left)} (l). Sau buổi chiều còn lại: ${fmt(left)} − ${fmt(second)} = ${fmt(right)} (l). Đáp số: ${fmt(right)} l xăng.`,
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
