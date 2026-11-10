/**
 * The adaptive review of geometry and measuring in grade 3: perimeters,
 * areas, the circle, the midpoint, units of length, mass and capacity, the
 * clock, months and days of the week, and money. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { WEEKDAYS, dayAfter, dayTitle } from '#lib/core/kid/time.js';
import { MONTH_DAYS, convert, timeText } from './measure.js';
import { dong, valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/**
 * Options that carry a unit: "12 cm".
 * @param {string} unit
 */
const inUnit = (unit) => (/** @type {number} */ n) => `${fmt(n)} ${unit}`;

/** @type {ReviewSkill} */
export const polygonPerimeter = {
  id: 'chu-vi-tam-giac-tu-giac',
  label: 'Chu vi hình tam giác, hình tứ giác',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const triangle = rand() < 0.5;
    /** @type {number[]} */
    let sides;
    for (;;) {
      sides = Array.from({ length: triangle ? 3 : 4 }, () => int(rand, 2, 12));
      const longest = Math.max(...sides);
      const rest = sides.reduce((s, v) => s + v, 0) - longest;
      if (rest > longest) break;
    }
    const right = sides.reduce((s, v) => s + v, 0);
    return {
      prompt: `Tính chu vi hình ${triangle ? 'tam giác' : 'tứ giác'} trong hình.`,
      visual: {
        type: 'shape',
        kind: triangle ? 'triangle' : 'quad',
        labels: sides.map((s) => `${s} ${unit}`),
      },
      ...valueOptions(right, [right - sides[0], right + sides[1], right - 1], {
        write: inUnit(unit),
      }),
      hint: 'Chu vi của một hình bằng tổng độ dài các cạnh của hình đó.',
      solution: `Chu vi là: ${sides.join(' + ')} = ${right} (${unit}).`,
    };
  },
};

/** @type {ReviewSkill} */
export const rectPerimeter = {
  id: 'chu-vi-hcn-hv',
  label: 'Chu vi hình chữ nhật, hình vuông',
  make(rand) {
    const unit = pick(rand, ['cm', 'm']);
    const write = inUnit(unit);
    const kind = int(rand, 0, 2);
    if (kind === 0) {
      const a = int(rand, 3, 25);
      const right = a * 4;
      return {
        prompt: 'Tính chu vi hình vuông trong hình.',
        visual: { type: 'shape', kind: 'square', labels: [`${a} ${unit}`] },
        ...valueOptions(right, [a * 2, a + 4, right + 4], { write }),
        hint: 'Hình vuông có 4 cạnh dài bằng nhau.',
        solution: `Chu vi hình vuông là: ${a} × 4 = ${right} (${unit}).`,
      };
    }
    const width = int(rand, 3, 15);
    const length = width + int(rand, 2, 12);
    const right = (length + width) * 2;
    if (kind === 1) {
      return {
        prompt: 'Tính chu vi hình chữ nhật trong hình.',
        visual: { type: 'shape', kind: 'rect', labels: [`${length} ${unit}`, `${width} ${unit}`] },
        ...valueOptions(right, [length + width, length * width, right + 2], { write }),
        hint: 'Muốn tính chu vi hình chữ nhật, em lấy chiều dài cộng chiều rộng (cùng đơn vị đo) rồi nhân với 2.',
        solution: `Chu vi hình chữ nhật là: (${length} + ${width}) × 2 = ${right} (${unit}).`,
      };
    }
    const more = length - width;
    return {
      prompt: `Một mảnh đất hình chữ nhật có chiều rộng ${width} m, chiều dài hơn chiều rộng ${more} m. Tính chu vi mảnh đất đó.`,
      ...valueOptions(right, [(width + more) * 2, length + width, right + more], {
        write: inUnit('m'),
      }),
      hint: 'Em tìm chiều dài trước: lấy chiều rộng cộng với phần hơn.',
      solution: `Chiều dài là: ${width} + ${more} = ${length} (m). Chu vi là: (${length} + ${width}) × 2 = ${right} (m).`,
    };
  },
};

/** @type {ReviewSkill} */
export const areaSkill = {
  id: 'dien-tich',
  label: 'Diện tích hình chữ nhật, hình vuông',
  make(rand) {
    const write = inUnit('cm²');
    const kind = int(rand, 0, 2);
    if (kind === 0) {
      const a = int(rand, 3, 9);
      const right = a * a;
      return {
        prompt: 'Tính diện tích hình vuông trong hình.',
        visual: { type: 'shape', kind: 'square', labels: [`${a} cm`] },
        ...valueOptions(right, [a * 4, a * 2, right + a], { write }),
        hint: 'Muốn tính diện tích hình vuông, em lấy độ dài một cạnh nhân với chính nó.',
        solution: `Diện tích hình vuông là: ${a} × ${a} = ${right} (cm²).`,
      };
    }
    if (kind === 1) {
      const width = int(rand, 3, 9);
      const length = width + int(rand, 1, 8);
      const right = length * width;
      return {
        prompt: 'Tính diện tích hình chữ nhật trong hình.',
        visual: { type: 'shape', kind: 'rect', labels: [`${length} cm`, `${width} cm`] },
        ...valueOptions(right, [(length + width) * 2, length + width, right + width], { write }),
        hint: 'Muốn tính diện tích hình chữ nhật, em lấy chiều dài nhân với chiều rộng (cùng đơn vị đo).',
        solution: `Diện tích hình chữ nhật là: ${length} × ${width} = ${right} (cm²).`,
      };
    }
    const a = int(rand, 2, 5);
    const b = a + int(rand, 1, 4);
    const right = a * a + b * b;
    return {
      prompt: `Hình H gồm hai hình vuông ghép lại: một hình cạnh ${a} cm, một hình cạnh ${b} cm. Tính diện tích hình H.`,
      ...valueOptions(right, [(a + b) * (a + b), a * 4 + b * 4, a * b * 2], { write }),
      hint: 'Diện tích hình H bằng tổng diện tích hai hình vuông.',
      solution: `Diện tích hình vuông nhỏ: ${a} × ${a} = ${a * a} (cm²). Diện tích hình vuông lớn: ${b} × ${b} = ${b * b} (cm²). Diện tích hình H: ${a * a} + ${b * b} = ${right} (cm²).`,
    };
  },
};

/** @type {ReviewSkill} */
export const circleSkill = {
  id: 'hinh-tron',
  label: 'Hình tròn, trung điểm',
  make(rand) {
    const kind = int(rand, 0, 2);
    const write = inUnit('cm');
    if (kind === 0) {
      const r = int(rand, 2, 9);
      return {
        prompt: `Hình tròn tâm O có bán kính ${r} cm. Đường kính của hình tròn dài bao nhiêu xăng-ti-mét?`,
        visual: { type: 'shape', kind: 'circle', labels: [`${r} cm`, 'r'] },
        ...valueOptions(r * 2, [r, r + 2, r * 4], { write }),
        hint: 'Trong một hình tròn, đường kính dài gấp 2 lần bán kính.',
        solution: `Đường kính dài: ${r} × 2 = ${r * 2} (cm).`,
      };
    }
    if (kind === 1) {
      const r = int(rand, 2, 9);
      return {
        prompt: `Hình tròn tâm O có đường kính ${r * 2} cm. Bán kính của hình tròn dài bao nhiêu xăng-ti-mét?`,
        visual: { type: 'shape', kind: 'circle', labels: [`${r * 2} cm`, 'd'] },
        ...valueOptions(r, [r * 2, r * 4, r - 1], { write }),
        hint: 'Trong một hình tròn, bán kính dài bằng một nửa đường kính.',
        solution: `Bán kính dài: ${r * 2} : 2 = ${r} (cm).`,
      };
    }
    const half = int(rand, 2, 15);
    if (rand() < 0.5) {
      return {
        prompt: `M là trung điểm của đoạn thẳng AB. Đoạn thẳng AB dài ${half * 2} cm. Đoạn thẳng AM dài bao nhiêu xăng-ti-mét?`,
        ...valueOptions(half, [half * 2, half * 4, half + 2], { write }),
        hint: 'Trung điểm M chia đoạn thẳng AB thành hai đoạn thẳng dài bằng nhau.',
        solution: `AM = AB : 2 = ${half * 2} : 2 = ${half} (cm).`,
      };
    }
    return {
      prompt: `M là trung điểm của đoạn thẳng AB. Đoạn thẳng AM dài ${half} cm. Đoạn thẳng AB dài bao nhiêu xăng-ti-mét?`,
      ...valueOptions(half * 2, [half, half + 2, half * 4], { write }),
      hint: 'Trung điểm M chia đoạn thẳng AB thành hai đoạn thẳng dài bằng nhau.',
      solution: `AB = AM × 2 = ${half} × 2 = ${half * 2} (cm).`,
    };
  },
};

/**
 * Pairs of units the book converts between, big first.
 * @type {ReadonlyArray<readonly [string, string]>}
 */
export const LENGTH_PAIRS = [
  ['cm', 'mm'],
  ['dm', 'cm'],
  ['dm', 'mm'],
  ['m', 'dm'],
  ['m', 'cm'],
  ['m', 'mm'],
  ['km', 'm'],
];

/**
 * A conversion "4 m = ? cm" with the slips of a wrong number of zeros.
 * @param {number} count
 * @param {string} big
 * @param {string} small
 * @returns {ReviewQuestion}
 */
export function convertQuestion(count, big, small) {
  const right = convert(count, big, small);
  const ratio = convert(1, big, small);
  return {
    prompt: `${fmt(count)} ${big} = ? ${small}`,
    ...valueOptions(right, [right * 10, right / 10, count + ratio, right * 100], {
      write: inUnit(small),
    }),
    hint: `Em nhớ: 1 ${big} = ${fmt(ratio)} ${small}.`,
    solution: `1 ${big} = ${fmt(ratio)} ${small}, nên ${fmt(count)} ${big} = ${fmt(count)} × ${fmt(ratio)} ${small} = ${fmt(right)} ${small}.`,
  };
}

/** @type {ReviewSkill} */
export const lengthUnits = {
  id: 'don-vi-do-dai',
  label: 'Đơn vị đo độ dài',
  make(rand) {
    const [big, small] = pick(rand, LENGTH_PAIRS);
    return convertQuestion(int(rand, 2, 9), big, small);
  },
};

/** @type {ReviewSkill} */
export const massCapacity = {
  id: 'khoi-luong-dung-tich',
  label: 'Gam, ki-lô-gam, mi-li-lít, lít',
  make(rand) {
    const mass = rand() < 0.5;
    const [big, small] = mass ? ['kg', 'g'] : ['l', 'ml'];
    if (rand() < 0.4) return convertQuestion(int(rand, 2, 9), big, small);
    const a = int(rand, 1, 9) * 100;
    const kind = int(rand, 0, 3);
    const b = kind < 2 ? int(rand, 1, 9) * 100 : int(rand, 2, 5);
    const big2 = kind === 1 ? Math.max(a, b) : a;
    const small2 = kind === 1 ? Math.min(a, b) : b;
    if (kind === 1 && a === b) return massCapacity.make(rand);
    const ops = [
      { text: `${a} ${small} + ${b} ${small}`, right: a + b },
      { text: `${big2} ${small} − ${small2} ${small}`, right: big2 - small2 },
      { text: `${a} ${small} × ${b}`, right: a * b },
      { text: `${fmt(a * b)} ${small} : ${b}`, right: a },
    ];
    const { text, right } = ops[kind];
    return {
      prompt: `Tính: ${text}`,
      ...valueOptions(right, [right + 100, right - 100, right * 10], {
        step: 100,
        write: inUnit(small),
      }),
      hint: `Em tính với các số như bình thường, rồi viết thêm đơn vị ${small} vào kết quả.`,
      solution: `${text} = ${fmt(right)} ${small}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const clockSkill = {
  id: 'xem-dong-ho',
  label: 'Xem đồng hồ',
  make(rand) {
    for (;;) {
      const h = int(rand, 1, 12);
      const m = int(rand, 1, 11) * 5;
      if (m % 5 === 0 && m / 5 === h % 12) continue;
      const right = timeText(h * 60 + m);
      const nextHour = (h % 12) + 1;
      const swapped = timeText(((m / 5) % 12 || 12) * 60 + (h % 12) * 5);
      const wrong = [
        timeText(nextHour * 60 + m),
        swapped,
        timeText(h * 60 + ((m + 5) % 60 || 5)),
        timeText(h * 60 + (m > 5 ? m - 5 : m + 10)),
      ].filter((w) => w !== right);
      return {
        prompt: 'Đồng hồ chỉ mấy giờ?',
        visual: { type: 'clock', minutes: h * 60 + m },
        ...mixOptions(rand, right, wrong.slice(0, 3)),
        hint: 'Kim ngắn chỉ giờ: nó đã qua số nào? Kim dài chỉ phút: mỗi số là 5 phút.',
        solution: `Kim ngắn đã qua số ${h}, kim dài chỉ ${m} phút. Đồng hồ chỉ ${right}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const calendarSkill = {
  id: 'thang-nam',
  label: 'Tháng, năm, ngày trong tuần',
  make(rand) {
    if (rand() < 0.5) {
      const month = pick(rand, [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const right = MONTH_DAYS[month - 1];
      return {
        prompt: `Tháng ${month} có bao nhiêu ngày?`,
        ...valueOptions(right, [28, 29, 30, 31]),
        hint: 'Em đếm trên các khớp ngón tay: tháng ở khớp nhô lên có 31 ngày, tháng ở chỗ lõm có 30 ngày (trừ tháng 2).',
        solution: `Tháng ${month} có ${right} ngày.`,
      };
    }
    const month = pick(rand, [4, 5, 6, 7, 8, 9, 10, 11]);
    const length = MONTH_DAYS[month - 1];
    const date = length - int(rand, 0, 4);
    const day = int(rand, 0, 6);
    const k = int(rand, 1, 3);
    const gap = length - date + k;
    const right = dayAfter(day, gap);
    const slipLength = length === 31 ? 30 : 31;
    return {
      prompt: `Ngày ${date} tháng ${month} là ${WEEKDAYS[day]}. Ngày ${k} tháng ${month + 1} là thứ mấy?`,
      ...mixOptions(
        rand,
        dayTitle(right),
        [...new Set([slipLength - length, 1, -1, -2])]
          .slice(0, 3)
          .map((k) => dayTitle(dayAfter(right, k))),
      ),
      hint: `Tháng ${month} có ${length} ngày. Em đếm tiếp từng ngày sang tháng ${month + 1}.`,
      solution: `Tháng ${month} có ${length} ngày. Ngày ${k} tháng ${month + 1} đến sau ngày ${date} tháng ${month} đúng ${gap} ngày. Đếm tiếp ${gap} ngày từ ${WEEKDAYS[day]}, ta được ${WEEKDAYS[right]}.`,
    };
  },
};

/**
 * Some exercise books at one price and one box of crayons: what it all costs.
 * @param {number} books
 * @param {number} each
 * @param {number} box
 * @returns {ReviewQuestion}
 */
export function shoppingStory(books, each, box) {
  const forBooks = books * each;
  const right = forBooks + box;
  return {
    prompt: `Mai mua ${books} quyển vở, mỗi quyển giá ${dong(each)}, và một hộp bút chì màu giá ${dong(box)}. Mai phải trả tất cả bao nhiêu tiền?`,
    ...valueOptions(right, [each + box, forBooks, right + each], { step: 1000, write: dong }),
    hint: 'Em tính tiền mua vở trước, rồi cộng thêm tiền hộp bút chì màu.',
    solution: `Tiền mua vở: ${fmt(each)} × ${books} = ${fmt(forBooks)} (đồng). Mai phải trả: ${fmt(forBooks)} + ${fmt(box)} = ${fmt(right)} (đồng).`,
  };
}

/** @type {ReviewSkill} */
export const moneySkill = {
  id: 'tien-viet-nam',
  label: 'Tiền Việt Nam',
  make(rand) {
    return shoppingStory(int(rand, 2, 6), int(rand, 4, 9) * 1000, int(rand, 20, 45) * 1000);
  },
};

/** The parts of the review of geometry and measuring. */
export const GEOMETRY_MEASURE_SKILLS = [
  polygonPerimeter,
  rectPerimeter,
  areaSkill,
  circleSkill,
  lengthUnits,
  massCapacity,
  clockSkill,
  calendarSkill,
  moneySkill,
];
