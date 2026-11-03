/**
 * Millilitres in a measuring cylinder: pouring from a 1 l bottle up to a given
 * mark, and a practice round of cylinder readings, litre conversions and sums
 * in millilitres. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { CYLINDER_MAX, mlText, sortedOptions } from '../_shared/measure.js';

/** The first target of the widget. */
export const FIRST_TARGET = 300;

/**
 * Water in the cylinder after pouring `step` more, kept between empty and full.
 * @param {number} ml
 * @param {number} step
 */
export function pour(ml, step) {
  return Math.max(0, Math.min(CYLINDER_MAX, ml + step));
}

/**
 * The live sentence under the cylinder.
 * @param {number} target
 * @param {number} ml
 */
export function pourMessage(target, ml) {
  if (ml === target) {
    return target === CYLINDER_MAX
      ? `Đúng rồi! Mặt nước ở vạch ${fmt(CYLINDER_MAX)}. Chai 1 l đã hết nước: 1 l = ${mlText(CYLINDER_MAX)}.`
      : `Đúng rồi! Trong ống có ${mlText(target)} nước.`;
  }
  if (ml === 0) return 'Ống đong còn trống. Em rót nước từ chai 1 l vào nhé.';
  return ml < target
    ? `Ống có ${mlText(ml)}, chưa đến vạch ${mlText(target)}. Em rót thêm.`
    : `Ống có ${mlText(ml)}, quá vạch ${mlText(target)} rồi. Em đổ bớt ra.`;
}

/**
 * A new target on a mark of the cylinder, different from `not`.
 * @param {() => number} rand
 * @param {number} [not]
 */
export function makeTarget(rand, not) {
  for (;;) {
    const target = int(rand, 1, CYLINDER_MAX / 50) * 50;
    if (target !== not) return target;
  }
}

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc vạch ống đong',
  convert: 'Đổi lít ra mi-li-lít',
  fit: 'Chọn số đo thích hợp',
  calc: 'Tính với mi-li-lít',
  story: 'Bài toán',
});

const FITTING = [
  { thing: 'Cái thìa nhỏ', right: '5 ml', wrong: ['5 l', '500 ml'] },
  { thing: 'Cái cốc uống nước', right: '200 ml', wrong: ['200 l', '2 ml'] },
  { thing: 'Hộp sữa nhỏ', right: '180 ml', wrong: ['180 l', '18 l'] },
  { thing: 'Cái xô', right: '10 l', wrong: ['10 ml', '100 ml'] },
];

const STORIES = [
  {
    text: 'Chai dầu ăn có 800 ml. Mẹ dùng hết 350 ml. Trong chai còn lại bao nhiêu mi-li-lít dầu?',
    right: 450,
    slips: [1150, 550, 350],
    work: '800 − 350 = 450 (ml).',
    hint: 'Dùng hết thì lượng dầu ít đi. Em làm phép trừ.',
  },
  {
    text: 'Bình rót sang ba ca: ca thứ nhất 500 ml, ca thứ hai 200 ml, ca thứ ba 300 ml. Lúc đầu bình có bao nhiêu mi-li-lít nước?',
    right: 1000,
    slips: [700, 800, 900],
    work: '500 + 200 + 300 = 1 000 (ml).',
    hint: 'Em cộng số mi-li-lít ở cả ba ca.',
  },
  {
    text: 'Phích có 1 l nước. Rót ra hai cốc, mỗi cốc 250 ml. Phích còn lại bao nhiêu mi-li-lít nước?',
    right: 500,
    slips: [750, 250, 1250],
    work: '1 l = 1 000 ml; 250 × 2 = 500; 1 000 − 500 = 500 (ml).',
    hint: 'Em đổi 1 l ra mi-li-lít, rồi trừ đi số nước đã rót.',
  },
  {
    text: 'Mỗi chai nhỏ chứa 120 ml nước cam. Hỏi 3 chai như thế chứa bao nhiêu mi-li-lít?',
    right: 360,
    slips: [123, 240, 460],
    work: '120 × 3 = 360 (ml).',
    hint: '3 chai bằng nhau: em làm phép nhân.',
  },
];

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<{ ml: number }>} RoundQuestion
 */

/**
 * A round of eight questions. Only a cylinder reading carries a picture.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const stories = shuffle(rand, STORIES);
  const fitting = shuffle(rand, FITTING);
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['read', 'convert', 'read', 'calc', 'fit', 'calc', 'story', 'story'];
  let told = 0;
  return kinds.map((kind) => {
    if (kind === 'read') {
      const ml = int(rand, 2, 19) * 50;
      return {
        kind,
        visual: { ml },
        prompt: 'Trong ống đong có bao nhiêu mi-li-lít nước?',
        ...sortedOptions(mlText, ml, [ml + 50, ml - 50, ml + 100, ml + 150]),
        hint: 'Các vạch có ghi số cách nhau một trăm mi-li-lít. Vạch ngắn ở giữa là thêm năm mươi mi-li-lít.',
        solution: `Mặt nước ở vạch ${mlText(ml)}.`,
      };
    }
    if (kind === 'convert') {
      const l = int(rand, 2, 5);
      return {
        kind,
        prompt: `${l} l bằng bao nhiêu mi-li-lít?`,
        ...sortedOptions(mlText, l * 1000, [l * 10, l * 100, l * 10000]),
        hint: 'Mỗi lít bằng một nghìn mi-li-lít.',
        solution: `${l} l = ${mlText(l * 1000)}.`,
      };
    }
    if (kind === 'calc') {
      const op = pick(rand, ['+', '−', '×']);
      if (op === '×') {
        const n = int(rand, 11, 25);
        const k = int(rand, 2, 4);
        return {
          kind,
          prompt: `${mlText(n)} × ${k} = ?`,
          ...sortedOptions(mlText, n * k, [n + k, n * k + 10, Math.abs(n * k - 10)]),
          hint: 'Em nhân như với số, rồi viết thêm ml ở kết quả.',
          solution: `${n} × ${k} = ${n * k}. Kết quả là ${mlText(n * k)}.`,
        };
      }
      const a = int(rand, 3, 9) * 100 + 20;
      const b = int(rand, 1, 2) * 100 + 50;
      const right = op === '+' ? a + b : a - b;
      return {
        kind,
        prompt: `${mlText(a)} ${op} ${mlText(b)} = ?`,
        ...sortedOptions(mlText, right, [right + 100, Math.abs(right - 100), right + 20]),
        hint: 'Em tính như với số, rồi viết thêm ml ở kết quả.',
        solution: `${a} ${op} ${b} = ${right}. Kết quả là ${mlText(right)}.`,
      };
    }
    if (kind === 'fit') {
      const f = fitting[0];
      const options = shuffle(rand, [f.right, ...f.wrong]);
      return {
        kind,
        prompt: `${f.thing} chứa được khoảng bao nhiêu?`,
        options,
        answer: options.indexOf(f.right),
        hint: 'Vật nhỏ em đo bằng mi-li-lít. Vật to em đo bằng lít.',
        solution: `${f.thing} chứa được khoảng ${f.right}.`,
      };
    }
    const s = stories[told++ % stories.length];
    return {
      kind,
      prompt: s.text,
      ...sortedOptions(mlText, s.right, s.slips),
      hint: s.hint,
      solution: s.work,
    };
  });
}
