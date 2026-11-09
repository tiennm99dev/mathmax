/**
 * The mixed practice round of "Luyện tập chung" for the chapter on
 * perimeter and area: the perimeter of a triangle, a quadrilateral, a
 * rectangle and a square, area by counting 1 cm² squares, the area of a
 * rectangle and a square, sums and products in cm², and short real-life
 * problems. Wrong options are the slips children make (forgetting to double,
 * mixing up perimeter and area, a missing side, the wrong unit). Questions are
 * built from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { drawFresh, questionKey } from '#lib/core/kid/quiz.js';
import {
  QUADS,
  TRIANGLES,
  cellCount,
  perimeter,
  rectArea,
  rectAreaLine,
  rectCorners,
  rectPerimeter,
  rectPerimeterLine,
  rowsText,
  sidesOf,
  squareArea,
  squareAreaLine,
  squarePerimeter,
  squarePerimeterLine,
  sumLine,
} from '../_shared/figures.js';

/** @typedef {{ x: number, y: number }} Point */
/**
 * What the widget draws above the options: a polygon with side lengths, or
 * a shape of 1 cm² squares.
 * @typedef {{ type: 'poly', points: Point[], labels: string[], label: string } | { type: 'cells', rows: string[] }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/**
 * @typedef {'chu-vi' | 'chu-vi-cn' | 'chu-vi-vuong' | 'dem-o' | 'dien-tich-cn' | 'dien-tich-vuong' | 'cm2' | 'bai-toan'} Kind
 */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'chu-vi': 'Chu vi hình tam giác, tứ giác',
  'chu-vi-cn': 'Chu vi hình chữ nhật',
  'chu-vi-vuong': 'Chu vi hình vuông',
  'dem-o': 'Đếm ô vuông 1 cm²',
  'dien-tich-cn': 'Diện tích hình chữ nhật',
  'dien-tich-vuong': 'Diện tích hình vuông',
  cm2: 'Tính với đơn vị cm²',
  'bai-toan': 'Giải bài toán',
});

/** Shapes of 1 cm² squares to count. */
export const CELL_SHAPES = [
  ['XX..', 'XX..', 'XXXX'],
  ['.X.', 'XXX', '.X.'],
  ['X...', 'XX..', 'XXX.'],
  ['XXX', 'X.X', 'XXX'],
  ['XXXX', '.XX.', '.XX.'],
  ['XX.', '.XX', '..X'],
  ['XXX.', 'XXXX', '.XXX'],
  ['X.X', 'XXX', 'XXX'],
];

/**
 * Number options with a unit, increasing, the right one among distinct wrong
 * ones; padded with near numbers so there are at least three.
 * @param {number} right
 * @param {number[]} wrong
 * @param {string} unit
 * @returns {{ options: string[], answer: number }}
 */
export function amountOptions(right, wrong, unit) {
  const values = new Set([right, ...wrong.filter((v) => v > 0 && v !== right)]);
  for (let d = 1; values.size < 3; d++) {
    values.add(right + d);
    if (values.size < 3 && right - d > 0) values.add(right - d);
  }
  const sorted = [...values].sort((a, b) => a - b).slice(0, 4);
  if (!sorted.includes(right)) sorted[sorted.length - 1] = right;
  sorted.sort((a, b) => a - b);
  return { options: sorted.map((v) => `${fmt(v)} ${unit}`), answer: sorted.indexOf(right) };
}

/**
 * The perimeter of a triangle or a quadrilateral with its sides written.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function polygonPerimeterQuestion(rand) {
  const tri = rand() < 0.5;
  const points = pick(rand, tri ? TRIANGLES : QUADS);
  const k = int(rand, 1, 2);
  const unit = pick(rand, ['cm', 'dm']);
  const sides = sidesOf(points).map((s) => Math.round(s) * k);
  const p = perimeter(sides);
  const name = tri ? 'hình tam giác' : 'hình tứ giác';
  const scaled = points.map((q) => ({ x: q.x * k, y: q.y * k }));
  return {
    prompt: `Các cạnh của ${name} dài ${sides.map(fmt).join(` ${unit}, `)} ${unit}. Chu vi ${name} là bao nhiêu?`,
    ...amountOptions(p, [p - sides[0], p + sides[1], p - sides[sides.length - 1] + 1], unit),
    hint: 'Chu vi là tổng độ dài tất cả các cạnh. Em đừng bỏ sót cạnh nào.',
    solution: `Chu vi ${name} là: ${sumLine(sides, unit)}.`,
    visual: {
      type: 'poly',
      points: scaled,
      labels: sides.map((s) => `${fmt(s)} ${unit}`),
      label: `${name} có các cạnh ${sides.map((s) => `${fmt(s)} ${unit}`).join(', ')}`,
    },
  };
}

/**
 * A rectangle drawn with its length on top and its width on the left.
 * @param {number} length
 * @param {number} width
 * @param {string} unit
 * @returns {Visual}
 */
function rectVisual(length, width, unit) {
  return {
    type: 'poly',
    points: rectCorners(length, width),
    labels: [`${length} ${unit}`, '', '', `${width} ${unit}`],
    label: `hình chữ nhật dài ${length} ${unit}, rộng ${width} ${unit}`,
  };
}

/**
 * A square drawn with one side written.
 * @param {number} side
 * @returns {Visual}
 */
function squareVisual(side) {
  return {
    type: 'poly',
    points: rectCorners(side, side),
    labels: [`${side} cm`, '', '', ''],
    label: `hình vuông cạnh ${side} cm`,
  };
}

/**
 * The perimeter of a rectangle.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function rectPerimeterQuestion(rand) {
  const length = int(rand, 3, 9);
  const width = int(rand, 1, length - 1);
  const unit = pick(rand, ['cm', 'dm']);
  const right = rectPerimeter(length, width);
  return {
    prompt: `Hình chữ nhật dài ${length} ${unit}, rộng ${width} ${unit}. Chu vi là bao nhiêu?`,
    ...amountOptions(right, [length + width, length + width * 2, length * width], unit),
    hint: 'Lấy chiều dài cộng chiều rộng rồi nhân với 2.',
    solution: `Chu vi hình chữ nhật là: ${rectPerimeterLine(length, width, unit)}.`,
    visual: rectVisual(length, width, unit),
  };
}

/**
 * The perimeter of a square (never side 4, where side × side is the same).
 * @param {() => number} rand
 * @returns {Asked}
 */
export function squarePerimeterQuestion(rand) {
  const side = pick(rand, [2, 3, 5, 6, 7, 8, 9]);
  const right = squarePerimeter(side);
  return {
    prompt: `Hình vuông cạnh ${side} cm. Chu vi là bao nhiêu?`,
    ...amountOptions(right, [side * side, side + 4, side * 2], 'cm'),
    hint: 'Hình vuông có 4 cạnh dài bằng nhau: lấy độ dài một cạnh nhân với 4.',
    solution: `Chu vi hình vuông là: ${squarePerimeterLine(side, 'cm')}.`,
    visual: squareVisual(side),
  };
}

/**
 * Area by counting the 1 cm² squares of a shape.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function countQuestion(rand) {
  const rows = pick(rand, CELL_SHAPES);
  const n = cellCount(rows);
  return {
    prompt: 'Hình được lát kín bằng các ô vuông 1 cm². Diện tích hình là bao nhiêu?',
    ...amountOptions(n, [n - 1, n + 1, n + 2], 'cm²'),
    hint: 'Em đếm từng hàng rồi cộng lại. Mỗi ô vuông là 1 cm².',
    solution: `${rowsText(rows)}. Hình có ${n} ô vuông 1 cm², nên diện tích là ${n} cm².`,
    visual: { type: 'cells', rows },
  };
}

/**
 * The area of a rectangle.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function rectAreaQuestion(rand) {
  const length = int(rand, 3, 9);
  const width = int(rand, 2, length - 1);
  const right = rectArea(length, width);
  return {
    prompt: `Hình chữ nhật dài ${length} cm, rộng ${width} cm. Diện tích là bao nhiêu?`,
    ...amountOptions(
      right,
      [rectPerimeter(length, width), length + width, length * (width + 1)],
      'cm²',
    ),
    hint: 'Diện tích hình chữ nhật: lấy chiều dài nhân với chiều rộng.',
    solution: `Diện tích hình chữ nhật là: ${rectAreaLine(length, width)}.`,
    visual: rectVisual(length, width, 'cm'),
  };
}

/**
 * The area of a square (never side 4, where side × 4 is the same).
 * @param {() => number} rand
 * @returns {Asked}
 */
export function squareAreaQuestion(rand) {
  const side = pick(rand, [2, 3, 5, 6, 7, 8, 9]);
  const right = squareArea(side);
  return {
    prompt: `Hình vuông cạnh ${side} cm. Diện tích là bao nhiêu?`,
    ...amountOptions(right, [squarePerimeter(side), side * 2, (side - 1) * side], 'cm²'),
    hint: 'Diện tích hình vuông: lấy độ dài một cạnh nhân với chính nó.',
    solution: `Diện tích hình vuông là: ${squareAreaLine(side)}.`,
    visual: squareVisual(side),
  };
}

/**
 * One calculation with measures in cm²: the expression and its result.
 * @param {() => number} rand
 * @returns {{ text: string, right: number }}
 */
export function unitSum(rand) {
  const op = pick(rand, ['+', '−', '×', ':']);
  if (op === '+') {
    const a = int(rand, 11, 59);
    const b = int(rand, 11, 39);
    return { text: `${a} cm² + ${b} cm²`, right: a + b };
  }
  if (op === '−') {
    const a = int(rand, 40, 99);
    const b = int(rand, 11, a - 10);
    return { text: `${a} cm² − ${b} cm²`, right: a - b };
  }
  if (op === '×') {
    const a = int(rand, 11, 30);
    const b = int(rand, 2, 4);
    return { text: `${a} cm² × ${b}`, right: a * b };
  }
  const b = int(rand, 2, 9);
  const right = int(rand, 2, 9);
  return { text: `${right * b} cm² : ${b}`, right };
}

/**
 * A sum, difference, product or quotient of measures in cm²; one wrong
 * option has the right number with the unit of length.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function unitQuestion(rand) {
  const { text, right } = unitSum(rand);
  const near = right > 10 ? right - 10 : right + 10;
  const ordered = shuffle(rand, [
    `${fmt(right)} cm²`,
    `${fmt(near)} cm²`,
    `${fmt(right + 1)} cm²`,
    `${fmt(right)} cm`,
  ]);
  return {
    prompt: `${text} = ?`,
    options: ordered,
    answer: ordered.indexOf(`${fmt(right)} cm²`),
    hint: 'Em tính như với số tự nhiên rồi viết đơn vị cm² sau kết quả.',
    solution: `${text} = ${fmt(right)} cm².`,
  };
}

/**
 * A short real-life problem: a fence round a garden, the side of a square
 * from its perimeter, or which of two cards is larger.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const shape = int(rand, 0, 2);
  if (shape === 0) {
    const length = int(rand, 10, 30);
    const width = int(rand, 5, length - 1);
    const right = rectPerimeter(length, width);
    return {
      prompt: `Mảnh vườn hình chữ nhật dài ${length} m, rộng ${width} m. Bác Ba rào quanh vườn. Hàng rào dài bao nhiêu mét?`,
      ...amountOptions(right, [length + width, length + width * 2, right + 10], 'm'),
      hint: 'Hàng rào quanh vườn dài bằng chu vi mảnh vườn.',
      solution: `Hàng rào dài bằng chu vi mảnh vườn: ${rectPerimeterLine(length, width, 'm')}.`,
    };
  }
  if (shape === 1) {
    const side = int(rand, 3, 9);
    const p = squarePerimeter(side);
    return {
      prompt: `Một hình vuông có chu vi ${p} cm. Cạnh hình vuông dài bao nhiêu?`,
      ...amountOptions(side, [p / 2, p - 4, side + 2], 'cm'),
      hint: 'Chu vi hình vuông bằng độ dài một cạnh nhân với 4. Vậy cạnh bằng chu vi chia cho 4.',
      solution: `Cạnh hình vuông là: ${p} : 4 = ${side} (cm).`,
    };
  }
  let length = 0;
  let width = 0;
  let side = 0;
  while (length * width === side * side) {
    length = int(rand, 4, 9);
    width = int(rand, 2, length - 1);
    side = int(rand, 3, 8);
  }
  const rect = rectArea(length, width);
  const square = squareArea(side);
  const right = rect > square ? 'Tấm bìa hình chữ nhật' : 'Tấm bìa hình vuông';
  const options = shuffle(rand, ['Tấm bìa hình chữ nhật', 'Tấm bìa hình vuông']);
  return {
    prompt: `Tấm bìa hình chữ nhật dài ${length} cm, rộng ${width} cm. Tấm bìa hình vuông cạnh ${side} cm. Tấm bìa nào có diện tích lớn hơn?`,
    options,
    answer: options.indexOf(right),
    hint: 'Em tính diện tích từng tấm bìa rồi so sánh.',
    solution: `Hình chữ nhật: ${rectAreaLine(length, width)}. Hình vuông: ${squareAreaLine(side)}. ${right} có diện tích lớn hơn.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  'chu-vi': polygonPerimeterQuestion,
  'chu-vi-cn': rectPerimeterQuestion,
  'chu-vi-vuong': squarePerimeterQuestion,
  'dem-o': countQuestion,
  'dien-tich-cn': rectAreaQuestion,
  'dien-tich-vuong': squareAreaQuestion,
  cm2: unitQuestion,
  'bai-toan': storyQuestion,
};

/** Every kind of the round. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/** How many questions of each kind a round asks. */
const COUNTS = /** @type {Record<Kind, number>} */ ({
  'chu-vi': 1,
  'chu-vi-cn': 2,
  'chu-vi-vuong': 1,
  'dem-o': 1,
  'dien-tich-cn': 2,
  'dien-tich-vuong': 1,
  cm2: 1,
  'bai-toan': 3,
});

/** How many questions a round asks. */
export const ROUND_LENGTH = Object.values(COUNTS).reduce((s, c) => s + c, 0);

/**
 * A round of different questions in mixed order.
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
