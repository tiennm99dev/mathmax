/**
 * The mixed practice round of "Luyện tập chung" for the chapter on numbers to
 * 100 000: reading and writing numbers of five digits, the digit of a place,
 * sums of places, the numbers just before and after, comparing, the largest
 * and smallest, rounding to thousands and ten thousands, and short real-life
 * problems. Questions are built from a seed, so the first round is the same
 * on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { drawFresh, mixOptions, questionKey, signOptions } from '#lib/core/kid/quiz.js';
import {
  PLACES5,
  TOP,
  compareWhy5,
  digitsOf5,
  placesText5,
  readTo100000,
  roundTo,
  roundWhy,
  sumParts5,
} from '../_shared/numbers-to-100000.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<null>} Asked */
/** @typedef {'doc' | 'hang' | 'tong' | 'lien' | 'dau' | 'lon-be' | 'lam-tron' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */
/** @typedef {import('../_shared/numbers-to-100000.js').RoundUnit} RoundUnit */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  doc: 'Đọc, viết số',
  hang: 'Các hàng của số',
  tong: 'Viết số thành tổng',
  lien: 'Số liền trước, số liền sau',
  dau: 'So sánh hai số',
  'lon-be': 'Số lớn nhất, số bé nhất',
  'lam-tron': 'Làm tròn số',
  'bai-toan': 'Giải bài toán',
});

/** @param {number} v */
const fiveDigits = (v) => v >= 10000 && v <= 99999;

/**
 * A number of five digits that often has zero digits, since those are the
 * ones read and written wrongly.
 * @param {() => number} rand
 */
export function withZeros(rand) {
  const head = int(rand, 10, 99) * 1000;
  const shape = int(rand, 0, 5);
  if (shape === 0) return head + int(rand, 1, 9);
  if (shape === 1) return head + int(rand, 1, 9) * 10 + int(rand, 0, 9);
  if (shape === 2) return head + int(rand, 1, 9) * 100 + int(rand, 1, 9);
  if (shape === 3) return int(rand, 1, 9) * 10000 + int(rand, 1, 9) * 100 + int(rand, 0, 99);
  return head + int(rand, 1, 999);
}

/**
 * Three wrong numbers a child really writes for `n`: two digits swapped
 * first, then a place off by one. All have five digits.
 * @param {() => number} rand
 * @param {number} n
 * @returns {number[]}
 */
export function digitSlips(rand, n) {
  const d = String(n).split('');
  const swaps = [0, 1, 2, 3].map((i) => {
    const s = [...d];
    [s[i], s[i + 1]] = [s[i + 1], s[i]];
    return Number(s.join(''));
  });
  const nears = [1000, 100, 10, 1, 10000].flatMap((u) => [n - u, n + u]);
  const fine = (/** @type {number} */ v) => fiveDigits(v) && v !== n;
  const pool = [
    ...shuffle(rand, [...new Set(swaps)].filter(fine)),
    ...shuffle(rand, nears.filter(fine)),
  ];
  return [...new Set(pool)].slice(0, 3);
}

/**
 * Number options in increasing order, so a child can scan them.
 * @param {number} right
 * @param {number[]} wrong
 * @returns {{ options: string[], answer: number }}
 */
export function sortedOptions(right, wrong) {
  const values = [right, ...new Set(wrong.filter((v) => v !== right))].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}

/**
 * Reading a number, or writing the number that is read.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function readQuestion(rand) {
  const n = withZeros(rand);
  const wrong = digitSlips(rand, n);
  const solution = `${fmt(n)} gồm ${placesText5(n)}, đọc là: ${readTo100000(n)}.`;
  if (rand() < 0.5) {
    return {
      prompt: `Số ${fmt(n)} đọc là gì?`,
      ...mixOptions(rand, readTo100000(n), wrong.map(readTo100000)),
      hint: 'Em đọc hai chữ số đầu rồi thêm "nghìn". Hàng trăm là 0 thì đọc "không trăm", hàng chục là 0 thì đọc "linh".',
      solution,
    };
  }
  return {
    prompt: `Số "${readTo100000(n)}" viết là số nào?`,
    ...sortedOptions(n, wrong),
    hint: 'Em viết lần lượt chữ số hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
    solution,
  };
}

/**
 * Five different digits, so a digit names exactly one place.
 * @param {() => number} rand
 */
function distinctDigits(rand) {
  const digits = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const lead = digits.findIndex((x) => x !== 0);
  const [first] = digits.splice(lead, 1);
  return [first, ...digits.slice(0, 4)].reduce((n, x) => n * 10 + x, 0);
}

/**
 * The digit of a place, or the place of a digit.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function placeQuestion(rand) {
  const n = distinctDigits(rand);
  const place = pick(rand, PLACES5);
  const d = digitsOf5(n);
  const digit = d[place.key];
  const hint =
    'Từ trái sang phải là hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.';
  const solution = `${fmt(n)} gồm ${placesText5(n)}. Chữ số ${digit} ở hàng ${place.unit}.`;
  if (rand() < 0.5) {
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} ở hàng nào?`,
      options: PLACES5.map((p) => `Hàng ${p.unit}`),
      answer: PLACES5.indexOf(place),
      hint,
      solution,
    };
  }
  const digits = PLACES5.map((p) => d[p.key]).sort((x, y) => x - y);
  return {
    prompt: `Chữ số hàng ${place.unit} của số ${fmt(n)} là chữ số nào?`,
    options: digits.map(String),
    answer: digits.indexOf(digit),
    hint,
    solution,
  };
}

/**
 * Wrong sums for `n`: one part moved to another place, the slip children
 * make. Moving a part always changes the total.
 * @param {number} n
 * @returns {string[]}
 */
export function sumSlips(n) {
  const parts = sumParts5(n);
  return parts.flatMap((part, i) =>
    [part * 10, part / 10]
      .filter((v) => Number.isInteger(v) && v >= 1 && v <= 90000)
      .map((v) =>
        parts
          .map((p, j) => (j === i ? v : p))
          .map(fmt)
          .join(' + '),
      ),
  );
}

/**
 * A number and its sum of places, either way round.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function sumQuestion(rand) {
  const n = withZeros(rand);
  const sum = sumParts5(n).map(fmt).join(' + ');
  const solution = `${fmt(n)} gồm ${placesText5(n)}, nên ${fmt(n)} = ${sum}.`;
  if (rand() < 0.5) {
    return {
      prompt: `${fmt(n)} bằng tổng nào?`,
      ...mixOptions(rand, sum, shuffle(rand, sumSlips(n)).slice(0, 3)),
      hint: 'Mỗi chữ số cho một phần của tổng. Chữ số 0 thì không viết.',
      solution,
    };
  }
  return {
    prompt: `${sum} = ?`,
    ...sortedOptions(n, digitSlips(rand, n)),
    hint: 'Em ghép số chục nghìn, nghìn, trăm, chục và đơn vị thành một số.',
    solution,
  };
}

/**
 * The number just before or just after another, often across a round
 * number, where several digits change.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function neighbourQuestion(rand) {
  const after = rand() < 0.5;
  const head = int(rand, 1, 9) * 10000;
  let n = int(rand, 10001, 99998);
  if (rand() < 0.6) {
    n = after
      ? pick(rand, [
          head + 9999,
          head + int(rand, 0, 9) * 1000 + 999,
          head + int(rand, 1, 9) * 10 + 9,
        ])
      : pick(rand, [head === 10000 ? TOP : head, head + int(rand, 1, 9) * 1000]);
  }
  const right = after ? n + 1 : n - 1;
  const pool = [after ? n - 1 : n + 1, right + 10, right - 10, right + 100, right - 1000, n].filter(
    (v) => v >= 10000 && v <= TOP && v !== right,
  );
  const word = after ? 'liền sau' : 'liền trước';
  return {
    prompt: `Số ${word} của ${fmt(n)} là số nào?`,
    ...sortedOptions(right, shuffle(rand, pool).slice(0, 3)),
    hint: after ? 'Số liền sau hơn số đó 1 đơn vị.' : 'Số liền trước kém số đó 1 đơn vị.',
    solution: after
      ? `${fmt(n)} + 1 = ${fmt(right)}. Số liền sau của ${fmt(n)} là ${fmt(right)}.`
      : `${fmt(n)} − 1 = ${fmt(right)}. Số liền trước của ${fmt(n)} là ${fmt(right)}.`,
  };
}

/**
 * Two numbers that differ at one chosen place, sometimes equal, sometimes a
 * number of four digits against one of five, or 99 999 against 100 000.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function closePair(rand) {
  const a = int(rand, 10000, 99999);
  const shape = int(rand, 0, 11);
  if (shape === 10) {
    const pair = /** @type {[number, number]} */ (
      rand() < 0.5 ? [int(rand, 9000, 9999), int(rand, 10000, 10999)] : [99999, TOP]
    );
    return rand() < 0.5 ? pair : [pair[1], pair[0]];
  }
  if (shape === 11) return [a, a];
  const place = PLACES5[shape % 5];
  const d = { ...digitsOf5(a) };
  d[place.key] = place.key === 'tenThousands' ? int(rand, 1, 9) : int(rand, 0, 9);
  const b = PLACES5.reduce((sum, p) => sum + d[p.key] * p.value, 0);
  return rand() < 0.5 ? [a, b] : [b, a];
}

/**
 * Choosing the sign between two numbers.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function signQuestion(rand) {
  const [a, b] = closePair(rand);
  return {
    prompt: `Em chọn dấu đúng: ${fmt(a)} ... ${fmt(b)}.`,
    ...signOptions(compareSign(a, b)),
    hint: 'Em đếm chữ số trước. Cùng số chữ số thì so sánh từ hàng chục nghìn.',
    solution: compareWhy5(a, b),
  };
}

/**
 * The largest or the smallest of four numbers sharing their ten thousands.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function extremeQuestion(rand) {
  const head = int(rand, 1, 9) * 10000;
  /** @type {Set<number>} */
  const values = new Set();
  const base = head + int(rand, 0, 9) * 1000;
  values.add(base + int(rand, 0, 999));
  while (values.size < 4) {
    values.add(rand() < 0.5 ? base + int(rand, 0, 999) : head + int(rand, 0, 9999));
  }
  const numbers = [...values];
  const order = [...numbers].sort((x, y) => x - y);
  const largest = rand() < 0.5;
  const right = largest ? order[3] : order[0];
  const options = shuffle(rand, numbers).map(fmt);
  return {
    prompt: `Số nào ${largest ? 'lớn nhất' : 'bé nhất'}?`,
    options,
    answer: options.indexOf(fmt(right)),
    hint: 'Hàng chục nghìn giống nhau. Em so sánh hàng nghìn, rồi hàng trăm, hàng chục, hàng đơn vị.',
    solution: `${order.map(fmt).join(' < ')}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${fmt(right)}.`,
  };
}

/**
 * Two wrong roundings of `n`: the other round neighbour, the rounding to
 * the other place, then the round numbers one step further out, so a
 * question always has three options.
 * @param {number} n
 * @param {RoundUnit} unit
 * @returns {number[]}
 */
export function roundingSlips(n, unit) {
  const right = roundTo(n, unit);
  const low = Math.floor(n / unit) * unit;
  const other = /** @type {RoundUnit} */ (unit === 1000 ? 10000 : 1000);
  const pool = [low, low + unit, roundTo(n, other), low - unit, low + 2 * unit];
  return [...new Set(pool.filter((v) => v > 0 && v <= TOP && v !== right))].slice(0, 2);
}

/**
 * Rounding a number to thousands or ten thousands.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function roundQuestion(rand) {
  const unit = /** @type {RoundUnit} */ (pick(rand, [1000, 10000]));
  let n = int(rand, 10001, 99899);
  if (n % unit === 0) n += unit === 1000 ? 340 : 4210;
  if (rand() < 0.3) n = Math.floor(n / unit) * unit + unit / 2 + int(rand, 0, 9) * (unit / 100);
  return {
    prompt: `Làm tròn số ${fmt(n)} đến hàng ${unit === 1000 ? 'nghìn' : 'chục nghìn'} được số nào?`,
    ...sortedOptions(roundTo(n, unit), roundingSlips(n, unit)),
    hint:
      unit === 1000
        ? 'Em nhìn chữ số hàng trăm và so sánh với 5.'
        : 'Em nhìn chữ số hàng nghìn và so sánh với 5.',
    solution: roundWhy(n, unit),
  };
}

/**
 * Stories that compare two amounts. `more` is true when the question asks
 * for the larger amount.
 * @type {ReadonlyArray<{ first: string, second: string, text: (a: string, b: string) => string, ask: string, more: boolean, verdict: string }>}
 */
export const STORIES = [
  {
    first: 'Xã Hoà Bình',
    second: 'Xã Sao Mai',
    text: (a, b) => `Xã Hoà Bình có ${a} người. Xã Sao Mai có ${b} người.`,
    ask: 'Xã nào đông người hơn?',
    more: true,
    verdict: 'đông người hơn',
  },
  {
    first: 'Tàu Hải Âu',
    second: 'Tàu Bình Minh',
    text: (a, b) => `Tàu Hải Âu chở ${a} kg hàng. Tàu Bình Minh chở ${b} kg hàng.`,
    ask: 'Tàu nào chở ít hàng hơn?',
    more: false,
    verdict: 'chở ít hàng hơn',
  },
  {
    first: 'Nhà máy A',
    second: 'Nhà máy B',
    text: (a, b) => `Nhà máy A làm được ${a} chiếc áo. Nhà máy B làm được ${b} chiếc áo.`,
    ask: 'Nhà máy nào làm được nhiều áo hơn?',
    more: true,
    verdict: 'làm được nhiều áo hơn',
  },
  {
    first: 'Xe Hồng Hà',
    second: 'Xe Sông Lam',
    text: (a, b) => `Xe Hồng Hà đã chạy ${a} km. Xe Sông Lam đã chạy ${b} km.`,
    ask: 'Xe nào chạy ít ki-lô-mét hơn?',
    more: false,
    verdict: 'chạy ít ki-lô-mét hơn',
  },
];

/**
 * A short real-life problem: counting packs of ten thousand, a thousand, a
 * hundred and ten, rounding a count, or comparing two amounts.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const shape = int(rand, 0, 2);
  if (shape === 0) {
    const [c, th, h, t] = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
    const n = c * 10000 + th * 1000 + h * 100 + t * 10;
    return {
      prompt: `Nhà máy đóng gói kẹo: ${c} thùng, mỗi thùng ${fmt(10000)} viên; ${th} hộp, mỗi hộp ${fmt(1000)} viên; ${h} túi, mỗi túi 100 viên; ${t} gói, mỗi gói 10 viên. Có tất cả bao nhiêu viên kẹo?`,
      ...sortedOptions(n, digitSlips(rand, n)),
      hint: 'Mỗi thùng là 1 chục nghìn, mỗi hộp là 1 nghìn, mỗi túi là 1 trăm, mỗi gói là 1 chục.',
      solution: `${c} chục nghìn, ${th} nghìn, ${h} trăm, ${t} chục là số ${fmt(n)}. Có tất cả ${fmt(n)} viên kẹo.`,
    };
  }
  if (shape === 1) {
    let n = int(rand, 10001, 98999);
    if (n % 1000 === 0) n += 370;
    const right = roundTo(n, 1000);
    return {
      prompt: `Sân vận động có ${fmt(n)} chỗ ngồi. Làm tròn đến hàng nghìn, sân có khoảng bao nhiêu chỗ ngồi?`,
      ...sortedOptions(right, roundingSlips(n, 1000)),
      hint: 'Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm.',
      solution: `${roundWhy(n, 1000)} Sân có khoảng ${fmt(right)} chỗ ngồi.`,
    };
  }
  const story = pick(rand, STORIES);
  let [a, b] = closePair(rand);
  while (a === b || !fiveDigits(a) || !fiveDigits(b)) [a, b] = closePair(rand);
  const firstWins = story.more ? a > b : a < b;
  const right = firstWins ? story.first : story.second;
  const wrong = firstWins ? story.second : story.first;
  return {
    prompt: `${story.text(fmt(a), fmt(b))} ${story.ask}`,
    ...mixOptions(rand, right, [wrong]),
    hint: `Em so sánh ${fmt(a)} và ${fmt(b)}.`,
    solution: `${compareWhy5(a, b)} ${right} ${story.verdict}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  doc: readQuestion,
  hang: placeQuestion,
  tong: sumQuestion,
  lien: neighbourQuestion,
  dau: signQuestion,
  'lon-be': extremeQuestion,
  'lam-tron': roundQuestion,
  'bai-toan': storyQuestion,
};

/** Every kind of the round. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/** How many questions of each kind a round asks. */
const COUNTS = /** @type {Record<Kind, number>} */ ({
  doc: 2,
  hang: 1,
  tong: 1,
  lien: 1,
  dau: 2,
  'lon-be': 1,
  'lam-tron': 2,
  'bai-toan': 2,
});

/** How many questions a round asks. */
export const ROUND_LENGTH = Object.values(COUNTS).reduce((s, c) => s + c, 0);

/**
 * A round of different questions in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = KINDS.flatMap((k) => Array.from({ length: COUNTS[k] }, () => k));
  /** @type {Set<string>} */
  const asked = new Set();
  return shuffle(rand, kinds).map((kind) => {
    const skill = { id: kind, label: KIND_LABELS[kind], make: MAKERS[kind] };
    const q = { ...drawFresh(skill, asked, rand), kind };
    asked.add(questionKey(q));
    return q;
  });
}
