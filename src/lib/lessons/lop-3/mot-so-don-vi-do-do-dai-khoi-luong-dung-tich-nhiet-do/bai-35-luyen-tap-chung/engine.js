/**
 * The mixed practice of the chapter: reading the four measuring tools, working
 * with measures, a pan balance with weights on both pans, comparing three bags,
 * chains of multiplying and dividing, and word problems, one question of each
 * part in a shuffled order. Also the book's puzzle of measuring water with two
 * unmarked cups. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import {
  CYLINDER_MAX,
  DIAL_MAX,
  HOT_END,
  RULER_CM,
  degText,
  gramText,
  mlText,
  mmText,
  sortedOptions,
} from '../_shared/measure.js';

/** @typedef {import('#lib/core/kid/mass.js').Load} Load */

/**
 * What a question draws above its options. A balance gets its loads in grams,
 * in the `kg` field the drawing compares them by.
 * @typedef {(
 *   | { type: 'ruler', mm: number }
 *   | { type: 'dial', g: number }
 *   | { type: 'cylinder', ml: number }
 *   | { type: 'thermometer', t: number }
 *   | { type: 'balance', left: Load[], right: Load[] }
 *   | { type: 'bags', scales: { left: Load[], right: Load[] }[] }
 *   | { type: 'chain', start: string, steps: { sign: string, value: string }[] }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-thuoc': 'Đọc thước theo mi-li-mét',
  'doc-can': 'Đọc cân đồng hồ',
  'doc-ong': 'Đọc vạch ống đong',
  'doc-nhiet': 'Đọc nhiệt kế',
  doi: 'Đổi đơn vị đo',
  tinh: 'Tính với số đo',
  'tinh-ba': 'Tính lần lượt với số đo',
  'day-tinh': 'Nhân, chia theo mũi tên',
  'can-dia': 'Đọc cân đĩa',
  'ba-tui': 'So sánh khối lượng',
  'chon-so-do': 'Chọn số đo thích hợp',
  'bai-toan': 'Bài toán thực tế',
});

/** The measures a calculation may use. */
const WRITERS = [mmText, gramText, mlText];

/**
 * Screen-reader names for options written in °C.
 * @param {string[]} options
 */
const degLabels = (options) => options.map((o) => o.replace('°C', 'độ C'));

/**
 * The slips that are still a measure.
 * @param {number[]} slips
 */
const positive = (slips) => slips.filter((v) => v > 0);

/**
 * The wrong readings a tool can show.
 * @param {number} max the tool's last mark
 * @param {number[]} slips
 */
const onScale = (max, slips) => slips.filter((v) => v > 0 && v <= max);

/**
 * A labelled box on a pan.
 * @param {string} name
 * @param {number} g
 * @returns {Load}
 */
const box = (name, g) => ({ kind: 'thing', name, kg: g });

/**
 * A gram weight on a pan (quả cân 100 g).
 * @param {number} g
 * @returns {Load}
 */
const weight = (g) => ({ kind: 'weight', kg: g, unit: 'g' });

const FITTING = [
  {
    ask: 'Cái kẹp giấy dài khoảng bao nhiêu?',
    say: 'Cái kẹp giấy dài khoảng',
    right: '30 mm',
    wrong: ['30 cm', '30 m'],
  },
  {
    ask: 'Cây bút chì mới dài khoảng bao nhiêu?',
    say: 'Cây bút chì mới dài khoảng',
    right: '18 cm',
    wrong: ['18 mm', '18 m'],
  },
  {
    ask: 'Quả trứng gà nặng khoảng bao nhiêu?',
    say: 'Quả trứng gà nặng khoảng',
    right: '50 g',
    wrong: ['50 kg', '5 kg'],
  },
  {
    ask: 'Hộp sữa nhỏ chứa khoảng bao nhiêu?',
    say: 'Hộp sữa nhỏ chứa khoảng',
    right: '180 ml',
    wrong: ['180 l', '18 l'],
  },
  {
    ask: 'Trưa hè nắng nóng, trời khoảng bao nhiêu độ?',
    say: 'Trưa hè nắng nóng, trời khoảng',
    right: '36 °C',
    wrong: ['3 °C', '90 °C'],
  },
];

const STORIES = [
  {
    text: 'Đơm 1 chiếc cúc áo hết 80 mm chỉ. Đơm 3 chiếc cúc như vậy cần bao nhiêu mi-li-mét chỉ?',
    right: 240,
    slips: [83, 160, 320],
    write: mmText,
    work: '80 × 3 = 240. Cần 240 mm chỉ.',
    hint: '3 chiếc cúc như nhau: em làm phép nhân.',
  },
  {
    text: 'Gói bánh nặng 350 g. Hộp kẹo nhẹ hơn gói bánh 120 g. Hộp kẹo nặng bao nhiêu gam?',
    right: 230,
    slips: [470, 120, 220],
    write: gramText,
    work: '350 − 120 = 230. Hộp kẹo nặng 230 g.',
    hint: 'Nhẹ hơn thì em làm phép trừ.',
  },
  {
    text: 'Bình có 1 l nước. Rót ra 2 cốc, mỗi cốc 200 ml. Bình còn lại bao nhiêu mi-li-lít nước?',
    right: 600,
    slips: [800, 400, 700],
    write: mlText,
    work: `1 l = ${mlText(1000)}. 200 + 200 = 400. ${fmt(1000)} − 400 = 600. Bình còn lại 600 ml.`,
    hint: 'Em đổi 1 l ra mi-li-lít, rồi trừ đi số nước đã rót.',
  },
  {
    text: 'Ca có 650 ml sữa. Mẹ rót thêm 250 ml vào ca. Ca có tất cả bao nhiêu mi-li-lít sữa?',
    right: 900,
    slips: [400, 800, 950],
    write: mlText,
    work: '650 + 250 = 900. Ca có tất cả 900 ml.',
    hint: 'Rót thêm thì em làm phép cộng.',
  },
  {
    text: 'Buổi sáng trời 25 °C. Buổi trưa nóng hơn buổi sáng 8 °C. Buổi trưa trời bao nhiêu độ C?',
    right: 33,
    slips: [17, 34, 23],
    write: degText,
    work: '25 + 8 = 33. Buổi trưa trời 33 °C.',
    hint: 'Nóng hơn thì nhiệt độ cao hơn. Em làm phép cộng.',
  },
];

/**
 * A multiply-then-divide or divide-then-multiply chain, all within the steps
 * this grade has learned and ending on a new number.
 * @param {() => number} rand
 */
function drawChain(rand) {
  for (;;) {
    const m = int(rand, 2, 5);
    const d = int(rand, 2, 9);
    if (m === d) continue;
    if (rand() < 0.5) {
      const start = int(rand, 2, 20);
      const first = start * m;
      if (first <= 99 && first % d === 0 && first / d >= 2) {
        return { start, first, last: first / d, m, d, multiplyFirst: true };
      }
    } else {
      const first = int(rand, 2, 19);
      const start = first * d;
      if (start >= 12 && start <= 99 && first * m <= 99) {
        return { start, first, last: first * m, m, d, multiplyFirst: false };
      }
    }
  }
}

/**
 * How to read a strip on the ruler, whose numbers count centimetres.
 * @param {number} mm
 */
function rulerWork(mm) {
  const cm = Math.floor(mm / 10);
  const rest = mm % 10;
  const reading =
    cm === 0
      ? `Đầu băng màu qua ${rest} khoảng nhỏ.`
      : rest === 0
        ? `Đầu băng màu ở vạch số ${cm}. ${cm} cm = ${mmText(mm)}.`
        : `Vạch số ${cm} là ${mmText(cm * 10)}, thêm ${rest} khoảng nhỏ nữa.`;
  return `${reading} Băng màu dài ${mmText(mm)}.`;
}

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'doc-thuoc': (rand) => {
    const mm = int(rand, 5, RULER_CM * 10 - 5);
    return {
      visual: { type: 'ruler', mm },
      prompt: 'Băng màu dài bao nhiêu mi-li-mét?',
      ...sortedOptions(mmText, mm, onScale(RULER_CM * 10, [mm + 1, mm - 1, mm + 10, mm - 10])),
      hint: 'Giữa hai vạch có số là 10 khoảng nhỏ. Mỗi khoảng nhỏ dài 1 mi-li-mét.',
      solution: rulerWork(mm),
    };
  },
  'doc-can': (rand) => {
    const g = int(rand, 1, 19) * 50;
    return {
      visual: { type: 'dial', g },
      prompt: 'Cân chỉ bao nhiêu gam?',
      ...sortedOptions(gramText, g, onScale(DIAL_MAX, [g + 50, g - 50, g + 100, g - 100])),
      hint: 'Các vạch có ghi số cách nhau một trăm gam. Vạch nhỏ ở giữa là thêm năm mươi gam.',
      solution: `Kim chỉ ${gramText(g)}.`,
    };
  },
  'doc-ong': (rand) => {
    const ml = int(rand, 1, 19) * 50;
    return {
      visual: { type: 'cylinder', ml },
      prompt: 'Trong ống đong có bao nhiêu mi-li-lít nước?',
      ...sortedOptions(mlText, ml, onScale(CYLINDER_MAX, [ml + 50, ml - 50, ml + 100, ml - 100])),
      hint: 'Các vạch có ghi số cách nhau một trăm mi-li-lít. Vạch nhỏ ở giữa là thêm năm mươi mi-li-lít.',
      solution: `Mặt nước ở vạch ${fmt(ml)}. Trong ống có ${mlText(ml)}.`,
    };
  },
  'doc-nhiet': (rand) => {
    const t = int(rand, 5, HOT_END - 5);
    const { options, answer } = sortedOptions(
      degText,
      t,
      onScale(HOT_END, [t + 1, t - 1, t + 10, t - 10]),
    );
    return {
      visual: { type: 'thermometer', t },
      prompt: 'Nhiệt kế chỉ bao nhiêu độ C?',
      options,
      answer,
      optionLabels: degLabels(options),
      hint: 'Số ghi cách nhau 10 độ. Mỗi vạch nhỏ là 1 độ. Em nhìn đỉnh cột đỏ.',
      solution: `Đỉnh cột đỏ ở vạch ${t}. Nhiệt kế chỉ ${degText(t)}.`,
    };
  },
  doi: (rand) => {
    const form = pick(rand, /** @type {const} */ (['cm', 'cm-mm', 'kg', 'l']));
    if (form === 'cm') {
      const cm = int(rand, 2, 9);
      return {
        prompt: `${cm} cm = ? mm`,
        ...sortedOptions(mmText, cm * 10, [cm, cm * 100, cm + 10]),
        hint: 'Mỗi xăng-ti-mét có mười mi-li-mét.',
        solution: `1 cm = 10 mm, nên ${cm} cm = ${mmText(cm * 10)}.`,
      };
    }
    if (form === 'cm-mm') {
      const cm = int(rand, 1, 9);
      const mm = int(rand, 1, 9);
      const right = cm * 10 + mm;
      return {
        prompt: `${cm} cm ${mm} mm = ? mm`,
        ...sortedOptions(mmText, right, [cm + mm, cm * 100 + mm, mm * 10 + cm, right + 10]),
        hint: 'Em đổi số xăng-ti-mét ra mi-li-mét, rồi cộng số mi-li-mét còn lại.',
        solution: `${cm} cm = ${mmText(cm * 10)}. ${cm * 10} + ${mm} = ${right}. Vậy ${cm} cm ${mm} mm = ${mmText(right)}.`,
      };
    }
    const part = int(rand, 2, 18) * 50;
    const right = 1000 - part;
    const slips = positive([part, right + 100, right - 100, right + 50]);
    if (form === 'kg') {
      return {
        prompt: `1 kg − ${gramText(part)} = ?`,
        ...sortedOptions(gramText, right, slips),
        hint: 'Em đổi 1 kg ra gam, rồi trừ.',
        solution: `1 kg = ${gramText(1000)}. ${fmt(1000)} − ${part} = ${right}. Kết quả là ${gramText(right)}.`,
      };
    }
    return {
      prompt: `1 l − ${mlText(part)} = ?`,
      ...sortedOptions(mlText, right, slips),
      hint: 'Em đổi 1 l ra mi-li-lít, rồi trừ.',
      solution: `1 l = ${mlText(1000)}. ${fmt(1000)} − ${part} = ${right}. Kết quả là ${mlText(right)}.`,
    };
  },
  tinh: (rand) => {
    const write = pick(rand, WRITERS);
    const add = rand() < 0.5;
    const a = int(rand, 150, add ? 700 : 950);
    const b = add ? int(rand, 15, 900 - a) : int(rand, 25, a - 50);
    const right = add ? a + b : a - b;
    const sign = add ? '+' : '−';
    return {
      prompt: `${write(a)} ${sign} ${write(b)} = ?`,
      ...sortedOptions(write, right, positive([right + 10, right - 10, right + 100])),
      hint: 'Em tính như với các số, rồi viết đơn vị ở kết quả.',
      solution: `${a} ${sign} ${b} = ${right}. Kết quả là ${write(right)}.`,
    };
  },
  'tinh-ba': (rand) => {
    const write = pick(rand, WRITERS);
    if (rand() < 0.5) {
      const a = int(rand, 12, 88);
      const b = int(rand, 1, Math.floor((100 - a) / 10)) * 10 + ((10 - (a % 10)) % 10);
      const middle = a + b;
      const c = int(rand, 1, Math.floor(middle / 10) - 1) * 10;
      const right = middle - c;
      return {
        prompt: `${write(a)} + ${write(b)} − ${write(c)} = ?`,
        ...sortedOptions(write, right, positive([middle, middle + c, right + 10])),
        hint: 'Em tính lần lượt từ trái sang phải: cộng trước, trừ sau.',
        solution: `${a} + ${b} = ${middle}. ${middle} − ${c} = ${right}. Kết quả là ${write(right)}.`,
      };
    }
    const a = int(rand, 32, 98);
    const b = a % 10 === 0 ? 10 : a % 10;
    const middle = a - b;
    const c = int(rand, 1, 4) * 10;
    const right = middle + c;
    return {
      prompt: `${write(a)} − ${write(b)} + ${write(c)} = ?`,
      ...sortedOptions(
        write,
        right,
        positive([middle, Math.abs(middle - c), a + b + c, right + 10]),
      ),
      hint: 'Em tính lần lượt từ trái sang phải: trừ trước, cộng sau.',
      solution: `${a} − ${b} = ${middle}. ${middle} + ${c} = ${right}. Kết quả là ${write(right)}.`,
    };
  },
  'day-tinh': (rand) => {
    const { start, first, last, m, d, multiplyFirst } = drawChain(rand);
    const write = pick(rand, WRITERS);
    const words = multiplyFirst
      ? `Nhân với ${m}, rồi chia cho ${d}`
      : `Chia cho ${d}, rồi nhân với ${m}`;
    const steps = multiplyFirst
      ? [
          { sign: `× ${m}`, value: write(first) },
          { sign: `: ${d}`, value: write(last) },
        ]
      : [
          { sign: `: ${d}`, value: write(first) },
          { sign: `× ${m}`, value: write(last) },
        ];
    const work = multiplyFirst
      ? `${start} × ${m} = ${first}. ${first} : ${d} = ${last}.`
      : `${start} : ${d} = ${first}. ${first} × ${m} = ${last}.`;
    return {
      visual: { type: 'chain', start: write(start), steps },
      prompt: `Bắt đầu từ ${write(start)}. ${words}. Ô cuối là bao nhiêu?`,
      ...sortedOptions(write, last, [first, start, last + 10, last + 1]),
      hint: 'Em tính lần lượt theo mũi tên, từ trái sang phải.',
      solution: `${work} Ô cuối là ${write(last)}.`,
    };
  },
  'can-dia': (rand) => {
    const name = pick(rand, ['Hộp quà', 'Chùm nho', 'Túi cam', 'Gói kẹo']);
    const weights = pick(rand, [[500], [200, 200], [500, 100], [200], [500, 200]]);
    const side = pick(
      rand,
      [20, 50, 100].filter((g) => g < weights[0]),
    );
    const total = weights.reduce((sum, g) => sum + g, 0);
    const thing = total - side;
    const sum = weights.length > 1 ? `${weights.join(' + ')} = ${total}. ` : '';
    return {
      visual: {
        type: 'balance',
        left: [box(name, thing), weight(side)],
        right: weights.map(weight),
      },
      prompt: `Cân thăng bằng. ${name} nặng bao nhiêu gam?`,
      ...sortedOptions(gramText, thing, positive([total + side, total, thing + 100, thing - 100])),
      hint: 'Hai đĩa nặng bằng nhau. Em lấy số gam cả đĩa bên phải, trừ đi quả cân ở đĩa có vật.',
      solution: `${sum}${total} − ${side} = ${thing}. ${name} nặng ${gramText(thing)}.`,
    };
  },
  'ba-tui': (rand) => {
    const [x, y] = pick(rand, [
      [100, 100],
      [100, 200],
      [200, 200],
    ]);
    const a = x + y;
    const [big, small] = pick(rand, [
      [300, 100],
      [500, 100],
      [500, 200],
    ]);
    const b = big - small;
    const higher = b >= a ? 'B' : 'A';
    const top = Math.max(a, b);
    const cHeavier = a === b || rand() < 0.5;
    const c = cHeavier ? top + 100 : top - 100;
    const heaviest = cHeavier ? 'C' : higher;
    const options = ['Túi A', 'Túi B', 'Túi C'];
    const compare = cHeavier
      ? `Đĩa có túi C thấp hơn nên túi C nặng hơn túi ${higher}.`
      : `Đĩa có túi ${higher} thấp hơn nên túi ${higher} nặng hơn túi C.`;
    return {
      visual: {
        type: 'bags',
        scales: [
          { left: [weight(x), weight(y)], right: [box('Túi A', a)] },
          { left: [weight(big)], right: [weight(small), box('Túi B', b)] },
          { left: [box(`Túi ${higher}`, top)], right: [box('Túi C', c)] },
        ],
      },
      prompt: 'Túi nào nặng nhất?',
      options,
      answer: options.indexOf(`Túi ${heaviest}`),
      hint: 'Cân thăng bằng thì hai đĩa nặng bằng nhau. Đĩa thấp hơn thì nặng hơn.',
      solution: `Túi A nặng ${gramText(a)}. Túi B nặng ${gramText(b)}. ${compare} Vậy túi ${heaviest} nặng nhất.`,
    };
  },
  'chon-so-do': (rand) => {
    const f = pick(rand, FITTING);
    const options = shuffle(rand, [f.right, ...f.wrong]);
    return {
      prompt: f.ask,
      options,
      answer: options.indexOf(f.right),
      optionLabels: degLabels(options),
      hint: 'Em nghĩ đến vật thật, rồi chọn số đo hợp với nó.',
      solution: `${f.say} ${f.right}.`,
    };
  },
  'bai-toan': (rand) => {
    const s = pick(rand, STORIES);
    const { options, answer } = sortedOptions(s.write, s.right, s.slips);
    return {
      prompt: s.text,
      options,
      answer,
      optionLabels: degLabels(options),
      hint: s.hint,
      solution: s.work,
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

/**
 * Two unmarked cups and the amount to measure with them.
 * @typedef {{ big: number, small: number, target: number, work: string }} CupPuzzle
 */

/** What the two cups hold, in millilitres. @typedef {{ big: number, small: number }} Cups */

/** @typedef {'fill' | 'empty' | 'pour'} CupAct */
/** @typedef {'big' | 'small'} CupId */

/** The puzzles, easiest first. @type {readonly CupPuzzle[]} */
export const CUP_PUZZLES = [
  { big: 500, small: 200, target: 300, work: '500 − 200 = 300 (ml).' },
  { big: 300, small: 100, target: 200, work: '300 − 100 = 200 (ml).' },
  { big: 500, small: 200, target: 400, work: '200 + 200 = 400 (ml).' },
  { big: 700, small: 300, target: 400, work: '700 − 300 = 400 (ml).' },
  { big: 500, small: 200, target: 100, work: '500 − 200 − 200 = 100 (ml).' },
  { big: 400, small: 150, target: 100, work: '400 − 150 − 150 = 100 (ml).' },
];

/** Two empty cups. @type {Cups} */
export const EMPTY_CUPS = { big: 0, small: 0 };

/**
 * What the cups hold after one move on `id`, the cup the move starts from.
 * @param {CupPuzzle} puzzle
 * @param {Cups} cups
 * @param {CupAct} act
 * @param {CupId} id
 * @returns {Cups}
 */
export function moveCups(puzzle, cups, act, id) {
  if (act === 'fill') return { ...cups, [id]: puzzle[id] };
  if (act === 'empty') return { ...cups, [id]: 0 };
  const other = id === 'big' ? 'small' : 'big';
  const poured = Math.min(cups[id], puzzle[other] - cups[other]);
  return { ...cups, [id]: cups[id] - poured, [other]: cups[other] + poured };
}

/**
 * Whether one of the cups holds the amount asked for.
 * @param {CupPuzzle} puzzle
 * @param {Cups} cups
 */
export function cupsSolved(puzzle, cups) {
  return cups.big === puzzle.target || cups.small === puzzle.target;
}

/**
 * Why a move changed nothing, or null when it did change something.
 * @param {CupPuzzle} puzzle
 * @param {Cups} cups
 * @param {CupAct} act
 * @param {CupId} id
 */
export function idleReason(puzzle, cups, act, id) {
  if (act === 'fill') return cups[id] === puzzle[id] ? 'Cốc này đã đầy rồi.' : null;
  if (cups[id] === 0) return 'Cốc này chưa có nước.';
  if (act === 'pour') {
    const other = id === 'big' ? 'small' : 'big';
    if (cups[other] === puzzle[other]) return 'Cốc kia đã đầy rồi.';
  }
  return null;
}

/**
 * The live sentence under the cups.
 * @param {CupPuzzle} puzzle
 * @param {Cups} cups
 */
export function cupsMessage(puzzle, cups) {
  if (cupsSolved(puzzle, cups)) {
    const id = cups.big === puzzle.target ? 'big' : 'small';
    return `Đúng rồi! Cốc ${mlText(puzzle[id])} có đúng ${mlText(puzzle.target)}. ${puzzle.work}`;
  }
  if (cups.big === 0 && cups.small === 0) return 'Hai cốc đều trống. Em múc nước từ thùng nhé.';
  return `Cốc ${mlText(puzzle.big)} có ${mlText(cups.big)}, cốc ${mlText(puzzle.small)} có ${mlText(cups.small)}. Em cần ${mlText(puzzle.target)}.`;
}

/**
 * The fewest moves that solve a puzzle, or null when none does.
 * @param {CupPuzzle} puzzle
 */
export function fewestCupMoves(puzzle) {
  /** @type {CupAct[]} */
  const acts = ['fill', 'empty', 'pour'];
  /** @type {CupId[]} */
  const ids = ['big', 'small'];
  const seen = new Set(['0/0']);
  let level = [EMPTY_CUPS];
  for (let moves = 0; level.length > 0; moves++) {
    if (level.some((cups) => cupsSolved(puzzle, cups))) return moves;
    /** @type {Cups[]} */
    const next = [];
    for (const cups of level) {
      for (const act of acts) {
        for (const id of ids) {
          const after = moveCups(puzzle, cups, act, id);
          const key = `${after.big}/${after.small}`;
          if (!seen.has(key)) {
            seen.add(key);
            next.push(after);
          }
        }
      }
    }
    level = next;
  }
  return null;
}
