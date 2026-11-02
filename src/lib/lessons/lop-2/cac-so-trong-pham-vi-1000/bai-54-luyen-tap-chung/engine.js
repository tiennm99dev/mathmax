/**
 * The mixed practice round of "Luyện tập chung" for the chapter on numbers to
 * 1000: reading and writing numbers, counting blocks, the digit of a place,
 * sums of hundreds, tens and ones, the numbers just before and after, the
 * number line, comparing, ordering and short real-life problems. Questions are
 * built from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import {
  drawFresh,
  mixOptions,
  numberOptions,
  questionKey,
  signOptions,
} from '#lib/core/kid/quiz.js';
import {
  PLACES,
  compareWhy,
  placesOf,
  placesText,
  readTo1000,
  sumParts,
} from '../_shared/place-value.js';

/** @typedef {{ type: 'pile', hundreds: number, tens: number, ones: number }} Pile */
/** @typedef {{ type: 'line', start: number, step: number, count: number, hidden: number }} Line */
/** @typedef {Pile | Line} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/**
 * @typedef {'doc' | 'khoi' | 'hang' | 'tong' | 'lien' | 'tia' | 'dau' | 'lon-be' | 'so-voi' | 'bai-toan'} Kind
 */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  doc: 'Đọc, viết số',
  khoi: 'Đếm khối thành số',
  hang: 'Trăm, chục, đơn vị',
  tong: 'Viết số thành tổng',
  lien: 'Số liền trước, số liền sau',
  tia: 'Tia số',
  dau: 'So sánh hai số',
  'lon-be': 'Số lớn nhất, số bé nhất',
  'so-voi': 'So với một số',
  'bai-toan': 'Giải bài toán',
});

/** @param {() => number} rand */
const threeDigit = (rand) => int(rand, 101, 999);

/**
 * A three-digit number that has a zero digit about a third of the time, since
 * those are the ones read and written wrongly.
 * @param {() => number} rand
 */
function withZeros(rand) {
  const hundreds = int(rand, 1, 9);
  const shape = int(rand, 0, 5);
  if (shape === 0) return hundreds * 100 + int(rand, 1, 9);
  if (shape === 1) return hundreds * 100 + int(rand, 1, 9) * 10;
  return hundreds * 100 + int(rand, 1, 9) * 10 + int(rand, 1, 9);
}

/**
 * Three wrong numbers a child really writes for `n`: digits changed over
 * first, then ten off, one off and a hundred off. All have three digits.
 * @param {() => number} rand
 * @param {number} n
 * @returns {number[]}
 */
export function digitSlips(rand, n) {
  const { hundreds: h, tens: t, ones: o } = placesOf(n);
  const fine = (/** @type {number} */ v) => v >= 100 && v <= 999 && v !== n;
  const swaps = [h * 100 + o * 10 + t, t * 100 + h * 10 + o, o * 100 + t * 10 + h];
  const nears = [n - 10, n + 10, n - 1, n + 1, n - 100, n + 100];
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
function sortedOptions(right, wrong) {
  const values = [right, ...wrong].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * Reading a number, or writing the number that is read.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function readQuestion(rand) {
  const n = withZeros(rand);
  const wrong = digitSlips(rand, n);
  const hint = 'Em đọc từ hàng trăm đến hàng đơn vị. Hàng chục là 0 thì đọc "linh".';
  const solution = `${n} gồm ${placesText(n)}, đọc là: ${readTo1000(n)}.`;
  if (rand() < 0.5) {
    return {
      prompt: `Số ${n} đọc là gì?`,
      ...mixOptions(rand, readTo1000(n), wrong.map(readTo1000)),
      hint,
      solution,
    };
  }
  return {
    prompt: `Số "${readTo1000(n)}" viết là số nào?`,
    ...sortedOptions(n, wrong),
    hint: 'Em viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị.',
    solution,
  };
}

/**
 * The number some blocks show.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function blocksQuestion(rand) {
  const hundreds = int(rand, 1, 4);
  const tens = int(rand, 0, 5);
  const ones = int(rand, tens === 0 ? 1 : 0, 6);
  const n = hundreds * 100 + tens * 10 + ones;
  return {
    prompt: 'Các khối này là số nào?',
    visual: { type: 'pile', hundreds, tens, ones },
    ...sortedOptions(n, digitSlips(rand, n)),
    hint: 'Em đếm tấm trăm, rồi thanh chục, rồi khối đơn vị.',
    solution: `Có ${placesText(n)}. Đó là số ${n}.`,
  };
}

/**
 * Three different digits, so a digit names exactly one place.
 * @param {() => number} rand
 */
function distinctDigits(rand) {
  const digits = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const lead = digits.findIndex((d) => d !== 0);
  const [hundreds] = digits.splice(lead, 1);
  return hundreds * 100 + digits[0] * 10 + digits[1];
}

/**
 * The digit of a place, or the place of a digit.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function placeQuestion(rand) {
  const n = distinctDigits(rand);
  const place = pick(rand, PLACES);
  const digit = placesOf(n)[place.key];
  const solution = `${n} gồm ${placesText(n)}. Chữ số ${digit} ở hàng ${place.unit}.`;
  if (rand() < 0.5) {
    const options = PLACES.map((p) => `Hàng ${p.unit}`);
    return {
      prompt: `Trong số ${n}, chữ số ${digit} ở hàng nào?`,
      options,
      answer: PLACES.indexOf(place),
      hint: 'Từ trái sang phải là hàng trăm, hàng chục, hàng đơn vị.',
      solution,
    };
  }
  const digits = PLACES.map((p) => placesOf(n)[p.key]).sort((x, y) => x - y);
  return {
    prompt: `Chữ số hàng ${place.unit} của số ${n} là chữ số nào?`,
    options: digits.map(String),
    answer: digits.indexOf(digit),
    hint: 'Từ trái sang phải là hàng trăm, hàng chục, hàng đơn vị.',
    solution,
  };
}

/**
 * Wrong sums for `n`: one part moved to the wrong place, which is the slip
 * children make. Moving a part always changes the total.
 * @param {number} n
 * @returns {string[]}
 */
export function sumSlips(n) {
  const parts = sumParts(n);
  return parts.flatMap((part, i) =>
    [part * 10, part / 10]
      .filter((v) => Number.isInteger(v) && v >= 1 && v <= 900)
      .map((v) => parts.map((p, j) => (j === i ? v : p)).join(' + ')),
  );
}

/**
 * A number and its sum of hundreds, tens and ones, either way round.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function sumQuestion(rand) {
  const n = withZeros(rand);
  const sum = sumParts(n).join(' + ');
  const solution = `${n} gồm ${placesText(n)}, nên ${n} = ${sum}.`;
  if (rand() < 0.5) {
    return {
      prompt: `${n} bằng tổng nào?`,
      ...mixOptions(rand, sum, shuffle(rand, sumSlips(n)).slice(0, 3)),
      hint: 'Mỗi chữ số cho một phần của tổng. Chữ số 0 thì không viết.',
      solution,
    };
  }
  return {
    prompt: `${sum} = ?`,
    ...sortedOptions(n, digitSlips(rand, n)),
    hint: 'Em ghép số trăm, số chục và số đơn vị thành một số.',
    solution,
  };
}

/**
 * The number just before or just after another, often across a round number,
 * where the digits all change.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function neighbourQuestion(rand) {
  const after = rand() < 0.5;
  const tricky = rand() < 0.5;
  const hundreds = int(rand, 1, 9);
  let n;
  if (after) {
    n = tricky
      ? pick(rand, [hundreds * 100 + 99, hundreds * 100 + int(rand, 1, 9) * 10 + 9])
      : threeDigit(rand);
  } else {
    n = tricky
      ? pick(rand, [hundreds * 100, hundreds * 100 + int(rand, 1, 9) * 10])
      : threeDigit(rand);
  }
  if (!after && n === 100) n = 200;
  const right = after ? n + 1 : n - 1;
  const other = after ? n - 1 : n + 1;
  const pool = [other, right + 10, right - 10, n].filter(
    (v) => v >= 100 && v <= 1000 && v !== right,
  );
  const word = after ? 'liền sau' : 'liền trước';
  return {
    prompt: `Số ${word} của ${n} là số nào?`,
    ...sortedOptions(right, shuffle(rand, pool).slice(0, 3)),
    hint: after ? 'Số liền sau lớn hơn số đó 1 đơn vị.' : 'Số liền trước bé hơn số đó 1 đơn vị.',
    solution: after
      ? `${n} thêm 1 là ${right}. Số liền sau của ${n} là ${right}.`
      : `${n} bớt 1 là ${right}. Số liền trước của ${n} là ${right}.`,
  };
}

/**
 * The number hidden on a line counting in ones or in tens.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function lineQuestion(rand) {
  const step = pick(rand, [1, 10]);
  const count = 6;
  const start = step === 1 ? int(rand, 100, 980) : int(rand, 10, 94) * 10;
  const hidden = int(rand, 1, count - 2);
  const right = start + step * hidden;
  const other = step === 1 ? 10 : 1;
  return {
    prompt: 'Số nào bị che trên tia số?',
    visual: { type: 'line', start, step, count, hidden },
    ...sortedOptions(right, [right - step, right + step, right + other]),
    hint: `Trên tia số này, mỗi vạch hơn vạch trước ${step} đơn vị.`,
    solution: `${start + step * (hidden - 1)} thêm ${step} là ${right}. Số bị che là ${right}.`,
  };
}

/**
 * What a tick of the line says: the hidden one shows "?" until the question
 * has ended.
 * @param {Line} line
 * @param {number} v
 * @param {boolean} settled
 */
export function tickText(line, v, settled) {
  return !settled && v === line.start + line.step * line.hidden ? '?' : String(v);
}

/**
 * The name of the line for a screen reader, with the same hidden number.
 * @param {Line} line
 * @param {boolean} settled
 */
export function lineLabel(line, settled) {
  const ticks = Array.from({ length: line.count }, (_, i) =>
    tickText(line, line.start + line.step * i, settled).replace('?', 'số bị che'),
  );
  return `Tia số có các vạch: ${ticks.join(', ')}`;
}

/**
 * What a screen reader says for some blocks: one name per block to count, the
 * totals once the question has ended.
 * @param {Pile} pile
 * @param {boolean} settled
 */
export function pileLabel(pile, settled) {
  const groups = PLACES.map((p) => ({ name: p.blockName, count: pile[p.key] })).filter(
    (g) => g.count > 0,
  );
  return settled
    ? groups.map((g) => `${g.count} ${g.name}`).join(', ')
    : groups.flatMap((g) => Array.from({ length: g.count }, () => g.name)).join(', ');
}

/**
 * Two numbers that differ at a chosen place, so each place gets to decide.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function closePair(rand) {
  const a = threeDigit(rand);
  const { hundreds: h, tens: t, ones: o } = placesOf(a);
  const shape = int(rand, 0, 3);
  if (shape === 0) return [a, int(rand, 1, 9) * 100 + o * 10 + t];
  if (shape === 1) return [a, h * 100 + int(rand, 0, 9) * 10 + o];
  if (shape === 2) return [a, h * 100 + t * 10 + int(rand, 0, 9)];
  return [a, t > 0 ? t * 100 + h * 10 + o : a];
}

/**
 * A pair of different numbers.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
function differentPair(rand) {
  let pair = closePair(rand);
  while (pair[0] === pair[1]) pair = closePair(rand);
  return pair;
}

/**
 * Choosing the sign between two numbers; equal numbers come up now and then.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function signQuestion(rand) {
  const [a, b] = closePair(rand);
  return {
    prompt: `Em chọn dấu đúng: ${a} ... ${b}.`,
    ...signOptions(compareSign(a, b)),
    hint:
      a === b ? 'Em so sánh từng hàng của hai số.' : 'Em nhìn hàng trăm trước, rồi đến hàng chục.',
    solution: compareWhy(a, b),
  };
}

/**
 * The largest or the smallest of four numbers, two of them sharing hundreds.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function extremeQuestion(rand) {
  /** @type {Set<number>} */
  const values = new Set(differentPair(rand));
  while (values.size < 4) values.add(threeDigit(rand));
  const numbers = [...values];
  const order = [...numbers].sort((x, y) => x - y);
  const largest = rand() < 0.5;
  const right = largest ? order[3] : order[0];
  const options = shuffle(rand, numbers).map(String);
  return {
    prompt: `Số nào ${largest ? 'lớn nhất' : 'bé nhất'}?`,
    options,
    answer: options.indexOf(String(right)),
    hint: 'Em so sánh hàng trăm trước. Hàng trăm bằng nhau thì so sánh hàng chục.',
    solution: `${order.join(' < ')}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
  };
}

/**
 * How many numbers of a list are above or below a given number.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function againstQuestion(rand) {
  const pivot = int(rand, 200, 899);
  const above = rand() < 0.5;
  const near = [-100, -10, -5, -1, 0, 1, 5, 10, 100];
  const offsets = shuffle(rand, near).slice(0, 4);
  // Keep one number on the asked side, so the answer is never an empty list.
  const numbers = shuffle(rand, [...offsets.map((d) => pivot + d), pivot + (above ? 20 : -20)]);
  const side = numbers.filter((v) => (above ? v > pivot : v < pivot));
  const word = above ? 'lớn hơn' : 'bé hơn';
  const { options, answer } = numberOptions(rand, side.length, 0, 5);
  return {
    prompt: `Trong các số ${numbers.join(', ')}, có mấy số ${word} ${pivot}?`,
    options,
    answer,
    hint: `Em so sánh từng số với ${pivot}. Số bằng ${pivot} thì không tính.`,
    solution: `Các số ${word} ${pivot} là ${side.join(', ')}. Có ${side.length} số.`,
  };
}

/**
 * The stories that compare two amounts. `more` is true when the question asks
 * for the larger amount.
 * @type {ReadonlyArray<{ first: string, second: string, text: (a: number, b: number) => string, ask: string, more: boolean, verdict: string }>}
 */
export const STORIES = [
  {
    first: 'Thùng đỏ',
    second: 'Thùng xanh',
    text: (a, b) => `Thùng đỏ có ${a} quả táo. Thùng xanh có ${b} quả táo.`,
    ask: 'Thùng nào có nhiều quả táo hơn?',
    more: true,
    verdict: 'có nhiều quả táo hơn',
  },
  {
    first: 'Gà',
    second: 'Vịt',
    text: (a, b) => `Trang trại có ${a} con gà và ${b} con vịt.`,
    ask: 'Con gì ít hơn?',
    more: false,
    verdict: 'ít hơn',
  },
  {
    first: 'Cây bàng',
    second: 'Cây phượng',
    text: (a, b) => `Cây bàng cao ${a} cm. Cây phượng cao ${b} cm.`,
    ask: 'Cây nào cao hơn?',
    more: true,
    verdict: 'cao hơn',
  },
  {
    first: 'Con bò',
    second: 'Con trâu',
    text: (a, b) => `Con bò nặng ${a} kg. Con trâu nặng ${b} kg.`,
    ask: 'Con nào nhẹ hơn?',
    more: false,
    verdict: 'nhẹ hơn',
  },
];

/**
 * A short real-life problem: which of two amounts is larger or smaller, or how
 * many things come in full boxes, packs and loose ones.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  if (rand() < 0.4) {
    const [h, t, o] = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
    const n = h * 100 + t * 10 + o;
    return {
      prompt: `Cô có ${h} hộp bút chì, mỗi hộp 100 cái. Cô có thêm ${t} gói, mỗi gói 10 cái, và ${o} cái lẻ. Cô có tất cả bao nhiêu cái bút chì?`,
      ...sortedOptions(n, digitSlips(rand, n)),
      hint: 'Mỗi hộp là 1 trăm, mỗi gói là 1 chục, mỗi cái lẻ là 1 đơn vị.',
      solution: `${h} trăm, ${t} chục, ${o} đơn vị là số ${n}. Cô có tất cả ${n} cái bút chì.`,
    };
  }
  const story = pick(rand, STORIES);
  const [a, b] = differentPair(rand);
  const firstWins = story.more ? a > b : a < b;
  const wrong = firstWins ? story.second : story.first;
  const right = firstWins ? story.first : story.second;
  return {
    prompt: `${story.text(a, b)} ${story.ask}`,
    ...mixOptions(rand, right, [wrong]),
    hint: `Em so sánh ${a} và ${b}, bắt đầu từ hàng trăm.`,
    solution: `${compareWhy(a, b)} ${right} ${story.verdict}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  doc: readQuestion,
  khoi: blocksQuestion,
  hang: placeQuestion,
  tong: sumQuestion,
  lien: neighbourQuestion,
  tia: lineQuestion,
  dau: signQuestion,
  'lon-be': extremeQuestion,
  'so-voi': againstQuestion,
  'bai-toan': storyQuestion,
};

/** Every kind of the round. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/** How many questions of each kind a round asks. */
const COUNTS = /** @type {Record<Kind, number>} */ ({
  doc: 2,
  khoi: 1,
  hang: 1,
  tong: 2,
  lien: 2,
  tia: 1,
  dau: 1,
  'lon-be': 1,
  'so-voi': 1,
  'bai-toan': 2,
});

/**
 * A round of fourteen different questions in mixed order.
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
