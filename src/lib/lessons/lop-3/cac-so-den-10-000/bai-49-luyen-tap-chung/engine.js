/**
 * The mixed practice round of "Luyện tập chung" for the chapter on numbers to
 * 10 000: reading and writing numbers of four digits, the digit of a place,
 * sums of thousands, hundreds, tens and ones, the numbers just before and
 * after, comparing, the largest and smallest, Roman numerals, rounding and
 * short real-life problems. Questions are built from a seed, so the first
 * round is the same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { drawFresh, mixOptions, questionKey, signOptions } from '#lib/core/kid/quiz.js';
import {
  PLACES4,
  compareWhy4,
  digitsOf,
  placesText4,
  readTo10000,
  roundTo,
  roundWhy,
  sumParts4,
  toRoman,
} from '../_shared/numbers-to-10000.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<null>} Asked */
/**
 * @typedef {'doc' | 'hang' | 'tong' | 'lien' | 'dau' | 'lon-be' | 'la-ma' | 'lam-tron' | 'bai-toan'} Kind
 */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  doc: 'Đọc, viết số',
  hang: 'Nghìn, trăm, chục, đơn vị',
  tong: 'Viết số thành tổng',
  lien: 'Số liền trước, số liền sau',
  dau: 'So sánh hai số',
  'lon-be': 'Số lớn nhất, số bé nhất',
  'la-ma': 'Chữ số La Mã',
  'lam-tron': 'Làm tròn số',
  'bai-toan': 'Giải bài toán',
});

/** @param {number} v */
const fourDigits = (v) => v >= 1000 && v <= 9999;

/**
 * A number of four digits that often has a zero digit, since those are the
 * ones read and written wrongly.
 * @param {() => number} rand
 */
export function withZeros(rand) {
  const th = int(rand, 1, 9) * 1000;
  const shape = int(rand, 0, 5);
  if (shape === 0) return th + int(rand, 1, 9);
  if (shape === 1) return th + int(rand, 1, 9) * 10 + int(rand, 1, 9);
  if (shape === 2) return th + int(rand, 1, 9) * 100 + int(rand, 1, 9);
  if (shape === 3) return th + int(rand, 1, 9) * 100 + int(rand, 1, 9) * 10;
  return th + int(rand, 1, 9) * 100 + int(rand, 1, 9) * 10 + int(rand, 1, 9);
}

/**
 * Three wrong numbers a child really writes for `n`: two digits swapped
 * first, then a hundred, ten, one or thousand off. All have four digits.
 * @param {() => number} rand
 * @param {number} n
 * @returns {number[]}
 */
export function digitSlips(rand, n) {
  const d = String(n).split('');
  const swaps = [0, 1, 2].map((i) => {
    const s = [...d];
    [s[i], s[i + 1]] = [s[i + 1], s[i]];
    return Number(s.join(''));
  });
  const nears = [n - 100, n + 100, n - 10, n + 10, n - 1, n + 1, n - 1000, n + 1000];
  const fine = (/** @type {number} */ v) => fourDigits(v) && v !== n && String(v).length === 4;
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
  const solution = `${fmt(n)} gồm ${placesText4(n)}, đọc là: ${readTo10000(n)}.`;
  if (rand() < 0.5) {
    return {
      prompt: `Số ${fmt(n)} đọc là gì?`,
      ...mixOptions(rand, readTo10000(n), wrong.map(readTo10000)),
      hint: 'Em đọc từ hàng nghìn. Hàng trăm là 0 thì đọc "không trăm", hàng chục là 0 thì đọc "linh".',
      solution,
    };
  }
  return {
    prompt: `Số "${readTo10000(n)}" viết là số nào?`,
    ...sortedOptions(n, wrong),
    hint: 'Em viết lần lượt chữ số hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
    solution,
  };
}

/**
 * Four different digits, so a digit names exactly one place.
 * @param {() => number} rand
 */
function distinctDigits(rand) {
  const digits = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const lead = digits.findIndex((x) => x !== 0);
  const [th] = digits.splice(lead, 1);
  return th * 1000 + digits[0] * 100 + digits[1] * 10 + digits[2];
}

/**
 * The digit of a place, or the place of a digit.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function placeQuestion(rand) {
  const n = distinctDigits(rand);
  const place = pick(rand, PLACES4);
  const d = digitsOf(n);
  const digit = d[place.key];
  const hint = 'Từ trái sang phải là hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.';
  const solution = `${fmt(n)} gồm ${placesText4(n)}. Chữ số ${digit} ở hàng ${place.unit}.`;
  if (rand() < 0.5) {
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} ở hàng nào?`,
      options: PLACES4.map((p) => `Hàng ${p.unit}`),
      answer: PLACES4.indexOf(place),
      hint,
      solution,
    };
  }
  const digits = PLACES4.map((p) => d[p.key]).sort((x, y) => x - y);
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
  const parts = sumParts4(n);
  return parts.flatMap((part, i) =>
    [part * 10, part / 10]
      .filter((v) => Number.isInteger(v) && v >= 1 && v <= 9000)
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
  const sum = sumParts4(n).map(fmt).join(' + ');
  const solution = `${fmt(n)} gồm ${placesText4(n)}, nên ${fmt(n)} = ${sum}.`;
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
    hint: 'Em ghép số nghìn, số trăm, số chục và số đơn vị thành một số.',
    solution,
  };
}

/**
 * The number just before or just after another, often across a round number,
 * where several digits change.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function neighbourQuestion(rand) {
  const after = rand() < 0.5;
  const tricky = rand() < 0.6;
  const th = int(rand, 1, 9) * 1000;
  let n = int(rand, 1001, 9998);
  if (tricky) {
    n = after
      ? pick(rand, [th + 999, th + int(rand, 1, 9) * 100 + 99, th + int(rand, 1, 9) * 10 + 9])
      : pick(rand, [th === 1000 ? 10000 : th, th + int(rand, 1, 9) * 100]);
  }
  const right = after ? n + 1 : n - 1;
  const pool = [after ? n - 1 : n + 1, right + 10, right - 10, right + 100, n].filter(
    (v) => v >= 1000 && v <= 10000 && v !== right,
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
 * number of three digits against one of four.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function closePair(rand) {
  const a = int(rand, 1000, 9999);
  const shape = int(rand, 0, 9);
  if (shape === 8)
    return rand() < 0.5 ? [int(rand, 900, 999), int(rand, 1000, 1099)] : [9999, 10000];
  if (shape === 9) return [a, a];
  const place = PLACES4[shape % 4];
  const d = { ...digitsOf(a) };
  d[place.key] = place.key === 'thousands' ? int(rand, 1, 9) : int(rand, 0, 9);
  const b = d.thousands * 1000 + d.hundreds * 100 + d.tens * 10 + d.ones;
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
    hint: 'Em đếm chữ số trước. Cùng số chữ số thì so sánh từ hàng nghìn.',
    solution: compareWhy4(a, b),
  };
}

/**
 * The largest or the smallest of four numbers sharing their thousands.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function extremeQuestion(rand) {
  const th = int(rand, 1, 9) * 1000;
  /** @type {Set<number>} */
  const values = new Set();
  const base = th + int(rand, 0, 9) * 100;
  values.add(base + int(rand, 0, 99));
  while (values.size < 4) {
    values.add(rand() < 0.5 ? base + int(rand, 0, 99) : th + int(rand, 0, 999));
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
    hint: 'Hàng nghìn giống nhau. Em so sánh hàng trăm, rồi hàng chục, rồi hàng đơn vị.',
    solution: `${order.map(fmt).join(' < ')}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${fmt(right)}.`,
  };
}

/**
 * Wrong Roman numerals for `n` that children write: IIII for 4, the
 * letters turned round, or a neighbouring number.
 * @param {number} n
 * @returns {string[]}
 */
function romanSlips(n) {
  const roman = toRoman(n);
  const out = [
    [...roman].reverse().join(''),
    roman.replace('IV', 'IIII').replace('IX', 'VIIII'),
    toRoman(n + 1),
    toRoman(n - 1),
    toRoman(n + 2),
  ];
  return [...new Set(out)].filter((s) => s !== '' && s !== roman);
}

/**
 * A Roman numeral to read, or a number to write in Roman numerals.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function romanQuestion(rand) {
  const n = int(rand, 1, 20);
  const roman = toRoman(n);
  if (rand() < 0.5) {
    const wrong = [n + 1, n - 1, n % 10 === 4 || n % 10 === 9 ? n + 2 : n + 10].filter(
      (v) => v >= 1 && v <= 30 && v !== n,
    );
    const values = [n, ...new Set(wrong)].sort((x, y) => x - y);
    return {
      prompt: `Số La Mã ${roman} là số nào?`,
      options: values.map(String),
      answer: values.indexOf(n),
      hint: 'I là 1, V là 5, X là 10. Chữ I đứng bên trái V hoặc X thì bớt đi 1.',
      solution: `${roman} là ${n}.`,
    };
  }
  return {
    prompt: `Số ${n} viết bằng chữ số La Mã là gì?`,
    ...mixOptions(rand, roman, shuffle(rand, romanSlips(n)).slice(0, 3)),
    hint: 'Không viết một chữ bốn lần liền nhau. Từ 11 đến 20, viết X trước.',
    solution: `Số ${n} viết là ${roman}.`,
  };
}

/**
 * Rounding a number to tens or hundreds.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function roundQuestion(rand) {
  const unit = /** @type {10 | 100} */ (pick(rand, [10, 100]));
  let n = int(rand, 1001, 9989);
  if (n % unit === 0) n += unit === 10 ? 3 : 47;
  if (rand() < 0.3) n = Math.floor(n / unit) * unit + unit / 2;
  const right = roundTo(n, unit);
  const low = Math.floor(n / unit) * unit;
  const other = /** @type {10 | 100} */ (unit === 10 ? 100 : 10);
  const wrong = [low, low + unit, roundTo(n, other)];
  return {
    prompt: `Làm tròn số ${fmt(n)} đến hàng ${unit === 10 ? 'chục' : 'trăm'} được số nào?`,
    ...sortedOptions(right, wrong),
    hint:
      unit === 10
        ? 'Em nhìn chữ số hàng đơn vị và so sánh với 5.'
        : 'Em nhìn chữ số hàng chục và so sánh với 5.',
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
    first: 'Bác Nam',
    second: 'Bác Hoà',
    text: (a, b) => `Bác Nam nuôi ${a} con gà. Bác Hoà nuôi ${b} con gà.`,
    ask: 'Bác nào nuôi nhiều gà hơn?',
    more: true,
    verdict: 'nuôi nhiều gà hơn',
  },
  {
    first: 'Xe tải',
    second: 'Xe ca',
    text: (a, b) => `Xe tải nặng ${a} kg. Xe ca nặng ${b} kg.`,
    ask: 'Xe nào nhẹ hơn?',
    more: false,
    verdict: 'nhẹ hơn',
  },
  {
    first: 'Trường Hoà Bình',
    second: 'Trường Sao Mai',
    text: (a, b) => `Trường Hoà Bình có ${a} học sinh. Trường Sao Mai có ${b} học sinh.`,
    ask: 'Trường nào có nhiều học sinh hơn?',
    more: true,
    verdict: 'có nhiều học sinh hơn',
  },
  {
    first: 'Cuốn truyện',
    second: 'Cuốn từ điển',
    text: (a, b) => `Cuốn truyện có ${a} trang. Cuốn từ điển có ${b} trang.`,
    ask: 'Cuốn nào mỏng hơn?',
    more: false,
    verdict: 'mỏng hơn',
  },
];

/**
 * A short real-life problem: comparing two amounts, counting boxes of a
 * thousand, packs of a hundred and of ten, or rounding a count.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const shape = int(rand, 0, 2);
  if (shape === 0) {
    const [th, h, t, o] = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
    const n = th * 1000 + h * 100 + t * 10 + o;
    return {
      prompt: `Cửa hàng có ${th} thùng vở, mỗi thùng ${fmt(1000)} quyển; ${h} hộp, mỗi hộp 100 quyển; ${t} gói, mỗi gói 10 quyển; và ${o} quyển lẻ. Cửa hàng có tất cả bao nhiêu quyển vở?`,
      ...sortedOptions(n, digitSlips(rand, n)),
      hint: 'Mỗi thùng là 1 nghìn, mỗi hộp là 1 trăm, mỗi gói là 1 chục.',
      solution: `${th} nghìn, ${h} trăm, ${t} chục, ${o} đơn vị là số ${fmt(n)}. Cửa hàng có ${fmt(n)} quyển vở.`,
    };
  }
  if (shape === 1) {
    let n = int(rand, 1001, 9899);
    if (n % 100 === 0) n += 37;
    const right = roundTo(n, 100);
    const low = Math.floor(n / 100) * 100;
    return {
      prompt: `Thư viện có ${fmt(n)} cuốn sách. Làm tròn đến hàng trăm, thư viện có khoảng bao nhiêu cuốn sách?`,
      ...sortedOptions(right, [low, low + 100, roundTo(n, 10)]),
      hint: 'Làm tròn đến hàng trăm thì nhìn chữ số hàng chục.',
      solution: `${roundWhy(n, 100)} Thư viện có khoảng ${fmt(right)} cuốn sách.`,
    };
  }
  const story = pick(rand, STORIES);
  let [a, b] = closePair(rand);
  while (a === b) [a, b] = closePair(rand);
  const firstWins = story.more ? a > b : a < b;
  const right = firstWins ? story.first : story.second;
  const wrong = firstWins ? story.second : story.first;
  return {
    prompt: `${story.text(fmt(a), fmt(b))} ${story.ask}`,
    ...mixOptions(rand, right, [wrong]),
    hint: `Em so sánh ${fmt(a)} và ${fmt(b)}.`,
    solution: `${compareWhy4(a, b)} ${right} ${story.verdict}.`,
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
  'la-ma': romanQuestion,
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
  'la-ma': 2,
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
