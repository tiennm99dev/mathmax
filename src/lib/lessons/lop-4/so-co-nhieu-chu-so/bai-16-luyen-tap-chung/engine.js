/**
 * The mixed practice of the chapter "Số có nhiều chữ số": reading and
 * writing numbers to 999 999 999, the sum of places, the value of a digit,
 * places and classes, rounding to hundred thousands, comparing, the numbers
 * just before and after, number patterns and a real-life comparison. One
 * question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import {
  CLASS_NAMES,
  PLACE_NAMES,
  TOP,
  classOf,
  compareWhy,
  digitAt,
  digitCount,
  readBig,
  roundTo,
  roundWhy,
  sumText,
  valueAt,
} from '../_shared/big-numbers.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-viet': 'Đọc, viết số',
  'tong-hang': 'Viết số thành tổng',
  'gia-tri': 'Giá trị của chữ số',
  'hang-lop': 'Hàng và lớp',
  'lam-tron': 'Làm tròn số',
  'so-sanh': 'So sánh số',
  'lien-ke': 'Số liền trước, liền sau',
  'day-so': 'Dãy số',
  'thuc-te': 'Bài toán thực tế',
});

/**
 * Up to four number options in increasing order: the right one and the
 * slips a child makes, then near numbers, all from 0 to 999 999 999.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 1, right - 1, right + 10, right - 10, right + 1000, right - 1000];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && v <= TOP && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}

/**
 * A number of `count` digits with zeros in some places, the kind a child
 * misreads or miswrites.
 * @param {() => number} rand
 * @param {number} count 6 to 9
 */
function withZeros(rand, count) {
  const d = Array.from({ length: count }, () => int(rand, 1, 9));
  const zeros = shuffle(
    rand,
    Array.from({ length: count - 1 }, (_, i) => i + 1),
  ).slice(0, int(rand, 2, 3));
  for (const i of zeros) d[i] = 0;
  return Number(d.join(''));
}

/**
 * The digits of `n` with places `i` and `j` (from the left) swapped.
 * @param {number} n
 * @param {number} i
 * @param {number} j
 */
function swapped(n, i, j) {
  const d = String(n).split('');
  [d[i], d[j]] = [d[j], d[i]];
  return Number(d.join(''));
}

/**
 * "hàng chục nghìn, lớp nghìn"
 * @param {number} exp
 */
const placeClass = (exp) => `Hàng ${PLACE_NAMES[exp]}, lớp ${CLASS_NAMES[classOf(exp)]}`;

/** Names used in the real-life questions. */
const LIBRARIES = /** @type {const} */ ([
  'Thư viện Hoa Sen',
  'Thư viện Bình Minh',
  'Thư viện Sao Mai',
]);

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'doc-viet': (rand) => {
    const n = withZeros(rand, int(rand, 7, 9));
    const len = digitCount(n);
    const slips = [
      swapped(n, 1, 2),
      swapped(n, len - 3, len - 2),
      swapped(n, len - 2, len - 1),
      swapped(n, 2, 4),
      Math.floor(n / 10),
      n * 10 <= TOP ? n * 10 : n + 100000,
    ].filter((v) => v !== n && v > 0 && v <= TOP);
    return {
      prompt: `Số "${readBig(n)}" viết là số nào?`,
      ...mixOptions(rand, fmt(n), [...new Set(slips)].slice(0, 3).map(fmt)),
      hint: 'Em viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị. Mỗi lớp sau lớp đầu có đủ ba chữ số; hàng nào không có thì viết chữ số 0.',
      solution: `Số "${readBig(n)}" viết là ${fmt(n)}.`,
    };
  },
  'tong-hang': (rand) => {
    const n = withZeros(rand, int(rand, 6, 9));
    const parts = sumText(n).split(' = ')[1];
    const len = digitCount(n);
    return {
      prompt: `${parts} = ?`,
      ...slipOptions(n, [
        swapped(n, 1, 2),
        swapped(n, len - 2, len - 1),
        Math.floor(n / 10),
        n + 9 * 10 ** int(rand, 1, 3),
      ]),
      hint: 'Em viết chữ số của từng số hạng vào đúng hàng của nó. Hàng không có trong tổng thì viết chữ số 0.',
      solution: `${sumText(n)}.`,
    };
  },
  'gia-tri': (rand) => {
    const len = int(rand, 7, 9);
    /** @type {number} */
    let n;
    /** @type {number} */
    let exp;
    do {
      n = int(rand, 10 ** (len - 1), 10 ** len - 1);
      exp = int(rand, 3, len - 1);
    } while (digitAt(n, exp) === 0 || String(n).split(String(digitAt(n, exp))).length !== 2);
    const digit = digitAt(n, exp);
    const right = valueAt(n, exp);
    const wrong = [exp - 1, exp + 1, exp - 2, exp + 2]
      .filter((e) => e >= 0 && e <= 8)
      .map((e) => fmt(digit * 10 ** e))
      .slice(0, 2);
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} có giá trị là bao nhiêu?`,
      ...mixOptions(rand, fmt(right), [...wrong, String(digit)]),
      hint: 'Em tìm xem chữ số đó ở hàng nào. Giá trị của nó là chữ số đó nhân với giá trị của hàng.',
      solution: `Chữ số ${digit} ở hàng ${PLACE_NAMES[exp]}, nên có giá trị là ${fmt(right)}.`,
    };
  },
  'hang-lop': (rand) => {
    const len = int(rand, 7, 9);
    /** @type {number} */
    let n;
    /** @type {number} */
    let exp;
    do {
      n = int(rand, 10 ** (len - 1), 10 ** len - 1);
      exp = int(rand, 0, len - 1);
    } while (digitAt(n, exp) === 0 || String(n).split(String(digitAt(n, exp))).length !== 2);
    const digit = digitAt(n, exp);
    const near = [exp + 1, exp - 1, exp + 3, exp - 3].filter((e) => e >= 0 && e <= 8);
    const wrong = [
      ...near.slice(0, 2).map(placeClass),
      `Hàng ${PLACE_NAMES[exp]}, lớp ${CLASS_NAMES[(classOf(exp) + 1) % 3]}`,
    ];
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} thuộc hàng nào, lớp nào?`,
      ...mixOptions(rand, placeClass(exp), wrong),
      hint: 'Em tách số thành các lớp, mỗi lớp ba hàng: lớp đơn vị, lớp nghìn, lớp triệu, kể từ phải sang trái.',
      solution: `Chữ số ${digit} thuộc ${placeClass(exp).toLowerCase()}.`,
    };
  },
  'lam-tron': (rand) => {
    const n = int(rand, 1000000, 99999999);
    const right = roundTo(n, 100000);
    const low = Math.floor(n / 100000) * 100000;
    const other = right === low ? low + 100000 : low;
    return {
      prompt: `Làm tròn số ${fmt(n)} đến hàng trăm nghìn được số nào?`,
      ...slipOptions(right, [other, roundTo(n, 10000), roundTo(n, 1000000), low - 100000]),
      hint: 'Em nhìn chữ số hàng chục nghìn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
      solution: roundWhy(n, 100000),
    };
  },
  'so-sanh': (rand) => {
    const head = int(rand, 10, 99) * 1000000;
    /** @type {Set<number>} */
    const set = new Set();
    while (set.size < 3) set.add(head + int(rand, 0, 999999));
    set.add(int(rand, 100000, 999999) * 10 + int(rand, 0, 9));
    const numbers = shuffle(rand, [...set]);
    const most = rand() < 0.5;
    const right = most ? Math.max(...numbers) : Math.min(...numbers);
    const word = most ? 'lớn nhất' : 'bé nhất';
    const sorted = numbers.toSorted((x, y) => x - y);
    return {
      prompt: `Trong các số ${numbers.map(fmt).join('; ')}, số nào ${word}?`,
      ...mixOptions(rand, fmt(right), numbers.filter((v) => v !== right).map(fmt)),
      hint: 'Em đếm số chữ số trước. Các số có cùng số chữ số thì so sánh từng hàng, từ trái sang phải.',
      solution: `Xếp theo thứ tự từ bé đến lớn: ${sorted.map(fmt).join('; ')}. Số ${word} là ${fmt(right)}.`,
    };
  },
  'lien-ke': (rand) => {
    const base = pick(rand, [10000, 100000, 1000000, 10000000]) * int(rand, 1, 9);
    const after = rand() < 0.5;
    const n = after ? base - 1 : base;
    const right = after ? n + 1 : n - 1;
    const word = after ? 'liền sau' : 'liền trước';
    return {
      prompt: `Số ${word} của ${fmt(n)} là số nào?`,
      ...slipOptions(right, [
        after ? n - 1 : n + 1,
        after ? n + 10 : n - 10,
        after ? n * 10 + 1 : base - 1000,
      ]),
      hint: after ? 'Số liền sau: em thêm 1.' : 'Số liền trước: em bớt 1.',
      solution: `${fmt(n)} ${after ? '+' : '−'} 1 = ${fmt(right)}. Số ${word} của ${fmt(n)} là ${fmt(right)}.`,
    };
  },
  'day-so': (rand) => {
    const step = pick(rand, [1, 1000, 100000, 1000000]);
    const start = step === 1 ? int(rand, 99996, 999995) : step * int(rand, 1, 6);
    const terms = Array.from({ length: 5 }, (_, i) => start + i * step);
    const gap = int(rand, 2, 4);
    const right = terms[gap];
    const shown = terms.map((v, i) => (i === gap ? '?' : fmt(v)));
    const what =
      step === 1 ? 'Đây là các số tự nhiên liên tiếp.' : `Mỗi số hơn số trước ${fmt(step)} đơn vị.`;
    return {
      prompt: `Số nào thích hợp thay cho dấu "?": ${shown.join('; ')}`,
      ...slipOptions(right, [right + step, right - 2 * step, right + 10 * step, right - 10]),
      hint: 'Em xem mỗi số hơn số đứng trước nó bao nhiêu đơn vị.',
      solution: `${what} Số thay cho dấu "?" là ${fmt(terms[gap - 1])} + ${fmt(step)} = ${fmt(right)}.`,
    };
  },
  'thuc-te': (rand) => {
    const head = int(rand, 1, 9) * 100000;
    /** @type {Set<number>} */
    const set = new Set();
    while (set.size < 3) set.add(head + int(rand, 10, 99) * 1000 + int(rand, 0, 999));
    const books = [...set];
    const most = rand() < 0.5;
    const right = most ? Math.max(...books) : Math.min(...books);
    const index = books.indexOf(right);
    const word = most ? 'nhiều' : 'ít';
    const list = LIBRARIES.map((name, i) => `${name} có ${fmt(books[i])} cuốn`).join('; ');
    const other = books.filter((v) => v !== right);
    return {
      prompt: `${list}. Thư viện nào có ${word} sách nhất?`,
      ...mixOptions(
        rand,
        LIBRARIES[index],
        LIBRARIES.filter((_, i) => i !== index),
      ),
      hint: 'Ba số cùng có sáu chữ số và cùng chữ số hàng trăm nghìn. Em so sánh tiếp từng hàng, từ trái sang phải.',
      solution: `${compareWhy(right, other[0])} ${compareWhy(right, other[1])} ${LIBRARIES[index]} có ${word} sách nhất.`,
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
