/**
 * Review questions on measures: calculating with units, the pan balance,
 * taking enough water, length conversions, choosing a sensible measure, reading
 * clocks and calendars, being on time and word problems. Pure and DOM-free;
 * each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { resultOf } from '#lib/core/kid/column.js';
import { MASS_THINGS, fewestWeights } from '#lib/core/kid/mass.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { WEEKDAYS, daysIn, dayTitle, dialNumber, partOf, weekdayOf } from '#lib/core/kid/time.js';
import { draw100 } from './add-sub-skills.js';
import { unitOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */

const UNITS = /** @type {const} */ (['kg', 'l', 'km', 'm', 'dm', 'cm']);

/** @type {ReviewSkill} */
export const unitCalcSkill = {
  id: 'tinh-so-do',
  label: 'Tính với đơn vị đo',
  make(rand) {
    const unit = pick(rand, UNITS);
    const shape = rand();
    if (shape < 0.5) {
      const { a, b, op } = draw100(rand);
      const r = resultOf(a, b, op);
      const sign = op === '+' ? '+' : '−';
      return {
        prompt: `${a} ${unit} ${sign} ${b} ${unit} = ?`,
        ...unitOptions(rand, r, unit, [r + 10, r - 10], 100),
        hint: `Em tính ${a} ${sign} ${b}, rồi viết thêm đơn vị ${unit}.`,
        solution: `${a} ${unit} ${sign} ${b} ${unit} = ${r} ${unit}.`,
      };
    }
    const base = pick(rand, /** @type {const} */ ([2, 5]));
    const n = int(rand, 2, 10);
    const product = base * n;
    if (shape < 0.75) {
      return {
        prompt: `${base} ${unit} × ${n} = ?`,
        ...unitOptions(rand, product, unit, [base + n, product + base, product - base], 50),
        hint: `Em đọc lại bảng nhân ${base}, rồi viết thêm đơn vị ${unit}.`,
        solution: `${base} ${unit} × ${n} = ${product} ${unit}.`,
      };
    }
    return {
      prompt: `${product} ${unit} : ${base} = ?`,
      ...unitOptions(rand, n, unit, [n + 1, n - 1, n + 2], 20),
      hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${product}?`,
      solution: `${product} ${unit} : ${base} = ${n} ${unit}.`,
    };
  },
};

/**
 * Weights that add up to `kg`, as loads on a pan.
 * @param {number} kg
 * @returns {import('./visual.js').Load[]}
 */
const weightLoads = (kg) =>
  fewestWeights(kg).map((w) => /** @type {const} */ ({ kind: 'weight', kg: w }));

/** @type {ReviewSkill} */
export const balanceSkill = {
  id: 'can-dia',
  label: 'Đọc cân đĩa',
  make(rand) {
    const thing = pick(rand, MASS_THINGS);
    const kg = int(rand, thing.lo, thing.hi);
    /** @type {import('./visual.js').Load} */
    const load = { kind: 'thing', id: thing.id, kg };
    if (rand() < 0.5) {
      const right = weightLoads(kg);
      const sum = right.map((w) => w.kg).join(' + ');
      return {
        prompt: `Cân thăng bằng. ${capitalize(thing.name)} nặng mấy ki-lô-gam?`,
        visual: { type: 'balance', left: [load], right },
        ...unitOptions(rand, kg, 'kg', [kg + 1, kg - 1], 20, 1),
        hint: 'Cân thăng bằng thì hai đĩa nặng bằng nhau. Em cộng các quả cân.',
        solution:
          right.length > 1
            ? `${sum} = ${kg}. ${capitalize(thing.name)} nặng ${kg} kg.`
            : `Hai đĩa nặng bằng nhau. ${capitalize(thing.name)} nặng ${kg} kg.`,
      };
    }
    const extra = pick(rand, /** @type {const} */ ([1, 2]));
    const total = kg + extra;
    return {
      prompt: `Cân thăng bằng. ${capitalize(thing.name)} nặng mấy ki-lô-gam?`,
      visual: {
        type: 'balance',
        left: [load, { kind: 'weight', kg: extra }],
        right: weightLoads(total),
      },
      ...unitOptions(rand, kg, 'kg', [total, total + extra], 20, 1),
      hint: `Đĩa bên phải nặng bằng cả hai thứ ở đĩa bên trái. Em lấy số ki-lô-gam ở đĩa phải trừ đi quả cân ${extra} kg.`,
      solution: `Đĩa bên phải nặng ${total} kg. ${total} − ${extra} = ${kg}. ${capitalize(thing.name)} nặng ${kg} kg.`,
    };
  },
};

/**
 * Sets of cans; in each, no two pairs and no two triples hold the same litres,
 * so one choice of cans gives the amount asked for.
 */
const CAN_SETS = /** @type {const} */ ([
  [2, 3, 5, 10],
  [1, 2, 5, 10],
  [2, 4, 5, 10],
  [3, 4, 5, 10],
]);

/**
 * The ways to take `k` of the cans.
 * @param {readonly number[]} cans
 * @param {number} k
 * @returns {number[][]}
 */
export function canChoices(cans, k) {
  if (k === 2) return cans.flatMap((a, i) => cans.slice(i + 1).map((b) => [a, b]));
  return cans.map((_, skip) => cans.filter((_c, i) => i !== skip));
}

/** @param {readonly number[]} cans */
const canSum = (cans) => cans.reduce((s, n) => s + n, 0);

/** @param {readonly number[]} cans */
const canWords = (cans) => {
  const names = cans.map((n) => `can ${n} l`);
  return `${names.slice(0, -1).join(', ')} và ${names[names.length - 1]}`;
};

/** @type {ReviewSkill} */
export const cansSkill = {
  id: 'lay-can',
  label: 'Lấy đủ số lít',
  make(rand) {
    const set = pick(rand, CAN_SETS);
    const k = rand() < 0.7 ? 2 : 3;
    const choices = canChoices(set, k);
    const right = pick(rand, choices);
    const target = canSum(right);
    const name = pick(rand, ['Mai', 'Việt', 'Nam']);
    const wrong = shuffle(
      rand,
      choices.filter((c) => c !== right),
    ).slice(0, 3);
    return {
      prompt: `${name} cần lấy ${target} l nước. ${name} lấy ${k === 2 ? 'hai' : 'ba'} can nào?`,
      visual: { type: 'cans', litres: [...set] },
      ...mixOptions(
        rand,
        capitalize(canWords(right)),
        wrong.map((c) => capitalize(canWords(c))),
      ),
      hint: `Em cộng số lít của ${k === 2 ? 'hai' : 'ba'} can, rồi so với ${target} l.`,
      solution: `${right.join(' l + ')} l = ${target} l. ${name} lấy ${canWords(right)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const lengthUnitSkill = {
  id: 'doi-don-vi',
  label: 'Đổi đơn vị đo độ dài',
  make(rand) {
    const n = int(rand, 1, 9);
    const [from, to, have, want, why] = pick(rand, [
      ['dm', 'cm', n, n * 10, '1 dm = 10 cm'],
      ['m', 'dm', n, n * 10, '1 m = 10 dm'],
      ['m', 'cm', n, n * 100, '1 m = 100 cm'],
      ['km', 'm', 1, 1000, '1 km = 1000 m'],
      ['cm', 'dm', n * 10, n, '10 cm = 1 dm'],
      ['cm', 'm', n * 100, n, '100 cm = 1 m'],
    ]);
    const small = Math.min(have, want);
    const values = [small, small * 10, small * 100, small * 1000].filter((v) => v <= 1000);
    const worked = `${have} ${from} = ${want} ${to}`;
    return {
      prompt: `${have} ${from} = ? ${to}`,
      options: values.map(String),
      answer: values.indexOf(want),
      hint: worked === why ? 'Em nhớ lại: đơn vị lớn bằng bao nhiêu đơn vị bé?' : `Em nhớ: ${why}.`,
      solution: worked === why ? `${why}.` : `${why}, nên ${worked}.`,
    };
  },
};

/**
 * Things with a measure that fits; the other units make it plainly too big or
 * too small.
 * @type {ReadonlyArray<{ q: string, n: number, unit: string, others: readonly string[] }>}
 */
const FITTING = [
  { q: 'Cột cờ của trường cao khoảng bao nhiêu?', n: 8, unit: 'm', others: ['cm', 'dm', 'km'] },
  { q: 'Cái gọt bút chì dài khoảng bao nhiêu?', n: 5, unit: 'cm', others: ['dm', 'm', 'km'] },
  {
    q: 'Đường từ nhà đến trường dài khoảng bao nhiêu?',
    n: 5,
    unit: 'km',
    others: ['cm', 'dm', 'm'],
  },
  { q: 'Cạnh bàn học của em dài khoảng bao nhiêu?', n: 5, unit: 'dm', others: ['cm', 'm', 'km'] },
  { q: 'Cái bút chì dài khoảng bao nhiêu?', n: 15, unit: 'cm', others: ['dm', 'm', 'km'] },
  { q: 'Cửa lớp học cao khoảng bao nhiêu?', n: 2, unit: 'm', others: ['cm', 'dm', 'km'] },
  { q: 'Bao gạo nặng khoảng bao nhiêu?', n: 10, unit: 'kg', others: ['cm', 'm', 'km'] },
  { q: 'Cái can đựng được khoảng bao nhiêu nước?', n: 10, unit: 'l', others: ['cm', 'm', 'km'] },
];

/** @type {ReviewSkill} */
export const fittingSkill = {
  id: 'chon-so-do',
  label: 'Chọn số đo phù hợp',
  make(rand) {
    const t = pick(rand, FITTING);
    return {
      prompt: t.q,
      ...mixOptions(
        rand,
        `${t.n} ${t.unit}`,
        t.others.map((u) => `${t.n} ${u}`),
      ),
      hint: 'Em hình dung vật đó ở ngoài đời, rồi nghĩ xem đơn vị nào hợp.',
      solution: `Số đo phù hợp là ${t.n} ${t.unit}.`,
    };
  },
};

/**
 * A time as the book writes it: '7 giờ 15 phút', '7 giờ'.
 * @param {number} minutes since 0:00, up to 12 giờ 59 phút on the dial
 */
export function clockWords(minutes) {
  const h = dialNumber(Math.floor(minutes / 60));
  const m = minutes % 60;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/** @type {ReviewSkill} */
export const clockSkill = {
  id: 'dong-ho',
  label: 'Xem đồng hồ',
  make(rand) {
    const hour = int(rand, 1, 12);
    const m = pick(rand, /** @type {const} */ ([0, 15, 30]));
    const minutes = hour * 60 + m;
    const next = hour * 60 + 60 + m;
    const otherM = m === 15 ? 30 : 15;
    return {
      prompt: 'Đồng hồ chỉ mấy giờ?',
      visual: { type: 'clock', minutes },
      ...mixOptions(rand, clockWords(minutes), [
        clockWords(next),
        clockWords(hour * 60 + otherM),
        clockWords(hour * 60 + (m === 0 ? 30 : 0)),
      ]),
      hint:
        m === 0
          ? 'Kim dài chỉ số 12 là giờ đúng. Kim ngắn chỉ số nào?'
          : 'Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút. Kim ngắn vừa đi qua số nào?',
      solution: `Đồng hồ chỉ ${clockWords(minutes)}.`,
    };
  },
};

/**
 * An hour after noon the way people say it: '8 giờ tối'.
 * @param {number} hour 13 to 23
 */
const dayPartWords = (hour) => `${hour - 12} giờ ${partOf(hour * 60)}`;

/** @type {ReviewSkill} */
export const dayHourSkill = {
  id: 'gio-chieu',
  label: 'Giờ buổi chiều, buổi tối',
  make(rand) {
    const hour = int(rand, 13, 23);
    const part = partOf(hour * 60);
    const asDial = rand() < 0.5;
    if (asDial) {
      const wrong = [hour - 10, hour - 11, hour - 13]
        .filter((h) => h >= 1 && h <= 12)
        .map((h) => `${h} giờ ${part}`);
      return {
        prompt: `${hour} giờ còn gọi là mấy giờ?`,
        ...mixOptions(rand, dayPartWords(hour), wrong),
        hint: 'Sau 12 giờ trưa, em lấy số giờ trừ đi 12.',
        solution: `${hour} − 12 = ${hour - 12}. ${hour} giờ còn gọi là ${dayPartWords(hour)}.`,
      };
    }
    const others = [hour - 1, hour + 1, hour + 2].filter((h) => h <= 24);
    return {
      prompt: `${dayPartWords(hour)} còn gọi là mấy giờ?`,
      ...mixOptions(
        rand,
        `${hour} giờ`,
        others.map((h) => `${h} giờ`),
      ),
      hint: 'Em lấy số giờ cộng với 12.',
      solution: `${hour - 12} + 12 = ${hour}. ${dayPartWords(hour)} còn gọi là ${hour} giờ.`,
    };
  },
};

/**
 * Date options in increasing order: the right one and up to three slips that
 * are dates of the month.
 * @param {number} right
 * @param {number[]} slips
 * @param {number} month
 */
function dateOptions(right, slips, month) {
  const fits = (/** @type {number} */ d) => d !== right && d >= 1 && d <= daysIn(month);
  const values = [right, ...[...new Set(slips)].filter(fits).slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/** @type {ReviewSkill} */
export const calendarSkill = {
  id: 'xem-lich',
  label: 'Xem lịch',
  make(rand) {
    const month = int(rand, 1, 12);
    const date = int(rand, 8, daysIn(month) - 7);
    const day = weekdayOf(month, date);
    /** @type {import('./visual.js').Visual} */
    const visual = { type: 'month', month, marks: [date] };
    const kind = rand();
    if (kind < 0.4) {
      const titles = [0, 1, -1, 2].map((d) => dayTitle(day + d));
      return {
        prompt: `Ngày ${date} tháng ${month} là thứ mấy?`,
        visual,
        ...mixOptions(rand, titles[0], titles.slice(1)),
        hint: 'Em tìm ngày đó trên tờ lịch, rồi nhìn lên đầu cột.',
        solution: `Ngày ${date} nằm ở cột ${WEEKDAYS[day]}.`,
      };
    }
    const later = kind < 0.7;
    const right = later ? date + 7 : date - 7;
    const name = WEEKDAYS[day];
    return {
      prompt: `Hôm nay là ${name}, ngày ${date} tháng ${month}. ${dayTitle(day)} tuần ${later ? 'sau' : 'trước'} là ngày mấy?`,
      visual,
      ...dateOptions(right, [date, later ? date + 1 : date - 1, right + 1, right - 1], month),
      hint: `Một tuần có 7 ngày. Em đi ${later ? 'xuống' : 'lên'} một hàng trong cùng cột.`,
      solution: `${later ? `${date} + 7` : `${date} − 7`} = ${right}. ${dayTitle(day)} tuần ${later ? 'sau' : 'trước'} là ngày ${right}.`,
    };
  },
};

/**
 * School start times with an arrival before and after; every time has its
 * long hand on 12, 3 or 6, the ones grade 2 reads.
 * @type {ReadonlyArray<{ bell: number, gap: number }>}
 */
const BELLS = [
  { bell: 7 * 60 + 15, gap: 15 },
  { bell: 8 * 60 + 15, gap: 15 },
  { bell: 7 * 60, gap: 30 },
  { bell: 7 * 60 + 30, gap: 30 },
  { bell: 8 * 60, gap: 30 },
];

/** @type {ReviewSkill} */
export const onTimeSkill = {
  id: 'dung-gio',
  label: 'Sớm, muộn, đúng giờ',
  make(rand) {
    const { bell, gap } = pick(rand, BELLS);
    const names = shuffle(rand, ['Sóc', 'Rùa', 'Thỏ']);
    const [early, onTime, late] = names;
    const clocks = [
      { name: early, minutes: bell - gap },
      { name: onTime, minutes: bell },
      { name: late, minutes: bell + gap },
    ].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    const [word, who, why] = pick(rand, [
      ['muộn', late, 'sau giờ vào học'],
      ['sớm', early, 'trước giờ vào học'],
      ['đúng giờ', onTime, 'đúng giờ vào học'],
    ]);
    const at = clocks.find((c) => c.name === who)?.minutes ?? bell;
    return {
      prompt: `Giờ vào học là ${clockWords(bell)}. Bạn nào đến ${word}?`,
      visual: { type: 'clocks', clocks },
      ...mixOptions(
        rand,
        who,
        names.filter((n) => n !== who),
      ),
      hint: `Em đọc giờ trên từng đồng hồ, rồi so với ${clockWords(bell)}.`,
      solution: `${who} đến lúc ${clockWords(at)}, ${why}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const measureStorySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make(rand) {
    const story = pick(rand, ['voi', 'nhan-l', 'nhan-kg', 'chia', 'dau', 'duong']);
    if (story === 'voi') {
      const a = int(rand, 2, 8) * 100;
      const b = int(rand, 1, 10 - a / 100) * 100;
      return {
        prompt: `Số đá nặng bằng chú voi con gồm hai phần: ${a} kg và ${b} kg. Chú voi con nặng bao nhiêu ki-lô-gam?`,
        ...unitOptions(rand, a + b, 'kg', [a + b + 100, a + b - 100]),
        hint: 'Chú voi con nặng bằng cả hai phần đá. Em làm phép cộng.',
        solution: `Chú voi con nặng là: ${a} + ${b} = ${a + b} (kg).`,
      };
    }
    if (story === 'nhan-l' || story === 'nhan-kg') {
      const n = int(rand, 2, 10);
      const [each, unit, text] =
        story === 'nhan-l'
          ? [
              2,
              'l',
              `Bà Năm mua ${n} chai nước mắm, mỗi chai 2 l. Bà Năm mua bao nhiêu lít nước mắm?`,
            ]
          : [5, 'kg', `Mẹ mua ${n} túi gạo, mỗi túi 5 kg. Mẹ mua bao nhiêu ki-lô-gam gạo?`];
      return {
        prompt: text,
        ...unitOptions(rand, each * n, unit, [each + n, each * n + each, each * n - each], 60),
        hint: `${each} ${unit} được lấy ${n} lần. Em làm phép nhân.`,
        solution: `Số ${unit === 'l' ? 'lít nước mắm' : 'ki-lô-gam gạo'} là: ${each} × ${n} = ${each * n} (${unit}).`,
      };
    }
    if (story === 'chia') {
      const each = pick(rand, /** @type {const} */ ([2, 5]));
      const n = int(rand, 2, 10);
      return {
        prompt: `Có ${each * n} l nước mắm chia đều vào các can, mỗi can ${each} l. Có bao nhiêu can nước mắm?`,
        ...unitOptions(rand, n, 'can', [n + 1, n - 1, n + 2], 20),
        hint: 'Chia đều vào các can, mỗi can bằng nhau. Em làm phép chia.',
        solution: `Số can nước mắm là: ${each * n} : ${each} = ${n} (can).`,
      };
    }
    const { a, b, op } = draw100(rand);
    const r = resultOf(a, b, op);
    const unit = story === 'dau' ? 'l' : op === '+' ? 'km' : 'm';
    if (op === '+') {
      const [x, y] = [Math.max(a, b), Math.min(a, b)];
      return {
        prompt:
          story === 'dau'
            ? `Thùng có ${x} l dầu. Người ta đổ thêm ${y} l dầu. Thùng có tất cả bao nhiêu lít dầu?`
            : `Con đường có đoạn đầu dài ${x} km, đoạn sau dài ${y} km. Con đường dài bao nhiêu ki-lô-mét?`,
        ...unitOptions(rand, r, unit, [r + 10, r - 10], 100),
        hint: 'Em gộp hai số lại, làm phép cộng.',
        solution: `${story === 'dau' ? 'Thùng có tất cả số lít dầu' : 'Con đường dài'} là: ${x} + ${y} = ${r} (${unit}).`,
      };
    }
    return {
      prompt:
        story === 'dau'
          ? `Thùng có ${a} l dầu. Người ta lấy ra ${b} l dầu. Thùng còn lại bao nhiêu lít dầu?`
          : `Sợi dây dài ${a} m. Người ta cắt đi ${b} m. Sợi dây còn lại dài bao nhiêu mét?`,
      ...unitOptions(rand, r, unit, [r + 10, r - 10], 100),
      hint: 'Phần còn lại ít đi. Em làm phép trừ.',
      solution: `${story === 'dau' ? 'Thùng còn lại số lít dầu' : 'Sợi dây còn lại dài'} là: ${a} − ${b} = ${r} (${unit}).`,
    };
  },
};

/** The parts of the review of measures. */
export const MEASURE_SKILLS = [
  unitCalcSkill,
  balanceSkill,
  cansSkill,
  lengthUnitSkill,
  fittingSkill,
  clockSkill,
  dayHourSkill,
  calendarSkill,
  onTimeSkill,
  measureStorySkill,
];
