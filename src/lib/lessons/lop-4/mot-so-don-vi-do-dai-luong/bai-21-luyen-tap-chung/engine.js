/**
 * The mixed practice of the chapter "Một số đơn vị đo đại lượng": mass in
 * yến, tạ, tấn and kg, area in m², dm², cm² and mm², seconds and centuries,
 * comparing measures and a real-life problem. One question of each part in
 * a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { signOptions } from '#lib/core/kid/quiz.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { fmt } from '#lib/core/number-format.js';
import {
  AREA_UNITS,
  MASS_UNITS,
  centuryOf,
  centuryWhy,
  durationText,
  massText,
  roman,
} from '../_shared/measures.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'khoi-luong-ra-kg': 'Đổi yến, tạ, tấn ra kg',
  'doi-khoi-luong': 'Đổi đơn vị khối lượng',
  'tinh-khoi-luong': 'Tính với số đo khối lượng',
  'dien-tich': 'Đổi đơn vị diện tích',
  giay: 'Đổi phút, giây',
  'the-ki': 'Năm thuộc thế kỉ nào',
  'so-sanh': 'So sánh số đo',
  'thuc-te': 'Bài toán thực tế',
});

/**
 * Up to four number options in increasing order: the right one and the
 * slips a child makes, all positive whole numbers, each written with `unit`.
 * @param {number} right
 * @param {number[]} slips
 * @param {string} unit
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips, unit) {
  const others = [...new Set(slips)].filter((v) => v !== right && v > 0 && Number.isInteger(v));
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map((v) => `${fmt(v)} ${unit}`), answer: values.indexOf(right) };
}

/** The mass units by id. */
const MASS = Object.fromEntries(MASS_UNITS.map((u) => [u.id, u]));

/** Pairs of a unit and a smaller one with how many of the smaller make one. */
const MASS_STEPS = /** @type {const} */ ([
  ['yen', 'kg', 10],
  ['ta', 'yen', 10],
  ['tan', 'ta', 10],
  ['ta', 'kg', 100],
  ['tan', 'kg', 1000],
]);

/** Area units with the next smaller one. */
const AREA_STEPS = AREA_UNITS.slice(0, 3).map((u, i) => [u, AREA_UNITS[i + 1]]);

/** Years for the century questions: round hundreds are the tricky ones. */
const YEARS = [938, 1010, 1288, 1428, 1700, 1789, 1800, 1858, 1900, 1945, 1975, 2000, 2001, 2026];

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'khoi-luong-ra-kg': (rand) => {
    const big = pick(rand, ['tan', 'ta']);
    const parts =
      big === 'tan'
        ? { tan: int(rand, 1, 9), ta: int(rand, 0, 9), yen: 0, kg: int(rand, 1, 9) }
        : { tan: 0, ta: int(rand, 1, 9), yen: int(rand, 1, 9), kg: 0 };
    const kg = parts.tan * 1000 + parts.ta * 100 + parts.yen * 10 + parts.kg;
    const given = massText(kg);
    const slips =
      big === 'tan'
        ? [
            parts.tan * 100 + parts.ta * 10 + parts.kg,
            kg + 90,
            parts.tan * 1000 + parts.ta * 10 + parts.kg,
          ]
        : [parts.ta * 10 + parts.yen, parts.ta * 100 + parts.yen, kg + 100];
    return {
      prompt: `${given} = ? kg`,
      ...slipOptions(kg, slips, 'kg'),
      hint: `1 tấn = ${fmt(1000)} kg; 1 tạ = 100 kg; 1 yến = 10 kg. Em đổi từng phần rồi cộng lại.`,
      solution: `${given} = ${fmt(kg)} kg.`,
    };
  },
  'doi-khoi-luong': (rand) => {
    const [bigId, smallId, ratio] = pick(rand, MASS_STEPS);
    const big = MASS[bigId];
    const small = MASS[smallId];
    const n = int(rand, 2, 9);
    const toSmall = rand() < 0.5;
    const right = toSmall ? n * ratio : n;
    const prompt = toSmall
      ? `${n} ${big.name} = ? ${small.name}`
      : `${fmt(n * ratio)} ${small.name} = ? ${big.name}`;
    const unit = toSmall ? small.name : big.name;
    const slips = toSmall
      ? [n * ratio * 10, n * 10, n * 100, n * 1000]
      : [n * 10, n * ratio, n + 1];
    return {
      prompt,
      ...slipOptions(right, slips, unit),
      hint: `1 ${big.name} = ${fmt(ratio)} ${small.name}.`,
      solution: `1 ${big.name} = ${fmt(ratio)} ${small.name}, nên ${fmt(n)} ${big.name} = ${fmt(n * ratio)} ${small.name}.`,
    };
  },
  'tinh-khoi-luong': (rand) => {
    const unit = pick(rand, MASS_UNITS.slice(0, 3)).name;
    const op = pick(rand, ['+', '−', '×']);
    /** @type {number} */
    let a;
    /** @type {number} */
    let b;
    /** @type {number} */
    let right;
    if (op === '×') {
      a = int(rand, 12, 99);
      b = int(rand, 2, 6);
      right = a * b;
    } else {
      a = int(rand, 120, 900);
      b = int(rand, 15, 99);
      right = op === '+' ? a + b : a - b;
    }
    const expr = `${fmt(a)} ${unit} ${op} ${op === '×' ? b : `${fmt(b)} ${unit}`}`;
    return {
      prompt: `${expr} = ?`,
      ...slipOptions(right, [right + 10, right - 10, right + 1, right - 1], unit),
      hint: `Em tính với các số rồi giữ nguyên đơn vị ${unit}.`,
      solution: `${fmt(a)} ${op} ${fmt(b)} = ${fmt(right)}. Vậy ${expr} = ${fmt(right)} ${unit}.`,
    };
  },
  'dien-tich': (rand) => {
    const [big, small] = pick(rand, AREA_STEPS);
    const n = int(rand, 2, 9);
    const mode = int(rand, 0, 2);
    if (mode === 0) {
      return {
        prompt: `${n} ${big.symbol} = ? ${small.symbol}`,
        ...slipOptions(n * 100, [n * 10, n * 1000, n * 100 + 10], small.symbol),
        hint: `1 ${big.symbol} = 100 ${small.symbol}.`,
        solution: `${n} ${big.symbol} = ${n} × 100 ${small.symbol} = ${fmt(n * 100)} ${small.symbol}.`,
      };
    }
    if (mode === 1) {
      return {
        prompt: `${fmt(n * 100)} ${small.symbol} = ? ${big.symbol}`,
        ...slipOptions(n, [n * 10, n * 100, n + 10], big.symbol),
        hint: `Cứ 100 ${small.symbol} là 1 ${big.symbol}.`,
        solution: `${fmt(n * 100)} : 100 = ${n}. Vậy ${fmt(n * 100)} ${small.symbol} = ${n} ${big.symbol}.`,
      };
    }
    const m = int(rand, 11, 95);
    const right = n * 100 + m;
    return {
      prompt: `${n} ${big.symbol} ${m} ${small.symbol} = ? ${small.symbol}`,
      ...slipOptions(right, [n * 10 + m, n * 1000 + m, right + 100], small.symbol),
      hint: `Em đổi ${n} ${big.symbol} ra ${small.symbol}, rồi cộng thêm ${m} ${small.symbol}.`,
      solution: `${n} ${big.symbol} = ${fmt(n * 100)} ${small.symbol}. ${fmt(n * 100)} + ${m} = ${fmt(right)}. Vậy ${n} ${big.symbol} ${m} ${small.symbol} = ${fmt(right)} ${small.symbol}.`,
    };
  },
  giay: (rand) => {
    const min = int(rand, 1, 5);
    const sec = int(rand, 5, 55);
    const right = min * 60 + sec;
    return {
      prompt: `${min} phút ${sec} giây = ? giây`,
      ...slipOptions(right, [min * 100 + sec, min * 10 + sec, right + 60, right - 60], 'giây'),
      hint: '1 phút = 60 giây.',
      solution: `${min} phút = ${min * 60} giây. ${min * 60} + ${sec} = ${right}. Vậy ${durationText(right)} = ${right} giây.`,
    };
  },
  'the-ki': (rand) => {
    const year = pick(rand, YEARS);
    const c = centuryOf(year);
    const start = Math.max(1, c - int(rand, 0, 2));
    const options = [start, start + 1, start + 2].map(roman);
    return {
      prompt: `Năm ${year} thuộc thế kỉ nào?`,
      options,
      answer: c - start,
      optionLabels: options.map((r) => `Thế kỉ ${r}`),
      hint: 'Thế kỉ I từ năm 1 đến năm 100. Năm tròn trăm là năm cuối của một thế kỉ.',
      solution: centuryWhy(year),
    };
  },
  'so-sanh': (rand) => {
    const kind = pick(rand, ['mass', 'time']);
    if (kind === 'mass') {
      const ta = int(rand, 2, 6);
      const kg = int(rand, 11, 99);
      const left = ta * 100 + kg;
      const other = pick(rand, [
        left,
        left + int(rand, 1, 60),
        left - int(rand, 1, 60),
        ta * 10 + kg,
      ]);
      const sign = compareSign(left, other);
      return {
        prompt: `${ta} tạ ${kg} kg ? ${fmt(other)} kg`,
        ...signOptions(sign),
        hint: 'Em đổi số đo bên trái ra ki-lô-gam trước.',
        solution: `${ta} tạ ${kg} kg = ${fmt(ta * 100)} kg + ${kg} kg = ${fmt(left)} kg. Mà ${fmt(left)} kg ${sign} ${fmt(other)} kg.`,
      };
    }
    const min = int(rand, 2, 5);
    const sec = int(rand, 10, 50);
    const left = min * 60 + sec;
    const other = pick(rand, [left, left + 10, left - 10, min * 100 + sec]);
    const sign = compareSign(left, other);
    return {
      prompt: `${min} phút ${sec} giây ? ${other} giây`,
      ...signOptions(sign),
      hint: 'Em đổi số đo bên trái ra giây trước. 1 phút = 60 giây.',
      solution: `${min} phút ${sec} giây = ${min * 60} giây + ${sec} giây = ${left} giây. Mà ${left} giây ${sign} ${other} giây.`,
    };
  },
  'thuc-te': (rand) => {
    const tan = int(rand, 2, 6);
    const ta = int(rand, 11, 19);
    const right = tan * 10 + ta;
    return {
      prompt: `Chuyến đầu xe chở ${tan} tấn thóc, chuyến sau chở ${ta} tạ thóc. Cả hai chuyến xe chở bao nhiêu tạ thóc?`,
      ...slipOptions(right, [tan + ta, tan * 100 + ta, right + 10], 'tạ'),
      hint: 'Em đổi số tấn ra tạ trước. 1 tấn = 10 tạ.',
      solution: `${tan} tấn = ${tan * 10} tạ. ${tan * 10} + ${ta} = ${right}. Cả hai chuyến xe chở ${right} tạ thóc.`,
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
