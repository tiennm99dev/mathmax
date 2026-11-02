/**
 * The mixed practice round of "Luyện tập chung" for the chapter "Độ dài và đơn
 * vị đo độ dài. Tiền Việt Nam": converting between km, m, dm and cm, choosing
 * the unit that fits a thing, adding and subtracting lengths, reading a tape
 * marked in dm, money with banknotes, and word problems. Questions are built
 * from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions, questionKey } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { NOTES, sumNotes } from '../_shared/money.js';

/**
 * What the widget draws above the options: a tape marked in dm with an arrow,
 * some banknotes, or a broken line with the length of each side.
 * @typedef {{ type: 'tape', at: number }
 *   | { type: 'notes', notes: import('../_shared/money.js').Note[] }
 *   | { type: 'zigzag', sides: [number, number, number] }} Visual
 */

/** @typedef {'doi-don-vi' | 'chon-don-vi' | 'tinh-do-dai' | 'doc-thuoc' | 'tien' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'doi-don-vi',
  'chon-don-vi',
  'tinh-do-dai',
  'doc-thuoc',
  'tien',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'doi-don-vi': 'Đổi đơn vị độ dài',
  'chon-don-vi': 'Chọn đơn vị phù hợp',
  'tinh-do-dai': 'Tính với số đo độ dài',
  'doc-thuoc': 'Đọc thước đo',
  tien: 'Tiền Việt Nam',
  'bai-toan': 'Giải bài toán',
});

/** The last number on the tape, in dm. */
export const TAPE_MAX = 12;
/** The numbers printed on the tape; the other marks are left to count. */
export const TAPE_LABELS = /** @type {const} */ ([0, 5, 10]);

/** Things and their usual length, with the unit that fits. */
export const FIT_UNITS = /** @type {const} */ ([
  { text: 'Cái bút chì dài khoảng 15', unit: 'cm', why: 'Bút chì ngắn, nhỏ hơn hai gang tay.' },
  { text: 'Cục tẩy dài khoảng 4', unit: 'cm', why: 'Cục tẩy rất nhỏ, nằm gọn trong tay em.' },
  { text: 'Gang tay của em dài khoảng 1', unit: 'dm', why: 'Gang tay dài khoảng 10 cm.' },
  { text: 'Cái hộp bút dài khoảng 2', unit: 'dm', why: 'Hộp bút dài bằng khoảng hai gang tay.' },
  { text: 'Cái cửa lớp cao khoảng 2', unit: 'm', why: 'Cái cửa cao hơn người lớn một chút.' },
  { text: 'Cái giường dài khoảng 2', unit: 'm', why: 'Người lớn nằm vừa trên giường.' },
  {
    text: 'Quãng đường giữa hai thành phố dài khoảng 100',
    unit: 'km',
    why: 'Quãng đường rất dài, đi ô tô mất nhiều giờ.',
  },
  {
    text: 'Quãng đường từ nhà em đến trường dài khoảng 2',
    unit: 'km',
    why: 'Đường đi học dài, phải đi xe một lúc mới đến.',
  },
]);

/** The units on the buttons of a choose-the-unit question, shortest first. */
export const UNITS = /** @type {const} */ (['cm', 'dm', 'm', 'km']);

/**
 * Options near `right` at `step` apart, with their unit, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @param {number} step
 * @param {string} unit
 * @param {number} lo
 * @param {number} hi
 */
function stepOptions(rand, right, step, unit, lo, hi) {
  const near = [-3, -2, -1, 1, 2, 3].map((k) => right + k * step).filter((v) => v >= lo && v <= hi);
  const values = [right, ...shuffle(rand, near).slice(0, 3)].sort((a, b) => a - b);
  return { options: values.map((v) => `${v} ${unit}`), answer: values.indexOf(right) };
}

/**
 * Converting one length, with the slips of a wrong number of zeros.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function convertQuestion(rand) {
  const variant = int(rand, 0, 4);
  if (variant === 4) {
    return {
      prompt: '1 km = ? m',
      ...mixOptions(rand, '1000 m', ['10 m', '100 m']),
      hint: 'Ki-lô-mét là đơn vị lớn. Nhớ lại bài Ki-lô-mét.',
      solution: '1 km = 1000 m.',
    };
  }
  const a = int(rand, 2, 9);
  if (variant === 0) {
    return {
      prompt: `${a} m = ? dm`,
      ...mixOptions(rand, `${a * 10} dm`, [`${a} dm`, `${a * 100} dm`]),
      hint: '1 m = 10 dm.',
      solution: `1 m = 10 dm, nên ${a} m = ${a * 10} dm.`,
    };
  }
  if (variant === 1) {
    return {
      prompt: `${a} dm = ? cm`,
      ...mixOptions(rand, `${a * 10} cm`, [`${a} cm`, `${a * 100} cm`]),
      hint: '1 dm = 10 cm.',
      solution: `1 dm = 10 cm, nên ${a} dm = ${a * 10} cm.`,
    };
  }
  if (variant === 2) {
    return {
      prompt: `${a} m = ? cm`,
      ...mixOptions(rand, `${a * 100} cm`, [`${a} cm`, `${a * 10} cm`]),
      hint: '1 m = 100 cm.',
      solution: `1 m = 100 cm, nên ${a} m = ${a * 100} cm.`,
    };
  }
  return {
    prompt: `${a * 10} cm = ? dm`,
    ...mixOptions(rand, `${a} dm`, [`${a * 10} dm`, `${a * 100} dm`]),
    hint: '10 cm = 1 dm.',
    solution: `10 cm = 1 dm, nên ${a * 10} cm = ${a} dm.`,
  };
}

/**
 * Which unit fits a thing.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function unitQuestion(rand) {
  const { text, unit, why } = pick(rand, FIT_UNITS);
  return {
    prompt: `${text} ... Đơn vị nào phù hợp?`,
    options: [...UNITS],
    answer: UNITS.indexOf(unit),
    hint: why,
    solution: `${text} ${unit}.`,
  };
}

/**
 * Adding or subtracting two lengths in one unit.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function sumQuestion(rand) {
  const unit = pick(rand, ['dm', 'm', 'km']);
  const add = rand() < 0.5;
  const b = int(rand, 3, 20);
  const a = add ? int(rand, 5, 30) : b + int(rand, 2, 25);
  const right = add ? a + b : a - b;
  const near = numberOptions(rand, right, 0, 60);
  return {
    prompt: `${a} ${unit} ${add ? '+' : MINUS} ${b} ${unit} = ?`,
    options: near.options.map((o) => `${o} ${unit}`),
    answer: near.answer,
    hint: `Em tính ${a} ${add ? '+' : MINUS} ${b} như các số, rồi giữ nguyên đơn vị ${unit}.`,
    solution: `${a} ${add ? '+' : MINUS} ${b} = ${right}, nên ${a} ${unit} ${add ? '+' : MINUS} ${b} ${unit} = ${right} ${unit}.`,
  };
}

/**
 * Reading the mark an arrow points at on a tape marked in dm.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function tapeQuestion(rand) {
  const at = pick(rand, [1, 2, 3, 4, 6, 7, 8, 9, 11, 12]);
  const near = numberOptions(rand, at, 0, TAPE_MAX);
  const from = at > 10 ? 10 : at > 5 ? 5 : 0;
  return {
    prompt: 'Mũi tên chỉ vào vạch nào của thước?',
    visual: { type: 'tape', at },
    options: near.options.map((o) => `${o} dm`),
    answer: near.answer,
    hint: `Bắt đầu từ vạch ${from}. Mỗi khoảng giữa hai vạch là một đề-xi-mét, em đếm tiếp đến mũi tên.`,
    solution: `Từ vạch ${from}, đếm thêm ${at - from} vạch: mũi tên chỉ vào vạch ${at} dm.`,
  };
}

/**
 * Money: adding notes, swapping one note for smaller ones, or picking the
 * note that pays a price.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function moneyQuestion(rand) {
  const variant = int(rand, 0, 2);
  if (variant === 0) {
    const notes = /** @type {import('../_shared/money.js').Note[]} */ ([]);
    const count = int(rand, 2, 3);
    while (notes.length < count && sumNotes(notes) < 1000) {
      const next = pick(rand, /** @type {const} */ ([100, 200, 500]));
      if (sumNotes(notes) + next <= 1000) notes.push(next);
    }
    const right = sumNotes(notes);
    return {
      prompt: 'Các tờ tiền này có tất cả bao nhiêu đồng?',
      visual: { type: 'notes', notes },
      ...stepOptions(rand, right, 100, 'đồng', 100, 1000),
      hint: 'Em cộng số tiền của từng tờ.',
      solution: `${notes.join(' + ')} = ${right}. Có tất cả ${right} đồng.`,
    };
  }
  if (variant === 1) {
    const { big, small } = pick(rand, [
      { big: 200, small: 100 },
      { big: 500, small: 100 },
      { big: 1000, small: 500 },
      { big: 1000, small: 200 },
    ]);
    const right = big / small;
    return {
      prompt: `1 tờ ${big} đồng đổi được mấy tờ ${small} đồng?`,
      ...mixOptions(rand, `${right} tờ`, [`${right - 1} tờ`, `${right + 1} tờ`]),
      hint: `Em đếm thêm từng ${small} đồng cho đến ${big} đồng.`,
      solution: `${Array.from({ length: right }, () => small).join(' + ')} = ${big}. Vậy đổi được ${right} tờ ${small} đồng.`,
    };
  }
  const price = pick(rand, NOTES);
  const options = NOTES.map((n) => `Tờ ${n} đồng`);
  return {
    prompt: `Mai mua kẹo hết ${price} đồng. Mai chọn một tờ tiền nào để trả đúng giá?`,
    options,
    answer: NOTES.indexOf(price),
    hint: 'Em tìm tờ tiền có con số bằng giá kẹo.',
    solution: `Kẹo giá ${price} đồng, nên Mai trả tờ ${price} đồng.`,
  };
}

/**
 * A word problem with lengths, or the length of a broken line.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function storyQuestion(rand) {
  const story = int(rand, 0, 3);
  if (story === 0) {
    const a = int(rand, 3, 9) * 10;
    const b = int(rand, 10, a - 5);
    const right = a - b;
    const near = numberOptions(rand, right, 0, 100);
    return {
      prompt: `Nơi tham quan cách nhà ${a} km. Ô tô đã đi được ${b} km. Hỏi còn bao nhiêu ki-lô-mét nữa?`,
      options: near.options.map((o) => `${o} km`),
      answer: near.answer,
      hint: 'Quãng đường còn lại: em lấy cả quãng đường trừ đi phần đã đi.',
      solution: `Quãng đường còn lại là: ${a} ${MINUS} ${b} = ${right} (km). Đáp số: ${right} km.`,
    };
  }
  if (story === 1) {
    const a = int(rand, 10, 45);
    const b = int(rand, 10, 45);
    const right = a + b;
    const near = numberOptions(rand, right, 0, 100);
    return {
      prompt: `Đoạn đường thứ nhất dài ${a} km, đoạn đường thứ hai dài ${b} km. Cả hai đoạn dài bao nhiêu ki-lô-mét?`,
      options: near.options.map((o) => `${o} km`),
      answer: near.answer,
      hint: 'Hỏi "cả hai đoạn" nên em làm phép cộng.',
      solution: `Cả hai đoạn dài là: ${a} + ${b} = ${right} (km). Đáp số: ${right} km.`,
    };
  }
  if (story === 2) {
    const a = int(rand, 20, 60);
    const b = int(rand, 5, a - 5);
    const right = a - b;
    const near = numberOptions(rand, right, 0, 100);
    return {
      prompt: `Sợi dây dài ${a} dm. Em cắt đi ${b} dm. Sợi dây còn lại dài bao nhiêu đề-xi-mét?`,
      options: near.options.map((o) => `${o} dm`),
      answer: near.answer,
      hint: 'Cắt đi thì ngắn hơn. Em làm phép trừ.',
      solution: `Sợi dây còn lại dài là: ${a} ${MINUS} ${b} = ${right} (dm). Đáp số: ${right} dm.`,
    };
  }
  /** @type {[number, number, number]} */
  const sides = [int(rand, 4, 12), int(rand, 3, 10), int(rand, 3, 10)];
  const right = sides[0] + sides[1] + sides[2];
  const near = numberOptions(rand, right, 0, 40);
  return {
    prompt: 'Cây cầu gỗ là đường gấp khúc ABCD như hình. Cây cầu dài bao nhiêu mét?',
    visual: { type: 'zigzag', sides },
    options: near.options.map((o) => `${o} m`),
    answer: near.answer,
    hint: 'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng của nó.',
    solution: `Cây cầu dài là: ${sides.join(' + ')} = ${right} (m). Đáp số: ${right} m.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  'doi-don-vi': convertQuestion,
  'chon-don-vi': unitQuestion,
  'tinh-do-dai': sumQuestion,
  'doc-thuoc': tapeQuestion,
  tien: moneyQuestion,
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
 * A round of two different questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const asked = new Set();
  return shuffle(rand, [...KINDS, ...KINDS]).map((kind) => {
    let q = makeQuestion(kind, rand);
    for (let tries = 0; asked.has(questionKey(q)) && tries < 20; tries++) {
      q = makeQuestion(kind, rand);
    }
    asked.add(questionKey(q));
    return q;
  });
}
