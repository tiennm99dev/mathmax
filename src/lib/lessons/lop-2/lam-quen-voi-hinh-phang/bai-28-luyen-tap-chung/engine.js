/**
 * The mixed practice round of "Luyện tập chung" for the chapter "Làm quen với
 * hình phẳng": segments, lines and curves, collinear points, polyline length,
 * counting quadrilaterals and word problems. Questions are built from a seed,
 * so the first round is the same on the server and in the browser. Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { NAME_RUNS, areCollinear, polylineFigure, shapeAt, wave } from '../_shared/figures.js';

/** @typedef {import('../_shared/figures.js').Figure} Figure */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Figure>} Asked */
/** @typedef {'doan-thang' | 'duong' | 'thang-hang' | 'gap-khuc' | 'tu-giac' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'doan-thang',
  'duong',
  'thang-hang',
  'gap-khuc',
  'tu-giac',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'doan-thang': 'Gọi tên đoạn thẳng',
  duong: 'Đường thẳng, đường cong',
  'thang-hang': 'Ba điểm thẳng hàng',
  'gap-khuc': 'Đường gấp khúc',
  'tu-giac': 'Đếm hình tứ giác',
  'bai-toan': 'Giải bài toán',
});

/**
 * Number options near `right`, written with a unit.
 * @param {() => number} rand
 * @param {number} right
 * @param {string} unit
 * @param {number} lo
 * @param {number} hi
 */
function unitOptions(rand, right, unit, lo, hi) {
  const { options, answer } = numberOptions(rand, right, lo, hi);
  return { options: options.map((o) => `${o} ${unit}`), answer };
}

/**
 * Three letters from one run.
 * @param {() => number} rand
 * @returns {string[]}
 */
function threeLetters(rand) {
  return [...pick(rand, NAME_RUNS)].slice(0, 3);
}

/**
 * Naming the segments of a triangle or of three collinear points, or counting
 * segments among loose points.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function segmentQuestion(rand) {
  const variant = int(rand, 0, 2);
  const [a, b, c] = threeLetters(rand);
  if (variant === 2) {
    const count = int(rand, 1, 3);
    const letters = [...'ABCDEGH'];
    /** @type {Array<{ name: string, x: number, y: number }>} */
    const dots = [];
    /** @type {Array<[string, string]>} */
    const segments = [];
    for (let i = 0; i < count; i++) {
      const [p, q] = [letters[2 * i], letters[2 * i + 1]];
      dots.push({ name: p, x: 30, y: 30 + i * 40 }, { name: q, x: 170, y: 30 + i * 40 });
      segments.push([p, q]);
    }
    dots.push({ name: letters[2 * count], x: 230, y: 50 });
    return {
      prompt: 'Hình vẽ có mấy đoạn thẳng?',
      visual: { w: 280, h: 40 * count + 30, dots, segments },
      ...numberOptions(rand, count, 0, 5),
      hint: 'Đoạn thẳng nối hai điểm. Điểm đứng một mình không phải là đoạn thẳng.',
      solution: `Các đoạn thẳng: ${segments.map((s) => s.join('')).join(', ')}. Có ${count} đoạn thẳng.`,
    };
  }
  /** @type {Array<[string, string]>} */
  const segments = [
    [a, b],
    [b, c],
    [a, c],
  ];
  const right = `${a}${b}, ${b}${c}, ${a}${c}`;
  const wrong = [`${a}${b}, ${b}${c}`, `${a}${c}`, `${a}${b}, ${a}${c}`];
  const dots =
    variant === 0
      ? [
          { name: a, x: 40, y: 80 },
          { name: b, x: 140, y: 80 },
          { name: c, x: 240, y: 80 },
        ]
      : [
          { name: a, x: 140, y: 30 },
          { name: b, x: 240, y: 110 },
          { name: c, x: 40, y: 110 },
        ];
  return {
    prompt: 'Hình vẽ có những đoạn thẳng nào?',
    visual: { w: 280, h: 130, dots, segments },
    ...mixOptions(rand, right, wrong),
    hint:
      variant === 0
        ? 'Đừng quên đoạn thẳng đi từ điểm đầu đến điểm cuối, qua điểm ở giữa.'
        : 'Mỗi cặp điểm được nối với nhau là một đoạn thẳng.',
    solution: `Có ba đoạn thẳng: ${right}.`,
  };
}

/** Height of one row in a drawing of several lines. */
const ROW_H = 44;

/**
 * Telling a line, a segment and a curve apart, or counting the curves.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function lineQuestion(rand) {
  if (rand() < 0.5) {
    const curves = int(rand, 1, 3);
    const rows = shuffle(rand, [
      ...Array.from({ length: curves }, () => 'cong'),
      ...Array.from({ length: 4 - curves }, () => 'thang'),
    ]);
    const letters = [...'ABCDEG'];
    /** @type {Figure} */
    const visual = { w: 280, h: rows.length * ROW_H + 10, dots: [], lines: [], curves: [] };
    rows.forEach((row, i) => {
      const y = 28 + i * ROW_H;
      if (row === 'cong') visual.curves?.push({ d: wave(y, 20, 260, 26) });
      else {
        const [p, q] = letters.splice(0, 2);
        visual.dots?.push({ name: p, x: 90, y }, { name: q, x: 190, y });
        visual.lines?.push([p, q]);
      }
    });
    return {
      prompt: 'Hình vẽ có mấy đường cong?',
      visual,
      ...numberOptions(rand, curves, 0, 4),
      hint: 'Đường cong uốn lượn, không thẳng. Em đếm từng đường.',
      solution: `Có ${curves} đường uốn cong, còn lại là đường thẳng. Hình vẽ có ${curves} đường cong.`,
    };
  }
  const [a, b] = threeLetters(rand);
  const type = int(rand, 0, 2);
  const y = 50;
  /** @type {Figure} */
  const visual =
    type === 0
      ? {
          w: 280,
          h: 80,
          dots: [
            { name: a, x: 50, y },
            { name: b, x: 230, y },
          ],
          segments: [[a, b]],
        }
      : type === 1
        ? {
            w: 280,
            h: 80,
            dots: [
              { name: a, x: 90, y },
              { name: b, x: 190, y },
            ],
            lines: [[a, b]],
          }
        : { w: 280, h: 80, curves: [{ d: wave(y - 6, 20, 260, 34) }] };
  const names = ['Đoạn thẳng', 'Đường thẳng', 'Đường cong'];
  const reasons = [
    'Đường này thẳng và dừng lại ở hai điểm, nên là đoạn thẳng.',
    'Đường này thẳng và kéo dài về hai phía, nên là đường thẳng.',
    'Đường này uốn cong, nên là đường cong.',
  ];
  return {
    prompt: 'Hình vẽ là gì?',
    visual,
    options: names,
    answer: type,
    hint: 'Đường có thẳng không? Nếu thẳng, nó có dừng lại ở hai điểm không?',
    solution: reasons[type],
  };
}

/**
 * Four points of which exactly three are collinear.
 * @param {() => number} rand
 * @returns {Array<{ x: number, y: number }>} the three collinear, then the other
 */
function fourPoints(rand) {
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
    const all = [...line, off];
    if (all.some((p) => p.x < 0 || p.x > 6 || p.y < 0 || p.y > 3)) continue;
    if (line.some((p) => p.x === off.x && p.y === off.y)) continue;
    if (areCollinear(line[0], line[1], off)) continue;
    if (areCollinear(line[0], line[2], off)) continue;
    if (areCollinear(line[1], line[2], off)) continue;
    return all;
  }
}

/**
 * Which three of four points are collinear, or whether a named three are.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function collinearQuestion(rand) {
  const pts = fourPoints(rand);
  const letters = shuffle(rand, [...pick(rand, NAME_RUNS)]);
  const dots = pts.map((p, i) => ({
    name: letters[i],
    x: 30 + p.x * 40,
    y: 30 + p.y * 40,
  }));
  /** @param {string[]} three */
  const trio = (three) => [...three].sort().join(', ');
  const right = trio(letters.slice(0, 3));
  const visual = { w: 300, h: 180, dots };
  if (rand() < 0.5) {
    const statedRight = rand() < 0.5;
    const stated = statedRight ? right : trio([letters[3], letters[0], letters[1]]);
    return {
      prompt: `Ba điểm ${stated} thẳng hàng. Đúng hay sai?`,
      visual,
      options: ['Đúng', 'Sai'],
      answer: statedRight ? 0 : 1,
      hint: 'Em đặt thước qua hai trong ba điểm rồi nhìn điểm còn lại.',
      solution: `Ba điểm ${right} cùng nằm trên một đường thẳng, còn điểm ${letters[3]} ở ngoài đường thẳng đó.`,
    };
  }
  const wrong = [0, 1, 2].map((skip) =>
    trio([...letters.slice(0, 3).filter((_, i) => i !== skip), letters[3]]),
  );
  return {
    prompt: 'Ba điểm nào thẳng hàng?',
    visual,
    ...mixOptions(rand, right, wrong),
    hint: 'Em đặt thước qua từng cặp điểm và tìm điểm thứ ba nằm trên mép thước.',
    solution: `Ba điểm ${right} cùng nằm trên một đường thẳng, nên thẳng hàng.`,
  };
}

/**
 * The length of a drawn polyline, or how many parts it has.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function polylineQuestion(rand) {
  const parts = int(rand, 2, 3);
  const names = pick(rand, NAME_RUNS).slice(0, parts + 1);
  const lengths = Array.from({ length: parts }, () => int(rand, 2, 9));
  const visual = polylineFigure(names, lengths);
  if (rand() < 0.3) {
    return {
      prompt: `Đường gấp khúc ${names} gồm mấy đoạn thẳng?`,
      visual,
      ...numberOptions(rand, parts, 1, 5),
      hint: 'Em đếm các đoạn thẳng, không đếm các điểm.',
      solution: `Đường gấp khúc ${names} gồm ${parts} đoạn thẳng.`,
    };
  }
  const total = lengths.reduce((s, x) => s + x, 0);
  return {
    prompt: `Đường gấp khúc ${names} dài bao nhiêu xăng-ti-mét?`,
    visual,
    ...unitOptions(rand, total, 'cm', 1, 40),
    hint: 'Em cộng độ dài các đoạn thẳng lại.',
    solution: `Độ dài đường gấp khúc ${names} là: ${lengths.join(' + ')} = ${total} (cm).`,
  };
}

/** Figures cut by one stroke, with the quadrilaterals a child can count. */
const CUT_FIGURES = /** @type {const} */ ([
  {
    id: 'doc',
    quads: 3,
    stroke: [
      { x: 120, y: 10 },
      { x: 120, y: 90 },
    ],
    corners: [
      { x: 40, y: 10 },
      { x: 200, y: 10 },
      { x: 200, y: 90 },
      { x: 40, y: 90 },
    ],
    why: 'Có 2 hình nhỏ và 1 hình to gồm cả hai hình nhỏ: 2 + 1 = 3.',
  },
  {
    id: 'nghieng',
    quads: 3,
    stroke: [
      { x: 90, y: 10 },
      { x: 150, y: 90 },
    ],
    corners: [
      { x: 40, y: 10 },
      { x: 200, y: 10 },
      { x: 200, y: 90 },
      { x: 40, y: 90 },
    ],
    why: 'Có 2 hình tứ giác nhỏ và 1 hình to gồm cả hai hình nhỏ: 2 + 1 = 3.',
  },
  {
    id: 'cheo',
    quads: 1,
    stroke: [
      { x: 80, y: 10 },
      { x: 160, y: 90 },
    ],
    corners: [
      { x: 80, y: 10 },
      { x: 160, y: 10 },
      { x: 160, y: 90 },
      { x: 80, y: 90 },
    ],
    why: 'Đường chéo chia hình vuông thành 2 hình tam giác. Chỉ có 1 hình tứ giác là hình vuông to.',
  },
]);

/** Shapes a row of figures can show, by model name. */
const ROW_MODELS = /** @type {const} */ ([
  'triangle',
  'square',
  'rectangle',
  'trapezoid',
  'uneven',
  'diamond',
  'pentagon',
]);

/**
 * Counting quadrilaterals in a row of shapes, or in a shape cut in two.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function quadQuestion(rand) {
  if (rand() < 0.35) {
    const cut = pick(rand, CUT_FIGURES);
    return {
      prompt: 'Hình vẽ có mấy hình tứ giác?',
      visual: { w: 240, h: 100, shapes: [[...cut.corners]], strokes: [[...cut.stroke]] },
      ...numberOptions(rand, cut.quads, 0, 5),
      hint: 'Em đếm cả các hình nhỏ và hình to. Hình tứ giác có bốn cạnh.',
      solution: cut.why,
    };
  }
  const models = Array.from({ length: 4 }, () => pick(rand, ROW_MODELS));
  const quads = models.filter((m) => m !== 'triangle' && m !== 'pentagon').length;
  return {
    prompt: 'Hình vẽ có mấy hình tứ giác?',
    visual: {
      w: 330,
      h: 90,
      shapes: models.map((m, i) => shapeAt(m, 10 + i * 80, 10)),
    },
    ...numberOptions(rand, quads, 0, 4),
    hint: 'Em đếm số cạnh của từng hình. Hình tứ giác có bốn cạnh.',
    solution:
      quads === 0
        ? 'Không có hình nào có đúng 4 cạnh, 4 đỉnh. Hình vẽ không có hình tứ giác nào.'
        : `Có ${quads} hình có đúng 4 cạnh, 4 đỉnh. Hình vẽ có ${quads} hình tứ giác.`,
  };
}

/**
 * A short word problem about the distance along a polyline.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function storyQuestion(rand) {
  const story = int(rand, 0, 2);
  if (story === 0) {
    const a = 10 * int(rand, 1, 3);
    const b = 10 * int(rand, 1, 3);
    const c = 10 * int(rand, 1, 3);
    const total = a + b + c;
    const { options, answer } = numberOptions(rand, total / 10, 1, 12);
    return {
      prompt: `Ốc sên bò từ nhà qua khóm hoa đến gốc cây rồi đến bờ ao. Các đoạn dài ${a} cm, ${b} cm, ${c} cm. Ốc sên bò tất cả bao nhiêu xăng-ti-mét?`,
      options: options.map((o) => `${Number(o) * 10} cm`),
      answer,
      hint: 'Đường ốc sên bò là một đường gấp khúc. Em cộng độ dài các đoạn.',
      solution: `Ốc sên bò tất cả là: ${a} + ${b} + ${c} = ${total} (cm). Đáp số: ${total} cm.`,
    };
  }
  if (story === 1) {
    const each = int(rand, 3, 9);
    const total = each * 3;
    return {
      prompt: `Sợi dây thép uốn thành đường gấp khúc gồm 3 đoạn thẳng, mỗi đoạn dài ${each} cm. Sợi dây dài bao nhiêu xăng-ti-mét?`,
      ...unitOptions(rand, total, 'cm', 1, 40),
      hint: 'Có 3 đoạn dài bằng nhau. Em cộng ba số giống nhau.',
      solution: `Sợi dây dài là: ${each} + ${each} + ${each} = ${total} (cm). Đáp số: ${total} cm.`,
    };
  }
  const a = int(rand, 3, 9);
  const b = int(rand, 3, 9);
  const c = int(rand, 3, 9);
  let d = int(rand, 3, 9);
  if (c + d === a + b) d = d === 9 ? 8 : d + 1;
  const ant = a + b;
  const snail = c + d;
  const antLong = ant > snail;
  return {
    prompt: `Kiến bò theo đường gấp khúc gồm hai đoạn ${a} cm và ${b} cm. Ốc sên bò theo đường gấp khúc gồm hai đoạn ${c} cm và ${d} cm. Con nào bò xa hơn?`,
    options: ['Kiến', 'Ốc sên'],
    answer: antLong ? 0 : 1,
    hint: 'Em tính độ dài mỗi đường rồi so sánh hai số.',
    solution: `Kiến bò: ${a} + ${b} = ${ant} (cm). Ốc sên bò: ${c} + ${d} = ${snail} (cm). ${antLong ? 'Kiến' : 'Ốc sên'} bò xa hơn.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  'doan-thang': segmentQuestion,
  duong: lineQuestion,
  'thang-hang': collinearQuestion,
  'gap-khuc': polylineQuestion,
  'tu-giac': quadQuestion,
  'bai-toan': storyQuestion,
};

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  return { ...MAKERS[kind](rand), kind };
}

/**
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return shuffle(rand, [...KINDS, ...KINDS]).map((k) => makeQuestion(k, rand));
}
