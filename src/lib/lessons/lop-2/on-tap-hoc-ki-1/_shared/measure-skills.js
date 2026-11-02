/**
 * Review questions on kilograms and litres: which pan is heavier, reading a
 * level balance, sums in kg and l, which two goats a boat can carry, counting
 * the 1 l mugs a container fills, which three cans a tank fills, and word
 * problems. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { exprText } from '#lib/core/kid/column.js';
import { fewestWeights } from '#lib/core/kid/mass.js';
import { int, partition, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { anyCarry, makeCarry, resultOf, unitOptions } from './arith-skills.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').Load} Load */

/** Toys the book weighs against each other. */
const TOYS = /** @type {const} */ (['gấu bông', 'thỏ bông', 'sóc bông', 'mèo bông']);

/** Things to weigh against weights, with the whole kilograms each may weigh. */
const GOODS = /** @type {const} */ ([
  { name: 'túi cam', lo: 3, hi: 5 },
  { name: 'quả dưa hấu', lo: 3, hi: 6 },
  { name: 'quả bí ngô', lo: 3, hi: 7 },
  { name: 'thùng sách', lo: 4, hi: 10 },
  { name: 'bao gạo', lo: 5, hi: 10 },
]);

/**
 * A thing on a pan, its mass known only to the drawing.
 * @param {string} name
 * @param {number} kg
 * @returns {Load}
 */
function thing(name, kg) {
  return { kind: 'thing', name, kg };
}

/** @type {ReviewSkill} */
export const heavierSkill = {
  id: 'nang-nhe',
  label: 'Nặng hơn, nhẹ hơn',
  make(rand) {
    const [a, b, c] = shuffle(rand, [...TOYS]);
    const hint = 'Đĩa nào thấp hơn thì vật trên đĩa đó nặng hơn.';
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const swap = rand() < 0.5;
      const lighter = rand() < 0.5;
      const pan = swap ? [thing(b, 2), thing(a, 5)] : [thing(a, 5), thing(b, 2)];
      return {
        prompt: `Nhìn cân đĩa. Con nào ${lighter ? 'nhẹ hơn' : 'nặng hơn'}?`,
        visual: { type: 'scales', scales: [{ left: [pan[0]], right: [pan[1]] }] },
        ...mixOptions(rand, capitalize(lighter ? b : a), [capitalize(lighter ? a : b)]),
        hint,
        solution: `Đĩa có ${a} thấp hơn. ${capitalize(a)} nặng hơn ${b}, ${b} nhẹ hơn ${a}.`,
      };
    }
    // Heaviest first: a > b > c, so two balances settle all three.
    const scales = [
      { left: [thing(a, 6)], right: [thing(b, 4)] },
      { left: [thing(c, 2)], right: [thing(b, 4)] },
    ];
    const reason = `${capitalize(a)} nặng hơn ${b}, ${b} nặng hơn ${c}.`;
    if (variant === 1) {
      const heaviest = rand() < 0.5;
      const right = heaviest ? a : c;
      return {
        prompt: `Nhìn hai cân đĩa. Con nào ${heaviest ? 'nặng nhất' : 'nhẹ nhất'}?`,
        visual: { type: 'scales', scales },
        ...mixOptions(
          rand,
          capitalize(right),
          [a, b, c].filter((x) => x !== right).map(capitalize),
        ),
        hint,
        solution: `${reason} Vậy ${right} ${heaviest ? 'nặng nhất' : 'nhẹ nhất'}.`,
      };
    }
    const claims = [
      { text: `${capitalize(a)} nặng hơn ${c}.`, ok: true },
      { text: `${capitalize(c)} nhẹ hơn ${b}.`, ok: true },
      { text: `${capitalize(b)} nhẹ hơn ${c}.`, ok: false },
      { text: `${capitalize(c)} nặng hơn ${a}.`, ok: false },
    ];
    const claim = pick(rand, claims);
    return {
      prompt: `Nhìn hai cân đĩa. ${claim.text} Đúng hay sai?`,
      visual: { type: 'scales', scales },
      options: ['Đúng', 'Sai'],
      answer: claim.ok ? 0 : 1,
      hint,
      solution: `${reason} Câu này ${claim.ok ? 'đúng' : 'sai'}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const readScaleSkill = {
  id: 'doc-can',
  label: 'Đọc cân đĩa',
  make(rand) {
    const { name, lo, hi } = pick(rand, GOODS);
    const kg = int(rand, lo, hi);
    const weights = fewestWeights(kg);
    const sum = weights.length > 1 ? `${weights.join(' + ')} = ${kg} (kg)` : `${kg} kg`;
    return {
      prompt: `Cân thăng bằng. ${capitalize(name)} nặng mấy ki-lô-gam?`,
      visual: {
        type: 'scales',
        scales: [
          {
            left: [thing(name, kg)],
            right: weights.map((w) => /** @type {Load} */ ({ kind: 'weight', kg: w })),
          },
        ],
      },
      ...unitOptions(rand, kg, 'kg', [kg - 1, kg + 1, weights[0]], 20),
      hint: 'Cân thăng bằng thì vật nặng bằng tất cả quả cân ở đĩa kia cộng lại.',
      solution: `Các quả cân nặng: ${sum}. ${capitalize(name)} nặng ${kg} kg.`,
    };
  },
};

/**
 * A carrying sum or difference written with a unit.
 * @param {() => number} rand
 * @param {string} unit 'kg' or 'l'
 */
function unitSum(rand, unit) {
  const { a, b, op } = anyCarry(rand);
  const c = resultOf(a, b, op);
  const shown = `${a} ${unit} ${op === '+' ? '+' : MINUS} ${b} ${unit}`;
  return {
    prompt: `${shown} = ?`,
    ...unitOptions(rand, c, unit, [op === '+' ? c - 10 : c + 10]),
    hint: `Em tính như với các số, rồi viết ${unit} sau kết quả. Đừng quên nhớ 1.`,
    solution: `${exprText(a, b, op)} = ${c}, nên ${shown} = ${c} ${unit}.`,
  };
}

/** @type {ReviewSkill} */
export const kgSumSkill = {
  id: 'tinh-kg',
  label: 'Tính với ki-lô-gam',
  make: (rand) => unitSum(rand, 'kg'),
};

/** @type {ReviewSkill} */
export const boatSkill = {
  id: 'cho-thuyen',
  label: 'Chọn hai con dê qua sông',
  make(rand) {
    const p = int(rand, 11, 18);
    const q = p + int(rand, 1, 3);
    const r = q + int(rand, 1, 4);
    const most = int(rand, p + q, p + r - 1);
    /** @param {number} u @param {number} v */
    const pair = (u, v) => `Dê ${u} kg và dê ${v} kg`;
    return {
      prompt: `Ba con dê nặng ${p} kg, ${q} kg và ${r} kg muốn qua sông. Thuyền chở được nhiều nhất ${most} kg. Hai con dê nào qua sông cùng nhau được?`,
      ...mixOptions(rand, pair(p, q), [pair(p, r), pair(q, r)]),
      hint: `Em cộng số ki-lô-gam của từng cặp dê, rồi so sánh với ${most} kg.`,
      solution: `${p} + ${q} = ${p + q} (kg), không quá ${most} kg. ${p} + ${r} = ${p + r} (kg) và ${q} + ${r} = ${q + r} (kg) đều quá ${most} kg.`,
    };
  },
};

/** @type {ReviewSkill} */
export const countLitresSkill = {
  id: 'doc-lit',
  label: 'Đếm số lít',
  make(rand) {
    const a = int(rand, 3, 9);
    if (rand() < 0.5) {
      return {
        prompt:
          'Rót hết nước trong bình A vào các ca 1 l, được đầy các ca như hình. Bình A chứa mấy lít nước?',
        visual: { type: 'cups', groups: [{ name: 'Bình A', n: a }] },
        ...unitOptions(rand, a, 'l', [a + 1, a - 1], 20),
        hint: 'Mỗi ca đầy là 1 l. Em đếm số ca đầy nước.',
        solution: `Có ${a} ca đầy, mỗi ca 1 l. Bình A chứa ${a} l nước.`,
      };
    }
    const b = int(rand, 3, 9);
    return {
      prompt:
        'Rót hết nước của hai bình vào các ca 1 l, được như hình. Cả hai bình chứa mấy lít nước?',
      visual: {
        type: 'cups',
        groups: [
          { name: 'Bình A', n: a },
          { name: 'Bình B', n: b },
        ],
      },
      ...unitOptions(rand, a + b, 'l', [a, b, Math.abs(a - b)], 20),
      hint: 'Em đếm số ca của mỗi bình, rồi cộng lại.',
      solution: `Bình A chứa ${a} l, bình B chứa ${b} l. Cả hai bình chứa: ${a} + ${b} = ${a + b} (l).`,
    };
  },
};

/** @type {ReviewSkill} */
export const litreSumSkill = {
  id: 'tinh-lit',
  label: 'Tính với lít',
  make(rand) {
    if (rand() < 0.6) return unitSum(rand, 'l');
    const add = rand() < 0.5;
    const a = add ? int(rand, 10, 40) : int(rand, 20, 60);
    const b = int(rand, 3, 9);
    const c = add ? int(rand, 10, 40) : int(rand, 10, 30);
    const mid = add ? a + b : a - b;
    const end = mid + c;
    const sign = add ? '+' : MINUS;
    const shown = `${a} l ${sign} ${b} l + ${c} l`;
    return {
      prompt: `${shown} = ?`,
      ...unitOptions(rand, end, 'l', add ? [end - 10] : [a + b + c, end + 10]),
      hint: 'Em tính lần lượt từ trái sang phải.',
      solution: `${a} ${sign} ${b} = ${mid}, ${mid} + ${c} = ${end}. Vậy ${shown} = ${end} l.`,
    };
  },
};

/**
 * Three can sizes in one sentence.
 * @param {readonly number[]} cans
 */
function cansText(cans) {
  return `Can ${cans[0]} l, can ${cans[1]} l, can ${cans[2]} l`;
}

/** @type {ReviewSkill} */
export const threeCansSkill = {
  id: 'ba-can',
  label: 'Rót đầy ba can',
  make(rand) {
    const tank = int(rand, 10, 20);
    const cans = partition(rand, tank, 3);
    const more = [
      [cans[0] + int(rand, 1, 4), cans[1], cans[2]],
      [cans[0], cans[1] + int(rand, 1, 4), cans[2]],
    ];
    return {
      prompt: `Trong thùng có ${tank} l nước. Rót hết nước vào ba can thì cả ba can vừa đầy. Đó là ba can nào?`,
      ...mixOptions(rand, cansText(cans), more.map(cansText)),
      hint: `Em cộng số lít của ba can. Tổng phải bằng ${tank} l.`,
      solution: `${cans.join(' + ')} = ${tank} (l), vừa bằng số nước trong thùng. Hai cách còn lại cần nhiều hơn ${tank} l.`,
    };
  },
};

/** Word problems in kg and l, in the book's shapes. */
const STORIES = [
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'add-two');
    return {
      prompt: `Con lợn nặng ${a} kg. Sau một thời gian, lợn tăng thêm ${b} kg. Hỏi lúc này con lợn nặng bao nhiêu ki-lô-gam?`,
      ...unitOptions(rand, a + b, 'kg', [a + b - 10]),
      hint: 'Tăng thêm thì em làm phép cộng.',
      solution: `Con lợn nặng là: ${a} + ${b} = ${a + b} (kg). Đáp số: ${a + b} kg.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'add-one');
    return {
      prompt: `Cửa hàng có ${a} thùng nước mắm, nhập thêm ${b} thùng. Hỏi cửa hàng có tất cả bao nhiêu thùng nước mắm?`,
      ...unitOptions(rand, a + b, 'thùng', [a + b - 10]),
      hint: 'Nhập thêm thì em làm phép cộng.',
      solution: `Cửa hàng có tất cả số thùng nước mắm là: ${a} + ${b} = ${a + b} (thùng). Đáp số: ${a + b} thùng.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'sub-two');
    return {
      prompt: `Bể có ${a} l nước. Người ta đã dùng ${b} l nước. Hỏi bể còn lại bao nhiêu lít nước?`,
      ...unitOptions(rand, a - b, 'l', [a - b + 10]),
      hint: 'Đã dùng là bớt đi, em làm phép trừ.',
      solution: `Bể còn lại số lít nước là: ${a} ${MINUS} ${b} = ${a - b} (l). Đáp số: ${a - b} l.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const each = int(rand, 2, 3);
    const can = int(rand, 8, 15);
    const left = can - each - each;
    return {
      prompt: `Can có ${can} l nước. Bạn rót ra hai ca, mỗi ca ${each} l. Hỏi can còn lại bao nhiêu lít nước?`,
      ...unitOptions(rand, left, 'l', [can - each, left + 1], 20),
      hint: 'Rót ra hai ca nên em trừ hai lần.',
      solution: `Can còn lại: ${can} ${MINUS} ${each} ${MINUS} ${each} = ${left} (l). Đáp số: ${left} l.`,
    };
  },
];

/**
 * A word problem in kg or l.
 * @param {() => number} rand
 */
export function measureStory(rand) {
  return pick(rand, STORIES)(rand);
}

/** @type {ReviewSkill} */
export const measureStorySkill = {
  id: 'bai-toan-do',
  label: 'Giải bài toán về kg và l',
  make: measureStory,
};

/** The parts of the review of measures. */
export const MEASURE_SKILLS = [
  heavierSkill,
  readScaleSkill,
  kgSumSkill,
  boatSkill,
  countLitresSkill,
  litreSumSkill,
  threeCansSkill,
  measureStorySkill,
];
