/**
 * Review questions on the shapes and solids of grade 1, term 1: naming a
 * plane shape, the shape of an everyday object, counting one shape in a
 * row, the next shape of a pattern, naming a solid, and the words of
 * position (ở giữa, bên trái, bên phải, ở trên, ở dưới). Left and right are
 * as the child sees the picture. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { capitalize, mixOptions, numberOptions } from './quiz.js';

/** @typedef {import('./quiz.js').KidSkill} KidSkill */
/** @typedef {import('./quiz.js').ShapeKind} ShapeKind */
/** @typedef {import('./quiz.js').SolidKind} SolidKind */
/** @typedef {import('./quiz.js').FigureKind} FigureKind */

/** The four plane shapes, in the book's order. */
export const SHAPES = /** @type {const} */ (['vuong', 'tron', 'tam-giac', 'chu-nhat']);

/** The two solids, in the book's order. */
export const SOLIDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);

/** Names as the book writes them. */
export const FIGURE_NAMES = /** @type {const} */ ({
  vuong: 'hình vuông',
  tron: 'hình tròn',
  'tam-giac': 'hình tam giác',
  'chu-nhat': 'hình chữ nhật',
  'lap-phuong': 'khối lập phương',
  'hop-chu-nhat': 'khối hộp chữ nhật',
});

/** One sentence a child hears about each shape and solid. */
export const FIGURE_LOOKS = /** @type {const} */ ({
  vuong: 'Hình vuông có 4 cạnh dài bằng nhau.',
  tron: 'Hình tròn tròn đều, không có cạnh nào.',
  'tam-giac': 'Hình tam giác có 3 cạnh.',
  'chu-nhat': 'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.',
  'lap-phuong': 'Khối lập phương có 6 mặt đều là hình vuông to bằng nhau.',
  'hop-chu-nhat': 'Khối hộp chữ nhật có 6 mặt, có mặt là hình chữ nhật.',
});

/**
 * Everyday objects and the plane shape of the part a child looks at.
 * @type {ReadonlyArray<{ part: string, shape: ShapeKind }>}
 */
export const SHAPE_OBJECTS = [
  { part: 'Mặt đồng hồ', shape: 'tron' },
  { part: 'Đồng xu', shape: 'tron' },
  { part: 'Cái đĩa', shape: 'tron' },
  { part: 'Mặt bánh chưng', shape: 'vuong' },
  { part: 'Viên gạch hoa', shape: 'vuong' },
  { part: 'Biển báo nguy hiểm', shape: 'tam-giac' },
  { part: 'Thước ê ke', shape: 'tam-giac' },
  { part: 'Bìa quyển vở', shape: 'chu-nhat' },
  { part: 'Cánh cửa ra vào', shape: 'chu-nhat' },
  { part: 'Lá cờ Tổ quốc', shape: 'chu-nhat' },
];

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

/** Animals that stand in a row, and things for the table scene. */
const ROW_ANIMALS = /** @type {const} */ (['cat', 'chick', 'rabbit', 'butterfly']);
const TABLE_THINGS = /** @type {const} */ (['cat', 'ball', 'rabbit', 'chick']);

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
      hint: 'Em đếm số cạnh của hình. Hình không có cạnh nào là hình tròn.',
      solution: `Đây là ${FIGURE_NAMES[kind]}. ${FIGURE_LOOKS[kind]}`,
    };
  },
};

/** @type {KidSkill} */
export const objectShapeSkill = {
  id: 'do-vat',
  label: 'Đồ vật có dạng hình gì',
  make(rand) {
    const object = pick(rand, SHAPE_OBJECTS);
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
export const rowPositionSkill = {
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

/** What the options of a where question say. */
export const TABLE_PLACES = /** @type {const} */ (['Ở trên cái bàn', 'Ở dưới cái bàn']);

/** @type {KidSkill} */
export const tablePositionSkill = {
  id: 'tren-duoi',
  label: 'Ở trên, ở dưới',
  make(rand) {
    const [top, under] = shuffle(rand, [...TABLE_THINGS]).slice(0, 2);
    const [a, b] = [pictures[top], pictures[under]];
    const visual = /** @type {const} */ ({ type: 'table', top, under });
    const solution = `${capitalize(a)} ở trên cái bàn. ${capitalize(b)} ở dưới cái bàn.`;
    const hint = 'Mặt bàn ở phía trên. Chỗ trống giữa các chân bàn là ở dưới cái bàn.';
    if (rand() < 0.5) {
      const onTop = rand() < 0.5;
      return {
        prompt: `${capitalize(onTop ? a : b)} ở đâu?`,
        visual,
        options: [...TABLE_PLACES],
        answer: onTop ? 0 : 1,
        hint,
        solution,
      };
    }
    const askTop = rand() < 0.5;
    return {
      prompt: `Ở ${askTop ? 'trên' : 'dưới'} cái bàn có gì?`,
      visual,
      ...mixOptions(rand, capitalize(askTop ? a : b), [capitalize(askTop ? b : a)]),
      hint,
      solution,
    };
  },
};

/** The parts of the review on shapes and solids, in the book's order. */
export const SHAPE_SKILLS = [
  shapeNameSkill,
  objectShapeSkill,
  countShapeSkill,
  patternSkill,
  solidSkill,
  rowPositionSkill,
  tablePositionSkill,
];
