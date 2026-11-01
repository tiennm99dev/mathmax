/**
 * Year-end review questions on geometry and measurement in grade 1: naming
 * a plane shape, the shape of an everyday object, counting one shape in a
 * row, the next shape of a pattern, naming a solid, left, right and middle,
 * longer and shorter, measuring with a centimetre ruler, adding and
 * subtracting lengths in cm, reading a whole hour on a clock, and the days
 * of the week. Left and right are as the child sees the picture. Pure and
 * DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { RULER_CM, THINGS, inSentence } from '#lib/core/kid/length.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES, OBJECTS, SHAPES, SHAPE_LOOKS } from '#lib/core/kid/shapes.js';
import { MINUS } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<import('./visual.js').Visual>} KidSkill */
/** @typedef {import('#lib/core/kid/shapes.js').ShapeKind} ShapeKind */
/** @typedef {import('#lib/core/kid/shapes.js').SolidKind} SolidKind */
/** @typedef {import('#lib/core/kid/shapes.js').FigureKind} FigureKind */

/** The last number on the ruler the questions draw, in cm. */
export const RULER_TO = RULER_CM;

/** The two solids, in the book's order. */
export const SOLIDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);

/** One sentence a child hears about each shape and solid. */
export const FIGURE_LOOKS = /** @type {const} */ ({
  ...SHAPE_LOOKS,
  'lap-phuong': 'Khối lập phương có 6 mặt đều là hình vuông to bằng nhau.',
  'hop-chu-nhat': 'Khối hộp chữ nhật có 6 mặt, có mặt là hình chữ nhật.',
});

/**
 * Everyday objects and their solid.
 * @type {ReadonlyArray<{ name: string, solid: SolidKind }>}
 */
export const SOLID_OBJECTS = [
  { name: 'Con xúc xắc', solid: 'lap-phuong' },
  { name: 'Khối rubik', solid: 'lap-phuong' },
  { name: 'Hộp sữa', solid: 'hop-chu-nhat' },
  { name: 'Viên gạch', solid: 'hop-chu-nhat' },
  { name: 'Cái tủ', solid: 'hop-chu-nhat' },
];

/** The days of one week as written inside a sentence, thứ Hai first. */
export const WEEKDAYS = /** @type {const} */ ([
  'thứ Hai',
  'thứ Ba',
  'thứ Tư',
  'thứ Năm',
  'thứ Sáu',
  'thứ Bảy',
  'Chủ nhật',
]);

/** Animals that stand in a row. */
const ROW_ANIMALS = /** @type {const} */ (['cat', 'chick', 'rabbit', 'butterfly']);

/**
 * The name of a figure with a capital letter, for options.
 * @param {FigureKind} kind
 */
export function figureTitle(kind) {
  return capitalize(FIGURE_NAMES[kind]);
}

/**
 * Options naming the right plane shape and two other shapes.
 * @param {() => number} rand
 * @param {ShapeKind} right
 */
function shapeOptions(rand, right) {
  const others = shuffle(
    rand,
    SHAPES.filter((s) => s !== right),
  ).slice(0, 2);
  return mixOptions(rand, figureTitle(right), others.map(figureTitle));
}

/**
 * "7 cm".
 * @param {number} n
 */
export function cm(n) {
  return `${n} cm`;
}

/**
 * Options "N cm" near `right`, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @param {number} lo
 * @param {number} hi
 */
function cmOptions(rand, right, lo, hi) {
  const { options, answer } = numberOptions(rand, right, lo, hi);
  return { options: options.map((o) => cm(Number(o))), answer };
}

/** @type {KidSkill} */
export const shapeNameSkill = {
  id: 'hinh-phang',
  label: 'Gọi tên hình',
  make(rand) {
    const kind = pick(rand, SHAPES);
    return {
      prompt: 'Đây là hình gì?',
      visual: { type: 'figures', figures: [kind] },
      ...shapeOptions(rand, kind),
      hint: 'Em đếm số cạnh của hình, rồi nhớ lại hình nào có số cạnh như vậy.',
      solution: `Đây là ${FIGURE_NAMES[kind]}. ${FIGURE_LOOKS[kind]}`,
    };
  },
};

/** @type {KidSkill} */
export const objectShapeSkill = {
  id: 'do-vat',
  label: 'Đồ vật có dạng hình gì',
  make(rand) {
    const object = pick(rand, OBJECTS);
    return {
      prompt: `${object.part} có dạng hình gì?`,
      ...shapeOptions(rand, object.shape),
      hint: 'Em nhớ lại đồ vật đó: nó tròn hay có cạnh? Nếu có cạnh thì có mấy cạnh?',
      solution: `${object.part} có dạng ${FIGURE_NAMES[object.shape]}.`,
    };
  },
};

/** @type {KidSkill} */
export const countShapeSkill = {
  id: 'dem-hinh',
  label: 'Đếm hình',
  make(rand) {
    /** @type {ShapeKind[]} */
    const figures = Array.from({ length: 7 }, () => pick(rand, SHAPES));
    const target = pick(rand, figures);
    const n = figures.filter((f) => f === target).length;
    const name = FIGURE_NAMES[target];
    return {
      prompt: `Có mấy ${name}?`,
      visual: { type: 'figures', figures },
      ...numberOptions(rand, n, 1, 7),
      hint: `Em chỉ tay vào từng hình. Em chỉ đếm ${name}.`,
      solution: `Trong hàng có ${n} ${name}.`,
    };
  },
};

/**
 * The repeating groups a pattern question may use, as positions of distinct
 * shapes: AB, ABC, AAB and ABB.
 */
const UNITS = [
  [0, 1],
  [0, 1, 2],
  [0, 0, 1],
  [0, 1, 1],
];

/** @type {KidSkill} */
export const patternSkill = {
  id: 'quy-luat',
  label: 'Hình tiếp theo',
  make(rand) {
    const kinds = shuffle(rand, [...SHAPES]);
    const unit = pick(rand, UNITS).map((i) => kinds[i]);
    const length = unit.length * 2 + int(rand, 0, unit.length - 1);
    const figures = Array.from({ length }, (_, i) => unit[i % unit.length]);
    const next = unit[length % unit.length];
    const used = [...new Set(unit)];
    const others = [...used, kinds[3]].filter((k) => k !== next).slice(0, 2);
    return {
      prompt: 'Hình nào thay cho dấu hỏi?',
      visual: { type: 'figures', figures, blank: true },
      ...mixOptions(rand, figureTitle(next), others.map(figureTitle)),
      hint: 'Em tìm nhóm hình cứ lặp đi lặp lại.',
      solution: `Nhóm hình lặp lại là: ${unit.map((k) => FIGURE_NAMES[k]).join(', ')}. Hình thay cho dấu hỏi là ${FIGURE_NAMES[next]}.`,
    };
  },
};

/** @type {KidSkill} */
export const solidSkill = {
  id: 'khoi',
  label: 'Khối lập phương, khối hộp chữ nhật',
  make(rand) {
    const options = SOLIDS.map(figureTitle);
    const hint = `${FIGURE_LOOKS['lap-phuong']} Khối hộp chữ nhật thì không như vậy.`;
    if (rand() < 0.5) {
      const kind = pick(rand, SOLIDS);
      return {
        prompt: 'Đây là khối gì?',
        visual: { type: 'figures', figures: [kind] },
        options,
        answer: SOLIDS.indexOf(kind),
        hint,
        solution: `Đây là ${FIGURE_NAMES[kind]}. ${FIGURE_LOOKS[kind]}`,
      };
    }
    const object = pick(rand, SOLID_OBJECTS);
    return {
      prompt: `${object.name} có dạng khối gì?`,
      options,
      answer: SOLIDS.indexOf(object.solid),
      hint,
      solution: `${object.name} có dạng ${FIGURE_NAMES[object.solid]}.`,
    };
  },
};

/** @type {KidSkill} */
export const positionSkill = {
  id: 'trai-phai',
  label: 'Bên trái, bên phải, ở giữa',
  make(rand) {
    const row = shuffle(rand, [...ROW_ANIMALS]).slice(0, 3);
    const names = row.map((p) => pictures[p]);
    const options = names.map(capitalize);
    const order = `Từ trái sang phải: ${names.join(', ')}.`;
    const ask = int(rand, 0, 2);
    if (ask === 0) {
      return {
        prompt: 'Con nào ở giữa?',
        visual: { type: 'row', pictures: row },
        options,
        answer: 1,
        hint: 'Con ở giữa có một con ở bên trái và một con ở bên phải.',
        solution: `${order} ${capitalize(names[1])} ở giữa.`,
      };
    }
    const left = ask === 1;
    const of = left ? int(rand, 1, 2) : int(rand, 0, 1);
    const answer = left ? of - 1 : of + 1;
    const side = left ? 'bên trái' : 'bên phải';
    return {
      prompt: `Con nào ở ngay ${side} ${names[of]}?`,
      visual: { type: 'row', pictures: row },
      options,
      answer,
      hint: `Bên trái là phía tay trái của em khi em nhìn hình. Em tìm ${names[of]} trước.`,
      solution: `${order} ${capitalize(names[answer])} ở ngay ${side} ${names[of]}.`,
    };
  },
};

/** @type {KidSkill} */
export const longerSkill = {
  id: 'dai-ngan',
  label: 'Dài hơn, ngắn hơn',
  make(rand) {
    const count = rand() < 0.5 ? 2 : 3;
    const things = shuffle(rand, [...THINGS]).slice(0, count);
    const sizes = shuffle(rand, [3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, count);
    const strips = things.map((t, i) => ({ thing: t.id, cm: sizes[i] }));
    const long = rand() < 0.5;
    const target = long ? Math.max(...sizes) : Math.min(...sizes);
    const answer = sizes.indexOf(target);
    const word = count === 2 ? (long ? 'dài hơn' : 'ngắn hơn') : long ? 'dài nhất' : 'ngắn nhất';
    const byLength = [...strips].sort((a, b) => a.cm - b.cm);
    const label = (/** @type {string} */ id) => THINGS.find((t) => t.id === id)?.label ?? id;
    return {
      prompt: `Vật nào ${word}?`,
      visual: { type: 'strips', strips },
      options: things.map((t) => t.label),
      answer,
      hint: 'Các vật đặt thẳng một đầu bên trái. Em nhìn đầu bên phải: đầu nào thò ra xa hơn?',
      solution: `Từ ngắn đến dài: ${byLength.map((s) => inSentence(label(s.thing))).join(', ')}. ${things[answer].label} ${word}.`,
    };
  },
};

/** @type {KidSkill} */
export const measureSkill = {
  id: 'do-cm',
  label: 'Đo độ dài bằng thước',
  make(rand) {
    const thing = pick(rand, THINGS);
    const n = int(rand, 2, RULER_TO - 1);
    return {
      prompt: `${thing.label} dài mấy xăng-ti-mét?`,
      visual: { type: 'strips', strips: [{ thing: thing.id, cm: n }], ruler: true },
      ...cmOptions(rand, n, 1, RULER_TO),
      hint: 'Một đầu của vật đặt ở vạch 0. Em xem đầu kia chỉ vào vạch số mấy.',
      solution: `Đầu bên trái ở vạch 0, đầu bên phải ở vạch ${n}. ${thing.label} dài ${cm(n)}.`,
    };
  },
};

/** @type {KidSkill} */
export const lengthCalcSkill = {
  id: 'tinh-cm',
  label: 'Tính với đơn vị xăng-ti-mét',
  make(rand) {
    const a = int(rand, 2, 10);
    const b = int(rand, 1, 10 - Math.min(a, 9));
    if (rand() < 0.5) {
      return {
        prompt: `${cm(a)} + ${cm(b)} = ?`,
        ...cmOptions(rand, a + b, 1, 20),
        hint: 'Em cộng hai số, rồi viết cm sau kết quả.',
        solution: `${a} + ${b} = ${a + b}, nên ${cm(a)} + ${cm(b)} = ${cm(a + b)}.`,
      };
    }
    const n = a + b;
    return {
      prompt: `${cm(n)} ${MINUS} ${cm(b)} = ?`,
      ...cmOptions(rand, a, 0, 20),
      hint: 'Em trừ hai số, rồi viết cm sau kết quả.',
      solution: `${n} ${MINUS} ${b} = ${a}, nên ${cm(n)} ${MINUS} ${cm(b)} = ${cm(a)}.`,
    };
  },
};

/**
 * Three hours to pick from for a clock at `hour` (1 to 12): the right one,
 * the next hour (a miscount) and 12 (reading the long hand), or 6 when 12
 * is already there. Sorted, so the right one moves around.
 * @param {number} hour
 */
export function hourChoices(hour) {
  const next = (hour % 12) + 1;
  const swap = hour === 12 || next === 12 ? 6 : 12;
  return [hour, next, swap].sort((a, b) => a - b);
}

/** @type {KidSkill} */
export const clockSkill = {
  id: 'xem-gio',
  label: 'Xem giờ đúng',
  make(rand) {
    const hour = int(rand, 1, 12);
    if (rand() < 0.6) {
      const choices = hourChoices(hour);
      return {
        prompt: 'Đồng hồ chỉ mấy giờ?',
        visual: { type: 'clock', hour },
        options: choices.map((h) => `${h} giờ`),
        answer: choices.indexOf(hour),
        hint: 'Kim dài chỉ thẳng lên trên là giờ đúng. Em xem kim ngắn chỉ số mấy.',
        solution: `Kim ngắn chỉ số ${hour}, kim dài chỉ số 12. Đồng hồ chỉ ${hour} giờ.`,
      };
    }
    const shortHand = rand() < 0.6;
    const right = shortHand ? hour : 12;
    const choices = shortHand ? hourChoices(hour) : [...new Set([hour, 12, 6, 3])].slice(0, 3);
    const sorted = [...choices].sort((a, b) => a - b);
    return {
      prompt: `Lúc ${hour} giờ, kim ${shortHand ? 'ngắn' : 'dài'} chỉ số mấy?`,
      options: sorted.map(String),
      answer: sorted.indexOf(right),
      hint: shortHand
        ? 'Kim ngắn là kim chỉ giờ.'
        : 'Em nhớ lại đồng hồ lúc giờ đúng: kim dài chỉ thẳng lên trên.',
      solution: `Lúc ${hour} giờ, kim ngắn chỉ số ${hour}, kim dài chỉ số 12.`,
    };
  },
};

/** @type {KidSkill} */
export const weekdaySkill = {
  id: 'ngay-trong-tuan',
  label: 'Các ngày trong tuần',
  make(rand) {
    const today = int(rand, 0, 6);
    const forward = rand() < 0.5;
    const right = (today + (forward ? 1 : 6)) % 7;
    const other = (today + (forward ? 6 : 1)) % 7;
    const far = (today + (forward ? 2 : 5)) % 7;
    const ask = forward ? 'Ngày mai' : 'Hôm qua';
    return {
      prompt: `Hôm nay là ${WEEKDAYS[today]}. ${ask} là thứ mấy?`,
      ...mixOptions(rand, capitalize(WEEKDAYS[right]), [
        capitalize(WEEKDAYS[other]),
        capitalize(WEEKDAYS[far]),
      ]),
      hint: forward
        ? 'Ngày mai là ngày ngay sau hôm nay. Em đọc lần lượt các ngày trong tuần, bắt đầu từ thứ Hai.'
        : 'Hôm qua là ngày ngay trước hôm nay. Em đọc lần lượt các ngày trong tuần, bắt đầu từ thứ Hai.',
      solution: `Một tuần có 7 ngày: ${WEEKDAYS.join(', ')}. Hôm nay là ${WEEKDAYS[today]} thì ${ask.toLowerCase()} là ${WEEKDAYS[right]}.`,
    };
  },
};

/** The parts of the review of geometry and measurement, in the book's order. */
export const MEASURE_SKILLS = [
  shapeNameSkill,
  objectShapeSkill,
  countShapeSkill,
  patternSkill,
  solidSkill,
  positionSkill,
  longerSkill,
  measureSkill,
  lengthCalcSkill,
  clockSkill,
  weekdaySkill,
];
