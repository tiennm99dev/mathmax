/**
 * Grams on a dial scale: putting things on the plate until the needle shows a
 * given mass, and a practice round of dial readings, kilogram conversions and
 * sums in grams. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { DIAL_MAX, gramText, sortedOptions } from '../_shared/measure.js';

/**
 * A thing to put on the plate.
 * @typedef {{ id: string, name: string, picture: import('#lib/core/kid/pictures/index.js').PictureName, g: number }} ScaleThing
 */

/** @type {readonly ScaleThing[]} */
export const THINGS = [
  { id: 'ball', name: 'Quả bóng nhỏ', picture: 'ball', g: 50 },
  { id: 'banana', name: 'Quả chuối', picture: 'banana', g: 100 },
  { id: 'apple', name: 'Quả táo', picture: 'apple', g: 150 },
  { id: 'orange', name: 'Quả cam', picture: 'orange', g: 200 },
  { id: 'grapes', name: 'Chùm nho', picture: 'grapes', g: 300 },
  { id: 'block', name: 'Gói đường', picture: 'block', g: 500 },
];

/**
 * The readings the dial can show, for wrong options on a dial question.
 * @param {number[]} slips
 */
const onDial = (slips) => slips.filter((g) => g >= 0 && g <= DIAL_MAX);

/** The first target of the widget. */
export const FIRST_TARGET = 350;

/**
 * Whether the plate can reach `target` with each thing used at most once.
 * @param {number} target
 */
export function reachable(target) {
  const sums = new Set([0]);
  for (const t of THINGS) for (const s of [...sums]) sums.add(s + t.g);
  return sums.has(target);
}

/**
 * The total on the plate.
 * @param {readonly string[]} placed ids of the things on the plate
 */
export function plateGrams(placed) {
  return THINGS.filter((t) => placed.includes(t.id)).reduce((sum, t) => sum + t.g, 0);
}

/**
 * Whether a thing still fits under the scale's last mark.
 * @param {readonly string[]} placed
 * @param {ScaleThing} thing
 */
export function fits(placed, thing) {
  return plateGrams(placed) + thing.g <= DIAL_MAX;
}

/**
 * The live sentence under the scale.
 * @param {number} target
 * @param {number} g what lies on the plate
 */
export function weighMessage(target, g) {
  if (g === target) {
    return target === DIAL_MAX
      ? `Đúng rồi! Kim chỉ ${gramText(target)}, đúng bằng 1 kg.`
      : `Đúng rồi! Kim chỉ ${gramText(target)}.`;
  }
  if (g === 0) return 'Đĩa cân còn trống, kim chỉ số 0. Em đặt đồ lên cân nhé.';
  return g < target
    ? `Kim chỉ ${gramText(g)}, chưa đến ${gramText(target)}. Em đặt thêm đồ.`
    : `Kim chỉ ${gramText(g)}, quá ${gramText(target)} rồi. Em nhấc bớt đồ ra.`;
}

/**
 * A new target the things can reach, different from `not`.
 * @param {() => number} rand
 * @param {number} [not]
 */
export function makeTarget(rand, not) {
  for (;;) {
    const target = int(rand, 2, DIAL_MAX / 50) * 50;
    if (target !== not && reachable(target)) return target;
  }
}

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc cân đồng hồ',
  convert: 'Đổi ki-lô-gam ra gam',
  balance: 'Đọc cân đĩa',
  calc: 'Tính với gam',
  fit: 'Chọn số đo thích hợp',
  story: 'Bài toán',
});

const FITTING = [
  { thing: 'Con chim bồ câu', right: '300 g', wrong: ['300 kg', '30 kg'] },
  { thing: 'Quả trứng gà', right: '50 g', wrong: ['50 kg', '5 kg'] },
  { thing: 'Con gà', right: '2 kg', wrong: ['2 g', '200 kg'] },
  { thing: 'Con bò', right: '200 kg', wrong: ['200 g', '2 kg'] },
];

const STORIES = [
  {
    text: 'Túi táo nặng 500 g, gói bột mì nặng 250 g. Cả hai nặng bao nhiêu gam?',
    right: 750,
    slips: [250, 700, 850],
    work: '500 + 250 = 750 (g).',
    hint: 'Muốn tìm cả hai, em làm phép cộng.',
  },
  {
    text: 'Lọ đường có 1 000 g. Mẹ dùng hết 150 g, sau đó dùng thêm 200 g. Lọ còn lại bao nhiêu gam đường?',
    right: 650,
    slips: [350, 850, 750],
    work: '1 000 − 150 = 850; 850 − 200 = 650 (g).',
    hint: 'Em lấy số gam ban đầu trừ dần từng lần mẹ dùng.',
  },
  {
    text: 'Mỗi gói kẹo nặng 25 g. Hỏi 4 gói kẹo như thế nặng bao nhiêu gam?',
    right: 100,
    slips: [29, 80, 125],
    work: '25 × 4 = 100 (g).',
    hint: '4 gói bằng nhau: em lấy số gam một gói nhân với 4.',
  },
  {
    text: 'Quả dưa nặng 800 g, quả xoài nhẹ hơn quả dưa 450 g. Quả xoài nặng bao nhiêu gam?',
    right: 350,
    slips: [450, 250, 650],
    work: '800 − 450 = 350 (g).',
    hint: 'Nhẹ hơn thì em làm phép trừ.',
  },
];

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<{ g: number }>} RoundQuestion
 */

/**
 * A round of eight questions. Only a dial reading carries a picture.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const stories = shuffle(rand, STORIES);
  const fitting = shuffle(rand, FITTING);
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['read', 'convert', 'balance', 'read', 'calc', 'fit', 'story', 'story'];
  let told = 0;
  return kinds.map((kind) => {
    if (kind === 'read') {
      const g = int(rand, 1, 19) * 50;
      return {
        kind,
        visual: { g },
        prompt: 'Cân chỉ bao nhiêu gam?',
        ...sortedOptions(gramText, g, onDial([g + 50, g - 50, g + 100, g - 100, g + 150])),
        hint: 'Các vạch có ghi số cách nhau một trăm gam. Vạch nhỏ ở giữa là thêm năm mươi gam.',
        solution: `Kim chỉ ${gramText(g)}.`,
      };
    }
    if (kind === 'convert') {
      const have = int(rand, 3, 17) * 50;
      const right = DIAL_MAX - have;
      return {
        kind,
        prompt: `Đĩa cân có ${gramText(have)}. Cần thêm bao nhiêu gam nữa để đủ 1 kg?`,
        ...sortedOptions(gramText, right, [have, right + 100, right - 100, right + 50]),
        hint: 'Em đổi 1 kg ra gam, rồi trừ đi số gam đã có.',
        solution: `1 kg = ${gramText(DIAL_MAX)}. ${fmt(DIAL_MAX)} − ${have} = ${right}. Cần thêm ${gramText(right)}.`,
      };
    }
    if (kind === 'balance') {
      const a = pick(rand, [100, 200, 500]);
      const b = pick(rand, [20, 50]);
      const right = a + b;
      return {
        kind,
        prompt: `Cân đĩa thăng bằng. Một đĩa có gói muối. Đĩa kia có quả cân ${a} g và quả cân ${b} g. Gói muối nặng bao nhiêu gam?`,
        ...sortedOptions(gramText, right, [a, a - b, right + 100]),
        hint: 'Cân thăng bằng thì hai đĩa nặng bằng nhau. Em cộng các quả cân.',
        solution: `${a} + ${b} = ${right}. Gói muối nặng ${gramText(right)}.`,
      };
    }
    if (kind === 'calc') {
      const a = int(rand, 4, 6) * 100 - 40;
      const b = int(rand, 1, 2) * 100 + 60;
      const op = pick(rand, ['+', '−', '×']);
      if (op === '×') {
        const n = int(rand, 11, 25);
        const k = int(rand, 2, 4);
        return {
          kind,
          prompt: `${gramText(n)} × ${k} = ?`,
          ...sortedOptions(gramText, n * k, [n + k, n * k + 10, Math.abs(n * k - 10)]),
          hint: 'Em nhân như với số, rồi viết thêm g ở kết quả.',
          solution: `${n} × ${k} = ${n * k}. Kết quả là ${gramText(n * k)}.`,
        };
      }
      const right = op === '+' ? a + b : a - b;
      return {
        kind,
        prompt: `${gramText(a)} ${op} ${gramText(b)} = ?`,
        ...sortedOptions(gramText, right, [right + 100, Math.abs(right - 100), right + 20]),
        hint: 'Em tính như với số, rồi viết thêm g ở kết quả.',
        solution: `${a} ${op} ${b} = ${right}. Kết quả là ${gramText(right)}.`,
      };
    }
    if (kind === 'fit') {
      const f = fitting[0];
      const options = shuffle(rand, [f.right, ...f.wrong]);
      return {
        kind,
        prompt: `${f.thing} nặng khoảng bao nhiêu?`,
        options,
        answer: options.indexOf(f.right),
        hint: 'Vật nhẹ em đo bằng gam. Vật nặng em đo bằng ki-lô-gam.',
        solution: `${f.thing} nặng khoảng ${f.right}.`,
      };
    }
    const s = stories[told++ % stories.length];
    return {
      kind,
      prompt: s.text,
      ...sortedOptions(gramText, s.right, s.slips),
      hint: s.hint,
      solution: s.work,
    };
  });
}
