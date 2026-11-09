/**
 * The mixed practice of the chapter: adding, subtracting, multiplying and
 * dividing within 10 000 in the head and in columns, and word problems. One
 * question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import {
  columnWords,
  divText,
  divWords,
  drawColumn,
  drawDivision,
  noCarry,
  slipOptions,
  withRest,
} from '../_shared/columns.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'cong-nham': 'Cộng nhẩm số tròn nghìn, tròn trăm',
  cong: 'Phép cộng có nhớ',
  'tru-nham': 'Trừ nhẩm số tròn nghìn, tròn trăm',
  tru: 'Phép trừ có nhớ',
  nhan: 'Nhân số có bốn chữ số',
  chia: 'Chia hết số có bốn chữ số',
  'chia-du': 'Phép chia có dư',
  'bai-hon': 'Bài toán nhiều hơn, ít hơn',
  'bai-nhan-chia': 'Bài toán có phép nhân, phép chia',
  'bai-hai-buoc': 'Bài toán giải bằng hai bước',
});

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'cong-nham': (rand) => {
    if (rand() < 0.5) {
      const x = int(rand, 1, 8);
      const y = int(rand, 1, 10 - x);
      const right = (x + y) * 1000;
      return {
        prompt: `Tính nhẩm: ${fmt(x * 1000)} + ${fmt(y * 1000)} = ?`,
        ...slipOptions(right, [(x + y) * 100, right - 1000, x * 1000 + y]),
        hint: `Em nhẩm: ${x} nghìn + ${y} nghìn = mấy nghìn?`,
        solution: `${x} nghìn + ${y} nghìn = ${x + y} nghìn. Vậy ${fmt(x * 1000)} + ${fmt(y * 1000)} = ${fmt(right)}.`,
      };
    }
    const th = int(rand, 1, 8);
    const h = int(rand, 1, 7);
    const add = int(rand, 1, 9 - h);
    const a = th * 1000 + h * 100;
    const right = a + add * 100;
    return {
      prompt: `Tính nhẩm: ${fmt(a)} + ${add * 100} = ?`,
      ...slipOptions(right, [a + add * 1000, a + add * 10, right + 1000]),
      hint: `Em cộng hàng trăm: ${h} trăm + ${add} trăm.`,
      solution: `${h} trăm + ${add} trăm = ${h + add} trăm. Vậy ${fmt(a)} + ${add * 100} = ${fmt(right)}.`,
    };
  },
  cong: (rand) => {
    const { a, b } = drawColumn(rand, '+', pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a + b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '+'), right - 10, right + 100]),
      hint: 'Em cộng từ hàng đơn vị. Đủ 10 thì nhớ 1 sang hàng bên trái.',
      solution: columnWords(a, b, '+'),
    };
  },
  'tru-nham': (rand) => {
    if (rand() < 0.5) {
      const x = int(rand, 3, 10);
      const y = int(rand, 1, x - 1);
      const right = (x - y) * 1000;
      return {
        prompt: `Tính nhẩm: ${fmt(x * 1000)} − ${fmt(y * 1000)} = ?`,
        ...slipOptions(right, [right + 1000, (x - y) * 100, right - 1000]),
        hint: `Em nhẩm: ${x} nghìn − ${y} nghìn = mấy nghìn?`,
        solution: `${x} nghìn − ${y} nghìn = ${x - y} nghìn. Vậy ${fmt(x * 1000)} − ${fmt(y * 1000)} = ${fmt(right)}.`,
      };
    }
    const th = int(rand, 1, 9);
    const h = int(rand, 2, 9);
    const take = int(rand, 1, h);
    const a = th * 1000 + h * 100;
    const right = a - take * 100;
    return {
      prompt: `Tính nhẩm: ${fmt(a)} − ${take * 100} = ?`,
      ...slipOptions(right, [a - take * 10, right + 1000, right - 1000]),
      hint: `Em trừ hàng trăm: ${h} trăm − ${take} trăm.`,
      solution: `${h} trăm − ${take} trăm = ${h - take} trăm. Vậy ${fmt(a)} − ${take * 100} = ${fmt(right)}.`,
    };
  },
  tru: (rand) => {
    const { a, b } = drawColumn(rand, '-', pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a - b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} − ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '-'), right + 10, right - 100]),
      hint: 'Em trừ từ hàng đơn vị. Không trừ được thì mượn 1, rồi nhớ 1 vào hàng bên trái của số trừ.',
      solution: columnWords(a, b, '-'),
    };
  },
  nhan: (rand) => {
    const { a, b } = drawColumn(rand, '×', pick(rand, /** @type {const} */ (['one', 'many'])));
    const right = a * b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} × ${b} = ?`,
      ...slipOptions(right, [noCarry(a, b, '×'), right - 10, right + 100]),
      hint: 'Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ vào hàng tiếp theo.',
      solution: columnWords(a, b, '×'),
    };
  },
  chia: (rand) => {
    const { n, d } = drawDivision(rand, rand() < 0.5 ? 'exact' : 'zero');
    if (n % d > 0) return MAKERS.chia(rand);
    const q = n / d;
    const dropped = Number(String(q).replace(/0/g, ''));
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      ...slipOptions(q, [dropped, q + 100, q - 10]),
      hint: 'Em chia từ hàng nghìn. Mỗi lần hạ một chữ số, em viết một chữ số ở thương.',
      solution: divWords(n, d),
    };
  },
  'chia-du': (rand) => {
    const { n, d } = drawDivision(rand, rand() < 0.5 ? 'rest' : 'two');
    const q = Math.floor(n / d);
    const rest = n % d;
    if (rest === 0) return MAKERS['chia-du'](rand);
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
  'bai-hon': (rand) => {
    const more = rand() < 0.5;
    const { a, b } = more ? drawColumn(rand, '+', 'one') : drawColumn(rand, '-', 'one');
    const right = more ? a + b : a - b;
    const word = more ? 'nhiều hơn' : 'ít hơn';
    const op = more ? '+' : '−';
    return {
      prompt: `Kho thứ nhất có ${fmt(a)} kg gạo. Kho thứ hai có ${word} kho thứ nhất ${fmt(b)} kg gạo. Kho thứ hai có bao nhiêu ki-lô-gam gạo?`,
      ...slipOptions(right, [more ? a - b : a + b, noCarry(a, b, more ? '+' : '-')]),
      hint: more ? '"Nhiều hơn" thì em làm phép cộng.' : '"Ít hơn" thì em làm phép trừ.',
      solution: `Kho thứ hai có: ${fmt(a)} ${op} ${fmt(b)} = ${fmt(right)} (kg). Đáp số: ${fmt(right)} kg gạo.`,
    };
  },
  'bai-nhan-chia': (rand) => {
    if (rand() < 0.5) {
      const { a, b } = drawColumn(rand, '×', pick(rand, /** @type {const} */ (['plain', 'one'])));
      const right = a * b;
      return {
        prompt: `Mỗi xe chở ${fmt(a)} kg hàng. Hỏi ${b} xe như thế chở bao nhiêu ki-lô-gam hàng?`,
        ...slipOptions(right, [noCarry(a, b, '×'), a + b, right + 100]),
        hint: `${fmt(a)} kg được lấy ${b} lần, em làm phép nhân.`,
        solution: `${b} xe chở được: ${fmt(a)} × ${b} = ${fmt(right)} (kg). Đáp số: ${fmt(right)} kg hàng.`,
      };
    }
    const { n, d } = drawDivision(rand, pick(rand, /** @type {const} */ (['exact', 'two'])));
    if (n % d > 0) return MAKERS['bai-nhan-chia'](rand);
    const q = n / d;
    return {
      prompt: `Có ${fmt(n)} quyển vở chia đều cho ${d} lớp. Hỏi mỗi lớp được bao nhiêu quyển vở?`,
      ...slipOptions(q, [n - d, q + 10, q * 10]),
      hint: `Chia đều cho ${d} lớp thì em làm phép chia cho ${d}.`,
      solution: `Mỗi lớp được: ${divText(n, d)} (quyển). Đáp số: ${fmt(q)} quyển vở.`,
    };
  },
  'bai-hai-buoc': (rand) => {
    const total = int(rand, 5, 9) * 1000;
    const first = int(rand, 10, 24) * 100;
    const second = int(rand, 10, 24) * 100;
    const used = first + second;
    const right = total - used;
    return {
      prompt: `Xe bồn chở ${fmt(total)} l xăng. Xe bơm vào trạm thứ nhất ${fmt(first)} l, vào trạm thứ hai ${fmt(second)} l. Hỏi trên xe còn lại bao nhiêu lít xăng?`,
      ...slipOptions(right, [total - first, total - second, used]),
      hint: 'Trước hết em tính số lít xăng đã bơm vào cả hai trạm.',
      solution: `Đã bơm: ${fmt(first)} + ${fmt(second)} = ${fmt(used)} (l). Còn lại: ${fmt(total)} − ${fmt(used)} = ${fmt(right)} (l). Đáp số: ${fmt(right)} l xăng.`,
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
