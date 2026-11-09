/**
 * Review questions on numbers to 1000: reading and writing a number, counting
 * on along a row, comparing, the largest and the smallest, a missing digit,
 * hundreds, tens and ones as a sum, numbers built from digit cards and from
 * place-value blocks, and reading a table. Pure and DOM-free; each skill is a
 * `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { capitalize, mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { nearOptions } from './options.js';
import { compareWhy, placesOf, readTo1000, sumParts } from './place.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */

/**
 * A three-digit number, often with a zero in it, the numbers children misread.
 * @param {() => number} rand
 */
function threeDigit(rand) {
  const h = int(rand, 1, 9);
  const shape = rand();
  if (shape < 0.3) return h * 100 + int(rand, 1, 9);
  if (shape < 0.45) return h * 100 + int(rand, 1, 9) * 10;
  return h * 100 + int(rand, 1, 9) * 10 + int(rand, 1, 9);
}

/**
 * The tens and ones swapped: 405 gives 450.
 * @param {number} n
 */
function swapEnds(n) {
  const { hundreds, tens, ones } = placesOf(n);
  return hundreds * 100 + ones * 10 + tens;
}

/**
 * Other three-digit numbers a child mixes `n` up with.
 * @param {() => number} rand
 * @param {number} n
 */
function mixUps(rand, n) {
  const { hundreds, tens, ones } = placesOf(n);
  const near = [
    swapEnds(n),
    tens * 100 + hundreds * 10 + ones,
    n + 10,
    n - 10,
    n + 1,
    n - 1,
    n + 100,
    n - 100,
  ];
  const kept = [...new Set(near)].filter((v) => v !== n && v >= 100 && v <= 999);
  return shuffle(rand, kept).slice(0, 3);
}

/** @type {ReviewSkill} */
export const readWriteSkill = {
  id: 'doc-viet',
  label: 'Đọc, viết số',
  make(rand) {
    const n = threeDigit(rand);
    const others = mixUps(rand, n);
    if (rand() < 0.5) {
      return {
        prompt: `Số ${n} đọc là gì?`,
        ...mixOptions(
          rand,
          capitalize(readTo1000(n)),
          others.map((v) => capitalize(readTo1000(v))),
        ),
        hint: 'Em đọc từ trái sang phải: hàng trăm, hàng chục, hàng đơn vị. Hàng chục là 0 thì đọc "linh".',
        solution: `Số ${n} đọc là: ${readTo1000(n)}.`,
      };
    }
    const values = [n, ...others].sort((x, y) => x - y);
    return {
      prompt: `Số "${readTo1000(n)}" viết là số nào?`,
      options: values.map(String),
      answer: values.indexOf(n),
      hint: 'Em viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị. "Linh" nghĩa là hàng chục là 0.',
      solution: `"${capitalize(readTo1000(n))}" viết là ${n}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const sequenceSkill = {
  id: 'day-so',
  label: 'Số theo thứ tự',
  make(rand) {
    const step = pick(rand, [1, 1, 2, 10, 100]);
    const count = 6;
    let start;
    if (step === 100) start = int(rand, 1, 5) * 100;
    else if (step === 10) start = int(rand, 10, 94) * 10;
    else if (step === 2) start = int(rand, 50, 495) * 2;
    else start = rand() < 0.25 ? int(rand, 990, 995) : int(rand, 100, 950);
    const items = Array.from({ length: count }, (_, i) => start + i * step);
    const blank = int(rand, 1, count - 1);
    const right = items[blank];
    return {
      prompt: 'Số nào thay cho dấu hỏi?',
      visual: { type: 'sequence', items, blank },
      ...nearOptions(rand, right, [right + step, right - step, right + 1]),
      hint: 'Em xem hai số cạnh nhau hơn kém nhau bao nhiêu, rồi đếm tiếp.',
      solution: `Mỗi số hơn số ngay trước nó ${step}. ${items[blank - 1]} + ${step} = ${right}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh số',
  make(rand) {
    const shape = int(rand, 0, 4);
    let a = int(rand, 101, 999);
    let b;
    if (shape === 0) {
      a = int(rand, 1, 9) * 100 + int(rand, 1, 8) * 10 + int(rand, 1, 9);
      b = swapEnds(a);
    } else if (shape === 1) {
      const head = Math.floor(a / 10);
      a = head * 10 + int(rand, 0, 4);
      b = head * 10 + int(rand, 5, 9);
    } else if (shape === 2) {
      b = int(rand, 85, 99);
      a = int(rand, 100, 199);
    } else if (shape === 3) {
      b = a;
    } else {
      b = Math.floor(a / 100) * 100 + int(rand, 0, 99);
    }
    const [x, y] = rand() < 0.5 ? [a, b] : [b, a];
    return {
      prompt: `Chọn dấu đúng: ${x} ... ${y}`,
      ...signOptions(compareSign(x, y)),
      hint: 'Em so sánh hàng trăm trước. Hàng trăm bằng nhau thì so sánh hàng chục, rồi đến hàng đơn vị.',
      solution: compareWhy(x, y),
    };
  },
};

/**
 * Four different numbers, sharing their hundreds half of the time.
 * @param {() => number} rand
 * @returns {number[]}
 */
function fourNumbers(rand) {
  const shared = rand() < 0.5 ? int(rand, 1, 9) * 100 : null;
  const values = new Set();
  while (values.size < 4) {
    values.add(shared === null ? int(rand, 100, 999) : shared + int(rand, 0, 99));
  }
  return [...values];
}

/** @type {ReviewSkill} */
export const largestSkill = {
  id: 'lon-be',
  label: 'Số lớn nhất, bé nhất, sắp xếp',
  make(rand) {
    const list = fourNumbers(rand);
    const up = [...list].sort((x, y) => x - y);
    const shape = int(rand, 0, 2);
    if (shape < 2) {
      const largest = shape === 0;
      const best = largest ? up[3] : up[0];
      const word = largest ? 'lớn nhất' : 'bé nhất';
      return {
        prompt: `Trong các số ${list.join(', ')}, số nào ${word}?`,
        options: up.map(String),
        answer: up.indexOf(best),
        hint: 'Em so sánh hàng trăm trước, rồi đến hàng chục, hàng đơn vị.',
        solution: `Từ bé đến lớn: ${up.join(', ')}. Số ${word} là ${best}.`,
      };
    }
    const right = up.join(', ');
    const wrong = [
      [...up].reverse().join(', '),
      [up[1], up[0], up[2], up[3]].join(', '),
      [up[0], up[2], up[1], up[3]].join(', '),
    ];
    return {
      prompt: 'Dãy số nào được xếp từ bé đến lớn?',
      ...mixOptions(rand, right, wrong),
      hint: 'Số sau phải lớn hơn số trước. Em so sánh từng cặp số cạnh nhau.',
      solution: `Từ bé đến lớn: ${right}.`,
    };
  },
};

/** Words for each place of a number, from the left. */
const PLACE_NAMES = ['trăm', 'chục', 'đơn vị'];

/** @type {ReviewSkill} */
export const missingDigitSkill = {
  id: 'chu-so',
  label: 'Tìm chữ số',
  make(rand) {
    const place = int(rand, 0, 2);
    const lo = place === 0 ? 1 : 0;
    const digits = [int(rand, 1, 9), int(rand, 0, 9), int(rand, 0, 9)];
    const t = int(rand, lo + 1, 8);
    digits[place] = t;
    const target = Number(digits.join(''));
    const bigger = rand() < 0.5;
    const right = bigger ? int(rand, t + 1, 9) : int(rand, lo, t - 1);
    const other = bigger ? int(rand, lo, t - 1) : int(rand, t + 1, 9);
    const values = [right, t, other].sort((x, y) => x - y);
    const shown = digits.map((d, i) => (i === place ? '?' : d)).join('');
    const filled = digits.map((d, i) => (i === place ? right : d)).join('');
    const sign = bigger ? '>' : '<';
    const word = bigger ? 'lớn hơn' : 'bé hơn';
    return {
      prompt: `Chữ số nào thay được dấu hỏi? ${shown} ${sign} ${target}`,
      options: values.map(String),
      answer: values.indexOf(right),
      hint: `Các hàng khác giống nhau. Em chỉ cần so sánh hàng ${PLACE_NAMES[place]}.`,
      solution: `Các hàng khác giống nhau, nên chữ số hàng ${PLACE_NAMES[place]} phải ${word} ${t}. Vậy chữ số đó là ${right}: ${filled} ${sign} ${target}.`,
    };
  },
};

/**
 * Sums a child mixes up with the sum of places of `n`.
 * @param {number} n
 * @returns {string[]}
 */
function wrongSums(n) {
  const { hundreds, tens, ones } = placesOf(n);
  const right = sumParts(n).join(' + ');
  const sums = [
    [hundreds * 100, tens, ones],
    [hundreds * 10, tens * 10, ones],
    sumParts(swapEnds(n)),
    sumParts(n + 100),
  ].map((parts) => parts.filter((p) => p > 0));
  return sums
    .filter((parts) => parts.reduce((s, p) => s + p, 0) !== n)
    .map((parts) => parts.join(' + '))
    .filter((text) => text !== right);
}

/** @type {ReviewSkill} */
export const placesSkill = {
  id: 'tach-so',
  label: 'Viết số thành tổng',
  make(rand) {
    const n = int(rand, 101, 899);
    const parts = sumParts(n);
    if (parts.length === 1) return placesSkill.make(rand);
    const right = parts.join(' + ');
    const why = `${n} gồm ${placesOf(n).hundreds} trăm, ${placesOf(n).tens} chục, ${placesOf(n).ones} đơn vị.`;
    if (rand() < 0.5) {
      return {
        prompt: `Số ${n} viết thành tổng nào?`,
        ...mixOptions(rand, right, wrongSums(n).slice(0, 3)),
        hint: 'Em xem số có mấy trăm, mấy chục, mấy đơn vị. Hàng nào là 0 thì không cần viết.',
        solution: `${why} Vậy ${n} = ${right}.`,
      };
    }
    return {
      prompt: `${right} = ?`,
      ...nearOptions(rand, n, [swapEnds(n), n + 100, n + 10]),
      hint: 'Em viết chữ số hàng trăm, hàng chục, hàng đơn vị. Hàng nào không có thì viết 0.',
      solution: `${why} Vậy ${right} = ${n}.`,
    };
  },
};

/**
 * Every three-digit number made from three different digits.
 * @param {readonly number[]} digits
 * @returns {number[]}
 */
export function cardNumbers(digits) {
  const [a, b, c] = digits;
  const orders = [
    [a, b, c],
    [a, c, b],
    [b, a, c],
    [b, c, a],
    [c, a, b],
    [c, b, a],
  ];
  return orders.filter((o) => o[0] !== 0).map((o) => o[0] * 100 + o[1] * 10 + o[2]);
}

/** @type {ReviewSkill} */
export const cardsSkill = {
  id: 'the-so',
  label: 'Lập số từ thẻ số',
  make(rand) {
    const pool = rand() < 0.5 ? [0, ...shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2)] : [];
    const digits =
      pool.length > 0
        ? shuffle(rand, pool)
        : shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    const numbers = cardNumbers(digits).sort((x, y) => x - y);
    const largest = rand() < 0.5;
    const best = largest ? numbers[numbers.length - 1] : numbers[0];
    const others = shuffle(
      rand,
      numbers.filter((n) => n !== best),
    ).slice(0, 3);
    const values = [best, ...others].sort((x, y) => x - y);
    const word = largest ? 'lớn nhất' : 'bé nhất';
    return {
      prompt: `Em dùng cả ba thẻ số để lập số có ba chữ số. Số ${word} là số nào?`,
      visual: { type: 'cards', digits },
      options: values.map(String),
      answer: values.indexOf(best),
      hint: largest
        ? 'Chữ số lớn nhất đứng ở hàng trăm.'
        : 'Chữ số bé nhất khác 0 đứng ở hàng trăm. Chữ số 0 không đứng đầu.',
      solution: `Các số lập được: ${numbers.join(', ')}. Số ${word} là ${best}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const blocksSkill = {
  id: 'khoi',
  label: 'Đọc số từ các khối',
  make(rand) {
    const hundreds = int(rand, 1, 5);
    const tens = int(rand, 0, 6);
    const ones = int(rand, tens === 0 ? 1 : 0, 8);
    const n = hundreds * 100 + tens * 10 + ones;
    return {
      prompt: 'Các khối dưới đây biểu diễn số nào?',
      visual: { type: 'blocks', hundreds, tens, ones },
      ...nearOptions(rand, n, [swapEnds(n), n + 10, n - 10, n + 100]),
      hint: 'Tấm to là 1 trăm, thanh dài là 1 chục, khối nhỏ là 1 đơn vị. Em đếm từng loại.',
      solution: `${hundreds} trăm, ${tens} chục, ${ones} đơn vị là số ${n}.`,
    };
  },
};

/** The schools of the book's table. */
const SCHOOLS = /** @type {const} */ (['Thành Công', 'Chiến Thắng', 'Hoà Bình', 'Đoàn Kết']);

/** @type {ReviewSkill} */
export const tableSkill = {
  id: 'bang-so',
  label: 'Đọc bảng số liệu',
  make(rand) {
    const counts = fourNumbers(rand);
    const most = rand() < 0.5;
    const best = most ? Math.max(...counts) : Math.min(...counts);
    const at = counts.indexOf(best);
    const word = most ? 'nhiều' : 'ít';
    return {
      prompt: `Trường nào có ${word} học sinh nhất?`,
      visual: {
        type: 'table',
        head: ['Trường', 'Số học sinh'],
        rows: SCHOOLS.map((name, i) => [name, counts[i]]),
      },
      options: SCHOOLS.map((name) => `Trường ${name}`),
      answer: at,
      hint: `Em so sánh bốn số và tìm số ${most ? 'lớn' : 'bé'} nhất.`,
      solution: `${best} là số ${most ? 'lớn' : 'bé'} nhất, nên Trường ${SCHOOLS[at]} có ${word} học sinh nhất.`,
    };
  },
};

/** The parts of the review of numbers to 1000. */
export const NUMBER_SKILLS = [
  readWriteSkill,
  sequenceSkill,
  compareSkill,
  largestSkill,
  missingDigitSkill,
  placesSkill,
  cardsSkill,
  blocksSkill,
  tableSkill,
];
