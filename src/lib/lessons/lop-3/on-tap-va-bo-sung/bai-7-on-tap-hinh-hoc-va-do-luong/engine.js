/**
 * The adaptive review of geometry and measures: solids, three collinear
 * points, the length of a broken line, counting quadrilaterals, kilograms,
 * litres, reading clocks, the calendar and word problems. Pure and DOM-free;
 * each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { MASS_THINGS, fewestWeights } from '#lib/core/kid/mass.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { WEEKDAYS, dayAfter, dayClockText, dayTitle, partText } from '#lib/core/kid/time.js';
import { nearOptions, unitOptions } from '../_shared/options.js';
import { divLine, mulLine } from '../_shared/times.js';

/** @typedef {'tru' | 'cau' | 'hop-chu-nhat' | 'lap-phuong'} SolidKind */
/** @typedef {import('#lib/core/kid/mass.js').Load} Load */
/** @typedef {import('#lib/core/kid/shapes.js').ShapeKind} ShapeKind */

/**
 * What a question draws.
 * @typedef {(
 *   | { type: 'solid', kind: SolidKind }
 *   | { type: 'pattern', row: SolidKind[], next: SolidKind }
 *   | { type: 'points' }
 *   | { type: 'broken', lengths: number[] }
 *   | { type: 'strip', cells: number }
 *   | { type: 'shapes', shapes: { kind: ShapeKind, turn: number }[] }
 *   | { type: 'balance', left: Load[], right: Load[] }
 *   | { type: 'cans', litres: number[] }
 *   | { type: 'clock', minutes: number }
 * )} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

/** Every solid, the book's names. */
export const SOLID_NAMES = /** @type {const} */ ({
  tru: 'khối trụ',
  cau: 'khối cầu',
  'hop-chu-nhat': 'khối hộp chữ nhật',
  'lap-phuong': 'khối lập phương',
});

const SOLID_KINDS = /** @type {const} */ (['tru', 'cau', 'hop-chu-nhat', 'lap-phuong']);

/** What a screen reader hears for a solid, without its name. */
export const SOLID_LOOKS = /** @type {const} */ ({
  tru: 'thân tròn, hai đầu là hai mặt tròn',
  cau: 'tròn đều về mọi phía',
  'hop-chu-nhat': 'có sáu mặt là hình chữ nhật',
  'lap-phuong': 'có sáu mặt vuông bằng nhau',
});

/**
 * Everyday things and the solid each one has the form of.
 * @type {ReadonlyArray<{ name: string, kind: SolidKind }>}
 */
export const THINGS = [
  { name: 'Robot hút bụi', kind: 'tru' },
  { name: 'Lon nước ngọt', kind: 'tru' },
  { name: 'Quả địa cầu', kind: 'cau' },
  { name: 'Quả bóng', kind: 'cau' },
  { name: 'Bể cá', kind: 'hop-chu-nhat' },
  { name: 'Hộp sữa', kind: 'hop-chu-nhat' },
  { name: 'Khối Rubik', kind: 'lap-phuong' },
  { name: 'Con xúc xắc', kind: 'lap-phuong' },
];

/** The repeating rows of solids and what comes next, as positions into the chosen solids. */
const PATTERNS = /** @type {const} */ ([
  { row: [0, 1, 0, 1, 0, 1], next: 0 },
  { row: [0, 1, 2, 0, 1, 2, 0, 1], next: 2 },
  { row: [0, 0, 1, 0, 0, 1, 0, 0], next: 1 },
]);

/**
 * The name of each solid as options, with `right` the answer.
 * @param {() => number} rand
 * @param {SolidKind} right
 */
function solidOptions(rand, right) {
  return mixOptions(
    rand,
    capitalize(SOLID_NAMES[right]),
    SOLID_KINDS.filter((k) => k !== right).map((k) => capitalize(SOLID_NAMES[k])),
  );
}

/** @type {ReviewSkill} */
const solidSkill = {
  id: 'khoi-hinh',
  label: 'Khối hình',
  make(rand) {
    const shape = rand();
    if (shape < 0.35) {
      const thing = pick(rand, THINGS);
      return {
        prompt: `${thing.name} có dạng khối gì?`,
        ...solidOptions(rand, thing.kind),
        hint: 'Em nghĩ xem vật đó tròn đều, có hai mặt tròn, hay có các mặt phẳng.',
        solution: `${thing.name} có dạng ${SOLID_NAMES[thing.kind]}.`,
      };
    }
    if (shape < 0.65) {
      const kind = pick(rand, SOLID_KINDS);
      return {
        prompt: 'Đây là khối gì?',
        visual: { type: 'solid', kind },
        ...solidOptions(rand, kind),
        hint: 'Em nhìn các mặt của khối.',
        solution: `Đây là ${SOLID_NAMES[kind]}.`,
      };
    }
    const pattern = pick(rand, PATTERNS);
    const kinds = shuffle(rand, SOLID_KINDS);
    const row = pattern.row.map((at) => kinds[at]);
    const next = kinds[pattern.next];
    return {
      prompt: 'Các khối xếp theo quy luật. Khối tiếp theo là khối gì?',
      visual: { type: 'pattern', row, next },
      ...solidOptions(rand, next),
      hint: 'Em tìm nhóm khối được lặp lại.',
      solution: `Các khối lặp lại theo nhóm. Khối tiếp theo là ${SOLID_NAMES[next]}.`,
    };
  },
};

/** The drawing of `points`: a triangle with N and M the midpoints of two sides, O where BM meets CN. */
export const POINTS = /** @type {const} */ ({
  A: { x: 150, y: 24 },
  B: { x: 50, y: 164 },
  C: { x: 250, y: 164 },
  N: { x: 100, y: 94 },
  M: { x: 200, y: 94 },
  O: { x: 150, y: 117.33 },
});

/** Three points on one line in that drawing. */
export const COLLINEAR = /** @type {const} */ (['A, N, B', 'A, M, C', 'N, O, C', 'M, O, B']);

/** Three points not on one line in that drawing. */
export const NOT_COLLINEAR = /** @type {const} */ ([
  'A, N, M',
  'N, O, M',
  'B, O, C',
  'A, O, B',
  'A, B, C',
  'N, M, C',
]);

/** @type {ReviewSkill} */
const collinearSkill = {
  id: 'thang-hang',
  label: 'Ba điểm thẳng hàng',
  make(rand) {
    const right = pick(rand, COLLINEAR);
    return {
      prompt: 'Ba điểm nào thẳng hàng?',
      visual: { type: 'points' },
      ...mixOptions(rand, right, shuffle(rand, NOT_COLLINEAR).slice(0, 3)),
      hint: 'Ba điểm thẳng hàng cùng nằm trên một đường thẳng. Em dùng thước để kiểm tra.',
      solution: `Ba điểm ${right} cùng nằm trên một đường thẳng.`,
    };
  },
};

/** @type {ReviewSkill} */
const brokenLineSkill = {
  id: 'gap-khuc',
  label: 'Độ dài đường gấp khúc',
  make(rand) {
    if (rand() < 0.3) {
      const base = pick(rand, /** @type {const} */ ([2, 3, 4, 5]));
      const n = int(rand, 3, 5);
      const right = base * n;
      return {
        prompt: 'Các đoạn dài bằng nhau. Đường gấp khúc dài bao nhiêu xăng-ti-mét?',
        visual: { type: 'broken', lengths: Array.from({ length: n }, () => base) },
        ...unitOptions(rand, right, 'cm', [base + n, base * (n + 1), base * (n - 1)], 100, 1),
        hint: 'Em cộng độ dài các đoạn, hoặc lấy độ dài một đoạn nhân với số đoạn.',
        solution: `${mulLine(base, n)} (cm).`,
      };
    }
    for (;;) {
      const a = int(rand, 1, 4) * 100 + int(rand, 1, 9) * 10 + (rand() < 0.5 ? 5 : 0);
      const b = int(rand, 1, 4) * 100 + int(rand, 1, 9) * 10;
      const c = int(rand, 1, 3) * 100;
      const right = a + b + c;
      if (right >= 1000) continue;
      return {
        prompt: 'Đường gấp khúc ABCD dài bao nhiêu xăng-ti-mét?',
        visual: { type: 'broken', lengths: [a, b, c] },
        ...unitOptions(rand, right, 'cm', [a + b, b + c, right + 100], 1000, 1),
        hint: 'Em cộng độ dài cả ba đoạn thẳng.',
        solution: `${a} + ${b} + ${c} = ${right} (cm).`,
      };
    }
  },
};

/**
 * How many rectangles a row of `cells` cells holds, counting the ones made of
 * several cells side by side.
 * @param {number} cells
 */
export function stripCount(cells) {
  return (cells * (cells + 1)) / 2;
}

/** @type {readonly ShapeKind[]} */
const QUADS = ['vuong', 'chu-nhat'];

/** @type {ReviewSkill} */
const quadSkill = {
  id: 'tu-giac',
  label: 'Đếm hình tứ giác',
  make(rand) {
    if (rand() < 0.5) {
      const cells = int(rand, 2, 4);
      const right = stripCount(cells);
      return {
        prompt: 'Trong hình có bao nhiêu hình tứ giác?',
        visual: { type: 'strip', cells },
        ...nearOptions(rand, right, [cells, cells + 1], 20, 1),
        hint: 'Em đếm hình 1 ô, rồi hình ghép 2 ô, rồi hình ghép nhiều ô hơn.',
        solution: `Em đếm từng loại: ${Array.from({ length: cells }, (_, i) => cells - i).join(' + ')} = ${right}. Có ${right} hình tứ giác.`,
      };
    }
    const shapes = Array.from({ length: int(rand, 5, 7) }, () => ({
      kind: /** @type {ShapeKind} */ (pick(rand, ['vuong', 'tron', 'tam-giac', 'chu-nhat'])),
      turn: pick(rand, [0, 15, 30]),
    }));
    const right = shapes.filter((s) => QUADS.includes(s.kind)).length;
    return {
      prompt: 'Trong các hình dưới đây, có bao nhiêu hình tứ giác?',
      visual: { type: 'shapes', shapes },
      ...numberOptions(rand, right, 0, 8),
      hint: 'Hình tứ giác có 4 cạnh. Hình vuông, hình chữ nhật đều là hình tứ giác.',
      solution: `Có ${right} hình có 4 cạnh, nên có ${right} hình tứ giác.`,
    };
  },
};

/** @type {ReviewSkill} */
const massSkill = {
  id: 'khoi-luong',
  label: 'Ki-lô-gam',
  make(rand) {
    if (rand() < 0.6) {
      const thing = pick(rand, MASS_THINGS);
      const kg = int(rand, thing.lo, thing.hi);
      const weights = fewestWeights(kg);
      const sum = weights.join(' + ');
      return {
        prompt: `Cân thăng bằng. ${capitalize(thing.name)} nặng mấy ki-lô-gam?`,
        visual: {
          type: 'balance',
          left: [{ kind: 'thing', id: thing.id, kg }],
          right: weights.map((w) => ({ kind: 'weight', kg: w })),
        },
        ...unitOptions(rand, kg, 'kg', [kg + 1, kg - 1], 20, 1),
        hint: 'Cân thăng bằng thì hai đĩa nặng bằng nhau. Em cộng các quả cân.',
        solution:
          weights.length > 1
            ? `${sum} = ${kg}. ${capitalize(thing.name)} nặng ${kg} kg.`
            : `Hai đĩa nặng bằng nhau. ${capitalize(thing.name)} nặng ${kg} kg.`,
      };
    }
    const heavy = int(rand, 5, 12);
    const light = int(rand, 2, heavy - 1);
    return {
      prompt: `Quả mít nặng ${heavy} kg, quả dưa hấu nặng ${light} kg. Quả mít nặng hơn quả dưa hấu bao nhiêu ki-lô-gam?`,
      ...unitOptions(rand, heavy - light, 'kg', [heavy + light, heavy - light + 1], 30, 1),
      hint: 'Muốn biết nặng hơn bao nhiêu, em làm phép trừ.',
      solution: `${heavy} − ${light} = ${heavy - light} (kg).`,
    };
  },
};

/** @type {ReviewSkill} */
const capacitySkill = {
  id: 'dung-tich',
  label: 'Lít',
  make(rand) {
    const big = pick(rand, [10, 15, 20, 25]);
    const small = pick(rand, [2, 3, 5, 8]);
    const visual = /** @type {Visual} */ ({ type: 'cans', litres: [big, small] });
    if (rand() < 0.5) {
      return {
        prompt: 'Hai can đều đầy dầu. Cả hai can có bao nhiêu lít dầu?',
        visual,
        ...unitOptions(rand, big + small, 'l', [big - small, big + small + 10], 50, 1),
        hint: 'Muốn biết cả hai can, em làm phép cộng.',
        solution: `${big} l + ${small} l = ${big + small} l.`,
      };
    }
    return {
      prompt: 'Can to chứa nhiều hơn can bé bao nhiêu lít?',
      visual,
      ...unitOptions(rand, big - small, 'l', [big + small, big - small + 10], 50, 1),
      hint: 'Muốn biết nhiều hơn bao nhiêu, em làm phép trừ.',
      solution: `${big} l − ${small} l = ${big - small} l.`,
    };
  },
};

/** @type {ReviewSkill} */
const clockSkill = {
  id: 'dong-ho',
  label: 'Xem đồng hồ',
  make(rand) {
    const m = pick(rand, [15, 30]);
    if (rand() < 0.5) {
      const h = int(rand, 1, 12);
      const minutes = h * 60 + m;
      const next = (h % 12) + 1;
      const previous = ((h + 10) % 12) + 1;
      return {
        prompt: 'Đồng hồ chỉ mấy giờ?',
        visual: { type: 'clock', minutes },
        ...mixOptions(rand, `${h} giờ ${m} phút`, [
          `${next} giờ ${m} phút`,
          `${previous} giờ ${m} phút`,
          `${h} giờ ${m === 15 ? 30 : 15} phút`,
        ]),
        hint: 'Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút.',
        solution: `Kim ngắn đã qua số ${h}, kim dài chỉ số ${m / 5}: ${h} giờ ${m} phút.`,
      };
    }
    const h = pick(rand, [13, 14, 15, 16, 17, 19, 20, 21]);
    const minutes = h * 60 + pick(rand, [0, m]);
    const right = dayClockText(minutes);
    const rest = minutes % 60;
    return {
      prompt: `${capitalize(partText(minutes))} còn gọi là mấy giờ?`,
      visual: { type: 'clock', minutes },
      ...mixOptions(
        rand,
        right,
        [h - 2, h - 1, h + 1].map((x) => (rest ? `${x} giờ ${rest} phút` : `${x} giờ`)),
      ),
      hint: 'Buổi chiều và buổi tối, em lấy số giờ trên mặt đồng hồ cộng thêm 12.',
      solution: `${h - 12} + 12 = ${h}. ${capitalize(partText(minutes))} còn gọi là ${right}.`,
    };
  },
};

/** @type {ReviewSkill} */
const calendarSkill = {
  id: 'xem-lich',
  label: 'Ngày trong tuần',
  make(rand) {
    const month = int(rand, 1, 12);
    const date = int(rand, 1, 20);
    const k = int(rand, 2, 8);
    const day = int(rand, 0, 6);
    const later = date + k;
    const right = dayTitle(dayAfter(day, k));
    return {
      prompt: `Ngày ${date} tháng ${month} là ${WEEKDAYS[day]}. Ngày ${later} tháng ${month} là thứ mấy?`,
      ...mixOptions(rand, right, [
        dayTitle(dayAfter(day, k + 1)),
        dayTitle(dayAfter(day, k - 1)),
        dayTitle(dayAfter(day, k + 2)),
      ]),
      hint: `Em đếm thêm từng ngày từ ngày ${date} đến ngày ${later}. Cứ 7 ngày lại về thứ cũ.`,
      solution: `Ngày ${later} cách ngày ${date} là ${k} ngày. ${dayTitle(day)} thêm ${k} ngày là ${WEEKDAYS[dayAfter(day, k)]}.`,
    };
  },
};

/**
 * A word problem of a measure. `base` is what one takes, `n` how many.
 * @typedef {(base: number, n: number) => { prompt: string, line: string, right: number, unit: string, divide: boolean }} Story
 */

/** @type {readonly Story[]} */
const STORIES = [
  (base, n) => ({
    prompt: `Mỗi tuần nhà em ăn hết ${base} kg gạo. Nhà em mua ${base * n} kg gạo. Số gạo đó ăn được mấy tuần?`,
    line: divLine(base, n),
    right: n,
    unit: 'tuần',
    divide: true,
  }),
  (base, n) => ({
    prompt: `Mỗi can chứa ${base} l nước. ${n} can như vậy chứa bao nhiêu lít nước?`,
    line: mulLine(base, n),
    right: base * n,
    unit: 'l',
    divide: false,
  }),
  (base, n) => ({
    prompt: `Có ${base * n} kg gạo chia đều vào ${base} bao. Mỗi bao có bao nhiêu ki-lô-gam gạo?`,
    line: divLine(base, n),
    right: n,
    unit: 'kg',
    divide: true,
  }),
  (base, n) => ({
    prompt: `Mỗi đoạn dây dài ${base} cm. ${n} đoạn dây như vậy dài tất cả bao nhiêu xăng-ti-mét?`,
    line: mulLine(base, n),
    right: base * n,
    unit: 'cm',
    divide: false,
  }),
];

/** @type {ReviewSkill} */
const storySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make(rand) {
    const base = pick(rand, /** @type {const} */ ([2, 3, 4, 5]));
    const n = int(rand, 2, 10);
    const { prompt, line, right, unit, divide } = pick(rand, STORIES)(base, n);
    return {
      prompt,
      ...unitOptions(rand, right, unit, divide ? [n + 1, n - 1, base] : [base + n], 60, 1),
      hint: divide ? 'Chia đều, hay mỗi phần bằng nhau: em làm phép chia.' : 'Em làm phép nhân.',
      solution: `${line} (${unit}).`,
    };
  },
};

/** The parts of this review. */
export const SKILLS = [
  solidSkill,
  collinearSkill,
  brokenLineSkill,
  quadSkill,
  massSkill,
  capacitySkill,
  clockSkill,
  calendarSkill,
  storySkill,
];
