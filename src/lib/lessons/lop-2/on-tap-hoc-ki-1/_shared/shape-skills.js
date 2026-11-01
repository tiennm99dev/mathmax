/**
 * Review questions on plane shapes: counting segments, measuring and comparing
 * segments, telling quadrilaterals, three collinear points, a part of a
 * segment, the length of a polyline, the next shape of a pattern, and counting
 * the triangles, quadrilaterals and tiles of a figure. Pure and DOM-free; each
 * skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES, SHAPES } from '#lib/core/kid/shapes.js';
import { MINUS } from '#lib/core/number-format.js';
import { cross } from '#lib/geom-engine/plane.js';
import { unitOptions } from './arith-skills.js';
import { NAME_RUNS, polylineFigure, shapeAt } from './figures.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./figures.js').Figure} Figure */
/** @typedef {import('./figures.js').ShapeModel} ShapeModel */

/**
 * Drawings to count segments on, with their points as a position per letter
 * and their segments as pairs of letter positions.
 * @type {ReadonlyArray<{ at: [number, number][], join: [number, number][] }>}
 */
const SEGMENT_DRAWINGS = [
  {
    at: [
      [40, 70],
      [140, 70],
      [240, 70],
    ],
    join: [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
  },
  {
    at: [
      [140, 30],
      [240, 120],
      [40, 120],
    ],
    join: [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
  },
  {
    at: [
      [60, 30],
      [220, 30],
      [240, 120],
      [40, 120],
    ],
    join: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 3],
    ],
  },
  {
    at: [
      [60, 30],
      [220, 30],
      [240, 120],
      [40, 120],
    ],
    join: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 3],
      [0, 2],
    ],
  },
  {
    at: [
      [30, 110],
      [110, 35],
      [180, 110],
      [260, 35],
    ],
    join: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    at: [
      [140, 70],
      [50, 30],
      [230, 30],
      [140, 120],
    ],
    join: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
];

/** @type {ReviewSkill} */
export const segmentCountSkill = {
  id: 'doan-thang',
  label: 'Đếm đoạn thẳng',
  make(rand) {
    const drawing = pick(rand, SEGMENT_DRAWINGS);
    const letters = [...pick(rand, NAME_RUNS)];
    const dots = drawing.at.map(([x, y], i) => ({ name: letters[i], x, y, below: y > 90 }));
    const segments = drawing.join.map(
      ([p, q]) => /** @type {[string, string]} */ ([letters[p], letters[q]]),
    );
    const names = segments.map((s) => s.join('')).join(', ');
    return {
      prompt: 'Hình vẽ có mấy đoạn thẳng?',
      visual: {
        type: 'figure',
        figure: {
          w: 280,
          h: 150,
          dots,
          segments,
          say: `Các điểm ${letters.slice(0, dots.length).join(', ')}. Các đoạn nối: ${segments.map((s) => `${s[0]} với ${s[1]}`).join(', ')}.`,
        },
      },
      ...numberOptions(rand, segments.length, 1, 8),
      hint: 'Mỗi đoạn thẳng có hai đầu là hai điểm. Em kể tên từng đoạn, đừng quên đoạn nào.',
      solution: `Các đoạn thẳng là: ${names}. Hình vẽ có ${segments.length} đoạn thẳng.`,
    };
  },
};

/** Names of four segments, as the book uses them. */
const SEGMENT_NAMES = /** @type {const} */ (['AB', 'CD', 'MN', 'PQ']);

/**
 * The segments' lengths written in one sentence.
 * @param {readonly number[]} lengths
 */
function lengthsText(lengths) {
  return SEGMENT_NAMES.map((name, i) => `${name} dài ${lengths[i]} cm`).join(', ');
}

/** @type {ReviewSkill} */
export const measureSegmentSkill = {
  id: 'do-doan',
  label: 'Đo và so sánh đoạn thẳng',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant <= 1) {
      const from = variant === 0 ? 0 : int(rand, 1, 3);
      const len = int(rand, 3, 9);
      const to = from + len;
      const name = pick(rand, SEGMENT_NAMES);
      const [p, q] = [...name];
      return {
        prompt: `Đoạn thẳng ${name} dài bao nhiêu xăng-ti-mét?`,
        visual: { type: 'ruler', name, from, to },
        ...unitOptions(rand, len, 'cm', from > 0 ? [to, len + 1] : [len + 1, len - 1], 20),
        hint:
          from === 0
            ? `Đầu ${p} ở vạch 0. Em xem đầu ${q} ở vạch nào.`
            : `Đầu ${p} không ở vạch 0. Em đếm số xăng-ti-mét từ ${p} đến ${q}.`,
        solution:
          from === 0
            ? `Đầu ${p} ở vạch 0, đầu ${q} ở vạch ${to}. Đoạn thẳng ${name} dài ${len} cm.`
            : `Từ vạch ${from} đến vạch ${to} là: ${to} ${MINUS} ${from} = ${len} (cm). Đoạn thẳng ${name} dài ${len} cm.`,
      };
    }
    if (variant === 2) {
      const lengths = shuffle(rand, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 4);
      const longest = rand() < 0.5;
      const best = longest ? Math.max(...lengths) : Math.min(...lengths);
      const name = SEGMENT_NAMES[lengths.indexOf(best)];
      return {
        prompt: `${lengthsText(lengths)}. Đoạn thẳng nào ${longest ? 'dài nhất' : 'ngắn nhất'}?`,
        options: [...SEGMENT_NAMES],
        answer: lengths.indexOf(best),
        hint: longest
          ? 'Em tìm số lớn nhất trong bốn số đo.'
          : 'Em tìm số bé nhất trong bốn số đo.',
        solution: `${best} cm là số đo ${longest ? 'lớn nhất' : 'bé nhất'}. Đoạn thẳng ${name} ${longest ? 'dài nhất' : 'ngắn nhất'}.`,
      };
    }
    const [same, other1, other2] = shuffle(rand, [4, 5, 6, 7, 8, 9, 10, 11]);
    const lengths = shuffle(rand, [same, same, other1, other2]);
    const twins = SEGMENT_NAMES.filter((_, i) => lengths[i] === same);
    const right = twins.join(' và ');
    const pairs = ['AB và CD', 'AB và MN', 'AB và PQ', 'CD và MN', 'CD và PQ', 'MN và PQ'].filter(
      (p) => p !== right,
    );
    return {
      prompt: `${lengthsText(lengths)}. Hai đoạn thẳng nào dài bằng nhau?`,
      ...mixOptions(rand, right, shuffle(rand, pairs).slice(0, 2)),
      hint: 'Em tìm hai số đo giống nhau.',
      solution: `Đoạn thẳng ${twins[0]} và đoạn thẳng ${twins[1]} cùng dài ${same} cm.`,
    };
  },
};

/** Shapes with four sides. */
const QUADS = /** @type {const} */ (['square', 'rectangle', 'trapezoid', 'uneven', 'diamond']);

/** Shapes that do not have four sides. */
const NOT_QUADS = /** @type {const} */ (['triangle', 'pentagon', 'hexagon']);

/** Letters under a row of shapes. */
const ROW_LETTERS = /** @type {const} */ (['A', 'B', 'C', 'D']);

/**
 * A row of four shapes with a letter under each.
 * @param {readonly ShapeModel[]} models
 * @returns {Figure}
 */
function rowFigure(models) {
  const shapes = models.map((m, i) => shapeAt(m, 10 + i * 80, 8));
  return {
    w: 330,
    h: 104,
    shapes,
    texts: models.map((_, i) => ({ x: 45 + i * 80, y: 96, text: ROW_LETTERS[i] })),
    say: shapes.map((s, i) => `Hình ${ROW_LETTERS[i]} có ${s.length} cạnh`).join(', ') + '.',
  };
}

/** @type {ReviewSkill} */
export const quadSkill = {
  id: 'tu-giac',
  label: 'Nhận biết hình tứ giác',
  make(rand) {
    if (rand() < 0.5) {
      const others = shuffle(rand, [...NOT_QUADS]);
      const models = shuffle(rand, [pick(rand, QUADS), ...others]);
      const at = models.findIndex((m) => /** @type {readonly string[]} */ (QUADS).includes(m));
      return {
        prompt: 'Hình nào là hình tứ giác?',
        visual: { type: 'figure', figure: rowFigure(models) },
        options: ROW_LETTERS.map((l) => `Hình ${l}`),
        answer: at,
        hint: 'Em đếm số cạnh của từng hình. Hình tứ giác có 4 cạnh và 4 đỉnh.',
        solution: `Hình ${ROW_LETTERS[at]} có 4 cạnh và 4 đỉnh, nên là hình tứ giác.`,
      };
    }
    const models = Array.from({ length: 4 }, () =>
      pick(rand, /** @type {readonly ShapeModel[]} */ ([...QUADS, ...NOT_QUADS])),
    );
    const quads = models.filter((m) => /** @type {readonly string[]} */ (QUADS).includes(m)).length;
    return {
      prompt: 'Hình vẽ có mấy hình tứ giác?',
      visual: { type: 'figure', figure: rowFigure(models) },
      ...numberOptions(rand, quads, 0, 4),
      hint: 'Em đếm số cạnh của từng hình. Hình tứ giác có 4 cạnh và 4 đỉnh.',
      solution:
        quads === 0
          ? 'Không có hình nào có 4 cạnh, nên không có hình tứ giác nào.'
          : `Có ${quads} hình có 4 cạnh và 4 đỉnh. Hình vẽ có ${quads} hình tứ giác.`,
    };
  },
};

/**
 * Four grid points of which exactly three are collinear.
 * @param {() => number} rand
 * @returns {Array<{ x: number, y: number }>} the three collinear, then the other
 */
export function fourPoints(rand) {
  const DIRS = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
    [2, 1],
    [2, -1],
  ];
  for (;;) {
    const [dx, dy] = pick(rand, DIRS);
    const [t1, t2] = pick(rand, [
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
    const c = int(rand, 0, 6);
    const r = int(rand, 0, 3);
    const line = [
      { x: c, y: r },
      { x: c + t1 * dx, y: r + t1 * dy },
      { x: c + t2 * dx, y: r + t2 * dy },
    ];
    const off = { x: int(rand, 0, 6), y: int(rand, 0, 3) };
    if ([...line, off].some((p) => p.x < 0 || p.x > 6 || p.y < 0 || p.y > 3)) continue;
    if (cross(line[0], line[2], off) === 0) continue;
    return [...line, off];
  }
}

/** @type {ReviewSkill} */
export const collinearSkill = {
  id: 'thang-hang',
  label: 'Ba điểm thẳng hàng',
  make(rand) {
    const pts = fourPoints(rand);
    const letters = shuffle(rand, [...pick(rand, NAME_RUNS)]);
    const dots = pts.map((p, i) => ({ name: letters[i], x: 30 + p.x * 40, y: 30 + p.y * 40 }));
    /** @param {string[]} three */
    const trio = (three) => [...three].sort().join(', ');
    const right = trio(letters.slice(0, 3));
    const wrong = [0, 1, 2].map((skip) =>
      trio([...letters.slice(0, 3).filter((_, i) => i !== skip), letters[3]]),
    );
    const figure = {
      w: 300,
      h: 180,
      dots,
      say: `Bốn điểm trên lưới: ${pts
        .map((p, i) => `điểm ${letters[i]} ở hàng ${p.y + 1}, cột ${p.x + 1}`)
        .sort()
        .join('; ')}.`,
    };
    return {
      prompt: 'Ba điểm nào thẳng hàng?',
      visual: { type: 'figure', figure },
      ...mixOptions(rand, right, wrong),
      hint: 'Em đặt thước qua từng cặp điểm và tìm điểm thứ ba nằm trên mép thước.',
      solution: `Ba điểm ${right} cùng nằm trên một đường thẳng, còn điểm ${letters[3]} ở ngoài. Ba điểm ${right} thẳng hàng.`,
    };
  },
};

/** @type {ReviewSkill} */
export const partSegmentSkill = {
  id: 'mot-phan-doan',
  label: 'Tính độ dài một đoạn thẳng',
  make(rand) {
    const whole = int(rand, 8, 20);
    const part = int(rand, 3, whole - 3);
    const rest = whole - part;
    const midX = 30 + Math.round((part / whole) * 240);
    const figure = {
      w: 300,
      h: 110,
      dots: [
        { name: 'A', x: 30, y: 50 },
        { name: 'B', x: midX, y: 50 },
        { name: 'C', x: 270, y: 50 },
      ],
      segments: /** @type {[string, string][]} */ ([
        ['A', 'B'],
        ['B', 'C'],
      ]),
      texts: [
        { x: (30 + midX) / 2, y: 72, text: `${part} cm` },
        { x: (midX + 270) / 2, y: 72, text: '? cm' },
        { x: 150, y: 100, text: `Cả đoạn AC: ${whole} cm` },
      ],
      say: `Điểm B nằm giữa A và C. Đoạn AB dài ${part} cm. Đoạn AC dài ${whole} cm.`,
    };
    return {
      prompt: `Đoạn thẳng AC dài ${whole} cm. Đoạn thẳng AB dài ${part} cm. Đoạn thẳng BC dài bao nhiêu xăng-ti-mét?`,
      visual: { type: 'figure', figure },
      ...unitOptions(rand, rest, 'cm', [whole + part, rest + 1, rest - 1]),
      hint: 'Đoạn AC gồm đoạn AB và đoạn BC. Biết cả đoạn và một phần, em làm phép trừ.',
      solution: `Độ dài đoạn thẳng BC là: ${whole} ${MINUS} ${part} = ${rest} (cm).`,
    };
  },
};

/** @type {ReviewSkill} */
export const polylineSkill = {
  id: 'gap-khuc',
  label: 'Độ dài đường gấp khúc',
  make(rand) {
    if (rand() < 0.3) {
      const [a, b] = [int(rand, 21, 59), int(rand, 21, 39)];
      const [c, d, e] = [int(rand, 11, 39), int(rand, 11, 29), int(rand, 11, 29)];
      const first = a + b;
      let third = e;
      if (c + d + third === first) third += 1;
      const second = c + d + third;
      const shorter = rand() < 0.5;
      const firstWins = shorter === first < second;
      return {
        prompt: `Có hai đường đến chỗ miếng bánh. Đường ABC gồm đoạn ${a} cm và đoạn ${b} cm. Đường MNPQ gồm đoạn ${c} cm, đoạn ${d} cm và đoạn ${third} cm. Kiến đi đường nào thì ${shorter ? 'ngắn hơn' : 'dài hơn'}?`,
        options: ['Đường ABC', 'Đường MNPQ'],
        answer: firstWins ? 0 : 1,
        hint: 'Em tính độ dài mỗi đường gấp khúc, rồi so sánh hai số.',
        solution: `Đường ABC dài: ${a} + ${b} = ${first} (cm). Đường MNPQ dài: ${c} + ${d} + ${third} = ${second} (cm). Đường ${firstWins ? 'ABC' : 'MNPQ'} ${shorter ? 'ngắn hơn' : 'dài hơn'}.`,
      };
    }
    const parts = int(rand, 2, 3);
    const names = pick(rand, NAME_RUNS).slice(0, parts + 1);
    const lengths = Array.from({ length: parts }, () => int(rand, 2, 9));
    const total = lengths.reduce((s, x) => s + x, 0);
    return {
      prompt: `Đường gấp khúc ${names} dài bao nhiêu xăng-ti-mét?`,
      visual: { type: 'figure', figure: polylineFigure(names, lengths) },
      ...unitOptions(rand, total, 'cm', [total - lengths[0], total + 1], 40),
      hint: 'Em cộng độ dài tất cả các đoạn thẳng của đường gấp khúc.',
      solution: `Độ dài đường gấp khúc ${names} là: ${lengths.join(' + ')} = ${total} (cm).`,
    };
  },
};

/**
 * The repeating groups of a pattern, as positions of distinct shapes; the
 * book's pattern repeats four shapes with one of them twice.
 */
const UNITS = [
  [0, 1, 2],
  [0, 0, 1],
  [0, 1, 1],
  [0, 1, 1, 2],
  [0, 1, 2, 3],
  [0, 1, 0, 2],
];

/**
 * A shape's name with a capital letter.
 * @param {import('#lib/core/kid/shapes.js').ShapeKind} kind
 */
function title(kind) {
  const name = FIGURE_NAMES[kind];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** @type {ReviewSkill} */
export const patternSkill = {
  id: 'quy-luat',
  label: 'Tìm hình theo quy luật',
  make(rand) {
    const kinds = shuffle(rand, [...SHAPES]);
    const unit = pick(rand, UNITS).map((i) => kinds[i]);
    const length = unit.length * 2 + int(rand, 0, unit.length - 1);
    const figures = Array.from({ length }, (_, i) => unit[i % unit.length]);
    const next = unit[length % unit.length];
    return {
      prompt: 'Hình nào thay cho dấu hỏi?',
      visual: { type: 'pattern', figures },
      ...mixOptions(rand, title(next), kinds.filter((k) => k !== next).map(title)),
      hint: 'Em tìm nhóm hình cứ lặp đi lặp lại.',
      solution: `Nhóm hình lặp lại là: ${unit.map((k) => FIGURE_NAMES[k]).join(', ')}. Hình thay cho dấu hỏi là ${FIGURE_NAMES[next]}.`,
    };
  },
};

/** Rectangle corners used by the figures to count. */
const BOX = [
  { x: 30, y: 15 },
  { x: 210, y: 15 },
  { x: 210, y: 105 },
  { x: 30, y: 105 },
];

/**
 * Figures to count in: `ask` names what is counted, `count` the answer and
 * `why` how the book counts it, single pieces first.
 * @type {ReadonlyArray<{ ask: string, count: number, why: string, shape: { x: number, y: number }[], strokes: { x: number, y: number }[][], say: string }>}
 */
const COUNT_FIGURES = [
  {
    ask: 'hình tam giác',
    count: 3,
    why: 'Có 2 hình tam giác nhỏ và 1 hình tam giác to gồm cả hai hình nhỏ: 2 + 1 = 3.',
    shape: [
      { x: 120, y: 10 },
      { x: 220, y: 110 },
      { x: 20, y: 110 },
    ],
    strokes: [
      [
        { x: 120, y: 10 },
        { x: 120, y: 110 },
      ],
    ],
    say: 'Một hình tam giác được một đoạn thẳng từ đỉnh chia thành hai phần.',
  },
  {
    ask: 'hình tam giác',
    count: 6,
    why: 'Có 3 hình một mảnh, 2 hình ghép từ hai mảnh và 1 hình ghép từ ba mảnh: 3 + 2 + 1 = 6.',
    shape: [
      { x: 120, y: 10 },
      { x: 220, y: 110 },
      { x: 20, y: 110 },
    ],
    strokes: [
      [
        { x: 120, y: 10 },
        { x: 87, y: 110 },
      ],
      [
        { x: 120, y: 10 },
        { x: 153, y: 110 },
      ],
    ],
    say: 'Một hình tam giác được hai đoạn thẳng từ đỉnh chia thành ba phần.',
  },
  {
    ask: 'hình tam giác',
    count: 2,
    why: 'Đường chéo chia hình chữ nhật thành 2 hình tam giác.',
    shape: BOX,
    strokes: [[BOX[0], BOX[2]]],
    say: 'Một hình chữ nhật có một đường chéo.',
  },
  {
    ask: 'hình tứ giác',
    count: 3,
    why: 'Có 2 hình nhỏ và 1 hình to gồm cả hai hình nhỏ: 2 + 1 = 3.',
    shape: BOX,
    strokes: [
      [
        { x: 120, y: 15 },
        { x: 120, y: 105 },
      ],
    ],
    say: 'Một hình chữ nhật được một đoạn thẳng dọc chia thành hai phần.',
  },
  {
    ask: 'hình tứ giác',
    count: 6,
    why: 'Có 3 hình một mảnh, 2 hình ghép từ hai mảnh và 1 hình ghép từ ba mảnh: 3 + 2 + 1 = 6.',
    shape: BOX,
    strokes: [
      [
        { x: 90, y: 15 },
        { x: 90, y: 105 },
      ],
      [
        { x: 150, y: 15 },
        { x: 150, y: 105 },
      ],
    ],
    say: 'Một hình chữ nhật được hai đoạn thẳng dọc chia thành ba phần.',
  },
  {
    ask: 'hình tứ giác',
    count: 1,
    why: 'Đường chéo chia hình chữ nhật thành 2 hình tam giác. Chỉ có 1 hình tứ giác là hình chữ nhật to.',
    shape: BOX,
    strokes: [[BOX[1], BOX[3]]],
    say: 'Một hình chữ nhật có một đường chéo.',
  },
];

/** @type {ReviewSkill} */
export const countShapesSkill = {
  id: 'dem-hinh',
  label: 'Đếm hình, xếp hình',
  make(rand) {
    if (rand() < 0.3) {
      const rows = int(rand, 2, 3);
      // As many columns as rows would draw a square, not a rectangle.
      const cols = pick(
        rand,
        [2, 3, 4].filter((c) => c !== rows),
      );
      const size = 30;
      const left = 20;
      const top = 10;
      const strokes = [
        ...Array.from({ length: cols - 1 }, (_, i) => [
          { x: left + size * (i + 1), y: top },
          { x: left + size * (i + 1), y: top + rows * size },
        ]),
        ...Array.from({ length: rows - 1 }, (_, i) => [
          { x: left, y: top + size * (i + 1) },
          { x: left + cols * size, y: top + size * (i + 1) },
        ]),
      ];
      const total = rows * cols;
      return {
        prompt: 'Cần bao nhiêu hình vuông nhỏ để xếp thành hình chữ nhật này?',
        visual: {
          type: 'figure',
          figure: {
            w: left * 2 + cols * size,
            h: top * 2 + rows * size,
            shapes: [
              [
                { x: left, y: top },
                { x: left + cols * size, y: top },
                { x: left + cols * size, y: top + rows * size },
                { x: left, y: top + rows * size },
              ],
            ],
            strokes,
            say: `Hình chữ nhật gồm ${rows} hàng, mỗi hàng ${cols} hình vuông nhỏ.`,
          },
        },
        ...numberOptions(rand, total, 1, 12),
        hint: 'Em đếm từng hàng, rồi cộng số hình vuông của các hàng lại.',
        solution: `Có ${rows} hàng, mỗi hàng ${cols} hình vuông: ${Array.from({ length: rows }, () => cols).join(' + ')} = ${total}. Cần ${total} hình vuông.`,
      };
    }
    const f = pick(rand, COUNT_FIGURES);
    return {
      prompt: `Hình vẽ có mấy ${f.ask}?`,
      visual: {
        type: 'figure',
        figure: { w: 240, h: 120, shapes: [f.shape], strokes: f.strokes, say: f.say },
      },
      ...numberOptions(rand, f.count, 1, 8),
      hint: 'Em đếm cả các hình nhỏ và các hình ghép từ nhiều hình nhỏ.',
      solution: f.why,
    };
  },
};

/** The parts of the review of plane shapes. */
export const SHAPE_SKILLS = [
  segmentCountSkill,
  measureSegmentSkill,
  quadSkill,
  collinearSkill,
  partSegmentSkill,
  polylineSkill,
  patternSkill,
  countShapesSkill,
];
