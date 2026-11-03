/**
 * The adaptive review of measures: millimetres, grams and millilitres, the
 * length of a broken line, a pan balance in grams, a sensible measure for a
 * thing, converting, and word problems. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */
/** @typedef {import('#lib/core/kid/mass.js').Load} Load */

/** @param {string} unit */
const inUnit = (unit) => (/** @type {number} */ n) => `${fmt(n)} ${unit}`;
const UNITS = /** @type {const} */ (['mm', 'g', 'ml']);

/**
 * The length of a broken line with the given segments.
 * @param {number[]} lengths
 * @returns {ReviewQuestion}
 */
export function brokenLineQuestion(lengths) {
  const right = lengths.reduce((s, l) => s + l, 0);
  const same = lengths.every((l) => l === lengths[0]);
  const name = 'ABCDE'.slice(0, lengths.length + 1);
  return {
    prompt: `Đường gấp khúc ${name} dài bao nhiêu mi-li-mét?`,
    visual: { type: 'broken', lengths },
    ...valueOptions(right, [right - lengths[0], lengths[0] * 2, right + 10], inUnit('mm')),
    hint: same
      ? 'Các đoạn dài bằng nhau: em lấy độ dài một đoạn nhân với số đoạn.'
      : 'Em cộng độ dài các đoạn thẳng.',
    solution: same
      ? `${lengths[0]} × ${lengths.length} = ${right} (mm).`
      : `${lengths.join(' + ')} = ${right} (mm).`,
  };
}

/** @type {ReviewSkill} */
export const brokenLines = {
  id: 'gap-khuc',
  label: 'Đường gấp khúc',
  make(rand) {
    if (rand() < 0.4) {
      const base = int(rand, 11, 48);
      return brokenLineQuestion(Array.from({ length: int(rand, 3, 4) }, () => base));
    }
    return brokenLineQuestion([int(rand, 20, 60), int(rand, 20, 60), int(rand, 20, 60)]);
  },
};

/**
 * A weight on a pan, drawn as a labelled box since the drawn weights are in kg.
 * @param {number} g
 * @returns {Load}
 */
const weight = (g) => ({ kind: 'thing', name: `${g} g`, kg: g });

/**
 * What a thing weighs on a level balance. Its mass goes in the `kg` field the
 * drawing compares by, as grams.
 * @param {string} name
 * @param {number[]} right the weights on the other pan
 * @param {number} [extra] a weight beside the thing
 * @returns {ReviewQuestion}
 */
export function balanceQuestion(name, right, extra = 0) {
  const sum = right.reduce((s, g) => s + g, 0);
  const mass = sum - extra;
  return {
    prompt: `Cân thăng bằng. ${name} cân nặng bao nhiêu gam?`,
    visual: {
      type: 'balance',
      left: [{ kind: 'thing', name, kg: mass }, ...(extra ? [weight(extra)] : [])],
      right: right.map(weight),
    },
    ...valueOptions(mass, [sum, sum + extra, mass - 100], inUnit('g')),
    hint: extra
      ? 'Hai đĩa nặng bằng nhau. Em cộng các quả cân ở đĩa bên phải, rồi trừ quả cân ở đĩa bên trái.'
      : 'Hai đĩa nặng bằng nhau. Em cộng các quả cân.',
    solution: extra
      ? `${right.join(' + ')} − ${extra} = ${fmt(mass)} (g).`
      : `${right.join(' + ')} = ${fmt(mass)} (g).`,
  };
}

const BALANCE_NAMES = ['Quả bưởi', 'Túi muối', 'Gói đường', 'Quả dưa'];

/** @type {ReviewSkill} */
export const balances = {
  id: 'can-gam',
  label: 'Cân đĩa theo gam',
  make(rand) {
    const name = pick(rand, BALANCE_NAMES);
    if (rand() < 0.5) {
      return balanceQuestion(
        name,
        pick(rand, [
          [200, 200, 100],
          [500, 200],
          [500, 100],
          [200, 100],
        ]),
      );
    }
    return balanceQuestion(
      name,
      pick(rand, [
        [500, 500],
        [500, 200],
      ]),
      pick(rand, [100, 200]),
    );
  },
};

/** Things with a sensible measure and measures that are far off. */
const FITTING = [
  {
    ask: 'Quyển sách Toán 3 tập một dày khoảng bao nhiêu?',
    right: '5 mm',
    wrong: ['5 cm', '5 dm'],
  },
  { ask: 'Lọ thuốc nhỏ mắt chứa khoảng bao nhiêu?', right: '15 ml', wrong: ['15 l', '150 l'] },
  {
    ask: 'Nhiệt độ cơ thể người bình thường là bao nhiêu?',
    right: '37 °C',
    wrong: ['7 °C', '100 °C'],
  },
  { ask: 'Quả trứng gà nặng khoảng bao nhiêu?', right: '50 g', wrong: ['50 kg', '5 kg'] },
  { ask: 'Gói mì tôm nặng khoảng bao nhiêu?', right: '80 g', wrong: ['80 kg', '8 kg'] },
  { ask: 'Hộp sữa nhỏ chứa khoảng bao nhiêu?', right: '180 ml', wrong: ['180 l', '18 l'] },
  { ask: 'Cái kẹp giấy dài khoảng bao nhiêu?', right: '30 mm', wrong: ['30 cm', '30 m'] },
];

/** @type {ReviewSkill} */
export const fitting = {
  id: 'so-do-phu-hop',
  label: 'Chọn số đo thích hợp',
  make(rand) {
    const thing = pick(rand, FITTING);
    const { options, answer } = mixOptions(rand, thing.right, thing.wrong);
    return {
      prompt: thing.ask,
      options,
      answer,
      optionLabels: options.map((o) => o.replace('°C', 'độ C')),
      hint: 'Em nghĩ đến vật đó ở ngoài đời, rồi so với 1 mm, 1 g, 1 ml hay 1 °C.',
      solution: `${thing.ask.replace(' bao nhiêu?', '')} ${thing.right}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const measureWork = {
  id: 'tinh-so-do',
  label: 'Tính với số đo',
  make(rand) {
    const unit = pick(rand, UNITS);
    const write = inUnit(unit);
    const shape = int(rand, 0, 3);
    if (shape === 0) {
      const a = int(rand, 10, 60) * 10;
      const b = int(rand, 5, 40) * 10;
      return {
        prompt: `${write(a)} + ${write(b)} = ?`,
        ...valueOptions(a + b, [a + b + 100, a + b - 10, a], write),
        hint: 'Em tính như với số, rồi viết thêm đơn vị.',
        solution: `${a} + ${b} = ${fmt(a + b)}. Vậy ${write(a)} + ${write(b)} = ${write(a + b)}.`,
      };
    }
    if (shape === 1) {
      const a = int(rand, 20, 99) * 10;
      const b = int(rand, 5, a / 10 - 1) * 10;
      return {
        prompt: `${write(a)} − ${write(b)} = ?`,
        ...valueOptions(a - b, [a + b, a - b + 100, b], write),
        hint: 'Em tính như với số, rồi viết thêm đơn vị.',
        solution: `${a} − ${b} = ${a - b}. Vậy ${write(a)} − ${write(b)} = ${write(a - b)}.`,
      };
    }
    if (shape === 2) {
      const k = int(rand, 2, 5);
      const a = int(rand, 2, Math.floor(100 / k)) * 10;
      return {
        prompt: `${write(a)} × ${k} = ?`,
        ...valueOptions(a * k, [a + k, a * k + 100, a * (k - 1)], write),
        hint: 'Em tính như với số, rồi viết thêm đơn vị.',
        solution: `${a} × ${k} = ${fmt(a * k)}. Vậy ${write(a)} × ${k} = ${write(a * k)}.`,
      };
    }
    const d = int(rand, 2, 6);
    const q = int(rand, 3, Math.floor(100 / d)) * 10;
    const n = q * d;
    return {
      prompt: `${write(n)} : ${d} = ?`,
      ...valueOptions(q, [n - d, q + 10, q * 2], write),
      hint: 'Em tính như với số, rồi viết thêm đơn vị.',
      solution: `${n} : ${d} = ${q}. Vậy ${write(n)} : ${d} = ${write(q)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const conversions = {
  id: 'doi-don-vi',
  label: 'Đổi đơn vị đo',
  make(rand) {
    const shape = int(rand, 0, 3);
    if (shape === 0) {
      const cm = int(rand, 1, 9);
      const mm = int(rand, 1, 9);
      const right = cm * 10 + mm;
      return {
        prompt: `${cm} cm ${mm} mm = ? mm`,
        ...valueOptions(right, [cm + mm, cm * 100 + mm, right + 10], inUnit('mm')),
        hint: '1 cm = 10 mm.',
        solution: `${cm} cm = ${cm * 10} mm. ${cm * 10} + ${mm} = ${right}. Vậy ${cm} cm ${mm} mm = ${right} mm.`,
      };
    }
    if (shape === 1) {
      const cm = int(rand, 2, 20);
      return {
        prompt: `${cm} cm = ? mm`,
        ...valueOptions(cm * 10, [cm, cm * 100, cm + 10], inUnit('mm')),
        hint: '1 cm = 10 mm.',
        solution: `${cm} × 10 = ${cm * 10}. Vậy ${cm} cm = ${cm * 10} mm.`,
      };
    }
    const fact = pick(rand, [
      { from: '1 kg', unit: 'g', right: 1000 },
      { from: '1 l', unit: 'ml', right: 1000 },
      { from: '1 m', unit: 'mm', right: 1000 },
    ]);
    return {
      prompt: `${fact.from} = ? ${fact.unit}`,
      ...valueOptions(fact.right, [10, 100, 500], inUnit(fact.unit)),
      hint: 'Em nhớ lại bảng đơn vị đo đã học.',
      solution: `${fact.from} = ${fmt(fact.right)} ${fact.unit}.`,
    };
  },
};

/**
 * Packets of noodles and a tin of milk.
 * @param {number} packet
 * @param {number} packets
 * @param {number} tin
 * @returns {ReviewQuestion}
 */
export function groceryStory(packet, packets, tin) {
  const total = packet * packets;
  const right = total + tin;
  return {
    prompt: `Mỗi gói mì tôm cân nặng ${packet} g, một hộp sữa cân nặng ${tin} g. Hỏi ${packets} gói mì tôm và 1 hộp sữa cân nặng bao nhiêu gam?`,
    ...valueOptions(right, [packet + tin, total, right + 10], inUnit('g')),
    hint: 'Em tính cân nặng các gói mì tôm trước, rồi cộng thêm hộp sữa.',
    solution: `${packet} × ${packets} = ${total} (g). ${total} + ${tin} = ${fmt(right)} (g).`,
  };
}

/**
 * A big barrel of fish sauce and several cans.
 * @param {number} barrel
 * @param {number} cans
 * @param {number} can
 * @returns {ReviewQuestion}
 */
export function sauceStory(barrel, cans, can) {
  const total = cans * can;
  const right = barrel + total;
  return {
    prompt: `Cửa hàng có 1 thùng ${barrel} l nước mắm và ${cans} can, mỗi can ${can} l. Cửa hàng có tất cả bao nhiêu lít nước mắm?`,
    ...valueOptions(right, [barrel + can, total, right + 10], inUnit('l')),
    hint: 'Em tính số lít ở các can trước, rồi cộng với thùng.',
    solution: `${cans} × ${can} = ${total} (l). ${barrel} + ${total} = ${right} (l).`,
  };
}

/** @type {ReviewSkill} */
export const measureStory = {
  id: 'bai-toan-do-luong',
  label: 'Bài toán đo lường',
  make(rand) {
    if (rand() < 0.5) {
      return groceryStory(pick(rand, [60, 70, 75, 80, 90]), int(rand, 2, 4), int(rand, 250, 455));
    }
    return sauceStory(pick(rand, [80, 100, 120]), int(rand, 3, 8), pick(rand, [5, 10]));
  },
};

/** The parts of the review of measures. */
export const MEASURE_SKILLS = [
  brokenLines,
  balances,
  measureWork,
  conversions,
  fitting,
  measureStory,
];
