/**
 * A mixed practice round over the chapter "Các số đến 100": reading a
 * number, tens and ones, counting bundled sticks, comparing, the largest or
 * smallest of three, and moving on the hundred board. Questions are built
 * from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import {
  SIGNS,
  SIGN_WORDS,
  compareReason,
  compareSign,
  placeText,
  readNumber,
} from '../_shared/numbers.js';

/** @typedef {'read' | 'place' | 'sticks' | 'compare' | 'extreme' | 'board'} Kind */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   sticks?: { tens: number, ones: number };
 *   options: string[];
 *   optionLabels?: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'read',
  'place',
  'sticks',
  'compare',
  'extreme',
  'board',
]);

/** What each kind practises, for the progress line and the summary. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc số',
  place: 'Chục và đơn vị',
  sticks: 'Đếm que tính',
  compare: 'So sánh',
  extreme: 'Lớn nhất, bé nhất',
  board: 'Bảng các số',
});

/**
 * The number with its digits swapped (47 → 74), or null when that is not a
 * different two-digit number.
 * @param {number} n
 */
export function swapped(n) {
  const t = Math.floor(n / 10);
  const u = n % 10;
  return u === 0 || u === t ? null : u * 10 + t;
}

/**
 * Three distinct number options from 1 to 100 holding `right`: the given
 * distractors first, then near numbers, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @param {Array<number | null>} distractors
 * @returns {{ options: string[], answer: number }}
 */
export function numberOptions(rand, right, distractors) {
  const pool = [right];
  const add = (/** @type {number | null} */ v) => {
    if (v !== null && v >= 1 && v <= 100 && !pool.includes(v)) pool.push(v);
  };
  distractors.forEach(add);
  for (const d of shuffle(rand, [1, -1, 10, -10, 2, -2])) add(right + d);
  const values = pool.slice(0, 3).sort((a, b) => a - b);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/** A two-digit number from 11 to 99. */
function twoDigit(/** @type {() => number} */ rand) {
  return int(rand, 11, 99);
}

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  if (kind === 'read') {
    const n = twoDigit(rand);
    const near = swapped(n) ?? (n % 10 === 9 ? n - 1 : n + 1);
    const other = n + (n > 89 ? -10 : 10);
    if (rand() < 0.5) {
      const options = shuffle(rand, [readNumber(n), readNumber(near), readNumber(other)]);
      return {
        kind,
        prompt: `Số ${n} đọc là gì?`,
        options,
        answer: options.indexOf(readNumber(n)),
        hint: `Chữ số bên trái chỉ số chục: ${Math.floor(n / 10)} chục.`,
        solution: `${n} gồm ${placeText(Math.floor(n / 10), n % 10)}, đọc là "${readNumber(n)}".`,
      };
    }
    return {
      kind,
      prompt: `Số nào đọc là "${readNumber(n)}"?`,
      ...numberOptions(rand, n, [near, other]),
      hint: 'Phần "... mươi" cho em biết số chục.',
      solution: `"${readNumber(n)}" là ${placeText(Math.floor(n / 10), n % 10)}: số ${n}.`,
    };
  }
  if (kind === 'place') {
    const n = twoDigit(rand);
    const t = Math.floor(n / 10);
    const u = n % 10;
    const prompt =
      rand() < 0.5
        ? `${placeText(t, u)} là số nào?`
        : `Mẹ mua ${t} chục quả trứng${u > 0 ? ` và ${u} quả trứng nữa` : ''}. Mẹ mua tất cả bao nhiêu quả trứng?`;
    return {
      kind,
      prompt,
      ...numberOptions(rand, n, [swapped(n), t + u > 0 && t + u !== n ? t + u : null]),
      hint: 'Số chục viết bên trái, số đơn vị viết bên phải.',
      solution: `${placeText(t, u)} là ${n}.`,
    };
  }
  if (kind === 'sticks') {
    const n = int(rand, 12, 59);
    const t = Math.floor(n / 10);
    const u = n % 10;
    return {
      kind,
      prompt: 'Có bao nhiêu que tính?',
      sticks: { tens: t, ones: u },
      ...numberOptions(rand, n, [swapped(n), n + 10]),
      hint: 'Mỗi bó có 10 que. Đếm số bó trước, rồi đếm que rời.',
      solution: `${t} bó là ${t} chục, ${u} que rời là ${u} đơn vị. Có ${n} que tính.`,
    };
  }
  if (kind === 'compare') {
    const a = twoDigit(rand);
    const r = rand();
    let b;
    if (r < 0.15) b = a;
    else if (r < 0.6)
      b =
        Math.floor(a / 10) * 10 +
        pick(
          rand,
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((u) => u !== a % 10),
        );
    else b = swapped(a) ?? Math.min(99, a + 10 * int(rand, 1, 3));
    const sign = compareSign(a, b);
    return {
      kind,
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      options: [...SIGNS],
      optionLabels: SIGNS.map((s) => `Dấu ${SIGN_WORDS[s]}`),
      answer: SIGNS.indexOf(sign),
      hint: 'So sánh hàng chục trước. Hàng chục bằng nhau thì so sánh hàng đơn vị.',
      solution: compareReason(a, b),
    };
  }
  if (kind === 'extreme') {
    const tens = int(rand, 1, 8);
    // Two numbers share their tens, so the ones must decide between them.
    const x = tens * 10 + int(rand, 0, 4);
    const y = tens * 10 + int(rand, 5, 9);
    const zTens = pick(
      rand,
      [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((t) => t !== tens),
    );
    const values = [x, y, zTens * 10 + int(rand, 0, 9)];
    const big = rand() < 0.5;
    const right = big ? Math.max(...values) : Math.min(...values);
    const options = shuffle(rand, values.map(String));
    const word = big ? 'lớn nhất' : 'bé nhất';
    const sorted = [...values].sort((p, q) => p - q).join(' < ');
    return {
      kind,
      prompt: `Số nào ${word}?`,
      options,
      answer: options.indexOf(String(right)),
      hint: 'So sánh hàng chục trước. Hai số cùng hàng chục thì xem hàng đơn vị.',
      solution: `${sorted}. Số ${right} ${word}.`,
    };
  }
  const n = int(rand, 12, 89);
  const dirs = /** @type {const} */ ([
    ['dưới', 10, 'Xuống dưới một ô thì thêm 10.'],
    ['trên', -10, 'Lên trên một ô thì bớt 10.'],
    ['bên phải', 1, 'Sang phải một ô thì thêm 1.'],
    ['bên trái', -1, 'Sang trái một ô thì bớt 1.'],
  ]);
  const col = (n - 1) % 10;
  const allowed = dirs.filter(([, d]) => !(d === 1 && col === 9) && !(d === -1 && col === 0));
  const [where, d, rule] = pick(rand, allowed);
  const right = n + d;
  const miss = Math.abs(d) === 1 ? n + 10 * Math.sign(d) : n + Math.sign(d);
  return {
    kind,
    prompt: `Trong bảng các số từ 1 đến 100, ô ngay ${where} số ${n} là số nào?`,
    ...numberOptions(rand, right, [miss, n - d]),
    hint: rule,
    solution: `${rule} Ô ngay ${where} số ${n} là ${right}.`,
  };
}

/**
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = shuffle(rand, [...KINDS, ...KINDS]);
  return kinds.map((k) => makeQuestion(k, rand));
}

/**
 * Kinds the child missed at the first try, to suggest what to review.
 * @param {readonly Question[]} round
 * @param {ReadonlyArray<boolean | null>} firstTry
 * @returns {string[]}
 */
export function weakKinds(round, firstTry) {
  const missed = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) missed.add(q.kind);
  });
  return KINDS.filter((k) => missed.has(k)).map((k) => KIND_LABELS[k]);
}
