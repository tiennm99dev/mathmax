/**
 * Review questions on geometry: counting segments and curves, telling and
 * counting quadrilaterals, naming solids, three collinear points, measuring
 * with a ruler, joined segments, the length of a polyline and comparing two
 * routes. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { cross } from '#lib/geom-engine/plane.js';
import { NAME_RUNS, polylineFigure, shapeAt } from './figures.js';
import { unitOptions } from './options.js';
import { SOLID_KINDS, SOLID_NAMES, THINGS } from './solids.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./figures.js').Figure} Figure */
/** @typedef {import('./figures.js').ShapeModel} ShapeModel */

/**
 * Drawings to count segments on: each point with its place and where its name
 * sits, and the segments as pairs of point positions. The last one is the
 * book's, three points joined with a fourth inside.
 * @type {ReadonlyArray<{ at: [number, number, boolean][], join: [number, number][] }>}
 */
const SEGMENT_DRAWINGS = [
  {
    at: [
      [140, 30, false],
      [240, 120, true],
      [40, 120, true],
    ],
    join: [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
  },
  {
    at: [
      [60, 30, false],
      [220, 30, false],
      [240, 120, true],
      [40, 120, true],
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
      [60, 30, false],
      [220, 30, false],
      [240, 120, true],
      [40, 120, true],
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
      [30, 110, true],
      [110, 35, false],
      [180, 110, true],
      [260, 35, false],
    ],
    join: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    at: [
      [140, 30, false],
      [40, 125, true],
      [240, 125, true],
      [150, 85, true],
    ],
    join: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [1, 2],
    ],
  },
];

/**
 * Curves and straight strokes side by side, in a shuffled order.
 * @param {() => number} rand
 * @param {number} curves
 * @param {number} straights
 * @returns {Figure}
 */
function curvesFigure(rand, curves, straights) {
  const kinds = shuffle(rand, [
    ...Array.from({ length: curves }, () => 'đường cong'),
    ...Array.from({ length: straights }, () => 'đường thẳng'),
  ]);
  const xs = kinds.map((_, i) => 30 + i * 50);
  return {
    w: 320,
    h: 140,
    curves: kinds.flatMap((kind, i) =>
      kind === 'đường cong'
        ? [
            /** @type {[{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }]} */ ([
              { x: xs[i], y: 20 },
              { x: xs[i] + 45, y: 70 },
              { x: xs[i], y: 120 },
            ]),
          ]
        : [],
    ),
    strokes: kinds.flatMap((kind, i) =>
      kind === 'đường thẳng'
        ? [
            [
              { x: xs[i], y: 20 },
              { x: xs[i] + 20, y: 120 },
            ],
          ]
        : [],
    ),
    say: `Từ trái sang phải: ${kinds.join(', ')}.`,
  };
}

/** @type {ReviewSkill} */
export const countLinesSkill = {
  id: 'dem-duong',
  label: 'Đếm đoạn thẳng, đường cong',
  make(rand) {
    if (rand() < 0.3) {
      const curves = int(rand, 1, 4);
      const straights = int(rand, 1, 6 - curves);
      return {
        prompt: 'Hình vẽ có mấy đường cong?',
        visual: { type: 'figure', figure: curvesFigure(rand, curves, straights) },
        ...numberOptions(rand, curves, 0, 6),
        hint: 'Đường cong uốn lượn, không thẳng như mép thước. Em đếm từng đường cong.',
        solution: `Hình vẽ có ${curves} đường cong và ${straights} đường thẳng.`,
      };
    }
    const drawing = pick(rand, SEGMENT_DRAWINGS);
    const letters = [...pick(rand, NAME_RUNS)];
    const dots = drawing.at.map(([x, y, below], i) => ({ name: letters[i], x, y, below }));
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

/**
 * A rectangle cut into `pieces` numbered parts side by side.
 * @param {number} pieces
 * @returns {Figure}
 */
function stripFigure(pieces) {
  const [x0, x1, y0, y1] = [30, 270, 15, 95];
  const width = (x1 - x0) / pieces;
  return {
    w: 300,
    h: 110,
    shapes: [
      [
        { x: x0, y: y0 },
        { x: x1, y: y0 },
        { x: x1, y: y1 },
        { x: x0, y: y1 },
      ],
    ],
    strokes: Array.from({ length: pieces - 1 }, (_, i) => [
      { x: x0 + (i + 1) * width, y: y0 },
      { x: x0 + (i + 1) * width, y: y1 },
    ]),
    texts: Array.from({ length: pieces }, (_, i) => ({
      x: x0 + (i + 0.5) * width,
      y: 60,
      text: String(i + 1),
    })),
    say: `Một hình chữ nhật được chia thành ${pieces} phần, đánh số từ 1 đến ${pieces} từ trái sang phải.`,
  };
}

/** @type {ReviewSkill} */
export const quadSkill = {
  id: 'tu-giac',
  label: 'Hình tứ giác',
  make(rand) {
    const shape = int(rand, 0, 2);
    if (shape === 0) {
      const models = shuffle(rand, [pick(rand, QUADS), ...NOT_QUADS]);
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
    if (shape === 1) {
      const models = Array.from({ length: 4 }, () =>
        pick(rand, /** @type {readonly ShapeModel[]} */ ([...QUADS, ...NOT_QUADS])),
      );
      const quads = models.filter((m) =>
        /** @type {readonly string[]} */ (QUADS).includes(m),
      ).length;
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
    }
    const pieces = int(rand, 2, 3);
    const total = (pieces * (pieces + 1)) / 2;
    return {
      prompt: 'Hình vẽ có tất cả mấy hình tứ giác?',
      visual: { type: 'figure', figure: stripFigure(pieces) },
      ...numberOptions(rand, total, 1, 8),
      hint: 'Em đếm các hình một phần, rồi các hình ghép từ nhiều phần liền nhau.',
      solution:
        pieces === 2
          ? 'Có hình 1, hình 2 và hình ghép 1 với 2: 2 + 1 = 3 hình tứ giác.'
          : 'Có 3 hình một phần, 2 hình ghép từ hai phần và 1 hình ghép từ ba phần: 3 + 2 + 1 = 6 hình tứ giác.',
    };
  },
};

/** @type {ReviewSkill} */
export const solidsSkill = {
  id: 'khoi',
  label: 'Khối trụ, khối cầu',
  make(rand) {
    if (rand() < 0.5) {
      const kinds = shuffle(rand, [...SOLID_KINDS]);
      const wanted = pick(rand, /** @type {const} */ (['tru', 'cau']));
      const at = kinds.indexOf(wanted);
      return {
        prompt: `Hình nào là ${SOLID_NAMES[wanted]}?`,
        visual: { type: 'solids', kinds },
        options: ROW_LETTERS.map((l) => `Hình ${l}`),
        answer: at,
        hint:
          wanted === 'tru'
            ? 'Khối trụ có thân tròn và hai mặt đáy tròn, như lon sữa.'
            : 'Khối cầu tròn đều về mọi phía, như quả bóng.',
        solution: `Hình ${ROW_LETTERS[at]} là ${SOLID_NAMES[wanted]}.`,
      };
    }
    const thing = pick(rand, THINGS);
    const names = SOLID_KINDS.map((k) => capitalize(SOLID_NAMES[k]));
    return {
      prompt: `${thing.name} có dạng khối gì?`,
      options: names,
      answer: SOLID_KINDS.indexOf(thing.kind),
      hint: 'Em nhớ lại hình dạng của vật đó: có tròn đều không, có mấy mặt phẳng?',
      solution: `${thing.name} có dạng ${SOLID_NAMES[thing.kind]}.`,
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

/** Names of segments, as the book uses them. */
const SEGMENT_NAMES = /** @type {const} */ (['AB', 'CD', 'MN', 'PQ']);

/** @type {ReviewSkill} */
export const rulerSkill = {
  id: 'do-doan',
  label: 'Đo đoạn thẳng',
  make(rand) {
    const from = rand() < 0.5 ? 0 : int(rand, 1, 3);
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
  },
};

/** @type {ReviewSkill} */
export const joinedSegmentsSkill = {
  id: 'doan-ghep',
  label: 'Tính độ dài đoạn thẳng',
  make(rand) {
    const part = int(rand, 3, 40);
    const rest = int(rand, 3, 40);
    const whole = part + rest;
    const midX = 30 + Math.round((part / whole) * 240);
    const asksWhole = rand() < 0.5;
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
        { x: (midX + 270) / 2, y: 72, text: asksWhole ? `${rest} cm` : '? cm' },
        { x: 150, y: 100, text: asksWhole ? 'Cả đoạn AC: ? cm' : `Cả đoạn AC: ${whole} cm` },
      ],
      say: asksWhole
        ? `Điểm B nằm giữa A và C. Đoạn AB dài ${part} cm. Đoạn BC dài ${rest} cm.`
        : `Điểm B nằm giữa A và C. Đoạn AB dài ${part} cm. Đoạn AC dài ${whole} cm.`,
    };
    if (asksWhole) {
      return {
        prompt: `Đoạn thẳng AB dài ${part} cm. Đoạn thẳng BC dài ${rest} cm. Đoạn thẳng AC dài bao nhiêu xăng-ti-mét?`,
        visual: { type: 'figure', figure },
        ...unitOptions(rand, whole, 'cm', [Math.abs(part - rest), whole + 1, whole - 1]),
        hint: 'Đoạn AC gồm đoạn AB và đoạn BC, nên em làm phép cộng.',
        solution: `Độ dài đoạn thẳng AC là: ${part} + ${rest} = ${whole} (cm).`,
      };
    }
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
    const parts = int(rand, 2, 3);
    const names = pick(rand, NAME_RUNS).slice(0, parts + 1);
    const lengths = Array.from({ length: parts }, () => int(rand, 3, 25));
    const total = lengths.reduce((s, n) => s + n, 0);
    return {
      prompt: `Đường gấp khúc ${names} dài bao nhiêu xăng-ti-mét?`,
      visual: { type: 'figure', figure: polylineFigure(names, lengths) },
      ...unitOptions(rand, total, 'cm', [total + 1, total - 1, total - lengths[0]]),
      hint: 'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng của nó.',
      solution: `Độ dài đường gấp khúc ${names} là: ${lengths.join(' + ')} = ${total} (cm).`,
    };
  },
};

/** @type {ReviewSkill} */
export const routesSkill = {
  id: 'hai-duong',
  label: 'So sánh hai đường đi',
  make(rand) {
    const [a, b, c] = [int(rand, 8, 30), int(rand, 8, 30), int(rand, 8, 30)];
    let d = int(rand, 8, 30);
    if (c + d === a + b) d += 1;
    const [top, low] = [a + b, c + d];
    const shorter = rand() < 0.5;
    const topWins = shorter === top < low;
    const word = shorter ? 'ngắn hơn' : 'dài hơn';
    const figure = {
      w: 320,
      h: 170,
      dots: [
        { name: 'M', x: 30, y: 85, below: true },
        { name: 'A', x: 160, y: 35 },
        { name: 'N', x: 290, y: 85, below: true },
        { name: 'B', x: 160, y: 135, below: true },
      ],
      segments: /** @type {[string, string][]} */ ([
        ['M', 'A'],
        ['A', 'N'],
        ['M', 'B'],
        ['B', 'N'],
      ]),
      texts: [
        { x: 75, y: 48, text: `${a} cm` },
        { x: 245, y: 48, text: `${b} cm` },
        { x: 75, y: 132, text: `${c} cm` },
        { x: 245, y: 132, text: `${d} cm` },
      ],
      say: `Đường MAN gồm đoạn MA dài ${a} cm và đoạn AN dài ${b} cm. Đường MBN gồm đoạn MB dài ${c} cm và đoạn BN dài ${d} cm.`,
    };
    return {
      prompt: `Ốc sên bò từ M đến N. Đường nào ${word}?`,
      visual: { type: 'figure', figure },
      options: ['Đường MAN', 'Đường MBN'],
      answer: topWins ? 0 : 1,
      hint: 'Em tính độ dài mỗi đường, rồi so sánh hai số.',
      solution: `Đường MAN dài: ${a} + ${b} = ${top} (cm). Đường MBN dài: ${c} + ${d} = ${low} (cm). Đường ${topWins ? 'MAN' : 'MBN'} ${word}.`,
    };
  },
};

/** The parts of the review of geometry. */
export const GEOMETRY_SKILLS = [
  countLinesSkill,
  quadSkill,
  solidsSkill,
  collinearSkill,
  rulerSkill,
  joinedSegmentsSkill,
  polylineSkill,
  routesSkill,
];
